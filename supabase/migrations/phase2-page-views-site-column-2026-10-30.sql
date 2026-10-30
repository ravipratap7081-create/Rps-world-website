-- Phase 2 (owner-approved 30 Oct 2026 via "Sb karo") — per-website traffic split.
-- RPS site Tracker.js + PDF-site tracking-beacon.js now send a `site`
-- (page hostname) with every page_view. This migration adds the column
-- that receives it. Historical rows keep site NULL: no site was recorded
-- for them, and they are NEVER backfilled or guessed.
-- No RLS policy changes: the existing anon-insert policy (with check true)
-- already accepts the new field, and reads keep working exactly as before.

alter table public.page_views add column if not exists site text;

-- Locked 30 Oct 2026 grant rule lines, re-asserted (idempotent — the
-- 29 Oct migration already granted these on page_views; re-running them
-- changes nothing, but the rule requires the lines to be present).
grant select on public.page_views to anon;
grant select, insert, update, delete on public.page_views to authenticated;
grant select, insert, update, delete on public.page_views to service_role;
