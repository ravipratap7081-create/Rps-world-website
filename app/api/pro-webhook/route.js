import { NextResponse } from "next/server";
import {
  verifyCashfreeSignature,
  isTimestampFresh,
  getCashfreeOrderStatus,
  getServiceClient,
  checkRateLimit,
  getClientIp,
} from "../../../lib/delivery";
import { computeProUntil } from "../../../lib/pro-server";
import { PRO_PRICE_INR } from "../../../lib/pro";

/**
 * POST /api/pro-webhook
 * Cashfree webhook endpoint for Pro orders ONLY (order ids PRO149_...).
 *
 * ACTIVATION FLOW (the only activation path):
 * 1. Verify Cashfree signature on the RAW body + freshness (5 min).
 * 2. Server-side re-check via Cashfree GET /pg/orders/{id} — a signed
 *    webhook alone is never enough to grant Pro.
 * 3. If gateway status is PAID, upsert ONE pro_orders row (unique on
 *    cashfree_order_id, so retries are idempotent and never extend Pro).
 *    pro_until = paid_at + 30 days. Email/phone come from Cashfree's own
 *    order record, never from a client body.
 * 4. If the pro_orders table/env is unavailable, return 503 (Cashfree
 *    retries) with a manual-pending note — NEVER return ok:true claiming
 *    activation that did not happen.
 *
 * This endpoint deliberately does NOT touch delivery_orders and does NOT
 * issue any download token. The Diwali-pack webhook does that, and a Pro
 * payment flowing through it would wrongly issue a Diwali pack token.
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
  if (!paid) {
    return NextResponse.json({ ok: true, order_id: orderId, paid: false, note: "Pro payment not paid per gateway; no action taken." });
  }

  // PAID, verified server-side — now write the activation record.
  // Idempotent: an existing paid row keeps its original pro_until.
  let supabase;
  try {
    supabase = getServiceClient();
  } catch {
    return NextResponse.json({ error: "pro_orders unavailable, manual activation pending" }, { status: 503 });
  }
  try {
    const { data: existing } = await supabase
      .from("pro_orders")
      .select("cashfree_order_id, pro_until, status")
      .eq("cashfree_order_id", orderId)
      .maybeSingle();
    if (existing && existing.status === "paid" && existing.pro_until) {
      return NextResponse.json({ ok: true, activated: true, order_id: orderId, pro_until: existing.pro_until, note: "Pro already active for this order; retry did not extend it." });
    }
    const email = String(cf.customerEmail || "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "pro_orders unavailable, manual activation pending" }, { status: 503 });
    }
    const paidAt = new Date();
    const proUntil = computeProUntil(paidAt);
    const { error } = await supabase.from("pro_orders").upsert(
      {
        cashfree_order_id: orderId,
        customer_email: email,
        customer_phone: cf.customerPhone ? String(cf.customerPhone) : null,
        amount: Number(cf.orderAmount) || PRO_PRICE_INR,
        currency: cf.orderCurrency || "INR",
        status: "paid",
        paid_at: paidAt.toISOString(),
        pro_until: proUntil.toISOString(),
      },
      { onConflict: "cashfree_order_id" }
    );
    if (error) {
      console.error("pro webhook upsert failed:", error.message);
      return NextResponse.json({ error: "pro_orders unavailable, manual activation pending" }, { status: 503 });
    }
    return NextResponse.json({ ok: true, activated: true, order_id: orderId, pro_until: proUntil.toISOString(), note: "Pro activated for 30 days from payment. No Diwali token issued." });
  } catch (e) {
    console.error("pro webhook failed:", e?.message || e);
    return NextResponse.json({ error: "pro_orders unavailable, manual activation pending" }, { status: 503 });
  }
}
