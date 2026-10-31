// ProTools Pro — single canonical definition (29 Oct 2026).
// Price decided by the owner: ₹149/month, paid month by month via
// Instamojo hosted checkout (rail changed 29 Oct 2026; the Cashfree
// route stays in the repo as fallback). NO auto-renewal: each payment
// is one-time, so the buyer pays again each month to continue Pro.
// Do NOT reintroduce the old ₹499 one-time / "lifetime" claim, and do
// NOT promise a tool feature that the code does not gate yet.

export const PRO_PRICE_INR = 149;
export const PRO_PRODUCT = "pro_monthly";
// One paid Pro month = 30 days from the verified payment time.
export const PRO_DURATION_DAYS = 30;

// FREE LIMITS — the one real, testable free limit, enforced in tool code.
// These caps do not break ordinary free use: most form photos are under
// 5MB and most form PDFs are under 10MB. Larger files are the Pro case.
// Photo-resizer input file size; PDF-compressor input file size.
export const FREE_PHOTO_MAX_MB = 5;
export const PRO_PHOTO_MAX_MB = 20;
export const FREE_PDF_MAX_MB = 10;
export const PRO_PDF_MAX_MB = 25;

// HONEST GATING LIMIT — read before claiming Pro is "enforced":
// The tools run entirely in the browser (no server processing, no upload),
// so gating is UI enforcement driven by a SERVER check, not DRM.
// /api/pro-check decides isPro from pro_orders (server, service key);
// the tool page then enforces the cap in the browser. A determined user
// editing client code could bypass a browser cap — that is true of every
// client-side tool and must never be described as server-side processing.
// There are no login accounts, so Pro identity is the PAYMENT EMAIL the
// buyer entered at checkout (verified server-side against pro_orders).
// It is never a client flag and never localStorage. Coin-trial Pro
// (7/30-day coin redemptions) is a separate system and does NOT unlock
// these caps — that is stated on /coins, not faked. Do NOT advertise
// coin trials as "same Pro features" while caps do not lift.
// PRO_FEATURES must list only things the code actually does (audit fix
// 31 Oct 2026): there is no batch/multi-file tool, and "unlimited
// downloads" is meaningless for client-side tools whose output the user
// already holds. The real cross-device perk is the payment-email check:
// Pro limits work on any device/browser via /api/pro-check, no login
// account needed.
export const PRO_FEATURES = [
  "Higher file-size limits: photo input 5MB → 20MB, PDF input 10MB → 25MB",
  "Pro limit har device par — sirf payment email se check karo, koi login account nahi chahiye",
  "Priority AI answers (Doubt Solver, Resume Maker)",
  "Priority support on the business WhatsApp number",
];
export const PRO_TERMS =
  "₹149 per month, paid month by month via Instamojo secure checkout. " +
  "No auto-renewal: you pay again each month to continue Pro. " +
  "Pro is a digital subscription — no refund after a month has started, " +
  "except a double-payment made by mistake (reported within 7 days).";
export const PRO_ACTIVATION_NOTE =
  "Auto-activation: after a verified Instamojo payment, the server writes " +
  "pro_orders and Pro runs for 30 days from payment. Free tools stay free " +
  "for everyone, and sharing never unlocks or locks any feature.";
