# /sarkari Section Audit — 2026-10-20

**Owner's favorite ("premium") section. Live: https://rps-world-website.onrender.com/sarkari — verified HTTP 200 on all 10 routes today. All 70 inline `<script>` blocks pass `node --check`. No TODO/FIXME/console.log found in `app/sarkari/`. NO fixes applied (audit only).**

## Route map (8 tiles + 1 house ad = 9 listed)

| # | Tile (as labeled) | Route | Live | Implementation |
|---|---|---|---|---|
| 1 | Photo Resizer ("20KB passport photo, form-ready") | /sarkari/photo-resizer | 200 | ToolFrame iframe → /tools/up-police-photo-resizer.html |
| 2 | PDF Compressor ("Compress down to 100KB") | /sarkari/pdf-compressor | 200 | ToolFrame iframe → /tools/pdf-compressor-100kb.html |
| 3 | Scheme Finder ("Which scheme fits you? AI will tell") | /sarkari/scheme-finder | 200 | ToolFrame iframe → /tools/scheme-finder.html (calls text.pollinations.ai) |
| 4 | Document Vault ("Encrypted private locker") | /sarkari/vault | 200 | Real React page + /api/vault/* routes — solid |
| 5 | Sarkari Links ("PF, Aadhaar, PAN, forms — all portals") | /sarkari/links | 200 | Real React page, 13 external links, all open in new tabs (target=_blank, noopener) |
| 6 | Image Compressor ("Reduce JPG/PNG size, keep quality") | /sarkari/image-compressor | 200 | ToolFrame iframe → /tools/image-compressor.html |
| 7 | Signature Maker ("Draw or type your digital signature") | /sarkari/signature-maker | 200 | ToolFrame iframe → /tools/signature-maker.html (canvas only, no network) |
| 8 | Diwali Card Maker ("Apne naam wala card — free") | /diwali-card | 200 | Real React page |
| 9 | Pro Universe Pro (house ad: "Unlimited tools, no limits — one payment, lifetime") | /coins | 200 | Coins economy page (earn/spend; "₹499 one-time" copy, no cash checkout wired) |

Note: served HTML contains "This page could not be found" ×2 on every page — that's the default Next.js not-found RSC fragment shipped inside every app-router payload, NOT evidence of a broken page.

---

## P0 — must fix

### P0-1. Five of the nine tools cannot render in any real browser
Evidence chain (all verified 2026-10-20):
- `~/workspace/pro-universe/components/ToolFrame.js` wraps each tool in `<iframe src="/tools/*.html">`.
- `next.config.js` sets `X-Frame-Options: DENY` on `/(.*)` — every path.
- Live headers: `curl -I https://rps-world-website.onrender.com/sarkari/photo-resizer` → `x-frame-options: DENY`; `curl -I https://rps-world-website.onrender.com/tools/up-police-photo-resizer.html` → `x-frame-options: DENY`.
- Per the 2026-10-20 lesson (Site48 PWA "My Shop" iframe showed Chrome's broken-page icon on the owner's phone): DENY blocks ALL framing including same-origin.

Affected: Photo Resizer, PDF Compressor, Scheme Finder, Image Compressor, Signature Maker (5 of 9 tiles). Only Vault and Sarkari Links (real pages, no iframe) genuinely work. Fix used before on the Site48 PWA: embed content natively or scope the DENY header away from `/tools/*`.

### P0-2. "PDF Compressor" does not compress — it extracts the first 3 pages
- Hub tile: title "PDF Compressor", desc "Compress down to 100KB".
- Engine in `public/tools/pdf-compressor-100kb.html`: `PDFLib.PDFDocument.load` → `copyPages(src, Array.from({length:n},(_,i)=>i))` with `n = Math.min(3, total)` → save. It keeps pages 1–3; there is no image downsampling, no quality control, nothing targeting 100KB.
- The tool's own page discloses "sirf pehle 3 pages" deeper down, but the hub tile promise is false. On the owner's favorite page this is a trust-breaking mismatch.

## P1 — should fix

### P1-1. "Photo Resizer" tile points to the wrong tool
- Tile: title "Photo Resizer", desc "20KB passport photo, form-ready" → `/sarkari/photo-resizer`.
- That route embeds `/tools/up-police-photo-resizer.html` (title "UP Police Form Photo Resizer 50KB").
- A real `public/tools/passport-photo-20kb.html` (5,788 bytes, valid tool) exists but is **orphaned** — zero references in `app/` or `components/`. Likely intended mapping: tile → passport-photo-20kb.html; the 50KB UP-Police tool deserves its own tile or a rename.

### P1-2. EPFO link is stale (domain migrated)
- Live test 2026-10-20: `https://www.epfindia.gov.in/` → 403 → redirects to `https://www.epfo.gov.in` (EPFO's new official domain).
- `links/page.js` line: "EPFO Member Portal" still points to the old domain. Update to https://www.epfo.gov.in.

### P1-3. PF claim link downgrades HTTPS→HTTP
- `https://unifiedportal-mem.epfindia.gov.in/` → 302 → `http://unifiedportal-mem.epfindia.gov.in/memberinterface/` (plain HTTP, then timed out).
- Users on this official-looking link can end up on an unencrypted page asking for PF credentials. Flag it; consider replacing with the current EPFO unified-member portal URL once verified from a non-filtered network.

### P1-4. Scheme Finder "AI" = one third-party endpoint, no fallback
- `public/tools/scheme-finder.html` builds a prompt containing the user's age/gender/occupation/category and calls `https://text.pollinations.ai/<prompt>` directly from the client.
- Live test: HTTP 200 but **7.8s** response time. No fallback UI if it fails; user PII (age, gender, category) travels in a GET URL to a third party.
- Recommend: server-side proxy or cached rule-based answers, at minimum a loading/error state.

### P1-5. OG/social metadata is broken sitewide (sarkari pages included)
- Served HTML (root layout): `<meta property="og:image" content="http://localhost:10000/og-diwali-card.png"/>` — localhost URL means share previews on WhatsApp/Telegram are broken.
- `app/layout.js` metadata: `openGraph.url` = `https://pro-universe-nine.vercel.app` (stale domain; live is rps-world-website.onrender.com); og image is relative with no `metadataBase`, so it fell back to a dev origin in the production build.

### P1-6. Image compressor uses the fragile file-input pattern
- `public/tools/image-compressor.html`: hidden `type=file` input + `dz.onclick=()=>fi.click()` — the exact JS-click pattern that failed on the owner's Android phone on the ProTools PDF tool (2026-10-20). The other two tool pages use the safe `<label for>` pattern.
- Fix alongside P0-1: make the input a native full-zone tap target (`absolute inset-0 opacity-0`), keep `e.target !== inp` guard.

### P1-7. Single-CDN dependencies on tool engines
- `public/tools/pdf-compressor-100kb.html` loads pdf-lib only from `https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/` — the same failure class that killed the ProTools PDF tool this morning (one CDN hang → dead UI). Scheme finder, photo resizer similarly depend on Tailwind CDN.
- Fix alongside P0-1: self-host the libs.

## P2 — nice to have

- **Static tool pages carry dead ProTools boilerplate**: `installPWA()` fallback → `location.href='/app/'` — `/app` has no route on the Render site (returns 404 after 308). "31MB • No signup • Works offline" footer text inside Pro Universe tools. Rebrand/remove.
- **"Pro Universe Pro" house ad vs reality**: ad copy "one payment, lifetime"; `/coins` page offers coin-spend plans and shows "₹499 one-time" in marketing copy, but no cash checkout is wired. Confusing pricing story.
- **Vault download UX**: client sets `a.download` on a cross-origin signed URL — Chrome ignores `download` on cross-origin links, so it opens in a tab instead of downloading. Cosmetic.
- **Vault requires login** but the hub tile ("Encrypted private locker", badge "Open →") implies instant use — expectation gap. Vault itself is otherwise excellent: auth-required routes, 10MB server-side cap (content-length gate + magic-byte validation), server-generated `<uid>/<uuid>.<ext>` paths, ownership checks on list/download/delete (including path-prefix defense + 60s signed URLs), honest partial-delete (HTTP 207), and the "end-to-end encryption nahi hai — Aadhaar/PAN na upload karo" warning is **rendered on the live page** (verified in served HTML), not just a comment. No leaked keys anywhere in sarkari client code (Supabase via anon key + RLS).
- **Duplication**: near-identical trap variants of these tools exist on pdf-merge-split-free.vercel.app (SEO-trap builds with tracking). Owner's canonical choice: the sarkari section. Mark the sarkari set canonical; the trap copies are a maintenance hazard (two codebases for PDF compressor/photo resizer).
- **Voter portal / epfindia**: `voters.eci.gov.in` returned 406 to curl (bot rejection — likely fine in real browsers). myaadhaar.uidai.gov.in, edistrict.up.gov.in, nsdl.com timed out from this VM — this egress IP is known-filtered for those domains (TOOLS.md); they are NOT provably dead — re-verify from a phone/neutral network. Do not "fix" these until a second source confirms.
- `passbook.epfindia.gov.in`, `uidai.gov.in`, `pan.utiitsl.com`, `incometax.gov.in`, `digilocker.gov.in`, `jansunwai.up.nic.in` — all verified 200, correct destinations, no suspicious redirects.

## Change list (ranked)

1. **P0** Unblock the 5 framed tools: either stop framing (embed tool HTML natively / make ToolFrame link out) or exclude `/tools/*` from the DENY header. 5 of 9 tiles are currently dead for real users.
2. **P0** Fix "PDF Compressor" naming/copy OR replace its engine with a real compressor — the hub tile promises 100KB compression that doesn't happen.
3. **P1** Point the "Photo Resizer" tile at the orphaned `passport-photo-20kb.html` (or relabel tile to the UP-Police 50KB tool).
4. **P1** Update EPFO link to epfo.gov.in; investigate/replace the unifiedportal https→http downgrade.
5. **P1** Give scheme-finder a resilient AI path (server proxy / cached answers / error state).
6. **P1** Fix OG metadata: real `metadataBase`, correct og:url, working og:image.
7. **P1** Native full-zone tap targets for image-compressor file input (drop the `fi.click()` pattern).
8. **P2** Rebrand/remove dead ProTools installPWA boilerplate from /tools pages; fix the `/app` 404 fallback.
9. **P2** Clarify Pro pricing on /coins (one payment lifetime vs coins vs ₹499).
10. **P2** Re-verify the 4 unreachables (myaadhaar, edistrict, nsdl, voters) from a neutral network before touching them.

---

## ADDENDUM — ChatGPT Brutal Audit Verdict (20 Oct 2026)
- Core verdict: "Aur bada nahi, pehle TRUSTWORTHY banana hai." Phase order: P0/P1 repairs → 3 additions → traffic.
- P0 fix approach: tools ko NATIVE pages/direct routes par expose karo; global X-Frame-Options DENY rehne do. Tile → direct route link sabse low-complexity fix. Security header hataana avoid.
- 17 Oct security header = likely root cause of the 5 broken tools (caveat: exact per-tool break timestamp not independently proven).
- PDF Compressor = P0 trust issue: first-3-pages extraction SILENT DATA LOSS risk hai. Fast safe fix: disable/relabel until real compression; honest output reporting mandatory (original vs output size, page count preserved).
- Additions: #1 Exam Photo–Signature Maker (highest priority, reuse existing code; presets official notification se verify), #2 Document Checklist Generator, #3 Top-5 Hindi guides. OVERRATED: Photo Background Changer (abhi top priority dena). Second-tier: Status Check Hub (compact update, official deep links only), DOP strip/joint sheet (subfeature), Age calculator (rules maintenance cost), PDF→JPG/JPG→PDF (core reliable hone ke baad), Vault Phase 2 e2e (bada effort — long term).
- Scheme Finder: Pollinations hatao; curated official scheme data + last-verified date + official links. AI badge hatao. Baad me AI to sirf explain/summarize ke liye, server-side proxy se.
- Blunt point: "70 scripts syntax-pass + 11/11 URLs 200 = quality ka proof NAHI. Real quality = user ka document, correct output, no silent data loss."
