// lib/instamojo.js — SERVER ONLY. Never import from client components.
//
// Instamojo fallback rail for Pro Universe Pro (₹149/month, no
// auto-renewal — same single Pro definition as lib/pro.js).
//
// WHY THIS RAIL EXISTS: the Cashfree SDK checkout() promise never
// settled in the VM browser across 6 attempts (button stuck on
// "Please wait…", no payment ever made). This rail uses NO in-page
// SDK and NO JS checkout promise: the buyer is sent by full-page
// navigation to an Instamojo-hosted payment page — the same
// hosted-checkout pattern proven by the real ₹149 Diwali pack test
// payment on 16 Oct 2026 (Instamojo product 7477123). A hosted page
// cannot hang the way an unsettled JS promise can; if it fails, it
// fails visibly (error page / redirect with Failed status).
//
// DESIGN (mirrors the Cashfree routes' rules, nothing weaker):
// 1. /api/checkout/pro-instamojo creates a payment request server-side
//    (purpose, amount, buyer, redirect_url, webhook) and returns its
//    longurl. No pro_orders row is created here.
// 2. Activation happens ONLY from gateway-verified state: the webhook
//    (/api/pro-instamojo-webhook) verifies the MAC, then re-checks the
//    payment via Instamojo's API; the status route
//    (/api/pro-instamojo-status) does the same API re-check for a
//    payment the buyer was redirected back from. A redirect or a
//    webhook payload ALONE never grants Pro.
// 3. Activation writes ONE pro_orders row, keyed IMJO:<payment_id> in
//    the existing cashfree_order_id column (precedent: the Cashfree
//    link rail keys LINK:<link_id> in the same column). The column is
//    UNIQUE, so duplicate webhooks / double status checks are
//    idempotent and never extend pro_until.
// 4. This rail NEVER touches delivery_orders and NEVER issues a Diwali
//    download token. A Diwali pack payment reaching the Pro webhook
//    (different purpose) is acknowledged and ignored.
// 5. Email/phone come from Instamojo's own payment record, never from
//    a client body. paid_at is the server verification time (same
//    convention as the Cashfree webhook routes); pro_until = +30 days.
//
// Env required (fail closed, no fallbacks, NO secrets in this file):
//   INSTAMOJO_API_KEY, INSTAMOJO_AUTH_TOKEN  (from the merchant's
//     Instamojo dashboard, Developers / API credentials)
//   INSTAMOJO_PRIVATE_SALT  (webhook MAC salt, same dashboard page)
//   INSTAMOJO_API_BASE  (optional; default https://www.instamojo.com/api/1.1)
//   INSTAMOJO_PRO_PURPOSE  (optional; default "ProTools Pro — Monthly")
//   APP_URL  (must be exactly https://rps-world-website.onrender.com)
//
// Sources (checked 29 Oct 2026, not invented):
// - Webhook fields + form-urlencoded POST: docs.instamojo.com
//   "What is a webhook" and support.instamojo.com "Webhook URL".
// - MAC scheme: support.instamojo.com "What is the Message
//   Authentication Code in Webhook?" — remove "mac", sort remaining
//   keys alphabetically by lower-cased key, join values with "|",
//   HMAC-SHA1 with the private salt.
// - Redirect appends payment_id + payment_request_id, and status is
//   fetched via GET payment-requests/{id}: support.instamojo.com
//   "Payment Notification via API".
// - OPEN VERIFICATION ITEMS (see INSTAMOJO-PRO-RAIL-DESIGN.md):
//   (a) whether the live API answers v1.1 shape
//   { payment_request: { purpose, payments: [...] } } — the parser
//   below accepts that shape and fails closed on anything else;
//   (b) Instamojo webhook retry behaviour is undocumented in the
//   sources above, so the status route exists as the second,
//   equally-verified activation trigger for missed webhooks.
import crypto from "crypto";
import { getServiceClient } from "./delivery";
import { computeProUntil } from "./pro-server";
import { PRO_PRICE_INR } from "./pro";

export const INSTAMOJO_PRO_PURPOSE_DEFAULT = "ProTools Pro — Monthly";

export function getInstamojoProPurpose() {
  const p = (process.env.INSTAMOJO_PRO_PURPOSE || "").trim();
  return p || INSTAMOJO_PRO_PURPOSE_DEFAULT;
}

export function getInstamojoApiBase() {
  return (process.env.INSTAMOJO_API_BASE || "https://www.instamojo.com/api/1.1").replace(/\/$/, "");
}

// pro_orders key for an Instamojo payment. Same column, same UNIQUE
// constraint as the Cashfree rails (PRO149_... / LINK:...).
export function instamojoOrderKey(paymentId) {
  return `IMJO:${paymentId}`;
}

export function isInstamojoOrderKey(key) {
  return typeof key === "string" && key.startsWith("IMJO:") && key.length > 5;
}

// Instamojo webhooks arrive as application/x-www-form-urlencoded, NOT
// JSON. Parse the raw text the way PHP's $_POST would see it.
export function parseInstamojoWebhookBody(rawText) {
  const params = new URLSearchParams(rawText || "");
  const out = {};
  for (const [k, v] of params.entries()) out[k] = v;
  return out;
}

// Verify an Instamojo webhook MAC. fields = parsed POST body INCLUDING
// "mac". Returns false on any missing input, any tampering, or any
// length mismatch (timing-safe compare, never ==).
export function verifyInstamojoMac(fields, salt) {
  if (!fields || typeof fields !== "object" || !salt) return false;
  const mac = fields.mac;
  if (!mac) return false;
  try {
    const entries = Object.entries(fields).filter(([k]) => k !== "mac");
    entries.sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const message = entries.map(([, v]) => String(v)).join("|");
    const expected = crypto.createHmac("sha1", salt).update(message, "utf8").digest("hex");
    const a = Buffer.from(mac, "utf8");
    const b = Buffer.from(expected, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function instamojoAuthHeaders() {
  const apiKey = process.env.INSTAMOJO_API_KEY;
  const authToken = process.env.INSTAMOJO_AUTH_TOKEN;
  if (!apiKey || !authToken) return null;
  return { "X-Api-Key": apiKey, "X-Auth-Token": authToken };
}

// Server-side payment verification — the ONLY proof activation trusts.
// GET /payment-requests/{payment_request_id}/, then find payment_id
// inside its payments list. paymentId is REQUIRED: falling back to
// payments[0] could pick a Failed attempt when a later Credit exists.
// Returns { ok, status, amount, buyerEmail, buyerPhone, buyerName,
// purpose, paymentId, paymentRequestId } or { ok: false, error }.
export async function getInstamojoPaymentStatus(paymentRequestId, paymentId) {
  const headers = instamojoAuthHeaders();
  if (!headers) return { ok: false, error: "instamojo credentials missing" };
  if (!paymentRequestId || !paymentId) {
    return { ok: false, error: "payment_request_id and payment_id required" };
  }
  const base = getInstamojoApiBase();
  let r;
  try {
    r = await fetch(`${base}/payment-requests/${encodeURIComponent(paymentRequestId)}/`, { headers });
  } catch (e) {
    return { ok: false, error: `instamojo api unreachable: ${e?.message || e}` };
  }
  if (!r.ok) return { ok: false, error: `instamojo api ${r.status}` };
  let data;
  try {
    data = await r.json();
  } catch {
    return { ok: false, error: "instamojo api bad json" };
  }
  const pr = data.payment_request || {};
  const payments = Array.isArray(pr.payments) ? pr.payments : [];
  const pay = payments.find((p) => String(p.payment_id) === String(paymentId));
  if (!pay) return { ok: false, error: "payment not found in payment request" };
  return {
    ok: true,
    status: pay.status, // "Credit" | "Failed" per Instamojo docs
    amount: Number(pay.amount),
    buyerEmail: pay.buyer_email || null,
    buyerPhone: pay.buyer_phone || null,
    buyerName: pay.buyer_name || null,
    purpose: pr.purpose || null,
    paymentId: String(pay.payment_id),
    paymentRequestId: String(pr.id || paymentRequestId),
  };
}

// Create the hosted payment request for one Pro month. Returns
// { ok, longurl, paymentRequestId } — the client navigates to longurl
// with window.location.href (full-page redirect, no SDK, no promise).
export async function createInstamojoProPaymentRequest({ email, phone, name }) {
  const headers = instamojoAuthHeaders();
  if (!headers) return { ok: false, error: "instamojo credentials missing" };
  const baseUrl = process.env.APP_URL;
  const allowedUrls = ["https://rps-world-website.onrender.com"];
  if (!baseUrl || !allowedUrls.includes(baseUrl)) {
    return { ok: false, error: "payment not configured" };
  }
  const base = getInstamojoApiBase();
  const form = new URLSearchParams({
    purpose: getInstamojoProPurpose(),
    amount: String(PRO_PRICE_INR),
    buyer_name: name || "Customer",
    email,
    phone,
    // Instamojo appends payment_id + payment_request_id to this URL on
    // redirect, so the return page can call /api/pro-instamojo-status.
    redirect_url: `${baseUrl}/coins?imjo=1`,
    webhook: `${baseUrl}/api/pro-instamojo-webhook`,
    // Each month creates a FRESH request anyway; true only lets a failed
    // first attempt retry on the same link instead of needing a new one.
    allow_repeated_payments: "true",
    send_email: "true",
  });
  let r;
  try {
    r = await fetch(`${base}/payment-requests/`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
  } catch (e) {
    return { ok: false, error: `instamojo api unreachable: ${e?.message || e}` };
  }
  if (!r.ok) {
    const t = await r.text().catch(() => "");
    console.error("Instamojo Pro payment request failed:", t.slice(0, 200));
    return { ok: false, error: `instamojo api ${r.status}` };
  }
  let data;
  try {
    data = await r.json();
  } catch {
    return { ok: false, error: "instamojo api bad json" };
  }
  const pr = data.payment_request || {};
  if (!pr.longurl || !pr.id) {
    return { ok: false, error: "instamojo response missing longurl/id" };
  }
  return { ok: true, longurl: pr.longurl, paymentRequestId: String(pr.id) };
}

// Shared activation gate + upsert for BOTH the webhook route and the
// status route. Gates run here (not just in the callers) so no future
// caller can activate on an unverified payment by mistake:
//   status must be "Credit", purpose must be the Pro purpose, amount
//   must be >= ₹149, email must come from the gateway record.
// Idempotent: an existing paid row keeps its ORIGINAL pro_until — a
// duplicate webhook or a second status check never extends Pro.
// Returns { ok, activated, alreadyActive, proUntil, reason|error }.
// "activated: false" with ok:true means "checked, correctly no action"
// (not-Credit / wrong purpose / low amount). ok:false means the DB/env
// was unavailable — caller must answer 503, never ok:true.
export async function upsertProFromInstamojo(verified) {
  if (String(verified?.status) !== "Credit") {
    return { ok: true, activated: false, reason: "payment not Credit per gateway" };
  }
  if (verified.purpose !== getInstamojoProPurpose()) {
    return { ok: true, activated: false, reason: "purpose is not a Pro payment" };
  }
  if (!(Number(verified.amount) >= PRO_PRICE_INR)) {
    return { ok: true, activated: false, reason: "amount below Pro price" };
  }
  const email = String(verified.buyerEmail || "").trim().toLowerCase();
  if (!email) {
    return { ok: false, error: "pro_orders unavailable, manual activation pending" };
  }
  let supabase;
  try {
    supabase = getServiceClient();
  } catch {
    return { ok: false, error: "pro_orders unavailable, manual activation pending" };
  }
  const orderKey = instamojoOrderKey(verified.paymentId);
  try {
    const { data: existing } = await supabase
      .from("pro_orders")
      .select("cashfree_order_id, pro_until, status")
      .eq("cashfree_order_id", orderKey)
      .maybeSingle();
    if (existing && existing.status === "paid" && existing.pro_until) {
      return { ok: true, activated: true, alreadyActive: true, proUntil: existing.pro_until };
    }
    const paidAt = new Date();
    const proUntil = computeProUntil(paidAt);
    const { error } = await supabase.from("pro_orders").upsert(
      {
        cashfree_order_id: orderKey,
        customer_email: email,
        customer_phone: verified.buyerPhone ? String(verified.buyerPhone) : null,
        amount: Number(verified.amount) || PRO_PRICE_INR,
        currency: "INR",
        status: "paid",
        paid_at: paidAt.toISOString(),
        pro_until: proUntil.toISOString(),
      },
      { onConflict: "cashfree_order_id" }
    );
    if (error) {
      console.error("instamojo pro upsert failed:", error.message);
      return { ok: false, error: "pro_orders unavailable, manual activation pending" };
    }
    return { ok: true, activated: true, alreadyActive: false, proUntil: proUntil.toISOString() };
  } catch (e) {
    console.error("instamojo pro upsert failed:", e?.message || e);
    return { ok: false, error: "pro_orders unavailable, manual activation pending" };
  }
}
