# Privacy Audit — Pro Universe (2026-10-12)

**Scope:** READ-ONLY. No repo edits, no deploys, no publishing, no messages, no accounts, no spending.
**Repo:** `~/workspace/pro-universe` (confirmed; also contains `app/`, `components/`, `public/`, `lib/`, `supabase/`).
**Live site:** https://pro-universe-nine.vercel.app
**Method:** source grep (app/, components/, lib/, public/, supabase/, app/api/) + live verification via browser text fetch AND raw-HTML fetch (single fetch per page, href targets only — required because text extraction does not expose link destinations).

## Exposure table

| # | Severity | Repo file + line | Exact snippet | Live URL | Status |
|---|----------|------------------|---------------|----------|--------|
| 1 | **HIGH** | `app/diwali-business-kit/page.js:5` | `const WA_NUMBER = "919235039317";` | https://pro-universe-nine.vercel.app/diwali-business-kit | **LIVE in production** — 4 order CTAs point here: 3× "Enquire on WhatsApp" (Starter/Business/Premium) + "Get My Diwali Business Kit". Live HTML verified containing `https://wa.me/919235039317?text=Hi!%20I%20want%20the%20Starter/Business/Premium%20Diwali%20Business%20Kit...` |
| 2 | **HIGH** | `app/diwali-business-kit/page.js:75` | `return \`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}\`;` | (same page as #1) | **LIVE in production** — the generator behind all 4 CTAs; "How it works" steps 1–4 and FAQ describe this exact WhatsApp order flow ("A pre-filled WhatsApp message opens — just send it", "Pay securely — we share a payment link on WhatsApp", "Get designs in 24–48 hrs — delivered on WhatsApp"). |
| 3 | **HIGH** | `public/tools/scheme-finder.html:83` | `wa.href = 'https://wa.me/919235039317?text=' + msg; wa.target = '_blank';` | https://pro-universe-nine.vercel.app/tools/scheme-finder.html | **LIVE in production** — CTA button text "📲 Expert se baat karo (WhatsApp)". WORSE than #1: the pre-filled message includes the user's OWN phone number entered in the lead form (`'Phone: ' + ph` in `msg`), so it forwards user PII to a personal WhatsApp account. |
| 4 | LOW | `app/diwali-card/page.js:202` | `placeholder="e.g. Ravi Pratap Singh"` | https://pro-universe-nine.vercel.app/diwali-card | **LIVE in production** — personal full name used as example placeholder in the card-maker name input. Minor but identity-linking. |

### Informational (not exposures, kept in record)
- `app/diwali-card/page.js:117` — `"https://wa.me/?text=" + encodeURIComponent(text)` is the **generic** WhatsApp share (no number). Not an exposure.
- `app/diwali-card/page.js` — "Business CTA" banner ("Need designs for your business? … See Business Kit →") links to `/diwali-business-kit`, funneling traffic into exposure #1. Fixing #1 fixes the funnel.
- `app/terms/page.js:82` — jurisdiction text "courts in Kanpur, Uttar Pradesh". Generic location reference in legal terms; acceptable.
- `/contact` (source `app/contact/page.js`) lists `support@pro-universe.in`, `privacy@pro-universe.in`, `business@pro-universe.in` — brand emails, no phone/form. **UNVERIFIED: mailbox existence and deliverability were not confirmed in this audit — do not claim they receive mail until DNS/MX and a test send are checked.**
- `/about`, `/coins`, homepage `/`, footer (`components/ModeShell.js:112-121`) — all brand-only: "Pro Universe • All Work, One App", links to About/Contact/Privacy Policy/Terms. No names, no numbers, no photos.
- `tel:` links: **none found anywhere** in source or live.
- Personal photos: **none found** in any audited page/component.
- `lib/`, `app/api/`, `supabase/` — no phone numbers found.

## TOTAL: 3 exposures (2 HIGH, 1 LOW)

---

## Brand-only replacement copy (DRAFT — not applied)

### Finding #1/#2 — /diwali-business-kit order CTAs
Replace the WhatsApp order flow with the instant-download purchase flow (payment rail pending Razorpay appeal — CTA points at the site's own checkout, no phone):

- **New buttons (all 4):** `⚡ Buy & Download Instantly` — replaces "Enquire on WhatsApp" and "Get My Diwali Business Kit".
- **"How it works" rewrite:**
  1. "Pick a package & check out" — "Pay securely with UPI, cards, or netbanking — no chats, no waiting."
  2. "Get your download instantly" — "Your complete Diwali design pack downloads the moment payment completes."
  3. "Everything is original" — "Fresh designs made for your business — no templates resold as 'custom'."
  4. "Need changes? Email us" — "Write to support@pro-universe.in **(UNVERIFIED — mailbox not confirmed working; verify MX + test send before this ships)** with your order ID."
- **Honest promise block** (updated): "Full refund if your pack fails to download — no fake reviews, no inflated claims."
- **FAQ updates:** replace "How do I order a Diwali Business Kit?" answer with: "Pick a package and tap 'Buy & Download Instantly'. Pay securely and your pack downloads right away — no WhatsApp, no waiting."
- Delete `WA_NUMBER` const and `waLink()` entirely; remove `target="_blank"` order anchors.

### Finding #3 — /tools/scheme-finder.html "Expert se baat karo"
Remove the personal-WhatsApp lead CTA and the user-phone capture. Brand-only options (pick one, needs his call):
- **Option A (simplest, no mailbox needed):** replace button with "🔔 Save my results" — downloads the matched-scheme list as a file, fully client-side, no data leaves the device.
- **Option B:** "📧 Get scheme alerts by email" — mailto to `support@pro-universe.in` **(UNVERIFIED — mailbox not confirmed working)**.
- Either way: DELETE the `ph` phone-input field from the lead form and the `'Phone: ' + ph` line from the message builder — the current design forwards the user's own phone number to a personal WhatsApp, which is the worst finding in this audit.

### Finding #4 — /diwali-card name placeholder
Change `placeholder="e.g. Ravi Pratap Singh"` → `placeholder="Apna naam yahan likho ✍️"` (no real person's name anywhere).

---

## Notes for the coordinator
- Nothing here was changed in the repo or deployed — this audit is evidence only.
- The two HIGH findings both route orders/leads to **919235039317** (Ravi's personal number), violating the business/personal separation rule and stealth mode. Fixing them requires a replacement order flow — the pending Razorpay appeal is the blocking dependency for a real payment rail; until then, "instant download" CTAs must not promise payment they can't take (the payment-design workstream owns this).
- The `support@pro-universe.in` address on /contact is the natural brand replacement for support copy, but its mailbox is **UNVERIFIED** — flagging it as confirmed would be a false claim.
