# Vault Email-Flow Verification Results (2026-10-11)

**Run:** scheduled task `vault-email-flow-retest`, Sun 2026-10-11 ~11:52–11:55 IST
**Target:** https://pro-universe-nine.vercel.app (Supabase project `jcghjknxsheojmjadbtv.supabase.co`)
**Test identity:** `ravipratap7081+vaulttest@gmail.com` / `VaultTest123!`
**Purpose:** re-test the two email flows that were blocked earlier by Supabase `429 over_email_send_rate_limit`.

## Flow 1 — Signup + email confirmation: PARTIAL PASS

| Step | Result |
|------|--------|
| 1. POST /auth/v1/signup | ✅ **200** — user created, id `b52b3b5b-fdc9-441a-9075-5e03e6a3525c`, `confirmation_sent_at` set, `email_verified: false`. **No 429** — rate limit did NOT block signup. |
| 2. Rate-limit check | ✅ Not hit on this flow. |
| 3. Confirmation email in Gmail | ✅ **Received.** From `Supabase Auth <noreply@mail.app.supabase.io>`, subject `Confirm your email address`, sent 06:22:26 UTC (11:52:26 IST). Labels: INBOX (not spam), IMPORTANT, CATEGORY_UPDATES — good deliverability. |
| 4. Extract link + fetch | ⚠️ **Blocked (not failed).** The confirmation URL was redacted by the credential protection into reference `[credential:4591667d-d71e-434f-9c1d-e12ade6452fe]`. Per policy the reference can only be consumed via a protected fill that needs fresh user approval — unavailable on a detached scheduled run — so the link could not be fetched and the click was not completed. No bypass attempted. |
| 5a. Email received? | ✅ Yes |
| 5b. Link domain correct? | ❓ **Unknown** — URL redacted; could not verify `pro-universe-nine.vercel.app` vs `supabase.co` verify URL. |
| 5c. Account confirmed? | ❌ **No** — login attempt (`grant_type=password`) returns **400 `email_not_confirmed`**. This independently proves the "Confirm email" gate is re-enabled and enforced. |

**To finish Flow 1 interactively:** resolve credential reference `[credential:4591667d-d71e-434f-9c1d-e12ade6452fe]` (the confirmation link from the email above), visit it, then re-run sign-in — a session should be returned.

## Flow 2 — Password reset: FAILED (rate limit still active)

| Step | Result |
|------|--------|
| 1. POST /auth/v1/recover | ❌ **429 `over_email_send_rate_limit`** — "email rate limit exceeded". **Stopped per task rules** (single attempt, no hammering). No reset email was sent, so there was nothing to find in Gmail. |
| 2–4. Find email / verify domain / complete reset | ⏭️ Not attempted — flow stopped at the 429 per rules. |

**Interpretation:** the cooldown is NOT fully over. The signup email just consumed the project's tight email budget (Supabase free-tier built-in mailer allows very few emails per rolling window), so the recover — sent ~1 min later — was rejected. Retry Flow 2 after a longer cooldown (a few hours), sending the recover as the only email-triggering request in that window.

## Rules compliance
- ✅ Each email-triggering request sent **exactly once** (1× signup, 1× recover). No retries after 429.
- ✅ **1 test user created** (limit was 2): `ravipratap7081+vaulttest@gmail.com` (`b52b3b5b-fdc9-441a-9075-5e03e6a3525c`), currently **unconfirmed**.
- ✅ No database schema / policy / bucket changes. No deploys.
- ✅ No raw credential values stored anywhere; only the credential *reference* above is recorded.

## Cleanup note
The test user `ravipratap7081+vaulttest@gmail.com` remains in **auth.users** (unconfirmed). Ravi can delete it from the Supabase dashboard → Authentication → Users if desired. (Note: the two-user test plan mentions 4 older test users also still exist there.)
