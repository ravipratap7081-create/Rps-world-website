"use client";
import Link from "next/link";
import ModeShell from "../ModeShell";

// Standard wrapper for a native sarkari tool page: shell + back link + header.
export default function ToolPage({ title, sub, children }) {
  return (
    <ModeShell mode="sarkari">
      <div className="pu-enter">
        <Link
          href="/sarkari"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-gold mb-4"
        >
          ← Sarkari Tools
        </Link>
        <h1 className="text-[22px] font-extrabold text-mist-100 leading-tight">{title}</h1>
        {sub && <p className="text-[13px] text-mist-400 mt-1 mb-5 leading-snug">{sub}</p>}
        {children}
        <p className="text-center text-[11px] text-mist-600 mt-8">
          🔒 File sirf aapke phone/browser me process hoti hai — koi server upload nahi.
        </p>
      </div>
    </ModeShell>
  );
}
