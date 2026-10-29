import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Compress PDF for Email Online Free — Beat the 25MB Attachment Limit | ProTools",
  description:
    "Compress a PDF for email online free: shrink scanned and heavy PDFs to 100KB, 200KB or 300KB so they pass Gmail and Outlook attachment limits. All pages stay safe, no signup.",
  keywords:
    "compress pdf for email, pdf compressor online, reduce pdf size online, pdf size reducer free, scanned pdf compressor, pdf 100kb compressor",
  openGraph: {
    title: "Compress PDF for Email Online — Free, No Signup",
    description: "Heavy PDF bouncing from email? Compress it to 100/200/300KB — all pages safe, nothing deleted, browser-only processing.",
    type: "article",
    url: `${SITE}/blog/compress-pdf-for-email-online`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "Compress PDF for Email Online — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "Compress PDF for Email Online — Free", description: "Shrink PDFs to 100/200/300KB for email — all pages safe." },
  alternates: { canonical: `${SITE}/blog/compress-pdf-for-email-online` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Compress PDF for Email Online Free — Beat the 25MB Attachment Limit",
  description: "How to compress a PDF for email: attachment limits, why scanned PDFs are heavy, and how to shrink them without losing pages.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  inLanguage: ["en"],
  mainEntityOfPage: `${SITE}/blog/compress-pdf-for-email-online`,
};

const LIMITS = [
  { svc: "Gmail", limit: "25 MB per mail (all attachments together)", tip: "A single 26 MB PDF bounces the whole mail. Compress first, then attach." },
  { svc: "Outlook / Hotmail", limit: "Around 20 MB per mail", tip: "Outlook is stricter than Gmail — aim well under 20 MB, not just under it." },
  { svc: "WhatsApp document", limit: "Large files upload slowly on mobile data", tip: "A 2 MB PDF sends in seconds; a 40 MB scan can stall. Compress even when it is technically allowed." },
  { svc: "Office / HR portals", limit: "Often 2–10 MB per file", tip: "Resume and certificate uploads usually cap at a few MB — 200–300 KB is the safe zone." },
];

const STEPS = [
  "Check the size first: on your phone, long-press the PDF and look at its size. Anything above 5 MB deserves compression before emailing.",
  "Open the free PDF compressor below and upload the PDF. It runs in your browser — the file is never sent to a server.",
  "Pick a target: 100 KB for forms, 200 KB for email, 300 KB when the PDF has fine print you must keep sharp.",
  "Download and open every page once: check that no page is missing and small text is still readable. The compressor never deletes pages, but this 10-second check saves a second mail saying 'sorry, resending'.",
];

const WHY_HEAVY = [
  "Phone scans at full resolution: a colour scan at high DPI makes every page a multi-MB photo. This is the #1 reason PDFs get heavy.",
  "Colour where greyscale would do: a black-and-white document scanned in colour is 3–5× bigger for zero extra information.",
  "Embedded fonts and images: PDFs exported from design apps carry heavy fonts and images you never see.",
  "No compression on export: some scanners and apps save PDFs uncompressed by default.",
];

const FAQS = [
  { q: "Will compression delete pages from my PDF?", a: "No. The compressor shrinks the photos inside the PDF — every page stays, in order, with the same text. Only the image quality is reduced to hit your target size." },
  { q: "What target size should I pick for email?", a: "200 KB is the sweet spot for email: small enough to pass every limit, sharp enough to read. Use 100 KB for strict forms and 300 KB for fine-print documents." },
  { q: "My scanned PDF is 40 MB. Can it really become 300 KB?", a: "Often yes, if the bulk is scan photos. Colour scans compress dramatically. If the result looks blurry, step up to a bigger target instead of forcing 100 KB." },
  { q: "Is my PDF uploaded anywhere?", a: "No — your PDF file itself is never uploaded. It is processed inside your own browser. Only the PDF engine script loads (the site's own copy first, otherwise a public CDN copy); no file content leaves your device." },
];

export default function CompressPdfForEmail() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Compress PDF for Email Online 📄" subtitle="Beat the 25MB limit — 100/200/300KB, all pages safe, free" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            A PDF that bounces from email is almost always a size problem, not a format problem. This guide
            covers <strong>the attachment limits that actually bounce your mail, why scanned PDFs get so
            heavy, and how to shrink one to 100–300 KB</strong> without losing a single page.
          </p>
        </section>

        <PremiumCard className="mb-2 !border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-amber-200">⚡ Skip the reading — compress now</h2>
          <p className="mt-2 text-[15px] text-amber-100/80">
            Free targets: 100 KB / 200 KB / 300 KB. All pages safe, nothing deleted, processed in your browser.
          </p>
          <Link href="/sarkari/pdf-compressor" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            📄 Open PDF Compressor →
          </Link>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📬 Limits that bounce your mail</h2>
          <div className="mt-4 space-y-3">
            {LIMITS.map((l, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-bold text-amber-200">{l.svc} — {l.limit}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{l.tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🔍 Why is your PDF so heavy?</h2>
          <ul className="mt-4 space-y-3">
            {WHY_HEAVY.map((w, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/75">
                <span className="text-amber-300">•</span><span>{w}</span>
              </li>
            ))}
          </ul>
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
            <li><Link href="/sarkari/pdf-compressor" className="text-amber-300 underline">📄 Free PDF Compressor — 100/200/300KB targets</Link></li>
            <li><Link href="/blog/compress-jpg-to-200kb-online" className="text-amber-300 underline">🖼️ Compress JPG to 200KB Online — WhatsApp, Email & Websites</Link></li>
            <li><Link href="/blog/passport-size-photo-maker-online" className="text-amber-300 underline">🪪 Passport Size Photo Maker Online</Link></li>
            <li><Link href="/blog/digital-signature-maker-online" className="text-amber-300 underline">✍️ Digital Signature Maker Online — Transparent PNG</Link></li>
            <li><Link href="/sarkari/guides/pdf-size-ghatao" className="text-amber-300 underline">📄 PDF Size Ghatao — Hindi Guide (Form Uploads)</Link></li>
            <li><Link href="/sarkari/guides/upload-errors" className="text-amber-300 underline">🚨 Form Upload Errors Aur Unke Fix</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
