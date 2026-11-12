"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrivacyChoicesLink from "../components/PrivacyChoicesLink";

const MODES = ["sarkari", "genz", "parivaar"];

// Home page — ungated landing (traffic fix, 31 Oct 2026).
// BEFORE: every first-time visitor (and every crawler, which has no
// localStorage) was auto-redirected to /onboarding, so / never showed a
// tool and Google never saw tool content on the homepage. That redirect
// was the homepage gate behind the "top pages are onboarding/login"
// traffic pattern.
// AFTER: returning visitors with a stored mode still go straight to their
// mode (old behaviour preserved). New visitors and crawlers see a real
// landing page with the tools linked above the fold — no login, no signup,
// no mode choice required to reach a first free result.
export default function Home() {
  const router = useRouter();
  const [storedMode, setStoredMode] = useState(null);

  useEffect(() => {
    try {
      const m = localStorage.getItem("pro-mode");
      if (m && MODES.includes(m)) {
        setStoredMode(m);
        router.replace("/" + m);
        return;
      }
    } catch (e) {}
  }, [router]);

  // Server-rendered by default (12 Nov 2026, audit P1-4/P2-5): the tools
  // grid, mode picker and footer are real content, so they must be in the
  // initial HTML for crawlers and no-JS visitors. The old `loaded` gate
  // rendered only a "RPS World…" pulse server-side and hid all of this
  // until useEffect ran. Returning visitors with a stored pro-mode are
  // still redirected by the effect above (they see the grid flash briefly
  // instead of the pulse — same redirect, no behaviour change).
  if (storedMode) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gold text-lg animate-pulse">RPS World…</p>
      </div>
    );
  }

  const pick = (id) => {
    try {
      localStorage.setItem("pro-mode", id);
      localStorage.setItem("pro-onboarded", "1");
    } catch (e) {}
    router.push("/" + id);
  };

  // Hero lives in app/page.js now (server-rendered, right above the
  // ExamToolsSection). This client part owns only the tools grid, mode
  // picker and footer — same markup as before.
  const card =
    "block rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-400/40";
  return (
    <>
        <h2 className="text-[18px] font-bold text-amber-300 mt-8 mb-3">
          Tools — turant shuru karo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/tools/compress-photo-to-50kb" className={card}>
            <p className="font-bold text-white">🖼️ Photo ko 50KB tak compress karo</p>
            <p className="text-[13px] text-white/60 mt-1">Form upload ke liye — free, no signup</p>
          </a>
          <a href="/tools/compress-pdf-to-200kb" className={card}>
            <p className="font-bold text-white">📄 PDF ko 200KB tak compress karo</p>
            <p className="text-[13px] text-white/60 mt-1">Email aur portal upload ke liye</p>
          </a>
          <a href="/tools/ssc-gd-photo-size" className={card}>
            <p className="font-bold text-white">🪪 SSC GD photo size</p>
            <p className="text-[13px] text-white/60 mt-1">413×531 px, 20–50KB band — notification se milao</p>
          </a>
          <a href="/sarkari/photo-resizer" className={card}>
            <p className="font-bold text-white">📸 Passport photo — 20KB</p>
            <p className="text-[13px] text-white/60 mt-1">413×531 px, 15–20KB output</p>
          </a>
          <a href="/sarkari/image-compressor" className={card}>
            <p className="font-bold text-white">🖼️ Image Compressor</p>
            <p className="text-[13px] text-white/60 mt-1">50 / 100 / 200KB targets, quality slider</p>
          </a>
          <a href="/sarkari/pdf-compressor" className={card}>
            <p className="font-bold text-white">📄 PDF Compressor</p>
            <p className="text-[13px] text-white/60 mt-1">100 / 200 / 300KB targets, saare pages safe</p>
          </a>
        </div>

        <h2 className="text-[18px] font-bold text-amber-300 mt-8 mb-3">
          Ya mode chuno
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            ["sarkari", "Sarkari Mode — forms, photos, PDFs"],
            ["genz", "Gen-Z Mode — AI tools, resume"],
            ["parivaar", "Parivaar Mode — home tasks"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => pick(id)}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-[14px] font-bold text-white"
            >
              {label} →
            </button>
          ))}
        </div>
        <p className="text-[12px] text-white/40 mt-6">
          ProTools ke tools browser me hi chalte hain. Koi app install karna
          zaroori nahi hai — web tool se hi pehla result mil jata hai.
        </p>
        <footer className="text-center text-white/40 text-[11px] pb-10 pt-4">
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
          <div className="mt-1">
            <PrivacyChoicesLink />
          </div>
        </footer>
    </>
  );
}
