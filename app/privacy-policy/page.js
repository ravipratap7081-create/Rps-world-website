export const metadata = {
  title: "Privacy Policy | Pro Universe",
  description: "Privacy Policy for Pro Universe — how we collect, use, and protect your data across our free online tools.",
  alternates: { canonical: "https://rps-world-website.onrender.com/privacy-policy" },
};

const SECTIONS = [
  {
    h: "1. Information We Collect",
    p: [
      "Account information: When you create an account, we collect your email address and a securely hashed password. We never store plain-text passwords.",
      "Usage data: We collect anonymous analytics about which tools you use and how (page views, tool usage counts) to improve our services. This data is aggregated and cannot identify you personally.",
      "Files you process: Our tools (photo resizer, PDF compressor, signature maker, etc.) process your files entirely in your browser whenever possible. Files you upload to server-side features (like the Document Vault) are stored securely and are only accessible to you.",
      "Cookies: We use essential cookies for login sessions and preferences. If we enable advertising in the future, third-party vendors (including Google) may use cookies to serve ads based on your visits.",
    ],
  },
  {
    h: "2. How We Use Your Information",
    p: [
      "To provide and maintain our free tools and services.",
      "To manage your account, coins balance, and saved documents.",
      "To improve our tools based on anonymous usage patterns.",
      "To communicate important service updates (we never send marketing spam).",
      "To display relevant advertising (via Google AdSense or similar) that keeps our tools free.",
    ],
  },
  {
    h: "3. Google AdSense & Cookies",
    p: [
      "We may use Google AdSense to display ads. Google uses cookies (including the DoubleClick cookie) to serve ads based on your visits to our site and other sites on the internet.",
      "You may opt out of personalized advertising by visiting Google's Ads Settings (https://www.google.com/settings/ads).",
      "Third-party vendors may also use cookies to serve ads on our site.",
    ],
  },
  {
    h: "4. Data Security",
    p: [
      "Your data is stored on secure infrastructure (Supabase) with row-level security policies ensuring only you can access your own data.",
      "Passwords are hashed using industry-standard algorithms; we cannot read your password.",
      "Documents in the Vault are stored in private storage buckets accessible only to your account.",
      "While we take strong measures to protect your data, no internet transmission is 100% secure.",
    ],
  },
  {
    h: "5. Data Sharing",
    p: [
      "We do not sell your personal information to anyone.",
      "We share data only with essential service providers (hosting, database, analytics, payment processors) under strict confidentiality.",
      "We may disclose data if required by law or to protect our rights and users' safety.",
    ],
  },
  {
    h: "6. Your Rights",
    p: [
      "You can view and delete your uploaded documents at any time from the Vault.",
      "You can request deletion of your account and all associated data by contacting us.",
      "You can opt out of analytics and personalized ads through your browser settings.",
    ],
  },
  {
    h: "7. Children's Privacy",
    p: [
      "Our services are not directed at children under 13. We do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    h: "8. Changes to This Policy",
    p: [
      "We may update this Privacy Policy from time to time. Significant changes will be announced on the site. Continued use of our services after changes constitutes acceptance.",
    ],
  },
  {
    h: "9. Contact Us",
    p: [
      "For privacy questions or data requests, contact us at the email listed on our Contact page.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2">Privacy Policy</h1>
        <p className="text-white/50 text-sm mb-8">Last updated: October 12, 2026</p>
        {SECTIONS.map((s, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-amber-300">{s.h}</h2>
            {s.p.map((para, j) => (
              <p key={j} className="text-white/70 text-[15px] leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </section>
        ))}
        <footer className="text-center text-white/30 text-xs pt-8 border-t border-white/10">
          Pro Universe • All Work, One App
        </footer>
      </main>
    </div>
  );
}
