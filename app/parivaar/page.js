"use client";
import { useRouter } from "next/navigation";
import ModeShell from "../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../components/Premium";
import AdSlot from "../../components/AdSlot";
import {
  IconPiggy, IconReceipt, IconBook, IconPill,
  IconBell, IconSparkles,
} from "../../components/icons";

const TEASERS = [
  { icon: <IconPiggy size={22} />, title: "Secret Gullak", desc: "Small savings, big dreams" },
  { icon: <IconReceipt size={22} />, title: "Bill Radar", desc: "Know when bills arrive, get alerts" },
  { icon: <IconBook size={22} />, title: "Homework Helper", desc: "Kids' questions, AI answers" },
  { icon: <IconPill size={22} />, title: "Dawai Yaad", desc: "Medicine reminder" },
];

export default function ParivaarMode() {
  const router = useRouter();

  return (
    <ModeShell mode="parivaar">
      <PageHeader
        title="Home Care"
        subtitle="Smart tools for your family"
      />

      <div className="pu-stagger grid grid-cols-2 gap-3">
        {TEASERS.map((t, idx) => (
          <PremiumCard key={t.title} i={idx} className="p-4 opacity-80">
            <div className="w-11 h-11 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-3">
              {t.icon}
            </div>
            <div className="font-semibold text-mist-100 text-[15px] leading-tight">
              {t.title}
            </div>
            <div className="text-mist-500 text-[12.5px] mt-1 leading-snug">{t.desc}</div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-mist-500">
              <IconBell size={12} />
              Coming soon
            </span>
          </PremiumCard>
        ))}
      </div>

      <div className="mt-4">
        <AdSlot
          i={4}
          housePromo={{
            icon: <IconSparkles size={22} />,
            title: "Try this meanwhile",
            desc: "Photo resizer and PDF tools are live in Sarkari Mode — completely free.",
            cta: "Open Sarkari Mode",
            href: "/sarkari",
          }}
        />
      </div>

      <PremiumCard accent className="mt-4 p-4">
        <p className="text-gold text-[14px] font-bold mb-1">New home under construction</p>
        <p className="text-mist-500 text-[12.5px] leading-relaxed">
          Family tools coming soon. Meanwhile try Sarkari or Gen-Z mode —
          upar Mode dabao.
        </p>
        <button
          onClick={() => router.push("/sarkari")}
          className="pu-btn-ghost pu-press mt-3 px-5 py-2.5 text-[13px] min-h-0"
        >
          Sarkari Mode →
        </button>
      </PremiumCard>
    </ModeShell>
  );
}
