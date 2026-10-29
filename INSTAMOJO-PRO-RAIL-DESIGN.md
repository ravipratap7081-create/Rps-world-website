# Instamojo Pro rail — LOCAL design + implementation (NOT live)

Status: code written + tested locally only. NOT pushed, NOT deployed,
NOT wired to any button, NO live Instamojo product/link created, NO
payment made or tested live. The /coins Buy button still calls
`/api/checkout/pro` (Cashfree SDK). Review this file before any
go-live step.

## Why this rail

Cashfree SDK `checkout()` never settled in the VM browser across 6
attempts (button stuck on "Please wait…", no payment ever made).
This rail has no in-page SDK and no JS checkout promise to hang: the
buyer is sent by full-page navigation to an Instamojo-hosted payment
page — the same hosted-checkout pattern proven by the real ₹149 Diwali
pack test payment on 16 Oct 2026 (Instamojo product 7477123). A hosted
page fails visibly (error page / Failed redirect) instead of hanging
silently. CSP needs no change (no third-party script is loaded).

## Files changed (local, uncommitted)

| File | What |
|---|---|
| `lib/instamojo.js` (NEW) | Server-only helpers: MAC verify, webhook body parse, payment-request create, server-side payment-status check, shared activation gate + upsert |
| `app/api/checkout/pro-instamojo/route.js` (NEW) | POST: validate email+10-digit phone, create payment request, return `payment_url` (longurl) + `payment_request_id`. Creates NO pro_orders row |
| `app/api/pro-instamojo-webhook/route.js` (NEW) | POST form-urlencoded webhook: MAC → purpose gate → Credit gate → API re-check → idempotent upsert |
| `app/api/pro-instamojo-status/route.js` (NEW) | GET `?payment_request_id=&payment_id=`: API re-check, activates on the same gateway proof (redirect supplies IDs only, never proof) |
| `lib/pro-server.js` (EDIT) | Added `isProOrderKey()` (accepts `PRO149_`, `LINK:`, `IMJO:`); `getProByOrderId()` now uses it. `isProOrderId()` unchanged for Cashfree-only callers |
| `lib/__tests__/instamojo.test.mjs` (NEW) | 15 unit tests, all passing (see below) |
| `lib/__tests__/esm-resolve-loader.mjs`, `register-esm.mjs` (NEW) | Test-only ESM hook: repo lib files import extensionless, which plain node ESM cannot resolve. Never used by the app |
| `app/coins/page.js` | WIRED 29 Oct 2026 (Ravi's "Karo"): Buy Pro now POSTs /api/checkout/pro-instamojo → redirect to payment_url; return via /coins?imjo=1 polls /api/pro-instamojo-status (3x, 3s). Local only, NOT pushed/deployed. |

## How an Instamojo payment maps to a pro_orders row

No schema change. The existing table (`cashfree_order_id text UNIQUE
NOT NULL`, `customer_email`, `customer_phone`, `amount`, `status`,
`paid_at`, `pro_until`) is reused, following the Cashfree link rail's
precedent (`LINK:<link_id>` in the same column):

| pro_orders column | Instamojo value | Source |
|---|---|---|
| `cashfree_order_id` | `IMJO:<payment_id>` | Instamojo payment record (unique per payment) |
| `customer_email` | `buyer_email` | Instamojo API payment record — never a client body |
| `customer_phone` | `buyer_phone` | Instamojo API payment record (may be null) |
| `amount` | payment `amount` | Instamojo API record; gate requires `>= 149` |
| `currency` | `"INR"` | Fixed (Instamojo India account, ₹149 product) |
| `status` | `"paid"` | Only after gateway says Credit (see below) |
| `paid_at` | server verification time | Same convention as the Cashfree webhook routes (NOT the gateway timestamp) |
| `pro_until` | `paid_at + 30 days` | `computeProUntil()` from `lib/pro-server.js`, same as all rails |

Tool gating needs no change: `/api/pro-check?email=` reads by
`customer_email + status=paid + pro_until > now`, which is
gateway-agnostic. `/api/pro-status` stays Cashfree-only; the new
`/api/pro-instamojo-status` is the IMJO equivalent.

**Idempotency (duplicate webhooks / double status checks):** the
upsert first SELECTs by `IMJO:<payment_id>`; an existing paid row
returns its ORIGINAL `pro_until` — a retry never extends Pro. The
UNIQUE constraint on `cashfree_order_id` is the backstop
(`onConflict: "cashfree_order_id"`). Two different payments (two
payment_ids, e.g. a genuine month-2 renewal) create two rows, which
is correct month-by-month semantics: `getProByEmail` picks the latest
`pro_until`.

**Separation from the Diwali pack:** the webhook purpose-gates on
`purpose === "ProTools Pro — Monthly"` (env `INSTAMOJO_PRO_PURPOSE`).
A Diwali pack payment (`purpose = "Diwali Business Promo Pack"`)
hitting this endpoint is acknowledged and ignored, and this rail never
touches `delivery_orders`, so it can never issue a Diwali token.

## How verification works (never trust a redirect alone)

Two triggers, ONE proof bar — the Instamojo API record:

1. **Webhook** (`POST /api/pro-instamojo-webhook`, body is
   `application/x-www-form-urlencoded`, NOT JSON):
   - Parse raw text with `URLSearchParams` (PHP `$_POST` equivalent).
   - Verify MAC: remove `mac`, sort remaining keys alphabetically by
     lower-cased key, join values with `|`, HMAC-SHA1 with the private
     salt, timing-safe compare. Wrong MAC → 401, nothing else runs.
     (Source: support.instamojo.com, "What is the Message
     Authentication Code in Webhook?".)
   - Purpose must be the Pro purpose; status must be `Credit`.
     Anything else → `ok:true` + no action (acknowledged, not an error).
   - Server-side re-check: `GET {INSTAMOJO_API_BASE}/payment-requests/
     {payment_request_id}/` with `X-Api-Key` + `X-Auth-Token`, find
     `payment_id` inside `payments[]`. If the API is unreachable, the
     shape is unexpected, or the payment is absent → 500/503, never an
     activation.
   - Only then the shared upsert runs (gates re-checked inside it:
     Credit + Pro purpose + amount ≥ ₹149 + gateway email present).
2. **Status route** (`GET /api/pro-instamojo-status?payment_request_id=
   …&payment_id=…`): the Instamojo redirect appends both IDs to
   `redirect_url` (support.instamojo.com, "Payment Notification via
   API") — but the redirect is NOT trusted. It only supplies the IDs;
   the route performs the identical API re-check and the identical
   upsert. This exists because Instamojo webhook retry behaviour is
   NOT stated in the docs checked, so a missed webhook must not strand
   a paid buyer. A forged redirect cannot grant Pro: the API check
   would fail (payment absent / not Credit / wrong purpose / low
   amount). `payment_id` is REQUIRED — falling back to `payments[0]`
   could pick a Failed attempt when a later Credit exists.
   Activation states mirror `/api/pro-status`: `active` /
   `manual_pending` (gateway says Credit, no DB row yet) / `not_paid`.

Both triggers fail closed: missing env → 503, bad MAC → 401,
unverifiable gateway state → 500/503, missing gateway email → 503.
No path returns `ok:true` for an activation that did not happen.

## What was verified locally (no live payment, no real credentials)

1. **Unit tests** — 15/15 pass:
   `node --import ./lib/__tests__/register-esm.mjs lib/__tests__/instamojo.test.mjs`
   MAC round-trip + order-independence + tamper rejection (amount
   change, removed field, wrong salt, missing MAC/salt), form-body
   parsing (incl. encoded `—` in purpose), key formats, +30-day math,
   upsert gates (non-Credit / wrong purpose / amount < ₹149 /
   missing email — all without touching a DB), fail-closed status and
   create helpers without credentials (no network calls).
2. **Next build** — `npm run build` compiles clean; all three new
   routes listed (`/api/checkout/pro-instamojo`,
   `/api/pro-instamojo-status`, `/api/pro-instamojo-webhook`).
3. **Live local server + stub Instamojo API** (dummy env only, stub
   returns canned Credit/Failed payments; NO Supabase env, so the DB
   step is expected to fail closed): all 7 probes behaved as designed —
   valid MAC + Credit + Pro → 503 "pro_orders unavailable" (proves MAC
   pass + API verify pass + DB gate); bad MAC → 401; Failed → 200
   `paid:false`, no action; Diwali purpose → 200 ignored; status
   Credit → 200 `paid:true`, `manual_pending`; status Failed → 200
   `not_paid`; checkout create → 200 with stub longurl.
   Test servers were stopped afterwards.

## What is NOT proven yet (say plainly)

- **The Supabase upsert itself.** It needs a real service key + the
  live table, which was deliberately not used locally. The code path
  is the same shape as the proven Cashfree webhook routes (same table,
  same columns, same `onConflict`), but the first live test must
  confirm the `IMJO:` row actually lands and `/api/pro-check`
  returns `isPro:true` for that email.
- **Live Instamojo API response shape.** The parser expects the
  documented v1.1 shape `{ payment_request: { purpose, payments:
  [...] } }` and fails closed on anything else. If the live account
  answers a v2 shape instead, the status check will 503 (safe, not
  wrong) and the parser must be adapted from the real response.
- **Live webhook MAC interop.** Unit tests prove the implementation
  follows the documented algorithm; they cannot prove Instamojo's
  live signer produces the same string (e.g. hex case, value
  encoding). The first real webhook must be checked against the MAC
  verifier before trusting it in production.
- **Webhook retry behaviour.** Not stated in the docs checked; the
  status route is the mitigation, not a claim about retries.
- **Instamojo fees / settlement.** Not researched for this rail; the
  Diwali pack already settles through the same account, so no new
  account setup is assumed — but confirm the fee on ₹149 before
  promising margins.

## What still needs Ravi's word before going live (in order)

1. **Instamojo API credentials:** from the merchant dashboard
   (Developers / API credentials): `INSTAMOJO_API_KEY`,
   `INSTAMOJO_AUTH_TOKEN`, `INSTAMOJO_PRIVATE_SALT` — set as Render
   env vars. No value goes in any file, ever.
2. **Confirm the live API shape + MAC** with one real (test-mode if
   available, else smallest real) payment request: check the status
   endpoint response shape and that a real webhook MAC verifies.
   If either differs, adapt the parser/verifier first — do not ship
   on the assumption.
3. **Wire the /coins Buy button** to the new rail (reviewed diff,
   NOT yet written): replace the `/api/checkout/pro` + Cashfree SDK
   block in `buyPro()` with: POST `/api/checkout/pro-instamojo` →
   on 200, `window.location.href = j.payment_url`. Then handle the
   redirect back: on `/coins?imjo=1&payment_id=…&payment_request_id=…`,
   poll `/api/pro-instamojo-status` with those IDs (same polling
   pattern as the Diwali thank-you page) and show Pro ACTIVE /
   manual_pending / not_paid honestly. Keep the Cashfree SDK route
   in the repo as the fallback — do not delete it.
4. **Deploy** (push + Render auto-deploy), then **live end-to-end
   test**: real ₹149 payment → `pro_orders` row with `IMJO:` key →
   `/api/pro-check` ACTIVE + `pro_until` (+30d) → tool-cap tests
   (6MB photo free refused; 12MB PDF free refused, Pro email
   accepted). Until that test passes, never claim Pro checkout works.
5. **Decide the button label / rail choice UI:** single Instamojo
   button, or Cashfree-first with Instamojo fallback on SDK timeout?
   (Recommendation in this file: single Instamojo button while the
   SDK route is unproven — two buttons doubles the test surface —
   but that is Ravi's call, not this rail's decision.)
