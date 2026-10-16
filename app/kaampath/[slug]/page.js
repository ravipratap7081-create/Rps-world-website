import { notFound } from "next/navigation";
import Link from "next/link";
import { readFileSync } from "fs";
import { join } from "path";
import ModeShell from "../../../components/ModeShell";
import { getWorkflow, getAllSlugs } from "../../../lib/kaampath-workflows";
import { PremiumCard, SectionLabel, TrustBadge } from "../../../components/Premium";
import {
  IconArrowLeft,
  IconShield,
  IconCalendar,
  IconWallet,
  IconCheck,
  IconChevronRight,
} from "../../../components/icons";
import { TOOL_META, CATEGORY_META } from "../_components/tool-meta";
import WorkflowChecklist from "../_components/WorkflowChecklist";
import SaveButton from "../_components/SaveButton";
import ActionBar from "../_components/ActionBar";

// Print stylesheet: App Router forbids importing plain global CSS from a
// nested page (and CSS Modules reject pure-global selectors), so the
// kaampath print.css is inlined via a <style> tag at render time.
const printCss = readFileSync(join(process.cwd(), "app/kaampath/print.css"), "utf8");

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const w = getWorkflow(params.slug);
  if (!w) return {};
  return {
    title: `${w.titleHi} — KaamPath`,
    description: w.descHi,
    keywords: `${w.titleHi}, ${w.titleEn}, kaampath, सरकारी काम, sarkari kaam guide`,
  };
}

export default function WorkflowPage({ params }) {
  const w = getWorkflow(params.slug);
  if (!w) notFound();

  const catMeta = CATEGORY_META[w.categoryHi] || {};
  const CIcon = catMeta.icon;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${w.titleHi} (${w.titleEn})`,
    description: w.descHi,
    step: w.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.titleHi,
      text: `${s.titleHi}. ${s.detailHi}`,
    })),
  };

  return (
    <ModeShell mode="sarkari">
      <style dangerouslySetInnerHTML={{ __html: printCss }} />
      <div className="kp-print-root">
        {/* Back + save */}
        <div className="kp-print-hide flex items-center justify-between mb-4 animate-fadeUp">
          <Link
            href="/kaampath"
            className="pu-press inline-flex items-center gap-1.5 text-[13px] font-bold text-mist-300 hover:text-gold"
          >
            <IconArrowLeft size={16} /> सभी काम
          </Link>
          <SaveButton slug={w.slug} />
        </div>

        {/* Header */}
        <div className="mb-5 animate-fadeUp">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: catMeta.tint || "rgba(245,179,1,0.12)", color: "#F5B301" }}
            >
              {CIcon ? <CIcon size={22} /> : null}
            </span>
            <span className="text-[11.5px] font-bold text-gold bg-gold/10 border border-gold/25 px-3 py-1.5 rounded-full">
              {w.categoryHi}
            </span>
            <TrustBadge icon={<IconShield size={12} />} text="सत्यापित" />
          </div>
          <h1
            className="text-[22px] font-extrabold text-mist-100 tracking-tight leading-tight"
            style={{ textWrap: "balance" }}
          >
            {w.titleHi}
          </h1>
          <p className="text-mist-500 text-[12.5px] mt-1">{w.titleEn}</p>
          <p className="text-mist-300 text-[14px] mt-2.5 leading-relaxed">{w.descHi}</p>
          <p className="text-mist-500 text-[11.5px] mt-2">
            स्रोत:{" "}
            <a
              href={w.officialSource.url}
              target="_blank"
              rel="noopener"
              className="text-gold underline underline-offset-2"
            >
              {w.officialSource.name}
            </a>{" "}
            — सत्यापित {w.verifiedDate}
          </p>
        </div>

        {/* Deadline + fee cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-5 animate-fadeUp" style={{ "--i": 1 }}>
          <PremiumCard className="p-3.5">
            <span className="w-9 h-9 rounded-xl bg-gold/12 text-gold flex items-center justify-center mb-2">
              <IconCalendar size={17} />
            </span>
            <p className="text-[11px] font-bold text-mist-500 uppercase tracking-wide">अंतिम तिथि</p>
            <p className="text-[12.5px] font-semibold text-mist-100 mt-1 leading-snug">
              {w.deadlineHi || "आधिकारिक वेबसाइट पर देखें"}
            </p>
          </PremiumCard>
          <PremiumCard className="p-3.5">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/12 text-emerald-300 flex items-center justify-center mb-2">
              <IconWallet size={17} />
            </span>
            <p className="text-[11px] font-bold text-mist-500 uppercase tracking-wide">शुल्क</p>
            <p className="text-[12.5px] font-semibold text-mist-100 mt-1 leading-snug">
              {w.feeHi || "आधिकारिक वेबसाइट पर देखें"}
            </p>
          </PremiumCard>
        </div>

        {/* Apply CTA */}
        <a
          href={w.applyLink}
          target="_blank"
          rel="noopener"
          className="pu-btn-primary pu-press w-full py-4 text-[15px] inline-flex items-center justify-center gap-2 mb-6 animate-fadeUp"
          style={{ "--i": 2 }}
        >
          आवेदन करें — आधिकारिक पोर्टल ↗
        </a>

        {/* Eligibility */}
        <section className="mb-6">
          <SectionLabel>कौन आवेदन कर सकता है</SectionLabel>
          <PremiumCard className="p-4">
            <ul className="space-y-2.5">
              {w.eligibilityHi.map((e, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <IconCheck size={16} strokeWidth={3} className="text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-[13.5px] text-mist-100 leading-relaxed">{e}</span>
                </li>
              ))}
            </ul>
          </PremiumCard>
        </section>

        {/* Documents */}
        <section className="mb-6">
          <SectionLabel>ज़रूरी दस्तावेज़</SectionLabel>
          <PremiumCard className="p-4">
            <ul className="space-y-2.5">
              {w.documentsHi.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="kp-step-check w-5 h-5 shrink-0 mt-0.5 rounded-md border-2 border-gold/50" />
                  <span className="text-[13.5px] text-mist-100 leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </PremiumCard>
        </section>

        {/* Steps checklist (client) */}
        <section className="mb-6">
          <SectionLabel>Step-by-step प्रक्रिया ({w.steps.length})</SectionLabel>
          <WorkflowChecklist slug={w.slug} steps={w.steps} />
        </section>

        {/* Related tools */}
        {w.relatedTools.length > 0 && (
          <section className="mb-6">
            <SectionLabel>काम के टूल</SectionLabel>
            <div className="pu-stagger grid grid-cols-2 gap-2.5">
              {w.relatedTools.map((t, i) => {
                const tm = TOOL_META[t];
                if (!tm) return null;
                return (
                  <Link
                    key={t}
                    href={t}
                    className="pu-card pu-press pu-press-card p-3.5 flex items-center gap-3"
                    style={{ "--i": i }}
                  >
                    <span className="text-[22px]" aria-hidden="true">
                      {tm.emoji}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13.5px] font-bold text-mist-100 leading-tight">
                        {tm.label}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[11.5px] font-bold text-gold mt-0.5">
                        खोलें <IconChevronRight size={12} />
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Source footer */}
        <div className="pu-card p-4 flex items-start gap-3 mb-2">
          <span className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/12 text-emerald-300 flex items-center justify-center">
            <IconShield size={18} />
          </span>
          <p className="text-[12.5px] text-mist-300 leading-relaxed">
            स्रोत:{" "}
            <a
              href={w.officialSource.url}
              target="_blank"
              rel="noopener"
              className="text-gold font-semibold underline underline-offset-2"
            >
              {w.officialSource.name}
            </a>{" "}
            — सत्यापित {w.verifiedDate}। नियम बदल सकते हैं; आवेदन से पहले आधिकारिक पोर्टल ज़रूर देखें।
          </p>
        </div>

        {/* Action bar (client) */}
        <ActionBar slug={w.slug} titleHi={w.titleHi} deadlineDate={w.deadlineDate} />

        {/* JSON-LD HowTo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </ModeShell>
  );
}
