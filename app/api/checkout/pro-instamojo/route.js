import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "../../../../lib/delivery";
import { PRO_PRICE_INR, PRO_PRODUCT } from "../../../../lib/pro";
import { createInstamojoProPaymentRequest } from "../../../../lib/instamojo";

/**
 * POST /api/checkout/pro-instamojo
 * Instamojo fallback rail for ProTools Pro — ₹149/month.
 *
 * Creates an Instamojo payment request server-side and returns its
 * hosted longurl. The client navigates there with window.location.href
 * (full-page redirect — NO SDK, NO JS checkout promise, which is the
 * whole point: the Cashfree SDK checkout() promise never settled in
 * the VM browser across 6 attempts).
 *
 * This route does NOT write to pro_orders and does NOT touch
 * delivery_orders. Activation happens ONLY in /api/pro-instamojo-webhook
 * or /api/pro-instamojo-status after server-side gateway verification.
 *
 * Env required (fail closed, no fallbacks, no invented secrets):
 *   INSTAMOJO_API_KEY, INSTAMOJO_AUTH_TOKEN, APP_URL
 *   (APP_URL must be exactly https://rpsworld.in)
 *
 * LOCAL ONLY at time of writing: the /coins Buy button still calls
 * /api/checkout/pro (Cashfree SDK). Wiring the button to this route is
 * a separate, reviewed step — see INSTAMOJO-PRO-RAIL-DESIGN.md.
 */
export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`checkout-pro-imjo:${ip}`, 10, 60_000)) {
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

    const created = await createInstamojoProPaymentRequest({ email, phone, name });
    if (!created.ok) {
      const status = created.error === "payment not configured" ? 503 : 500;
      return NextResponse.json({ error: "Payment gateway error" }, { status });
    }

    return NextResponse.json({
      payment_url: created.longurl,
      payment_request_id: created.paymentRequestId,
      amount: PRO_PRICE_INR,
      currency: "INR",
      product: PRO_PRODUCT,
      rail: "instamojo",
      activation: "auto_on_verified_webhook_or_status",
    });
  } catch (err) {
    console.error("Pro Instamojo checkout error:", err?.message || err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
