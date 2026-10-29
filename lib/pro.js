// Pro Universe Pro — single canonical definition (29 Oct 2026).
// Price decided by the owner: ₹149/month, paid month by month via
// Cashfree checkout. NO auto-renewal: a Cashfree PG order is a one-time
// payment, so the buyer pays again each month to continue Pro.
// Do NOT reintroduce the old ₹499 one-time / "lifetime" claim, and do
// NOT promise a tool feature that the code does not gate yet — see
// PRO_ACTIVATION_NOTE below, shown on the /coins page.

export const PRO_PRICE_INR = 149;
export const PRO_PRODUCT = "pro_monthly";
export const PRO_FEATURES = [
  "Batch PDF tools — process more files in one go",
  "Higher file-size limits on photo and PDF tools",
  "Unlimited downloads of your own generated files",
  "Priority AI answers (Doubt Solver, Resume Maker)",
  "Priority support on the business WhatsApp number",
];
export const PRO_TERMS =
  "₹149 per month, paid month by month via Cashfree checkout. " +
  "No auto-renewal: you pay again each month to continue Pro. " +
  "Pro is a digital subscription — no refund after a month has started, " +
  "except a double-payment made by mistake (reported within 7 days).";
export const PRO_ACTIVATION_NOTE =
  "Checkout is built on Cashfree, but live payment testing and automatic " +
  "Pro activation are still pending. After payment, Pro is confirmed " +
  "manually within 24 hours on your payment email — your order ID is your " +
  "proof until then. Free tools stay free for everyone in the meantime, " +
  "and sharing never unlocks or locks any feature.";
