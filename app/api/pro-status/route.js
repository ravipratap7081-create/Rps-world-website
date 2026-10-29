import { NextResponse } from "next/server";
import { getCashfreeOrderStatus } from "../../../lib/delivery";
import { getProByOrderId } from "../../../lib/pro-server";

/**
 * GET /api/pro-status?order_id=PRO149_...
 * Server-side check for a Pro order. READ-ONLY — this route never
 * activates Pro; activation happens only in /api/pro-webhook.
 *
 * activation values (honest, do not collapse them):
 * - "active": pro_orders has a paid row for this order with pro_until
 *   in the future. Pro is ACTIVE.
 * - "manual_pending": Cashfree says PAID but no active pro_orders row
 *   exists (webhook not run, or migration not applied yet). Pro is NOT
 *   active in the app yet — do not display it as active.
 * - "not_paid": Cashfree does not say PAID.
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
  const paid = String(cf.orderStatus || "").toUpperCase() === "PAID";
  const pro = await getProByOrderId(orderId);
  const activation = pro.isPro ? "active" : paid ? "manual_pending" : "not_paid";
  return NextResponse.json({
    order_id: orderId,
    status: cf.orderStatus,
    paid,
    amount: cf.orderAmount,
    currency: cf.orderCurrency,
    pro_active: pro.isPro,
    pro_until: pro.proUntil,
    activation,
    note:
      activation === "active"
        ? "Pro is ACTIVE until the date shown."
        : activation === "manual_pending"
          ? "Cashfree received the payment, but no active Pro record exists yet — Pro is not active in the app until the webhook record lands."
          : "Payment is not marked PAID by Cashfree.",
  });
}
