/**
 * DESIGN SKETCH ONLY — NOT FOR PRODUCTION, UNTESTED.
 *
 * This file is an untested sketch illustrating the shape of the server-side
 * "create order" step described in payment-design.md §1. It is NOT wired into
 * the app, NOT imported anywhere, and must NOT be deployed as-is.
 *
 * Constraints: real Razorpay account is DISABLED (appeal ticket 21343834 pending).
 * Do not run this against live keys. No Cashfree. No personal UPI/QR.
 */

// DESIGN SKETCH ONLY — NOT FOR PRODUCTION, UNTESTED.
// Intended home (when/if implemented): app/api/orders/route.js (Next.js App Router)

const RAZORPAY_KEY_ID = "rzp_test_xxxxxxxxxxxxxxxx"; // PLACEHOLDER — public key id only
const RAZORPAY_KEY_SECRET = "RAZORPAY_KEY_SECRET";    // PLACEHOLDER — server env var, never in browser

// Packs and their prices in PAISE, fixed server-side. Browser cannot set the amount.
const PACKS = {
  "diwali-business-kit-starter": 29900,  // ₹299 — placeholder price
  "diwali-business-kit-business": 49900, // ₹499 — placeholder price
  "diwali-business-kit-premium": 99900,  // ₹999 — placeholder price
};

export async function POST(request) {
  // 1. Read requested pack from the body; NEVER trust a client-supplied amount.
  const { pack_id } = await request.json();
  const amount = PACKS[pack_id];
  if (!amount) {
    return Response.json({ error: "Unknown pack" }, { status: 400 });
  }

  // 2. Call Razorpay Orders API from the SERVER ONLY (basic auth with key secret).
  const basic = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
  const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,            // paise, server-fixed
      currency: "INR",
      receipt: `pu_${Date.now()}`, // our internal reference
      notes: { pack_id },          // what this order is for
    }),
  });

  if (!rzpRes.ok) {
    // Never leak Razorpay's raw error (may contain hints) to the browser.
    console.error("Razorpay order creation failed", rzpRes.status);
    return Response.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }

  const order = await rzpRes.json();

  // 3. Persist the order server-side (sketch: Supabase `payments` table, status='created').
  // await supabase.from("payments").insert({
  //   order_id: order.id, pack_id, amount, currency: "INR", status: "created",
  // });

  // 4. Return ONLY what the browser needs: public key id + order id.
  //    The key SECRET never leaves the server.
  return Response.json({ key_id: RAZORPAY_KEY_ID, order_id: order.id });
}
