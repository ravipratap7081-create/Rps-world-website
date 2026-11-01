import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "IBPS Photo, Signature, Thumb, Declaration Size — 4 Uploads Checklist | ProTools",
  description: "IBPS PO / Clerk form me chaar alag images chahiye: photo 200x230, signature 140x60, thumb 240x240, declaration 800x400 — har ek ka apna KB band.",
  keywords: "ibps photo signature size, ibps thumb impression size, ibps handwritten declaration size, ibps clerk documents",
  openGraph: {
    title: "IBPS Four Uploads — Photo, Signature, Thumb, Declaration",
    description: "IBPS PO / Clerk: chaaron files, har ek ka pixel size aur KB band, ek checklist me.",
    type: "article",
    url: `${SITE}/blog/ibps-photo-signature-thumb-declaration-size`,
    siteName: "ProTools",
    images: [{ url: `${SITE}/og-sarkari.png`, width: 1200, height: 630, alt: "IBPS Four Uploads — Photo, Signature, Thumb, Declaration" }],
  },
  twitter: { card: "summary_large_image", title: "IBPS Four Uploads — Photo, Signature, Thumb, Declaration", description: "IBPS PO / Clerk: chaaron files, har ek ka pixel size aur KB band, ek checklist me." },
  alternates: { canonical: `${SITE}/blog/ibps-photo-signature-thumb-declaration-size` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "IBPS form: chaar uploads, ek checklist",
  description: "IBPS PO / Clerk form me chaar alag images chahiye: photo 200x230, signature 140x60, thumb 240x240, declaration 800x400 — har ek ka apna KB band.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/ibps-photo-signature-thumb-declaration-size`,
};

const SPECS = [
  { a: "Photograph — 200 x 230 px, 20-50 KB, JPG", b: "Recent colour photo, light background, face saaf dikhe. Selfie, cap ya tinted glasses nahi." },
  { a: "Signature — 140 x 60 px, 10-20 KB, JPG", b: "Black ink, white paper. Capital letters me signature accept nahi hota." },
  { a: "Left thumb impression — 240 x 240 px, 200 DPI, 20-50 KB, JPG", b: "Black ya blue ink, white paper. Poora thumb print frame ke andar dikhna chahiye." },
  { a: "Handwritten declaration — 800 x 400 px, 200 DPI, 50-100 KB, JPG", b: "English me, apne haath se, black ink se, notification ka exact text. Capital letters me ya typed text accept nahi hota, aur har shabd padhne layak hona chahiye." }
];
const STEPS = [
  "Declaration ka text apne exam ke notification se lo — purane saal ka text mat use karo, kyunki wording badal sakti hai.",
  "Signature aur declaration white paper par black ink se likho, phir saaf scan karo.",
  "Thumb impression ke liye ink zyada geela ya zyada sookha na ho — print ki lines dikhni chahiye, daag nahi.",
  "Exam tool me IBPS preset chuno aur chaaron files ek-ek karke banao. Har file ke baad size aur KB dono check karo — sahi KB par galat pixels bhi reject ho sakte hain, aur sahi pixels par galat KB bhi.",
  "Upload karne se pehle chaaron files kholo: photo me chehra kata to nahi, signature wahi hai jo exam ke din karoge, declaration ka koi shabd kata to nahi."
];
const MISTAKES = [
  "Signature wahi hona chahiye jo tum attendance sheet aur joining par karoge — alag signature baad me dikkat de sakta hai.",
  "Kuch recent IBPS cycles me uploaded photo ke saath form ke andar live photo bhi li jaati hai — uploaded photo recent aur tumhare aaj ke chehre jaisi honi chahiye.",
  "Declaration ka text apne man se badalna — exact notification text hi likhna hai, capital letters me nahi."
];
const FAQS = [
  { a: "Photo ka size kya hai?", b: "200 x 230 px, JPG, 20-50 KB." },
  { a: "Signature me capital letters chalenge?", b: "Nahi — capital letters me signature accept nahi hota." },
  { a: "Thumb impression zaroori hai?", b: "Haan — left thumb impression ek alag file ke roop me upload hoti hai, 240 x 240 px, 20-50 KB." }
];

export default function IbpsUploads() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="IBPS form: chaar uploads, ek checklist" subtitle="Photo, signature, thumb impression aur handwritten declaration — har ek ka apna size" />
      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">IBPS PO / Clerk form me chaar alag images chahiye hoti hain, har ek ka apna pixel size aur KB band hai. Ek file sahi hona kaafi nahi — chaaron ko alag-alag check karo, phir submit karo.</p>
        </section>
        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">Try it now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">IBPS preset me chaaron files ek-ek karke banao — photo, signature, thumb aur declaration.</p>
          <Link href="/sarkari/exam-photo-signature" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">Exam Photo-Signature Maker — IBPS preset</Link>
        </PremiumCard>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Chaaron files ka size</h2>
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
          <h2 className="text-2xl font-extrabold text-amber-200">Kaam ka order</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="font-extrabold text-amber-300">{i + 1}.</span><span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Do baatein jo aksar chhoot jaati hain</h2>
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
          <p className="mt-2 text-[14px] leading-relaxed text-white/70">
            ⚠️ Spec note: ye post 31 Oct 2026 ko publish hui thi — upload se
            pehle apne saal ke IBPS notification se final spec zaroor milao;
            notification hi final hai. Notification me alag size ho to{" "}
            <Link href="/sarkari/image-compressor" className="text-amber-300 underline">Image Compressor me custom KB target set karo</Link>.
          </p>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">Exam Photo-Signature Maker — IBPS preset</Link></li>,
            <li><Link href="/sarkari/signature-maker" className="text-amber-300 underline">Signature Maker — signature pehle banao</Link></li>,
            <li><Link href="/blog/ssc-signature-size-live-photo" className="text-amber-300 underline">SSC signature size aur live photo</Link></li>,
            <li><Link href="/sarkari/guides/signature-size" className="text-amber-300 underline">Guide: Signature ka size sahi kaise karein</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
