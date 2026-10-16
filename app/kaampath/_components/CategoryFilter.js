"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { SectionLabel, TrustBadge, EmptyState } from "../../../components/Premium";
import { IconChevronRight, IconShield } from "../../../components/icons";
import { CATEGORY_META } from "./tool-meta";

export default function CategoryFilter({ workflows }) {
  const categories = useMemo(
    () => ["सभी", ...Array.from(new Set(workflows.map((w) => w.categoryHi)))],
    [workflows]
  );
  const [active, setActive] = useState("सभी");

  const list =
    active === "सभी"
      ? workflows
      : workflows.filter((w) => w.categoryHi === active);

  return (
    <section id="kaampath-all" className="mb-7">
      <SectionLabel>सभी काम ({workflows.length})</SectionLabel>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 mb-1" role="group" aria-label="श्रेणी चुनें">
        {categories.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`pu-press shrink-0 text-[12.5px] font-bold px-4 py-2.5 rounded-full border ${
                on
                  ? "bg-gold text-ink-950 border-gold"
                  : "border-white/12 text-mist-300 bg-white/5"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Workflow cards */}
      <div className="pu-stagger grid gap-3" key={active}>
        {list.map((w, i) => {
          const meta = CATEGORY_META[w.categoryHi] || {};
          const CIcon = meta.icon;
          return (
            <Link
              key={w.slug}
              href={`/kaampath/${w.slug}`}
              className="pu-card pu-press pu-press-card block p-4"
              style={{ "--i": i }}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: meta.tint || "rgba(245,179,1,0.12)", color: "#F5B301" }}
                >
                  {CIcon ? <CIcon size={19} /> : null}
                </span>
                <span className="text-[11px] font-bold text-gold bg-gold/10 border border-gold/25 px-2.5 py-1 rounded-full shrink-0">
                  {w.categoryHi}
                </span>
                <span className="ml-auto shrink-0">
                  <TrustBadge icon={<IconShield size={11} />} text="आधिकारिक पोर्टल लिंक" />
                </span>
              </div>
              <p className="text-[15.5px] font-bold text-mist-100 leading-snug">{w.titleHi}</p>
              <p className="text-mist-500 text-[13px] mt-1 leading-relaxed line-clamp-2">{w.descHi}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[11.5px] text-mist-500">
                  {w.officialSource.name} • {w.verifiedDate}
                </span>
                <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-gold">
                  {w.steps.length} स्टेप देखें <IconChevronRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {list.length === 0 && (
        <EmptyState
          icon={<IconShield size={26} />}
          title="इस श्रेणी में कोई काम नहीं"
          desc="दूसरी श्रेणी चुनकर देखें।"
        />
      )}
    </section>
  );
}
