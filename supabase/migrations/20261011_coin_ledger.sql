-- ============================================================
-- Pro Universe: Coins ledger + RPC functions
-- Date: 2026-10-11
-- Purpose: Fix broken coins system — coin_balance / earn_coins /
--          spend_coins RPCs were never created; balance API 500s.
-- Security: all functions verify auth.uid() = p_user_id so no
--           user can mint/spend another user's coins via direct RPC.
-- ============================================================

-- 1) Ledger table: one row per earn/spend event
CREATE TABLE IF NOT EXISTS public.coin_ledger (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount      INTEGER NOT NULL,              -- +earn / -spend
  reason      TEXT NOT NULL,
  expires_at  TIMESTAMPTZ,                   -- NULL = never expires
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS coin_ledger_user_id_idx
  ON public.coin_ledger (user_id);

-- 2) RLS: users read only their own ledger rows.
--    Writes happen only via SECURITY DEFINER functions below.
ALTER TABLE public.coin_ledger ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS coin_ledger_select_owner ON public.coin_ledger;
CREATE POLICY coin_ledger_select_owner
  ON public.coin_ledger FOR SELECT
  USING (auth.uid() = user_id);

-- 3) Balance: sum of unexpired amounts for the caller
CREATE OR REPLACE FUNCTION public.coin_balance(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  bal INTEGER;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  SELECT COALESCE(SUM(amount), 0) INTO bal
  FROM public.coin_ledger
  WHERE user_id = p_user_id
    AND (expires_at IS NULL OR expires_at > now());
  RETURN bal;
END;
$$;

-- 4) Earn: insert +amount row, return new balance.
--    daily_checkin is idempotent per calendar day (Asia/Kolkata).
CREATE OR REPLACE FUNCTION public.earn_coins(
  p_user_id UUID, p_amount INTEGER, p_reason TEXT, p_ttl_days INTEGER DEFAULT 30
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  bal INTEGER;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  IF p_amount <= 0 OR p_amount > 1000 THEN
    RAISE EXCEPTION 'invalid amount';
  END IF;

  -- daily check-in: one per calendar day (IST)
  IF p_reason = 'Daily check-in' THEN
    IF EXISTS (
      SELECT 1 FROM public.coin_ledger
      WHERE user_id = p_user_id
        AND reason = 'Daily check-in'
        AND (created_at AT TIME ZONE 'Asia/Kolkata')::date
            = (now() AT TIME ZONE 'Asia/Kolkata')::date
    ) THEN
      RAISE EXCEPTION 'already checked in';
    END IF;
  END IF;

  INSERT INTO public.coin_ledger (user_id, amount, reason, expires_at)
  VALUES (
    p_user_id, p_amount, p_reason,
    CASE WHEN p_ttl_days IS NULL THEN NULL
         ELSE now() + (p_ttl_days || ' days')::interval END
  );

  SELECT public.coin_balance(p_user_id) INTO bal;
  RETURN bal;
END;
$$;

-- 5) Spend: deduct only if balance covers it
CREATE OR REPLACE FUNCTION public.spend_coins(
  p_user_id UUID, p_amount INTEGER, p_reason TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  bal INTEGER;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  IF p_amount <= 0 OR p_amount > 10000 THEN
    RAISE EXCEPTION 'invalid amount';
  END IF;

  SELECT public.coin_balance(p_user_id) INTO bal;
  IF bal < p_amount THEN
    RAISE EXCEPTION 'insufficient coins';
  END IF;

  INSERT INTO public.coin_ledger (user_id, amount, reason, expires_at)
  VALUES (p_user_id, -p_amount, p_reason, NULL);

  SELECT public.coin_balance(p_user_id) INTO bal;
  RETURN bal;
END;
$$;

-- 6) Grants: only authenticated users may call (anon blocked)
REVOKE ALL ON FUNCTION public.coin_balance(UUID) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.earn_coins(UUID, INTEGER, TEXT, INTEGER) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.spend_coins(UUID, INTEGER, TEXT) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.coin_balance(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.earn_coins(UUID, INTEGER, TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.spend_coins(UUID, INTEGER, TEXT) TO authenticated;

-- 7) Verification queries (run after apply)
-- SELECT COUNT(*) FROM public.coin_ledger;  -- expect 0
-- SELECT proname FROM pg_proc WHERE proname IN ('coin_balance','earn_coins','spend_coins');
