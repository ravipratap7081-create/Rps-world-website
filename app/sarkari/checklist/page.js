import ToolPage from "../../../components/tools/ToolPage";
import Tool from "./Tool";

export const metadata = {
  title: "Document Checklist Generator — Sarkari kaam ke kagaz | RPS World Sarkari",
  description:
    "Sarkari exam, scholarship, Aadhaar, PAN, Voter ID, ration card aur Ayushman card ke liye zaroori documents ki checklist — official jaankari se bani curated list. Koi AI nahi.",
  openGraph: {
    title: "Document Checklist Generator — Sarkari kaam ke kagaz | RPS World Sarkari",
    description:
      "7 aam sarkari kaamo ke liye document checklist, photo/signature spec aur official portal link.",
    url: "https://rps-world-website.onrender.com/sarkari/checklist",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <ToolPage
      title="📋 Document Checklist Generator"
      sub="Kaam chunein — zaroori kagaz, photo spec aur official portal ki poori list yahi milegi."
    >
      <Tool />
    </ToolPage>
  );
}
