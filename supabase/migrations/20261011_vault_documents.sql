-- Migration: Secure Document Vault (Phase 1) — REVISED
-- Project: protools-tracking
-- Date: 2026-10-11
--
-- ENCRYPTION MODEL (Phase 1):
-- - Files encrypted in transit via HTTPS/TLS.
-- - Files encrypted at rest by Supabase Storage (server-side encryption).
-- - Bucket is PRIVATE; access controlled by RLS policies below.
-- - This is NOT end-to-end encryption: Supabase (service_role) can technically
--   read stored files. Do NOT upload Aadhaar, PAN, bank statements, or similarly
--   sensitive KYC documents until Phase 2 (client-side AES-256-GCM + key recovery).
--
-- SAFETY:
-- - Idempotent: safe to re-run. Policies are created ONLY if missing
--   (DO-block pattern) — never dropped, never replaced.
-- - Policy names are unique (vault_*); verified no collision with existing
--   policies ("own transactions", "public insert", "public read").
-- - Touches NOTHING existing: no changes to page_views, installs, leads,
--   coin_transactions, their policies, or any other bucket.
-- - Least privilege: authenticated gets SELECT/INSERT/DELETE only.
--   No UPDATE grant, no anon access (explicitly revoked).

-- ============================================================
-- 1. Vault documents metadata table
-- ============================================================
create table if not exists public.vault_documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  filename text not null check (char_length(filename) > 0),
  storage_path text not null unique
    -- DB-level binding: first folder segment MUST equal owner_id.
    -- Even a direct REST insert cannot point a record at another user's file.
    check (split_part(storage_path, '/', 1) = owner_id::text),
  mime_type text not null
    check (mime_type in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp')),
  file_size int not null check (file_size > 0 and file_size <= 10485760),
  created_at timestamptz default now()
);

create index if not exists idx_vault_docs_owner
  on public.vault_documents(owner_id);

alter table public.vault_documents enable row level security;

-- ============================================================
-- 2. Least-privilege grants (RLS policies alone are not enough)
-- ============================================================
-- Explicitly strip any accidental access, then grant only what the API needs.
revoke all on public.vault_documents from anon;
revoke all on public.vault_documents from public;
grant select, insert, delete on public.vault_documents to authenticated;
-- NOTE: No UPDATE grant — metadata is immutable after upload.

-- ============================================================
-- 3. Owner-only RLS policies (created only if missing — never dropped)
-- ============================================================
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'vault_documents'
      and policyname = 'vault_documents_select_owner'
  ) then
    create policy "vault_documents_select_owner" on public.vault_documents
      for select to authenticated
      using (owner_id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'vault_documents'
      and policyname = 'vault_documents_insert_owner'
  ) then
    create policy "vault_documents_insert_owner" on public.vault_documents
      for insert to authenticated
      with check (owner_id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'vault_documents'
      and policyname = 'vault_documents_delete_owner'
  ) then
    create policy "vault_documents_delete_owner" on public.vault_documents
      for delete to authenticated
      using (owner_id = auth.uid());
  end if;
end $$;
-- NOTE: No UPDATE policy — owner_id and metadata cannot be changed after upload.
-- To "rename", delete and re-upload.

-- ============================================================
-- 4. Private storage bucket (safe if exists: config enforced, files kept)
-- ============================================================
-- If 'vault-docs' already exists, this only enforces private + limits.
-- Existing files are never deleted.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'vault-docs',
  'vault-docs',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ============================================================
-- 5. Storage RLS: owner's own folder only (<auth.uid()>/...)
--    (created only if missing — never dropped)
-- ============================================================
-- Verified: no existing storage.objects policies reference 'vault-docs',
-- so these add new least-privilege rules without touching anything else.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'vault_storage_select_owner'
  ) then
    create policy "vault_storage_select_owner" on storage.objects
      for select to authenticated
      using (
        bucket_id = 'vault-docs'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'vault_storage_insert_owner'
  ) then
    create policy "vault_storage_insert_owner" on storage.objects
      for insert to authenticated
      with check (
        bucket_id = 'vault-docs'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'vault_storage_delete_owner'
  ) then
    create policy "vault_storage_delete_owner" on storage.objects
      for delete to authenticated
      using (
        bucket_id = 'vault-docs'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;
end $$;
-- NOTE: No storage UPDATE policy — files are immutable; re-upload to change.
-- Signed URLs are generated ONLY by the server API route
-- (app/api/vault/download/route.js) after verifying document ownership
-- via getAuthUser(). The bucket itself is never public.
