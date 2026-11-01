import Link from "next/link";
import Tool from "../../sarkari/image-compressor/Tool";

const SITE = "https://rps-world-website.onrender.com";
const URL = `${SITE}/tools/ssc-gd-photo-size`;

export const metadata = {
  title: "SSC GD Photo Size — 413×531 px, 20–50KB Photo Ready | ProTools",
  description:
    "SSC GD Constable form ke liye photo size: 3.5 cm x 4.5 cm (413x531 px), 20–50KB, JPG. Photo ko 50KB target tak compress karo aur result ka size 20–50KB band me check karo — free, bina login.",
  keywords:
    "ssc gd photo size, ssc gd photo 20-50kb, ssc gd constable photo size, 413x531 photo, ssc photo resize",
  openGraph: {
    title: "SSC GD Photo Size — 413×531 px, 20–50KB",
    description:
      "SSC GD form photo: 3.5x4.5 cm, 20–50KB. Photo compress karo aur band check karo — free, bina login.",
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
      name: "SSC GD photo ka size kya hota hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SSC GD Constable ke purane upload wale format me photo 3.5 cm x 4.5 cm (413x531 px @300 DPI), 20–50 KB, JPG hoti hai, aur photo 3 mahine se zyada purani nahi honi chahiye. Apne saal ke notification se zaroor milao, kyunki format badal sakta hai.",
      },
    },
    {
      "@type": "Question",
      name: "SSC CGL/CHSL ka photo bhi aise hi banta hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nahi. Current SSC CGL/CHSL me photo LIVE capture hoti hai (webcam / mySSC app se) — wahan pre-taken photo upload nahi hota. Ye page SSC GD ke uploaded-photo format ke liye hai; CGL/CHSL ke liye portal ke live-capture steps follow karo.",
      },
    },
    {
      "@type": "Question",
      name: "Result 20KB se kam aa jaye to kya kare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "20KB se kam result SSC GD ke minimum se neeche ho sakta hai — use mat karo. Quality ya max width thoda badha kar original photo se dobara compress karo, taaki result 20–50KB band me aaye.",
      },
    },
    {
      "@type": "Question",
      name: "Kya photo server par upload hoti hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nahi. Compression poori tarah aapke browser me hoti hai — photo aapke phone ya computer se bahar nahi jati, aur koi login ya signup nahi chahiye.",
      },
    },
  ],
};

export default function SscGdPhotoSize() {
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
            SSC GD photo spec — dhyan se padho
          </h2>
          <p className="text-[14px] text-white/70 mt-2 leading-relaxed">
            SSC GD Constable ke uploaded-photo format me photo{" "}
            <strong className="text-white">3.5 cm × 4.5 cm (413×531 px @300 DPI),
            20–50KB, JPG</strong> hoti hai, aur photo 3 mahine se zyada purani
            nahi honi chahiye. Ye jaankari official notification aur us par
            aadharit guides se li gayi hai — phir bhi apne saal ke notification
            se final spec zaroor milao, kyunki format badal sakta hai.
            (Spec source: exam preset, last checked 2026-10-20.)
          </p>
          <p className="text-[14px] text-white/70 mt-2 leading-relaxed">
            🔧 Notification me alag size diya hai?{" "}
            <Link href="/sarkari/image-compressor" className="text-amber-300 underline">Image Compressor me custom KB target aur max width khud set karo</Link>{" "}
            — koi preset zaroori nahi, bas result ka size 20–50KB band me check karo.
          </p>
          <p className="text-[14px] text-amber-300 mt-2 leading-relaxed">
            ⚠️ Alag dhyan rakho: current SSC CGL/CHSL me photo LIVE capture
            hoti hai, wahan ye upload format lagu nahi hota. Galat format ka
            tool use karne se form reject ho sakta hai.
          </p>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">Kaise ready karo</h2>
          <ol className="mt-2 space-y-2 text-[14px] text-white/70 list-decimal pl-5">
            <li>Photo ko pehle 413×531 px ke aas-paas crop karo (chehra saaf dikhe).</li>
            <li>Upar wale tool me 50KB target set karke compress karo.</li>
            <li>Result ka size check karo — <strong className="text-white">20–50KB band me hona chahiye</strong>. 20KB se kam ho to quality/width badha kar original se dobara karo; 50KB se zyada ho to width kam karo.</li>
            <li>Download karke photo ko ek baar poori size me dekh lo.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">Signature ka note</h2>
          <p className="text-[14px] text-white/70 mt-2 leading-relaxed">
            SSC ke signature ke liye alag spec hoti hai (CGL/CHSL signature:
            6.0 cm × 2.0 cm, 10–20KB) — signature ke liye{" "}
            <Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">Exam Photo–Signature tool</Link>{" "}
            use karo, jo exam-wise preset dikhata hai.
          </p>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">Aur tools</h2>
          <ul className="mt-2 space-y-2 text-[14px]">
            <li><Link href="/sarkari/exam-photo-signature" className="text-amber-300 underline">🪪 Exam Photo–Signature — SSC, UPSC, UP Police presets</Link></li>
            <li><Link href="/tools/compress-photo-to-50kb" className="text-amber-300 underline">🖼️ Photo ko 50KB tak compress karo</Link></li>
            <li><Link href="/tools/compress-pdf-to-200kb" className="text-amber-300 underline">📄 PDF ko 200KB tak compress karo</Link></li>
            <li><Link href="/sarkari/up-police-photo" className="text-amber-300 underline">🚔 UP Police photo tool</Link></li>
          </ul>
        </section>
        <p className="text-[12px] text-white/40">
          Note: Official notification hi final spec hai. Ye page aur tool koi
          form approval ya selection ka guarantee nahi deta.
        </p>
      </article>
    </>
  );
}
