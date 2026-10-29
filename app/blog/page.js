import Link from "next/link";
import ModeShell from "../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Guides & Tutorials — Free Tool Guides | ProTools",
  description:
    "Step-by-step guides for ProTools free tools: passport photos, image and PDF compression, digital signatures, UP Police photo specs and Diwali creators.",
  keywords:
    "pro universe guides, photo resizer guide, pdf compressor guide, image compressor guide, signature maker guide, up police photo size",
  openGraph: {
    title: "Guides & Tutorials — ProTools",
    description: "Step-by-step guides for the free tools: sizes, limits and fixes, before you upload a form.",
    type: "website",
    url: `${SITE}/blog`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "ProTools Guides",
      },
    ],
  },
  alternates: { canonical: `${SITE}/blog` },
};

// Every article on the site, newest tool guides first. Titles match each
// article's own metadata title (minus the site suffix where shortened).
const GUIDES = [
  { href: "/blog/offer-letter-fee-check-karo", title: "Offer Letter Aaya Aur Fee Maangi Ja Rahi Hai?", desc: "Fee dene se pehle 5 free check — official number par HR call, domain match, MCA/GST match." },
  { href: "/blog/passport-size-photo-maker-online", title: "Passport Size Photo Maker Online", desc: "35×45mm, 2×2 inch & 20KB — sizes, background and DPI rules." },
  { href: "/blog/compress-jpg-to-200kb-online", title: "Compress JPG to 200KB Online", desc: "50 / 100 / 200KB targets for WhatsApp, email and websites." },
  { href: "/blog/compress-pdf-for-email-online", title: "Compress PDF for Email Online", desc: "Beat the 25MB attachment limit — 100 / 200 / 300KB, all pages safe." },
  { href: "/blog/digital-signature-maker-online", title: "Digital Signature Maker Online", desc: "Draw, type or upload — transparent PNG e-sign, and its limits." },
  { href: "/blog/up-police-photo-size", title: "UP Police Photo Size 2026", desc: "Tool preset, spec notes and rejection fixes — with an official-spec caveat." },
  { href: "/blog/diwali-business-promotion-ideas", title: "10 Diwali Business Promotion Ideas", desc: "Sale kaise badhaye 2026 — 10 practical ideas." },
  { href: "/blog/diwali-card-ideas", title: "15 Diwali Card Design Ideas 2026", desc: "Creative greeting card inspiration." },
  { href: "/blog/diwali-poster-maker-online", title: "Diwali Poster Maker Online", desc: "Free vs paid, kaise banaye 2026." },
  { href: "/blog/diwali-wishes-2026", title: "100+ Happy Diwali Wishes 2026", desc: "Shayari, quotes & greeting messages." },
  { href: "/blog/shubh-deepavali-wishes-hindi", title: "50+ Shubh Deepavali Shubhkamnayein", desc: "Hindi Diwali wishes, shayari & messages." },
];

export default function BlogIndex() {
  return (
    <ModeShell mode="genz">
      <PageHeader title="Guides & Tutorials 📚" subtitle="Step-by-step guides for the free tools — sizes, limits and fixes" />
      <div className="space-y-3">
        {GUIDES.map((g) => (
          <PremiumCard key={g.href}>
            <Link href={g.href} className="block">
              <div className="font-semibold text-mist-100 text-[15px] leading-tight">{g.title}</div>
              <div className="text-mist-500 text-[13px] mt-1 leading-snug">{g.desc}</div>
            </Link>
          </PremiumCard>
        ))}
      </div>
      <p className="text-mist-500 text-[13px] mt-5 leading-relaxed">
        Looking for a tool directly? Open the{" "}
        <Link href="/sarkari" className="text-gold underline">Sarkari tools hub</Link> — every
        free tool is listed there.
      </p>
    </ModeShell>
  );
}
