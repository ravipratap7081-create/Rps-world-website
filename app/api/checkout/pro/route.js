import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { checkRateLimit, getClientIp } from "../../../../lib/delivery";
import { PRO_PRICE_INR, PRO_PRODUCT } from "../../../../lib/pro";

/**
 * POST /api/checkout/pro
 * Creates a Cashfree PG order for Pro Universe Pro — ₹149/month.
 *
 * IMPORTANT — read before pushing live:
 * 1. This is a one-time PG order, NOT a recurring subscription. There is
 *    NO auto-renewal: the buyer pays again each month to continue Pro.
 * 2. This route does NOT write to delivery_orders and does NOT use the
 *    Diwali-pack webhook. Diwali webhook issues download tokens; a Pro
 *    payment must never flow through it (it would wrongly issue a pack
 *    token). Pro webhooks go to /api/pro-webhook, which only acknowledges
 *    and never issues a token.
 * 3. No pro_orders table exists yet (migration is review-only). Until that
 *    table is approved and applied, Pro activation after payment is MANUAL
 *    (within 24 hours on the payment email). Do NOT claim auto-activation.
 * 4. Live payment testing is still pending and will pause at checkout
 *    approval (payment-OTP carve-out). Never claim this route is proven
 *    until a real test payment has been verified end to end.
 *
 * Env required (fail closed, no fallbacks, no invented secrets):
 *   CASHFREE_APP_ID, CASHFREE_SECRET_KEY, APP_URL
 *   (APP_URL must be exactly https://rps-world-website.onrender.com)
 *   CASHFREE_ENV=PROD (default) or SANDBOX (test only)
 */
export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`checkout-pro:${ip}`, 10, 60_000)) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { email, phone, name } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ error: "Valid 10-digit phone number required" }, { status: 400 });
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const baseUrl = process.env.APP_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
    }
    const allowedUrls = ["https://rps-world-website.onrender.com"];
    if (!allowedUrls.includes(baseUrl)) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
    }
    if (!appId || !secretKey) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
    }

    const env = (process.env.CASHFREE_ENV || "PROD").toUpperCase();
    const apiBase = env === "SANDBOX" ? "https://sandbox.cashfree.com" : "https://api.cashfree.com";
    const orderId = `PRO149_${randomUUID()}`;

    const cashfreeResponse = await fetch(`${apiBase}/pg/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: PRO_PRICE_INR,
        order_currency: "INR",
        customer_details: {
          customer_id: orderId,
          customer_email: email,
          customer_phone: cleanPhone,
          customer_name: name || "Customer",
        },
        order_meta: {
          return_url: `${baseUrl}/coins?pro_order_id=${orderId}`,
          notify_url: `${baseUrl}/api/pro-webhook`,
        },
      }),
    });

    if (!cashfreeResponse.ok) {
      const errText = await cashfreeResponse.text().catch(() => "");
      console.error("Pro Cashfree order failed:", errText.slice(0, 200));
      return NextResponse.json({ error: "Payment gateway error" }, { status: 500 });
    }

    const cashfreeOrder = await cashfreeResponse.json();
    return NextResponse.json({
      order_id: orderId,
      payment_session_id: cashfreeOrder.payment_session_id,
      amount: PRO_PRICE_INR,
      currency: "INR",
      product: PRO_PRODUCT,
      activation: "manual_24h",
    });
  } catch (err) {
    console.error("Pro checkout error:", err?.message || err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
