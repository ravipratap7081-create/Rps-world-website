# AdSense-readiness: trust-page copy drafts (unapproved, not deployed)

Prepared 2026-10-11 ~12:35 IST. Purpose: when Ravi approves the custom-domain
route, these three pages get built with the premium design system (velvet
obsidian, Plus Jakarta Sans, Lucide icons) and deployed in the same release
as the domain wiring — so the site is AdSense-application-ready in one shot.

Copy only. Styling/wiring left for implementation. Contact email used:
ravipratap7081@gmail.com (Ravi's public app email already used as sender).

---

## /privacy — Privacy Policy (draft)

**Privacy Policy — ProTools**

Last updated: October 2026

ProTools ("we", "the app") provides free PDF, photo and AI utility tools.
This policy explains what data we collect and why.

**What we collect**
- Account data: your email address when you sign up or log in.
- Your files: documents you upload to the Vault are stored privately in your
  own encrypted storage space. Only you can see them.
- Usage data: page views and app-install events, used only to understand
  which tools are useful and to improve the app.

**How we use it**
- To run your account, your Vault, coins and rewards.
- To improve tools and fix problems.

**Third parties**
- Hosting and database: Vercel and Supabase (they process data only to run
  the service).
- Advertising (only if enabled): Google AdSense may use cookies to show
  relevant ads. You can opt out of personalised ads in your Google ad settings.

**Your control**
- Delete your Vault files anytime from inside the app.
- Write to ravipratap7081@gmail.com to ask what data we hold about you or to
  request deletion of your account data.

**Children**
- The app is not directed at children under 13.

---

## /about — About (draft)

**About ProTools**

ProTools is a free toolkit made in India: compress and resize photos to an
exact size, merge and split PDFs, make a resume in a minute, find government
schemes you qualify for, and get step-by-step solutions to study doubts.

Everything runs in your browser or on your phone — no heavy downloads, no
sign-up needed for the basic tools. Your private documents stay in your own
locked Vault, visible only to you.

Built by RPS World, Kanpur. Questions: ravipratap7081@gmail.com.

---

## /contact — Contact (draft)

**Contact**

For help, feedback or data requests: **ravipratap7081@gmail.com**

We read every message and reply as fast as we can.

---

## Implementation notes (for the main agent)

- Build these as real routes (/privacy, /about, /contact) in the premium
  design system; link them in the footer of every page (AdSense reviewers
  look for footer links).
- Do NOT deploy until Ravi approves the custom-domain decision — the pages
  only matter for the AdSense application.
- AdSense application itself must be done by Ravi from his own Google
  account (owner action); after approval he pastes the publisher ID into
  NEXT_PUBLIC_ADSENSE_CLIENT and the existing AdSlot components go live.
