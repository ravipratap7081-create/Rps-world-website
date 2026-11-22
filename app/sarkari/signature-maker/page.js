import Tool from "./Tool";

export const metadata = {
  title: "Signature Maker — Transparent Signature PNG Free | ProTools",
  description:
    "Apna digital signature banao — haath se draw karo, naam type karo ya photo upload karke background transparent karo. PNG download, bina upload, 100% free.",
  openGraph: {
    title: "Signature Maker — Transparent Signature PNG Free",
    description:
      "Draw, type ya upload — signature ka transparent PNG banao aur form me lagao. File sirf browser me process hoti hai.",
    url: "https://rpsworld.in/sarkari/signature-maker",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rpsworld.in/sarkari/signature-maker" },
};

export default function Page() {
  return (
    <>
      <Tool />
      <div className="px-4 pb-8 text-center">
        <a href="/blog/digital-signature-maker-online" className="text-gold underline text-[13px]">📖 Guide: Digital Signature Maker Online — transparent PNG, and its limits</a>
        <br />
        <a href="/blog/signature-banao-form-size-me" className="text-gold underline text-[13px]">📖 Guide: Signature Banao, Phir Form Ke Size Me Laao</a>
        <br />
        <a href="/sarkari/exam-photo-signature" className="text-gold underline text-[13px]">🪪 Exam Photo–Signature presets — SSC, IBPS, UPSC</a>
      </div>
    </>
  );
}
