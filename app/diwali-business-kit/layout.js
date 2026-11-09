const SITE = "https://rps-world-website.onrender.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Business Promo Pack | ProTools",
  url: `${SITE}/diwali-business-kit`,
  description:
    "Ready-to-use business promotional pack for small businesses: 12 promo creatives + 34 marketing texts. Digital delivery after payment. ₹149.",
  brand: { "@type": "Brand", name: "ProTools" },
  offers: {
    "@type": "Offer",
    name: "Business Promo Pack",
    price: "149",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    description: "12 promo creatives + 34 marketing texts. Digital delivery after payment.",
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's included in the pack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "12 promo creatives (PNG) + 34 marketing texts. Posts are 1080×1080 px, Stories are 1080×1920 px — ready to post on Instagram, WhatsApp & Facebook.",
      },
    },
    {
      "@type": "Question",
      name: "How do I receive the files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Digital delivery! After successful payment via Instamojo, you'll see the download link on the confirmation page and via email. Link valid 24 hours — download & save your files immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Use them for your shop, salon, cafe — anywhere for your own business promotions.",
      },
    },
  ],
};

export const metadata = {
  title: "Business Promo Pack 🛍️ 12 Creatives + 34 Texts for ₹149 | ProTools",
  description:
    "Ready-to-use business promotional pack for small businesses — 12 promo creatives + 34 marketing texts. Digital delivery after payment for just ₹149!",
  keywords:
    "business promotion, poster pack, marketing creatives, business templates, promo pack india",
  openGraph: {
    title: "Business Promo Pack 🛍️ 12 Creatives + 34 Texts | ProTools",
    description:
      "Ready-to-use promo designs for your business. 12 creatives + 34 texts for just ₹149. Digital delivery after payment!",
    url: `${SITE}/diwali-business-kit`,
    siteName: "ProTools",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE}/og-diwali-card.png`,
        width: 1200,
        height: 630,
        alt: "Business Promo Pack — ₹149",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Promo Pack 🛍️ | ProTools",
    description:
      "12 promo creatives + 34 marketing texts for ₹149. Digital delivery after payment!",
  },
  alternates: { canonical: `${SITE}/diwali-business-kit` },
};

export default function BusinessPromoPackLayout({ children }) {
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
      {/* Meta Pixel Code */}
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '4117280245079425');fbq('track', 'PageView');fbq('track', 'ViewContent', {content_name: 'Business Promo Pack', content_category: 'Digital Product', value: 149, currency: 'INR'});`,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=4117280245079425&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}
      {children}
    </>
  );
}
