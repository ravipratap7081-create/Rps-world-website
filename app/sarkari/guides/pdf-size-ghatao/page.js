import Link from "next/link";
import ModeShell from "../../../../components/ModeShell";

export const metadata = {
  title: "PDF Ka Size 100KB / 200KB Tak Kaise Ghataayein — Guide | Pro Universe",
  description:
    "Sarkari form ke liye PDF compress karne ka sahi tarika: 200 DPI scan, photos ka weight, pages verify aur target na mile to kya karein.",
  openGraph: {
    title: "PDF Ka Size 100KB / 200KB Tak Kaise Ghataayein",
    description:
      "200 DPI scan, compress trick aur pages verify — heavy PDF bhi form-ready. Simple Hindi step-by-step guide.",
    url: "https://rps-world-website.onrender.com/sarkari/guides/pdf-size-ghatao",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function PdfSizeGhataoGuide() {
  return (
    <ModeShell mode="sarkari">
      <Link
        href="/sarkari/guides"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-400 hover:text-gold mb-4"
      >
        ← Sarkari Guides
      </Link>

      <h1 className="text-[26px] font-extrabold text-mist-100 tracking-tight mb-2">
        📄 PDF Ka Size 100KB / 200KB Tak Kaise Ghataayein
      </h1>
      <p className="text-[14px] text-mist-400 leading-relaxed mb-6">
        Certificate, marksheet ya caste certificate ka PDF form ki limit (100KB ya 200KB)
        se bada hota hai to upload fail ho jaata hai. Ye guide batati hai size kahan se
        badhta hai aur use quality barkarar rakhte hue kaise ghataate hain.
      </p>

      <div className="pu-card p-4 mb-6">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">🧰 Zaroori cheezein</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Original PDF ya documents ki clear scan copies</li>
          <li>Notification me di gayi size limit (100KB / 200KB / 500KB — jo bhi ho)</li>
          <li>Hamara PDF Compressor tool</li>
        </ul>
      </div>

      <h2 className="text-[18px] font-bold text-mist-100 mb-3">Step-by-step</h2>
      <ol className="space-y-4 mb-6">
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            1. Pehle current size dekho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            PDF file ka size check karo — phone me file details, computer me Properties.
            Limit se file kitni badi hai, ye jaanna zaroori hai: 2MB ki file ko 200KB tak
            lana aur 300KB ki file ko 200KB tak lana — dono ka tarika alag hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            2. Scan karte waqt DPI 200 rakho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Scanner ya scan app me DPI 200 rakho. 600 DPI par scan karne se file 5–8 guna
            bhaari ho jaati hai aur form me is extra quality ki koi zaroorat nahi. Grayscale
            (black &amp; white) mode bhi size aadha kar deta hai — document colour me chahiye
            ho tabhi colour scan karo.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            3. Samjho: photos hi sabse bhaari hoti hain
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            PDF me text bahut halka hota hai — size badhane ka kaam scanned photos karti
            hain. Ek hi page ka 5MB photo-scan PDF ko 5MB bana deta hai. Isiliye compress
            karte waqt quality photo pages par hi hit hoti hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            4. PDF Compressor se target size set karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            PDF Compressor me file upload karo aur target chuno — 100KB ya 200KB, jo
            notification me likha ho. Tool photos ko sahi level tak compress karke size
            limit ke andar le aata hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            5. Pages aur quality verify karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Compressed PDF ko pura khol ke dekho: saare pages hain? Naam, roll number,
            seal aur signature padhe ja rahe hain? Agar text dhundhla ho gaya ho to ek
            level kam compress karke dobara try karo.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            6. Target na mile to kya karein
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Agar form ek hi PDF maangta hai aur size phir bhi zyada hai: (a) scan ko 150
            DPI par dobara karo, (b) blank ya duplicate pages hata do, (c) kuch portals
            alag-alag file accept karte hain — marksheet aur certificate alag-alag upload
            karne ka option ho to wahi use karo.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            7. Ek sachchi note — text PDF zyada compress nahi hota
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Agar aapki PDF pehle se hi sirf text wali hai (jaise downloaded e-certificate),
            to uska size pehle se halka hota hai aur zyada ghatega nahi — ye normal hai.
            Compress ka fayda scanned/photo wali PDFs par hi milta hai.
          </p>
        </li>
      </ol>

      <div className="pu-card p-4 mb-6 border-red-400/25">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">⚠️ Aam galtiyan</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>600 DPI par scan karna — file begajah 5MB+ ho jaati hai</li>
          <li>Compress ke baad pages check na karna — page gayab ya blur reh jaata hai</li>
          <li>Limit se bahut zyada neeche compress karna — document padhna mushkil ho jaata hai</li>
          <li>WhatsApp se bheji gayi photo ko PDF banana — quality pehle se hi kharab hoti hai</li>
        </ul>
      </div>

      <div className="pu-card p-5 mb-6">
        <h2 className="text-[16px] font-bold text-mist-100 mb-1">
          Abhi apna PDF compress karo
        </h2>
        <p className="text-[13px] text-mist-400 mb-4 leading-relaxed">
          PDF Compressor se target 100KB / 200KB set karo — size aur quality dono
          balanced.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sarkari/pdf-compressor"
            className="pu-btn-primary pu-press inline-flex px-5 py-3 rounded-xl font-bold text-sm"
          >
            PDF Compressor kholo
          </Link>
        </div>
      </div>

      <p className="text-[11px] text-mist-600 leading-relaxed">
        Last updated: 20 Oct 2026 • Jankari official notifications par aadharit — final
        spec hamesha official notification se confirm karein.
      </p>
    </ModeShell>
  );
}
