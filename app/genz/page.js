"use client";
import { useRouter } from "next/navigation";
import ModeShell from "../../components/ModeShell";
import { PageHeader, ToolTile, PremiumCard } from "../../components/Premium";
import AdSlot from "../../components/AdSlot";
import {
  IconCamera, IconFileText, IconGraduationCap,
  IconBell, IconZap, IconCrown,
} from "../../components/icons";

const COMING_SOON = [
  { icon: <IconZap size={20} />, title: "Study-to-Earn Lock", desc: "Study hard, earn coins" },
  { icon: <IconZap size={20} />, title: "AI Sniper", desc: "Smart study planner" },
  { icon: <IconZap size={20} />, title: "Rank Board", desc: "Pan-India student ranking" },
];

export default function GenZMode() {
  const router = useRouter();
  const go = (href) => router.push(href);

  return (
    <ModeShell mode="genz">
      <PageHeader
        title="Full speed ahead!"
        subtitle="AI tools that work for you"
      />

      <div className="pu-stagger grid grid-cols-2 gap-3">
        <ToolTile
          i={0}
          icon={<IconCamera size={22} />}
          title="AI Doubt Solver"
          desc="Snap a photo, get step-by-step solution"
          badge="Open →"
          onClick={() => go("/genz/doubt-solver")}
        />
        <ToolTile
          i={1}
          icon={<IconFileText size={22} />}
          title="AI Resume Maker"
          desc="Professional CV in 1 minute"
          badge="Open →"
          onClick={() => go("/genz/resume-maker")}
        />
        <ToolTile
          i={2}
          icon={<IconGraduationCap size={22} />}
          title="Scholarship Finder"
          desc="Which scholarship fits you?"
          badge="Open →"
          onClick={() => go("/sarkari/scheme-finder")}
        />
        <ToolTile
          i={3}
          icon={<IconCrown size={22} />}
          title="Go Pro"
          desc="Unlimited AI, zero limits"
          badge="View →"
          onClick={() => go("/coins")}
          tint="rgba(245,179,1,0.14)"
        />
      </div>

      <div className="mt-4">
        <AdSlot
          i={4}
          housePromo={{
            icon: <IconBell size={22} />,
            title: "New AI tools coming soon",
            desc: "Study-to-Earn, AI Sniper and Rank Board — you'll get them first.",
            cta: "Earn coins",
            href: "/coins",
          }}
        />
      </div>

      <p className="pu-section-label mt-6">Coming soon</p>
      <div className="pu-stagger grid grid-cols-3 gap-2.5">
        {COMING_SOON.map((t, idx) => (
          <PremiumCard key={t.title} i={idx + 5} className="p-3 opacity-70">
            <div className="w-9 h-9 rounded-xl bg-white/5 text-mist-500 flex items-center justify-center mb-2">
              {t.icon}
            </div>
            <div className="font-semibold text-mist-300 text-[12.5px] leading-tight">
              {t.title}
            </div>
            <div className="text-mist-600 text-[11px] mt-0.5">{t.desc}</div>
          </PremiumCard>
        ))}
      </div>
    </ModeShell>
  );
}
