import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rpsworld.in";

export const metadata = {
  title: "Photo Ko 50KB Ya 100KB Me Kaise Compress Karein — Bina Quality Kharab Kiye | ProTools",
  description: "Kisi bhi photo ko 50KB ya 100KB me laao: target chuno, quality aur width dheere-dheere kam karo, aur har baar final size check karo.",
  keywords: "photo ko 50kb me kaise karein, photo ko 100kb me compress, image compressor target kb, photo size kam karo",
  openGraph: {
    title: "Photo Ko 50KB Ya 100KB Me Kaise Compress Karein",
    description: "Target chuno, quality dheere-dheere kam karo, final size har baar check karo.",
    type: "article",
    url: `${SITE}/blog/photo-ko-50kb-100kb-me-compress-kaise-karein`,
    siteName: "ProTools",
    images: [{ url: `${SITE}/og-sarkari.png`, width: 1200, height: 630, alt: "Photo Ko 50KB Ya 100KB Me Kaise Compress Karein" }],
  },
  twitter: { card: "summary_large_image", title: "Photo Ko 50KB Ya 100KB Me Kaise Compress Karein", description: "Target chuno, quality dheere-dheere kam karo, final size har baar check karo." },
  alternates: { canonical: `${SITE}/blog/photo-ko-50kb-100kb-me-compress-kaise-karein` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Kisi bhi photo ko 50KB ya 100KB me kaise laayein",
  description: "Kisi bhi photo ko 50KB ya 100KB me laao: target chuno, quality aur width dheere-dheere kam karo, aur har baar final size check karo.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/photo-ko-50kb-100kb-me-compress-kaise-karein`,
};

const SPECS = [
  { a: "Photo chuno (JPG ya PNG)", b: "Tool photo ko tumhare browser me hi process karta hai — file kahin upload nahi hoti." },
  { a: "Target chuno", b: "Form ke liye 50KB ya 100KB, jo form maang raha hai wahi. Target set karne par quality apne aap adjust hoti hai." },
  { a: "Quality aur width adjust karo", b: "Agar target ke bina kaam kar rahe ho, to quality slider se shuru karo. Max width bhi kam kar sakte ho — form photo ke liye bahut bada width zaroori nahi hota." },
  { a: "Download karke dobara check karo", b: "File ka size dekho, aur photo kholo: chehra saaf hai, text padha ja raha hai, rang phate nahi hain? Agar nahi, to thoda bada target try karo." }
];
const STEPS = [
  "Ye tool is baare me saaf batata hai: agar sabse halki koshish bhi target se badi rahi, to wahi bataya jaata hai aur sabse halka version diya jaata hai.",
  "Us waqt max width ko 800px tak kam karke dobara try karo, ya photo ko pehle crop karo taaki faltu background nikal jaaye.",
  "Phir bhi na mile, to bada target chuno — dhundhli photo upload karne se behtar hai thodi badi saaf photo, jab tak form ka limit allow karta ho."
];
const MISTAKES = [
  "HEIC photo: iPhone ki HEIC photo is tool me nahi chalegi. Pehle use JPG me convert karo, phir compress karo.",
  "Output JPG hota hai: chahe input PNG ho, result JPG me milta hai — jo form aur email dono me aam taur par chalta hai. Agar tumhe transparent background chahiye, to ye tool nahi, Signature Maker use karo.",
  "Download ki hui file ka size check karo — purani original file to upload nahi ho gayi, ye sabse aam galti hai."
];
const FAQS = [
  { a: "50KB aur 100KB me kaunsa chunu?", b: "Jo tumhara form ya portal maang raha hai, wahi — andaze se nahi." },
  { a: "Quality kitni rakhu?", b: "Utni, jisme photo saaf dikhe. Sirf KB dekhkar quality ko bilkul neeche mat le jaao." },
  { a: "Photo bhejane ke baad bhi file too large aaye?", b: "Download ki hui file ka size check karo — aksar purani original file hi upload ho jaati hai." }
];

export default function PhotoCompressKb() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Kisi bhi photo ko 50KB ya 100KB me kaise laayein" subtitle="Bina photo kharab kiye — target, quality aur width ka sahi order" />
      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">Target size chuno, quality aur width dheere-dheere kam karo, aur har baar final size check karo. Photo ko ek hi baar me bahut zyada compress karne se wo dhundhli ho jaati hai — dheere-dheere karna hi sahi tareeka hai.</p>
        </section>
        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">Try it now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">Target set karne par quality apne aap adjust hoti hai. Photo tumhare browser me hi process hoti hai — kahin upload nahi hoti.</p>
          <Link href="/sarkari/image-compressor" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">Image Compressor — 50KB / 100KB / 200KB target</Link>
        </PremiumCard>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">4 steps</h2>
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
          <h2 className="text-2xl font-extrabold text-amber-200">Agar target na mile to</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="font-extrabold text-amber-300">{i + 1}.</span><span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Do khaas baatein</h2>
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
            <li><Link href="/sarkari/image-compressor" className="text-amber-300 underline">Image Compressor — 50KB / 100KB / 200KB target</Link></li>,
            <li><Link href="/sarkari/photo-resizer" className="text-amber-300 underline">Photo Resizer — 20KB passport preset</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
