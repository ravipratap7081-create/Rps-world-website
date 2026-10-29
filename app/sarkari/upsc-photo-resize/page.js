import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "UPSC Photo Resize: 20–200 KB JPG, 75% face — CSE/CAPF ke liye | ProTools",
  description:
    "UPSC photo spec: JPG named photo, 20–200 KB, plain white background, face at least 75% (3/4th), both ear lobes visible. Official UPSC instruction PDF se verified, 28 Oct 2026. Live photograph capture bhi mandatory hai aur uploaded photo se match honi chahiye.",
  keywords:
    "upsc photo size, upsc photo 20-200 kb, upsc photo resize, upsc cse photo specification, upsc photo 75 percent face",
  openGraph: {
    title: "UPSC Photo Resize: 20–200 KB JPG, 75% face",
    description: "UPSC photo: JPG, 20–200 KB, plain white background, face at least 75%. Live photograph capture mandatory, uploaded photo se match honi chahiye.",
    type: "article",
    url: `${SITE}/sarkari/upsc-photo-resize`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "UPSC Photo Resize 20-200 KB — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "UPSC Photo Resize: 20–200 KB JPG, 75% face", description: "UPSC photo spec from the official instruction PDF. Live photograph capture mandatory." },
  alternates: { canonical: `${SITE}/sarkari/upsc-photo-resize` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UPSC Photo Resize: 20–200 KB JPG, 75% face — CSE/CAPF ke liye",
  description: "UPSC photo spec: JPG named photo, 20–200 KB, plain white background, face at least 75%. Official UPSC instruction PDF se verified.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-29",
  dateModified: "2026-10-29",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/sarkari/upsc-photo-resize`,
};

const SPECS = [
  { k: "Format", v: "JPG, saved with filename photo" },
  { k: "File size", v: "20 KB – 200 KB" },
  { k: "Colour / background", v: "Colour photo, plain white background (matching instruction version only — re-check per examination)" },
  { k: "Face coverage", v: "Face must cover at least 75% (3/4th) of the photo" },
  { k: "Face framing", v: "Frontal, straight, both ear lobes visible, eyes open, natural expression, no shadows on face/background" },
  { k: "Not allowed", v: "Dark background, uniform, eyes hidden under coloured/dark glasses, glare on eyeglasses, hair covering eyes, signed photograph" },
];

const STEPS = [
  "Fresh colour photo lo: plain white background, frontal, straight, dono kaan dikhte hue, aankhen khuli, natural expression.",
  "Face ko photo ka kam se kam 75% (3/4th) cover karna hai — zyada door ya zyada close crop mat karo.",
  "Exam Photo–Signature Maker me UPSC preset se JPG banao, 20–200 KB ke andar. 20 KB se kam ya 200 KB se zyada par warning milegi — us band ke bahar upload mat karo.",
  "Upload karne se pehle khud check karo: filename photo, format JPG, size 20–200 KB, white background, dono kaan visible.",
];

const REJECTIONS = [
  "File size band se bahar: 20 KB se kam ya 200 KB se zyada — dono reject ho sakte hain. Purane guides ka 20–300 KB ceiling current PDF se conflict karta hai, PDF ka 20–200 KB hi use karo.",
  "Face coverage kam: chehra photo ka 75% cover nahi karta — door se li hui photo isliye reject hoti hai.",
  "Dark background, uniform, ya aankhen chhupi hui (coloured/dark glasses, glare, baal aankhon par) — ye sab not allowed hain.",
  "Live photo mismatch: portal ke andar li gayi live photograph uploaded photo se match honi chahiye, mismatch par application aage nahi badhegi.",
];

const FAQS = [
  { q: "UPSC photo ka size kya hai?", a: "Official instruction PDF ke mutabiq: JPG, filename photo, 20–200 KB, plain white background, face kam se kam 75% (3/4th) cover kare. Ye values official PDF se verified hain, 28 Oct 2026 ko poora PDF padh kar." },
  { q: "UPSC photo ke pixels kitne hone chahiye?", a: "Official PDF me pixels prescribe nahi hain — sirf KB + face coverage hai. Tool/guide wale pixel claims (413×531 px, 550×550 px, 350×350 px) UNSOURCED hain as official dimensions, isliye unhe official-spec table me nahi dala gaya hai. Agar tool pixel option deta hai, to wo sirf helper hai, official requirement nahi." },
  { q: "Live photograph bhi deni hoti hai?", a: "Haan. UPSC application me live photograph capture mandatory hai — device webcam se ya mobile par QR scan karke, portal ke andar. Live photo aur uploaded photo match honi chahiye, mismatch par application aage nahi badhegi. Is page ka tool uploaded photo taiyaar karta hai; live capture portal ke andar hi hota hai." },
  { q: "20–300 KB wali purani guide sahi hai?", a: "Nahi. Current official PDF 20–200 KB kehta hai, purane guides ka 20–300 KB usse conflict karta hai. PDF ki value use karo." },
];

export default function UpscPhotoResize() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="UPSC Photo Resize: 20–200 KB JPG, 75% face 📸" subtitle="CSE/CAPF ke liye — official instruction PDF se verified spec" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            UPSC ka photo spec seedha hai, par do cheezein candidates aksar galat karte hain:
            face coverage aur live-photo match. Official instruction PDF ke mutabiq photo{" "}
            <strong>JPG, filename photo, 20–200 KB, plain white background</strong> honi chahiye
            aur <strong>face kam se kam 75% (3/4th)</strong> cover kare. Ye page wahi verified
            spec deta hai — pixel presets ko official table me nahi dala gaya hai, kyunki PDF me
            pixels hain hi nahi.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            Exam: UPSC CSE / CAPF (aur wahi upload instructions wali UPSC examinations). Source:
            official UPSC instruction PDF (upsconline.nic.in), read in full 28 Oct 2026. Upload
            vs live capture: uploaded photo + portal ke andar live capture, dono — aur dono ka
            match mandatory hai. Last verification date: 28 Oct 2026.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — resize now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            UPSC preset: JPG named photo, 20–200 KB, plain white background, 75% face. Processed in your browser — no upload, no signup.
          </p>
          <Link href="/sarkari/exam-photo-signature" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🪪 Open Exam Photo–Signature Maker (UPSC preset) →
          </Link>
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
          <p className="mt-3 text-[14px] text-white/60">
            ⚠️ Ye sab values official UPSC instruction PDF se VERIFIED hain (poora PDF 28 Oct
            2026 ko padha gaya). White background / framing wali baat cited instruction version
            par lagu hoti hai — apne exam ke hisaab se dobara check karo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🔧 Pixel presets — tool helper ONLY, official spec NAHI</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Official PDF KB + face coverage prescribe karta hai, pixels NAHI. Tool/guide claims
            413×531 px, 550×550 px, 350×350 px <strong>UNSOURCED hain as official
            dimensions</strong> aur isliye official-spec table me nahi hain. Agar tool koi pixel
            option deta hai, to use sirf helper samjho — label: “tool helper, not an official
            UPSC requirement”. Pixel ko official requirement samajh kar crop mat karo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📸 Live photograph — mandatory, aur match bhi mandatory</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            UPSC application me <strong>live photograph capture mandatory</strong> hai — device
            webcam se ya mobile par QR scan karke, portal ke andar. Live photo aur uploaded
            photo <strong>match honi chahiye</strong> — mismatch par application aage nahi
            badhegi. Is page ka tool uploaded photo taiyaar karta hai; live capture portal ke
            andar hi hota hai, is tool se nahi.
          </p>
        </section>

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
            aapke browser me chalta hai — aapki photo kisi server par upload nahi hoti, na login
            chahiye, na watermark lagta hai. File aapke device par hi taiyaar hoti hai.
          </p>
          <p className="mt-3 text-[14px] text-white/60">
            Sources: UNION PUBLIC SERVICE COMMISSION — “Instructions for Uploading the Photo
            &amp; Signature” (official PDF, upsconline.nic.in, read in full 28 Oct 2026);
            secondary guides/tools claiming 413×531 px, 550×550 px, 350×350 px and a 20–300 KB
            ceiling — NOT in the official PDF, listed only to record the conflict.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/sarkari/upsc-signature-resize" className="text-amber-300 underline">✍️ UPSC Signature Resize: Triple Signature, 20–100 KB</Link></li>
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">🪪 Exam Photo–Signature Maker — SSC, UPSC, Railway, Bank</Link></li>
            <li><Link href="/blog/passport-size-photo-maker-online" className="text-amber-300 underline">🪪 Passport Size Photo Maker Online</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
