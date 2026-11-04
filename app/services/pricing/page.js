import Link from "next/link";

export const metadata = {
  title: "Pricing | RPS World Services",
  description:
    "Website pricing — India packages aur global starting prices. 50% advance, 50% delivery milestone par. Domain/hosting client ke naam, alag se.",
  alternates: { canonical: "https://rps-world-website.onrender.com/services/pricing" },
};

const INDIA = [
  { name: "Lean Website (≤5 pages)", price: "₹18,000–₹25,000", desc: "Chhote business ke liye: courses/timings/contact/maps/WhatsApp enquiry, basic on-page SEO." },
  { name: "Standard Website (≤10 pages)", price: "₹30,000–₹45,000", desc: "Poora business site: services, gallery, enquiry form, basic on-page SEO." },
  { name: "Premium / Complex", price: "₹45,000–₹60,000+", desc: "Custom design, zyada pages ya special features — final price written quote me." },
];

const GLOBAL = [
  { name: "Lean (≤5 pages)", price: "Starting at $349" },
  { name: "Standard (≤10 pages)", price: "Starting at $499" },
  { name: "Premium", price: "Starting at $749" },
];

export default function ServicesPricing() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Pricing</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">India</h2>
          <div className="grid gap-3">
            {INDIA.map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">{p.name}</h3>
                <p className="text-amber-300 text-sm font-bold mb-2">{p.price}</p>
                <p className="text-white/60 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Global (platform escrow par)</h2>
          <div className="grid gap-3">
            {GLOBAL.map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-1">{p.name}</h3>
                <p className="text-amber-300 text-sm font-bold">{p.price}</p>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-3">App development: scope par quote, escrow par hi kaam.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Payment terms</h2>
          <ul className="text-white/70 text-[15px] leading-relaxed space-y-2 list-disc pl-5">
            <li><strong className="text-white">50% advance</strong> — written scope ke baad, kaam shuru karne se pehle.</li>
            <li><strong className="text-white">50% delivery milestone par</strong> — agreed delivery par, handover se pehle.</li>
            <li><strong className="text-white">2 revision rounds</strong> included. Uske baad ke changes alag scope me.</li>
            <li><strong className="text-white">30 din free support</strong> launch ke baad.</li>
            <li><strong className="text-white">Domain/hosting client ke naam</strong> par, alag se — renewal client ka.</li>
            <li><strong className="text-white">Koi rank guarantee nahi.</strong> SEO ka matlab checklist aur setup hai, position ka vaada nahi.</li>
          </ul>
        </section>

        <p>
          <Link href="/services" className="text-amber-300 underline text-[15px]">← Services par wapas</Link>
        </p>
      </main>
    </div>
  );
}
