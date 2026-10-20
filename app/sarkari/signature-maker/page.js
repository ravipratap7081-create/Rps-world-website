import Tool from "./Tool";

export const metadata = {
  title: "Signature Maker — Transparent Signature PNG Free | Pro Universe",
  description:
    "Apna digital signature banao — haath se draw karo, naam type karo ya photo upload karke background transparent karo. PNG download, bina upload, 100% free.",
  openGraph: {
    title: "Signature Maker — Transparent Signature PNG Free",
    description:
      "Draw, type ya upload — signature ka transparent PNG banao aur form me lagao. File sirf browser me process hoti hai.",
    url: "https://rps-world-website.onrender.com/sarkari/signature-maker",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <Tool />;
}
