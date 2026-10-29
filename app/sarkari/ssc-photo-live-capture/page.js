import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "SSC Photo: Live Capture hi chahiye (CGL 2026) — Upload wali photo nahi chalegi | Pro Universe",
  description:
    "SSC CGL 2026 me photograph live capture hoti hai — no upload, live capture only. Purani photo ki photo lena mana hai, aisi application reject ho sakti hai. Live-capture checklist, rules aur outdated upload values ki warning.",
  keywords:
    "ssc cgl photo live capture, ssc photo live capture 2026, ssc cgl 2026 photograph, ssc live photo capture, ssc cgl apply photo",
  openGraph: {
    title: "SSC Photo: Live Capture hi chahiye (CGL 2026)",
    description: "CGL 2026: no upload — live capture only. Purani photo ki photo mat lo, application reject ho sakti hai.",
    type: "article",
    url: `${SITE}/sarkari/ssc-photo-live-capture`,
    siteName: "Pro Universe",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "SSC Photo Live Capture CGL 2026 — Pro Universe",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "SSC Photo: Live Capture hi chahiye (CGL 2026)", description: "CGL 2026: no upload — live capture only. Purani photo ki photo mat lo." },
  alternates: { canonical: `${SITE}/sarkari/ssc-photo-live-capture` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SSC Photo: Live Capture hi chahiye (CGL 2026) — upload wali photo nahi chalegi",
  description: "SSC CGL 2026 me photograph live capture hoti hai — no upload, live capture only. Purani photo ki photo lena mana hai.",
  author: { "@type": "Organization", name: "Pro Universe", url: SITE },
  publisher: { "@type": "Organization", name: "Pro Universe" },
  datePublished: "2026-10-29",
  dateModified: "2026-10-29",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/sarkari/ssc-photo-live-capture`,
};

const CHECKLIST = [
  "Live capture hi hoga: webcam, mobile camera, ya QR code se mobile par — CGL 2026 me photograph upload hoti hi nahi.",
  "Plain / light background, achhi roshni, seedha chehra — chehra saaf, seedha, poori tarah frame ke andar.",
  "No cap, no mask, no spectacles capture ke waqt.",
  "Blurred photo reject hoti hai — preview me dhyaan se dekho, dobara capture ka option ho to use karo.",
  "Apne exam ke active application flow me photo step par jo dikh raha hai, wahi final hai.",
];

const DONT = [
  "Purani (pre-existing) photograph ki photo mat lo — CGL 2026 me ye mana hai, aisi application reject ho sakti hai.",
  "Selfie ya group photo se crop karke mat lagao.",
  "Kisi purane guide ka upload preset CGL 2026 par mat lagao — ye exam upload accept hi nahi karta.",
];

const FAQS = [
  { q: "SSC CGL 2026 me photo upload kar sakte hain?", a: "Nahi. CGL 2026 me photograph live capture hoti hai — webcam, mobile camera, ya QR code se mobile par. Koi uploaded photograph accept nahi hoti." },
  { q: "Purani photo ki photo lekar upload kar dun?", a: "Mat karo. Pre-existing photograph ki photo lena mana hai, aisi application reject ho sakti hai. Hamesha live capture karo." },
  { q: "Photo me cap, mask ya chashma chalega?", a: "Nahi. Capture ke waqt no cap, no mask, no spectacles — chehra saaf, seedha, poori tarah frame ke andar hona chahiye." },
  { q: "Ye page kis exam ke liye hai?", a: "SSC CGL 2026 ke liye. Ye ek guide + checklist page hai, upload preset nahi — kyunki CGL 2026 koi photo upload accept nahi karta." },
];

export default function SscPhotoLiveCapture() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="SSC Photo: Live Capture hi chahiye (CGL 2026) 📸" subtitle="No upload — live capture only. Upload wali photo CGL 2026 me nahi chalegi." />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            SSC CGL 2026 ke liye ye sabse pehle samajh lo: <strong>is exam me photograph upload
            hoti hi nahi — live capture hoti hai.</strong> Webcam, mobile camera, ya QR code se
            mobile par live photo li jati hai. Agar tum purani photo ko resize karke upload karne
            ki taiyari me ho, to ruko — CGL 2026 me wo raasta hai hi nahi. Isliye ye page koi
            upload preset nahi deta; ye ek <strong>guide + checklist page</strong> hai.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            Exam: SSC CGL 2026. Source: SSC CGL 2026 notice (ssc.gov.in), live-capture rule
            verified 28 Oct 2026. Upload vs live capture: <strong>live capture only</strong>.
            Last verification date: 28 Oct 2026.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-red-500/30 bg-gradient-to-br from-red-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-red-200">⚠️ Sabse badi galti — purani photo ki photo</h2>
          <p className="mt-2 text-[15px] text-red-100/80">
            Kisi purani (pre-existing) photograph ki photo lena mana hai. Aisi application reject
            ho sakti hai. Hamesha live capture karo, selfie ya group photo se crop mat karo.
          </p>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">✅ Live-capture checklist</h2>
          <ul className="mt-4 space-y-3">
            {CHECKLIST.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">✓</span><span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🚫 Ye mat karo</h2>
          <ul className="mt-4 space-y-3">
            {DONT.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">✗</span><span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">⏳ Purane upload values — CGL 2026 ke liye OUTDATED</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Purane guides me SSC photo upload ke liye 20–50 KB, 200×230 px, 3.5×4.5 cm likha
            milta hai. Ye numbers <strong>CGL 2026 ki requirements NAHI hain</strong> — CGL 2026
            notice me live capture hai, upload preset nahi. Inhe yahan sirf isliye likha gaya hai
            taaki tum pehchan sako ki ye outdated hain; inhe CGL 2026 requirement samajh kar
            mat lagao. Agar kisi aur SSC exam ka application flow abhi bhi photo upload accept
            karta hai, to us flow me jo live spec dikhe, wahi final hai — aur wahi spec count
            karegi.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">🖼️ Upload wala tool — sirf un exams ke liye jo upload accept karte hain</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            Neeche wala generic photo tool <strong>CGL 2026 live capture ke liye NAHI hai</strong>.
            Ye sirf un exams ke liye hai jinke application flow me abhi bhi photo upload hota hai.
            CGL 2026 ke liye portal ke andar live capture hi karo.
          </p>
          <Link href="/sarkari/photo-resizer" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🖼️ Open Generic Photo Resizer (upload exams only) →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">❓ Common questions</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold text-amber-200">{f.q}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Check before you submit</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">
            Apne exam ke active application flow me photo step par jo dikh raha hai, wahi final
            hai. CGL 2026 me wahi live capture hoga. Specs notifications ke beech badal sakte
            hain — submit karne se pehle flow se milana mat bhoolo.
          </p>
          <p className="mt-3 text-[14px] text-white/60">
            Sources: SSC CGL 2026 notice (ssc.gov.in) — live photograph capture, no pre-existing
            photograph, no cap/mask/spectacles, blurred photo rejected; secondary guides
            (Oliveboard / TestBook) corroborating only. Ye jaankari aur tool 100% aapke browser
            me chalte hain — aapki photo kisi server par upload nahi hoti, na login chahiye, na
            watermark lagta hai.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">🪪 Exam Photo–Signature Maker — SSC, UPSC, Railway, Bank</Link></li>
            <li><Link href="/blog/passport-size-photo-maker-online" className="text-amber-300 underline">🪪 Passport Size Photo Maker Online</Link></li>
            <li><Link href="/blog/up-police-photo-size" className="text-amber-300 underline">🚔 UP Police Photo Size 2026</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
