-- ============================================================
-- Pro Universe: Diwali Pack automated delivery system
-- Date: 2026-10-15
-- Purpose: orders + single-use download tokens + audit trail
--          for the Rs.149 Diwali Business Promo Pack.
-- Security model (per ChatGPT validation 2026-10-15):
--   - RLS enabled, NO public policies (deny by default).
--   - All writes via service-role key or SECURITY DEFINER RPCs.
--   - Only token HASHES stored; plain tokens never touch the DB.
--   - Token claim is a single atomic UPDATE (claim-and-invalidate).
--   - Audit table never stores tokens or secrets.
-- ============================================================

-- 1) Orders: one row per Cashfree order, idempotent on cashfree_order_id
CREATE TABLE IF NOT EXISTS public.delivery_orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cashfree_order_id TEXT NOT NULL UNIQUE,
  amount            NUMERIC(10,2) NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'INR',
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','paid','failed','cancelled')),
  customer_email    TEXT,
  customer_phone    TEXT,
  cashfree_payment_id TEXT,
  raw_event_type    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at           TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS delivery_orders_email_idx
  ON public.delivery_orders (customer_email);
CREATE INDEX IF NOT EXISTS delivery_orders_status_idx
  ON public.delivery_orders (status);

ALTER TABLE public.delivery_orders ENABLE ROW LEVEL SECURITY;
-- No policies: deny all direct access. Service role bypasses RLS.

-- 2) Download tokens: single-use, expiring, hash-only storage
CREATE TABLE IF NOT EXISTS public.download_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES public.delivery_orders(id) ON DELETE CASCADE,
  token_hash  TEXT NOT NULL UNIQUE,          -- SHA-256 hex of the plain token
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ,                   -- NULL = unused
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS download_tokens_order_idx
  ON public.download_tokens (order_id);
CREATE INDEX IF NOT EXISTS download_tokens_hash_idx
  ON public.download_tokens (token_hash);

ALTER TABLE public.download_tokens ENABLE ROW LEVEL SECURITY;
-- No policies: deny all direct access. Service role bypasses RLS.

-- 3) Audit trail: payment/delivery events, NO secrets or tokens
CREATE TABLE IF NOT EXISTS public.delivery_audit (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID REFERENCES public.delivery_orders(id) ON DELETE SET NULL,
  event      TEXT NOT NULL,                  -- webhook_received, token_issued,
                                             -- download_claimed, download_denied,
                                             -- resend_issued, resend_denied, email_sent, email_failed
  detail     TEXT,                            -- human-readable, must NOT contain tokens/secrets
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delivery_audit_order_idx
  ON public.delivery_audit (order_id);

ALTER TABLE public.delivery_audit ENABLE ROW LEVEL SECURITY;
-- No policies: deny all direct access. Service role bypasses RLS.

-- 4) Atomic claim-and-invalidate RPC.
--    Marks a token used IFF: hash matches, unused, unexpired,
--    AND the linked order is paid. Single statement = atomic.
CREATE OR REPLACE FUNCTION public.claim_download_token(p_token_hash TEXT)
RETURNS TABLE (claimed BOOLEAN, order_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order_id UUID;
BEGIN
  UPDATE public.download_tokens t
  SET used_at = now()
  FROM public.delivery_orders o
  WHERE t.token_hash = p_token_hash
    AND t.order_id = o.id
    AND o.status = 'paid'
    AND t.used_at IS NULL
    AND t.expires_at > now()
  RETURNING t.order_id INTO v_order_id;

  IF v_order_id IS NULL THEN
    RETURN QUERY SELECT FALSE, NULL::UUID;
  ELSE
    RETURN QUERY SELECT TRUE, v_order_id;
  END IF;
END;
$$;

-- 5) Idempotent order upsert RPC for the webhook.
--    Safe under duplicate webhook delivery. Reports whether THIS call
--    transitioned the order to paid (only then should a token be issued).
CREATE OR REPLACE FUNCTION public.upsert_delivery_order(
  p_cashfree_order_id TEXT,
  p_amount NUMERIC,
  p_currency TEXT,
  p_status TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_cashfree_payment_id TEXT,
  p_raw_event_type TEXT
)
RETURNS TABLE (order_id UUID, order_status TEXT, became_paid BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
  v_prev_status TEXT;
BEGIN
  -- Fast path: brand-new order
  INSERT INTO public.delivery_orders
    (cashfree_order_id, amount, currency, status, customer_email, customer_phone,
     cashfree_payment_id, raw_event_type, paid_at)
  VALUES
    (p_cashfree_order_id, p_amount, p_currency, p_status, p_customer_email, p_customer_phone,
     p_cashfree_payment_id, p_raw_event_type,
     CASE WHEN p_status = 'paid' THEN now() ELSE NULL END)
  ON CONFLICT (cashfree_order_id) DO NOTHING
  RETURNING public.delivery_orders.id INTO v_id;

  IF v_id IS NOT NULL THEN
    -- Inserted: this call created the order
    RETURN QUERY SELECT v_id, p_status, (p_status = 'paid');
    RETURN;
  END IF;

  -- Conflict path: order already exists. Promote status forward only.
  SELECT o.id, o.status INTO v_id, v_prev_status
  FROM public.delivery_orders o
  WHERE o.cashfree_order_id = p_cashfree_order_id
  FOR UPDATE;

  UPDATE public.delivery_orders o
  SET status = CASE WHEN v_prev_status = 'paid' THEN 'paid' ELSE p_status END,
      cashfree_payment_id = COALESCE(p_cashfree_payment_id, o.cashfree_payment_id),
      customer_email = COALESCE(p_customer_email, o.customer_email),
      customer_phone = COALESCE(p_customer_phone, o.customer_phone),
      raw_event_type = p_raw_event_type,
      paid_at = CASE
                  WHEN v_prev_status <> 'paid' AND p_status = 'paid' THEN now()
                  ELSE o.paid_at
                END
  WHERE o.id = v_id;

  RETURN QUERY SELECT v_id, p_status,
    (v_prev_status <> 'paid' AND p_status = 'paid');
END;
$$;
