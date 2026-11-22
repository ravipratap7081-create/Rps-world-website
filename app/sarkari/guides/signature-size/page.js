import Link from "next/link";
import ModeShell from "../../../../components/ModeShell";

export const metadata = {
  title: "Signature Ka Size Sahi Kaise Karein — Pixel Spec + KB Guide | ProTools",
  description:
    "Sarkari form ke liye signature ka sahi size: neele pen se sign, safed background, pixel spec, min KB aur JPG format — simple Hindi guide.",
  openGraph: {
    title: "Signature Ka Size Sahi Kaise Karein",
    description:
      "Neela pen, safed background, pixel spec aur min KB — sign reject nahi hoga. Simple Hindi step-by-step guide.",
    url: "https://rpsworld.in/sarkari/guides/signature-size",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rpsworld.in/sarkari/guides/signature-size" },
};

export default function SignatureSizeGuide() {
  return (
    <ModeShell mode="sarkari">
      <Link
        href="/sarkari/guides"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-400 hover:text-gold mb-4"
      >
        ← Sarkari Guides
      </Link>

      <h1 className="text-[26px] font-extrabold text-mist-100 tracking-tight mb-2">
        ✍️ Signature Ka Size Sahi Kaise Karein
      </h1>
      <p className="text-[14px] text-mist-400 leading-relaxed mb-6">
        Photo ke baad signature dusri sabse reject hone wali cheez hai. Bahut halka sign,
        galat pixel size ya background me daag — teeno se form atak sakta hai. Ye guide
        signature ko sahi tarah se taiyaar karne ka poora tarika batati hai.
      </p>

      <div className="pu-card p-4 mb-6">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">🧰 Zaroori cheezein</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Safed kagaz (bina line wala, saaf) aur neele ya kaale pen</li>
          <li>Phone camera (achhi roshni me) ya scanner</li>
          <li>Official notification — signature ka spec isme milta hai</li>
        </ul>
      </div>

      <h2 className="text-[18px] font-bold text-mist-100 mb-3">Step-by-step</h2>
      <ol className="space-y-4 mb-6">
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            1. Safed kagaz pe neele pen se sign karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Bina line wale saaf safed kagaz par neele (ya kaale) pen se apna natural
            signature karo. Pen mota ho — ball pen se halki lakeer wala sign scan me gayab
            ho jaata hai. Ek page par 3–4 baar sign karke sabse saaf wala chuno.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            2. Achhi roshni me photo khincho ya scan karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Din ki roshni me seedha upar se photo lo — shadow ya tedha angle nahi. Scanner
            ho to 200 DPI par scan karo. Photo me kagaz ke kinare dikh rahe hon to baad me
            crop kar do.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            3. Background saaf karo — white ko transparent banao
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Signature ke aas-paas ka background bilkul safed hona chahiye. Daag, shadow ya
            kagaz ki texture dikhe to Signature Maker me background clean ya transparent
            kar lo — signature sirf ink ki lakeer jaisa dikhna chahiye.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            4. Pixel spec set karo (140×60 px type)
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Signature aam taur par 3:1 ke ratio me maanga jaata hai — jaise 140×60 px ya
            300×100 px. Notification me jo pixels likhe hon, Signature Maker me wahi
            width × height set karo. Tedha ya khincha hua sign reject hota hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            5. KB band me lao — bahut halka sign reject hota hai
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Signature ka aam band 1KB–10KB ya 10KB–20KB hota hai. Yahan <span className="text-mist-200 font-semibold">minimum
            KB sabse badi problem hai</span> — bahut zyada compress karne par sign itna halka
            ho jaata hai ki system use "blank" samajh ke reject kar deta hai. Band ke beech
            me rakho, sign saaf dikhna chahiye.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            6. JPG me save karo aur file ka naam sahi rakho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Format JPG/JPEG rakho. File ka naam notification ke mutabiq do — kai portals
            SIGNATURE.JPG (bade aksharon me) maangte hain. Space ya Hindi naam wali file
            se bacho.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            7. Dobara check karo aur backup rakho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Final file ko zoom karke dekho — sign poora aur saaf dikhna chahiye, kata nahi
            hona chahiye. Size (KB) verify karke ek copy "Form Documents" folder aur
            Document Vault me save kar lo.
          </p>
        </li>
      </ol>

      <div className="pu-card p-4 mb-6 border-red-400/25">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">⚠️ Aam galtiyan</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Halki lakeer wale pen se sign karna — scan me gayab ho jaata hai</li>
          <li>Line wale notebook page par sign karna — lines background me dikhti hain</li>
          <li>Bahut zyada compress karke sign ko "blank" jaisa bana dena</li>
          <li>Sign ko khincha ya tedha karke galat ratio me save karna</li>
          <li>Purana sign dobara use karna jab notification me fresh sign maanga ho</li>
        </ul>
      </div>

      <div className="pu-card p-5 mb-6">
        <h2 className="text-[16px] font-bold text-mist-100 mb-1">
          Abhi apna signature form-ready banao
        </h2>
        <p className="text-[13px] text-mist-400 mb-4 leading-relaxed">
          Signature Maker se background clean karo, pixel spec set karo aur sahi KB band
          me save karo.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sarkari/signature-maker"
            className="pu-btn-primary pu-press inline-flex px-5 py-3 rounded-xl font-bold text-sm"
          >
            Signature Maker kholo
          </Link>
          <Link
            href="/sarkari/exam-photo-signature"
            className="inline-flex px-5 py-3 rounded-xl font-bold text-sm border border-white/15 text-mist-200 pu-press"
          >
            Exam Photo + Signature guide tool
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
