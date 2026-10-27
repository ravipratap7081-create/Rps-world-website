import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Digital Signature Maker Online Free — Transparent PNG E-Sign | Pro Universe",
  description:
    "Create a digital signature online free: draw it, type your name, or upload a photo and get a transparent PNG signature for documents, PDFs and business letters. No signup.",
  keywords:
    "digital signature maker online, e signature maker free, signature maker png, transparent signature png, online signature creator, sign maker free",
  openGraph: {
    title: "Digital Signature Maker Online — Free Transparent PNG",
    description: "Draw, type or upload your signature — download a transparent PNG for documents and PDFs. Free, no signup.",
    type: "article",
    url: `${SITE}/blog/digital-signature-maker-online`,
    siteName: "Pro Universe",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "Digital Signature Maker Online — Pro Universe",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "Digital Signature Maker Online — Free", description: "Transparent PNG e-signature: draw, type or upload." },
  alternates: { canonical: `${SITE}/blog/digital-signature-maker-online` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Digital Signature Maker Online Free — Transparent PNG E-Sign",
  description: "How to create a digital signature online: draw, type or upload, transparent PNG output, and where you can and cannot use it.",
  author: { "@type": "Organization", name: "Pro Universe", url: SITE },
  publisher: { "@type": "Organization", name: "Pro Universe" },
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/digital-signature-maker-online`,
};

const METHODS = [
  { m: "Draw it (best match to your real sign)", d: "Draw with your finger on a phone or a mouse on a computer. Do it 3–4 times and keep the cleanest one — your first attempt is rarely your best." },
  { m: "Type your name in a script font", d: "Fastest option and looks neat on typed letters. Best for internal documents and business letters where a formal look matters more than a handwritten match." },
  { m: "Upload a photo of your paper signature", d: "Sign on plain white paper with a dark blue or black pen, photograph it in bright light, and let the tool remove the white background. Closest to your real signature." },
];

const USES = [
  "Business letters, quotations and invoices you send as PDF or Word files.",
  "School, coaching and shop notices where a signed look adds trust.",
  "Cover letters and applications that ask for a signature image (not a certified e-sign).",
  "WhatsApp business documents — a PNG signature pasted on a letter photo looks professional.",
];

const STEPS = [
  "Choose your method: draw, type, or upload a photo of your signature on white paper.",
  "If uploading a photo: use bright, even light and a dark pen. Shadows and ruled lines make background removal messy.",
  "Download the transparent PNG. Transparency is the point — a white-box signature pasted on a coloured letter looks fake.",
  "Place the PNG on your document with any document or PDF editor, sized like a real signature (not huge, not tiny), then export the final PDF.",
];

const LIMITS = [
  "A PNG signature is an image of your signature, not a legally certified digital signature. For court, bank KYC or government e-sign, use a licensed e-sign service instead.",
  "Never share your signature PNG publicly or with strangers — anyone with the image can paste it on any document.",
  "If a form asks for a signature in exact pixels and KB (exam forms do), use the exam signature specs, not this general maker.",
];

const FAQS = [
  { q: "Is a transparent PNG better than a JPG signature?", a: "Yes, for documents. A JPG always carries a white box around the signature; a transparent PNG sits cleanly on any background colour or letterhead." },
  { q: "Which pen colour photographs best?", a: "Dark blue or black on plain white paper, in bright daylight. Avoid gel pens that shine and ruled notebooks that add lines." },
  { q: "Can I use this for exam forms?", a: "Exam forms need exact pixel and KB specs — use the dedicated exam signature tool for those. This maker is for general documents and business letters." },
  { q: "Is my signature uploaded anywhere?", a: "No. The maker runs entirely in your browser — your signature image never leaves your device." },
];

export default function DigitalSignatureMaker() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Digital Signature Maker Online ✍️" subtitle="Transparent PNG e-sign — draw, type or upload, free" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            Every business letter, quotation and application looks more serious with a signature — but
            scanning, cropping and cleaning one by hand takes forever. This guide shows you{" "}
            <strong>how to create a clean digital signature in a minute</strong> and get it as a
            transparent PNG you can paste on any document.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — make your signature now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            Draw, type or upload — transparent PNG download. Processed in your browser — no upload, no signup.
          </p>
          <Link href="/sarkari/signature-maker" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            ✍️ Open Signature Maker →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">✍️ Three ways to make it</h2>
          <div className="mt-4 space-y-3">
            {METHODS.map((x, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-bold text-amber-200">{x.m}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{x.d}</p>
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
          <h2 className="text-2xl font-extrabold text-amber-200">📌 Where it works — and where it does not</h2>
          <ul className="mt-4 space-y-3">
            {USES.map((u, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-emerald-300">✓</span><span>{u}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-3">
            {LIMITS.map((l, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">⚠</span><span>{l}</span>
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
            <li><Link href="/sarkari/signature-maker" className="text-amber-300 underline">✍️ Free Signature Maker — Transparent PNG</Link></li>
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">🪪 Exam Photo–Signature Maker — exact exam specs</Link></li>
            <li><Link href="/sarkari/guides/signature-size" className="text-amber-300 underline">✍️ Signature Size Guide — Hindi (Exam Specs)</Link></li>
            <li><Link href="/blog/passport-size-photo-maker-online" className="text-amber-300 underline">🪪 Passport Size Photo Maker Online</Link></li>
            <li><Link href="/blog/compress-jpg-to-200kb-online" className="text-amber-300 underline">🖼️ Compress JPG to 200KB Online</Link></li>
            <li><Link href="/blog/compress-pdf-for-email-online" className="text-amber-300 underline">📄 Compress PDF for Email Online</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
