import HomeClient from "./HomeClient";
import ExamToolsSection from "../components/ExamToolsSection";

export const metadata = {
  title: "RPS World — Websites & Promotional Reels in Kanpur | ProTools",
  description: "Mobile-first websites & promotional reels for Kanpur businesses—cafés, salons, boutiques, jewellers & gyms. Get a free homepage concept before you pay.",
  openGraph: {
    title: "RPS World — Websites & Promotional Reels in Kanpur | ProTools",
    description: "Mobile-first websites & promotional reels for Kanpur businesses—cafés, salons, boutiques, jewellers & gyms. Get a free homepage concept before you pay.",
    url: "https://rpsworld.in/",
    type: "website",
    images: [{ url: "/og-rps-world.png", width: 1200, height: 630 }],
    videos: [{ url: "https://rpsworld.in/rps-world-promo.mp4", secureUrl: "https://rpsworld.in/rps-world-promo.mp4", type: "video/mp4", width: 1280, height: 720 }],
  },
  twitter: { card: "summary_large_image", title: "RPS World — Websites & Promotional Reels in Kanpur | ProTools", description: "Mobile-first websites & promotional reels for Kanpur businesses—cafés, salons, boutiques, jewellers & gyms. Get a free homepage concept before you pay." },
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
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"ProfessionalService","name":"RPS World","url":"https://rpsworld.in","logo":"https://rpsworld.in/favicon.png","image":"https://rpsworld.in/og-rps-world.png","description":"Mobile-first website design and promotional video reel creation agency for local businesses in Kanpur, including cafés, salons, boutiques, jewellers, gyms, and coaching institutes.","founder":{"@type":"Person","name":"Ravi Pratap Singh"},"telephone":"+91-9235039317","priceRange":"₹₹","address":{"@type":"PostalAddress","addressLocality":"Kanpur","addressRegion":"Uttar Pradesh","postalCode":"208025","addressCountry":"IN"},"areaServed":{"@type":"City","name":"Kanpur"},"contactPoint":{"@type":"ContactPoint","telephone":"+91-9235039317","contactType":"sales","availableLanguage":["Hindi","English"]},"sameAs":["https://wa.me/919235039317","https://www.instagram.com/its.ravipratap_/"],"hasOfferCatalog":{"@type":"OfferCatalog","name":"Digital Services for Local Businesses","itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"Mobile-First Website Design & Development","description":"Custom, fast-loading websites for cafés, salons, jewellers, boutiques, and coaching institutes in Kanpur with a free homepage concept preview."}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Promotional Food & Brand Reels","description":"Short-form promotional video reels tailored for restaurants, cafés, and local retail brands in Kanpur."}}]}}`}</script>
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

      <video
        src="/rps-world-promo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="mt-6 w-full rounded-2xl"
      />

      <ExamToolsSection />
        <HomeClient />
      </div>
    </main>
  );
}
