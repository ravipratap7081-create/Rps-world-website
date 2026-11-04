import Link from "next/link";

export const metadata = {
  title: "Website & App Development Services | RPS World",
  description:
    "Business ke liye fast, clear aur mobile-friendly websites — Kanpur se duniya tak. Demo pehle, payment baad me. Lean, Standard aur Premium packages.",
  alternates: { canonical: "https://rps-world-website.onrender.com/services" },
};

const SERVICES = [
  { name: "Lean Website", desc: "5 pages tak — courses, timings, contact, maps, WhatsApp enquiry ke saath. Chhote business ke liye seedha aur tez.", price: "India: ₹18,000–₹25,000 se shuru" },
  { name: "Standard Website", desc: "10 pages tak — poora business site: services, gallery, enquiry form, basic on-page SEO.", price: "India: ₹30,000–₹45,000 se shuru" },
  { name: "Premium / Complex Website", desc: "Custom design, zyada pages ya special features — scope par quote.", price: "India: ₹45,000–₹60,000+ se shuru" },
  { name: "App Development", desc: "Website proof ke baad ka Phase 2 — scope par quote, escrow par hi kaam.", price: "Quote on scope" },
];

const STEPS = [
  { t: "1. Demo dekho", d: "Pehle sample builds dekho — koi payment nahi, koi commitment nahi." },
  { t: "2. Scope + advance", d: "Written scope tay hoga, phir 50% advance. Bina advance ke kaam shuru nahi hota." },
  { t: "3. Build + staging", d: "7–10 working days (poora content milne ke baad). Staging par dikhaya jayega, 2 revision rounds." },
  { t: "4. Delivery + support", d: "Baaki 50% agreed delivery milestone par. Source + handover milega, 30 din free support." },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Website &amp; App Development Services</h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-3">
          Kanpur se duniya tak — business ke liye <strong className="text-white">fast, clear aur mobile-friendly websites.</strong>
        </p>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Demo pehle, payment baad me. Koi rank guarantee nahi, koi chhupa kharcha nahi — jo scope likha hoga, wahi banega.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Services</h2>
          <div className="grid gap-3">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">{s.name}</h3>
                <p className="text-white/60 text-sm mb-2">{s.desc}</p>
                <p className="text-amber-300 text-sm font-bold">{s.price}</p>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-3">
            Domain aur hosting client ke naam par, alag se — kabhi hamare naam par nahi. Final price written quote me hoga.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">How We Deliver</h2>
          <div className="grid gap-3">
            {STEPS.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">{s.t}</h3>
                <p className="text-white/60 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Sample Builds</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            Neeche wale samples hain — <strong className="text-white">DEMO SAMPLE, paying-client work nahi.</strong> Asli client work permission ke baad hi yahan aayega.
          </p>
          <Link href="/services/work" className="text-amber-300 underline text-[15px]">Sample builds dekho →</Link>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Pricing</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-3">
            India ke packages upar diye hain. Global packages starting at $349 (Lean), $499 (Standard), $749 (Premium) — platform escrow par.
          </p>
          <Link href="/services/pricing" className="text-amber-300 underline text-[15px]">Poori pricing dekho →</Link>
        </section>

        <a href="https://wa.me/919235039317" className="inline-block rounded-xl px-6 py-3 font-bold bg-amber-400 text-black">
          💬 WhatsApp par baat karo →
        </a>
        <p className="mt-3">
          <Link href="/services/contact" className="text-amber-300 underline text-[15px]">Enquiry form ka tareeka dekho →</Link>
        </p>
      </main>
    </div>
  );
}
