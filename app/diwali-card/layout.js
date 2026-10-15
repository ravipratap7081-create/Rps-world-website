const SITE = "https://pro-universe-nine.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Diwali Card Maker — Pro Universe",
  alternateName: "दिवाली कार्ड मेकर",
  url: `${SITE}/diwali-card`,
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "Create a beautiful personalized Diwali greeting card (दिवाली कार्ड) with your name in seconds. 4 premium designs — Royal Diya, Firework Night, Marigold Utsav, Emerald Shubh. Free download, WhatsApp share. No signup needed. शुभ दीपावली!",
  inLanguage: ["en", "hi"],
  keywords:
    "diwali card maker, दिवाली कार्ड, शुभ दीपावली, happy diwali wishes with name, diwali greeting card online free, shubh deepavali card, diwali whatsapp card maker",
  author: { "@type": "Organization", name: "Pro Universe", url: SITE },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "120" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to make a Diwali card with my name online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the Pro Universe Diwali Card Maker, type your name, pick one of 4 premium designs, and download your personalized Diwali card instantly. Share it on WhatsApp in one tap. No signup needed.",
      },
    },
    {
      "@type": "Question",
      name: "दिवाली कार्ड अपने नाम के साथ कैसे बनाएं?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pro Universe Diwali Card Maker खोलें, अपना नाम लिखें, 4 प्रीमियम डिज़ाइनों में से चुनें, और तुरंत अपना दिवाली कार्ड डाउनलोड करें। WhatsApp पर एक टैप में शेयर करें। कोई साइनअप नहीं चाहिए।",
      },
    },
    {
      "@type": "Question",
      name: "Is the Diwali Card Maker really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — 100% free. All 4 templates, unlimited downloads, and WhatsApp sharing cost nothing. No account or signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my Diwali card on WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After creating your card, tap the 'WhatsApp pe Share karo' button to share the card image directly to WhatsApp chats and status.",
      },
    },
  ],
};

export const metadata = {
  title: "Free Diwali Card Maker 🪔 Apne Naam Wala Diwali Card | दिवाली कार्ड",
  description:
    "Create a beautiful personalized Diwali greeting card (दिवाली कार्ड) with your name in seconds. 4 premium designs, free download, WhatsApp share. शुभ दीपावली! No signup needed.",
  keywords:
    "diwali card maker, दिवाली कार्ड, शुभ दीपावली, happy diwali wishes with name, diwali greeting card online free, shubh deepavali card, diwali whatsapp card maker, personalized diwali wishes, deepavali card with name, diwali shubhkamnayein card",
  openGraph: {
    title: "🪔 Free Diwali Card Maker — Apne Naam Wala Card | दिवाली कार्ड",
    description:
      "4 premium designs • Apna naam likho • Free download • WhatsApp share — no signup! शुभ दीपावली 🪔",
    type: "website",
    url: `${SITE}/diwali-card`,
    siteName: "Pro Universe",
    locale: "hi_IN",
    images: [
      {
        url: `${SITE}/og-diwali-card.png`,
        width: 1200,
        height: 630,
        alt: "Free Diwali Card Maker — personalized Diwali greeting cards with your name",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🪔 Free Diwali Card Maker — Apne Naam Wala Card",
    description: "4 premium designs • Free download • WhatsApp share — no signup! शुभ दीपावली",
    images: [`${SITE}/og-diwali-card.png`],
  },
  alternates: {
    canonical: `${SITE}/diwali-card`,
    languages: { "hi-IN": `${SITE}/diwali-card`, "en-IN": `${SITE}/diwali-card` },
  },
  robots: { index: true, follow: true },
};

export default function DiwaliCardLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {children}
    </>
  );
}
