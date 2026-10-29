const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Diwali Offer Maker — Free Poster Maker | ProTools",
  description:
    "Apni dukaan ka naam + offer likho — Diwali poster taiyaar, bilkul FREE. Create a free Diwali offer poster for your shop in seconds. No signup needed.",
  keywords:
    "diwali offer maker, diwali poster maker free, diwali sale poster, dukaan diwali offer poster, diwali dhamaka poster maker online",
  openGraph: {
    title: "Diwali Offer Maker — Free Poster Maker | ProTools",
    description:
      "Apni dukaan ka naam + offer likho — Diwali poster taiyaar, bilkul FREE. No signup needed.",
    type: "website",
    url: `${SITE}/diwali-offer-maker`,
    siteName: "ProTools",
    locale: "hi_IN",
    images: [
      {
        url: `${SITE}/og-diwali-card.png`,
        width: 1200,
        height: 630,
        alt: "Diwali Offer Maker — Free Poster Maker | ProTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwali Offer Maker — Free Poster Maker | ProTools",
    description:
      "Apni dukaan ka naam + offer likho — Diwali poster taiyaar, bilkul FREE.",
    images: [`${SITE}/og-diwali-card.png`],
  },
  alternates: { canonical: `${SITE}/diwali-offer-maker` },
  robots: { index: true, follow: true },
};

export default function DiwaliOfferMakerLayout({ children }) {
  return <>{children}</>;
}
