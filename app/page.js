import HomeClient from "./HomeClient";
import ExamToolsSection from "../components/ExamToolsSection";

export const metadata = {
  title: "RPS World — Websites for Small Businesses, Kanpur | ProTools",
  description: "RPS World, Kanpur — premium, mobile-first websites for small businesses: boutiques, salons, jewellers, cafes & gyms. Free homepage concept pehle. Plus ProTools — free photo resizer, PDF compressor & sarkari tools, bina signup.",
  openGraph: {
    title: "RPS World — Websites for Small Businesses, Kanpur | ProTools",
    description: "RPS World, Kanpur — premium, mobile-first websites for small businesses: boutiques, salons, jewellers, cafes & gyms. Free homepage concept pehle. Plus ProTools — free photo resizer, PDF compressor & sarkari tools, bina signup.",
    url: "https://rpsworld.in/",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "RPS World — Websites for Small Businesses, Kanpur | ProTools", description: "RPS World, Kanpur — premium, mobile-first websites for small businesses: boutiques, salons, jewellers, cafes & gyms. Free homepage concept pehle. Plus ProTools — free photo resizer, PDF compressor & sarkari tools, bina signup." },
  alternates: { canonical: "https://rpsworld.in/" },
};

// Home page — hero + ExamToolsSection are Server Components, so crawlers
// see real content in the initial HTML. (Before this, the whole homepage
// was HomeClient, which renders only a loading pulse server-side until
// useEffect reads localStorage["pro-mode"] — zero content for crawlers.)
// The hero JSX is moved here verbatim from HomeClient; HomeClient below
// still owns the tools grid, mode picker and footer, and its pro-mode
// redirect behaviour is unchanged.
export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[28px] font-extrabold text-white leading-tight">
          RPS World — Websites for Small Businesses, Kanpur
        </h1>
        <p className="text-[15px] text-amber-300/90 mt-2 font-semibold">
          ProTools — free photo resizer, PDF compressor &amp; Sarkari Tools
        </p>
        <p className="text-[15px] text-white/70 mt-2 leading-relaxed">
          Photo ko KB size me karo, PDF compress karo, exam form ke liye photo
          aur signature ready karo — bina login, bina signup. File sirf aapke
          browser me process hoti hai, koi server upload nahi. Pehla result
          free hai; Pro (₹149/month) sirf badi file limits ke liye hai.
        </p>

        <a
          href="/services"
          className="relative mt-6 block overflow-hidden rounded-[18px_6px_18px_6px] border border-[#E3B34B]/40 bg-gradient-to-br from-[#E3B34B]/15 to-transparent p-4"
        >
          <span
            aria-hidden="true"
            className="mix-orbital -right-10 -top-16 h-40 w-40"
          />
          <span
            aria-hidden="true"
            className="mix-orbital -right-4 -top-10 h-24 w-24"
          />
          <p className="mix-h relative text-[17px] leading-relaxed text-white">
            Business website chahiye? RPS World — premium, mobile-first
            websites for boutiques, salons, jewellers, cafes &amp; gyms. Free
            homepage concept pehle — pasand aaye tabhi payment.
          </p>
          <span className="mix-btn mix-btn--sm relative mt-3">
            Apni website dekho →
          </span>
        </a>

        <ExamToolsSection />
        <HomeClient />
      </div>
    </main>
  );
}
