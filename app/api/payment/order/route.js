import { NextResponse } from "next/server";
import { getAuthUser } from "../../../../lib/supabase-server";
import crypto from "crypto";

/**
 * POST /api/payment/order
 * Creates a Razorpay order for Pro Lifetime (₹499).
 * Requires RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in env.
 */
export async function POST() {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "login required" }, { status: 401 });

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "payment not configured", message: "Razorpay keys missing — contact support" },
        { status: 503 }
      );
    }

    const amount = 49900; // ₹499 in paise
    const receipt = `pro_${user.id.slice(0, 8)}_${Date.now()}`;

    // Create order via Razorpay API
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const r = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt,
        notes: { user_id: user.id, plan: "pro_lifetime" },
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      console.error("Razorpay order failed:", err);
      return NextResponse.json({ error: "order failed" }, { status: 500 });
    }

    const order = await r.json();
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId, // public key, safe to expose
    });
  } catch (e) {
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
