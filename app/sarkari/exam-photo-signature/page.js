import Tool from "./Tool";

export const metadata = {
  title: "Exam Photo–Signature Maker — SSC, UPSC, UP Police, Railway, IBPS | Sarkari Tools",
  description:
    "Exam form ke liye photo aur signature exact size (px) aur KB band me ready karo — SSC, UPSC, UP Police, Railway RRB, IBPS presets ke saath. Specs official notifications se verified.",
  openGraph: {
    title: "Exam Photo–Signature Maker — Sarkari Tools",
    description: "Photo + signature exact exam size me — SSC, UPSC, UP Police, RRB, IBPS presets.",
    url: "https://rps-world-website.onrender.com/sarkari/exam-photo-signature",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <Tool />;
}
