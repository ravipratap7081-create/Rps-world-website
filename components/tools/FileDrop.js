"use client";
import { useRef, useState } from "react";

// Full-zone native tap target: the <input type=file> itself overlays the whole
// zone (absolute inset-0 opacity-0). NO hidden input + JS .click() pattern —
// that pattern failed on Android Chrome (see 2026-10-20 lesson).
export default function FileDrop({
  accept,
  onFile,
  icon = "📁",
  title = "File select karo",
  hint = "",
  accent = "#F5B301",
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const handle = (files) => {
    const f = files && files[0];
    if (f) onFile(f);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className="relative rounded-2xl p-8 text-center transition-all"
      style={{
        border: `2px dashed ${drag ? accent : "rgba(255,255,255,0.25)"}`,
        background: drag ? "rgba(245,179,1,0.06)" : "rgba(255,255,255,0.03)",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handle(e.dataTransfer.files);
      }}
    >
      <div className="text-4xl mb-2 pointer-events-none">{icon}</div>
      <p className="font-bold text-[15px] text-mist-100 pointer-events-none">{title}</p>
      {hint && (
        <p className="text-[12px] text-mist-500 mt-1 pointer-events-none">{hint}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        aria-label={title}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => {
          if (e.target !== inputRef.current) return; // guard: only the input itself
          handle(e.target.files);
        }}
      />
    </div>
  );
}
