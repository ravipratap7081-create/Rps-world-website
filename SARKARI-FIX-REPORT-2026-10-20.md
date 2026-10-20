# Sarkari Section Overhaul — Build Report (2026-10-20)

**Repo:** ravipratap7081-create/Rps-world-website · **Commit:** `86594e4` · **Deploy:** Render auto-deploy (commit `c5355db` → `86594e4`, live ~10:10 IST)
**Live site:** https://rps-world-website.onrender.com/sarkari
**Audit basis:** SARKARI-AUDIT-2026-10-20.md (+ ChatGPT addendum) · **Additions basis:** SARKARI-ADDITIONS-RESEARCH-2026-10-20.md
**Standard used:** Nothing declared "working" from HTTP 200 alone — every tool functionally exercised in headless Chromium (mobile 390px + desktop 1280px) against a local production build, with real downloads verified byte-level where applicable. Live re-verification after deploy via HTTP + served-HTML analysis (VM egress blocks headless-Chrome→live TLS, so live functional proof rests on identical-commit local QA + live content markers).

---

## PHASE 1 — P0 fixes

### 1. Five dead tools → native pages (P0-1)
**Changed:**
- `app/sarkari/photo-resizer/page.js` + `Tool.js` — Passport Photo 20KB (correct mapping; was UP-Police 50KB tool)
- `app/sarkari/up-police-photo/page.js` + `Tool.js` — NEW route, correctly labelled UP Police 50KB tool
- `app/sarkari/pdf-compressor/page.js` + `Tool.js` — real compressor (below)
- `app/sarkari/scheme-finder/page.js` + `Tool.js` — curated finder (below)
- `app/sarkari/image-compressor/page.js` + `Tool.js` — native, quality slider + target-KB mode
- `app/sarkari/signature-maker/page.js` + `Tool.js` — native Draw/Type/Upload, transparent PNG export
- `app/sarkari/page.js` — hub rewritten: 12 tiles (4 NEW) + Pro ad
- Shared: `components/tools/ToolPage.js`, `components/tools/FileDrop.js` (full-zone native tap target — the old `fi.click()` pattern gone), `lib/image-tools.js`, `lib/load-pdf-lib.js`
- Every route: `page.js` = server component with per-page `metadata` + canonical per-page `og:url`.

**How verified (local prod build, Chromium 390px + 1280px):**
- Render sweep of all 17 sarkari routes: 200, 0 JS page errors*, 0 `<iframe>` anywhere in sarkari. (*Chrome sandbox console showed 2 ERR_TUNNEL_CONNECTION_FAILED per page for Google Fonts — VM egress artifact, not app errors; no pageerror thrown.)
- Photo Resizer: uploaded 1.5MB PNG → **16.6 KB @ 413×531 px**, clear preview, download button → file.
- UP Police: same photo → **44.0 KB (band 42–50 ✓)**.
- Image Compressor: original 1.45MB → compressed sizes reported, slider recomputes.
- Signature: drew stroke on canvas → preview + controls live, 0 errors.
- **LIVE:** all 17 routes + vault 200; hub HTML contains all 4 new tile titles; 0 `<iframe>` in live HTML; `x-frame-options: DENY` still on live responses.

**Live status:** ✅ RENDERED + FUNCTIONAL (functionally proven locally on identical commit; live content markers confirm deployment).

### 2. PDF Compressor — real engine (P0-2)
**Changed:** `app/sarkari/pdf-compressor/page.js` + `Tool.js` (rewrote the dishonest 3-page extractor completely); `lib/load-pdf-lib.js` (self-hosted `/libs/pdf-lib.min.js` → cdnjs → jsDelivr → unpkg chain, UI stays alive if all fail); `public/libs/pdf-lib.min.js` (525KB self-hosted).
**Engine:** DCTDecode (JPEG) image XObjects are re-encoded at reduced quality/scale via canvas, 4-attempt ladder, per-image try/catch; SMask images skipped; everything else untouched; **all pages always preserved**.

**How verified (hard evidence):**
- Test PDF: 4 pages, 1,477,535 bytes, JPEG images → **output 177,983 bytes (88% smaller), page count verified 4→4 via pdf-lib in Node on the actual downloaded file**, "🎯 Target (200KB) achieve ho gaya", 0 page errors.
- Text-only PDF (3 pages, 3.9KB): honest path — "Is PDF me photo nahi mili", original offered for download, no fake compression.
- **LIVE:** route 200, served HTML contains new tool copy, `/libs/pdf-lib.min.js` 200 live. Local download-level proof is the evidence; live served content matches.

### 3. Photo Resizer mapping (P1-1)
Tile now opens the real Passport 20KB tool (413×531 px, 20KB band — verified output 16.6KB); UP-Police 50KB tool is its own tile/route. Output dims + KB bands functionally verified (above).

---

## PHASE 2 — P1 changes

### 4. Scheme Finder — curated, no AI, no data harvesting (P1-4)
**Changed:** `lib/schemes-data.js` (22 schemes: eligibility rules, docs, official apply links, source + last-verified 2026-10-20 each); Tool.js deterministic filter.
**REMOVED:** the `text.pollinations.ai` client call (user PII in URL) **and** the previously-unlisted required phone-number field + `trackLead('Scheme User', phone, ...)` harvester.
**Verified:** form (30 / Male / OBC / ₹2L se kam / Kisaan) → results with **exact header "Possible matches — final eligibility official portal par confirm karein"**, PM-KISAN matched; on-page notice: "Koi AI nahi… koi phone number nahi manga jata"; grep confirms zero pollinations/trackLead/sPhone references in the new files.
**Live:** route 200, served HTML contains the privacy note. ✅

### 5. Sarkari Links — EPFO + HTTPS (P1-2, P1-3)
**Changed:** `app/sarkari/links/page.js`:
- EPFO Member Portal → `https://www.epfo.gov.in` (was migrated `www.epfindia.gov.in`)
- PF Passbook → `https://passbook.epfindia.gov.in/MemberPassBook/Login` (direct HTTPS login)
- PF Claim → `https://unifiedportal-mem.epfindia.gov.in/` (HTTPS, no http downgrade)
- myaadhaar.uidai.gov.in, edistrict.up.gov.in, onlineservices.nsdl.com timed out from this VM = **egress-filtered (known), NOT declared dead** — kept canonical official URLs.
**Verified:** live link sweep shows the new URLs in DOM. ✅

### 6. OG metadata sitewide (P1-5)
**Changed:** `app/layout.js` — `metadataBase: https://rps-world-website.onrender.com`, `openGraph.url` → canonical, `openGraph.images` → `/og-sarkari.png` (new 1200×630 file, `public/og-sarkari.png`, 200 live); AI-scheme-finder claim removed from description. Also swapped `pro-universe-nine.vercel.app` → canonical domain in privacy/terms/about/contact canonicals, admin page, forgot-password fallback.
**NOT touched (scope):** diwali-card/blog pages still reference the old domain — deliberate, owner said do not touch diwali pages.
**Verified:** served HTML for `/`, `/sarkari`, `/sarkari/pdf-compressor`, `/sarkari/guides`, `/sarkari/exam-photo-signature`: `og:image=https://rps-world-website.onrender.com/og-sarkari.png`, canonical `og:url` per page, zero `localhost`/stale refs on these pages. ✅

---

## PHASE 3 — ADD (ChatGPT-approved 3)

### 7. Exam Photo–Signature Maker (NEW: `/sarkari/exam-photo-signature`)
**Changed:** `lib/exam-presets.js` (6 presets researched from official notifications/official PDFs 2026-10-20); `app/sarkari/exam-photo-signature/page.js` + `Tool.js`.
Presets: SSC (CGL/CHSL), UPSC, UP Police, Railway RRB, Bank IBPS, Passport Size (generic).
**Honesty-critical findings applied:**
- **SSC + latest RRB (CEN 06/2026) = LIVE photo capture — tool shows the LIVE notice and does NOT offer fake upload processing**; signature processing still offered.
- SSC signature 709×236 px (6.0×2.0 cm @300DPI); RRB signature 140×60 px; IBPS gets extra Thumb (240×240) + Declaration (800×400) processors.
- UPSC: px not published by UPSC → KB-band (20–200) only, never guessed dims; optional Naam+Date strip toggle (UPSC requires it).
- Passport preset flagged `verified:false` → amber banner in UI: "final spec notification se confirm karein".
- Joint photo+signature sheet: research disproved it for UPPRPB (separate files) → NOT built; note in preset extras.
**Verified:** UP Police preset: photo → **23.6 KB @ 413×531 (band 20–50 ✓)**; signature → **11.2 KB @ 413×177 (band 5–20 ✓)**; below-min KB triggers honest warning; SSC switch → LIVE notice + only 1 file input; 0 page errors. **Live:** 200, OG correct, preset names in served HTML. ✅

### 8. Document Checklist Generator (NEW: `/sarkari/checklist`)
**Changed:** `lib/checklist-data.js` (7 kaam: exam form, scholarship, Aadhaar update, PAN, voter ID, ration card, Ayushman); Tool.js selector → docs list + photo/sign specs + official portal links + last-verified + "official se confirm karein" disclaimer.
**Verified:** Ayushman selection shows Aadhaar docs + beneficiary.nha.gov.in portal link. **Live:** 200. ✅

### 9. Five Hindi Guides (NEW: `/sarkari/guides/...`)
**Changed:** index + 5 server-component pages (photo-resize, signature-size, pdf-size-ghatao, form-documents, upload-errors) — real 6–9-step Devanagari Hindi content, "aam galtiyan" boxes, tool CTA links, per-page metadata, "Last updated: 20 Oct 2026" + official-confirmation disclaimer.
**Verified:** rendered, content length confirms real articles (2.9–3.3K text chars), console-error free, desktop + mobile. **Live:** all 200. ✅

---

## Out of scope / untouched (deliberate)
- **Document Vault** (`app/sarkari/vault`, `app/api/vault/*`, `lib/vault.js`) — zero diff. ✅
- **Diwali pages + blog** (diwali-card, diwali-business-kit, blog) — zero diff; their old-domain OG refs remain (owner-ordered scope boundary).
- **Gen-Z pages** still use `ToolFrame.js` iframe → also broken by DENY — **flagged, NOT fixed** (out of this task's scope; recommend same treatment next).
- Legacy `public/tools/*.html` files remain on disk but are no longer referenced from any sarkari route.

## PENDING items (nothing hidden)
1. **myaadhaar / edistrict / nsdl link liveness** — cannot be verified from this VM's filtered egress; marked "egress-blocked, not dead". Owner should re-check these links once from his own phone.
2. **Real-phone runtime check** — headless-Chrome functional proof is thorough, but an actual Android Chrome tap-through of photo upload + PDF compression + exam maker is the final seal. The vault/denoted "pending" phone tasks still include this pattern.
3. **Chunk hash difference** between local build and Render's build (same commit, different content hashes) — normal; all live content markers verified.

## Acceptance summary
| # | Item | Local proof | Live |
|---|---|---|---|
| 1 | 5 tools render without iframe | ✅ 17/17 routes, 0 iframes, 0 JS errors | ✅ 200s, tiles present, 0 iframes |
| 2 | PDF Compressor honest + effective | ✅ 88% smaller, pages 4→4 byte-verified; honest text-PDF path | ✅ content markers + engine lib 200 |
| 3 | Photo mapping correct | ✅ 16.6KB@413×531; 44KB@600×760 | ✅ markers |
| 4 | Scheme Finder no-AI, no PII | ✅ disclaimer + grep-clean | ✅ markers |
| 5 | Links fixed | ✅ DOM sweep | ✅ |
| 6 | OG sitewide (sarkari) | ✅ head tags per page | ✅ |
| 7 | Exam maker | ✅ in-band outputs, LIVE-capture honesty | ✅ |
| 8 | Checklist | ✅ | ✅ |
| 9 | Guides | ✅ | ✅ |
