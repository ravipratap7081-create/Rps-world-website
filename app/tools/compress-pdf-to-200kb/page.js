import Link from "next/link";
import Tool from "../../sarkari/pdf-compressor/Tool";

const SITE = "https://rps-world-website.onrender.com";
const URL = `${SITE}/tools/compress-pdf-to-200kb`;

export const metadata = {
  title: "Compress PDF to 200KB Online Free — Email & Portal Upload | ProTools",
  description:
    "Compress a PDF to 200KB online, free, without login or signup. Photos compress hoti hain, saare pages safe — processed in your browser.",
  keywords:
    "compress pdf to 200kb, pdf 200kb kaise kare, reduce pdf size, pdf compressor online free, pdf size kam karo",
  openGraph: {
    title: "Compress PDF to 200KB Online Free — No Signup",
    description:
      "PDF ko 200KB tak compress karo — email aur portal upload ke liye, free, bina login. Saare pages safe rehte hain.",
    type: "article",
    url: URL,
    siteName: "ProTools",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: URL },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "PDF ko 200KB tak compress kaise kare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF chuno, 200KB target set karo, aur compress karo. Tool PDF ke andar ki photos ko compress karta hai; result ka size aur saved percentage dikhata hai.",
      },
    },
    {
      "@type": "Question",
      name: "Kya PDF ke pages delete hote hain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nahi. Is tool me saare pages safe rehte hain, koi page delete nahi hota — sirf andar ki photos compress hoti hain.",
      },
    },
    {
      "@type": "Question",
      name: "Kya PDF server par upload hoti hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nahi. Processing poori tarah aapke browser me hoti hai — file aapke phone ya computer se bahar nahi jati.",
      },
    },
    {
      "@type": "Question",
      name: "Kya login ya signup chahiye?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nahi. Pehla result bina login aur bina signup milta hai. Free limit: PDF input 10MB tak; badi PDF ke liye Pro limit 25MB hai.",
      },
    },
    {
      "@type": "Question",
      name: "Agar PDF 200KB tak nahi aa rahi to kya kare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pehle 300KB target try karo — sirf text wali PDF zyada compress nahi hoti, kyunki usme compress karne layak photos hi nahi hoti. Agar PDF me scanned photos hain to 200KB aam taur par mil jata hai.",
      },
    },
  ],
};

export default function CompressPdfTo200Kb() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {/* Tool FIRST — above the fold, no login, no signup. */}
      <Tool />
      <article className="max-w-2xl mx-auto px-4 pb-10 space-y-6">
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">
            200KB target kab chahiye?
          </h2>
          <p className="text-[14px] text-white/70 mt-2 leading-relaxed">
            Email attachment aur kai portal upload ke liye PDF ka size limit
            hota hai. Is tool me 200KB target chuno — PDF ke andar ki photos
            compress hongi, saare pages waise ke waise rahenge, aur result ka
            size aur kitna bacha, ye dono dikhenge.
          </p>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">4 steps</h2>
          <ol className="mt-2 space-y-2 text-[14px] text-white/70 list-decimal pl-5">
            <li>PDF chuno (free limit 10MB tak).</li>
            <li>Target 200KB set karo.</li>
            <li>Compress karo aur result ka size check karo.</li>
            <li>Download karke ek baar PDF khol kar dekh lo — photos padhne layak honi chahiye.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">Kya dhyan rakhen</h2>
          <ul className="mt-2 space-y-2 text-[14px] text-white/70 list-disc pl-5">
            <li>Sirf text wali PDF zyada chhoti nahi hoti — usme photos hi nahi hoti jinhe compress kiya jaye.</li>
            <li>Scanned ya photo wali PDF sabse zyada compress hoti hai.</li>
            <li>Result ko upload se pehle khud check karo — size ke saath readability bhi zaroori hai.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">Aur tools</h2>
          <ul className="mt-2 space-y-2 text-[14px]">
            <li><Link href="/tools/compress-photo-to-50kb" className="text-amber-300 underline">🖼️ Photo ko 50KB tak compress karo</Link></li>
            <li><Link href="/tools/ssc-gd-photo-size" className="text-amber-300 underline">🪪 SSC GD photo size — 413×531 px, 20–50KB</Link></li>
            <li><Link href="/sarkari/pdf-compressor" className="text-amber-300 underline">📄 PDF Compressor — 100 / 200 / 300KB targets</Link></li>
            <li><Link href="https://pdf-merge-split-free.vercel.app" className="text-amber-300 underline">📑 PDF Merge &amp; Split — PDF jodna / todna (Vercel tool)</Link></li>
          </ul>
        </section>
        <p className="text-[12px] text-white/40">
          Note: Har portal ki limit alag hoti hai — upload se pehle apne
          portal ki di hui limit se result ka size milao. Ye page koi result
          ya approval ka guarantee nahi deta.
        </p>
      </article>
    </>
  );
}
