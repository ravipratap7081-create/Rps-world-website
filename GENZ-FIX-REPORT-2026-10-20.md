# Gen-Z Tools — Iframe Fix (ToolFrame Removal) — Build Report (2026-10-20)

**Repo:** ravipratap7081-create/Rps-world-website · **Commit:** `c370d99` · **Deploy:** Render auto-deploy, new build confirmed LIVE ~90s after push (live HTML markers).
**Live site:** https://rps-world-website.onrender.com/genz
**Trigger:** Owner's phone screenshots (20 Oct ~10:46 IST) — AI Doubt Solver + AI Resume Maker in Gen-Z Mode showing Chrome's broken-page icon: the same `ToolFrame.js` iframe vs `X-Frame-Options: DENY` bug fixed earlier for Sarkari (commit `86594e4`).
**Standard used:** Nothing declared "working" from HTTP 200 alone — every tool functionally exercised in headless Chromium (mobile 390px + desktop 1280px) against a local production build of this exact commit, then live re-verified via HTTP + served-HTML markers (VM egress blocks headless-Chrome→live TLS, same caveat as the Sarkari report).

---

## Scope found (grep, before touching anything)

`ToolFrame` had exactly **two** users in the whole app — both Gen-Z:

| Route | Legacy iframe src | Tool |
|---|---|---|
| `/genz/doubt-solver` | `/tools/doubt-solver.html` | AI Doubt Solver |
| `/genz/resume-maker` | `/tools/resume-maker.html` | "AI" Resume Maker |

- The Gen-Z hub (`app/genz/page.js`) has no other live tool tiles; "Scholarship Finder" links to `/sarkari/scheme-finder` (already native since the Sarkari overhaul) and "Go Pro" links to `/coins`. Coming-soon tiles are inert cards.
- **Diwali / blog check:** `grep iframe|ToolFrame` over `app/diwali-business-kit`, `app/diwali-card`, `app/diwali-offer-maker`, `app/blog` = **zero hits** — there are no iframe-broken Diwali tool pages, so no Diwali PENDING items from this bug class.
- `components/ToolFrame.js` itself is **deleted** in this commit — the bug class is removed, not just bypassed. **Global `X-Frame-Options: DENY` in `next.config.js` is untouched** (verified live, below).

---

## What changed

### Shared
- **NEW** `components/tools/GenzToolPage.js` — Gen-Z equivalent of the Sarkari `ToolPage` wrapper (ModeShell `genz`, back link to `/genz`, title/sub, honest-footer `note` prop).
- **DELETED** `components/ToolFrame.js` (no remaining importers — grep-clean across app/components).
- `app/genz/page.js` — hub tile renamed "AI Resume Maker" → **"Resume Maker"** (see honesty fix below); Doubt Solver tile unchanged (it really does call an AI service).

### 1. AI Doubt Solver → native (`/genz/doubt-solver`)
**Files:** `page.js` rewritten (server component + metadata + canonical OG), `Tool.js` NEW.
- Photo input now uses the shared **`FileDrop`** component (full-zone native tap target — the legacy hidden-input `label + JS` pattern and its fragile tap path are gone).
- OCR (photo → text) stays **100% client-side**: Tesseract.js `eng+hin` loaded lazily from jsDelivr **only when a photo is chosen**; OCR result prefills the question box; explicit statuses throughout ("Photo padh raha hun...", success, and three honest failure messages with a type-it fallback).
- Solve now calls the AI service via **POST** `https://text.pollinations.ai/` (JSON body) instead of the legacy GET — the student's question no longer travels inside a URL. 45s timeout, non-200/empty → honest Hindi error ("AI service abhi jawab nahi de raha..."), never a hang or a fake answer.
- Listen (Hindi TTS, hi-IN voice preference) + Stop + Share ported 1:1 from legacy.
- Visible honesty/privacy note on the page: photo is read **only on the phone**; the question is sent to a **free external AI service** for the answer — don't put personal/confidential info in questions. (The legacy head scripts also contained dead duplicated voice code pasted inside `<script src>` tags; not carried over.)
- Removed from legacy: service-worker registration, fake AdSense placeholder, PWA manifest refs.

### 2. Resume Maker → native + honestly relabelled (`/genz/resume-maker`)
**Files:** `page.js` rewritten (server component + metadata + canonical OG, title WITHOUT "AI"), `Tool.js` NEW.
- **Mislabel fix (same class as the old "PDF Compressor"):** the legacy tool was titled "AI Resume Maker" but contains **zero AI** — it is a form→template fill. It is now "Resume Maker" everywhere (hub tile, page title, headings) with on-page copy: *"Smart template se turant CV banta hai — koi AI nahi, aapki bhari details se."*
- **Fake ad-gate REMOVED:** the legacy download flow showed a "SPONSORED" modal with a **30-second countdown and no actual ad** — a dark-pattern wait with nothing behind it. Download is now direct: print dialog → Save as PDF.
- Same fields + same validation as legacy (name ≥ 2 chars, Indian mobile `^[6-9]\d{9}$`, education + skills required), but errors are **inline banners** instead of blocking `alert()`s.
- Print CSS scoped per page (`@media print` visibility technique): ONLY `#resumePaper` prints — verified byte-level (below).
- Footer domain fixed: legacy printed the stale `pro-universe-nine.vercel.app`; now `rps-world-website.onrender.com`.
- Extra: "✏️ Edit details" round-trip; details never leave the browser (stated on page).

---

## Verification (local prod build of commit c370d99, headless Chromium)

Build environment note (known repo caveat): local build/preview must set `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon key from the project's supabase-config) — first attempt without them reproduced the documented client-exception; rebuilt with env → clean sweep below.

**Render sweep — 6/6 PASS** (3 routes × 390px + 1280px): correct `<title>` + H1 per route, **0 `<iframe>`**, **0 JS page errors**. Only console errors were `ERR_TUNNEL_CONNECTION_FAILED` ×2 per page (Google Fonts via this VM's filtered egress — sandbox artifact, same as Sarkari QA; not an app error).

**Resume Maker — FULL functional PASS:**
- Filled form (name/phone/email/education/skills/experience) → Generate → preview paper shows every field exactly (contact line, skills joined " • ", experience section). **No ad-gate present** (`hasAdGate: false`).
- Print emulation → `page.pdf()` → `pdftotext`: output contains **only** the resume (all fields + canonical footer); app-chrome leakage check for "Gen-Z Mode"/"Login" = **0**.

**AI Doubt Solver — logic PASS, two paths environment-limited (honest):**
- Textarea + FileDrop file input present; 0 iframes; 0 page errors.
- **Solve path:** endpoint + payload proven from shell — `curl POST https://text.pollinations.ai/` returned **HTTP 200** with a correct answer ("2+2 equals 4."). Inside the sandboxed headless browser the fetch is blocked by the VM's tunnel egress, so the run exercised the **failure path**, which behaved exactly as designed: honest Hindi error shown, no hang, no fake answer, page stays usable.
- **OCR path:** Tesseract CDN is likewise unreachable from the sandbox browser → run exercised the **fallback path**: "Photo reader load nahi ho paya... question type karke Solve karo" shown correctly, page fully usable. (On a normal phone network jsDelivr is a standard public CDN; the typed-question core flow needs no CDN at all.)

## Live verification (after Render deploy of c370d99)
- `/genz`, `/genz/doubt-solver`, `/genz/resume-maker` → **200**.
- Served HTML: **0 `<iframe>`** on all three; new-content markers present ("Question ki Photo Lo", "bahari AI service", "koi AI nahi", canonical `og:url`); hub HTML no longer contains "AI Resume Maker".
- Response header: **`x-frame-options: DENY`** — intact.
- OG: `og:url = https://rps-world-website.onrender.com/genz/<tool>` per page, `og:image` on the live domain.

## PENDING items (nothing hidden)
1. **Real-phone runtime check** — headless proof is thorough for rendering + Resume Maker end-to-end, but Doubt Solver's two network paths (AI POST, Tesseract CDN load) could not be exercised from this sandbox (egress). One owner tap-through on his phone (type a question → Solve; photo → OCR) is the final seal for those two paths.
2. **Tesseract self-hosting (considered, deferred):** self-hosting tesseract.js core + `eng+hin` traineddata (~15MB+) would remove the CDN dependency the way pdf-lib was self-hosted for Sarkari, at a real repo/deploy weight cost. Deferred deliberately — the CDN + honest-fallback design keeps the tool's core (typed question) fully functional even if the OCR CDN fails.
3. **Legacy files remain on disk:** `public/tools/doubt-solver.html` and `public/tools/resume-maker.html` are no longer referenced by any Gen-Z route (same end-state as Sarkari's legacy files). Direct-URL access still serves the old pages; retire them in a future cleanup if desired.
4. `themeColor` metadata warning in build logs (pre-existing, appears for pre-existing routes too — not introduced by this change).
