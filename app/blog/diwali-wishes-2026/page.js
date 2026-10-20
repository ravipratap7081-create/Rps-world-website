import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "100+ Happy Diwali Wishes 2026 — Shayari, Quotes & Greeting Messages | Pro Universe",
  description:
    "Best Happy Diwali wishes 2026: heartfelt shayari, quotes, WhatsApp messages in Hindi & English. Plus make a personalized Diwali card with your name — free!",
  keywords:
    "happy diwali wishes 2026, diwali wishes in hindi, diwali shayari, deepavali wishes quotes, diwali whatsapp messages, शुभ दीपावली शुभकामनाएं, diwali card maker",
  openGraph: {
    title: "100+ Happy Diwali Wishes 2026 — Shayari & Quotes 🪔",
    description: "Heartfelt Diwali wishes in Hindi & English + free personalized Diwali card maker with your name.",
    type: "article",
    url: `${SITE}/blog/diwali-wishes-2026`,
    siteName: "Pro Universe",
    images: [
      {
        url: `${SITE}/og-diwali-card.png`,
        width: 1200,
        height: 630,
        alt: "Happy Diwali Wishes 2026 — Pro Universe",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "100+ Happy Diwali Wishes 2026 🪔", description: "Shayari, quotes & WhatsApp messages + free Diwali card maker." },
  alternates: { canonical: `${SITE}/blog/diwali-wishes-2026` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "100+ Happy Diwali Wishes 2026 — Shayari, Quotes & Greeting Messages",
  description: "The best Happy Diwali wishes for 2026: shayari, quotes and WhatsApp messages in Hindi and English.",
  author: { "@type": "Organization", name: "Pro Universe", url: SITE },
  publisher: { "@type": "Organization", name: "Pro Universe" },
  datePublished: "2026-10-12",
  dateModified: "2026-10-12",
  inLanguage: ["en", "hi"],
  mainEntityOfPage: `${SITE}/blog/diwali-wishes-2026`,
};

const EN_WISHES = [
  "May the festival of lights fill your home with happiness, your heart with love, and your life with prosperity. Happy Diwali 2026!",
  "Wishing you a Diwali that brings joy, wealth, and endless moments of togetherness with your loved ones.",
  "Let the diyas guide you towards success and the fireworks fill your life with colour. Shubh Deepavali!",
  "On this auspicious festival, may Goddess Lakshmi bless your home with abundance and Lord Ganesha remove every obstacle. Happy Diwali!",
  "Sending you warm Diwali greetings wrapped in love and tied with the ribbon of happiness. Have a sparkling Deepavali!",
  "May this Diwali mark the beginning of your brightest year yet — full of health, wealth, and cherished memories.",
  "Light a diya of hope in every heart you touch this Diwali. Wishing you and your family a joyous festival of lights!",
  "As the sky lights up with fireworks, may your dreams take flight too. Happy Diwali 2026!",
];

const HI_WISHES = [
  "दीपों का ये पावन त्योहार आपके जीवन में सुख, शांति और समृद्धि लाए। शुभ दीपावली 2026!",
  "झिलमिलाते दीयों की रोशनी से आपका घर-आंगन जगमगाए, मां लक्ष्मी का वास हो। दीपावली की हार्दिक शुभकामनाएं!",
  "पटाखों की गूंज और दीयों की लौ आपके जीवन को खुशियों से भर दे। शुभ दीपावली!",
  "इस दिवाली हर दिल में प्यार की ज्योति जले, हर घर में खुशियों का उजाला हो। दीपावली मुबारक!",
  "धन की देवी लक्ष्मी और विघ्नहर्ता गणेश आपके घर पधारें, सुख-समृद्धि बरसाएं। शुभ दीपावली!",
  "मीठे पकवान, प्यारे अपनों का साथ और दीयों की जगमगाहट — यही तो है दिवाली की असली मिठास!",
  "अंधेरे पर उजाले की जीत का ये त्योहार आपके जीवन के हर अंधेरे को मिटा दे। शुभ दीपावली 2026!",
  "दिये जलाओ, खुशियां मनाओ, अपनों को गले लगाओ — दिवाली आई है, धूम मचाओ!",
];

const SHAYARI = [
  "रोशनी का त्योहार आया है दोस्तों,\nदिलों में प्यार जगाया है दोस्तों,\nजो रूठे थे कभी अपनों से,\nउन्हें आज गले लगाया है दोस्तों।\nशुभ दीपावली!",
  "दीप जले तो रोशन आपका जहान हो,\nपूरा आपका हर एक अरमान हो,\nमां लक्ष्मी जी की कृपा बनी रहे आप पर,\nइस धनतेरस पर आप बहुत धनवान हों!\nशुभ दीपावली!",
  "पल पल सुनहरे फूल खिले,\nकभी ना हो कांटों से सामना,\nजिंदगी आपकी खुशियों से भरी रहे,\nयही है दिवाली पर हमारी शुभकामना!",
];

function WishCard({ text, i }) {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 to-orange-950/20 p-5">
      <p className="text-[15px] leading-relaxed text-amber-100/90 whitespace-pre-line">{text}</p>
      <p className="mt-3 text-xs text-amber-400/60">#{i + 1} — copy karke WhatsApp pe bhejo 📋</p>
    </div>
  );
}

export default function DiwaliWishes2026() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader
        title="100+ Happy Diwali Wishes 2026 🪔"
        subtitle="Shayari, quotes & WhatsApp messages — Hindi + English"
      />

      <PremiumCard className="mb-6 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
        <h2 className="text-xl font-extrabold text-amber-200">🎨 Apne naam wala Diwali card banao — FREE!</h2>
        <p className="mt-2 text-[15px] text-amber-100/80">
          Sirf message bhejne se baat nahi banegi — <strong>personalized card</strong> bhejo apne naam ke saath.
          4 premium designs, free download, WhatsApp share. 30 second me taiyaar!
        </p>
        <Link
          href="/diwali-card"
          className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold"
        >
          🪔 Diwali Card Maker kholo →
        </Link>
      </PremiumCard>

      <article className="space-y-6">
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Diwali 2026 — Festival of Lights</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Diwali, the festival of lights, is the most loved festival in India. In 2026, families across the
            country will light diyas, burst crackers, share sweets, and exchange heartfelt wishes. Whether you
            celebrate with a grand puja or a quiet family dinner, the right words make the festival special.
            Below you will find handpicked <strong>Happy Diwali wishes for 2026</strong> — in English and Hindi —
            plus beautiful shayari you can copy straight into WhatsApp. And if you want to go one step further,
            create a <Link href="/diwali-card" className="text-amber-300 underline">personalized Diwali card with your name</Link> in
            under a minute — free, no signup.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            The tradition of sending Diwali greetings goes back generations — from handwritten cards to SMS, and now
            to WhatsApp forwards and digital greeting cards. What never changes is the feeling behind the words:
            wishing light over darkness, good over evil, and hope over despair. Pick the wish that speaks to you,
            add your personal touch, and make someone's Diwali brighter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">✨ Happy Diwali Wishes in English</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {EN_WISHES.map((w, i) => <WishCard key={i} text={w} i={i} />)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🪔 दिवाली की शुभकामनाएं — हिंदी में</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {HI_WISHES.map((w, i) => <WishCard key={i} text={w} i={i + 8} />)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">💛 Diwali Shayari 2026</h2>
          <div className="mt-4 grid gap-4">
            {SHAYARI.map((s, i) => <WishCard key={i} text={s} i={i + 16} />)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">💡 Pro tip: message + card = double impact</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Plain text wishes get lost in a flood of forwards. A <strong>personalized card with the receiver's
            name</strong> stands out instantly. Use our{" "}
            <Link href="/diwali-card" className="text-amber-300 underline">free Diwali Card Maker</Link> — type any
            name, choose from Royal Diya, Firework Night, Marigold Utsav or Emerald Shubh designs, download, and
            share on WhatsApp. It takes 30 seconds and it's completely free.
          </p>
          <Link href="/diwali-card" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🪔 Apna Diwali Card Banao — Free →
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/blog/diwali-card-ideas" className="text-amber-300 underline">🎨 15 Diwali Card Design Ideas for 2026</Link></li>
            <li><Link href="/blog/shubh-deepavali-wishes-hindi" className="text-amber-300 underline">🪔 शुभ दीपावली शुभकामनाएं — 50+ हिंदी संदेश</Link></li>
            <li><Link href="/diwali-card" className="text-amber-300 underline">✨ Free Diwali Card Maker</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
