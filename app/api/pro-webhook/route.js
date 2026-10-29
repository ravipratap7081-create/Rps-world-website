import { NextResponse } from "next/server";
import {
  verifyCashfreeSignature,
  isTimestampFresh,
  getCashfreeOrderStatus,
  checkRateLimit,
  getClientIp,
} from "../../../lib/delivery";

/**
 * POST /api/pro-webhook
 * Cashfree webhook endpoint for Pro orders ONLY (order ids PRO149_...).
 *
 * This endpoint deliberately does NOT touch delivery_orders and does NOT
 * issue any download token. The Diwali-pack webhook does that, and a Pro
 * payment flowing through it would wrongly issue a Diwali pack token.
 *
 * Until the pro_orders table migration is approved and applied, this
 * endpoint only verifies signature + freshness + gateway status and
 * acknowledges. Fulfilment/activation is manual. Never treat an
 * acknowledgement here as Pro activation.
 */
export async function POST(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`webhook-pro:${ip}`, 60, 60_000)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  const secret = process.env.CASHFREE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let rawBody;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }

  const signature = req.headers.get("x-webhook-signature");
  const timestamp = req.headers.get("x-webhook-timestamp");
  if (!verifyCashfreeSignature(rawBody, timestamp, signature, secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }
  if (!isTimestampFresh(timestamp, 300)) {
    return NextResponse.json({ error: "stale webhook" }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const data = payload.data || payload;
  const order = data.order || {};
  const orderId = order.order_id || data.order_id || payload.order_id || null;

  // Only Pro orders belong here. Anything else is acknowledged, not acted on.
  if (!orderId || !String(orderId).startsWith("PRO149_")) {
    return NextResponse.json({ ok: true, note: "not a Pro order, ignored" });
  }

  const cf = await getCashfreeOrderStatus(orderId);
  if (!cf.ok) {
    return NextResponse.json({ error: "verification unavailable" }, { status: 500 });
  }
  const paid = String(cf.orderStatus || "").toUpperCase() === "PAID";
  return NextResponse.json({
    ok: true,
    order_id: orderId,
    paid,
    note: paid
      ? "Pro payment confirmed by gateway; activation is manual within 24 hours until the pro_orders table is approved. No Diwali token issued."
      : "Pro payment not paid per gateway; no action taken.",
  });
}
