import { NextResponse } from "next/server";
import { getCashfreeOrderStatus } from "../../../lib/delivery";

/**
 * GET /api/pro-status?order_id=PRO149_...
 * Server-side Cashfree order-status check for a Pro order.
 * Returns status only — it does NOT activate Pro and does NOT fulfil
 * anything. Activation is manual (within 24 hours) until the pro_orders
 * table migration is approved and applied. Never claim a PAID status
 * here means Pro is already active in the app.
 */
export async function GET(req) {
  const orderId = req.nextUrl.searchParams.get("order_id") || "";
  if (!orderId.startsWith("PRO149_")) {
    return NextResponse.json({ error: "Invalid Pro order id" }, { status: 400 });
  }
  const cf = await getCashfreeOrderStatus(orderId);
  if (!cf.ok) {
    return NextResponse.json({ error: "Verification unavailable" }, { status: 503 });
  }
  return NextResponse.json({
    order_id: orderId,
    status: cf.orderStatus,
    paid: String(cf.orderStatus || "").toUpperCase() === "PAID",
    amount: cf.orderAmount,
    currency: cf.orderCurrency,
    activation: "manual_24h",
    note: "PAID means Cashfree received the payment. Pro activation is confirmed manually within 24 hours on your payment email.",
  });
}
