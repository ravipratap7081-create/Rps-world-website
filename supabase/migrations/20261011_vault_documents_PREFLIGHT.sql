-- PREFLIGHT GUARD for migration 20261011_vault_documents
-- Run this FIRST, before the migration. It FAILS LOUDLY on any unexpected
-- existing state instead of silently skipping. If it raises an exception,
-- STOP and inspect — do not proceed to the migration.
--
-- Expected clean state:
--   - public.vault_documents does NOT exist
--   - zero policies named vault_* exist (any schema)
--   - storage.buckets has no 'vault-docs' row

do $$
declare
  v_table_exists  boolean;
  v_policy_count  int;
  v_bucket_exists boolean;
begin
  -- 1. Table must be absent (CREATE TABLE IF NOT EXISTS won't fix a wrong schema)
  select exists (
    select 1 from pg_tables
    where schemaname = 'public' and tablename = 'vault_documents'
  ) into v_table_exists;
  if v_table_exists then
    raise exception 'PREFLIGHT FAIL: public.vault_documents already exists. Inspect its schema before proceeding — the migration will NOT repair a mismatched table.';
  end if;

  -- 2. No vault_* policy may exist (a same-named policy with wrong rules
  --    would be silently skipped by the migration's DO-blocks)
  select count(*) into v_policy_count
  from pg_policies
  where policyname like 'vault\_%' escape '\';
  if v_policy_count > 0 then
    raise exception 'PREFLIGHT FAIL: % vault_* policies already exist. Inspect their definitions before proceeding.', v_policy_count;
  end if;

  -- 3. Bucket must be absent (ON CONFLICT DO UPDATE would change its config)
  select exists (
    select 1 from storage.buckets where id = 'vault-docs'
  ) into v_bucket_exists;
  if v_bucket_exists then
    raise exception 'PREFLIGHT FAIL: vault-docs bucket already exists. Inspect its configuration and files before proceeding — the migration would overwrite its config.';
  end if;

  raise notice 'PREFLIGHT OK: clean state confirmed. Safe to run the migration.';
end $$;
