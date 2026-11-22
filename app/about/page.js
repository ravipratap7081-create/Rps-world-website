import PrivacyChoicesLink from "../../components/PrivacyChoicesLink";

export const metadata = {
  title: "About RPS World | Websites & Free Tools",
  description: "RPS World — Kanpur se premium, mobile-first business websites (100% remote, poore India me) aur ProTools free tools. Built by Ravi Pratap Singh.",
  openGraph: {
    title: "About RPS World | Websites & Free Tools",
    description: "RPS World — Kanpur se premium, mobile-first business websites (100% remote, poore India me) aur ProTools free tools. Built by Ravi Pratap Singh.",
    url: "https://rpsworld.in/about",
    type: "website",
    images: [{ url: "/og-rps-world.png", width: 1200, height: 630, alt: "RPS World — premium business websites, free homepage concept first" }],
  },
  twitter: { card: "summary_large_image", title: "About RPS World | Websites & Free Tools", description: "RPS World — Kanpur se premium, mobile-first business websites (100% remote, poore India me) aur ProTools free tools. Built by Ravi Pratap Singh.", images: ["/og-rps-world.png"] },
  alternates: { canonical: "https://rpsworld.in/about" },
};

const TOOLS = [
  { name: "Photo Resizer", desc: "Resize passport photos to exact KB requirements (20KB, 100KB) for government forms." },
  { name: "PDF Compressor", desc: "Compress PDFs to 100KB without visible quality loss — perfect for uploads." },
  { name: "Scheme Finder", desc: "AI-powered finder for Indian government schemes matched to your profile." },
  { name: "Document Vault", desc: "Secure, private cloud storage for your important documents." },
  { name: "Signature Maker", desc: "Create digital signatures for forms and documents." },
  { name: "Resume Maker", desc: "Build professional resumes in minutes." },
  { name: "Doubt Solver", desc: "Get instant AI explanations for study doubts." },
  { name: "Diwali Card Maker", desc: "Create beautiful personalized Diwali greeting cards and share on WhatsApp." },
  { name: "Sarkari Links", desc: "Curated directory of official government portals — PF, Aadhaar, PAN, DigiLocker & more." },
];

export default function About() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0A0616] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="mix-h text-[34px] leading-tight mb-4">About RPS World</h1>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Hum kaun hain</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            RPS World — Kanpur, Uttar Pradesh se chalne wala ek website-service
            business hai. Hum boutiques, salons, jewellers, cafes, gyms aur
            coaching institutes ke liye <strong className="text-white">premium, mobile-first websites</strong> banate
            hain — 100% remote, poore India me.
          </p>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Built by <strong className="text-white">Ravi Pratap Singh, Kanpur — 100% remote across India</strong>.
            RPS World, Kanpur, India se operate hota hai.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Website service kaise kaam karta hai</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            Pehle aapke business ke liye ek free homepage concept — pasand aaye
            tabhi aage badho. Phir written scope, 50% advance, 7–10 working
            days me delivery, staging par review, baaki 50% par source +
            handover, aur 30 din free support.
          </p>
          <p className="text-white/70 text-[15px] leading-relaxed">
            <a href="/services" className="text-[#E3B34B] underline">Services dekho →</a>
            {" · "}
            <a href="/services/pricing" className="text-[#E3B34B] underline">Pricing dekho →</a>
            {" · "}
            <a href="/services/work" className="text-[#E3B34B] underline">Sample builds dekho →</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">About ProTools</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            ProTools RPS World ka free-tools product hai — everyday digital
            tasks ke liye free, fast aur frustration-free tools.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Our Mission</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            ProTools exists for one simple reason: <strong className="text-white">everyday digital tasks in India should be free, fast, and frustration-free.</strong>
          </p>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            Filling a government form and stuck because your photo is 247KB but the portal demands exactly 20KB? Need to compress a PDF to 100KB for an upload? Looking for which government scheme you actually qualify for? ProTools solves these real problems in seconds — right in your browser, no downloads, no watermarks on basic tools, no forced signups.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">What We Offer</h2>
          <div className="grid gap-3">
            {TOOLS.map((t, i) => (
              <div key={i} className="mix-card p-4 sm:p-5">
                <h3 className="mix-h text-lg text-white mb-1">{t.name}</h3>
                <p className="text-white/60 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Our Principles</h2>
          <ul className="text-white/70 text-[15px] leading-relaxed space-y-2 list-disc pl-5">
            <li><strong className="text-white">Free-first:</strong> core tools are free forever. No paywalls on basic utilities.</li>
            <li><strong className="text-white">Privacy-respecting:</strong> file processing happens in your browser whenever possible. Your documents stay yours.</li>
            <li><strong className="text-white">No dark patterns:</strong> no fake countdowns, no forced signups, no hidden charges.</li>
            <li><strong className="text-white">Made for India:</strong> tools designed around real Indian needs — sarkari form specs, Hindi support, low-bandwidth friendly.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">How We Stay Free</h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            ProTools is supported by non-intrusive advertising and optional Pro features. Ads keep the lights on so the tools stay free for everyone — students, job seekers, and families across India.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Who runs ProTools</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            ProTools is operated by <strong className="text-white">Ravi Pratap Singh (RPS World)</strong>, Kanpur, Uttar Pradesh, India. For any question about the tools, Pro, or refunds, reach us on the <a href="/contact" className="text-[#E3B34B] underline">Contact page</a>.
          </p>
        </section>

        <footer className="text-center text-white/30 text-xs pt-8 border-t border-white/10">
          RPS World • Premium Business Websites
          <br />
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
          <div className="mt-1">
            <PrivacyChoicesLink />
          </div>
        </footer>
      </main>
    </div>
  );
}
