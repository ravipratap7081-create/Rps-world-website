import { NextResponse } from "next/server";
import {
  getServiceClient,
  generateToken,
  buildDownloadUrl,
  auditLog,
} from "../../../lib/delivery";

/**
 * POST /api/recover-download
 * Secure token recovery for customers who lost their download link.
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { order_id, email } = body;

    if (!order_id || !email) {
      return NextResponse.json({ error: "Order ID and email required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { data: order, error: dbError } = await supabase
      .from("delivery_orders")
      .select("*")
      .eq("cashfree_order_id", order_id)
      .single();

    if (dbError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.customer_email.toLowerCase() !== email.toLowerCase()) {
      await auditLog(supabase, order.id, "recovery_email_mismatch", `Recovery wrong email for ${order_id}`);
      return NextResponse.json({ error: "Email does not match order" }, { status: 403 });
    }
    if (order.status !== "paid") {
      return NextResponse.json({ error: "Order not paid yet", status: order.status }, { status: 402 });
    }

    await supabase.from("download_tokens").delete().eq("order_id", order.id).is("used_at", null);

    const { token, tokenHash } = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const { error: tokenError } = await supabase.from("download_tokens").insert({
      order_id: order.id, token_hash: tokenHash, expires_at: expiresAt,
    });

    if (tokenError) {
      console.error("Recovery token failed:", tokenError.message);
      return NextResponse.json({ error: "Failed to generate download link" }, { status: 500 });
    }

    await auditLog(supabase, order.id, "token_recovered", `Recovery for ${order_id}`);
    return NextResponse.json({ success: true, download_url: buildDownloadUrl(token), expires_in: "24 hours" });
  } catch (err) {
    console.error("Recovery error:", err.message);
    return NextResponse.json({ error: "Recovery failed" }, { status: 500 });
  }
}
