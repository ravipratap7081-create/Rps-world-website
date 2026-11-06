export const metadata = {
  title: "Terms of Service | ProTools",
  description: "Terms of Service for using ProTools free online tools — acceptable use, accounts, coins, and limitations.",
  openGraph: {
    title: "Terms of Service | ProTools",
    description: "Terms of Service for using ProTools free online tools — acceptable use, accounts, coins, and limitations.",
    url: "https://rps-world-website.onrender.com/terms",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Terms of Service | ProTools", description: "Terms of Service for using ProTools free online tools — acceptable use, accounts, coins, and limitations." },
  alternates: { canonical: "https://rps-world-website.onrender.com/terms" },
};

const SECTIONS = [
  {
    h: "1. Acceptance of Terms",
    p: [
      "By accessing or using ProTools (\"the Service\"), you agree to these Terms of Service. If you do not agree, please do not use the Service.",
    ],
  },
  {
    h: "2. Description of Service",
    p: [
      "ProTools provides free online utility tools including photo resizing, PDF compression, document vault, AI-powered scheme finder, resume maker, doubt solver, signature maker, greeting card maker, and related tools.",
      "Basic tools are free to use without an account. Certain features (Document Vault, coins, Pro features) require a free account.",
    ],
  },
  {
    h: "3. Acceptable Use",
    p: [
      "You agree not to: upload illegal, harmful, or copyrighted content you do not own; attempt to breach our security or other users' accounts; abuse the Service with automated scraping or excessive requests; use the Service for any unlawful purpose; upload malware or malicious files.",
      "We reserve the right to suspend accounts that violate these terms.",
    ],
  },
  {
    h: "4. Accounts",
    p: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You must provide accurate information when creating an account.",
      "One account per person; sharing accounts is not permitted.",
    ],
  },
  {
    h: "5. Coins System",
    p: [
      "Coins are a virtual loyalty mechanism with no monetary value. They cannot be purchased, sold, transferred, or redeemed for cash.",
      "We may adjust coin balances in case of abuse, errors, or fraud.",
      "Coins may expire or the program may be discontinued at our discretion with reasonable notice.",
    ],
  },
  {
    h: "6. Intellectual Property",
    p: [
      "The Service's design, code, and original content belong to ProTools.",
      "Tools process your files for you; you retain ownership of your own uploaded content.",
      "Greeting cards you create may be shared freely; the \"Made with ProTools\" attribution should be retained.",
    ],
  },
  {
    h: "7. Third-Party Services",
    p: [
      "Our tools may link to official government portals and third-party sites. We are not responsible for their content or privacy practices.",
      "Payment processing (when available) is handled by regulated third-party payment gateways under their own terms.",
    ],
  },
  {
    h: "8. Disclaimer of Warranties",
    p: [
      "The Service is provided \"as is\" without warranties of any kind. We do not guarantee uninterrupted, error-free operation.",
      "File processing results (compression sizes, resize dimensions) are best-effort; always verify output before official use (e.g., government form submissions).",
      "AI-generated content (scheme suggestions, answers) is informational only and not professional advice.",
    ],
  },
  {
    h: "9. Limitation of Liability",
    p: [
      "To the maximum extent permitted by law, ProTools shall not be liable for indirect, incidental, or consequential damages arising from use of the Service.",
    ],
  },
  {
    h: "10. Changes to Terms",
    p: [
      "We may update these Terms periodically. Continued use after changes constitutes acceptance of the new Terms.",
    ],
  },
  {
    h: "11. Governing Law",
    p: [
      "These Terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Kanpur, Uttar Pradesh.",
    ],
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2">Terms of Service</h1>
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
          ProTools • All Work, One App
          <br />
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
        </footer>
      </main>
    </div>
  );
}
