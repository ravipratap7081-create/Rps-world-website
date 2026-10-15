-- ============================================================
-- Pro Universe: Web Push subscriptions — DRAFT, NOT APPLIED
-- Date: 2026-10-11
-- Status: REVIEW ONLY — do NOT apply without Ravi's approval
--         (DB change boundary: reviewable migration SQL first,
--          apply only after his explicit approval.)
-- Purpose: store one Web Push subscription per user so the PWA can
--          send OPT-IN notifications (daily check-in reminders, new
--          tool launches, festive campaigns) even when the app is closed.
-- Privacy: RLS isolates every user to their own row. Endpoint + keys
--          are only readable server-side (service_role) for sending.
-- Design: one subscription per user (latest device wins) — v1 keeps
--         it simple; multi-device support can be added later.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint   TEXT NOT NULL UNIQUE,
  p256dh     TEXT NOT NULL,
  auth       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users manage ONLY their own subscription row (insert/select/delete).
DROP POLICY IF EXISTS push_subscriptions_owner_all ON public.push_subscriptions;
CREATE POLICY push_subscriptions_owner_all
  ON public.push_subscriptions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- NOTE: the push SENDER runs with service_role, which bypasses RLS,
-- so no extra policy is needed for server-side sending.

-- Verification queries (run after apply):
-- SELECT COUNT(*) FROM public.push_subscriptions;              -- expect 0
-- SELECT policyname FROM pg_policies WHERE tablename = 'push_subscriptions';  -- expect 1 row
