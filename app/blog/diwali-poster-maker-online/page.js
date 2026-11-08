import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Diwali Poster Maker Online — Free vs Paid, Kaise Banaye 2026 | ProTools",
  description:
    "Diwali poster kaise banaye online? Free tools se lekar custom professional designs tak — poori guide, dukaan ya personal use ke liye.",
  keywords:
    "diwali poster maker online, diwali poster kaise banaye, diwali business poster, diwali sale poster maker, free diwali poster design, diwali promotional poster online",
  openGraph: {
    title: "Diwali Poster Maker Online 🪔 Free vs Paid Guide 2026",
    description: "Dukaan ya business ke liye Diwali poster kaise banaye? Free tools aur custom design options ki poori guide.",
    type: "article",
    url: `${SITE}/blog/diwali-poster-maker-online`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-diwali-card.png`,
        width: 1200,
        height: 630,
        alt: "Diwali Poster Maker Online — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "Diwali Poster Maker Online 🪔", description: "Free vs paid Diwali poster options — poori guide 2026." },
  alternates: { canonical: `${SITE}/blog/diwali-poster-maker-online` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Diwali Poster Maker Online — Free vs Paid, Kaise Banaye 2026",
  description: "Diwali poster kaise banaye online: free tools se lekar custom professional designs tak poori guide.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-12",
  dateModified: "2026-10-12",
  inLanguage: ["hi", "en"],
  mainEntityOfPage: `${SITE}/blog/diwali-poster-maker-online`,
};

const FAQ = [
  {
    q: "Kya main free me Diwali business poster bana sakta hun?",
    a: "Haan, kai free online tools hain jinse basic Diwali posters banaye ja sakte hain. Lekin unme aapki dukaan ka naam, logo aur specific offer add karne me limitation hoti hai. Professional custom design ke liye paid service behtar hai — jaise hamara Diwali Business Kit ₹299 se shuru hota hai.",
  },
  {
    q: "Diwali poster banane me kitna time lagta hai?",
    a: "Free tools se 10-15 minute me basic poster ban jata hai. Custom professional design me 24-48 ghante lagte hain kyunki designer aapki business details ke hisaab se fresh design banata hai.",
  },
  {
    q: "WhatsApp Status ke liye alag poster chahiye?",
    a: "Haan! WhatsApp Status ka size (1080×1920) normal poster se alag hota hai. Achhe Diwali Business Kit me dono sizes milte hain — hamare Starter pack me 1 poster + 1 WhatsApp Status design included hai.",
  },
  {
    q: "Diwali poster me kya-kya hona chahiye?",
    a: "Dukaan ka naam, Diwali offer ya discount, contact/WhatsApp number, aur festive design (diye, patakhe, marigold). Offer clear aur bada likha hona chahiye taaki chhote mobile screen par bhi padha ja sake.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const FREE_TOOLS = [
  { t: "Canva Free Templates", d: "Hazaaron Diwali templates milenge. Drag-drop se naam aur offer badal sakte ho. Limitation: free version me kuch premium elements locked hote hain, aur design generic lag sakta hai kyunki hazaaron log wahi template use karte hain." },
  { t: "ProTools Diwali Card Maker", d: "Personal Diwali cards ke liye 100% free — naam likho, template chuno, download karo. Lekin ye personal greetings ke liye hai, business posters ke liye nahi. Business ke liye alag service chahiye." },
  { t: "Mobile Poster Apps", d: "Play Store par kai poster maker apps hain. Phone se hi bana sakte ho. Problem: zyadatar me watermark aata hai ya HD download ke liye paise maangte hain." },
];

const PAID_SIGNS = [
  "Aapki dukaan ka naam, logo aur specific offer chahiye (generic 'Happy Diwali' nahi)",
  "Multiple sizes chahiye — Instagram post, Story, WhatsApp Status, print banner",
  "Competitors se alag dikhna hai — wahi Canva template sab use kar rahe hain",
  "Time nahi hai khud design karne ka — koi professional bana de",
  "Print karwana hai — flex, pamphlet ya newspaper ad ke liye high-quality file chahiye",
];

export default function DiwaliPosterMakerOnline() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHeader title="Diwali Poster Maker Online 🪔" subtitle="Free vs Paid — kaunsa option aapke liye sahi?" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            Diwali aa rahi hai — <strong>8 November 2026</strong> — aur har dukandaar chahta hai ki uski
            dukaan sabse zyada chamke. Lekin <strong>diwali poster kaise banaye</strong> online? Kya free
            tools kaafi hain ya paise kharch karke custom design banwana chahiye? Is guide me hum dono
            options ko imaandaari se compare karenge, taaki aap sahi faisla le sako. Koi fake promise nahi,
            sirf practical baat.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">🏪 Business ke liye poster chahiye?</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            Custom Diwali Business Kit — aapki dukaan ka naam, offer aur logo ke saath. ₹299 se shuru, 24-48 ghante me delivery.
          </p>
          <Link href="/diwali-business-kit" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🏪 Dekho Business Kit →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🆓 Free Diwali Poster Maker Options</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Agar budget zero hai ya bas ek simple poster chahiye, toh ye free options try karo:
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {FREE_TOOLS.map((tool, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-bold text-amber-200">{i + 1}. {tool.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{tool.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">💰 Paid Custom Design Kab Lena Chahiye?</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Free tools sabke liye nahi hote. Agar neeche me se koi bhi baat aap par lagu hoti hai,
            toh custom design me invest karna samajhdari hai:
          </p>
          <ul className="mt-4 space-y-3">
            {PAID_SIGNS.map((sign, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">✓</span><span>{sign}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📊 Free vs Paid — Seedhi Comparison</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-[14px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-amber-200">
                  <th className="py-3 pr-4 font-bold">Feature</th>
                  <th className="py-3 pr-4 font-bold">Free Tools</th>
                  <th className="py-3 font-bold">Custom Design (₹299+)</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5"><td className="py-3 pr-4 font-semibold">Cost</td><td className="py-3 pr-4">₹0</td><td className="py-3">₹299 – ₹999</td></tr>
                <tr className="border-b border-white/5"><td className="py-3 pr-4 font-semibold">Aapka naam/logo</td><td className="py-3 pr-4">Limited</td><td className="py-3">Full custom</td></tr>
                <tr className="border-b border-white/5"><td className="py-3 pr-4 font-semibold">Uniqueness</td><td className="py-3 pr-4">Generic (sab wahi use karte hain)</td><td className="py-3">Sirf aapke liye bana</td></tr>
                <tr className="border-b border-white/5"><td className="py-3 pr-4 font-semibold">Sizes</td><td className="py-3 pr-4">1-2 basic</td><td className="py-3">Post + Story + Status + Print</td></tr>
                <tr className="border-b border-white/5"><td className="py-3 pr-4 font-semibold">Time</td><td className="py-3 pr-4">Khud 30-60 min</td><td className="py-3">Zero (designer banata hai)</td></tr>
                <tr><td className="py-3 pr-4 font-semibold">Revisions</td><td className="py-3 pr-4">Unlimited (khud karo)</td><td className="py-3">2 free rounds</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🎯 Ek Achhe Diwali Business Poster Me Kya Ho?</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Bada, clear headline — 'DIWALI DHAMAKA SALE' jaise shabdon me, jo 2 second me padha jaye",
              "Offer details — kitna discount, kab tak valid, kya shartein",
              "Dukaan ka naam + WhatsApp number — taaki customer turant contact kar sake",
              "Festive visuals — diye, marigold, patakhe. Lekin text dabna nahi chahiye",
              "Mobile-first design — 90% log WhatsApp par dekhenge, chhoti screen par test karo",
            ].map((tip, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">{i + 1}.</span><span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <PremiumCard className="!border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">🎨 Ready ho toh shuru karo</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            <strong>Business poster chahiye?</strong> Diwali Business Kit me ₹299 se custom designs — 24-48 ghante delivery, 2 free revisions.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/diwali-business-kit" className="rounded-xl border border-amber-500/40 px-6 py-3 font-bold text-amber-200">
              🏪 Business Kit (₹299+) →
            </Link>
          </div>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">❓ Aksar Puche Jaane Wale Sawal</h2>
          <div className="mt-4 space-y-4">
            {FAQ.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold text-amber-200">{f.q}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/blog/diwali-business-promotion-ideas" className="text-amber-300 underline">💡 10 Diwali Business Promotion Ideas</Link></li>
            <li><Link href="/blog/diwali-card-ideas" className="text-amber-300 underline">🎨 15 Diwali Card Design Ideas</Link></li>
            <li><Link href="/diwali-business-kit" className="text-amber-300 underline">🏪 Diwali Business Kit (₹299+)</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
