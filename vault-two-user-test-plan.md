# Vault Two-User Security Test Plan (2026-10-11)

**Method:** Email test users (no Google OAuth needed — RLS is auth-method agnostic).
- User A: `vaulttest.a.fixed@example.com` → `43e4af7f-f3be-44c6-b209-0e623f630d7d`
- User B: `vaulttest.b.fixed@example.com` → `7cce4eeb-1929-4dca-9d94-25c3c4fa0635`
- Preview deploy: https://pro-universe-ka71wz82n-rps-f5bb.vercel.app (latest code)

## Results — 8/8 PASS ✅

| # | Action | Expected | Result |
|---|--------|----------|--------|
| 1 | User A login → upload PDF via `/api/vault/upload` | Upload succeeds | ✅ 200 + document JSON |
| 2 | User A → `GET /api/vault/list` | Only A's files | ✅ 1 file, correct id |
| 3 | User B → `GET /api/vault/list` | A's file NOT visible | ✅ 0 files |
| 4 | User B → `GET /api/vault/download?id=<A's doc>` | 404 Not Found | ✅ 404 |
| 5 | User B → `DELETE /api/vault/delete` (id in JSON body) | Deny/404; file intact | ✅ 404, A's file intact |
| 5b | User A deletes OWN file | 200 deleted | ✅ 200 `{"deleted":true}` |
| 6 | User B → Storage API `GET /object/vault-docs/<A's path>` | Access denied | ✅ denied |
| 7 | User B → PostgREST insert with `owner_id=<A's uid>` | RLS reject | ✅ 403 `new row violates row-level security` |
| 8 | Integrity: A downloads own file | 200 + bytes | ✅ 200, 539 bytes |

## Status
- [x] Tests 1-8 executed — ALL PASS
- [x] Integrity check passed
- [x] Cross-user isolation: **VERIFIED** ✅
- [ ] "Confirm email" re-enabled (in progress)
- [ ] Google OAuth (optional, for production login UX — not needed for security)

## Notes
- 4 test users exist in auth.users (2 from first batch without sessions + 2 used). Clean up from dashboard if desired.
- Test files cleaned: A's test PDF deleted via own-delete test.
- Vault is server-side encrypted, NOT end-to-end. Don't upload Aadhaar/PAN/bank statements.
