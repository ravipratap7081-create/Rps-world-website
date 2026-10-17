"use client";
import { useRef, useState, useEffect } from "react";
import { PageHeader, PremiumCard, SectionLabel } from "../../components/Premium";

const TEMPLATES = [
  { id: "gold", name: "Royal Gold", bg1: "#1a0f00", bg2: "#3d2405", accent: "#f5c542" },
  { id: "maroon", name: "Festive Maroon", bg1: "#2b0603", bg2: "#5c130c", accent: "#ffb347" },
  { id: "green", name: "Emerald Night", bg1: "#041a10", bg2: "#0b3d24", accent: "#ffd166" },
];

function drawPoster(canvas, { shop, offer, template }) {
  const W = 1080, H = 1080;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background gradient
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, template.bg2);
  g.addColorStop(1, template.bg1);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Gold glow orbs
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * W, y = Math.random() * H, r = 4 + Math.random() * 22;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, template.accent + "55");
    rg.addColorStop(1, template.accent + "00");
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }

  // Top marigold garland (circles)
  ctx.fillStyle = template.accent;
  for (let x = 40; x < W; x += 72) {
    ctx.beginPath(); ctx.arc(x, 56, 26, 0, 7); ctx.fill();
    ctx.fillStyle = "#e07b00";
    ctx.beginPath(); ctx.arc(x, 56, 12, 0, 7); ctx.fill();
    ctx.fillStyle = template.accent;
  }

  // Diya row (emoji)
  ctx.font = "90px serif";
  ctx.textAlign = "center";
  const diyas = "🪔".repeat(7);
  ctx.fillText(diyas, W / 2, H - 120);

  // Header
  ctx.fillStyle = template.accent;
  ctx.font = "800 64px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("DIWALI DHAMAKA", W / 2, 240);

  // Divider line
  ctx.strokeStyle = template.accent + "88";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(240, 285); ctx.lineTo(W - 240, 285); ctx.stroke();

  // Shop name (auto-shrink to fit)
  const shopText = (shop || "Aapki Dukaan").trim() || "Aapki Dukaan";
  let fs = 84;
  ctx.font = `800 ${fs}px 'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif`;
  while (ctx.measureText(shopText).width > W - 160 && fs > 36) {
    fs -= 6;
    ctx.font = `800 ${fs}px 'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif`;
  }
  ctx.fillStyle = "#ffffff";
  ctx.fillText(shopText, W / 2, 480);

  // Offer line (auto-shrink)
  const offerText = (offer || "Special Diwali Offer").trim() || "Special Diwali Offer";
  let fs2 = 72;
  ctx.font = `700 ${fs2}px 'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif`;
  while (ctx.measureText(offerText).width > W - 160 && fs2 > 30) {
    fs2 -= 6;
    ctx.font = `700 ${fs2}px 'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif`;
  }
  ctx.fillStyle = template.accent;
  ctx.fillText(offerText, W / 2, 640);

  // Sub line
  ctx.fillStyle = "#ffffffaa";
  ctx.font = "500 40px 'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif";
  ctx.fillText("इस दिवाली अपनों के साथ खुशियाँ मनाएँ", W / 2, 740);

  // Credit tag
  ctx.fillStyle = "#ffffff55";
  ctx.font = "500 28px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("Made with Pro Universe", W / 2, H - 40);
}

export default function DiwaliOfferMakerPage() {
  const canvasRef = useRef(null);
  const [shop, setShop] = useState("");
  const [offer, setOffer] = useState("");
  const [templateId, setTemplateId] = useState("gold");
  const template = TEMPLATES.find((t) => t.id === templateId);

  useEffect(() => {
    if (canvasRef.current) drawPoster(canvasRef.current, { shop, offer, template });
  }, [shop, offer, template]);

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.download = "diwali-offer-poster.png";
    a.href = c.toDataURL("image/png");
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <div className="max-w-md mx-auto pb-12">
        <PageHeader
          title="🪔 FREE Diwali Offer Maker"
          subtitle="Apni dukaan ka naam + offer likho — poster taiyaar, bilkul FREE"
        />

        <PremiumCard className="p-5 mb-4">
          <label className="block text-white/70 text-[13px] font-bold mb-1">Dukaan / Business ka naam</label>
          <input
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            placeholder="e.g. Sharma General Store"
            maxLength={40}
            className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white text-[15px] mb-4 outline-none focus:border-gold/60"
          />
          <label className="block text-white/70 text-[13px] font-bold mb-1">Offer (e.g. 20% OFF, Buy 1 Get 1)</label>
          <input
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="e.g. Diwali Sale — 20% OFF"
            maxLength={48}
            className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white text-[15px] mb-4 outline-none focus:border-gold/60"
          />
          <label className="block text-white/70 text-[13px] font-bold mb-2">Design chuno</label>
          <div className="flex gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplateId(t.id)}
                className={`flex-1 py-2 rounded-xl text-[13px] font-bold border ${
                  t.id === templateId
                    ? "bg-gold/20 border-gold text-gold"
                    : "bg-white/[0.04] border-white/10 text-white/60"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </PremiumCard>

        <SectionLabel>Live preview</SectionLabel>
        <PremiumCard className="p-4 mb-4">
          <canvas ref={canvasRef} className="w-full h-auto rounded-xl border border-white/10" />
        </PremiumCard>

        <button
          onClick={download}
          className="pu-btn-primary pu-press w-full py-4 text-[16px] font-extrabold inline-flex items-center justify-center gap-2 rounded-2xl"
        >
          <span>⬇️</span> Download Poster (FREE)
        </button>
        <p className="text-center text-white/40 text-[12px] mt-3 leading-relaxed">
          100% free — kuch bhi server par nahi jaata, sab aapke phone me banta hai.<br />
          12 ready designs + 34 captions chahiye?{" "}
          <a href="/diwali-business-kit" className="text-gold underline">Full pack ₹149</a>
        </p>
      </div>
    </div>
  );
}
