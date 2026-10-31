import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "SSC Signature Size 10-20 KB — Live Photo Capture | ProTools",
  description: "SSC CGL / CHSL me photo live capture hoti hai, signature JPG 10-20 KB me upload hota hai. Live-capture checklist, signature steps aur common rejection wajah.",
  keywords: "ssc signature size, ssc cgl signature 10-20 kb, ssc live photo capture, ssc form photo signature",
  openGraph: {
    title: "SSC Signature Size — Live Photo, 10-20 KB Signature",
    description: "SSC CGL / CHSL: photo live capture, signature JPG 10-20 KB. Steps, checklist aur rejection fixes.",
    type: "article",
    url: `${SITE}/blog/ssc-signature-size-live-photo`,
    siteName: "ProTools",
    images: [{ url: `${SITE}/og-sarkari.png`, width: 1200, height: 630, alt: "SSC Signature Size — Live Photo, 10-20 KB Signature" }],
  },
  twitter: { card: "summary_large_image", title: "SSC Signature Size — Live Photo, 10-20 KB Signature", description: "SSC CGL / CHSL: photo live capture, signature JPG 10-20 KB. Steps, checklist aur rejection fixes." },
  alternates: { canonical: `${SITE}/blog/ssc-signature-size-live-photo` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SSC form: photo live capture hoti hai, signature file taiyaar karo",
  description: "SSC CGL / CHSL me photo live capture hoti hai, signature JPG 10-20 KB me upload hota hai. Live-capture checklist, signature steps aur common rejection wajah.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/ssc-signature-size-live-photo`,
};

const SPECS = [
  { a: "Plain background, achhi roshni", b: "Live capture ke waqt plain / light background, achhi roshni, seedha chehra, frame ke andar poora chehra." },
  { a: "No cap, no mask, no spectacles", b: "Capture ke waqt cap, mask ya spectacles nahi. Chehra saaf aur seedha hona chahiye." },
  { a: "Purani photo ki photo mana hai", b: "Purani printed ya digital photo ki photo lena mana hai aur aisi application reject ho sakti hai." },
  { a: "Exam ke din match", b: "Exam ke din tumhara chehra application wali live photo se match hona chahiye." }
];
const STEPS = [
  "Plain white paper par black ya blue ink se apna normal signature karo — capital letters me poora naam mat likho, aur signature halka ya dhundhla na ho.",
  "Scan ya saaf photo lo, phir Exam Photo-Signature Maker me SSC preset chuno.",
  "File JPG me, 10 KB se 20 KB ke beech honi chahiye. Is band se bahar ki file upload screen par atak sakti hai.",
  "Size ke baare me ek sach: main notice me signature lagbhag 6.0 cm x 2.0 cm bataya gaya hai, jabki ek annexure me lagbhag 4.0 cm x 2.0 cm likha hai. Koi ek pixel size ko official mat maano — apne form ki upload screen par jo size dikhe, wahi final hai.",
  "Download karke file kholo aur khud check karo: signature poora dikh raha hai, kata nahi hai, aur padhne layak hai."
];
const MISTAKES = [
  "CGL / CHSL ke liye purani photo ko resize karke upload karne ki taiyari karna — wahan photo upload hoti hi nahi.",
  "Blurred ya bahut chhota signature upload karna — ye reject ho sakta hai.",
  "Dusre exam ka photo rule apne form par lagana — SSC GD jaise kuch exams me abhi bhi uploaded photo maangi ja sakti hai (3.5 cm x 4.5 cm, 20-50 KB, 3 mahine se purani nahi). Apne exam ka notice hi final hai."
];
const FAQS = [
  { a: "SSC me photo resize karke upload kar dun?", b: "CGL / CHSL me nahi — wahan photo upload hoti hi nahi, live capture hoti hai." },
  { a: "Signature kitne KB ka ho?", b: "JPG, 10-20 KB." },
  { a: "Signature blurred ho to?", b: "Dobara saaf sign karo aur scan karo — blurred ya bahut chhota signature reject ho sakta hai." }
];

export default function SscSignature() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="SSC form: photo live capture hoti hai, signature file taiyaar karo" subtitle="CGL / CHSL ke liye — photo upload nahi, live capture; signature JPG 10-20 KB" />
      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">SSC CGL / CHSL me photograph upload nahi hoti — form bharte waqt live capture hoti hai. Jo file tumhe pehle se taiyaar karni hai, wo hai signature: JPG, 10-20 KB, saaf aur padhne layak.</p>
        </section>
        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">Try it now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">SSC preset se signature banao — photo live capture portal ke andar hoti hai, upload nahi.</p>
          <Link href="/sarkari/exam-photo-signature" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">Exam Photo-Signature Maker — SSC preset</Link>
        </PremiumCard>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Photo ke liye checklist</h2>
          <div className="mt-4 space-y-3">
            {SPECS.map((u, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-bold text-amber-200">{u.a}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{u.b}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Signature kaise taiyaar karein</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="font-extrabold text-amber-300">{i + 1}.</span><span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Ye galtiyan mat karo</h2>
          <ul className="mt-4 space-y-3">
            {MISTAKES.map((m, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">X</span><span>{m}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Aksar puche jaane wale sawaal</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold text-amber-200">{f.a}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{f.b}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">Exam Photo-Signature Maker — SSC preset</Link></li>,
            <li><Link href="/sarkari/signature-maker" className="text-amber-300 underline">Signature Maker — signature pehle banao</Link></li>,
            <li><Link href="/sarkari/ssc-photo-live-capture" className="text-amber-300 underline">SSC live-capture checklist</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
