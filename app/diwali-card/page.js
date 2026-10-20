"use client";
import { useEffect, useRef, useState } from "react";
import ModeShell from "../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../components/Premium";
import { renderCard, TEMPLATES, MESSAGES } from "./renderCard";

const SHARE_URL = "https://rps-world-website.onrender.com/diwali-card";
const THUMB_W = 216;
const THUMB_H = 270;

export default function DiwaliCardPage() {
  const [tpl, setTpl] = useState("royal");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(MESSAGES[0]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  const mainRef = useRef(null);
  const thumbsRef = useRef({});
  const offRef = useRef({});

  const effName = (name || "").trim() || "आपका नाम";

  // Load fonts once, then render everything.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await Promise.all([
          document.fonts.load('800 62px "Plus Jakarta Sans"'),
          document.fonts.load('600 42px "Plus Jakarta Sans"'),
          document.fonts.load('400 35px "Plus Jakarta Sans"'),
          document.fonts.load('700 118px "Noto Sans Devanagari"'),
          document.fonts.load('400 35px "Noto Sans Devanagari"'),
        ]);
        await document.fonts.ready;
      } catch (e) {}
      if (alive) setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Re-render main + all thumbnails on any change.
  useEffect(() => {
    if (!ready) return;
    for (const t of TEMPLATES) {
      let off = offRef.current[t.id];
      if (!off) {
        off = document.createElement("canvas");
        offRef.current[t.id] = off;
      }
      try {
        renderCard(off, { template: t.id, name: effName, message: msg });
      } catch (e) {
        continue;
      }
      const th = thumbsRef.current[t.id];
      if (th) {
        const c = th.getContext("2d");
        c.clearRect(0, 0, THUMB_W, THUMB_H);
        c.drawImage(off, 0, 0, THUMB_W, THUMB_H);
      }
    }
    const main = mainRef.current;
    const cur = offRef.current[tpl];
    if (main && cur) {
      const c = main.getContext("2d");
      c.clearRect(0, 0, main.width, main.height);
      c.drawImage(cur, 0, 0, main.width, main.height);
    }
  }, [ready, tpl, name, msg, effName]);

  const showToast = (t) => {
    setToast(t);
    setTimeout(() => setToast(""), 2600);
  };

  const download = () => {
    const off = offRef.current[tpl];
    if (!off) return;
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diwali-card-${tpl}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      showToast("⬇️ Card download ho gaya!");
    }, "image/png");
  };

  const shareWhatsApp = async () => {
    const off = offRef.current[tpl];
    if (!off) return;
    setBusy(true);
    const text =
      `🪔 ${effName} ki taraf se Shubh Diwali! ` +
      `Maine apna Diwali card banaya — aap bhi FREE me banao: ${SHARE_URL}`;
    try {
      const blob = await new Promise((res) => off.toBlob(res, "image/png"));
      const file = new File([blob], "diwali-card.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Shubh Diwali 🪔",
          text,
        });
        showToast("🎉 Share ho gaya!");
      } else {
        window.open(
          "https://wa.me/?text=" + encodeURIComponent(text),
          "_blank",
          "noopener"
        );
      }
    } catch (e) {
      // user cancelled share sheet — silent
    }
    setBusy(false);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Diwali Card Maker",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Create a beautiful personalized Diwali greeting card with your name. Free download and WhatsApp share.",
    url: SHARE_URL,
  };

  return (
    <ModeShell mode="sarkari">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-md mx-auto pb-10">
        <PageHeader
          title="🪔 Diwali Card Maker"
          subtitle="Apne naam wala beautiful Diwali card — free download & WhatsApp share"
        />

        {/* Live preview */}
        <PremiumCard className="p-3 mb-4">
          {!ready && (
            <div className="w-full aspect-[4/5] rounded-xl bg-ink-700 animate-pulse flex items-center justify-center">
              <span className="text-gold text-4xl">🪔</span>
            </div>
          )}
          <canvas
            ref={mainRef}
            width={1080}
            height={1350}
            className="w-full h-auto rounded-xl"
            style={{ display: ready ? "block" : "none" }}
            aria-label="Diwali card preview"
          />
        </PremiumCard>

        {/* Template picker */}
        <p className="pu-section-label mb-2">1. Design chuno</p>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTpl(t.id)}
              className={`pu-press rounded-xl overflow-hidden border-2 transition-all ${
                tpl === t.id
                  ? "border-gold shadow-glow"
                  : "border-white/10 opacity-80"
              }`}
            >
              <canvas
                ref={(el) => {
                  if (el) thumbsRef.current[t.id] = el;
                }}
                width={THUMB_W}
                height={THUMB_H}
                className="w-full h-auto block"
              />
              <span className="block text-[10px] font-bold text-mist-100 py-1.5 bg-ink-800">
                {t.emoji} {t.name}
              </span>
            </button>
          ))}
        </div>

        {/* Name input */}
        <p className="pu-section-label mb-2">2. Apna naam likho</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 28))}
          placeholder="e.g. Ravi Pratap Singh"
          maxLength={28}
          className="w-full mb-5 px-4 py-3.5 rounded-2xl bg-ink-700 border border-white/10 text-mist-100 text-[16px] font-semibold placeholder:text-mist-600 outline-none focus:border-gold/60 transition-colors"
        />

        {/* Message picker */}
        <p className="pu-section-label mb-2">3. Shubhkamnayein chuno</p>
        <div className="flex flex-col gap-2 mb-6">
          {MESSAGES.map((m, i) => (
            <button
              key={i}
              onClick={() => setMsg(m)}
              className={`pu-press text-left px-4 py-3 rounded-2xl border text-[13px] leading-snug transition-all ${
                msg === m
                  ? "border-gold/60 bg-gold/10 text-mist-100"
                  : "border-white/10 bg-ink-800 text-mist-300"
              }`}
            >
              {msg === m ? "✅ " : ""}
              {m}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={download}
            disabled={!ready}
            className="pu-btn-primary pu-press w-full flex items-center justify-center gap-2 text-[16px]"
          >
            <span className="text-[20px]">⬇️</span> Download Card
          </button>
          <button
            onClick={shareWhatsApp}
            disabled={!ready || busy}
            className="pu-press w-full rounded-[18px] min-h-[56px] font-extrabold text-white flex items-center justify-center gap-2 text-[16px]"
            style={{
              background:
                "linear-gradient(180deg,#35e583 0%,#12a94e 55%,#0d8a3f 100%)",
              boxShadow:
                "inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,80,30,0.35), 0 8px 24px rgba(18,169,78,0.35)",
              fontWeight: 800,
            }}
          >
            <span className="text-[20px]">📲</span>
            {busy ? "Sharing…" : "WhatsApp pe Share karo"}
          </button>
        </div>

        <p className="text-center text-mist-600 text-[12px] mt-4 leading-relaxed">
          100% free • No signup • Card share karne pe doston ko bhi link milega 🪔
        </p>

        {/* Business CTA */}
        <a
          href="/diwali-business-kit"
          className="mt-4 block rounded-2xl border border-gold/30 bg-gradient-to-br from-[#2a1608] to-[#120a04] p-4 text-center no-underline"
        >
          <p className="text-gold font-extrabold text-[15px]">🏪 Need designs for your business?</p>
          <p className="text-white/65 text-[12px] mt-1 leading-relaxed">
            Custom Diwali posters, Instagram &amp; WhatsApp creatives — from ₹299, delivered in 24–48 hrs.
          </p>
          <span className="inline-block mt-2 text-black bg-gold font-extrabold text-[13px] px-4 py-2 rounded-full">
            See Business Kit →
          </span>
        </a>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink-700 border border-gold/40 text-mist-100 text-[14px] font-semibold px-5 py-3 rounded-full shadow-lift animate-popIn whitespace-nowrap">
          {toast}
        </div>
      )}
    </ModeShell>
  );
}
