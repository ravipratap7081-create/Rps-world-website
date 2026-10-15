import { NextResponse } from "next/server";
import {
  getServiceClient,
  generateToken,
  sendDownloadEmail,
  buildDownloadUrl,
  auditLog,
  checkRateLimit,
  getClientIp,
} from "../../../lib/delivery";

/**
 * POST /api/resend-download
 * Body: { email }
 * Re-issues a download link for a paid order.
 *
 * Security:
 *  - Max 3 resends/hour per email (rate limit).
 *  - Anti-enumeration: identical response whether or not a paid order exists.
 *  - Reuses a still-valid token when one exists; otherwise issues a fresh one.
 *  - Plain tokens are never logged.
 */
export async function POST(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`resend:ip:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  let email;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  email = String(email || "").trim().toLowerCase();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
  if (!emailOk) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  if (!checkRateLimit(`resend:email:${email}`, 3, 60 * 60_000)) {
    return NextResponse.json({ error: "too many requests — try again later" }, { status: 429 });
  }

  let supabase;
  try {
    supabase = getServiceClient();
  } catch {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  // Generic response regardless of outcome (anti-enumeration).
  const genericOk = () =>
    NextResponse.json({
      ok: true,
      message: "If a paid order exists for this email, a fresh download link has been sent.",
    });

  // Latest paid order for this email.
  const { data: orders } = await supabase
    .from("delivery_orders")
    .select("id, cashfree_order_id")
    .eq("customer_email", email)
    .eq("status", "paid")
    .order("paid_at", { ascending: false })
    .limit(1);

  if (!orders?.length) {
    await auditLog(supabase, null, "resend_denied", "resend requested, no paid order");
    return genericOk();
  }
  const order = orders[0];

  // NOTE: plain tokens are never stored, so an existing "live" token's value
  // is unrecoverable — always issue a fresh token on resend.
  const { token, tokenHash } = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const { error: insErr } = await supabase.from("download_tokens").insert({
    order_id: order.id,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });
  if (insErr) {
    console.error("delivery: resend token insert failed:", insErr.message);
    return genericOk(); // do not leak internal state
  }
  await auditLog(supabase, order.id, "resend_issued",
    `fresh token issued via resend for order ${order.cashfree_order_id}`);

  let downloadUrl;
  try {
    downloadUrl = buildDownloadUrl(token);
  } catch {
    return genericOk();
  }

  const result = await sendDownloadEmail({
    to: email,
    downloadUrl,
    orderId: order.cashfree_order_id,
  });
  await auditLog(
    supabase,
    order.id,
    result.ok ? "email_sent" : "email_failed",
    `resend email ${result.ok ? "sent" : "failed: " + result.error}`
  );

  return genericOk();
}
