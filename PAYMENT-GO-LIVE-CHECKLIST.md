# Payment Go-Live Checklist — Pro Universe / Diwali Pack
Prepared: 2026-10-12 20:35 IST. Status snapshot below; tick items off as they land.

## Rail status right now
- **Cashfree** — ACTIVATED (dashboard-verified 2026-10-28): Payment Gateway, Payment Links, Payment Forms all activated; activation notification 14 Oct 2026 18:22; 42 modes (14 Oct) + 6 modes (16 Oct) enabled. Bank verified: ₹1 IMPS + ₹1 NEFT penny-drops in IPPB; CKYC fetched. Remaining KYC step: VCIP (video verification) via care@cashfree.com. Account Manager: Anjali K.
- **Instamojo** — PAN + bank + Smart Page done 2026-10-12. Activation state UNVERIFIED (watch now flags Instamojo mails too).
- **Razorpay** — old account dead (appeal 21343834 closed 2026-10-11). New signup in progress on raviprata86@gmail.com.

## Go-live steps (Cashfree activated 14 Oct 2026 — these steps are now actionable)
1. **Phone → Cashfree dashboard → Payment Links → Create link**
   - Amount: ₹149, title: "Diwali Business Promo Pack", add a one-line description.
   - No integration needed — Payment Links work without any code.
2. **Test it yourself** — pay ₹149 via the link, confirm it settles into the IPPB account.
3. **Top up the IPPB settlement account first** — it is nearly empty; a refund/chargeback on day one with zero balance is a bad look.
4. **Wire the link into the kit page** — /diwali-business-kit currently says "pay on WhatsApp" with NO link to share, and its CTAs expose the personal number wa.me/919235039317 (4×) — privacy fix still awaiting Ravi's approval. Put the Payment Link on the CTA (replaces the WhatsApp pay step).
5. **Same fix for /tools/scheme-finder.html:83** — same personal number, and it forwards the visitor's own phone into the message (visitor PII → personal WhatsApp).

## Still waiting on Ravi's calls (do not assume)
- Business WhatsApp number (NOT personal 9235039317) for support/fulfilment.
- Payment method per tier + fulfilment model: instant-download (₹149 pack is built and zipped: preview/diwali-business-promo-pack.zip) vs manual custom designs (24–48h, conflicts with zero-manual-effort rule).
- Privacy fixes: unapplied, need his approval (per his PROJECT BRIEF non-negotiable #1: no personal exposure).

## Backup rail
- Razorpay new-account signup continues in parallel on raviprata86@gmail.com — whichever activates first takes the Diwali traffic (Dhanteras 6 Nov, Diwali 8 Nov).

## Do NOT do
- No QR/personal-UPI interim rail — exposes his personal name via UPI and breaks his own Decision 2 + stealth rule.
- No deployment of the kit page changes until he reviews preview/index.html.
