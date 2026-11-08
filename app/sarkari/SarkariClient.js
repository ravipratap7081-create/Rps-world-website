"use client";
import { useRouter } from "next/navigation";
import ModeShell from "../../components/ModeShell";
import { PageHeader, SectionLabel, ToolTile } from "../../components/Premium";
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
      <p className="text-[12px] text-mist-400 mb-3">
        <a href="/" className="text-gold underline">Home</a> / Sarkari Tools
      </p>
      <PageHeader
        title="Sarkari Tools — exam photo, signature aur PDF, exact size me"
        subtitle="SSC, UPSC, UP Police form ke liye photo-signature free me ready karo — no signup, file sirf browser me process hoti hai"
        right={
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1.5 rounded-full whitespace-nowrap">
            <IconShield size={13} />
            Secure
          </span>
        }
      />

      <div className="mt-1 mb-3">
        <SectionLabel>Free Tools</SectionLabel>
      </div>
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
          i={12}
          icon={<span className="text-[22px]">🎬</span>}
          title="Free Reel Hooks"
          desc="10 free hooks — copy karo, reel banao"
          badge="Free"
          onClick={() => go("/free-hooks")}
          tint="rgba(245,179,1,0.12)"
        />
      </div>

      <div className="mt-6">
        <SectionLabel>Exam-wise — Photo &amp; Signature Specs</SectionLabel>
        <p className="text-mist-400 text-[13px] leading-relaxed mb-3">
          Har exam ka apna photo-signature rule hai — apna exam chuno, sahi
          size aur tarika ek jagah padho, phir tool me ready karo.
        </p>
        <ul className="space-y-2 text-[14px]">
          <li><a href="/sarkari/ssc-photo-live-capture" className="text-gold underline">SSC Photo: Live Capture (CGL 2026) — upload wali photo nahi chalegi</a></li>
          <li><a href="/sarkari/upsc-photo-resize" className="text-gold underline">UPSC Photo Resize: 20–200 KB JPG, 75% face</a></li>
          <li><a href="/sarkari/upsc-signature-resize" className="text-gold underline">UPSC Signature Resize: Triple Signature, 20–100 KB</a></li>
          <li><a href="/sarkari/up-police-photo" className="text-gold underline">UP Police Photo — 50KB tak ready</a></li>
          <li><a href="/sarkari/exam-photo-signature" className="text-gold underline">Exam Photo–Signature Maker — SSC, UPSC, UP Police, RRB, IBPS presets</a></li>
        </ul>
      </div>

      <div className="mt-6">
        <SectionLabel>Guides &amp; Tutorials</SectionLabel>
        <p className="text-mist-400 text-[13px] leading-relaxed mb-3">
          Step-by-step guides for the tools above — sizes, limits and fixes,
          before you upload a form.
        </p>
        <ul className="space-y-2 text-[14px]">
          <li><a href="/blog/passport-size-photo-maker-online" className="text-gold underline">Passport Size Photo Maker Online — 35×45mm, 2×2 Inch &amp; 20KB</a></li>
          <li><a href="/blog/compress-jpg-to-200kb-online" className="text-gold underline">Compress JPG to 200KB Online — WhatsApp, Email &amp; Websites</a></li>
          <li><a href="/blog/compress-pdf-for-email-online" className="text-gold underline">Compress PDF for Email Online — Beat the 25MB Limit</a></li>
          <li><a href="/blog/digital-signature-maker-online" className="text-gold underline">Digital Signature Maker Online — Transparent PNG E-Sign</a></li>
          <li><a href="/blog/up-police-photo-size" className="text-gold underline">UP Police Photo Size 2026 — Tool Preset, Specs &amp; Rejection Fixes</a></li>
          <li><a href="/blog" className="text-gold underline">All guides →</a></li>
        </ul>
      </div>

      <div className="mt-4 pu-stagger" style={{ "--i": 4 }}>
        <AdSlot
          i={4}
          housePromo={{
            icon: <IconCrown size={22} />,
            title: "ProTools Pro — ₹149/month",
            desc: "Higher size limits (photo 5→20MB, PDF 10→25MB), Pro limit har device par payment email se, priority AI + support. No auto-renewal — pay month by month via Instamojo.",
            cta: "View Pro",
            href: "/coins",
          }}
        />
      </div>
    </ModeShell>
  );
}
