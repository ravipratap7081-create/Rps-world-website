import Link from "next/link";

export const metadata = {
  title: "Pricing | RPS World Services",
  description:
    "Website pricing — India packages aur global starting prices. 50% advance, 50% delivery milestone par. Domain/hosting client ke naam, alag se.",
  openGraph: {
    title: "Pricing | RPS World Services",
    description: "Website pricing — India packages aur global starting prices. 50% advance, 50% delivery milestone par. Domain/hosting client ke naam, alag se.",
    url: "https://rps-world-website.onrender.com/services/pricing",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Pricing | RPS World Services", description: "Website pricing — India packages aur global starting prices. 50% advance, 50% delivery milestone par. Domain/hosting client ke naam, alag se." },
  alternates: { canonical: "https://rps-world-website.onrender.com/services/pricing" },
};

const INDIA = [
  { name: "Lean Website (≤5 pages)", price: "₹18,000–₹25,000", desc: "Chhote business ke liye: courses/timings/contact/maps/WhatsApp enquiry, basic on-page SEO (agreed page titles/meta descriptions, sitemap generation, Search Console setup/verification, agreed pages ke liye basic schema markup)." },
  { name: "Standard Website (≤10 pages)", price: "₹30,000–₹45,000", desc: "Poora business site: services, gallery, enquiry form, basic on-page SEO (agreed page titles/meta descriptions, sitemap generation, Search Console setup/verification, agreed pages ke liye basic schema markup)." },
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
          <p className="text-white/50 text-sm mt-3">App development (Phase 2): scope par quote, escrow par hi kaam. Global website packages (platform escrow): Lean — $349 se, 5 agreed pages tak; Standard — $499, 10 agreed pages tak; Premium — $749, scope written quote ke hisaab se.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Payment terms</h2>
          <ul className="text-white/70 text-[15px] leading-relaxed space-y-2 list-disc pl-5">
            <li><strong className="text-white">50% advance</strong> — written scope ke baad, kaam shuru karne se pehle.</li>
            <li><strong className="text-white">50% delivery milestone par</strong> — agreed delivery par, handover se pehle. Advance cleared hone ke baad staging dikhaya jayega; staging dikhane ke baad client ke paas 3 working days hain approval ya changes-list dene ke liye. Deadline se pehle ek reminder bheja jayega; phir bhi jawab na aaye to staging approved mana jayega aur baaki 50% due ho jayega.</li>
            <li><strong className="text-white">2 revision rounds</strong> included. Har round me client ek consolidated changes list dega. Dono rounds ke baad ke changes alag se quote honge.</li>
            <li><strong className="text-white">GST:</strong> India prices GST-exclusive hain. GST, agar kanoonan applicable ho, final written quote aur invoice me alag se dikhaya jayega.</li>
            <li><strong className="text-white">Refund:</strong> Project work shuru hone se pehle cancellation par 50% advance ka poora refund milega. Project work shuru hone ka matlab hai written scope approval + 50% advance clear hona. Project work shuru hone ke baad refund nahi milega. Scope badalne par revised scope aur charges dono taraf ki likhit sehmati ke baad hi adjust honge. Agar hum hi deliver na kar payein to advance poora refund hoga.</li>
            <li><strong className="text-white">Support:</strong> WhatsApp par milega, pehla jawab 24 hours ke andar. Launch ke baad 30 din tak agreed scope ke andar delivery defects ki corrections aur handover-related sawaal included hain. Naye features, pages aur scope changes alag quote honge.</li>
            <li><strong className="text-white">Ownership:</strong> poora payment milne ke baad website aur uska source code client ka hoga; hum use portfolio me sirf client ki permission se dikhayenge. Reusable components/templates aur third-party licences ki ownership alag se written scope me clarify ki jayegi.</li>
            <li><strong className="text-white">Domain/hosting:</strong> domain/hosting aur renewals client ke naam aur client ke account par; paid third-party services/licences alag se, jab tak written quote me included na hon.</li>
            <li><strong className="text-white">Koi rank guarantee nahi.</strong> SEO ka matlab checklist aur setup hai, position ka vaada nahi.</li>
          </ul>
        </section>

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
