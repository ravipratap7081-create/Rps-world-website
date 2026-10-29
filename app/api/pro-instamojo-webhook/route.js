import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "../../../lib/delivery";
import {
  parseInstamojoWebhookBody,
  verifyInstamojoMac,
  getInstamojoPaymentStatus,
  upsertProFromInstamojo,
  getInstamojoProPurpose,
} from "../../../lib/instamojo";

/**
 * POST /api/pro-instamojo-webhook
 * Instamojo webhook endpoint for Pro ONLY.
 *
 * ACTIVATION FLOW (mirrors /api/pro-link-webhook, same proof bar):
 * 1. Body is form-urlencoded, NOT JSON (Instamojo docs). Parse raw text.
 * 2. Verify the MAC: remove "mac", sort remaining keys alphabetically
 *    by lower-cased key, join values with "|", HMAC-SHA1 with the
 *    private salt. Wrong MAC -> 401, no further processing.
 * 3. Purpose gate: only the Pro purpose belongs here. A Diwali pack
 *    payment (different purpose) is acknowledged, not acted on — and
 *    this endpoint NEVER touches delivery_orders, so it can never
 *    wrongly issue a Diwali download token.
 * 4. Status gate: only "Credit" proceeds; "Failed" is acknowledged.
 * 5. Server-side re-check via Instamojo GET payment-requests/{id} —
 *    a signed webhook alone is never enough to grant Pro.
 * 6. If gateway status is Credit + Pro purpose + amount >= ₹149,
 *    upsert ONE pro_orders row (cashfree_order_id = "IMJO:<payment_id>",
 *    unique, so retries are idempotent and never extend Pro).
 *    pro_until = paid_at + 30 days. Email/phone come from Instamojo's
 *    own payment record, never from the webhook body alone.
 * 7. If the pro_orders table/env is unavailable, return 503 — NEVER
 *    return ok:true claiming activation that did not happen.
 *
 * OPEN ITEM: Instamojo webhook retry behaviour is not stated in the
 * docs checked, so a missed webhook must NOT be the only path —
 * /api/pro-instamojo-status re-verifies the same payment on redirect
 * and activates on the same gateway proof.
 */
export async function POST(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`webhook-pro-imjo:${ip}`, 60, 60_000)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  const salt = process.env.INSTAMOJO_PRIVATE_SALT;
  if (!salt) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let rawBody;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }
  const fields = parseInstamojoWebhookBody(rawBody);

  if (!verifyInstamojoMac(fields, salt)) {
    return NextResponse.json({ error: "invalid mac" }, { status: 401 });
  }

  // Only Pro payments belong here. Anything else is acknowledged, not acted on.
  if (fields.purpose !== getInstamojoProPurpose()) {
    return NextResponse.json({ ok: true, note: "not a Pro payment, ignored" });
  }
  if (String(fields.status) !== "Credit") {
    return NextResponse.json({
      ok: true,
      payment_id: fields.payment_id || null,
      paid: false,
      note: "Pro payment not Credit per webhook; no action taken.",
    });
  }

  const st = await getInstamojoPaymentStatus(fields.payment_request_id, fields.payment_id);
  if (!st.ok) {
    return NextResponse.json({ error: "verification unavailable" }, { status: 500 });
  }

  const res = await upsertProFromInstamojo({
    paymentId: st.paymentId,
    status: st.status,
    amount: st.amount,
    buyerEmail: st.buyerEmail,
    buyerPhone: st.buyerPhone,
    purpose: st.purpose,
  });
  if (!res.ok) {
    return NextResponse.json({ error: res.error }, { status: 503 });
  }
  if (!res.activated) {
    return NextResponse.json({
      ok: true,
      payment_id: st.paymentId,
      paid: false,
      note: res.reason || "No action taken.",
    });
  }
  return NextResponse.json({
    ok: true,
    activated: true,
    payment_id: st.paymentId,
    pro_until: res.proUntil,
    note: res.alreadyActive
      ? "Pro already active for this payment; retry did not extend it."
      : "Pro activated for 30 days from payment. No Diwali token issued.",
  });
}
