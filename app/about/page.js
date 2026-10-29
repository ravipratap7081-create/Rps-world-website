export const metadata = {
  title: "About Us | ProTools",
  description: "About ProTools — free, high-quality online tools for students, job seekers, and everyday India. No signup needed for basic tools.",
  alternates: { canonical: "https://rps-world-website.onrender.com/about" },
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
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">About ProTools</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Our Mission</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            ProTools exists for one simple reason: <strong className="text-white">everyday digital tasks in India should be free, fast, and frustration-free.</strong>
          </p>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            Filling a government form and stuck because your photo is 247KB but the portal demands exactly 20KB? Need to compress a PDF to 100KB for an upload? Looking for which government scheme you actually qualify for? ProTools solves these real problems in seconds — right in your browser, no downloads, no watermarks on basic tools, no forced signups.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">What We Offer</h2>
          <div className="grid gap-3">
            {TOOLS.map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">{t.name}</h3>
                <p className="text-white/60 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Our Principles</h2>
          <ul className="text-white/70 text-[15px] leading-relaxed space-y-2 list-disc pl-5">
            <li><strong className="text-white">Free-first:</strong> core tools are free forever. No paywalls on basic utilities.</li>
            <li><strong className="text-white">Privacy-respecting:</strong> file processing happens in your browser whenever possible. Your documents stay yours.</li>
            <li><strong className="text-white">No dark patterns:</strong> no fake countdowns, no forced signups, no hidden charges.</li>
            <li><strong className="text-white">Made for India:</strong> tools designed around real Indian needs — sarkari form specs, Hindi support, low-bandwidth friendly.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">How We Stay Free</h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            ProTools is supported by non-intrusive advertising and optional Pro features. Ads keep the lights on so the tools stay free for everyone — students, job seekers, and families across India.
          </p>
        </section>

        <footer className="text-center text-white/30 text-xs pt-8 border-t border-white/10">
          ProTools • All Work, One App
        </footer>
      </main>
    </div>
  );
}
