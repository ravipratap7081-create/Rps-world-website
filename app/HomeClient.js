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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const m = localStorage.getItem("pro-mode");
      if (m && MODES.includes(m)) {
        setStoredMode(m);
        router.replace("/" + m);
        return;
      }
    } catch (e) {}
    setLoaded(true);
  }, [router]);

  if (storedMode || !loaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-navy-900">
        <p className="text-gold text-lg animate-pulse">RPS World…</p>
      </main>
    );
  }

  const pick = (id) => {
    try {
      localStorage.setItem("pro-mode", id);
      localStorage.setItem("pro-onboarded", "1");
    } catch (e) {}
    router.push("/" + id);
  };

  const card =
    "block rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-400/40";
  return (
    <main className="min-h-screen bg-navy-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[28px] font-extrabold text-white leading-tight">
          RPS World — Websites for Small Businesses, Kanpur
        </h1>
        <p className="text-[15px] text-amber-300/90 mt-2 font-semibold">
          ProTools — free photo resizer, PDF compressor &amp; Sarkari Tools
        </p>
        <p className="text-[15px] text-white/70 mt-2 leading-relaxed">
          Photo ko KB size me karo, PDF compress karo, exam form ke liye photo
          aur signature ready karo — bina login, bina signup. File sirf aapke
          browser me process hoti hai, koi server upload nahi. Pehla result
          free hai; Pro (₹149/month) sirf badi file limits ke liye hai.
        </p>

        <a
          href="/services"
          className="relative mt-6 block overflow-hidden rounded-[18px_6px_18px_6px] border border-[#E3B34B]/40 bg-gradient-to-br from-[#E3B34B]/15 to-transparent p-4"
        >
          <span
            aria-hidden="true"
            className="mix-orbital -right-10 -top-16 h-40 w-40"
          />
          <span
            aria-hidden="true"
            className="mix-orbital -right-4 -top-10 h-24 w-24"
          />
          <p className="mix-h relative text-[17px] leading-relaxed text-white">
            Business website chahiye? RPS World — premium, mobile-first
            websites for boutiques, salons, jewellers, cafes &amp; gyms. Free
            homepage concept pehle — pasand aaye tabhi payment.
          </p>
          <span className="mix-btn mix-btn--sm relative mt-3">
            Apni website dekho →
          </span>
        </a>

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
      </div>
    </main>
  );
}
