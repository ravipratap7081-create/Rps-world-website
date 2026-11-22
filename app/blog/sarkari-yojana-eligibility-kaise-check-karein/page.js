import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rpsworld.in";

export const metadata = {
  title: "Mere Liye Kaunsi Sarkari Yojana Hai — Eligibility Kaise Check Karein | ProTools",
  description: "Har yojana ke apne niyam hote hain — umra, kaam, category aur aay. Match karke dekho, sirf wahi yojanaayein dikhengi jo tum par lagu hain.",
  keywords: "sarkari yojana eligibility check, mere liye kaunsi yojana hai, government scheme kaise check karein, myscheme",
  openGraph: {
    title: "Mere Liye Kaunsi Sarkari Yojana Hai",
    description: "Chaar sawaal, phir sirf wahi yojanaayein jo tum par lagu ho sakti hain.",
    type: "article",
    url: `${SITE}/blog/sarkari-yojana-eligibility-kaise-check-karein`,
    siteName: "ProTools",
    images: [{ url: `${SITE}/og-sarkari.png`, width: 1200, height: 630, alt: "Mere Liye Kaunsi Sarkari Yojana Hai" }],
  },
  twitter: { card: "summary_large_image", title: "Mere Liye Kaunsi Sarkari Yojana Hai", description: "Chaar sawaal, phir sirf wahi yojanaayein jo tum par lagu ho sakti hain." },
  alternates: { canonical: `${SITE}/blog/sarkari-yojana-eligibility-kaise-check-karein` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mere liye kaunsi sarkari yojana hai?",
  description: "Har yojana ke apne niyam hote hain — umra, kaam, category aur aay. In baaton se match karke dekho, to sirf wahi yojanaayein dikhengi jo tum par lagu ho sakti hain.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/sarkari-yojana-eligibility-kaise-check-karein`,
};

const SPECS = [
  { a: "Apni details chuno", b: "Umra, gender, category, aay ka band aur kaam chuno — student, kisaan, business, naukri, unemployed, widow ya senior citizen." },
  { a: "List dekho", b: "Har yojana ke saath uske niyam aur official link dikhta hai." },
  { a: "Ek yojana poori padho", b: "Kaun eligible hai, kaunse documents chahiye, aur apply kahan se hoga — ye teen baatein pehle padho." },
  { a: "Official jagah se apply karo", b: "Apply hamesha official portal ya official karyalaya se karo. Jo vyakti yojana dilane ke naam par fee maange, usse bacho." }
];
const STEPS = [
  "State vs Central: kuch yojanaayein sirf ek rajya ke liye hoti hain, kuch poore desh ke liye. Apne rajya wali shart dhyaan se padho.",
  "Documents: Aadhaar, aay pramaan, category pramaan, bank details — jo yojana maang rahi hai, wahi taiyaar rakho. Adhoore documents par application atak jaati hai.",
  "Last date / window: kuch yojanaayein saal bhar khuli rehti hain, kuch ka ek fixed samay hota hai. List me dikhi yojana ka current status official page par dobara confirm karo.",
  "Central yojanaaon ke liye Government of India ka myScheme portal bhi ek official jagah hai — wahan bhi match sirf indicative hota hai, final approval vibhaag karta hai."
];
const MISTAKES = [
  "Scheme Finder me tum apna phone number nahi dete, aur tumhari details kahin bheji nahi jaati — matching tumhare device par hi hoti hai.",
  "Kisi bhi yojana site par apna OTP, bank password ya poora bank detail kabhi mat daalo.",
  "Yojana ki jaankari aur eligibility check ke liye kisi agent ki fee nahi hoti — fee maangne wala vyakti dhokha de sakta hai."
];
const FAQS = [
  { a: "Match mil gaya to kya benefit pakka hai?", b: "Nahi — match sirf possible list hai. Final approval documents aur vibhaag ke check ke baad hota hai." },
  { a: "Kya phone number dena hoga?", b: "Scheme Finder me nahi — bina phone number, bina signup kaam hota hai." },
  { a: "Official portal kaunsa hai?", b: "Har yojana ke saath uska official link diya jaata hai. Usi link se apply karo, forwarded link ya ad wale link se nahi." }
];

export default function SchemeEligibility() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Mere liye kaunsi sarkari yojana hai?" subtitle="Pehle chaar sawaal, phir list — match milna approval nahi hai" />
      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">Har yojana ke apne niyam hote hain — umra, kaam, category aur aay. In chaar baaton se match karke dekho, to tumhare saamne sirf wahi yojanaayein aayengi jo tum par lagu ho sakti hain. Match milna matlab approval nahi hai — final faisla hamesha vibhaag ke documents check ke baad hota hai.</p>
        </section>
        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">Try it now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">Umra, gender, category, aay aur kaam chuno — list tumhare device par hi banti hai.</p>
          <Link href="/sarkari/scheme-finder" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">Scheme Finder — bina phone number, bina signup</Link>
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
          <h2 className="text-2xl font-extrabold text-amber-200">Match milne ke baad kya check karein</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="font-extrabold text-amber-300">{i + 1}.</span><span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">Privacy aur dhokhe se bacho</h2>
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
            <li><Link href="/sarkari/scheme-finder" className="text-amber-300 underline">Scheme Finder</Link></li>,
            <li><Link href="/sarkari/links" className="text-amber-300 underline">Sarkari Links — sabhi official portals</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
