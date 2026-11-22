/** @type {import('next').NextConfig} */
// Content-Security-Policy — built from external origins actually used in the
// codebase (audited 2026-10-20, Fix Round 3):
//  - fonts.googleapis.com / fonts.gstatic.com ... Google Fonts (app/layout.js)
//  - *.supabase.co (+ wss) ....................... Supabase auth/REST/realtime
//    (NEXT_PUBLIC_SUPABASE_URL is env-driven, always a *.supabase.co host;
//    used by lib/supabase-client, lib/coins, components/Tracker)
//  - text.pollinations.ai ........................ Doubt Solver AI POST
//    (app/genz/doubt-solver/Tool.js) + legacy static tools under /tools
//  - cdn.jsdelivr.net / cdnjs.cloudflare.com / unpkg.com
//    ............................................. pdf-lib fallback chain
//    (lib/load-pdf-lib.js), Tesseract.js OCR + qrcode (static tools)
//  - tessdata.projectnaptha.com ................ Tesseract.js default
//    traineddata host (OCR language files fetched at runtime)
//  - cdn.tailwindcss.com ........................ static /tools/*.html pages
//  - checkout.razorpay.com / api.razorpay.com ... Razorpay checkout script +
//    its checkout iframe (app/coins/page.js)
//  - connect.facebook.net / www.facebook.com / graph.facebook.com
//    ............................................. Meta Pixel (diwali kit)
//  - googletagmanager / google-analytics / pagead2.googlesyndication
//    ............................................. GA/AdSense slots already
//    wired in layout/AdSlot (currently dormant — allowed so enabling them
//    does not silently break behind the CSP)
//  - payments.cashfree.com / sandbox ............ Cashfree hosted checkout
//    (orders are created server-side in app/api/checkout; the browser is
//    redirected to the hosted checkout — form-action/frame-src cover it)
//  - myinstamojo.com ............................ Diwali kit Buy-Now target
// img-src keeps https: because the site renders third-party images whose
// hosts are data-driven (e.g. api.qrserver.com QR in Site48, Meta Pixel
// beacon, user/OG images); every other directive is origin-allowlisted.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://cdn.tailwindcss.com https://checkout.razorpay.com https://sdk.cashfree.com https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://text.pollinations.ai https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://tessdata.projectnaptha.com https://connect.facebook.net https://www.facebook.com https://graph.facebook.com https://www.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://api.razorpay.com https://checkout.razorpay.com https://api.cashfree.com https://payments.cashfree.com https://sdk.cashfree.com",
  "worker-src 'self' blob: https://cdn.jsdelivr.net",
  "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com https://payments.cashfree.com https://sandbox.cashfree.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self' https://payments.cashfree.com https://sandbox.cashfree.com https://api.razorpay.com https://checkout.razorpay.com https://ravipratap7081.myinstamojo.com",
].join("; ");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // hide "X-Powered-By: Next.js" (info leak)
  productionSourceMaps: false, // no client .map files served (default, made explicit)
  async redirects() {
    return [
      { source: "/refund", destination: "/refund-policy", permanent: true },
      // /reset-password was a page-level redirect() — Next prerenders that
      // page statically and the live 307 shipped WITHOUT a Location header
      // (verified on Render + Vercel, 10 Nov 2026), so browsers went
      // nowhere. Config-level redirect (same pattern as /refund) carries
      // the Location header correctly.
      { source: "/reset-password", destination: "/update-password", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        // Pro unlock: ProTools (protools.rpsworld.in) calls this
        // endpoint from the browser to check Pro status. Without this header
        // the fetch is CORS-blocked and the check stays fail-closed.
        source: "/api/pro-check",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://protools.rpsworld.in" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
