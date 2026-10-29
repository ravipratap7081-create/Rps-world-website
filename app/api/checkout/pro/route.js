import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { checkRateLimit, getClientIp } from "../../../../lib/delivery";
import { PRO_PRICE_INR, PRO_PRODUCT } from "../../../../lib/pro";

/**
 * POST /api/checkout/pro
 * Creates a Cashfree PG order for ProTools Pro — ₹149/month.
 *
 * IMPORTANT — read before pushing live:
 * 1. This is a one-time PG order, NOT a recurring subscription. There is
 *    NO auto-renewal: the buyer pays again each month to continue Pro.
 * 2. This route does NOT write to delivery_orders and does NOT use the
 *    Diwali-pack webhook. Diwali webhook issues download tokens; a Pro
 *    payment must never flow through it (it would wrongly issue a pack
 *    token). Pro webhooks go to /api/pro-webhook, which only acknowledges
 *    and never issues a token.
 * 3. No pro_orders row is created here. Activation happens ONLY in
 *    /api/pro-webhook after signature + freshness + server-side gateway
 *    verification, which writes pro_orders (paid, pro_until = +30 days).
 *    Until that migration is approved/applied, the webhook returns 503
 *    and activation is pending — never claim auto-activation is live
 *    before the migration + a live payment test pass.
 * 4. The /coins Buy button stays DISABLED until the parent enables it
 *    after migration approval + payment test. This route existing does
 *    not mean Pro can be bought from the UI yet.
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
      payment_link: cashfreeOrder.payment_link || null,
      amount: PRO_PRICE_INR,
      currency: "INR",
      product: PRO_PRODUCT,
      mode: env === "SANDBOX" ? "sandbox" : "production",
      activation: "auto_on_webhook_after_migration",
    });
  } catch (err) {
    console.error("Pro checkout error:", err?.message || err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
