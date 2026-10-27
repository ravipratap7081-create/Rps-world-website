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
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/photo-resizer" },
};

export default function Page() {
  return (
    <>
      <Tool />
      <div className="px-4 pb-8 text-center">
        <a href="/blog/passport-size-photo-maker-online" className="text-gold underline text-[13px]">📖 Guide: Passport Size Photo Maker Online — sizes, background &amp; DPI rules</a>
      </div>
    </>
  );
}
