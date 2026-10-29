import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "UP Police Photo Size 2026 — Tool Preset 600×760px, 50KB & Rejection Fixes | ProTools",
  description:
    "UP Police photo resizer tool preset: 600×760 px JPG under 50KB, plus photo rules and rejection fixes. NOTE: this preset is NOT verified against the current official UPPRPB notification — always cross-check your bharti notification.",
  keywords:
    "up police photo size, up police photo 50kb, up police bharti photo size, 600x760 photo, up police constable photo specification",
  openGraph: {
    title: "UP Police Photo Size 2026 — Tool Preset 600×760px, 50KB, JPG",
    description: "UP Police photo resizer tool preset, photo rules and rejection fixes. Preset NOT verified against the current official notification — cross-check yours.",
    type: "article",
    url: `${SITE}/blog/up-police-photo-size`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "UP Police Photo Size 2026 — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "UP Police Photo Size 2026 — Tool Preset 600×760px, 50KB", description: "Tool preset + rejection fixes for the UP Police bharti form photo. Preset not verified against the official notification." },
  alternates: { canonical: `${SITE}/blog/up-police-photo-size` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UP Police Photo Size 2026 — Tool Preset 600×760px, 50KB & Rejection Fixes",
  description: "UP Police photo resizer tool preset, photo rules and the fixes for common rejections. Note: this preset is NOT verified against the current official UPPRPB notification — always cross-check your bharti notification.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/up-police-photo-size`,
};

const SPECS = [
  { k: "Dimensions", v: "600 × 760 px" },
  { k: "File size", v: "Under 50 KB" },
  { k: "Format", v: "JPG" },
  { k: "Photo", v: "Recent, front-facing, plain background" },
];

const STEPS = [
  "Take a fresh photo: face the camera directly, plain light background, no cap or sunglasses, head straight.",
  "Open the free UP Police photo resizer below and upload the photo. It is processed in your browser only — never uploaded to a server.",
  "The tool crops and resizes to the 600 × 760 px preset and brings the file under 50 KB as a JPG.",
  "Before uploading to the form, verify two numbers yourself: dimensions 600 × 760 and size under 50 KB. Then check the photo looks sharp — a blurry photo can fail document verification later even if the form accepts it.",
];

const REJECTIONS = [
  "File too large: the commonest failure. A phone photo is several MB — it must be resized to under 50 KB, not just renamed.",
  "Wrong dimensions: a square passport crop is not 600 × 760. Use the UP Police preset, not a generic passport preset.",
  "Old or unclear photo: an old photo or a blurry, dark photo risks rejection at verification even after the form is submitted.",
  "Edited look: heavy filters, beautification or a tilted selfie angle. Keep it plain and front-facing.",
];

const FAQS = [
  { q: "What is the UP Police photo size for the bharti form?", a: "The resizer tool's preset is 600 × 760 px JPG under 50 KB — but this preset is NOT verified against the current official notification, and third-party guides cite the official instruction as about 35 × 45 mm, 20–50 KB. Always cross-check the photo spec line in the official notification of the specific bharti you are applying for — specs can change between notifications, and the notification wins over this page." },
  { q: "Can I use my passport photo for the UP Police form?", a: "Only if it matches the UP Police spec. A standard passport crop is a different dimension (and often a different KB band), so resize it with the UP Police preset instead of uploading it as-is." },
  { q: "My photo is 52 KB. Will the form accept it?", a: "Do not risk it — bring it under 50 KB first. A 2 KB overflow is still an overflow to an automated checker." },
  { q: "Is my photo uploaded to a server?", a: "No. The resizer processes your photo inside your own browser. Nothing is sent anywhere." },
];

export default function UpPolicePhotoSize() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="UP Police Photo Size 2026 🚔" subtitle="Tool preset 600×760px, under 50KB, JPG — free resizer, in your browser" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            The UP Police bharti form rejects photos for one reason more than any other: the file does
            not match the spec. This page gives you <strong>this tool&apos;s preset — 600 × 760 px JPG under
            50 KB</strong> — plus the photo rules and the fixes for the rejections candidates actually
            hit. One caution up front: <strong>this preset has NOT been verified against the current
            official UPPRPB notification</strong>, and third-party guides cite the official instruction
            as about 35 × 45 mm, 20–50 KB — which differs from this preset. Before uploading, read the
            photo spec line in <strong>your</strong> bharti notification: if it says 35 × 45 mm, use the
            passport preset instead of this one. The notification always wins over this page.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — resize now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            Free UP Police preset: 600 × 760 px JPG under 50 KB. Processed in your browser — no upload, no signup.
          </p>
          <Link href="/sarkari/up-police-photo" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🚔 Open UP Police Photo Resizer →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📏 Spec at a glance</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            {SPECS.map((s, i) => (
              <div key={i} className="flex gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-3 last:border-b-0">
                <span className="w-28 shrink-0 font-bold text-amber-200">{s.k}</span>
                <span className="text-[15px] text-white/75">{s.v}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-white/60">
            ⚠️ Spec source: ONLY the resizer tool&apos;s own preset — this preset is NOT verified
            against the current official UPPRPB notification, and third-party guides report the
            official instruction as about 35 × 45 mm, 20–50 KB. If your bharti notification prints
            different numbers, the notification wins — always cross-check it before uploading.
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
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/sarkari/up-police-photo" className="text-amber-300 underline">🚔 Free UP Police Photo Resizer — 50KB</Link></li>
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">🪪 Exam Photo–Signature Maker — SSC, UPSC, Railway, Bank</Link></li>
            <li><Link href="/blog/passport-size-photo-maker-online" className="text-amber-300 underline">🪪 Passport Size Photo Maker Online</Link></li>
            <li><Link href="/blog/compress-jpg-to-200kb-online" className="text-amber-300 underline">🖼️ Compress JPG to 200KB Online</Link></li>
            <li><Link href="/sarkari/guides/photo-resize" className="text-amber-300 underline">🖼️ Exam Photo Resize Guide — Hindi</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
