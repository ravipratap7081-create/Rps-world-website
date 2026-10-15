import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getServiceClient } from "../../../../lib/delivery";

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
    const body = await request.json().catch(() => ({}));
    const { email, phone, name } = body;

    // Validate inputs
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const baseUrl = process.env.APP_URL || "https://golden-elf-11f395.netlify.app";

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
            // Phone is optional - only send if provided and valid
            ...(phone && phone.length >= 10 ? { customer_phone: phone } : {}),
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
