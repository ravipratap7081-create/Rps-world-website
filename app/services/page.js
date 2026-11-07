import Link from "next/link";

export const metadata = {
  title: "Website Development Services | RPS World",
  description:
    "Business ke liye fast, clear aur mobile-friendly websites — Kanpur se duniya tak. Demo pehle, payment baad me. Lean, Standard aur Premium packages.",
  openGraph: {
    title: "Website Development Services | RPS World",
    description: "Business ke liye fast, clear aur mobile-friendly websites — Kanpur se duniya tak. Demo pehle, payment baad me. Lean, Standard aur Premium packages.",
    url: "https://rps-world-website.onrender.com/services",
    type: "website",
    images: [{ url: "/og-rps-world.png", width: 1200, height: 630, alt: "RPS World — premium business websites, free homepage concept first" }],
  },
  twitter: { card: "summary_large_image", title: "Website Development Services | RPS World", description: "Business ke liye fast, clear aur mobile-friendly websites — Kanpur se duniya tak. Demo pehle, payment baad me. Lean, Standard aur Premium packages.", images: ["/og-rps-world.png"] },
  alternates: { canonical: "https://rps-world-website.onrender.com/services" },
};

const SERVICES = [
  { name: "Lean Website", desc: "5 pages tak — courses, timings, contact, maps, WhatsApp enquiry ke saath. Chhote business ke liye seedha aur tez.", price: "India: ₹18,000–₹25,000" },
  { name: "Standard Website", desc: "10 pages tak — poora business site: services, gallery, enquiry form, basic on-page SEO.", price: "India: ₹30,000–₹45,000" },
  { name: "Premium / Complex Website", desc: "Custom design, zyada pages ya special features — scope par quote.", price: "India: ₹45,000–₹60,000+" },
  { name: "App Development (Phase 2)", desc: "Abhi booking ke liye uplabdh nahi hai — website proof ke baad Phase 2 me aayega, tab scope par quote aur escrow par hi kaam hoga.", price: "Quote on scope" },
];

const STEPS = [
  { t: "1. Demo dekho", d: "Pehle sample builds dekho — koi payment nahi, koi commitment nahi." },
  { t: "2. Scope + advance", d: "Written scope tay hoga, phir 50% advance. Bina advance ke kaam shuru nahi hota." },
  { t: "3. Build + staging", d: "7–10 working days (complete content/assets/access aur 50% advance cleared hone ke baad). Staging par review aur approval." },
  { t: "4. Delivery + support", d: "Staging par agreed scope ke mutabik review — advance cleared hone ke baad staging dikhaya jayega, aur staging dikhane ke baad client ke paas 3 working days hain approval ya changes-list dene ke liye. Deadline se pehle ek reminder bheja jayega; phir bhi jawab na aaye to staging approved mana jayega. Approval ke baad, baaki 50% payment clear hone par, source + handover milega, 30 din free support." },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Website Development Services</h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-3">
          Kanpur se duniya tak — business ke liye <strong className="text-white">fast, clear aur mobile-friendly websites.</strong>
        </p>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Pehle existing DEMO SAMPLE dekhein — bina payment ya commitment ke. Custom project ka kaam written scope approval aur 50% advance ke baad shuru hoga. Koi rank guarantee nahi, koi chhupa kharcha nahi — jo scope likha hoga, wahi banega.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Free demo — iska matlab kya hai</h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Free demo matlab aapke business ke liye ek limited homepage VISUAL
            concept — qualification ke baad. Poori coded website, hosting,
            deployment, source code ya unlimited revisions nahi.
          </p>
        </section>

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
            Domain, hosting aur unke renewals client ke naam aur client ke account par honge; cost alag se hogi. Paid third-party services/licences bhi alag se charge honge, jab tak written quote me included na hon. Final project price written quote me hoga.
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
            India ke packages upar diye hain. Global packages (platform escrow): Lean $349 se (5 pages tak), Standard $499 (10 pages tak), Premium $749 (scope written quote par). India prices GST-exclusive hain. GST, agar kanoonan applicable ho, final written quote aur invoice me alag se dikhaya jayega.
          </p>
          <Link href="/services/pricing" className="text-amber-300 underline text-[15px]">Poori pricing dekho →</Link>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Sawaal-jawaab</h2>
          <div className="grid gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-1">Kitne din me milegi?</h3>
              <p className="text-white/60 text-sm">7–10 working days — complete content/assets/access aur 50% advance cleared hone ke baad.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-1">Payment kaise?</h3>
              <p className="text-white/60 text-sm">50% advance, 50% delivery par; staging par review aur approval ke baad handover.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-1">Revision kitni?</h3>
              <p className="text-white/60 text-sm">2 revision rounds included. Har round me ek consolidated changes list. Dono rounds ke baad ke changes alag se quote honge.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-1">Free demo me kya milega?</h3>
              <p className="text-white/60 text-sm">Free demo matlab aapke business ke liye ek limited homepage VISUAL concept — qualification ke baad. Poori coded website, hosting, deployment, source code ya unlimited revisions nahi.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-1">Domain/hosting kiska hoga?</h3>
              <p className="text-white/60 text-sm">Client ke naam aur client ke account par; cost alag se hogi.</p>
            </div>
          </div>
        </section>

        <a href="https://wa.me/919235039317?text=Namaste%2C%20mujhe%20website%20banwana%20hai.%20Business%20type%3A%20%20Business%20name%3A%20%20Pages%20chahiye%3A%20%20Content%20taiyaar%20hai%3A%20Haan%2FNahi%20%20Contact%20person%20ka%20naam%3A%20" className="inline-block rounded-xl px-6 py-3 font-bold bg-amber-400 text-black">
          💬 WhatsApp par baat karo →
        </a>
        <p className="mt-3">
          <Link href="/services/contact" className="text-amber-300 underline text-[15px]">WhatsApp par enquiry ka tareeka dekho →</Link>
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
