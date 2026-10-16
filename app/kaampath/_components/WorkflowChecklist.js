"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IconCheck } from "../../../components/icons";
import { TOOL_META } from "./tool-meta";

export default function WorkflowChecklist({ slug, steps }) {
  const key = `kaampath-progress:${slug}`;
  const [done, setDone] = useState([]);

  // Shared sanitizer: rejects non-arrays, non-integers, negatives and
  // out-of-range indices, and deduplicates — so corrupted localStorage
  // can never show progress above 100%.
  function normalizeProgress(value, totalSteps) {
    if (!Array.isArray(value)) return [];
    return [
      ...new Set(
        value.filter(
          (i) => Number.isInteger(i) && i >= 0 && i < totalSteps
        )
      ),
    ];
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        setDone(normalizeProgress(JSON.parse(raw), steps.length));
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const toggle = (i) => {
    const next = normalizeProgress(
      done.includes(i) ? done.filter((x) => x !== i) : [...done, i],
      steps.length
    );
    setDone(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {}
  };

  const pct = steps.length ? Math.round((done.length / steps.length) * 100) : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="pu-card p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[13px] font-bold text-mist-100">आपकी प्रगति</p>
          <p className="text-[13px] font-bold text-gold">
            {done.length}/{steps.length} स्टेप • {pct}%
          </p>
        </div>
        <div
          className="h-2.5 rounded-full bg-white/8 overflow-hidden"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg,#F5B301,#FBD35B)" }}
          />
        </div>
        {pct === 100 && (
          <p className="text-emerald-300 text-[12.5px] font-semibold mt-2 animate-fadeUp">
            बढ़िया! सभी स्टेप पूरे — अब आवेदन की स्थिति ट्रैक करते रहें।
          </p>
        )}
      </div>

      {/* Steps */}
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const checked = done.includes(i);
          const toolMeta = s.tool ? TOOL_META[s.tool] : null;
          return (
            <li
              key={i}
              className={`pu-card p-4 transition-colors ${
                checked ? "border-emerald-500/30" : ""
              }`}
              style={{ "--i": i }}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggle(i)}
                  aria-pressed={checked}
                  aria-label={`${s.titleHi}: ${checked ? "अपूर्ण चिह्नित करें" : "पूर्ण चिह्नित करें"}`}
                  className={`kp-step-check pu-press shrink-0 w-8 h-8 mt-0.5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-emerald-500 border-emerald-500 text-ink-950"
                      : "border-white/25 text-transparent hover:border-gold"
                  }`}
                >
                  <IconCheck size={16} strokeWidth={3} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <span
                      className={`w-6 h-6 shrink-0 rounded-lg text-[12px] font-extrabold flex items-center justify-center ${
                        checked ? "bg-emerald-500/15 text-emerald-300" : "bg-gold/12 text-gold"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <p
                      className={`text-[15px] font-bold leading-snug ${
                        checked ? "text-mist-500 line-through" : "text-mist-100"
                      }`}
                    >
                      {s.titleHi}
                    </p>
                  </div>
                  <p
                    className={`text-[13.5px] mt-1.5 leading-relaxed ${
                      checked ? "text-mist-600" : "text-mist-300"
                    }`}
                  >
                    {s.detailHi}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {s.link && (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener"
                        className="pu-press inline-flex items-center gap-1 text-[12px] font-bold text-gold bg-gold/10 border border-gold/25 px-3 py-1.5 rounded-full"
                      >
                        आधिकारिक लिंक खोलें ↗
                      </a>
                    )}
                    {s.tool && toolMeta && (
                      <Link
                        href={s.tool}
                        className="pu-press inline-flex items-center gap-1 text-[12px] font-bold text-mist-100 bg-white/8 border border-white/15 px-3 py-1.5 rounded-full"
                      >
                        <span aria-hidden="true">{toolMeta.emoji}</span> {toolMeta.label} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
