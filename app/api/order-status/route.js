import { NextResponse } from "next/server";
import {
  getServiceClient,
  getCashfreeOrderStatus,
  generateToken,
  buildDownloadUrl,
  auditLog,
} from "../../../lib/delivery.js";

/**
 * GET /api/order-status?order_id=xxx
 * Verifies payment status server-side and returns download URL if paid.
 * 
 * This enables immediate download after payment without email dependency.
 * Security: Verifies via Cashfree API, not trusting client claims.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID required" },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    // Step 1: Check local order status
    const { data: order, error: dbError } = await supabase
      .from("delivery_orders")
      .select("*")
      .eq("cashfree_order_id", orderId)
      .single();

    if (dbError || !order) {
      return NextResponse.json(
        { error: "Order not found", status: "not_found" },
        { status: 404 }
      );
    }

    // If already paid and has token, return existing download URL
    // (check if token already issued)
    const { data: existingToken } = await supabase
      .from("download_tokens")
      .select("id")
      .eq("order_id", order.id)
      .is("used_at", null)
      .gt("expires_at", new Date().toISOString())
      .limit(1)
      .single();

    if (order.status === "paid" && existingToken) {
      // Token already exists, but we don't have the plain token
      // For security, we generate a new one (old one remains valid until used/expired)
      // Actually, let's just generate a fresh token for simplicity
    }

    // Step 2: Verify with Cashfree API (server-side, not trusting client)
    const cf = await getCashfreeOrderStatus(orderId);
    
    if (!cf.ok) {
      return NextResponse.json(
        { error: "Unable to verify payment", status: order.status },
        { status: 503 }
      );
    }

    const isPaid = String(cf.orderStatus || "").toUpperCase() === "PAID";
    const paidAmount = Number(cf.orderAmount || 0);
    const expectedPrice = Number(process.env.DIWALI_PACK_PRICE || 149);

    if (!isPaid) {
      return NextResponse.json({
        status: "pending",
        message: "Payment not completed yet. Please complete the payment.",
      });
    }

    // Verify amount
    if (Math.abs(paidAmount - expectedPrice) > 0.01) {
      console.error(`Amount mismatch for ${orderId}: got ${paidAmount}, expected ${expectedPrice}`);
      return NextResponse.json(
        { error: "Payment amount mismatch", status: "error" },
        { status: 400 }
      );
    }

    // Step 3: Mark as paid (if not already) and generate download token
    if (order.status !== "paid") {
      await supabase
        .from("delivery_orders")
        .update({ 
          status: "paid",
          paid_at: new Date().toISOString(),
          cashfree_payment_id: cf.cfPaymentId || order.cashfree_payment_id,
        })
        .eq("id", order.id);

      await auditLog(supabase, order.id, "order_paid_via_status_check",
        `order ${orderId} verified PAID via API`);
    }

    // Step 4: Generate single-use download token
    const { token, tokenHash } = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    const { error: tokenError } = await supabase
      .from("download_tokens")
      .insert({
        order_id: order.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      });

    if (tokenError) {
      console.error("Failed to create token:", tokenError.message);
      return NextResponse.json(
        { error: "Failed to generate download link" },
        { status: 500 }
      );
    }

    const downloadUrl = buildDownloadUrl(token);
    
    await auditLog(supabase, order.id, "download_token_issued",
      `token issued via order-status check for ${orderId}`);

    return NextResponse.json({
      status: "paid",
      download_url: downloadUrl,
      expires_in: "24 hours",
      message: "Payment verified! Your download is ready.",
    });

  } catch (err) {
    console.error("Order status check failed:", err.message);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
