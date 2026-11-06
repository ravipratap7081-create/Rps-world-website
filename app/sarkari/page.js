import SarkariClient from "./SarkariClient";

export const metadata = {
  title: "Sarkari Tools: SSC, UPSC, UP Police Photo & Signature Size",
  description: "SSC, UPSC aur UP Police form ke liye photo aur signature exact size me ready karo — free tools, no signup, file sirf browser me process hoti hai.",
  openGraph: {
    title: "Sarkari Tools: SSC, UPSC, UP Police Photo & Signature Size",
    description: "SSC, UPSC aur UP Police form ke liye photo aur signature exact size me ready karo — free tools, no signup, file sirf browser me process hoti hai.",
    url: "https://rps-world-website.onrender.com/sarkari",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Sarkari Tools: SSC, UPSC, UP Police Photo & Signature Size", description: "SSC, UPSC aur UP Police form ke liye photo aur signature exact size me ready karo — free tools, no signup, file sirf browser me process hoti hai." },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari" },
};

export default function SarkariPage() {
  return <SarkariClient />;
}
