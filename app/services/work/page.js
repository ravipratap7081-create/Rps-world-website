import Link from "next/link";

export const metadata = {
  title: "Sample Builds | RPS World Services",
  description:
    "Website samples — DEMO SAMPLE, paying-client work nahi. Coaching aur business ke liye banaye gaye demo designs.",
  openGraph: {
    title: "Sample Builds | RPS World Services",
    description: "Website samples — DEMO SAMPLE, paying-client work nahi. Coaching aur business ke liye banaye gaye demo designs.",
    url: "https://rps-world-website.onrender.com/services/work",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Sample Builds | RPS World Services", description: "Website samples — DEMO SAMPLE, paying-client work nahi. Coaching aur business ke liye banaye gaye demo designs." },
  alternates: { canonical: "https://rps-world-website.onrender.com/services/work" },
};

const SAMPLES = [
  { name: "GCL — Spoken English Institute (Barra)", href: "/demo-gcl", desc: "Coaching demo: courses, timings, enquiry." },
  { name: "Zavie — Boutique Demo", href: "/demo-zavie", desc: "Boutique demo: collections, contact." },
  { name: "Boutique Demo", href: "/demo-boutique", desc: "Boutique demo: showcase, enquiry." },
  { name: "Ritu — Demo", href: "/demo-ritu", desc: "Makeup studio demo." },
  { name: "Shivaani — Demo", href: "/demo-shivaani", desc: "Makeup studio demo." },
  { name: "AB Films — Demo", href: "/demo-abfilms", desc: "Photography studio demo." },
  { name: "Sonali — Salon Demo", href: "/demo-sonali", desc: "Salon demo: bridal, engagement & party makeup." },
];

export default function ServicesWork() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Sample Builds</h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Ye sab <strong className="text-white">DEMO SAMPLE</strong> hain — kisi paying client ka kaam nahi.
          Asli client work yahan sirf us client ki permission ke baad aayega. Demo dekh kar andaza lagao ki tumhara site kaisa dikhega.
        </p>
        <div className="grid gap-3 mb-8">
          {SAMPLES.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-amber-300 text-xs font-bold mb-1">DEMO SAMPLE</p>
              <h3 className="font-bold text-white mb-1">{s.name}</h3>
              <p className="text-white/60 text-sm mb-2">{s.desc}</p>
              <Link href={s.href} className="text-amber-300 underline text-sm">Demo dekho →</Link>
            </div>
          ))}
        </div>
        <p>
          <Link href="/services" className="text-amber-300 underline text-[15px]">← Services par wapas</Link>
        </p>
        <footer className="text-center text-white/40 text-[11px] pb-10 pt-4">
          <div className="flex justify-center gap-4 mb-2 flex-wrap">
            <a href="/about" className="hover:text-white/70">About</a>
            <a href="/contact" className="hover:text-white/70">Contact</a>
          </div>
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
        </footer>
      </main>
    </div>
  );
}
