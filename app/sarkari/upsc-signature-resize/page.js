import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rpsworld.in";

export const metadata = {
  title: "UPSC Signature Resize: Triple Signature, 20–100 KB, 350 - 500 pixels (PDF's exact wording) | ProTools",
  description:
    "UPSC triple signature: three signatures vertically in ONE JPG named signature, 20–100 KB. Dimensions 350–500 px — PDF ki exact wording.",
  keywords:
    "upsc signature triple, upsc signature size, upsc triple signature, upsc signature 20-100 kb, upsc signature resize",
  openGraph: {
    title: "UPSC Signature Resize: Triple Signature, 20–100 KB",
    description: "UPSC triple signature: three signatures vertically in ONE JPG named signature, 20–100 KB. Image dimensions: 350 - 500 pixels — exact PDF wording.",
    type: "article",
    url: `${SITE}/sarkari/upsc-signature-resize`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "UPSC Signature Triple Resize — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "UPSC Signature Resize: Triple Signature, 20–100 KB", description: "Three signatures vertically in ONE JPG named signature. Image dimensions: 350 - 500 pixels — exact PDF wording." },
  alternates: { canonical: `${SITE}/sarkari/upsc-signature-resize` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UPSC Signature Resize: Triple Signature, 20–100 KB, 350 - 500 pixels (PDF's exact wording)",
  description: "UPSC triple signature: three signatures vertically in ONE JPG named signature, 20–100 KB. Image dimensions: 350 - 500 pixels — the PDF's exact wording, a single range with no axis split.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-29",
  dateModified: "2026-10-29",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/sarkari/upsc-signature-resize`,
};

const SPECS = [
  { k: "What to upload", v: "THREE signatures, one below the other (vertical), in ONE image" },
  { k: "Ink / paper", v: "Black ink on plain white paper (no lines or colours)" },
  { k: "Gaps / orientation", v: "Adequate gap between signatures; properly oriented (not rotated/upside down)" },
  { k: "Format / filename", v: "JPG, saved with filename signature" },
  { k: "File size", v: "20 KB – 100 KB" },
  { k: "Image dimensions", v: "Image dimensions: 350 - 500 pixels (exact PDF wording, §3(g)(ii))" },
  { k: "Quality", v: "Clear, sharp, well-lit, not blurred or dark; exactly three signatures" },
  { k: "Non-compliance", v: "Files not meeting the specs will be rejected" },
];

const STEPS = [
  "Plain white paper par black ink se apna signature teen baar, ek ke neeche ek (vertical), adequate gap ke saath sign karo.",
  "Teeno signatures ko ek hi image me scan karo — teen alag files nahi, ek JPG file.",
  "Exam Photo–Signature Maker me UPSC preset se JPG banao, filename signature, 20–100 KB ke andar. 20 KB se kam ya 100 KB se zyada par warning milegi.",
  "Upload karne se pehle gin lo: exactly teen signatures, seedha orientation, clear aur sharp — ek signature wali file yahan kaam nahi karegi.",
];

const REJECTIONS = [
  "Single signature: UPSC ko normal single signature nahi chahiye — triple signature chahiye. Sirf ek signature wali file is topic ki sabse common rejection wajah hai.",
  "File size band se bahar: 20 KB se kam ya 100 KB se zyada. Purane guides ka 20–300 KB ceiling current PDF se conflict karta hai, PDF ka 20–100 KB hi use karo.",
  "Rotated / upside-down, gap ke bina chipke hue, ya blurred/dark scan — ye sab reject ho sakte hain.",
  "140×60 px single-signature preset: ye purana guide claim hai, current PDF se conflict karta hai aur triple-signature rule ko poora nahi karta.",
];

const FAQS = [
  { q: "UPSC signature me kitne signature chahiye?", a: "Teen. UPSC ko triple signature chahiye: teen signatures, ek ke neeche ek (vertical), ek hi image me, black ink se plain white paper par. Single signature is rule ko poora nahi karta." },
  { q: "UPSC signature ka size kya hai?", a: "JPG, filename signature, 20–100 KB, aur PDF ki exact wording me: Image dimensions: 350 - 500 pixels. Ye PDF me ek single range ke roop me likha hai, isme koi axis split nahi hai — PDF width, height, ya square nahi kehta, isliye is page par bhi ise width×height ya square preset ke roop me nahi dikhaya gaya hai." },
  { q: "Signature ki image dimensions ka matlab kya hai?", a: "Official PDF §3(g)(ii) me sirf yehi wording hai: Image dimensions: 350 - 500 pixels. Isme width ya height alag se nahi bataye gaye hain, aur na hi ise square bataya gaya hai. Agar live application flow me koi axis split dikhe, to flow final hai — flow se milana mat bhoolo." },
  { q: "140×60 px wala preset chalega?", a: "Nahi. Ye purana guide/tool claim hai, current official PDF se conflict karta hai aur single signature par based hai. Current PDF ke mutabiq triple signature, 20–100 KB, aur Image dimensions: 350 - 500 pixels use karo." },
];

export default function UpscSignatureResize() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="UPSC Signature Resize: Triple Signature ✍️" subtitle="Normal single signature NAHI — teen signatures, ek JPG, 20–100 KB" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            UPSC ke liye ye warning sabse pehle: <strong>UPSC ko normal single signature nahi
            chahiye — triple signature chahiye.</strong> Teen signatures, ek ke neeche ek
            (vertical), ek hi image me, black ink se plain white paper par. Jo candidate ek
            signature upload kar deta hai, wo is topic ki sabse common rejection wajah ban
            jata hai.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            Exam: UPSC CSE / CAPF (aur wahi upload instructions wali UPSC examinations).
            Source: official UPSC instruction PDF (upsconline.nic.in), read in full aur exact
            wording 28 Oct 2026 ko dobara confirm ki gayi. Upload vs live capture: ye ek
            uploaded signature file hai. Last verification date: 28 Oct 2026.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-red-500/30 bg-gradient-to-br from-red-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-red-200">⚠️ Ek signature = rejection ka sabse common kaaran</h2>
          <p className="mt-2 text-[15px] text-red-100/80">
            File me exactly teen signatures hone chahiye. Sirf ek signature wali image triple-signature
            rule ko poora nahi karti, chahe uska size sahi hi kyun na ho.
          </p>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📏 Spec at a glance — official PDF se verified</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            {SPECS.map((s, i) => (
              <div key={i} className="flex gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-3 last:border-b-0">
                <span className="w-28 shrink-0 font-bold text-amber-200">{s.k}</span>
                <span className="text-[15px] text-white/75">{s.v}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📐 Dimensions ki exact wording — dhyaan se padho</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Official PDF §3(g)(ii) me dimensions ki wording exactly ye hai:{" "}
            <strong>“Image dimensions: 350 - 500 pixels”</strong>. PDF ise <strong>ek single
            range</strong> ke roop me likhta hai — isme <strong>koi axis split nahi hai</strong>:
            PDF width nahi kehta, height nahi kehta, aur square bhi nahi kehta. Isliye is page
            par ise width×height pair ya square preset ke roop me <strong>nahi</strong> dikhaya
            gaya hai. Agar live application flow me koi axis split dikhe, to flow final hai.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — resize now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            UPSC triple preset: ek JPG named signature, 20–100 KB, teen signatures vertical. Processed in your browser — no upload, no signup.
          </p>
          <Link href="/sarkari/exam-photo-signature" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🪪 Open Exam Photo–Signature Maker (UPSC preset) →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📝 Resize in 4 steps</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="font-extrabold text-amber-300">{i + 1}.</span><span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🚫 Rejections and their fixes</h2>
          <ul className="mt-4 space-y-3">
            {REJECTIONS.map((r, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">✗</span><span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

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
            UPSC har recruitment drive me specs badal sakta hai. Upload karne se pehle apne exam
            ke active application flow aur latest instruction PDF se milayein. Ye tool 100%
            aapke browser me chalta hai — aapka signature kisi server par upload nahi hota, na
            login chahiye, na watermark lagta hai. File aapke device par hi taiyaar hoti hai.
          </p>
          <p className="mt-3 text-[14px] text-white/60">
            Sources: UNION PUBLIC SERVICE COMMISSION — “Instructions for Uploading the Photo
            &amp; Signature” (official PDF, upsconline.nic.in, read in full 28 Oct 2026, exact
            wording re-confirmed the same day); secondary guides/tools claiming 20–300 KB and
            140×60 px — NOT in the official PDF, listed only to record the conflict.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/sarkari/upsc-photo-resize" className="text-amber-300 underline">📸 UPSC Photo Resize: 20–200 KB JPG, 75% face</Link></li>
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">🪪 Exam Photo–Signature Maker — SSC, UPSC, Railway, Bank</Link></li>
            <li><Link href="/blog/digital-signature-maker-online" className="text-amber-300 underline">✍️ Digital Signature Maker Online</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
