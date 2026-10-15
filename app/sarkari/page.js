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
          icon={<IconFileText size={22} />}
          title="PDF Compressor"
          desc="Compress down to 100KB"
          badge="Open →"
          onClick={() => go("/sarkari/pdf-compressor")}
        />
        <ToolTile
          i={2}
          icon={<IconGraduationCap size={22} />}
          title="Scheme Finder"
          desc="Which scheme fits you? AI will tell"
          badge="Open →"
          onClick={() => go("/sarkari/scheme-finder")}
        />
        <ToolTile
          i={3}
          icon={<IconLock size={22} />}
          title="Document Vault"
          desc="Encrypted private locker"
          badge="Open →"
          onClick={() => go("/sarkari/vault")}
          tint="rgba(52,211,153,0.12)"
        />
        <ToolTile
          i={4}
          icon={<span className="text-[22px]">🔗</span>}
          title="Sarkari Links"
          desc="PF, Aadhaar, PAN, forms — all portals"
          badge="Open →"
          onClick={() => go("/sarkari/links")}
          tint="rgba(245,179,1,0.12)"
        />
        <ToolTile
          i={5}
          icon={<span className="text-[22px]">🗜️</span>}
          title="Image Compressor"
          desc="Reduce JPG/PNG size, keep quality"
          badge="Open →"
          onClick={() => go("/sarkari/image-compressor")}
          tint="rgba(168,85,247,0.12)"
        />
        <ToolTile
          i={6}
          icon={<span className="text-[22px]">✍️</span>}
          title="Signature Maker"
          desc="Draw or type your digital signature"
          badge="Open →"
          onClick={() => go("/sarkari/signature-maker")}
          tint="rgba(52,211,153,0.12)"
        />
        <ToolTile
          i={7}
          icon={<span className="text-[22px]">🪔</span>}
          title="Diwali Card Maker"
          desc="Apne naam wala card — free"
          badge="New ✨"
          onClick={() => go("/diwali-card")}
          tint="rgba(245,179,1,0.14)"
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
