"use client";
import { useState } from "react";
import Link from "next/link";

// Visual portfolio grid with industry filter chips (audit Fix 4, 7 Nov 2026).
// Thumbnails are the demos' own OG preview images — no new screenshots.
// Every card is a DEMO SAMPLE, never a paying-client claim.
const FILTERS = [
  "All",
  "Boutique",
  "Salon",
  "Jewellery",
  "Cafe",
  "Gym",
  "Coaching",
  "Photography",
  "Real Estate",
];

export default function WorkGrid({ demos }) {
  const [filter, setFilter] = useState("All");
  const shown =
    filter === "All" ? demos : demos.filter((d) => d.industry === filter);
  return (
    <div>
      <div
        className="flex flex-wrap gap-2 mb-6"
        role="group"
        aria-label="Industry filter"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={
              filter === f
                ? "rounded-[18px_6px_18px_6px] bg-gradient-to-b from-[#F6CD5E] to-[#C98F00] px-4 py-2 text-[13px] font-bold text-black"
                : "rounded-[18px_6px_18px_6px] border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white/75 hover:border-[#E3B34B]/40 hover:text-white"
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {shown.map((d) => (
          <article
            key={d.href}
            className="overflow-hidden mix-card"
          >
            <Link href={d.href} className="block" aria-label={`${d.name} demo dekho`}>
              <img
                src={d.thumb}
                alt={`${d.name} — demo website preview`}
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="block aspect-[1200/630] w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <p className="text-[#E3B34B] text-xs font-bold mb-1">
                DEMO SAMPLE · {d.industry.toUpperCase()}
              </p>
              <h3 className="mix-h text-lg text-white mb-1">{d.name}</h3>
              {d.city ? (
                <p className="text-white/60 text-sm">{d.city}</p>
              ) : null}
              <p className="text-white/60 text-sm mb-3">{d.desc}</p>
              <Link href={d.href} className="text-[#E3B34B] underline text-sm">
                Demo dekho →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-white/60 text-sm mb-8">
          Is category me abhi koi demo nahi hai.
        </p>
      ) : null}
    </div>
  );
}
