import Link from "next/link";
import WorkGrid from "./WorkGrid";

export const metadata = {
  title: "Sample Builds | RPS World Services",
  description:
    "Website samples — DEMO SAMPLE, paying-client work nahi. Coaching aur business ke liye banaye gaye demo designs.",
  openGraph: {
    title: "Sample Builds | RPS World Services",
    description: "Website samples — DEMO SAMPLE, paying-client work nahi. Coaching aur business ke liye banaye gaye demo designs.",
    url: "https://rpsworld.in/services/work",
    type: "website",
    images: [{ url: "/og-rps-world.png", width: 1200, height: 630, alt: "RPS World — premium business websites, free homepage concept first" }],
  },
  twitter: { card: "summary_large_image", title: "Sample Builds | RPS World Services", description: "Website samples — DEMO SAMPLE, paying-client work nahi. Coaching aur business ke liye banaye gaye demo designs.", images: ["/og-rps-world.png"] },
  alternates: { canonical: "https://rpsworld.in/services/work" },
};

// All 27 demo previews, verified from app/demo-*/ at build time (7 Nov 2026).
// Order: newest first; GCL (closed thread) last. demo-apna-school is
// deliberately EXCLUDED (dropped 5 Nov 2026). Princeinfra was listed 8 Nov
// 2026 and REMOVED the same day (audit: unverified broker, no RERA/address,
// no consent; demo page kept parked for the pitch only).
// Names, cities, industries and descriptions come from each demo's own
// og:title / og:description — nothing invented. Thumbnails are each demo's
// own OG preview image.
const DEMOS = [
  { name: "Khwahish Boutique & Jewellery", city: "Ahmedabad", industry: "Boutique", desc: "Bridal gown rental, festive outfits & jewellery.", href: "/demo-khwahish", thumb: "/og-demo-khwahish.png" },
  { name: "Nandini Kashyap Makeup & Hair Academy", city: "New Delhi", industry: "Salon", desc: "Bridal makeup & professional makeup courses.", href: "/demo-nandini", thumb: "/og-demo-nandini.png" },
  { name: "OM Shanti OM Digital Studio", city: "Jodhpur", industry: "Photography", desc: "Wedding photography & films since 2009.", href: "/demo-omshantiom", thumb: "/og-demo-omshantiom.png" },
  { name: "Seema Sarraf Makeup Artist", city: "Jaipur", industry: "Salon", desc: "Bridal makeup & academy.", href: "/demo-seema", thumb: "/og-demo-seema.png" },
  { name: "Shree Radha Rani Boutique", city: "Surat", industry: "Boutique", desc: "Bridal wear rental.", href: "/demo-radharani", thumb: "/og-demo-radharani.png" },
  { name: "Sana Sarwar Make Up Studio", city: "Kolkata", industry: "Salon", desc: "Bridal makeup & salon.", href: "/demo-sana", thumb: "/og-demo-sana.png" },
  { name: "The Sukoon Cafe", city: "Indore", industry: "Cafe", desc: "Cafe.", href: "/demo-sukoon", thumb: "/og-demo-sukoon.png" },
  { name: "Cafe Cluster", city: "Nashik", industry: "Cafe", desc: "Cafe.", href: "/demo-cafecluster", thumb: "/og-demo-cafecluster.png" },
  { name: "Pearl Blossom", city: "Jaipur", industry: "Salon", desc: "Bridal makeup by Sapna Verma.", href: "/demo-pearl", thumb: "/og-demo-pearl.png" },
  { name: "The Cake Boutique", city: "Ahmedabad", industry: "Cafe", desc: "Custom cakes & midnight delivery.", href: "/demo-cake", thumb: "/og-demo-cake.png" },
  { name: "Dharmi Boutique — The D Room by Dharmi", city: "Surat", industry: "Boutique", desc: "Bridal lehengas, sarees, gowns & festive outfits.", href: "/demo-dharmi", thumb: "/og-demo-dharmi.png" },
  { name: "JMJ Jewellers", city: "Jaipur", industry: "Jewellery", desc: "Gold, diamond & Rajputi jewellery since 1933.", href: "/demo-jmj", thumb: "/og-demo-jmj.png" },
  { name: "Make U Up", city: "Delhi", industry: "Salon", desc: "Bridal makeup studio & academy.", href: "/demo-makeuup", thumb: "/og-demo-makeuup.png" },
  { name: "American School of Language", city: "Kakadeo, Kanpur", industry: "Coaching", desc: "Spoken English institute.", href: "/demo-american-school", thumb: "/og-demo-american-school.png" },
  { name: "GSS English", city: "Parade, Kanpur", industry: "Coaching", desc: "Spoken English, French, German & Spanish.", href: "/demo-gss-english", thumb: "/og-demo-gss-english.png" },
  { name: "British Coaching", city: "Barra 2, Kanpur", industry: "Coaching", desc: "Spoken English & IELTS coaching.", href: "/demo-british-coaching", thumb: "/og-demo-british-coaching.png" },
  { name: "Samuel Overseas Training Institute", city: "Barra 8, Kanpur", industry: "Coaching", desc: "Language & PTE training.", href: "/demo-samuel-overseas", thumb: "/og-demo-samuel-overseas.png" },
  { name: "Velocity Institute", city: "Kakadeo, Kanpur", industry: "Coaching", desc: "NEET / AIIMS / JEE coaching.", href: "/demo-velocity-institute", thumb: "/og-demo-velocity-institute.png" },
  { name: "The Core Fitness", city: "Kakadeo, Kanpur", industry: "Gym", desc: "Gym & fitness centre — group workouts, personal training, MMA.", href: "/demo-core-fitness", thumb: "/og-demo-core-fitness.png" },
  { name: "Silver Scissor Beauty Saloon", city: "Kidwai Nagar, Kanpur", industry: "Salon", desc: "Facial, haircut, hair colour, bridal & party makeup.", href: "/demo-silver-scissor", thumb: "/og-demo-silver-scissor.png" },
  { name: "Sonali Salon", city: "Lal Bangla, Kanpur", industry: "Salon", desc: "Bridal, engagement & party makeup.", href: "/demo-sonali", thumb: "/og-demo-sonali.png" },
  { name: "Zavie Couture", city: "", industry: "Boutique", desc: "Bridal & festive collection — sarees, lehengas, suits.", href: "/demo-zavie", thumb: "/og-demo-zavie.png" },
  { name: "Saanvi Boutique", city: "Swaroop Nagar, Kanpur", industry: "Boutique", desc: "Saree, suit & lehenga collection + stitching service.", href: "/demo-boutique", thumb: "/demo-boutique/og-boutique.jpg" },
  { name: "Ritu Makeup Studio", city: "Naubasta, Kanpur", industry: "Salon", desc: "Bridal, party & engagement makeup.", href: "/demo-ritu", thumb: "/og-demo-ritu.png" },
  { name: "Shivaani Artistry", city: "Kanpur / Lucknow", industry: "Salon", desc: "Bridal & engagement makeup studio & academy.", href: "/demo-shivaani", thumb: "/og-demo-shivaani.png" },
  { name: "AB Films", city: "Kanpur", industry: "Photography", desc: "Luxury wedding films & photography.", href: "/demo-abfilms", thumb: "/og-demo-abfilms.png" },
  { name: "GCL — Spoken English Institute", city: "Barra, Kanpur", industry: "Coaching", desc: "Spoken English & personality development.", href: "/demo-gcl", thumb: "/og-demo-gcl.png" },
];

export default function ServicesWork() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0A0616] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="mix-h text-[34px] leading-tight mb-4">Our Work</h1>
        <p className="mb-6 rounded-[18px_6px_18px_6px] border border-[#E3B34B]/30 bg-[#E3B34B]/[0.06] p-4 text-white/70 text-[15px] leading-relaxed">
          Ye sab DEMO SAMPLE hain — kisi paying client ka kaam nahi. Asli client work yahan sirf us client ki permission ke baad aayega. Demo dekh kar andaza lagao ki tumhara site kaisa dikhega.
        </p>
        <WorkGrid demos={DEMOS} />
        <p>
          <Link href="/services" className="text-[#E3B34B] underline text-[15px]">← Services par wapas</Link>
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
