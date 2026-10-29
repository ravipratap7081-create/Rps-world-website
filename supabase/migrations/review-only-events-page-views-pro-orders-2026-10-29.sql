-- REVIEW ONLY — DO NOT APPLY WITHOUT OWNER APPROVAL — 29 Oct 2026
-- Supabase events + page_views tables for the ProTools/RPS funnel.
-- Tracker.js already sends rows to these tables (fail-silent today because
-- the tables do not exist). This file ONLY prepares the SQL; applying it
-- needs Ravi's DB approval, a page_views RLS check, AND (from 30 Oct 2026)
-- the grant lines below — all three are in this file so the approval
-- review sees exactly what would run.
--
-- Tracker payloads (from components/Tracker.js):
--   events:     { event: text, params: jsonb, page: text }
--   page_views: { page: text }
-- Both rows also carry id + created_at (server defaults).
-- Privacy note: page_views/events contain page paths only, no names,
-- emails, phones, or file contents. RLS below lets the anon key INSERT
-- only; SELECT is restricted to service_role (plus the explicit grants
-- required by the 30 Oct rule, which RLS policies then constrain).

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event text not null,
  params jsonb not null default '{}'::jsonb,
  page text
);

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  page text not null
);

alter table public.events enable row level security;
alter table public.page_views enable row level security;

-- Anon (client Tracker) may insert only; it may not read other rows.
create policy "anon insert events" on public.events
  for insert to anon with check (true);
create policy "anon insert page_views" on public.page_views
  for insert to anon with check (true);

-- Service role (server routes / owner reporting) full access via RLS bypass
-- is NOT granted here by policy; service_role bypasses RLS by design in
-- Supabase, so no select policy for anon is created on purpose.

-- 30 Oct 2026 grant rule (LOCKED 22 Oct 2026, owner approval required):
grant select on public.events to anon;
grant select, insert, update, delete on public.events to authenticated;
grant select, insert, update, delete on public.events to service_role;
grant select on public.page_views to anon;
grant select, insert, update, delete on public.page_views to authenticated;
grant select, insert, update, delete on public.page_views to service_role;

-- NOTE: the grants above are the locked rule's required lines. RLS
-- policies above still block anon SELECTs in practice (RLS is checked
-- after grants), so granting select to anon does not expose rows.
-- If the owner prefers anon to have NO select grant at all, delete the
-- two "grant select ... to anon" lines before applying — that is a
-- deliberate deviation from the locked rule and must be recorded.

-- PRO ORDERS (separate, also review-only): Pro checkout (/api/checkout/pro)
-- currently creates NO server row, because no table exists. Until a table
-- like the one below is approved, Pro activation after payment is MANUAL.
-- Do NOT point Pro webhooks at delivery_orders (that table issues Diwali
-- download tokens and would wrongly tokenise a Pro payment).
--
-- create table if not exists public.pro_orders (
--   id uuid primary key default gen_random_uuid(),
--   created_at timestamptz not null default now(),
--   cashfree_order_id text unique not null,
--   customer_email text not null,
--   customer_phone text,
--   amount numeric not null default 149,
--   currency text not null default 'INR',
--   status text not null default 'pending',
--   activated_at timestamptz
-- );
-- alter table public.pro_orders enable row level security;
-- grant select on public.pro_orders to anon;
-- grant select, insert, update, delete on public.pro_orders to authenticated;
-- grant select, insert, update, delete on public.pro_orders to service_role;
