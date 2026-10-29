import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { checkRateLimit, getClientIp } from "../../../../lib/delivery";
import { PRO_PRICE_INR, PRO_PRODUCT } from "../../../../lib/pro";

/**
 * POST /api/checkout/pro-link
 * ROUTE CHANGE (29 Oct 2026): Pro checkout via Cashfree Payment Link
 * instead of the JS SDK checkout. The SDK route hung 4 times in the VM
 * browser (button stuck on "Please wait…", no error, no navigation) even
 * after CSP + timeout + await fixes. A Payment Link is a plain hosted
 * URL (payments.cashfree.com/links/...) — the browser only redirects to
 * it, no JS SDK, no in-page promise to hang.
 *
 * One-time payment, NO auto-renewal (buyer pays again each month).
 * No pro_orders row is created here. Activation happens ONLY in
 * /api/pro-link-webhook after a server-side GET /pg/links re-check
 * confirms PAID, which writes pro_orders (paid, pro_until = +30 days).
 * This route never touches delivery_orders and never issues a Diwali token.
 *
 * Env required (fail closed): CASHFREE_APP_ID, CASHFREE_SECRET_KEY, APP_URL
 * (APP_URL must be exactly https://rps-world-website.onrender.com).
 */
export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`checkout-pro-link:${ip}`, 10, 60_000)) {
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
    const allowedUrls = ["https://rps-world-website.onrender.com"];
    if (!baseUrl || !allowedUrls.includes(baseUrl) || !appId || !secretKey) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
    }

    const env = (process.env.CASHFREE_ENV || "PROD").toUpperCase();
    const apiBase = env === "SANDBOX" ? "https://sandbox.cashfree.com" : "https://api.cashfree.com";
    const linkId = `PROLINK_${randomUUID().replace(/-/g, "")}`;

    // Link expiry: 30 minutes from now, formatted as IST (+05:30).
    const expiry = new Date(Date.now() + 30 * 60_000);
    const ist = new Date(expiry.getTime() + 5.5 * 60 * 60_000);
    const linkExpiryTime = ist.toISOString().replace("Z", "+05:30").slice(0, 19) + "+05:30";

    const cashfreeResponse = await fetch(`${apiBase}/pg/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify({
        link_id: linkId,
        link_amount: PRO_PRICE_INR,
        link_currency: "INR",
        link_purpose: "ProTools Pro - 1 month",
        link_partial_payments: false,
        link_expiry_time: linkExpiryTime,
        customer_details: {
          customer_email: email,
          customer_name: name || "Customer",
          customer_phone: cleanPhone,
        },
        link_meta: {
          return_url: `${baseUrl}/coins?pro_link_id=${linkId}`,
          notify_url: `${baseUrl}/api/pro-link-webhook`,
          upi_intent: false,
        },
        link_notify: { send_email: false, send_sms: false },
        link_notes: { product: PRO_PRODUCT, purpose: "pro_monthly_149" },
      }),
    });

    if (!cashfreeResponse.ok) {
      const errText = await cashfreeResponse.text().catch(() => "");
      console.error("Pro Cashfree link failed:", errText.slice(0, 200));
      return NextResponse.json({ error: "Payment gateway error" }, { status: 500 });
    }

    const link = await cashfreeResponse.json();
    if (!link.link_url) {
      return NextResponse.json({ error: "Payment gateway error" }, { status: 500 });
    }
    return NextResponse.json({
      link_id: linkId,
      link_url: link.link_url,
      amount: PRO_PRICE_INR,
      currency: "INR",
      product: PRO_PRODUCT,
      mode: env === "SANDBOX" ? "sandbox" : "production",
      activation: "auto_on_link_webhook_after_server_check",
    });
  } catch (err) {
    console.error("Pro link checkout error:", err?.message || err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
