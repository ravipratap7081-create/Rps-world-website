import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  getServiceClient,
  checkRateLimit,
  getClientIp,
} from "../../../../lib/delivery";

/**
 * POST /api/checkout/diwali-pack
 * Creates a server-side order for the ₹149 Diwali Business Promo Pack.
 * 
 * Flow (ChatGPT-validated perfection approach):
 * 1. Create pending order in Supabase (delivery_orders)
 * 2. Create Cashfree order via API
 * 3. Return payment_session_id + order_id to frontend
 * 4. Frontend redirects to Cashfree checkout
 * 5. Webhook verifies payment and triggers delivery
 * 
 * This ensures we have a local order record BEFORE payment,
 * so the webhook can match payments to orders securely.
 */
export async function POST(request) {
  try {
    // Rate limit: 10 checkouts per IP per minute (prevent order spam)
    const ip = getClientIp(request);
    if (!checkRateLimit(`checkout:${ip}`, 10, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests, please try again later" },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { email, phone, name } = body;

    // Validate inputs
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Cashfree requires phone number - validate it
    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "Valid 10-digit phone number required" },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const baseUrl = process.env.APP_URL;

    // Fail closed: APP_URL must be configured, no fallback to old domains
    if (!baseUrl) {
      console.error("APP_URL not configured - refusing to create order");
      return NextResponse.json(
        { error: "Payment not configured" },
        { status: 503 }
      );
    }

    // Validate APP_URL is the approved production domain
    const allowedUrls = ["https://rpsworld.in"];
    if (!allowedUrls.includes(baseUrl)) {
      console.error(`APP_URL not in allowlist: ${baseUrl}`);
      return NextResponse.json(
        { error: "Payment not configured" },
        { status: 503 }
      );
    }

    if (!appId || !secretKey) {
      console.error("Cashfree keys missing");
      return NextResponse.json(
        { error: "Payment not configured" },
        { status: 503 }
      );
    }

    const amount = 149;
    const currency = "INR";
    
    // Generate our order ID (cryptographically secure, unpredictable)
    const orderId = `DW149_${randomUUID()}`;

    // Step 1: Create pending order in Supabase
    const supabase = getServiceClient();
    const { data: order, error: dbError } = await supabase
      .from("delivery_orders")
      .insert({
        cashfree_order_id: orderId,
        amount: amount,
        currency: currency,
        status: "pending",
        customer_email: email,
        customer_phone: phone || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create order:", dbError.message);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Step 2: Create Cashfree order via API
    const cashfreeResponse = await fetch(
      "https://api.cashfree.com/pg/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": appId,
          "x-client-secret": secretKey,
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: currency,
          customer_details: {
            customer_id: orderId,
            customer_email: email,
            customer_phone: cleanPhone,
            customer_name: name || "Customer",
          },
          order_meta: {
            return_url: `${baseUrl}/diwali-business-kit/thank-you?order_id=${orderId}`,
            notify_url: `${baseUrl}/api/cashfree-webhook`,
          },
        }),
      }
    );

    if (!cashfreeResponse.ok) {
      const errText = await cashfreeResponse.text();
      console.error("Cashfree order failed:", errText);
      
      // Mark order as failed
      await supabase
        .from("delivery_orders")
        .update({ status: "failed" })
        .eq("id", order.id);

      return NextResponse.json(
        { error: "Payment gateway error" },
        { status: 500 }
      );
    }

    const cashfreeOrder = await cashfreeResponse.json();

    // Step 3: Return payment session to frontend
    return NextResponse.json({
      order_id: orderId,
      payment_session_id: cashfreeOrder.payment_session_id,
      // Frontend will use Cashfree JS SDK or redirect
    });

  } catch (err) {
    console.error("Checkout error:", err.message);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
