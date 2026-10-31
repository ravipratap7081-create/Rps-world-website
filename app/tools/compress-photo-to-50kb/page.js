import Link from "next/link";
import Tool from "../../sarkari/image-compressor/Tool";

const SITE = "https://rps-world-website.onrender.com";
const URL = `${SITE}/tools/compress-photo-to-50kb`;

export const metadata = {
  title: "Compress Photo to 50KB Online Free — Form Upload Size | ProTools",
  description:
    "Compress a photo to 50KB or less online, free, without login or signup. Pick a JPG/PNG, set the 50KB target, download the result — processed in your browser, no upload.",
  keywords:
    "compress photo to 50kb, photo 50kb kaise kare, reduce photo size to 50kb, image compressor 50kb, form photo size",
  openGraph: {
    title: "Compress Photo to 50KB Online Free — No Signup",
    description:
      "Photo ko 50KB tak compress karo — form upload ke liye, free, bina login. File sirf browser me process hoti hai.",
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
      name: "Photo ko 50KB tak compress kaise kare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Photo chuno, 50KB target set karo, aur compress karo. Tool photo ko 50KB ke andar laane ki koshish karta hai aur result ka size dikhata hai — download se pehle size check karo.",
      },
    },
    {
      "@type": "Question",
      name: "Kya photo server par upload hoti hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nahi. Compression poori tarah aapke browser me hoti hai — photo aapke phone ya computer se bahar nahi jati.",
      },
    },
    {
      "@type": "Question",
      name: "Kya login ya signup chahiye?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nahi. Pehla result bina login aur bina signup milta hai. Free limit: photo input 5MB tak; badi photo ke liye Pro limit 20MB hai.",
      },
    },
    {
      "@type": "Question",
      name: "Agar photo 50KB se neeche nahi aa rahi to kya kare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Max width kam karo (jaise 1600 px ya 1200 px) ya quality thodi kam karo, aur original photo se dobara compress karo — pehle se compress ki hui file se nahi.",
      },
    },
  ],
};

export default function CompressPhotoTo50Kb() {
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
            50KB target kab chahiye?
          </h2>
          <p className="text-[14px] text-white/70 mt-2 leading-relaxed">
            Kai form aur portal photo upload ke liye 50KB ki limit rakhte hain.
            Is tool me 50KB target chuno — tool photo ko us limit ke andar
            laane ki koshish karega aur result ka asli size dikhayega. Agar
            result 50KB se bada rahe to max width kam karke original photo se
            dobara try karo.
          </p>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">4 steps</h2>
          <ol className="mt-2 space-y-2 text-[14px] text-white/70 list-decimal pl-5">
            <li>Photo chuno (JPG ya PNG).</li>
            <li>Target 50KB set karo, quality aur max width zaroorat ke hisab se rakho.</li>
            <li>Compress karo aur result ka size check karo.</li>
            <li>Download karo aur ek baar zoom karke dekh lo — chehra ya text soft lage to quality thodi badha kar original se dobara karo.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">Galtiyan jo size kharab karti hain</h2>
          <ul className="mt-2 space-y-2 text-[14px] text-white/70 list-disc pl-5">
            <li>Pehle se compress ki hui file ko dobara compress karna — har round me detail ghatti hai.</li>
            <li>Photo ke liye PNG use karna — camera photo ke liye JPG aam taur par kai guna chhota hota hai.</li>
            <li>Sabse chhota size ke peeche bhaagna — zaroorat se zyada chhota photo dhundhla dikhega.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-[20px] font-bold text-amber-200">Aur tools</h2>
          <ul className="mt-2 space-y-2 text-[14px]">
            <li><Link href="/tools/compress-pdf-to-200kb" className="text-amber-300 underline">📄 PDF ko 200KB tak compress karo</Link></li>
            <li><Link href="/tools/ssc-gd-photo-size" className="text-amber-300 underline">🪪 SSC GD photo size — 413×531 px, 20–50KB</Link></li>
            <li><Link href="/sarkari/image-compressor" className="text-amber-300 underline">🖼️ Image Compressor — 50 / 100 / 200KB targets</Link></li>
            <li><Link href="/sarkari/photo-resizer" className="text-amber-300 underline">📸 Passport photo — 20KB</Link></li>
            <li><Link href="https://pdf-merge-split-free.vercel.app" className="text-amber-300 underline">📑 PDF Merge &amp; Split — alag PDF tool (Vercel)</Link></li>
          </ul>
        </section>
        <p className="text-[12px] text-white/40">
          Note: Har form ki limit alag hoti hai — upload se pehle apne form ki
          di hui limit se result ka size milao. Ye page koi result ya approval
          ka guarantee nahi deta.
        </p>
      </article>
    </>
  );
}
