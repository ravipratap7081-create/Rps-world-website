import Tool from "./Tool";

export const metadata = {
  title: "Exam Photo–Signature Maker — SSC, UPSC, UP Police, Railway, IBPS | Sarkari Tools",
  description:
    "Exam form ke liye photo aur signature exact size (px) aur KB band me ready karo — SSC, UPSC, UP Police, RRB, IBPS, PAN, NTA presets.",
  openGraph: {
    title: "Exam Photo–Signature Maker — Sarkari Tools",
    description: "Photo + signature exact exam size me — SSC, UPSC, UP Police, RRB, IBPS, PAN, NTA presets.",
    url: "https://rps-world-website.onrender.com/sarkari/exam-photo-signature",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/exam-photo-signature" },
};

export default function Page() {
  return (
    <>
      <Tool />
      <div className="px-4 pb-8 text-center space-y-2">
        <a href="/blog/ssc-signature-size-live-photo" className="text-gold underline text-[13px] block">📖 Guide: SSC Signature Size — live photo, 10-20 KB signature</a>
        <a href="/blog/ibps-photo-signature-thumb-declaration-size" className="text-gold underline text-[13px] block">📖 Guide: IBPS Four Uploads — photo, signature, thumb, declaration</a>
        <a href="/blog/signature-banao-form-size-me" className="text-gold underline text-[13px] block">📖 Guide: Signature Banao, Phir Form Ke Size Me Laao</a>
      </div>
    </>
  );
}
