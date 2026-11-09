"use client";
import { PageHeader, PremiumCard, SectionLabel } from "../../components/Premium";
import PrivacyChoicesLink from "../../components/PrivacyChoicesLink";

const PACKAGES = [
  {
    id: "diwali-pack",
    name: "Diwali Business Promo Pack",
    price: 149,
    tagline: "Ready-to-post Diwali plan — designs + texts + posting calendar",
    popular: false,
    features: [
      "12 festive creatives (6 posters 1080×1080 + 6 stories 1080×1920)",
      "34 ready-to-use Hindi marketing texts",
      "PNG files, ready to post",
      "Digital delivery after payment",
      "Use for Instagram, WhatsApp & Facebook",
      "Use for your business promotions",
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
    <div className="min-h-screen bg-[#0f0f1a]">
      <div className="max-w-md mx-auto pb-12">
        <PageHeader
          title="🪔 Diwali Business Kit"
          subtitle="Ready-to-post Diwali plan — 12 creatives + 34 texts + day-wise posting calendar"
        />

        {/* Hero */}
        <PremiumCard className="p-5 mb-4 text-center" accent="gold">
          <div className="text-5xl mb-3">🏪✨</div>
          <p className="text-gold font-extrabold text-[16px] mb-1">इस दिवाली आपकी दुकान चमकेगी</p>
          <h2 className="text-xl font-extrabold text-white mb-2">
            This Diwali, make your business <span className="text-gold">shine</span>
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Get 12 ready-to-use festive creatives (6 posters + 6 stories) + 34 Hindi marketing texts for your
            business — post on Instagram, WhatsApp &amp; everywhere.
            <strong className="text-white"> Digital delivery after payment!</strong>
          </p>
          <p className="text-[20px] font-bold text-gold mt-3">
            Ek baar ₹149, subscription nahi
          </p>
          <p className="text-[13px] text-white/60">
            Ek baar ka payment — har mahine ka charge nahi
          </p>
        </PremiumCard>

        {/* Diwali posting calendar */}
        <SectionLabel>Diwali posting calendar — kab kya post karein</SectionLabel>
        <PremiumCard className="p-5 mb-6">
          <ol className="space-y-3">
            {[
              ["6 Nov, Shukravar — Dhanteras", "Subah offer poster + shaam ko Dhanteras wish post"],
              ["7 Nov, Shanivar — Choti Diwali (Kali Chaudas)", "Din me offer poster + shaam ko family/decor post"],
              ["8 Nov, Ravivar — Diwali", "Subah Diwali wish poster + shaam ko celebration post"],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="shrink-0 text-gold mt-0.5">🪔</span>
                <div>
                  <p className="text-white font-bold text-[14px]">{t}</p>
                  <p className="text-white/60 text-[12px] mt-0.5">{d}</p>
                </div>
              </li>
            ))}
          </ol>
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
              <div className="space-y-3 mb-4">
                <p className="text-white/60 text-[13px] text-center">
                  Secure checkout via Instamojo — payment details collected on the secure payment page.
                </p>
              </div>
              <a
                href="https://ravipratap7081.myinstamojo.com/product/diwali-business-promo-pack/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { try { if (typeof window !== "undefined" && typeof window.puEvent === "function") window.puEvent("product_cta_click", { product: "diwali_business_promo_pack", price_inr: 149 }); } catch (e) {} }}
                className="pu-btn-primary pu-press w-full py-3 text-[15px] inline-flex items-center justify-center gap-2"
              >
                <span>🪔</span> Buy Now - ₹149
              </a>
              <p className="text-white/40 text-[12px] mt-2 text-center">
                Secure checkout via Instamojo
              </p>
            </PremiumCard>
          ))}
        </div>

        {/* How it works */}
        <SectionLabel>How it works</SectionLabel>
        <PremiumCard className="p-5 mb-6">
          <ol className="space-y-3">
            {[
              ["1", "Pay ₹149", "Secure checkout via Instamojo."],
              ["2", "Get download link", "After successful payment, you'll get a download link on the confirmation page and via email. Link valid 24 hours — download & save your files immediately."],
              ["3", "Use the designs", "ZIP kholo, poster ya story chuno, caption copy karo aur apna offer jodo — phir Instagram, WhatsApp & Facebook par post karo. 12 creatives (6 posters + 6 stories) + 34 texts."],
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
            what&apos;s shown — 12 festive creatives + 34 marketing texts, delivered
            digitally right after payment. No fake reviews, no inflated claims — just
            ready-to-use festive designs for your business. Ye ready-to-use download pack hai — custom design ya individual revisions isme included nahi hain. Apni dukaan ka naam wala poster FREE Offer Maker se banao.
          </p>
        </PremiumCard>

        {/* FAQ */}
        <SectionLabel>Common questions</SectionLabel>
        <div className="flex flex-col gap-2 mb-6">
          {[
            ["What's included?", "12 festive creatives (PNG) + 34 marketing texts. Posts are 1080×1080 px, Stories are 1080×1920 px — ready to post on Instagram, WhatsApp & Facebook."],
            ["How do I receive the files?", "Digital delivery after payment! After successful payment, you'll see a download button on the confirmation page and receive an email with the download link. The link is valid for 24 hours — please download and save your files right away."],
            ["Can I use these for my business?", "Yes! Use them for your shop, salon, cafe — anywhere for your own business promotions. You may NOT resell or redistribute the files themselves."],
            ["Kya meri dukaan ka naam wala custom poster milega?", "Nahi — ye ready-to-use download pack hai, isme custom design ya individual revisions included nahi hain. Apni dukaan ka naam wala poster FREE Offer Maker se banao (page par upar link hai)."],
            ["What if payment fails?", "Only successful payments get the download link. If money was debited on a failed payment, your bank reverses it automatically within 3–5 working days."],
          ].map(([q, a]) => (
            <details key={q} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <summary className="text-white font-bold text-[14px] cursor-pointer">{q}</summary>
              <p className="text-white/65 text-[13px] mt-2 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        {/* Free sample — permanent, zero-expiry */}
        <SectionLabel>Try it free first</SectionLabel>
        <PremiumCard className="p-5 mb-6 text-center">
          <p className="text-white font-bold text-[15px] mb-1">🎁 FREE Diwali Sample</p>
          <p className="text-white/60 text-[13px] mb-4 leading-relaxed">
            1 ready-to-post Diwali poster + 3 Hindi captions — free, no signup needed.
            Long-press the poster to save it to your phone.
          </p>
          <img
            src="/free-sample-poster.png"
            alt="FREE Diwali sample poster"
            className="w-full h-auto rounded-xl border border-white/10 mb-4"
            loading="lazy"
          />
          <div className="text-left bg-white/[0.04] border border-white/10 rounded-xl p-4 mb-4">
            <p className="text-gold font-bold text-[13px] mb-2">3 FREE captions — tap to copy:</p>
            {[
              "🪔 Diwali ki shubhkamnayein! Hamari dukaan par aaiye, tyoharon ki khushiyan manaiye! #Diwali2026 #SupportLocal",
              "✨ Is Diwali, apne business ko chamkayein! Special festive offers ke liye aaj hi visit karein! 🛍️ #DiwaliSale",
              "🎆 Diwali Dhamaka! Naye collection aur exciting deals ke saath tyohar manayein! Store par zaroor aayein! #FestiveSeason",
            ].map((c, i) => (
              <button
                key={i}
                onClick={() => { try { navigator.clipboard.writeText(c); } catch (e) {} }}
                className="block w-full text-left text-white/75 text-[12px] leading-relaxed bg-black/30 rounded-lg px-3 py-2 mb-2 active:bg-black/50"
              >
                {c}
              </button>
            ))}
          </div>
          <a
            href="/free-diwali-sample.zip"
            download="free-diwali-sample.zip"
            className="text-white/50 text-[12px] underline"
          >
            Or download as ZIP file
          </a>
          <p className="text-white/40 text-[12px] mt-2">
            Liked it? The full pack has 12 creatives + 34 texts for just ₹149.
          </p>
        </PremiumCard>

        {/* Refund & Support (added 21 Oct 2026 — ChatGPT audit P0: buyer must see refund + support before paying) */}
        <PremiumCard className="p-5 mb-6 text-left">
          <p className="text-gold font-extrabold text-[15px] mb-2">🛡️ Refund &amp; Support</p>
          <p className="text-white/70 text-[13px] leading-relaxed mb-2">
            Ye digital product hai — payment ke baad ZIP download link milta hai. Agar download link kaam na kare,
            file corrupt mile, ya galti se double payment ho jaye, to 7 din ke andar poora ₹149 refund milega.
            Bas humein batayein — hum download link dobara bhej denge ya refund kar denge.
          </p>
          <p className="text-white/70 text-[13px] leading-relaxed mb-3">
            Support: WhatsApp par message karein — download ya refund me madad milegi (24 ghante ke andar jawab ka prayas).
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://wa.me/919235039317?text=Hi!%20Mujhe%20Diwali%20Business%20Kit%20me%20madad%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold text-white bg-white/10 border border-white/15 rounded-full px-4 py-2"
            >
              💬 WhatsApp Support
            </a>
            <a href="/refund-policy" className="text-[13px] font-bold text-gold underline px-2 py-2">
              Poori Refund Policy →
            </a>
          </div>
        </PremiumCard>

        {/* Final CTA */}
        <a
          href="https://ravipratap7081.myinstamojo.com/product/diwali-business-promo-pack/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { try { if (typeof window !== "undefined" && typeof window.puEvent === "function") window.puEvent("product_cta_click", { product: "diwali_business_promo_pack", price_inr: 149 }); } catch (e) {} }}
          className="pu-btn-premium pu-press w-full py-4 text-[16px] font-extrabold inline-flex items-center justify-center gap-2 rounded-2xl"
        >
          <span>🪔</span> Get My Diwali Business Kit — ₹149
        </a>
        <p className="text-center text-white/40 text-[11px] mt-3">
          Diwali is on 8 November — order early to promote all festival season.
        </p>
        <footer className="text-center text-white/40 text-[11px] pb-10 pt-4">
          <div className="flex justify-center gap-4 mb-2 flex-wrap">
            <a href="/about" className="hover:text-white/70">About</a>
            <a href="/contact" className="hover:text-white/70">Contact</a>
            <PrivacyChoicesLink className="hover:text-white/70" />
          </div>
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
        </footer>
      </div>
    </div>
  );
}
