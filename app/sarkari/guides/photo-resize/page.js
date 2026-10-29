import Link from "next/link";
import ModeShell from "../../../../components/ModeShell";

export const metadata = {
  title: "Exam Photo Resize Kaise Karein — 20KB–50KB Step-by-Step Guide | ProTools",
  description:
    "Sarkari form ke liye photo ka size sahi kaise karein: KB band, pixel dimension, JPG format aur white background — simple Hindi guide.",
  openGraph: {
    title: "Exam Photo Resize Kaise Karein",
    description:
      "20KB–50KB band, sahi dimension aur JPG format — photo reject hona band. Simple Hindi step-by-step guide.",
    url: "https://rps-world-website.onrender.com/sarkari/guides/photo-resize",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function PhotoResizeGuide() {
  return (
    <ModeShell mode="sarkari">
      <Link
        href="/sarkari/guides"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-400 hover:text-gold mb-4"
      >
        ← Sarkari Guides
      </Link>

      <h1 className="text-[26px] font-extrabold text-mist-100 tracking-tight mb-2">
        🖼️ Exam Photo Resize Kaise Karein
      </h1>
      <p className="text-[14px] text-mist-400 leading-relaxed mb-6">
        Sarkari form me photo reject hona sabse aam wajah hai form atakne ki. Aksar
        photo ka size (KB), dimension ya format notification ke spec se match nahi karta.
        Is guide me dekho ki photo ko step-by-step form-ready kaise banate hain.
      </p>

      <div className="pu-card p-4 mb-6">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">🧰 Zaroori cheezein</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>White ya halke background wali recent photo (6 mahine se purani nahi)</li>
          <li>Official notification — size spec (KB band + dimension) isme milta hai</li>
          <li>Phone ya computer, aur hamara Photo Resizer tool</li>
        </ul>
      </div>

      <h2 className="text-[18px] font-bold text-mist-100 mb-3">Step-by-step</h2>
      <ol className="space-y-4 mb-6">
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            1. Notification me size spec dhundho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Har form (SSC, UPSC, Railway, UP Police) ka apna spec hota hai. Aam taur par
            photo 20KB–50KB ke beech, JPG format me maangi jaati hai. Dhyan rakho: sirf
            maximum nahi, <span className="text-mist-200 font-semibold">minimum size bhi hota hai</span> —
            bahut halki file bhi reject ho sakti hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            2. Sahi photo chuno
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Photo recent ho (6 mahine se purani nahi), background white ya halka ho, face
            seedha camera ki taraf ho aur chehra photo ke 70–80% area me dikhe. Selfie ya
            purani blur photo kabhi mat lagao.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            3. Dimension (pixel size) set karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Aam spec: 3.5cm × 4.5cm (passport ratio) ya pixels me approx 413×531 px (300
            DPI). Notification me pixels likhe hon to wahi follow karo — kai forms me
            600×600 px square photo bhi maangi jaati hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            4. Format JPG / JPEG rakho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Online forms me photo almost hamesha JPG/JPEG me maangi jaati hai. PNG, HEIC
            (iPhone ki default) ya PDF upload mat karo — "Invalid format" ka error aayega.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            5. KB band me lao — min aur max dono
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Photo Resizer me photo upload karo aur target band choose karo, jaise
            20KB–50KB. Tool photo ko bina face bigaade compress karta hai. Band ke beech
            me rakho — bahut zyada compress karne par face kharab ho jaata hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            6. Quality zoom karke check karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Compress ke baad photo ko zoom karke dekho: face saaf dikhna chahiye, blur ya
            pixelated nahi hona chahiye. Agar face kharab lage to quality thodi badha ke
            dobara resize karo.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            7. Upload se pehle file verify karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            File ka size check karo (phone me file details ya computer me right-click →
            Properties) ki band ke andar hai, aur extension .jpg hai. Galat file upload
            karne ke baad form wapas nahi aata.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            8. Final photo ka backup rakho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Final JPG ka ek copy phone me "Form Documents" folder me aur ek hamare
            Document Vault me save kar lo. Agla form bharte waqt wahi photo kaam aayegi.
          </p>
        </li>
      </ol>

      <div className="pu-card p-4 mb-6 border-red-400/25">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">⚠️ Aam galtiyan</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Selfie ya 2 saal purani photo lagana — reject hoti hai</li>
          <li>Sirf maximum KB dekhna, minimum KB ignore karna</li>
          <li>PNG ya HEIC format me upload karna</li>
          <li>Compress ke baad quality check na karna</li>
          <li>Date-stamp wali photo lagana jab notification me date maangi hi nahi ho (aur vice versa — notification padho)</li>
        </ul>
      </div>

      <div className="pu-card p-5 mb-6">
        <h2 className="text-[16px] font-bold text-mist-100 mb-1">
          Abhi apni photo form-ready banao
        </h2>
        <p className="text-[13px] text-mist-400 mb-4 leading-relaxed">
          Photo Resizer se photo ka size, dimension aur format — teeno ek saath sahi karo.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sarkari/photo-resizer"
            className="pu-btn-primary pu-press inline-flex px-5 py-3 rounded-xl font-bold text-sm"
          >
            Photo Resizer kholo
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
