"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCoins } from "../hooks/useCoins";
import { IconZap, IconHome, IconLandmark, IconCoins, IconLogout, IconRefresh } from "./icons";

const MODE_META = {
  sarkari: { icon: <IconLandmark size={20} />, title: "Sarkari Mode", short: "Sarkari" },
  genz: { icon: <IconZap size={20} />, title: "Gen-Z Mode", short: "Gen-Z" },
  parivaar: { icon: <IconHome size={20} />, title: "Parivaar Mode", short: "Parivaar" },
};

export default function ModeShell({ mode, children }) {
  const router = useRouter();
  const [showSwitch, setShowSwitch] = useState(false);
  const meta = MODE_META[mode] || MODE_META.sarkari;
  const { balance, loggedIn, logout } = useCoins();

  useEffect(() => {
    try {
      localStorage.setItem("pro-mode", mode);
    } catch (e) {}
  }, [mode]);

  const switchMode = (m) => {
    setShowSwitch(false);
    router.push("/" + m);
  };

  return (
    <div className="min-h-screen bg-ink-950 pu-ambient pu-hero-glow">
      {/* Premium glass sticky header */}
      <header
        className="sticky top-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(10,14,23,0.82)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-gold/12 text-gold flex items-center justify-center">
            {meta.icon}
          </span>
          <span className="font-bold text-gold text-[16px] tracking-tight">
            {meta.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {loggedIn ? (
            <>
              <button
                onClick={() => router.push("/coins")}
                className="pu-press flex items-center gap-1.5 text-[12px] font-bold bg-gold/12 text-gold px-3 py-2 rounded-full border border-gold/25"
              >
                <IconCoins size={14} />
                {balance === null ? "…" : balance}
              </button>
              <button
                onClick={logout}
                className="pu-press w-9 h-9 rounded-full flex items-center justify-center text-mist-500 hover:text-mist-300"
                title="Logout"
                aria-label="Logout"
              >
                <IconLogout size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="pu-btn-primary pu-press text-[13px] px-4 py-2 min-h-0"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setShowSwitch(!showSwitch)}
            className="pu-press flex items-center gap-1.5 text-[12px] font-semibold border border-white/12 text-mist-300 px-3 py-2 rounded-full bg-white/5"
            aria-expanded={showSwitch}
          >
            <IconRefresh size={13} />
            Mode
          </button>
        </div>
      </header>

      {showSwitch && (
        <div
          className="px-4 py-3 flex gap-2 justify-center animate-fadeUp"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {Object.entries(MODE_META).map(([id, m]) => (
            <button
              key={id}
              onClick={() => switchMode(id)}
              className={`pu-press flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2.5 rounded-xl border ${
                id === mode
                  ? "bg-gold text-ink-950 border-gold"
                  : "border-white/12 text-mist-300 bg-white/5"
              }`}
            >
              {m.icon}
              {m.short}
            </button>
          ))}
        </div>
      )}

      <main className="px-4 py-5 max-w-2xl mx-auto relative">{children}</main>

      <footer className="text-center text-mist-600 text-[11px] pb-10 pt-4">
        <div className="flex justify-center gap-4 mb-2 flex-wrap">
          <a href="/about" className="hover:text-mist-300">About</a>
          <a href="/contact" className="hover:text-mist-300">Contact</a>
          <a href="/blog" className="hover:text-mist-300">Guides</a>
          <a href="/privacy-policy" className="hover:text-mist-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-mist-300">Terms</a>
          <a href="/pro-refund" className="hover:text-mist-300">Pro Refund</a>
        </div>
        ProTools • All Work, One App
      </footer>
    </div>
  );
}
