import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "../../../lib/delivery";
import { getProByOrderId } from "../../../lib/pro-server";
import {
  getInstamojoPaymentStatus,
  upsertProFromInstamojo,
  instamojoOrderKey,
  getInstamojoProPurpose,
} from "../../../lib/instamojo";

/**
 * GET /api/pro-instamojo-status?payment_request_id=...&payment_id=...
 * Server-side check + activation fallback for an Instamojo Pro payment.
 *
 * WHY THIS ROUTE MAY ACTIVATE (unlike /api/pro-status, which is
 * read-only): the redirect from Instamojo appends payment_id +
 * payment_request_id, but the redirect itself is NOT trusted — it only
 * supplies the IDs. This route re-checks the payment with Instamojo's
 * own API, and activates ONLY on that gateway proof (Credit + Pro
 * purpose + amount >= ₹149), through the same idempotent upsert the
 * webhook uses. Same proof strength as the webhook path, second
 * trigger — so a missed webhook (retry behaviour undocumented) cannot
 * strand a paid buyer, and a forged redirect cannot grant Pro.
 *
 * activation values (honest, do not collapse them):
 * - "active": pro_orders has a paid IMJO row for this payment with
 *   pro_until in the future. Pro is ACTIVE.
 * - "manual_pending": Instamojo says Credit for a Pro payment, but no
 *   active pro_orders row exists (DB/env unavailable). Pro is NOT
 *   active in the app yet — do not display it as active.
 * - "not_paid": Instamojo does not say Credit for a Pro payment.
 */
export async function GET(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`pro-imjo-status:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const paymentRequestId = req.nextUrl.searchParams.get("payment_request_id") || "";
  const paymentId = req.nextUrl.searchParams.get("payment_id") || "";
  if (!paymentRequestId || !paymentId) {
    return NextResponse.json({ error: "payment_request_id and payment_id required" }, { status: 400 });
  }

  const st = await getInstamojoPaymentStatus(paymentRequestId, paymentId);
  if (!st.ok) {
    return NextResponse.json({ error: "Verification unavailable" }, { status: 503 });
  }

  const isProPayment =
    String(st.status) === "Credit" &&
    st.purpose === getInstamojoProPurpose() &&
    Number(st.amount) >= 149;
  if (!isProPayment) {
    return NextResponse.json({
      payment_request_id: paymentRequestId,
      payment_id: paymentId,
      status: st.status,
      paid: false,
      pro_active: false,
      activation: "not_paid",
      note: "Payment is not a Credit Pro payment per Instamojo.",
    });
  }

  const res = await upsertProFromInstamojo({
    paymentId: st.paymentId,
    status: st.status,
    amount: st.amount,
    buyerEmail: st.buyerEmail,
    buyerPhone: st.buyerPhone,
    purpose: st.purpose,
  });
  const pro = await getProByOrderId(instamojoOrderKey(st.paymentId));
  if (!res.ok) {
    return NextResponse.json({
      payment_request_id: paymentRequestId,
      payment_id: paymentId,
      status: st.status,
      paid: true,
      pro_active: pro.isPro,
      pro_until: pro.proUntil,
      activation: "manual_pending",
      note: "Instamojo received the payment, but no active Pro record exists yet — Pro is not active in the app until the record lands.",
    });
  }
  return NextResponse.json({
    payment_request_id: paymentRequestId,
    payment_id: paymentId,
    status: st.status,
    paid: true,
    pro_active: true,
    pro_until: res.proUntil,
    activation: "active",
    note: res.alreadyActive
      ? "Pro already active for this payment."
      : "Pro is ACTIVE until the date shown.",
  });
}
