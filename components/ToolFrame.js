"use client";
import ModeShell from "./ModeShell";

// Wraps a legacy static tool page inside the unified PWA shell.
// The tool runs in an iframe; shell provides nav, theme, tracking.
export default function ToolFrame({ mode, src, title }) {
  return (
    <ModeShell mode={mode}>
      <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-navy-800">
        <div className="px-4 py-2.5 border-b border-slate-700/60 flex items-center justify-between">
          <span className="text-sm font-bold text-white">{title}</span>
          <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/15 px-2 py-0.5 rounded-full">
            ● LIVE
          </span>
        </div>
        <iframe
          src={src}
          title={title}
          className="w-full border-0 bg-white"
          style={{ height: "calc(100vh - 220px)", minHeight: "520px" }}
          allow="camera; microphone"
        />
      </div>
    </ModeShell>
  );
}
