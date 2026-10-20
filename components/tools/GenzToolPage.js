"use client";
import Link from "next/link";
import ModeShell from "../ModeShell";

// Standard wrapper for a native Gen-Z tool page: shell + back link + header.
// Mirrors components/tools/ToolPage.js (sarkari) but for Gen-Z Mode.
export default function GenzToolPage({ title, sub, children, note }) {
  return (
    <ModeShell mode="genz">
      <div className="pu-enter">
        <Link
          href="/genz"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-gold mb-4"
        >
          ← Gen-Z Tools
        </Link>
        <h1 className="text-[22px] font-extrabold text-mist-100 leading-tight">{title}</h1>
        {sub && <p className="text-[13px] text-mist-400 mt-1 mb-5 leading-snug">{sub}</p>}
        {children}
        {note && (
          <p className="text-center text-[11px] text-mist-600 mt-8 leading-relaxed">{note}</p>
        )}
      </div>
    </ModeShell>
  );
}
