import { NextResponse } from "next/server";
import {
  getServiceClient,
  verifyCashfreeSignature,
  isTimestampFresh,
  generateToken,
  getCashfreeOrderStatus,
  sendDownloadEmail,
  buildDownloadUrl,
  auditLog,
  checkRateLimit,
  getClientIp,
  sendMetaPurchaseEvent,
} from "../../../lib/delivery";

/**
 * POST /api/cashfree-webhook
 * Receives Cashfree payment webhooks for the Rs.149 Diwali Pack.
 *
 * Security (ChatGPT-validated):
 *  1. Verify HMAC-SHA256 signature on the RAW body (never parsed JSON).
 *  2. Reject stale timestamps (replay guard, 5 min).
 *  3. Confirm server-side via Cashfree order-status API (signature alone is not enough).
 *  4. Validate amount against server-side expected price.
 *  5. Idempotent: duplicate webhooks never issue duplicate tokens.
 *  6. Never log tokens, secrets, signatures, or raw payloads.
 *
 * Configure in Cashfree Dashboard -> Developers -> Webhooks.
 */
export async function POST(req) {
  // Basic abuse protection (best-effort on serverless).
  const ip = getClientIp(req);
  if (!checkRateLimit(`webhook:${ip}`, 60, 60_000)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  const secret = process.env.CASHFREE_SECRET_KEY;
  if (!secret) {
    console.error("delivery: CASHFREE_SECRET_KEY missing");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  // --- 1. Raw body FIRST (signature is computed over raw bytes) ---
  let rawBody;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }

  // --- 2. Signature + freshness ---
  const signature = req.headers.get("x-webhook-signature");
  const timestamp = req.headers.get("x-webhook-timestamp");
  if (!verifyCashfreeSignature(rawBody, timestamp, signature, secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }
  if (!isTimestampFresh(timestamp, 300)) {
    return NextResponse.json({ error: "stale webhook" }, { status: 401 });
  }

  // --- 3. Parse (defensive: PG and Forms payload shapes differ) ---
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const data = payload.data || payload;
  const order = data.order || {};
  const payment = data.payment || {};
  const customer = data.customer_details || data.customerDetails || {};

  const eventType = payload.type || payload.event || "UNKNOWN";
  const orderId =
    order.order_id || data.order_id || payload.order_id || null;
  const paymentStatus =
    payment.payment_status || data.payment_status || payload.payment_status || "";
  const amount = Number(
    payment.payment_amount ?? data.payment_amount ?? order.order_amount ?? NaN
  );
  const currency =
    payment.payment_currency || data.payment_currency || order.order_currency || "INR";
  const paymentId =
    payment.cf_payment_id || data.cf_payment_id || payload.cf_payment_id || null;
  const customerEmail =
    customer.customer_email || data.customer_email || payload.customer_email || null;
  const customerPhone =
    customer.customer_phone || data.customer_phone || payload.customer_phone || null;

  if (!orderId) {
    // Acknowledge but do nothing — never 500 on malformed merchant webhooks
    // (Cashfree retries non-2xx with backoff; malformed won't fix itself).
    console.warn("delivery: webhook without order id, event:", eventType);
    return NextResponse.json({ ok: true, note: "no order id" });
  }

  const supabase = getServiceClient();
  const isSuccess =
    /SUCCESS|PAID/.test(String(paymentStatus).toUpperCase()) ||
    /SUCCESS|PAID/.test(String(eventType).toUpperCase());

  await auditLog(supabase, null, "webhook_received",
    `order ${orderId} event ${eventType} success=${isSuccess}`);

  // Non-success events: record and acknowledge (no fulfilment).
  if (!isSuccess) {
    await supabase.rpc("upsert_delivery_order", {
      p_cashfree_order_id: orderId,
      p_amount: Number.isFinite(amount) ? amount : 0,
      p_currency: currency,
      p_status: "failed",
      p_customer_email: customerEmail,
      p_customer_phone: customerPhone,
      p_cashfree_payment_id: paymentId,
      p_raw_event_type: eventType,
    });
    return NextResponse.json({ ok: true });
  }

  // --- 4. Server-side confirmation via Cashfree API (second factor) ---
  const cf = await getCashfreeOrderStatus(orderId);
  if (!cf.ok) {
    console.error("delivery: cashfree order lookup failed for", orderId);
    // 500 -> Cashfree retries; transient API failure should not lose the payment.
    return NextResponse.json({ error: "verification unavailable" }, { status: 500 });
  }
  const cfPaid = String(cf.orderStatus || "").toUpperCase() === "PAID";
  if (!cfPaid) {
    console.warn("delivery: order not PAID per cashfree api:", orderId);
    return NextResponse.json({ ok: true, note: "not paid per gateway" });
  }

  // --- 5. Amount validation against server-side expected price ---
  const expectedPrice = Number(process.env.DIWALI_PACK_PRICE || 149);
  const paidAmount = Number.isFinite(amount) ? amount : cf.orderAmount;
  if (Math.abs(paidAmount - expectedPrice) > 0.01 || cf.orderCurrency !== "INR") {
    console.error(
      "delivery: amount mismatch for", orderId,
      `got ${paidAmount} ${cf.orderCurrency}, expected ${expectedPrice} INR`
    );
    await auditLog(supabase, null, "webhook_received",
      `order ${orderId} amount mismatch — manual review needed`);
    return NextResponse.json({ ok: true, note: "amount mismatch, held for review" });
  }

  // --- 6. Idempotent upsert; only issue a token on transition to paid ---
  const { data: upserted, error: upsertErr } = await supabase.rpc(
    "upsert_delivery_order",
    {
      p_cashfree_order_id: orderId,
      p_amount: expectedPrice,
      p_currency: "INR",
      p_status: "paid",
      p_customer_email: customerEmail,
      p_customer_phone: customerPhone,
      p_cashfree_payment_id: paymentId,
      p_raw_event_type: eventType,
    }
  );
  if (upsertErr || !upserted?.length) {
    console.error("delivery: order upsert failed for", orderId, upsertErr?.message);
    return NextResponse.json({ error: "order persist failed" }, { status: 500 });
  }
  const { order_id: dbOrderId, became_paid: becamePaid } = upserted[0];

  if (!becamePaid) {
    // Duplicate webhook for an already-fulfilled order: acknowledge, no new token.
    await auditLog(supabase, dbOrderId, "webhook_received",
      `order ${orderId} duplicate success webhook ignored`);
    return NextResponse.json({ ok: true, note: "duplicate" });
  }

  // --- 7. Issue single-use token (24h expiry), store HASH only ---
  const { token, tokenHash } = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const { error: tokenErr } = await supabase.from("download_tokens").insert({
    order_id: dbOrderId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });
  if (tokenErr) {
    console.error("delivery: token insert failed for", orderId, tokenErr.message);
    return NextResponse.json({ error: "token issue failed" }, { status: 500 });
  }
  await auditLog(supabase, dbOrderId, "token_issued",
    `order ${orderId} token issued, expires ${expiresAt}`);

  // --- 8. Email the download link ---
  let downloadUrl;
  try {
    downloadUrl = buildDownloadUrl(token);
  } catch (e) {
    console.error("delivery: APP_URL missing");
    return NextResponse.json({ error: "delivery misconfigured" }, { status: 500 });
  }
  const emailResult = customerEmail
    ? await sendDownloadEmail({ to: customerEmail, downloadUrl, orderId })
    : { ok: false, error: "no customer email" };

  await auditLog(
    supabase,
    dbOrderId,
    emailResult.ok ? "email_sent" : "email_failed",
    emailResult.ok
      ? `order ${orderId} download email sent`
      : `order ${orderId} email failed: ${emailResult.error}`
  );

  // --- 9. Fire Meta Conversions API Purchase (server-side, deduplicated via event_id) ---
  // The browser Pixel should use the same event_id (order ID) for deduplication.
  const metaResult = await sendMetaPurchaseEvent(orderId, customerEmail);
  await auditLog(
    supabase,
    dbOrderId,
    metaResult.ok ? "meta_purchase_sent" : "meta_purchase_skipped",
    `order ${orderId} Meta CAPI: ${metaResult.ok ? "sent" : metaResult.error}`
  );

  // Plain token is intentionally NOT logged anywhere.
  return NextResponse.json({ ok: true, delivered: emailResult.ok });
}
