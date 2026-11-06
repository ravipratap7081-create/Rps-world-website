import Link from "next/link";
import ModeShell from "../../../components/ModeShell";

export const metadata = {
  title: "Sarkari Guides — Hindi Step-by-Step (Photo, Signature, PDF, Forms) | ProTools",
  description:
    "Sarkari form ke liye photo resize, signature size, PDF compress, documents checklist aur upload errors — simple Hindi me step-by-step guides.",
  openGraph: {
    title: "📚 Sarkari Guides — Hindi Step-by-Step",
    description:
      "Photo resize, signature size, PDF compress, documents checklist aur upload errors — simple Hindi me step-by-step.",
    url: "https://rps-world-website.onrender.com/sarkari/guides",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/guides" },
};

const GUIDES = [
  {
    slug: "photo-resize",
    emoji: "🖼️",
    title: "Exam Photo Resize Kaise Karein",
    desc: "20KB–50KB band, sahi dimension aur JPG format — photo reject hona band.",
  },
  {
    slug: "signature-size",
    emoji: "✍️",
    title: "Signature Ka Size Sahi Kaise Karein",
    desc: "Neela pen, safed background, pixel spec aur min KB — sign reject nahi hoga.",
  },
  {
    slug: "pdf-size-ghatao",
    emoji: "📄",
    title: "PDF Ka Size 100KB / 200KB Tak Kaise Ghataayein",
    desc: "Scan DPI, compress trick aur pages verify — heavy PDF bhi form-ready.",
  },
  {
    slug: "form-documents",
    emoji: "🗂️",
    title: "Online Form Ke Liye Documents Checklist",
    desc: "Photo se lekar caste certificate tak — naam/DOB mismatch se bacho.",
  },
  {
    slug: "upload-errors",
    emoji: "🚨",
    title: "Form Upload Errors Aur Unke Fix",
    desc: '"File too large" se "Session expired" tak — har error ka matlab aur fix.',
  },
];

export default function SarkariGuidesIndex() {
  return (
    <ModeShell mode="sarkari">
      <Link
        href="/sarkari"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-400 hover:text-gold mb-4"
      >
        ← Sarkari Tools
      </Link>

      <h1 className="text-[26px] font-extrabold text-mist-100 tracking-tight mb-2">
        📚 Sarkari Guides — Hindi Step-by-Step
      </h1>
      <p className="text-[14px] text-mist-400 leading-relaxed mb-6">
        Sarkari form bharte waqt photo, signature, PDF ya upload me dikkat aati hai? Ye
        guides bilkul simple Hindi me, ek-ek step ke saath samjhati hain ki sahi tarika
        kya hai — taaki aapka form pehli baar me accept ho.
      </p>

      <div className="grid gap-3">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/sarkari/guides/${g.slug}`}
            className="pu-card pu-press p-4 flex items-center gap-4 no-underline"
          >
            <span className="text-[32px] shrink-0">{g.emoji}</span>
            <span className="flex-1">
              <span className="block text-[15px] font-bold text-mist-100">
                {g.title}
              </span>
              <span className="block text-[13px] text-mist-400 mt-1 leading-relaxed">
                {g.desc}
              </span>
            </span>
            <span className="text-gold text-[13px] font-bold whitespace-nowrap">
              Padho →
            </span>
          </Link>
        ))}

        <Link
          href="/sarkari/checklist"
          className="pu-card pu-press p-4 flex items-center gap-4 no-underline border-gold/30"
        >
          <span className="text-[32px] shrink-0">✅</span>
          <span className="flex-1">
            <span className="block text-[15px] font-bold text-mist-100">
              Form Document Checklist Tool
            </span>
            <span className="block text-[13px] text-mist-400 mt-1 leading-relaxed">
              Kaunsa document taiyaar hai, kaunsa baaki — tick mark karke track karo.
            </span>
          </span>
          <span className="text-gold text-[13px] font-bold whitespace-nowrap">
            Kholo →
          </span>
        </Link>
      </div>

      <p className="text-[11px] text-mist-600 mt-8 leading-relaxed">
        Last updated: 20 Oct 2026 • Jankari official notifications par aadharit — final
        spec hamesha official notification se confirm karein.
      </p>
    </ModeShell>
  );
}
