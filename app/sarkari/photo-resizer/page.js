import Tool from "./Tool";

export const metadata = {
  title: "Passport Photo Resizer — 20KB",
  description:
    "Passport size photo ko 20KB ke andar ready karo — 413 × 531 px JPG, form ke liye perfect. Photo browser me hi process hoti hai, koi upload nahi.",
  openGraph: {
    title: "Passport Photo Resizer — 20KB",
    description:
      "Passport size photo ko 20KB ke andar ready karo — 413 × 531 px JPG, form ke liye perfect. Photo browser me hi process hoti hai, koi upload nahi.",
    url: "https://rps-world-website.onrender.com/sarkari/photo-resizer",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <Tool />;
}
