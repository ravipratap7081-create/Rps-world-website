import { NextResponse } from "next/server";
import { getAuthUser, createClient } from "../../../../lib/supabase-server";
import crypto from "crypto";

/**
 * POST /api/payment/verify
 * Verifies Razorpay payment signature and unlocks Pro for the user.
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "login required" }, { status: 401 });

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "payment not configured" }, { status: 503 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "missing payment details" }, { status: 400 });
    }

    // Verify signature: HMAC-SHA256(order_id + "|" + payment_id, key_secret)
    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "invalid signature" }, { status: 400 });
    }

    // Payment verified — unlock Pro Lifetime for this user
    const supabase = await createClient();
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          is_pro: true,
          pro_since: new Date().toISOString(),
          pro_payment_id: razorpay_payment_id,
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Pro unlock failed:", error.message);
      return NextResponse.json({ error: "unlock failed — contact support with payment ID: " + razorpay_payment_id }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Pro Lifetime unlocked!" });
  } catch (e) {
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
