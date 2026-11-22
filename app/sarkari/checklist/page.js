import ToolPage from "../../../components/tools/ToolPage";
import Tool from "./Tool";

export const metadata = {
  title: "Document Checklist Generator — Sarkari kaam ke kagaz | RPS World Sarkari",
  description:
    "Sarkari exam, scholarship, Aadhaar, PAN, Voter ID, ration card aur Ayushman card ke liye zaroori documents ki checklist — official jaankari se.",
  openGraph: {
    title: "Document Checklist Generator — Sarkari kaam ke kagaz | RPS World Sarkari",
    description:
      "7 aam sarkari kaamo ke liye document checklist, photo/signature spec aur official portal link.",
    url: "https://rpsworld.in/sarkari/checklist",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rpsworld.in/sarkari/checklist" },
};

export default function Page() {
  return (
    <ToolPage
      title="📋 Document Checklist Generator"
      sub="Kaam chunein — zaroori kagaz, photo spec aur official portal ki poori list yahi milegi."
    >
      <Tool />
      <div className="px-4 pb-8 text-center">
        <a href="/sarkari/guides" className="text-gold underline text-[13px]">📚 Sarkari guides — photo, signature, PDF step-by-step</a>
        <br />
        <a href="/sarkari/exam-photo-signature" className="text-gold underline text-[13px]">🪪 Exam Photo–Signature presets</a>
        {" • "}
        <a href="/sarkari/photo-resizer" className="text-gold underline text-[13px]">Passport photo resizer</a>
      </div>
    </ToolPage>
  );
}
