-- SAFE ROLLBACK for migration 20261011_vault_documents
-- Project: protools-tracking
--
-- PRINCIPLES:
-- 1. NEVER delete user files blindly. Bucket is dropped ONLY if empty
--    AND data preservation is confirmed.
-- 2. Drop policies before the table (clean dependency order).
-- 3. Idempotent: safe to re-run (IF EXISTS everywhere).
--
-- STEP 0 — INVENTORY (run first, manual review required):
--   select name,
--          (metadata->>'size')::bigint as bytes,
--          created_at
--   from storage.objects
--   where bucket_id = 'vault-docs'
--   order by created_at;
--
--   If any rows exist: COPY/BACK UP those files before proceeding.
--   Do NOT continue to Step 4 until preservation is confirmed.

-- STEP 1 — Drop vault storage policies (files stay untouched in bucket)
drop policy if exists "vault_storage_delete_owner" on storage.objects;
drop policy if exists "vault_storage_insert_owner" on storage.objects;
drop policy if exists "vault_storage_select_owner" on storage.objects;

-- STEP 2 — Drop vault table policies
drop policy if exists "vault_documents_delete_owner" on public.vault_documents;
drop policy if exists "vault_documents_insert_owner" on public.vault_documents;
drop policy if exists "vault_documents_select_owner" on public.vault_documents;

-- STEP 3 — Drop metadata table (records only; storage files unaffected)
drop table if exists public.vault_documents;

-- STEP 4 — Bucket: ONLY if empty AND preservation confirmed.
--   Check first:
--     select count(*) from storage.objects where bucket_id = 'vault-docs';
--   If count = 0 → safe to run:
--     delete from storage.buckets where id = 'vault-docs';
--   If count > 0 → STOP. Back up files first, then decide manually.
--   (This statement is intentionally left commented out.)
-- delete from storage.buckets where id = 'vault-docs';
