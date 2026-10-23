"use client";
import { useRouter } from "next/navigation";
import ModeShell from "../../components/ModeShell";
import { PageHeader, ToolTile } from "../../components/Premium";
import AdSlot from "../../components/AdSlot";
import {
  IconImage, IconFileText, IconGraduationCap, IconLock,
  IconShield, IconCrown,
} from "../../components/icons";

export default function SarkariMode() {
  const router = useRouter();
  const go = (href) => router.push(href);

  return (
    <ModeShell mode="sarkari">
      <PageHeader
        title="Welcome! Government work, zero stress"
        subtitle="Photo, PDF, forms — keep everything ready"
        right={
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1.5 rounded-full whitespace-nowrap">
            <IconShield size={13} />
            Secure
          </span>
        }
      />

      <div className="pu-stagger grid grid-cols-2 gap-3">
        <ToolTile
          i={0}
          icon={<IconImage size={22} />}
          title="Photo Resizer"
          desc="20KB passport photo, form-ready"
          badge="Open →"
          onClick={() => go("/sarkari/photo-resizer")}
        />
        <ToolTile
          i={1}
          icon={<span className="text-[22px]">🚔</span>}
          title="UP Police Photo"
          desc="Bharti form photo — 50KB tak ready"
          badge="New ✨"
          onClick={() => go("/sarkari/up-police-photo")}
          tint="rgba(96,165,250,0.12)"
        />
        <ToolTile
          i={2}
          icon={<span className="text-[22px]">🪪</span>}
          title="Exam Photo–Signature"
          desc="SSC, UPSC, Railway, Bank — exact size"
          badge="New ✨"
          onClick={() => go("/sarkari/exam-photo-signature")}
          tint="rgba(52,211,153,0.12)"
        />
        <ToolTile
          i={3}
          icon={<IconFileText size={22} />}
          title="PDF Compressor"
          desc="PDF halka karo — saare pages safe"
          badge="Open →"
          onClick={() => go("/sarkari/pdf-compressor")}
        />
        <ToolTile
          i={4}
          icon={<IconGraduationCap size={22} />}
          title="Scheme Finder"
          desc="Kaunsi yojana aapke liye hai?"
          badge="Open →"
          onClick={() => go("/sarkari/scheme-finder")}
        />
        <ToolTile
          i={5}
          icon={<span className="text-[22px]">📋</span>}
          title="Document Checklist"
          desc="Kaam chuno → poori documents list"
          badge="New ✨"
          onClick={() => go("/sarkari/checklist")}
          tint="rgba(245,179,1,0.12)"
        />
        <ToolTile
          i={6}
          icon={<IconLock size={22} />}
          title="Document Vault"
          desc="Encrypted private locker"
          badge="Open →"
          onClick={() => go("/sarkari/vault")}
          tint="rgba(52,211,153,0.12)"
        />
        <ToolTile
          i={7}
          icon={<span className="text-[22px]">🔗</span>}
          title="Sarkari Links"
          desc="PF, Aadhaar, PAN, forms — all portals"
          badge="Open →"
          onClick={() => go("/sarkari/links")}
          tint="rgba(245,179,1,0.12)"
        />
        <ToolTile
          i={8}
          icon={<span className="text-[22px]">🗜️</span>}
          title="Image Compressor"
          desc="Reduce JPG/PNG size, keep quality"
          badge="Open →"
          onClick={() => go("/sarkari/image-compressor")}
          tint="rgba(168,85,247,0.12)"
        />
        <ToolTile
          i={9}
          icon={<span className="text-[22px]">✍️</span>}
          title="Signature Maker"
          desc="Draw or type your digital signature"
          badge="Open →"
          onClick={() => go("/sarkari/signature-maker")}
          tint="rgba(52,211,153,0.12)"
        />
        <ToolTile
          i={10}
          icon={<span className="text-[22px]">📚</span>}
          title="Sarkari Guides"
          desc="Hindi step-by-step — form bharna asaan"
          badge="New ✨"
          onClick={() => go("/sarkari/guides")}
          tint="rgba(96,165,250,0.12)"
        />
        <ToolTile
          i={11}
          icon={<span className="text-[22px]">🪔</span>}
          title="Diwali Card Maker"
          desc="Apne naam wala card — free"
          badge="New ✨"
          onClick={() => go("/diwali-card")}
          tint="rgba(245,179,1,0.14)"
        />
        <ToolTile
          i={12}
          icon={<span className="text-[22px]">🎬</span>}
          title="Free Reel Hooks"
          desc="10 free hooks — copy karo, reel banao"
          badge="Free"
          onClick={() => go("/free-hooks")}
          tint="rgba(245,179,1,0.12)"
        />
      </div>

      <div className="mt-4 pu-stagger" style={{ "--i": 4 }}>
        <AdSlot
          i={4}
          housePromo={{
            icon: <IconCrown size={22} />,
            title: "Pro Universe Pro",
            desc: "Unlimited tools, no limits — one payment, lifetime.",
            cta: "View Pro",
            href: "/coins",
          }}
        />
      </div>
    </ModeShell>
  );
}
