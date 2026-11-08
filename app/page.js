import HomeClient from "./HomeClient";

export const metadata = {
  title: "RPS World — Websites for Small Businesses, Kanpur | ProTools",
  description: "RPS World, Kanpur — premium, mobile-first websites for small businesses: boutiques, salons, jewellers, cafes & gyms. Free homepage concept pehle. Plus ProTools — free photo resizer, PDF compressor & sarkari tools, bina signup.",
  openGraph: {
    title: "RPS World — Websites for Small Businesses, Kanpur | ProTools",
    description: "RPS World, Kanpur — premium, mobile-first websites for small businesses: boutiques, salons, jewellers, cafes & gyms. Free homepage concept pehle. Plus ProTools — free photo resizer, PDF compressor & sarkari tools, bina signup.",
    url: "https://rps-world-website.onrender.com/",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "RPS World — Websites for Small Businesses, Kanpur | ProTools", description: "RPS World, Kanpur — premium, mobile-first websites for small businesses: boutiques, salons, jewellers, cafes & gyms. Free homepage concept pehle. Plus ProTools — free photo resizer, PDF compressor & sarkari tools, bina signup." },
  alternates: { canonical: "https://rps-world-website.onrender.com/" },
};

export default function Home() {
  return <HomeClient />;
}
