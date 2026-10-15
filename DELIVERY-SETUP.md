# Diwali Pack — Automated Delivery Setup

**Status (2026-10-15):** Built and unit-tested locally. NOT deployed. Architecture validated by ChatGPT.

## What was built

| File | Purpose |
|---|---|
| `supabase/migrations/20261015_diwali_delivery.sql` | `delivery_orders`, `download_tokens`, `delivery_audit` tables (RLS on, no public policies) + `claim_download_token()` (atomic) + `upsert_delivery_order()` (idempotent) RPCs |
| `lib/delivery.js` | Shared helpers: Cashfree signature verify, timestamp replay guard, token gen/hash, Cashfree order-status API, Resend email, audit log, rate limiter |
| `app/api/cashfree-webhook/route.js` | Webhook: verify sig → confirm via Cashfree API → validate ₹149 → idempotent upsert → issue 24h single-use token → email link |
| `app/api/download/[token]/route.js` | Atomic token redeem → 307 redirect to 10-min Supabase signed URL |
| `app/api/resend-download/route.js` | Resend link by email (3/hour, anti-enumeration) |
| `lib/__tests__/cashfree-signature.test.mjs` | 16 unit tests — **all passing** (`node lib/__tests__/cashfree-signature.test.mjs`) |
| `delivery-assets/diwali-business-promo-pack.zip` | ZIP moved OUT of `public/` so it can never be served publicly |

## Flow

```
Customer pays ₹149 (Cashfree Form)
  → Cashfree POSTs webhook to /api/cashfree-webhook
  → verify HMAC-SHA256 signature (raw body) + 5-min replay guard
  → server-side confirm: GET Cashfree /pg/orders/{id} must be PAID
  → amount must equal DIWALI_PACK_PRICE (149 INR)
  → idempotent upsert (duplicates never double-issue)
  → generate 32-byte token, store SHA-256 hash only, 24h expiry
  → email download link via Resend
Customer clicks link → /api/download/{token}
  → atomic claim (single UPDATE: unused + unexpired + order paid)
  → 307 redirect to 10-min signed URL from PRIVATE Supabase bucket
```

## Go-live checklist (Ravi's approval needed for each)

### 1. Supabase
- [ ] Run migration `20261015_diwali_delivery.sql` in Supabase SQL editor (project `protools-tracking` / `jcghjknxsheojmjadbtv`) — **review SQL first, then Ravi approves** (per DB change boundary)
- [ ] Create PRIVATE storage bucket `diwali-delivery`
- [ ] Upload `delivery-assets/diwali-business-promo-pack.zip` as `diwali-business-promo-pack.zip` in that bucket
- [ ] Copy service-role key (Dashboard → Project Settings → API)

### 2. Cashfree Dashboard
- [ ] Developers → Webhooks → Add endpoint: `https://golden-elf-11f395.netlify.app/api/cashfree-webhook`
- [ ] Subscribe to `PAYMENT_SUCCESS_WEBHOOK`, `PAYMENT_FAILED_WEBHOOK`, `PAYMENT_USER_DROPPED_WEBHOOK`, `ORDER_PAID_WEBHOOK`
- [ ] Copy App ID + Secret Key (PG credentials)

### 3. Resend (email)
- [ ] Sign up at resend.com, verify domain `pro-universe.in` (or use onboarding address first)
- [ ] Create API key

### 4. Environment (Netlify → Site settings → Environment variables)
```
SUPABASE_URL=                    # or reuse NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_KEY=            # service_role key — NEVER public
CASHFREE_APP_ID=
CASHFREE_SECRET_KEY=
CASHFREE_ENV=PROD                # or SANDBOX for testing
DIWALI_PACK_PRICE=149
APP_URL=https://golden-elf-11f395.netlify.app
RESEND_API_KEY=
DELIVERY_FROM_EMAIL=Pro Universe <noreply@pro-universe.in>
DELIVERY_BUCKET=diwali-delivery
DELIVERY_OBJECT=diwali-business-promo-pack.zip
```

### 5. Deploy + test
- [ ] Deploy (git push → Netlify builds)
- [ ] **Test in SANDBOX first:** pay via Cashfree sandbox → webhook fires → email arrives → link downloads → link reuse returns 404
- [ ] Test failure paths: failed payment (no email), tampered signature (401), stale timestamp (401), expired token (404), double webhook (one token only)
- [ ] Then flip `CASHFREE_ENV=PROD`, do one real ₹149 test purchase, verify end-to-end

## Security properties (ChatGPT-validated)

- Webhook: **signature + server-side order-status API** (both, not either)
- Plain tokens **never** stored or logged — only SHA-256 hashes
- Token redeem is a **single atomic UPDATE** (no TOCTOU race)
- Tokens are single-use, 24h expiry, **not** IP-bound
- RLS enabled with **zero public policies** (service-role only)
- Rate limits: webhook 60/min/IP, download 30/min/IP, resend 3/hour/email
- Resend endpoint is **anti-enumeration** (same response whether or not order exists)
- Audit table records events only — **no tokens, secrets, or payloads**
- Amount validated server-side against `DIWALI_PACK_PRICE`

## Known limitations / follow-ups

1. **Cashfree Payment Forms webhook shape**: code handles both PG-style (`data.order.order_id`) and flat payloads, but the exact Forms webhook fields must be confirmed against a real payload during sandbox testing — adjust field mapping if needed.
2. **Reconciliation job**: ChatGPT recommended a scheduled job polling Cashfree for stuck `pending` orders + customer "resend" flow (resend flow is built; the cron poller is not — add if webhooks prove unreliable).
3. **Conversions API**: Pixel `Purchase` should eventually fire server-side from this webhook with event_id deduplication (not built yet — Meta ads are on HOLD anyway).
4. Rate limiter is in-memory per serverless instance (best-effort, not distributed).
5. `next.config.js` / Netlify: routes under `/api/*` run as serverless functions — confirm function timeout is adequate (webhook does 2 external calls: Cashfree API + Resend).
