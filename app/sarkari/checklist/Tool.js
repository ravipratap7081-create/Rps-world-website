"use client";
import { useState } from "react";
import { CHECKLISTS } from "../../../lib/checklist-data";

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function Tool() {
  const [selectedId, setSelectedId] = useState(null);
  const [checked, setChecked] = useState({});
  const sel = CHECKLISTS.find((c) => c.id === selectedId) || null;

  function pick(id) {
    setSelectedId(id === selectedId ? null : id);
    setChecked({});
  }

  function toggle(idx) {
    setChecked((p) => ({ ...p, [idx]: !p[idx] }));
  }

  return (
    <div>
      <div className="pu-card p-4 mb-5">
        <p className="text-[13px] text-mist-300 leading-snug">
          Pehle kaam chunein, phir list me her document ko{" "}
          <span className="font-extrabold text-mist-100">☐ par tap karke ✓</span> karein taaki
          kuch miss na ho. Ye list official jaankari se bani hai —{" "}
          <span className="font-extrabold text-mist-100">koi AI nahi</span>.
        </p>
      </div>

      <div className="space-y-2 mb-5">
        {CHECKLISTS.map((c) => (
          <button
            key={c.id}
            onClick={() => pick(c.id)}
            className={`pu-press w-full text-left rounded-2xl border px-4 py-3.5 font-bold text-[14px] transition ${
              selectedId === c.id
                ? "bg-gold/15 border-gold/50 text-mist-100"
                : "bg-white/5 border-white/10 text-mist-200"
            }`}
          >
            {selectedId === c.id ? "📂 " : "📁 "}
            {c.name}
          </button>
        ))}
      </div>

      {sel && (
        <div className="pu-card p-4">
          <h2 className="text-[16px] font-extrabold text-mist-100 mb-1">{sel.name}</h2>
          <p className="text-[12px] text-mist-500 mb-4">
            {sel.docs.filter((_, i) => checked[i]).length}/{sel.docs.length} documents ready
          </p>

          <ul className="space-y-2.5 mb-4">
            {sel.docs.map((d, i) => {
              const done = !!checked[i];
              return (
                <li key={i}>
                  <button
                    onClick={() => toggle(i)}
                    className={`pu-press w-full text-left rounded-xl border px-3.5 py-3 transition ${
                      done
                        ? "bg-white/[0.02] border-white/[0.06] opacity-60"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <span className="text-[14px] mr-2">{done ? "✅" : "☐"}</span>
                    <span className={`text-[14px] font-bold ${done ? "line-through" : ""}`}>
                      {d.doc}
                    </span>
                    {d.note ? (
                      <span className="block text-[12px] text-mist-400 mt-1 ml-7 leading-snug">
                        {d.note}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {sel.photoSpec && (
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-3">
              <p className="text-[13px] font-bold text-mist-100 mb-1">📸 Photo spec</p>
              <p className="text-[12px] text-mist-300 leading-snug">{sel.photoSpec}</p>
            </div>
          )}
          {sel.signSpec && (
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-3">
              <p className="text-[13px] font-bold text-mist-100 mb-1">✍️ Signature spec</p>
              <p className="text-[12px] text-mist-300 leading-snug">{sel.signSpec}</p>
            </div>
          )}

          {sel.tip && (
            <p className="text-[13px] text-mist-300 leading-snug mb-4">
              💡 <span className="font-semibold">Tip:</span> {sel.tip}
            </p>
          )}

          <a
            href={sel.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pu-btn-primary pu-press block text-center w-full py-3.5 rounded-2xl font-extrabold text-[15px] mb-3"
          >
            🔗 {sel.portalName} par jayein
          </a>

          <p className="text-[11px] text-mist-500">
            Source: {domainOf(sel.portalUrl)} • Last verified: {sel.lastVerified}
          </p>

          <p className="text-[12px] text-mist-500 leading-snug mt-4">
            ⚠️ Final list official notification/portal se confirm karein — jile ke hisaab se
            thoda fark ho sakta hai.
          </p>
        </div>
      )}

      {!sel && (
        <p className="text-center text-[13px] text-mist-500 mt-2">
          Upar se ek kaam chunein — uski document checklist yahi khul jayegi.
        </p>
      )}
    </div>
  );
}
