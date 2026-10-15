/**
 * DESIGN SKETCH ONLY — NOT FOR PRODUCTION, UNTESTED.
 *
 * This file is an untested sketch illustrating server-side webhook verification
 * described in payment-design.md §3. It is NOT wired into the app, NOT imported
 * anywhere, and must NOT be deployed as-is.
 *
 * Constraints: real Razorpay account is DISABLED (appeal ticket 21343834 pending).
 * Do not run this against live keys. No Cashfree. No personal UPI/QR.
 */

// DESIGN SKETCH ONLY — NOT FOR PRODUCTION, UNTESTED.
// Intended home (when/if implemented): app/api/webhooks/razorpay/route.js (Next.js App Router)

import crypto from "crypto";

const RAZORPAY_WEBHOOK_SECRET = "RAZORPAY_WEBHOOK_SECRET"; // PLACEHOLDER — server env var only

function verifySignature(rawBody, receivedSignature) {
  const expected = crypto
    .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(receivedSignature || "", "utf8");
  // Timing-safe compare; also rejects on length mismatch.
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request) {
  // IMPORTANT: must read the RAW body (not parsed JSON) for signature verification.
  // In the real route, disable body parsing or use request.text().
  const rawBody = await request.text();

  const signature = request.headers.get("x-razorpay-signature");
  if (!verifySignature(rawBody, signature)) {
    // Log the attempt, reveal nothing. Razorpay will retry; mismatches stay 401.
    console.error("Razorpay webhook signature mismatch");
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event;
  const entity = payload.payload?.payment?.entity;

  if (event === "payment.captured" && entity) {
    // 1. Look up our order by entity.order_id (sketch: Supabase `payments` table).
    // const order = await supabase.from("payments").select("*").eq("order_id", entity.order_id).single();

    // 2. Re-assert amount + currency + order match before unlocking ANYTHING.
    // if (!order || order.amount !== entity.amount || entity.currency !== "INR") {
    //   console.error("Webhook amount/currency mismatch", entity.id);
    //   return Response.json({ ok: true }); // 200 so Razorpay stops retrying; alert a human.
    // }

    // 3. Idempotency: if order.status is already 'paid', this is a duplicate delivery — no-op.
    // if (order.status !== "paid") {
    //   // Create the single-purpose download grant (UNIQUE(order_id) enforces one grant).
    //   // token = crypto.randomBytes(32).toString("hex"); store sha256(token) + expiry now+24h.
    //   // await supabase.from("payments").update({ status: "paid", payment_id: entity.id }).eq("order_id", entity.order_id);
    // }

    return Response.json({ ok: true });
  }

  if (event === "payment.failed" && entity) {
    // Mark the order failed; NEVER unlock. Buyer messaging handled by design §5.
    // await supabase.from("payments").update({ status: "failed" }).eq("order_id", entity.order_id);
    return Response.json({ ok: true });
  }

  // Unknown event types: acknowledge so Razorpay doesn't retry forever.
  return Response.json({ ok: true });
}
