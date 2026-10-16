"use client";
import { useEffect, useState } from "react";

const KEY = "kaampath-saved";

function BookmarkIcon({ filled }) {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function SaveButton({ slug }) {
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
      setSaved(Array.isArray(arr) && arr.includes(slug));
    } catch (e) {}
    setLoaded(true);
  }, [slug]);

  const toggle = () => {
    let arr = [];
    try {
      arr = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(arr)) arr = [];
    } catch (e) {}
    const next = arr.includes(slug) ? arr.filter((s) => s !== slug) : [...arr, slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (e) {}
    setSaved(next.includes(slug));
  };

  if (!loaded) return null;

  return (
    <button
      onClick={toggle}
      aria-pressed={saved}
      className={`pu-press kp-print-hide inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3.5 py-2.5 rounded-xl border ${
        saved
          ? "bg-gold text-ink-950 border-gold"
          : "border-white/12 text-mist-300 bg-white/5 hover:text-gold hover:border-gold/40"
      }`}
    >
      <BookmarkIcon filled={saved} />
      {saved ? "सेव किया गया" : "मेरे काम में सेव करें"}
    </button>
  );
}
