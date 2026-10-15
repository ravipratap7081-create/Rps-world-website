const SITE = "https://golden-elf-11f395.netlify.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Diwali Business Promo Pack | Pro Universe",
  url: `${SITE}/diwali-business-kit`,
  description:
    "Ready-to-use Diwali promotional pack for small businesses: 12 festive creatives + 34 marketing texts. Instant download. ₹149.",
  brand: { "@type": "Brand", name: "Pro Universe" },
  offers: {
    "@type": "Offer",
    name: "Diwali Business Promo Pack",
    price: "149",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    description: "12 festive creatives + 34 marketing texts. Instant download after payment.",
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
        text: "12 festive creatives (PNG) + 34 marketing texts. Posts are 1080×1080 px, Stories are 1080×1920 px — ready to post on Instagram, WhatsApp & Facebook.",
      },
    },
    {
      "@type": "Question",
      name: "How do I receive the files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instant download! After successful payment via Cashfree, you'll see the download link immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Commercial usage rights included. Use for your shop, salon, cafe — anywhere!",
      },
    },
  ],
};

export const metadata = {
  title: "Diwali Business Promo Pack 🪔 12 Creatives + 34 Texts for ₹149 | Pro Universe",
  description:
    "Ready-to-use Diwali promotional pack for small businesses — 12 festive creatives + 34 marketing texts. Instant download for just ₹149!",
  keywords:
    "diwali business promotion, diwali poster pack, diwali marketing creatives, festive business templates, diwali promo pack india",
  openGraph: {
    title: "Diwali Business Promo Pack 🪔 12 Creatives + 34 Texts | Pro Universe",
    description:
      "Ready-to-use Diwali designs for your business. 12 creatives + 34 texts for just ₹149. Instant download!",
    url: `${SITE}/diwali-business-kit`,
    siteName: "Pro Universe",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwali Business Promo Pack 🪔 | Pro Universe",
    description:
      "12 festive creatives + 34 marketing texts for ₹149. Instant download!",
  },
  alternates: { canonical: `${SITE}/diwali-business-kit` },
};

export default function DiwaliBusinessKitLayout({ children }) {
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
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '4117280245079425');fbq('track', 'PageView');fbq('track', 'ViewContent', {content_name: 'Diwali Business Promo Pack', content_category: 'Digital Product', value: 149, currency: 'INR'});`,
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
