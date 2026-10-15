"use client";
import ModeShell from "../../components/ModeShell";
import { PageHeader, PremiumCard, SectionLabel } from "../../components/Premium";

const PAYMENT_FORM_URL = "https://payments.cashfree.com/forms/diwali-promo-pack";

const PACKAGES = [
  {
    id: "diwali-pack",
    name: "Diwali Business Promo Pack",
    price: 149,
    tagline: "Ready-to-use festive designs for your business",
    popular: true,
    features: [
      "12 festive creatives (posters + stories)",
      "34 ready-to-use marketing texts",
      "PNG files, 1080×1080 (post) & 1080×1920 (story)",
      "Instant download after payment",
      "Use for Instagram, WhatsApp & Facebook",
      "Commercial usage rights included",
    ],
  },
];

const SAMPLES = [
  {
    title: "Festive Offer Poster",
    desc: "Bold Diwali offer layout with diyas & gold accents",
    image: "/diwali-preview-1.png",
  },
  {
    title: "Instagram Post Creative",
    desc: "Eye-catching post design for sales & announcements",
    image: "/diwali-preview-2.png",
  },
  {
    title: "WhatsApp Story Design",
    desc: "Vertical story creative your customers will share",
    image: "/diwali-preview-3.png",
  },
];

export default function DiwaliBusinessKitPage() {
  return (
    <ModeShell mode="sarkari">
      <div className="max-w-md mx-auto pb-12">
        <PageHeader
          title="🪔 Diwali Business Kit"
          subtitle="Ready-to-use festive designs for YOUR business — 12 creatives + 34 texts"
        />

        {/* Hero */}
        <PremiumCard className="p-5 mb-4 text-center" accent="gold">
          <div className="text-5xl mb-3">🏪✨</div>
          <h2 className="text-xl font-extrabold text-white mb-2">
            This Diwali, make your business <span className="text-gold">shine</span>
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Get 12 ready-to-use festive creatives + 34 marketing texts for your
            business — post on Instagram, WhatsApp &amp; everywhere.
            <strong className="text-white"> Instant download!</strong>
          </p>
        </PremiumCard>

        {/* Sample mockups */}
        <SectionLabel>Sample designs — actual pack previews</SectionLabel>
        <div className="grid grid-cols-1 gap-3 mb-6">
          {SAMPLES.map((s) => (
            <div
              key={s.title}
              className="relative rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-widest z-10">
                PREVIEW
              </div>
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="p-4 bg-black/40">
                <p className="text-white font-bold text-[15px]">{s.title}</p>
                <p className="text-white/70 text-[12px] mt-1">{s.desc}</p>
                <p className="text-white/50 text-[11px] mt-2 italic">
                  Actual design from the ₹149 pack — 12 creatives + 34 marketing texts included
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Packages */}
        <SectionLabel>Choose your package</SectionLabel>
        <div className="flex flex-col gap-4 mb-6">
          {PACKAGES.map((p) => (
            <PremiumCard
              key={p.id}
              accent={p.popular ? "gold" : undefined}
              className={`p-5 ${p.popular ? "ring-2 ring-gold/60" : ""}`}
            >
              {p.popular && (
                <div className="text-center mb-2">
                  <span className="bg-gold text-black text-[11px] font-extrabold px-3 py-1 rounded-full tracking-wide">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-lg font-extrabold text-white">{p.name}</h3>
                <p className="text-2xl font-extrabold text-gold">₹{p.price}</p>
              </div>
              <p className="text-white/60 text-[12px] mb-3">{p.tagline}</p>
              <ul className="space-y-2 mb-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="text-gold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={PAYMENT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'InitiateCheckout', {value: 149, currency: 'INR', content_name: 'Diwali Business Promo Pack'}); }}
                className="pu-btn-primary pu-press w-full py-3 text-[15px] inline-flex items-center justify-center gap-2"
              >
                <span>💳</span> Pay ₹{p.price} Now
              </a>
            </PremiumCard>
          ))}
        </div>

        {/* How it works */}
        <SectionLabel>How it works</SectionLabel>
        <PremiumCard className="p-5 mb-6">
          <ol className="space-y-3">
            {[
              ["1", "Pay ₹149", "Tap Pay Now — secure checkout via Cashfree (UPI, cards, netbanking)."],
              ["2", "Get download link", "After successful payment, you'll see the download link instantly."],
              ["3", "Use the designs", "12 creatives + 34 texts — post on Instagram, WhatsApp & Facebook!"],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-gold/20 text-gold font-extrabold text-[13px] flex items-center justify-center">
                  {n}
                </span>
                <div>
                  <p className="text-white font-bold text-[14px]">{t}</p>
                  <p className="text-white/60 text-[12px] mt-0.5">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </PremiumCard>

        {/* Honest note */}
        <PremiumCard className="p-5 mb-6 text-center">
          <p className="text-[13px] text-white/70 leading-relaxed">
            🤝 <strong className="text-white">Honest promise:</strong> you get exactly
            what&apos;s shown — 12 festive creatives + 34 marketing texts, instant
            download after payment. No fake reviews, no inflated claims — just
            ready-to-use festive designs for your business.
          </p>
        </PremiumCard>

        {/* FAQ */}
        <SectionLabel>Common questions</SectionLabel>
        <div className="flex flex-col gap-2 mb-6">
          {[
            ["What's included?", "12 festive creatives (PNG) + 34 marketing texts. Posts are 1080×1080 px, Stories are 1080×1920 px — ready to post on Instagram, WhatsApp & Facebook."],
            ["How do I receive the files?", "Instant download! After successful payment, you'll see the download link. No waiting!"],
            ["Can I use these for my business?", "Yes! Commercial usage rights included. Use for your shop, salon, cafe — anywhere!"],
            ["What if payment fails?", "Only successful payments get the download link. Failed payments are not charged."],
            ["Is the free Diwali Card Maker still free?", "Yes! The free card maker stays 100% free. This pack is a separate paid product."],
          ].map(([q, a]) => (
            <details key={q} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <summary className="text-white font-bold text-[14px] cursor-pointer">{q}</summary>
              <p className="text-white/65 text-[13px] mt-2 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        {/* Final CTA */}
        <a
          href={PAYMENT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'InitiateCheckout', {value: 149, currency: 'INR', content_name: 'Diwali Business Promo Pack'}); }}
          className="pu-btn-premium pu-press w-full py-4 text-[16px] font-extrabold inline-flex items-center justify-center gap-2 rounded-2xl"
        >
          <span>🪔</span> Get My Diwali Business Kit
        </a>
        <p className="text-center text-white/40 text-[11px] mt-3">
          Diwali is on 8 November — order early to promote all festival season.
        </p>
      </div>
    </ModeShell>
  );
}
