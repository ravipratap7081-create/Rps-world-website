import Tool from "./Tool";

export const metadata = {
  title: "Image Compressor — Photo Size Kam Karo Free | ProTools",
  description:
    "JPG/PNG photo ka size online kam karo — quality slider, max width aur 50KB/100KB/200KB target. Bina upload, 100% free.",
  openGraph: {
    title: "Image Compressor — Photo Size Kam Karo Free",
    description:
      "Photo ka size KB me kam karo — quality aur target size tumhare control me. File sirf browser me process hoti hai.",
    url: "https://rps-world-website.onrender.com/sarkari/image-compressor",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/image-compressor" },
};

export default function Page() {
  return (
    <>
      <Tool />
      <div className="px-4 pb-8 text-center">
        <a href="/blog/compress-jpg-to-200kb-online" className="text-gold underline text-[13px]">📖 Guide: Compress JPG to 200KB Online — targets for WhatsApp, email &amp; websites</a>
        <br />
        <a href="/blog/photo-ko-50kb-100kb-me-compress-kaise-karein" className="text-gold underline text-[13px]">📖 Guide: Photo Ko 50KB Ya 100KB Me Kaise Compress Karein</a>
        <br />
        <a href="/tools/compress-photo-to-50kb" className="text-gold underline text-[13px]">🖼️ Photo ko 50KB tak compress karo</a>
        {" • "}
        <a href="/tools/ssc-gd-photo-size" className="text-gold underline text-[13px]">SSC GD photo size</a>
        {" • "}
        <a href="/sarkari/photo-resizer" className="text-gold underline text-[13px]">Passport photo — 20KB</a>
      </div>
    </>
  );
}
