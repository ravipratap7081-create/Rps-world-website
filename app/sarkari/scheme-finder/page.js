import ToolPage from "../../../components/tools/ToolPage";
import Tool from "./Tool";

export const metadata = {
  title: "Scheme Finder — Aapke liye sarkari yojana | RPS World Sarkari",
  description:
    "Koi AI nahi — official sarkari jaankari se bani curated list. Umra, kaam, category aur aay ke hisaab se possible schemes dekhein.",
  openGraph: {
    title: "Scheme Finder — Aapke liye sarkari yojana | RPS World Sarkari",
    description:
      "Curated official schemes ki list — bina AI, bina phone number. Details aapke phone me hi rehti hai.",
    url: "https://rps-world-website.onrender.com/sarkari/scheme-finder",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/scheme-finder" },
};

export default function Page() {
  return (
    <>
      <ToolPage
        title="🎓 Scheme Finder"
        sub="4 sawalo ke jawab dein — aapke liye possible sarkari yojanaao ki list yahi dikhegi."
      >
        <Tool />
      </ToolPage>
      <div className="px-4 pb-8 text-center">
        <a href="/blog/sarkari-yojana-eligibility-kaise-check-karein" className="text-gold underline text-[13px]">📖 Guide: Mere Liye Kaunsi Sarkari Yojana Hai — eligibility kaise check karein</a>
        <br />
        <a href="/sarkari/links" className="text-gold underline text-[13px]">🔗 Sarkari portal links</a>
        {" • "}
        <a href="/sarkari/checklist" className="text-gold underline text-[13px]">📋 Document checklist</a>
      </div>
    </>
  );
}
