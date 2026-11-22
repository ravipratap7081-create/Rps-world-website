import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rpsworld.in";

export const metadata = {
  title: "Passport Size Photo Maker Online Free — 35×45mm, 2×2 Inch & 20KB | ProTools",
  description:
    "Make a passport size photo online free: 35×45mm, 2×2 inch aur 20KB form-ready sizes, white background rules, DPI aur printing tips.",
  keywords:
    "passport size photo maker online, passport photo maker free, 35x45mm photo online, 2x2 inch photo maker, passport photo 20kb, visa photo size online",
  openGraph: {
    title: "Passport Size Photo Maker Online — Free, No Signup",
    description: "35×45mm, 2×2 inch and 20KB sizes — white background, correct DPI, print-ready. Make it free in your browser.",
    type: "article",
    url: `${SITE}/blog/passport-size-photo-maker-online`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "Passport Size Photo Maker Online — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "Passport Size Photo Maker Online — Free", description: "35×45mm, 2×2 inch and 20KB passport photos, made free in your browser." },
  alternates: { canonical: `${SITE}/blog/passport-size-photo-maker-online` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Passport Size Photo Maker Online Free — 35×45mm, 2×2 Inch & 20KB",
  description: "How to make a passport size photo online: correct dimensions, white background rules, DPI, file size and printing.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/passport-size-photo-maker-online`,
};

const SIZES = [
  { use: "Indian passport / most govt forms", size: "2 × 2 inch (51 × 51 mm)", file: "JPG, usually under 20–50 KB", note: "The form tool preset is 413 × 531 px JPG under 20 KB." },
  { use: "Visa applications (many countries)", size: "35 × 45 mm", file: "JPG, white background", note: "Some countries want 35 × 45 mm, not 2 × 2 inch — check the visa checklist first." },
  { use: "Print (studio-style sheet)", size: "4 × 6 inch paper, multiple copies", file: "300 DPI JPG/PNG", note: "One 4 × 6 print holds several passport copies — cheaper than a studio visit." },
  { use: "Online form upload", size: "As the form demands (px + KB)", file: "JPG in most cases", note: "Never guess: read the form's photo spec line before resizing." },
];

const STEPS = [
  "Take a fresh photo against a plain white or off-white wall, in daylight, facing the camera directly. No cap, no sunglasses, no shadow on the face.",
  "Open the free photo resizer below and upload the photo. Your photo is processed in your browser only — it is never uploaded to a server.",
  "Crop so your face fills most of the frame, ears visible, head straight. Pick the size your form asks for (for example the 20 KB passport preset).",
  "Download the JPG and check two things before uploading: the pixel size and the file size in KB. If either is off, resize once more — a rejected photo costs more time than one extra check.",
];

const MISTAKES = [
  "Old photo: most forms want a photo taken in the last 6 months. A 3-year-old photo is the commonest rejection reason after wrong size.",
  "Coloured or busy background: use a plain white wall. Curtains, doors and shadows behind you get flagged.",
  "Selfie angle or tilt: hold the phone at face level, straight on. Photos taken from below or above look wrong on IDs.",
  "Over-compressed blur: if the face looks soft after shrinking, start from the original photo again instead of re-compressing the small file.",
  "Wrong size for the wrong form: a passport photo and a visa photo are not the same size. Match the form, not the last form you filled.",
];

const FAQS = [
  { q: "What is the standard passport photo size in India?", a: "Indian passport and most government forms ask for a 2 × 2 inch photo. Many online forms additionally demand a JPG under a KB limit — the free tool's passport preset gives you 413 × 531 px under 20 KB." },
  { q: "Is 35 × 45 mm the same as passport size?", a: "No. 35 × 45 mm is the visa size used by many countries; the Indian passport size is 2 × 2 inch (51 × 51 mm). Always check which one your application asks for." },
  { q: "Can I print passport photos at home?", a: "Yes. Download the resized photo, place multiple copies on a 4 × 6 inch sheet at 300 DPI, and print on photo paper. One sheet gives you several copies for a few rupees." },
  { q: "Is my photo uploaded anywhere?", a: "No. The resizer processes your photo inside your own browser. Nothing is sent to a server, which is why it works even for ID photos." },
];

export default function PassportSizePhotoMaker() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Passport Size Photo Maker Online 🪪" subtitle="35×45mm, 2×2 inch & 20KB — free, no signup, in your browser" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            A passport photo is rejected for three boring reasons: wrong size, wrong background, or an old
            photo. All three are avoidable in two minutes. This guide gives you the{" "}
            <strong>exact sizes for passport, visa and online forms</strong>, the background and DPI rules
            that matter, and a free tool that resizes your photo without uploading it anywhere.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — make your photo now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            Free passport preset: 413 × 531 px JPG under 20 KB. Processed in your browser — no upload, no signup.
          </p>
          <Link href="/sarkari/photo-resizer" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🖼️ Open Photo Resizer →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📏 Sizes at a glance</h2>
          <div className="mt-4 space-y-3">
            {SIZES.map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-bold text-amber-200">{s.use}</h3>
                <p className="mt-1 text-[14px] text-white/75"><strong>Size:</strong> {s.size}</p>
                <p className="text-[14px] text-white/75"><strong>File:</strong> {s.file}</p>
                <p className="mt-1 text-[14px] text-white/70">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📝 Make it in 4 steps</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="font-extrabold text-amber-300">{i + 1}.</span><span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🚫 5 mistakes that get photos rejected</h2>
          <ul className="mt-4 space-y-3">
            {MISTAKES.map((m, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">✗</span><span>{m}</span>
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
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/sarkari/photo-resizer" className="text-amber-300 underline">🖼️ Free Photo Resizer — 20KB passport preset</Link></li>
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">🪪 Exam Photo–Signature Maker — SSC, UPSC, Railway, Bank</Link></li>
            <li><Link href="/sarkari/up-police-photo" className="text-amber-300 underline">🚔 UP Police Photo Resizer — 50KB</Link></li>
            <li><Link href="/blog/compress-jpg-to-200kb-online" className="text-amber-300 underline">🖼️ Compress JPG to 200KB Online — WhatsApp, Email & Websites</Link></li>
            <li><Link href="/blog/compress-pdf-for-email-online" className="text-amber-300 underline">📄 Compress PDF for Email Online — Beat the 25MB Limit</Link></li>
            <li><Link href="/blog/digital-signature-maker-online" className="text-amber-300 underline">✍️ Digital Signature Maker Online — Transparent PNG</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
