import Link from "next/link";
import ModeShell from "../../../../components/ModeShell";

export const metadata = {
  title: "Online Form Ke Liye Documents Checklist — Guide | ProTools",
  description:
    "Sarkari form se pehle kaun se documents taiyaar rakhein: list, scan quality, naam/DOB mismatch ki sabse badi galti aur file naming.",
  openGraph: {
    title: "Online Form Ke Liye Documents Checklist",
    description:
      "Form se pehle documents ki list, scans ki quality aur naam/DOB mismatch se bachav — simple Hindi guide.",
    url: "https://rpsworld.in/sarkari/guides/form-documents",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rpsworld.in/sarkari/guides/form-documents" },
};

export default function FormDocumentsGuide() {
  return (
    <ModeShell mode="sarkari">
      <Link
        href="/sarkari/guides"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-400 hover:text-gold mb-4"
      >
        ← Sarkari Guides
      </Link>

      <h1 className="text-[26px] font-extrabold text-mist-100 tracking-tight mb-2">
        🗂️ Online Form Ke Liye Documents Checklist
      </h1>
      <p className="text-[14px] text-mist-400 leading-relaxed mb-6">
        Form bharte waqt beech me document dhundhne jaane se session expire ho jaata hai
        aur poora form dobara bharna padta hai. Form kholne se <span className="text-mist-200 font-semibold">pehle</span> saare
        documents taiyaar rakhna hi sabse badi samajhdari hai. Ye checklist wahi batati hai.
      </p>

      <div className="pu-card p-4 mb-6">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">🧰 Zaroori cheezein</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Official notification (documents ki final list isme hoti hai)</li>
          <li>Original documents ya unki pehle se ki gayi clear scan copies</li>
          <li>Phone me ek "Form Documents" naam ka folder</li>
        </ul>
      </div>

      <h2 className="text-[18px] font-bold text-mist-100 mb-3">Step-by-step</h2>
      <ol className="space-y-4 mb-6">
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            1. Notification se documents ki list nikalo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Har form ki list alag hoti hai. Aam taur par ye documents maange jaate hain:
            photo, signature, 10th ki marksheet (DOB proof), 12th/graduation marksheet,
            Aadhaar card, caste certificate (SC/ST/OBC/EWS), domicile (niwas praman patra)
            aur category ke hisaab se income certificate. Notification ki list ko final
            maano.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            2. Scans ki quality theek karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Scan 200 DPI par, achhi roshni me karo. Document ke chaaro kinare dikhne
            chahiye, koi hissa kata nahi hona chahiye, aur seal/signature saaf padhne
            layak hone chahiye. WhatsApp par aayi hui photo-scan mat use karo — quality
            kharab hoti hai.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            3. Naam aur DOB har jagah ek jaisa rakho — sabse badi problem
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Aadhaar card aur marksheet me naam ya janm tithi alag ho to verification me
            form reject ho jaata hai — ye sabse badi aur sabse aam problem hai. Form
            bharne se pehle dono documents mila ke dekho: spelling, pita ka naam aur DOB
            bilkul same hone chahiye. Mismatch ho to pehle correction karwao, form baad me.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            4. Har file ka sahi size aur format taiyaar karo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Photo aur signature JPG me (apne-apne KB band me), certificates PDF me (100KB
            / 200KB limit ke andar). Ye kaam form kholne se pehle hi kar lo — beech form
            me compress karne jaoge to session expire ho jayega.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            5. File naming sahi rakho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Files ke naam saaf aur English me rakho: photo.jpg, signature.jpg,
            marksheet10.pdf, caste.pdf. Hindi naam, space ya ajeeb character wali file kai
            portals par upload fail kar deti hai. Kuch portals apna naming format dete
            hain — notification me ho to wahi follow karo.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            6. Ek folder me sab ready rakho
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Saari taiyaar files ko phone/computer me ek hi "Form Documents" folder me
            rakho. Form bharte waqt har file ek click me mil jayegi — na gallery dhundhna
            padega, na WhatsApp scroll karna padega.
          </p>
        </li>
        <li className="pu-card p-4">
          <p className="text-[14px] font-bold text-mist-100 mb-1">
            7. Checklist se tick karke form kholo
          </p>
          <p className="text-[13px] text-mist-400 leading-relaxed">
            Hamare Checklist tool me ek-ek document tick karo. Jo baaki hai pehle use
            taiyaar karo, phir form kholo. Sab tick ho jaye to form ek baar me, bina
            atke, bhar jayega.
          </p>
        </li>
      </ol>

      <div className="pu-card p-4 mb-6 border-red-400/25">
        <h2 className="text-[15px] font-bold text-mist-100 mb-3">⚠️ Aam galtiyan</h2>
        <ul className="text-[13px] text-mist-300 space-y-1.5 leading-relaxed list-disc pl-5">
          <li>Aadhaar aur marksheet me naam/DOB mismatch — verification reject ki sabse badi wajah</li>
          <li>Form beech me chhod ke document taiyaar karne jaana — session expire</li>
          <li>Expired ya purana caste/income certificate lagana — validity date check karo</li>
          <li>Files alag-alag jagah bikhri rakhna — upload ke waqt milti hi nahi</li>
          <li>Notification ki document list padhe bina purani list se kaam chalana</li>
        </ul>
      </div>

      <div className="pu-card p-5 mb-6">
        <h2 className="text-[16px] font-bold text-mist-100 mb-1">
          Checklist banao aur documents surakshit rakho
        </h2>
        <p className="text-[13px] text-mist-400 mb-4 leading-relaxed">
          Checklist tool se taiyaari track karo, aur saare documents Document Vault me
          encrypted save rakho — agle form me sab ready milega.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sarkari/checklist"
            className="pu-btn-primary pu-press inline-flex px-5 py-3 rounded-xl font-bold text-sm"
          >
            Checklist tool kholo
          </Link>
          <Link
            href="/sarkari/vault"
            className="inline-flex px-5 py-3 rounded-xl font-bold text-sm border border-white/15 text-mist-200 pu-press"
          >
            Document Vault kholo
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
