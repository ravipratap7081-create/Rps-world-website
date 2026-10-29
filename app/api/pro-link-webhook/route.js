import { NextResponse } from "next/server";
import {
  getCashfreeLinkStatus,
  getServiceClient,
  checkRateLimit,
  getClientIp,
} from "../../../lib/delivery";
import { computeProUntil } from "../../../lib/pro-server";
import { PRO_PRICE_INR } from "../../../lib/pro";

/**
 * POST /api/pro-link-webhook
 * Cashfree Payment Link webhook for Pro ONLY (link ids PROLINK_...).
 *
 * ACTIVATION FLOW (the only activation path for link payments):
 * 1. Extract the merchant link_id from the payload (never trust the
 *    payload's link_status alone).
 * 2. Server-side re-check via Cashfree GET /pg/links/{link_id} — a
 *    webhook payload alone is never enough to grant Pro. (Link webhooks
 *    do not carry the PG webhook signature in the same form, so the
 *    server-side PAID confirmation IS the proof.)
 * 3. If gateway status is PAID and amount paid >= ₹149, upsert ONE
 *    pro_orders row (cashfree_order_id = "LINK:<link_id>", unique, so
 *    retries are idempotent and never extend Pro).
 *    pro_until = paid_at + 30 days. Email/phone come from Cashfree's own
 *    link record, never from a client body.
 * 4. If the pro_orders table/env is unavailable, return 503 — NEVER
 *    return ok:true claiming activation that did not happen.
 *
 * This endpoint deliberately does NOT touch delivery_orders and does NOT
 * issue any download token.
 */
export async function POST(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`webhook-pro-link:${ip}`, 60, 60_000)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const data = payload.data || payload;
  const linkId = data.link_id || payload.link_id || null;

  // Only Pro link payments belong here. Anything else is acknowledged, not acted on.
  if (!linkId || !String(linkId).startsWith("PROLINK_")) {
    return NextResponse.json({ ok: true, note: "not a Pro link, ignored" });
  }

  const cf = await getCashfreeLinkStatus(linkId);
  if (!cf.ok) {
    return NextResponse.json({ error: "verification unavailable" }, { status: 500 });
  }
  const paid = String(cf.linkStatus || "").toUpperCase() === "PAID" && Number(cf.linkAmountPaid || 0) >= PRO_PRICE_INR;
  if (!paid) {
    return NextResponse.json({ ok: true, link_id: linkId, paid: false, note: "Pro link payment not paid per gateway; no action taken." });
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
    const orderKey = `LINK:${linkId}`;
    const { data: existing } = await supabase
      .from("pro_orders")
      .select("cashfree_order_id, pro_until, status")
      .eq("cashfree_order_id", orderKey)
      .maybeSingle();
    if (existing && existing.status === "paid" && existing.pro_until) {
      return NextResponse.json({ ok: true, activated: true, link_id: linkId, pro_until: existing.pro_until, note: "Pro already active for this link; retry did not extend it." });
    }
    const email = String(cf.customerEmail || "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "pro_orders unavailable, manual activation pending" }, { status: 503 });
    }
    const paidAt = new Date();
    const proUntil = computeProUntil(paidAt);
    const { error } = await supabase.from("pro_orders").upsert(
      {
        cashfree_order_id: orderKey,
        customer_email: email,
        customer_phone: cf.customerPhone ? String(cf.customerPhone) : null,
        amount: Number(cf.linkAmountPaid) || PRO_PRICE_INR,
        currency: cf.linkCurrency || "INR",
        status: "paid",
        paid_at: paidAt.toISOString(),
        pro_until: proUntil.toISOString(),
      },
      { onConflict: "cashfree_order_id" }
    );
    if (error) {
      console.error("pro link webhook upsert failed:", error.message);
      return NextResponse.json({ error: "pro_orders unavailable, manual activation pending" }, { status: 503 });
    }
    return NextResponse.json({ ok: true, activated: true, link_id: linkId, pro_until: proUntil.toISOString(), note: "Pro activated for 30 days from payment. No Diwali token issued." });
  } catch (e) {
    console.error("pro link webhook failed:", e?.message || e);
    return NextResponse.json({ error: "pro_orders unavailable, manual activation pending" }, { status: 503 });
  }
}
