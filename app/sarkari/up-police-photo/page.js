import Tool from "./Tool";

export const metadata = {
  title: "UP Police Photo Resizer — 50KB",
  description:
    "UP Police bharti form ke liye photo 50KB ke andar ready karo — 600 × 760 px JPG. Photo browser me hi process hoti hai, koi upload nahi.",
  openGraph: {
    title: "UP Police Photo Resizer — 50KB",
    description:
      "UP Police bharti form ke liye photo 50KB ke andar ready karo — 600 × 760 px JPG. Photo browser me hi process hoti hai, koi upload nahi.",
    url: "https://rps-world-website.onrender.com/sarkari/up-police-photo",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/up-police-photo" },
};

export default function Page() {
  return (
    <>
      <Tool />
      <div className="px-4 pb-8 text-center">
        <a href="/blog/up-police-photo-size" className="text-gold underline text-[13px]">📖 Guide: UP Police Photo Size 2026 — preset, spec notes &amp; rejection fixes</a>
      </div>
    </>
  );
}
