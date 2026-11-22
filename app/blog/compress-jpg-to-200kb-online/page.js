import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rpsworld.in";

export const metadata = {
  title: "Compress JPG to 200KB Online Free — For WhatsApp, Email & Websites | ProTools",
  description:
    "Compress JPG and PNG photos to 50KB, 100KB or 200KB online free — WhatsApp, email aur website uploads ke liye. No signup.",
  keywords:
    "compress jpg to 200kb, image compressor online, jpg compressor free, reduce photo size online, compress png online, photo size kam karo",
  openGraph: {
    title: "Compress JPG to 200KB Online — Free, No Signup",
    description: "Shrink JPG/PNG photos to 50/100/200KB for WhatsApp, email and websites — quality slider, browser-only processing.",
    type: "article",
    url: `${SITE}/blog/compress-jpg-to-200kb-online`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "Compress JPG to 200KB Online — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "Compress JPG to 200KB Online — Free", description: "JPG/PNG to 50/100/200KB for WhatsApp, email and websites." },
  alternates: { canonical: `${SITE}/blog/compress-jpg-to-200kb-online` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Compress JPG to 200KB Online Free — For WhatsApp, Email & Websites",
  description: "How to compress JPG and PNG photos to a target KB size without visible quality loss, for WhatsApp, email and website uploads.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/compress-jpg-to-200kb-online`,
};

const USES = [
  { use: "WhatsApp sharing", tip: "WhatsApp shrinks photos on its own, but a pre-compressed photo uploads faster on slow networks and looks the same on chat. For full quality, send it as a document instead." },
  { use: "Email attachments", tip: "Most email providers cap attachments around 20–25 MB in total. Compressing photos to 100–200 KB each lets you attach many photos in one mail without a bounce." },
  { use: "Website / portal uploads", tip: "Job portals, shop listings and classifieds often cap uploads at 200 KB–2 MB per photo. A 200 KB JPG passes almost every such limit." },
  { use: "Saving phone storage", tip: "A phone camera photo is often 3–8 MB. Compressing a copy to 200 KB before forwarding keeps the original safe and the share light." },
];

const STEPS = [
  "Pick your photo (JPG or PNG). If it is a PNG photo (not a logo), prefer JPG output — PNG files are much bigger for photographs.",
  "Open the free image compressor below and choose a target: 50 KB for strict forms, 100 KB for general sharing, 200 KB for the best balance of size and quality.",
  "Use the quality slider and max-width setting if the result is still too big: shrinking width from 4000 px to 1600 px alone often cuts size by 70% with no visible difference on a phone screen.",
  "Download and zoom into the result once. If faces or text look soft, raise quality slightly and compress again from the original — never re-compress the small file.",
];

const MISTAKES = [
  "Compressing the already-compressed file: every round loses detail. Always start from the original photo.",
  "Using PNG for photos: PNG is for logos and graphics with flat colours. For a camera photo, PNG can be 5–10× bigger than JPG.",
  "Chasing the smallest size: a 20 KB version of a detailed photo looks blurry. Pick the target the destination actually asks for — 200 KB is plenty for sharing.",
  "Upscaling a small photo: enlarging a 500 px photo to 2000 px adds no detail, only size. Compress down, never up.",
];

const FAQS = [
  { q: "What quality should I pick for WhatsApp?", a: "Around 80% quality at 1600 px width is the sweet spot: the photo looks identical on chat and the file stays near 100–200 KB." },
  { q: "Does compression reduce the photo dimensions?", a: "Only if you set a max width. Quality compression alone keeps the dimensions and shrinks the file by removing invisible detail." },
  { q: "Is my photo uploaded to a server?", a: "No. The compressor runs entirely in your browser — your photos never leave your phone or computer." },
  { q: "JPG or PNG — which one do I download?", a: "JPG for photos, PNG only for logos, signatures or images that need a transparent background." },
];

export default function CompressJpgTo200Kb() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Compress JPG to 200KB Online 🖼️" subtitle="WhatsApp, email & website uploads — free, no signup, in your browser" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            A phone photo is 3–8 MB. Most places you actually send it — WhatsApp, email, a listing site —
            want a fraction of that. This guide shows you <strong>how to compress a JPG or PNG to 50 KB,
            100 KB or 200 KB without visible quality loss</strong>, and which target to pick for each use.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — compress now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            Free targets: 50 KB / 100 KB / 200 KB, quality slider, max width. Processed in your browser — no upload, no signup.
          </p>
          <Link href="/sarkari/image-compressor" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            🖼️ Open Image Compressor →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🎯 Pick the right target for your use</h2>
          <div className="mt-4 space-y-3">
            {USES.map((u, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-bold text-amber-200">{u.use}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{u.tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📝 Compress in 4 steps</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="font-extrabold text-amber-300">{i + 1}.</span><span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🚫 4 mistakes that ruin photos</h2>
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
            <li><Link href="/sarkari/image-compressor" className="text-amber-300 underline">🖼️ Free Image Compressor — 50/100/200KB targets</Link></li>
            <li><Link href="/sarkari/photo-resizer" className="text-amber-300 underline">🪪 Photo Resizer — 20KB passport preset</Link></li>
            <li><Link href="/blog/compress-pdf-for-email-online" className="text-amber-300 underline">📄 Compress PDF for Email Online — Beat the 25MB Limit</Link></li>
            <li><Link href="/blog/passport-size-photo-maker-online" className="text-amber-300 underline">🪪 Passport Size Photo Maker Online</Link></li>
            <li><Link href="/blog/digital-signature-maker-online" className="text-amber-300 underline">✍️ Digital Signature Maker Online — Transparent PNG</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
