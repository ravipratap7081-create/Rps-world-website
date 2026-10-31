import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Signature Banao, Phir Form Ke Size Me Laao — Transparent PNG Se JPG Tak | ProTools",
  description: "Signature draw, type ya upload se banao, transparent PNG download karo, phir form ke JPG aur KB band me badlo. SSC, IBPS aur UPSC triple-signature warning ke saath.",
  keywords: "signature maker online, transparent signature png, signature ko form size me kaise karein, upsc triple signature",
  openGraph: {
    title: "Signature Banao, Phir Form Ke Size Me Laao",
    description: "Draw, type ya upload — transparent PNG, phir form ka JPG aur KB band.",
    type: "article",
    url: `${SITE}/blog/signature-banao-form-size-me`,
    siteName: "ProTools",
    images: [{ url: `${SITE}/og-sarkari.png`, width: 1200, height: 630, alt: "Signature Banao, Phir Form Ke Size Me Laao" }],
  },
  twitter: { card: "summary_large_image", title: "Signature Banao, Phir Form Ke Size Me Laao", description: "Draw, type ya upload — transparent PNG, phir form ka JPG aur KB band." },
  alternates: { canonical: `${SITE}/blog/signature-banao-form-size-me` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Signature banana hai, phir form ke size me laana hai",
  description: "Signature draw, type ya upload se banao, transparent PNG download karo, phir form ke JPG aur KB band me badlo. SSC, IBPS aur UPSC triple-signature warning ke saath.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/signature-banao-form-size-me`,
};

const SPECS = [
  { a: "Draw", b: "Mouse ya finger se seedha sign karo. Canvas safed dikhta hai, lekin download hamesha transparent PNG hota hai." },
  { a: "Type", b: "Naam type karo aur style chuno. Ye jaldi kaam karta hai, lekin typed signature tumhare haath ke signature jaisa nahi dikhega." },
  { a: "Upload", b: "White paper par kiye signature ki saaf photo upload karo — background apne aap transparent ho jaata hai. Threshold slider se background saaf karo, lekin itna zyada mat badhao ki signature ke patle hisse gayab ho jaayein." }
];
const STEPS = [
  "Preview me checkerboard (chhote grey-white dabbe) ka matlab hai wahan transparent hai. Download karke signature ko kisi rang wali background par rakhkar check karo — agar safed dabba dikhe, to background abhi transparent nahi hua.",
  "Exam tool me apna form chuno: SSC ke liye JPG 10-20 KB, IBPS ke liye JPG 140 x 60 px, 10-20 KB.",
  "UPSC ke liye dhyaan rakho: wahan triple signature chahiye — teen signatures, ek ke neeche ek, ek hi JPG me, 20-100 KB. Ek signature wali file yahan kaam nahi karegi.",
  "Final file kholo aur check karo: signature poora hai, padhne layak hai, aur KB band ke andar hai."
];
const MISTAKES = [
  "Transparent PNG ko seedha exam form me upload karna, jab form JPG maang raha ho.",
  "UPSC ke liye ek signature bhejna — wahan teen chahiye, ek hi image me.",
  "Signature ko itna chhota karna ki padha hi na ja sake — KB kam karne ke chakkar me legibility mat khona."
];
const FAQS = [
  { a: "Transparent kaise check karun?", b: "Preview me checkerboard transparent hissa hai. Download karke rang wali background par rakhkar dekho." },
  { a: "Ye signature DSC ki jagah chalega?", b: "Nahi. Jahan digital signature certificate (DSC) maanga jaata hai, wahan ye image kaam nahi karegi — wahan certified DSC hi chahiye hota hai. Apne form me dekho ki kya maanga gaya hai: image upload, ya DSC." },
  { a: "Type kiya signature chalega?", b: "General e-sign ke liye haan, lekin exam form ke liye apna haath ka signature hi use karo, jo exam ke din bhi kar sako." }
];

export default function SignatureWorkflow() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Signature banana hai, phir form ke size me laana hai" subtitle="Pehle banao, phir size set karo — sirf PNG banana kaam khatam nahi karta" />
      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">Pehle signature banao (draw, type ya upload), transparent PNG download karo, phir usse apne form ke JPG aur KB band me badlo. Sirf PNG banana kaam khatam nahi karta — exam forms ko JPG aur ek fixed KB band chahiye hota hai.</p>
        </section>
        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">Try it now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">Draw, type ya upload — download hamesha transparent PNG hota hai, phir size ke liye exam tool use karo.</p>
          <Link href="/sarkari/signature-maker" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">Signature Maker</Link>
        </PremiumCard>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Signature banane ke teen tareeke</h2>
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
          <h2 className="text-2xl font-extrabold text-amber-200">Phir form ke size me badlo</h2>
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
            <li><Link href="/sarkari/signature-maker" className="text-amber-300 underline">Signature Maker</Link></li>,
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">Exam Photo-Signature Maker — form size</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
