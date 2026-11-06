import Link from "next/link";
import ModeShell from "../../../../components/ModeShell";

export const metadata = {
  title: "Form Upload Errors Aur Unke Fix — File Too Large, Invalid Format | ProTools",
  description:
    "Sarkari form upload errors ka matlab aur fix: File too large, Invalid format, Dimension mismatch, blurry photo, server busy aur session expired.",
  openGraph: {
    title: "Form Upload Errors Aur Unke Fix",
    description:
      '"File too large" se "Session expired" tak — har error ka matlab aur fix. Simple Hindi guide.',
    url: "https://rps-world-website.onrender.com/sarkari/guides/upload-errors",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rps-world-website.onrender.com/sarkari/guides/upload-errors" },
};

export default function UploadErrorsGuide() {
  return (
    <ModeShell mode="sarkari">
      <Link
        href="/sarkari/guides"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-400 hover:text-gold mb-4"
      >
        ← Sarkari Guides
      </Link>

      <h1 className="text-[26px] font-extrabold text-mist-100 tracking-tight mb-2">
        🚨 Form Upload Errors Aur Unke Fix
      </h1>
      <p className="text-[14px] text-mist-400 leading-relaxed mb-6">
        Upload ke waqt English me error aata hai aur samajh nahi aata ki galti kya hai.
        Neeche 6 sabse aam errors hain — har ek ka matlab (Hindi me) aur uska fix,
        step-by-step.
      </p>

      <div className="pu-card p-4 mb-6">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">🧰 Zaroori cheezein</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Notification ka spec — size band, dimension aur format (har fix isi se match karega)</li>
          <li>Hamare tools: Photo Resizer, Signature Maker, PDF Compressor</li>
          <li>Thoda sabr — server wale errors file ki galti nahi hote</li>
        </ul>
      </div>

      <h2 className="text-[18px] font-bold text-mist-100 mb-3">Error-by-error fix</h2>
      <ol className="space-y-4 mb-6">
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            1. "File too large"
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            <span className="text-mist-200 font-semibold">Matlab:</span> Aapki file portal ki size limit se badi hai.
            <br />
            <span className="text-mist-200 font-semibold">Fix:</span> Photo/signature hai to Photo Resizer ya Signature Maker se KB
            ghatao; certificate PDF hai to PDF Compressor se target (100KB/200KB) set
            karo. Upload se pehle file ka size verify kar lo.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            2. "Invalid format"
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            <span className="text-mist-200 font-semibold">Matlab:</span> File ka type portal ko swikaar nahi — jaise PNG ya HEIC photo,
            ya JPG ki jagah PDF.
            <br />
            <span className="text-mist-200 font-semibold">Fix:</span> Photo/signature ko JPG/JPEG me aur documents ko PDF me convert
            karo. Dhyan do: sirf naam badal ke .jpg karne se kaam nahi hoga — asal
            conversion chahiye, jo hamare tools kar dete hain.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            3. "Dimension mismatch"
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            <span className="text-mist-200 font-semibold">Matlab:</span> Photo/signature ka pixel size (width × height) spec se alag
            hai — KB sahi hone par bhi ye error aata hai.
            <br />
            <span className="text-mist-200 font-semibold">Fix:</span> Notification se exact pixels note karo (jaise photo 413×531 px,
            signature 140×60 px) aur Photo Resizer / Signature Maker me wahi dimension
            set karke dobara file banao.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            4. "Photo not clear / blurry"
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            <span className="text-mist-200 font-semibold">Matlab:</span> Photo itni dhundhli hai ki face pehchana nahi ja raha — zyada
            compress ya purani blur photo iski wajah hoti hai.
            <br />
            <span className="text-mist-200 font-semibold">Fix:</span> Nayi photo lo — din ki roshni me, white background ke saamne. Phir
            resize karte waqt quality zyada rakho, KB band ke upari hisse (jaise 45KB of
            20–50KB) ke paas rakho taaki face saaf rahe.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            5. "Server busy / Please try again"
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            <span className="text-mist-200 font-semibold">Matlab:</span> Ye aapki galti nahi hai — last date ke aas-paas lakhon log ek saath
            form bharte hain aur portal overload ho jaata hai.
            <br />
            <span className="text-mist-200 font-semibold">Fix:</span> Raat 11 baje ke baad ya subah 6–8 baje try karo, jab traffic kam hota
            hai. Ek hi tab kholo, baar-baar refresh mat karo, aur last date ka intezaar
            bilkul mat karo.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            6. "Session expired"
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            <span className="text-mist-200 font-semibold">Matlab:</span> Form khole hue bahut der ho gayi — portal suraksha ke liye login
            session band kar deta hai (aam taur par 15–30 minute).
            <br />
            <span className="text-mist-200 font-semibold">Fix:</span> Form kholne se pehle saare documents ready rakho (checklist guide
            dekho), details ek notepad me likh ke rakho taaki copy-paste ho sake, aur
            form ek baithak me bhar do. Dobara login karke shuru karna padega — aadha
            bhara form save nahi hota.
          </p>
        </li>
      </ol>

      <div className="pu-card p-4 mb-6 border-red-400/25">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">⚠️ Aam galtiyan</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Error padhe bina wahi file baar-baar upload karna — result wahi milega</li>
          <li>Sirf file ka naam badal ke format fix samajhna — asal conversion zaroori hai</li>
          <li>Server busy par 10 baar refresh karna — portal aur slow ho jaata hai</li>
          <li>Form khol ke document dhundhne jaana — session expire pakka hai</li>
          <li>Last date ke din pehli baar try karna — sabse zyada traffic usi din hota hai</li>
        </ul>
      </div>

      <div className="pu-card p-5 mb-6">
        <h2 className="text-[16px] font-bold text-mist-100 mb-1">
          Error fix karne wale saare tools
        </h2>
        <p className="text-[13px] text-mist-400 mb-4 leading-relaxed">
          Jo error aaya hai, uske hisaab se tool chuno — photo, signature ya PDF, teeno
          yahi milenge.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sarkari/photo-resizer"
            className="pu-btn-primary pu-press inline-flex px-5 py-3 rounded-xl font-bold text-sm"
          >
            Photo Resizer
          </Link>
          <Link
            href="/sarkari/signature-maker"
            className="inline-flex px-5 py-3 rounded-xl font-bold text-sm border border-white/15 text-mist-200 pu-press"
          >
            Signature Maker
          </Link>
          <Link
            href="/sarkari/pdf-compressor"
            className="inline-flex px-5 py-3 rounded-xl font-bold text-sm border border-white/15 text-mist-200 pu-press"
          >
            PDF Compressor
          </Link>
          <Link
            href="/sarkari/exam-photo-signature"
            className="inline-flex px-5 py-3 rounded-xl font-bold text-sm border border-white/15 text-mist-200 pu-press"
          >
            Exam Photo + Signature
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
