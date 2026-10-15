-- Enforce one active (unused) token per order at the database level.
-- This makes token issuance race-safe: concurrent requests cannot both
-- create an active token for the same order.
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_token_per_order
ON public.download_tokens (order_id)
WHERE used_at IS NULL;
