/**
 * lib/delivery.js — shared helpers for the Diwali Pack automated delivery.
 *
 * SECURITY RULES (ChatGPT-validated 2026-10-15):
 *  - Never log tokens, secrets, signatures, or raw webhook payloads.
 *  - Store only SHA-256 hashes of download tokens, never plain tokens.
 *  - Token claim must be atomic (see claim_download_token RPC).
 *  - Do NOT bind tokens to IP addresses.
 *  - All secrets come from environment variables.
 */
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Supabase service-role client (server only — bypasses RLS for delivery ops)
// ---------------------------------------------------------------------------
let _serviceClient = null;
export function getServiceClient() {
  if (_serviceClient) return _serviceClient;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error("delivery misconfigured: SUPABASE_URL / SUPABASE_SERVICE_KEY missing");
  }
  _serviceClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _serviceClient;
}

// ---------------------------------------------------------------------------
// Cashfree webhook signature verification
// Scheme (verified vs cashfree.com docs 2026-10-15):
//   expected = base64( HMAC-SHA256( x-webhook-timestamp + rawBody, CLIENT_SECRET ) )
// Compare with x-webhook-signature using timing-safe equality.
// IMPORTANT: use the RAW request body, never parsed JSON.
// ---------------------------------------------------------------------------
export function verifyCashfreeSignature(rawBody, timestamp, signature, secret) {
  if (!rawBody || !timestamp || !signature || !secret) return false;
  try {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(timestamp + rawBody)
      .digest("base64");
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// Replay guard: reject webhooks older than maxAgeSec (default 5 min).
export function isTimestampFresh(timestamp, maxAgeSec = 300) {
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || ts <= 0) return false;
  // Cashfree sends seconds (10 digits) or millis (13 digits).
  const tsMs = String(timestamp).length >= 13 ? ts : ts * 1000;
  const ageMs = Date.now() - tsMs;
  return ageMs >= -60000 && ageMs <= maxAgeSec * 1000; // allow 60s clock skew into future
}

// ---------------------------------------------------------------------------
// Download tokens: 32 cryptographically random bytes.
// Plain token -> customer (hex, 64 chars). Only SHA-256 hash -> database.
// ---------------------------------------------------------------------------
export function generateToken() {
  const token = crypto.randomBytes(32).toString("hex");
  return { token, tokenHash: hashToken(token) };
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token, "utf8").digest("hex");
}

export function isValidTokenFormat(token) {
  return typeof token === "string" && /^[0-9a-f]{64}$/.test(token);
}

// ---------------------------------------------------------------------------
// Cashfree server-side order verification (second factor beyond signature).
// Calls GET /pg/orders/{order_id} and returns { ok, status, amount }.
// ---------------------------------------------------------------------------
export async function getCashfreeOrderStatus(orderId) {  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  const env = (process.env.CASHFREE_ENV || "PROD").toUpperCase();
  if (!appId || !secret) {
    return { ok: false, error: "cashfree credentials missing" };
  }
  const base =
    env === "SANDBOX" ? "https://sandbox.cashfree.com" : "https://api.cashfree.com";
  const r = await fetch(`${base}/pg/orders/${encodeURIComponent(orderId)}`, {
    headers: {
      "x-client-id": appId,
      "x-client-secret": secret,
      "x-api-version": "2023-08-01",
    },
  });
  if (!r.ok) {
    return { ok: false, error: `cashfree api ${r.status}` };
  }
  const data = await r.json();
  return {
    ok: true,
    orderStatus: data.order_status, // e.g. "PAID", "ACTIVE"
    orderAmount: Number(data.order_amount),
    orderCurrency: data.order_currency,
    // Customer details come from Cashfree's own record, never from a
    // client body — the Pro webhook uses these to write pro_orders.
    customerEmail: data.customer_details?.customer_email || null,
    customerPhone: data.customer_details?.customer_phone || null,
  };
}

// ---------------------------------------------------------------------------
// Cashfree Payment Link status (server-side re-check for Pro link payments).
// GET /pg/links/{link_id} — link_id is the merchant-provided link id.
// Returns { ok, linkStatus, linkAmount, linkAmountPaid, customerEmail,
// customerPhone } or { ok: false, error }. Activation must use ONLY this
// server-side result, never the webhook payload's status alone.
// ---------------------------------------------------------------------------
export async function getCashfreeLinkStatus(linkId) {
  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  const env = (process.env.CASHFREE_ENV || "PROD").toUpperCase();
  if (!appId || !secret) {
    return { ok: false, error: "cashfree credentials missing" };
  }
  const base =
    env === "SANDBOX" ? "https://sandbox.cashfree.com" : "https://api.cashfree.com";
  const r = await fetch(`${base}/pg/links/${encodeURIComponent(linkId)}`, {
    headers: {
      "x-client-id": appId,
      "x-client-secret": secret,
      "x-api-version": "2023-08-01",
    },
  });
  if (!r.ok) {
    return { ok: false, error: `cashfree api ${r.status}` };
  }
  const data = await r.json();
  return {
    ok: true,
    linkStatus: data.link_status, // e.g. "ACTIVE", "PAID", "EXPIRED"
    linkAmount: Number(data.link_amount),
    linkAmountPaid: Number(data.link_amount_paid || 0),
    linkCurrency: data.link_currency,
    customerEmail: data.customer_details?.customer_email || null,
    customerPhone: data.customer_details?.customer_phone || null,
  };
}

// ---------------------------------------------------------------------------
// Email via Resend (native fetch — no extra dependency).
// Set RESEND_API_KEY and DELIVERY_FROM_EMAIL.
// Returns { ok: true } or { ok: false, error }.
// Never include secrets in logs; caller must not log the download URL token.
// ---------------------------------------------------------------------------
export async function sendDownloadEmail({ to, downloadUrl, orderId }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DELIVERY_FROM_EMAIL || "ProTools <noreply@pro-universe.in>";
  if (!apiKey) {
    console.warn("delivery: RESEND_API_KEY missing — email not sent");
    return { ok: false, error: "email not configured" };
  }
  if (!to || !to.includes("@")) {
    return { ok: false, error: "invalid recipient" };
  }
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "Your Diwali Business Promo Pack is ready 🪔",
        html:
          `<p>Hi,</p>` +
          `<p>Your payment was successful. Download your <strong>Diwali Business Promo Pack</strong> (12 creatives + 34 texts) here:</p>` +
          `<p><a href="${downloadUrl}">Download your pack</a></p>` +
          `<p>This link is single-use and expires in 24 hours. If it expires, reply to this email or use the resend option on our site.</p>` +
          `<p>Order: ${escapeHtml(orderId)}</p>` +
          `<p>— Team ProTools</p>`,
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error("delivery: resend failed with status", r.status);
      return { ok: false, error: `resend ${r.status}: ${t.slice(0, 120)}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("delivery: email send threw:", e.message);
    return { ok: false, error: "email send failed" };
  }
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

// ---------------------------------------------------------------------------
// Audit log — event names only, NEVER tokens/secrets/payloads.
// ---------------------------------------------------------------------------
export async function auditLog(supabase, orderId, event, detail) {
  try {
    await supabase.from("delivery_audit").insert({
      order_id: orderId || null,
      event,
      detail: detail ? String(detail).slice(0, 500) : null,
    });
  } catch (e) {
    console.error("delivery: audit log failed:", e.message);
  }
}

// ---------------------------------------------------------------------------
// Best-effort in-memory rate limiter (per serverless instance).
// key -> { count, resetAt }. Returns true if allowed.
// ---------------------------------------------------------------------------
const _buckets = new Map();
export function checkRateLimit(key, maxHits, windowMs) {
  const now = Date.now();
  let b = _buckets.get(key);
  if (!b || now >= b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    _buckets.set(key, b);
  }
  b.count += 1;
  // Opportunistic cleanup
  if (_buckets.size > 5000) {
    for (const [k, v] of _buckets) if (now >= v.resetAt) _buckets.delete(k);
  }
  return b.count <= maxHits;
}

export function getClientIp(req) {
  const h = req.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

// Build the public download URL for a plain token.
export function buildDownloadUrl(token) {
  const base = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
  if (!base) throw new Error("delivery misconfigured: APP_URL missing");
  return `${base}/api/download/${token}`;
}

/**
 * Send Meta Conversions API Purchase event (server-side).
 * Called from webhook after payment is verified.
 * Uses same event_id as browser Pixel for deduplication.
 *
 * @param {string} eventId - Unique event ID (use order ID for dedup)
 * @param {string} customerEmail - Customer email (hashed by Meta)
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function sendMetaPurchaseEvent(eventId, customerEmail) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn("delivery: Meta Conversions API not configured, skipping");
    return { ok: false, error: "not configured" };
  }

  try {
    // Hash email with SHA256 as required by Meta
    const crypto = await import("crypto");
    const hashedEmail = customerEmail
      ? crypto.createHash("sha256").update(customerEmail.toLowerCase().trim()).digest("hex")
      : undefined;

    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId, // Same as browser event for deduplication
          action_source: "website",
          user_data: {
            ...(hashedEmail && { em: [hashedEmail] }),
          },
          custom_data: {
            value: 149,
            currency: "INR",
            content_name: "Diwali Business Promo Pack",
            content_category: "Digital Product",
          },
        },
      ],
    };

    const res = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("delivery: Meta CAPI failed:", res.status, errText.slice(0, 200));
      return { ok: false, error: `HTTP ${res.status}` };
    }

    return { ok: true };
  } catch (e) {
    console.error("delivery: Meta CAPI error:", e.message);
    return { ok: false, error: e.message };
  }
}
