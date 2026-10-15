# Pro Universe — Payment Integration Design (Razorpay, server-side only)

**Status:** DESIGN ONLY — nothing here is implemented, nothing is wired into the app.
**Gating condition:** implement ONLY after Razorpay restores the disabled merchant account
(Ticket 21343834, appeal pending as of 2026-10-12). Do NOT open a new Razorpay application,
do NOT touch the dashboard, do NOT create keys until the appeal resolves.

Hard constraints for this design:
- No Cashfree anywhere (it does not exist for this project).
- No personal UPI / QR workaround anywhere.
- No fake or simulated checkout — either a real verified Razorpay payment or no sale at all.
- No secrets in any file. All credentials are placeholders here.
- No production code changes: the sketch files in this directory are not imported, not
  routed, not referenced by the app.

---

## 1. Architecture

```
Browser (buyer)                     Next.js server (Vercel)              Razorpay
----------------                    -----------------------              --------
 "Buy now" click
      ──POST /api/orders─────────▶  (app router API route)
                                     create Order via Razorpay Orders API
                                     using KEY_SECRET (server-only)
                                     store: order_id, amount, status='created'
                                     (table: payments, or Supabase row)
      ◀──────── order_id + KEY_ID ──  (browser gets ONLY these two values)
 Checkout.js modal opens,
 buyer pays with UPI/card/etc.
      ──payment success──────────▶
      ──POST /api/payments/verify─▶  server fetches payment from Razorpay API,
 (razorpay_payment_id +           verify amount/currency/order_id match,
  razorpay_order_id +             status == 'captured'
  razorpay_signature)
      ◀──────── signed download URL ── issued ONLY if verified
 buyer downloads pack
                                     Razorpay webhook (async safety net)
      Razorpay ──POST /api/webhooks/razorpay──▶  HMAC-SHA256 verify signature
                                              with WEBHOOK_SECRET; reconcile
```

Rules:
- The Razorpay Orders API is called **only** from a server-side API route. The browser
  never sees the key secret and never calls Razorpay's REST API directly.
- The browser receives exactly two values: the public `RAZORPAY_KEY_ID` and the
  `order_id`. Everything sensitive stays server-side.
- Checkout UI is Razorpay's hosted **Checkout.js modal** (`checkout.razorpay.com/v1/checkout.js`);
  no card/UPI fields are ever handled by Pro Universe code. PCI-DSS scope stays with Razorpay.
- Amount is fixed server-side (e.g. ₹499 for Business pack, ₹999 for Premium pack —
  placeholder prices; final prices per pricing decision). The browser must NOT be able
  to set or alter the amount.

---

## 2. Credential handling

Exact env var names needed (set in Vercel Project → Settings → Environment Variables,
Production only for live keys; Preview/Test mode keys for staging if/when approved):

| Variable               | Where it may appear        | Notes                                      |
|------------------------|----------------------------|--------------------------------------------|
| `RAZORPAY_KEY_ID`      | Server env + browser bundle| Public. Safe to expose; used by Checkout.js|
| `RAZORPAY_KEY_SECRET`  | **Server env ONLY**        | Never in repo, never in client JS, never logged |
| `RAZORPAY_WEBHOOK_SECRET` | **Server env ONLY**     | Set in Razorpay dashboard webhook config; used for HMAC verification |
| `DOWNLOAD_SIGNING_SECRET` | **Server env ONLY**     | Separate random 32-byte secret for signing download URLs (NOT a Razorpay key) |

Additional rules:
- Keys rotate via the Razorpay dashboard only; after rotation, update Vercel env and redeploy.
- Never commit `.env`, `.env.local`, or any file containing these values.
- Never print secrets in logs, error messages, or API responses. Log only `order_id` / `payment_id`.
- No secrets anywhere in `preview-work/` sketches — placeholders only (see §7).

---

## 3. Verification (the most important part)

Unlocking is gated on **server-side verification only**. The client-side "payment success"
callback is informational and untrusted — a buyer can forge it.

### Primary path: server-side order fetch
On `/api/payments/verify` (POST, body: `razorpay_payment_id`, `razorpay_order_id`,
`razorpay_signature`):
1. Verify the signature with `RAZORPAY_KEY_SECRET` (HMAC-SHA256 of `order_id|payment_id`,
   compare with `razorpay_signature` using a timing-safe compare).
2. **Fetch the payment directly from Razorpay's API server-side**
   (`GET https://api.razorpay.com/v1/payments/{payment_id}` with basic auth KEY_ID:KEY_SECRET).
3. Assert ALL of the following before unlocking:
   - `payment.status === 'captured'` (not just `authorized` — auto-capture is on, but never assume)
   - `payment.order_id === <our stored order_id>`
   - `payment.amount === <our stored amount in paise>` (e.g. 49900 for ₹499)
   - `payment.currency === 'INR'`
   - the order belongs to this purchase intent (same pack, no tampering)
4. Idempotency: if the order row already has `status='paid'`, return the existing download
   grant instead of creating a second one (safe replay).

### Async safety net: webhook
Configure ONE webhook in the Razorpay dashboard pointing at
`https://<prod-domain>/api/webhooks/razorpay` with events `payment.captured` and
`payment.failed`:
1. Verify the `x-razorpay-signature` header with `RAZORPAY_WEBHOOK_SECRET`:
   `HMAC-SHA256(webhook_body, WEBHOOK_SECRET)` — timing-safe compare. Reject (401) on mismatch.
2. On `payment.captured`: look up the order by `entity.order_id`, re-assert amount/currency,
   mark paid if not already, create/return the download grant (idempotent — webhook may retry).
3. On `payment.failed`: mark the order failed; never unlock.
4. Respond 200 quickly; do any slow work after responding. Razorpay retries failed webhooks —
   handlers must be safe to run twice (idempotent by `payment_id`).

The client-side success callback may pre-fetch the verification endpoint for a faster UX,
but the **webhook is the source of truth** if they disagree.

---

## 4. Download unlock — only after verified payment

Never link directly to static files (e.g. `/downloads/pack.zip` is public to anyone who
guesses the URL). Instead:

1. On verified payment, the server creates a **single-purpose, time-limited grant**:
   - Generate a random token (`crypto.randomBytes(32)`), store it server-side with:
     `token_hash, order_id, payment_id, pack_id, expires_at (now + 24h), download_count`.
   - Issue the buyer a signed URL: `https://<domain>/api/download?token=<token>`.
2. The `/api/download` route:
   - Looks up the token hash, rejects if missing / expired (>24h) / already used beyond
     allowed count (suggest: up to 3 downloads within the window to tolerate broken
     connections; log every download).
   - Streams the file from server-side storage (Supabase private bucket — same pattern as
     the existing vault-docs bucket, NOT a public bucket), with `Content-Disposition:
     attachment` and no caching headers (`Cache-Control: private, no-store`).
3. Idempotency: the same `order_id` maps to exactly one grant row (`UNIQUE(order_id)`).
   Re-verification of an already-paid order returns the existing token (or a fresh token
   for the same grant within the window) — never double-charges, never creates a second
   grant.
4. Anti-leak: tokens are single-purpose (download only, no other route accepts them),
   hashed at rest (SHA-256 of the token stored; compare hashes), never logged in full
   (log first 8 chars only).

---

## 5. Failure handling

| Situation | Server does | Buyer sees |
|---|---|---|
| Payment fails at checkout (declined, UPI timeout) | order stays `created`/`failed`; no grant | Razorpay modal's own failure state + our honest message: "Payment didn't go through. No money was taken — you can try again." |
| Payment `authorized` but never captured | order stays pending; capture/expiry follows Razorpay rules; webhook `payment.failed` eventually | "We're still confirming with your bank. If money was debited, it will auto-refund." |
| Verification API call to Razorpay fails (network) | retry with backoff (3 attempts); order stays pending; webhook remains the backstop | "Confirming your payment… please wait / check back in a minute." Never show success prematurely. |
| Webhook signature mismatch | 401, log, alert | Buyer unaffected (primary path already handled it, or still pending). |
| Webhook arrives before client callback | grant created; client verification later finds `status='paid'` and returns existing grant (idempotent) | Normal success flow. |
| Duplicate webhook delivery | dedupe by `payment_id`; no-op | Nothing changes. |
| Refund needed | Manual: Razorpay Dashboard → Payments → select payment → Refund (full/partial). Update order row to `refunded`; optionally revoke unexpired download tokens for that order. Refunds take 5–7 working days per Razorpay norms — say that explicitly. | "Refund initiated — expect it in 5–7 working days." |

Buyer messaging rule: **never display a success/download screen until the server has
returned a verified grant.** Honest failure copy beats a false "Payment successful".

---

## 6. Explicitly OUT OF SCOPE until approval

- No test transactions against Razorpay (not even ₹1) — Test Mode only if/when approved.
- No live API keys generated, stored, or used anywhere.
- No checkout UI wired into the app (no buttons, no routes, no Checkout.js script tag).
- No webhook endpoint registered in the Razorpay dashboard.
- No `payments` / download-grant tables created in Supabase.
- No changes to existing pages, the vault, or the coins system.

When the appeal resolves and Ravi approves, the implementation order is:
1. Create env vars (Test Mode keys first) → 2. `payments` table migration (reviewable SQL,
   per the DB change boundary — migration first, apply only after his approval) →
   3. `/api/orders` route → 4. `/api/payments/verify` → 5. webhook route + dashboard
   registration → 6. signed-download route + private bucket → 7. Test Mode end-to-end →
   8. live keys only after Test Mode passes and his explicit go-ahead.

---

## 7. Placeholders used in this doc and sketches

`RAZORPAY_KEY_ID` (e.g. `rzp_test_xxxxxxxxxxxx`), `RAZORPAY_KEY_SECRET`,
`RAZORPAY_WEBHOOK_SECRET`, `DOWNLOAD_SIGNING_SECRET` — all are literal placeholder
names in the sketch files, never real values. If a real value ever appears in a file by
mistake, rotate it in the dashboard immediately.
