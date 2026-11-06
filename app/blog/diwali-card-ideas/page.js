import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "15 Diwali Card Design Ideas 2026 — Creative Greeting Card Inspiration | ProTools",
  description:
    "15 Diwali card design ideas for 2026: traditional diyas, modern minimal, floral, kids' cards & corporate greetings. Free card banao!",
  keywords:
    "diwali card design ideas, diwali greeting card designs, creative diwali cards, handmade diwali card ideas, corporate diwali card, diwali card maker online free",
  openGraph: {
    title: "15 Diwali Card Design Ideas 2026 🎨",
    description: "Traditional, modern, floral & corporate Diwali card inspiration + free online card maker.",
    type: "article",
    url: `${SITE}/blog/diwali-card-ideas`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-diwali-card.png`,
        width: 1200,
        height: 630,
        alt: "Diwali Card Design Ideas 2026 — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "15 Diwali Card Design Ideas 2026 🎨", description: "Card inspiration + free personalized Diwali card maker." },
  alternates: { canonical: `${SITE}/blog/diwali-card-ideas` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "15 Diwali Card Design Ideas 2026 — Creative Greeting Card Inspiration",
  description: "15 stunning Diwali card design ideas: traditional, modern minimal, floral, kids and corporate styles.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-12",
  dateModified: "2026-10-12",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/diwali-card-ideas`,
};

const IDEAS = [
  { t: "Classic Diya Row", d: "A row of glowing clay diyas on a deep maroon background with gold accents. Timeless, warm, and instantly recognizable as Diwali. Perfect for family greetings.", tag: "Traditional" },
  { t: "Firework Burst", d: "Midnight-blue sky exploding with golden fireworks. Dramatic and celebratory — great for young friends and WhatsApp status cards.", tag: "Modern" },
  { t: "Marigold Toran", d: "Strings of orange-yellow marigolds framing the card like a festive toran. Fresh, fragrant feeling even on screen. Ideal for traditional households.", tag: "Floral" },
  { t: "Minimal Gold Foil", d: "Clean cream background, one elegant gold diya line-art, lots of white space. Premium corporate look for clients and business partners.", tag: "Corporate" },
  { t: "Rangoli Mandala", d: "Intricate rangoli mandala as the border with your message in the center. Colourful and artistic — a favourite with design lovers.", tag: "Traditional" },
  { t: "Lakshmi-Ganesha Blessings", d: "Subtle divine motifs with a shloka-style blessing message. Respectful choice for elders and religious family members.", tag: "Traditional" },
  { t: "Neon Party Diwali", d: "Bold neon diyas on black — Diwali meets cyberpunk. Made for Gen-Z, Instagram stories and fun friend groups.", tag: "Modern" },
  { t: "Kids' Cracker Fun", d: "Cartoon rockets, sparklers and smiling diyas. Add the child's name big and bright — kids love seeing their name on cards.", tag: "Kids" },
  { t: "Eco Green Diwali", d: "Leaf-green palette with the message 'Celebrate a Green Diwali'. Thoughtful and modern — shows you care about the planet.", tag: "Modern" },
  { t: "Royal Mughal Arch", d: "Ornate arch frames, deep emerald and gold — palace-inspired grandeur. Stunning for formal invitations and premium greetings.", tag: "Traditional" },
  { t: "Photo Collage Card", d: "Family photo in the center surrounded by diya illustrations. Personal and emotional — the card becomes a keepsake.", tag: "Personal" },
  { t: "Shayari Card", d: "A two-line Diwali shayari as the hero text with soft diya glow behind. Poetic and shareable — made for WhatsApp forwards.", tag: "Personal" },
  { t: "Corporate Gold & Navy", d: "Navy background, gold typography, company logo space. Professional Diwali greetings for clients, vendors and teams.", tag: "Corporate" },
  { t: "Hand-Drawn Doodle", d: "Playful hand-drawn diyas, sweets and crackers. Warm, human, imperfect in the best way — feels made with love.", tag: "Kids" },
  { t: "Name Spotlight Card", d: "The receiver's name in big glowing letters as the centerpiece. Nothing beats personalization — and it's free to make online.", tag: "Personal" },
];

const TIPS = [
  "Keep text short — one warm line beats a paragraph on a card.",
  "Use the receiver's name. Personalized cards get 3x more shares.",
  "Match the design to the person: traditional for elders, fun for friends, premium for clients.",
  "Always include a clear, readable font — fancy scripts look great but must stay legible on phones.",
  "Test on mobile first — 90% of Diwali cards are viewed on WhatsApp, on a phone screen.",
];

export default function DiwaliCardIdeas() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="15 Diwali Card Design Ideas 2026 🎨" subtitle="Find your style — then make it free online" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            Choosing the right Diwali card design is half the greeting. A card for your grandmother should feel
            different from one for your college friends or your biggest client. Below are <strong>15 handpicked
            Diwali card design ideas for 2026</strong> — traditional, modern, floral, kids' favourites and
            corporate styles. Read through, pick your vibe, and then{" "}
            <Link href="/diwali-card" className="text-amber-300 underline">make it for free</Link> with your own
            name in under a minute. No design skills needed.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — make your card now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            4 premium templates ready: Royal Diya, Firework Night, Marigold Utsav, Emerald Shubh. Free forever.
          </p>
          <Link href="/diwali-card" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🪔 Open Diwali Card Maker →
          </Link>
        </PremiumCard>

        <section>
          <div className="grid gap-4 md:grid-cols-2">
            {IDEAS.map((idea, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-amber-200">{i + 1}. {idea.t}</h3>
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">{idea.tag}</span>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{idea.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">💡 5 design tips that actually matter</h2>
          <ul className="mt-4 space-y-3">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">✓</span><span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🎯 Make idea #15 in 30 seconds</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            The "Name Spotlight" card is the highest-impact idea on this list — and the easiest. Our{" "}
            <Link href="/diwali-card" className="text-amber-300 underline">free Diwali Card Maker</Link> puts any
            name on a premium design instantly. Type the name, pick a template, download, share on WhatsApp.
            Done. Your friends will think you hired a designer.
          </p>
          <Link href="/diwali-card" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🪔 Try It Free — No Signup →
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/blog/diwali-wishes-2026" className="text-amber-300 underline">🪔 100+ Happy Diwali Wishes 2026</Link></li>
            <li><Link href="/blog/shubh-deepavali-wishes-hindi" className="text-amber-300 underline">💛 शुभ दीपावली शुभकामनाएं — 50+ हिंदी संदेश</Link></li>
            <li><Link href="/diwali-card" className="text-amber-300 underline">✨ Free Diwali Card Maker</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
