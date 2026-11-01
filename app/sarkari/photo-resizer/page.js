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
      <div className="px-4 pb-8">
        <div className="max-w-md mx-auto rounded-2xl border border-dashed border-white/20 p-4 text-center">
          <p className="text-[13px] font-bold text-white/80">Sample photo — placeholder</p>
          <p className="text-[12px] text-white/50 mt-1">Is page par abhi koi sample photo host nahi hai. Apni photo upload karke tool try karein — photo aapke browser me hi process hoti hai, koi upload nahi.</p>
        </div>
      </div>
      <div className="px-4 pb-8 text-center">
        <a href="/blog/passport-size-photo-maker-online" className="text-gold underline text-[13px]">📖 Guide: Passport Size Photo Maker Online — sizes, background &amp; DPI rules</a>
        <br />
        <a href="/blog/photo-ko-50kb-100kb-me-compress-kaise-karein" className="text-gold underline text-[13px]">📖 Guide: Photo Ko 50KB Ya 100KB Me Kaise Compress Karein</a>
        <br />
        <a href="/sarkari/image-compressor" className="text-gold underline text-[13px]">🖼️ Image Compressor — custom KB target</a>
        {" • "}
        <a href="/tools/compress-photo-to-50kb" className="text-gold underline text-[13px]">Photo ko 50KB tak compress karo</a>
        {" • "}
        <a href="/sarkari/exam-photo-signature" className="text-gold underline text-[13px]">Exam Photo–Signature presets</a>
      </div>
    </>
  );
}
