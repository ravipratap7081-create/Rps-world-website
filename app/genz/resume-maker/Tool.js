"use client";
import { useEffect, useState } from "react";

const PRINT_CSS_ID = "genz-resume-print-css";
const PRINT_CSS = `
@media print {
  @page { margin: 12mm; }
  body * { visibility: hidden !important; }
  #resumePaper, #resumePaper * { visibility: visible !important; }
  #resumePaper {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}`;

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/60 text-mist-100 placeholder:text-mist-500";

export default function Tool() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [edu, setEdu] = useState("");
  const [skills, setSkills] = useState("");
  const [exp, setExp] = useState("");
  const [error, setError] = useState("");
  const [made, setMade] = useState(false);

  // Inject print CSS once (only #resumePaper is printed, not the app chrome).
  useEffect(() => {
    if (!document.getElementById(PRINT_CSS_ID)) {
      const st = document.createElement("style");
      st.id = PRINT_CSS_ID;
      st.textContent = PRINT_CSS;
      document.head.appendChild(st);
    }
    return () => {
      const el = document.getElementById(PRINT_CSS_ID);
      if (el) el.remove();
    };
  }, []);

  function generate() {
    if (name.trim().length < 2) {
      setError("Naam likho.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setError("Sahi 10-digit mobile number dalo (6-9 se shuru).");
      return;
    }
    if (!edu.trim() || !skills.trim()) {
      setError("Education aur Skills bharna zaroori hai.");
      return;
    }
    setError("");
    setMade(true);
  }

  function editAgain() {
    setMade(false);
  }

  function download() {
    window.print(); // print dialog → "Save as PDF"
  }

  const contact =
    "📱 " + phone.trim() + (email.trim() ? "   •   ✉️ " + email.trim() : "");
  const skillLine = skills
    .trim()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" • ");

  return (
    <div>
      <p className="text-[12px] text-mist-500 mb-4 leading-snug">
        Smart template se turant CV banta hai — <b>koi AI nahi</b>, aapki bhari details se.
        Bilkul free, koi signup nahi.
      </p>

      {!made ? (
        <div className="space-y-2 mb-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name *" className={inputCls} />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile number *"
            maxLength={10}
            inputMode="numeric"
            className={inputCls}
          />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputCls} />
          <input
            value={edu}
            onChange={(e) => setEdu(e.target.value)}
            placeholder="Education (e.g. B.A. 2nd Year, MGKVP Varanasi) *"
            className={inputCls}
          />
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Skills (comma separated: MS Word, Typing, Hindi) *"
            className={inputCls}
          />
          <textarea
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            placeholder="Experience / Projects (optional)"
            rows={2}
            className={inputCls}
          />
          {error && (
            <p className="text-[13px] text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2.5 leading-snug">
              {error}
            </p>
          )}
          <button
            onClick={generate}
            className="w-full font-extrabold py-4 rounded-2xl text-white active:scale-[0.98]"
            style={{
              background: "linear-gradient(180deg,#a855f7 0%,#7c3aed 50%,#6d28d9 100%)",
              boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
            }}
          >
            ✨ Generate My Resume
          </button>
        </div>
      ) : (
        <div>
          <div
            id="resumePaper"
            className="rounded-2xl p-8 text-sm relative overflow-hidden"
            style={{
              background: "#fff",
              color: "#1a1a1a",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.2)",
            }}
          >
            <div className="text-center border-b-2 border-purple-700 pb-3 mb-3">
              <h2 className="text-2xl font-extrabold text-purple-800">{name.trim()}</h2>
              <p className="text-gray-600 text-xs mt-1">{contact}</p>
            </div>
            <h3 className="font-bold text-purple-700 mb-1">🎓 EDUCATION</h3>
            <p className="mb-3 text-gray-800">{edu.trim()}</p>
            <h3 className="font-bold text-purple-700 mb-1">⚡ SKILLS</h3>
            <p className="mb-3 text-gray-800">{skillLine}</p>
            {exp.trim() && (
              <>
                <h3 className="font-bold text-purple-700 mb-1">💼 EXPERIENCE / PROJECTS</h3>
                <p className="mb-3 text-gray-800">{exp.trim()}</p>
              </>
            )}
            <p className="text-center text-[10px] text-gray-400 mt-4">
              Made with RPS World • rps-world-website.onrender.com
            </p>
          </div>
          <button
            onClick={download}
            className="no-print w-full font-extrabold py-4 rounded-2xl mt-3 active:scale-[0.98]"
            style={{
              background: "linear-gradient(180deg,#ffd54a 0%,#f5b301 50%,#d49400 100%)",
              color: "#1a1000",
              boxShadow: "0 8px 24px rgba(245,179,1,0.35)",
            }}
          >
            ⬇️ Download Resume (PDF)
          </button>
          <button
            onClick={editAgain}
            className="no-print w-full mt-2 py-2.5 rounded-xl text-sm font-bold text-mist-400 hover:text-mist-200"
          >
            ✏️ Edit details
          </button>
          <p className="no-print text-center text-[11px] text-mist-600 mt-2">
            Print dialog me "Save as PDF" choose karo.
          </p>
        </div>
      )}
    </div>
  );
}
