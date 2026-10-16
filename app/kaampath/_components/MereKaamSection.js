"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { WORKFLOWS } from "../../../lib/kaampath-workflows";
import { SectionLabel, PremiumCard } from "../../../components/Premium";
import { IconChevronRight, IconX } from "../../../components/icons";
import { CATEGORY_META } from "./tool-meta";

const KEY = "kaampath-saved";

function readSaved() {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function progressFor(slug, totalSteps) {
  try {
    const arr = JSON.parse(localStorage.getItem(`kaampath-progress:${slug}`) || "[]");
    const n = Array.isArray(arr) ? arr.length : 0;
    return totalSteps ? Math.round((n / totalSteps) * 100) : 0;
  } catch (e) {
    return 0;
  }
}

export default function MereKaamSection() {
  const [saved, setSaved] = useState(null); // null = not loaded yet

  const refresh = () => setSaved(readSaved());

  useEffect(() => {
    refresh();
    const onStorage = (e) => {
      if (e.key === KEY || (e.key || "").startsWith("kaampath-progress:")) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!saved || saved.length === 0) return null;

  const items = saved
    .map((slug) => WORKFLOWS.find((w) => w.slug === slug))
    .filter(Boolean);

  if (items.length === 0) return null;

  const unsave = (slug) => {
    const next = readSaved().filter((s) => s !== slug);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (e) {}
    setSaved(next);
  };

  return (
    <section className="mb-7 animate-fadeUp">
      <SectionLabel>मेरे काम</SectionLabel>
      <div className="space-y-2.5">
        {items.map((w, i) => {
          const meta = CATEGORY_META[w.categoryHi] || {};
          const CIcon = meta.icon;
          const pct = progressFor(w.slug, w.steps.length);
          return (
            <PremiumCard key={w.slug} i={i} className="p-4">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: meta.tint || "rgba(245,179,1,0.12)", color: "#F5B301" }}
                >
                  {CIcon ? <CIcon size={19} /> : null}
                </span>
                <Link href={`/kaampath/${w.slug}`} className="flex-1 min-w-0">
                  <p className="text-[14.5px] font-bold text-mist-100 leading-tight truncate">
                    {w.titleHi}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: "linear-gradient(90deg,#F5B301,#FBD35B)",
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-gold shrink-0">{pct}%</span>
                  </div>
                </Link>
                <button
                  onClick={() => unsave(w.slug)}
                  aria-label="सूची से हटाएं"
                  title="सूची से हटाएं"
                  className="pu-press shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-mist-500 hover:text-mist-200"
                >
                  <IconX size={15} />
                </button>
              </div>
            </PremiumCard>
          );
        })}
      </div>
      <Link
        href="#kaampath-all"
        className="pu-press inline-flex items-center gap-1 text-[12.5px] font-bold text-gold mt-3"
      >
        सभी काम देखें <IconChevronRight size={14} />
      </Link>
    </section>
  );
}
