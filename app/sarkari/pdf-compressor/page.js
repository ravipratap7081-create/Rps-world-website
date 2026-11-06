import Tool from "./Tool";

export const metadata = {
  title: "PDF Compressor — PDF Size Ghatao, Saare Pages Safe | Sarkari Tools",
  description:
    "PDF ke andar ki photos compress karke size ghatao — 100KB, 200KB ya 300KB target. Saare pages safe, file sirf browser me process hoti hai.",
  openGraph: {
    title: "PDF Compressor — PDF Size Ghatao, Saare Pages Safe | Sarkari Tools",
    description:
      "PDF ke andar ki photos compress karke size ghatao. Saare pages safe — koi page delete nahi hota.",
    url: "https://rps-world-website.onrender.com/sarkari/pdf-compressor",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/pdf-compressor" },
};

export default function Page() {
  return (
    <>
      <Tool />
      <div className="px-4 pb-8 text-center">
        <a href="/blog/compress-pdf-for-email-online" className="text-gold underline text-[13px]">📖 Guide: Compress PDF for Email Online — beat the 25MB limit</a>
        <br />
        <a href="/tools/compress-pdf-to-200kb" className="text-gold underline text-[13px]">📄 PDF ko 200KB tak compress karo</a>
        {" • "}
        <a href="/sarkari/guides/pdf-size-ghatao" className="text-gold underline text-[13px]">Guide: PDF ka size kaise ghataayein</a>
      </div>
    </>
  );
}
