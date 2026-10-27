"use client";
import { useEffect, useRef, useState } from "react";
import { IconMegaphone } from "./icons";

// Native in-feed ad slot — styled EXACTLY like content cards.
// AdSense-ready: set NEXT_PUBLIC_ADSENSE_CLIENT to enable real ads.
// If no ad fills, the slot collapses entirely (never shows "Advertisement").
//
// House promos (earn without AdSense approval): pass `housePromo` with
// { icon, title, desc, cta, href } — renders as a native sponsored card.

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

export default function AdSlot({ slot, housePromo, className = "", i }) {
  const [filled, setFilled] = useState(!!housePromo);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (housePromo) {
      setFilled(true);
      return;
    }
    if (!ADSENSE_CLIENT || !slot) return; // no config → stay collapsed
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slot, housePromo]);

  useEffect(() => {
    if (!visible || !ADSENSE_CLIENT || !slot || housePromo) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      // If nothing renders within 3s, collapse the slot
      const t = setTimeout(() => {
        const el = ref.current;
        const ins = el?.querySelector("ins");
        if (ins && !ins.firstChild) setFilled(false);
        else setFilled(true);
      }, 3000);
      return () => clearTimeout(t);
    } catch (e) {
      setFilled(false);
    }
  }, [visible, slot, housePromo]);

  // Collapse entirely when there's nothing to show
  if (!filled && !ADSENSE_CLIENT) return null;
  if (!filled) return null;

  // ---- House promo: native sponsored card (works from day 1) ----
  if (housePromo) {
    const p = housePromo;
    return (
      <div
        ref={ref}
        style={{ "--i": i ?? 0 }}
        className={`pu-card p-4 relative overflow-hidden ${className}`}
      >
        <span className="absolute top-3 right-3 text-[10px] font-semibold text-mist-600 bg-white/5 px-2 py-0.5 rounded-full">
          Sponsored
        </span>
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gold/12 text-gold flex items-center justify-center shrink-0">
            {p.icon || <IconMegaphone size={22} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-mist-100 text-[15px] leading-tight">
              {p.title}
            </div>
            <div className="text-mist-500 text-[12.5px] mt-1 leading-snug">
              {p.desc}
            </div>
            {p.href && (
              <a
                href={p.href}
                onClick={() => { try { if (typeof window !== "undefined" && typeof window.puEvent === "function") window.puEvent("product_cta_click", { product: "pro_lifetime", context: "house_promo" }); } catch (e) {} }}
                className="pu-press mt-3 inline-flex items-center text-[13px] font-bold text-gold"
              >
                {p.cta || "Dekho"} →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- Real AdSense unit ----
  return (
    <div ref={ref} className={`pu-card overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-full-width-responsive="true"
      />
    </div>
  );
}
