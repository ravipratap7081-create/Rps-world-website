"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModeShell from "../../components/ModeShell";
import { useCoins } from "../../hooks/useCoins";
import { PageHeader, PremiumCard, SkeletonRow, EmptyState } from "../../components/Premium";
import AdSlot from "../../components/AdSlot";
import {
  IconCoins, IconCalendar, IconShare, IconCrown,
  IconGift, IconCheck, IconZap, IconLock,
} from "../../components/icons";

export default function CoinsPage() {
  const router = useRouter();
  const { balance, earn, spend, loggedIn, loading } = useCoins();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && !loggedIn) {
    return (
      <ModeShell mode="sarkari">
        <EmptyState
          icon={<IconCoins size={26} />}
          title="Log in to earn coins"
          desc="Daily check-in, sharing and rewards — all after login."
          actionLabel="Log In"
          onAction={() => router.push("/login")}
        />
      </ModeShell>
    );
  }

  const doEarn = async (action, label) => {
    setBusy(true);
    const j = await earn(action);
    setBusy(false);
    if (j && typeof j.earned === "number") {
      setMsg(`+${j.earned} coins — ${label}!`);
    } else if (j && j.error === "already checked in today") {
      setMsg("Aaj ka check-in ho gaya hai — kal phir aana!");
    } else {
      setMsg("Keep going…");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const doSpend = async (reward, label) => {
    setBusy(true);
    const j = await spend(reward);
    setBusy(false);
    if (j && j.redeemed) setMsg(`${j.redeemed} unlocked!`);
    else if (j && j.error === "insufficient coins") setMsg("Not enough coins — earn more first!");
    else setMsg("Kuch gadbad hui…");
    setTimeout(() => setMsg(""), 2500);
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Pro Universe", url: location.origin });
        doEarn("shared", "Thanks for sharing!");
      } else {
        await navigator.clipboard.writeText(location.origin);
        doEarn("shared", "Link copy ho gaya");
      }
    } catch (e) {}
  };

  return (
    <ModeShell mode="sarkari">
      {/* Balance hero */}
      <div className="text-center py-7 animate-fadeUp">
        <div
          className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-4 animate-floaty"
          style={{
            background: "linear-gradient(135deg, rgba(245,179,1,0.22), rgba(245,179,1,0.06))",
            border: "1px solid rgba(245,179,1,0.32)",
            boxShadow: "0 0 44px rgba(245,179,1,0.2)",
          }}
        >
          <IconCoins size={38} className="text-gold" />
        </div>
        {loading ? (
          <div className="pu-skeleton h-10 w-28 mx-auto rounded-xl" />
        ) : (
          <div className="text-[42px] font-extrabold text-gold tracking-tight leading-none">
            {balance === null ? "…" : balance}
          </div>
        )}
        <p className="text-mist-500 text-[13px] mt-2">Pro Coins</p>
        {msg && (
          <p className="text-emerald-300 text-[13.5px] font-semibold mt-3 animate-fadeUp flex items-center justify-center gap-1.5">
            <IconCheck size={15} />
            {msg}
          </p>
        )}
      </div>

      {/* Earn */}
      <p className="pu-section-label">Earn Coins</p>
      {loading ? (
        <div className="space-y-3"><SkeletonRow /><SkeletonRow /></div>
      ) : (
        <div className="space-y-3 pu-stagger">
          <PremiumCard i={0}>
            <button
              disabled={busy}
              onClick={() => doEarn("daily_checkin", "Daily check-in")}
              className="pu-press w-full flex items-center gap-3.5 p-4 text-left"
            >
              <span className="w-11 h-11 rounded-2xl bg-emerald-500/12 text-emerald-300 flex items-center justify-center shrink-0">
                <IconCalendar size={21} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-mist-100 text-[15px]">Daily check-in</span>
                <span className="block text-mist-500 text-[12px] mt-0.5">Come daily, earn coins</span>
              </span>
              <span className="text-gold font-bold text-[14px]">+10</span>
            </button>
          </PremiumCard>
          <PremiumCard i={1}>
            <button
              disabled={busy}
              onClick={share}
              className="pu-press w-full flex items-center gap-3.5 p-4 text-left"
            >
              <span className="w-11 h-11 rounded-2xl bg-violet-500/12 text-violet-300 flex items-center justify-center shrink-0">
                <IconShare size={21} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-mist-100 text-[15px]">Share the app</span>
                <span className="block text-mist-500 text-[12px] mt-0.5">Tell your friends</span>
              </span>
              <span className="text-gold font-bold text-[14px]">+20</span>
            </button>
          </PremiumCard>
        </div>
      )}

      <div className="mt-4">
        <AdSlot
          i={2}
          housePromo={{
            icon: <IconZap size={22} />,
            title: "What do coins get you?",
            desc: "Unlock Pro trial — unlimited tools, zero interruptions.",
            cta: "See below",
            href: "#pro",
          }}
        />
      </div>

      {/* Pro redeem */}
      <p className="pu-section-label mt-6" id="pro">Unlock Pro</p>
      <div className="space-y-3 pu-stagger">
        <PremiumCard accent i={3}>
          <button
            disabled={busy}
            onClick={() => doSpend("pro_7day", "7-day Pro")}
            className="pu-press w-full flex items-center gap-3.5 p-4 text-left"
          >
            <span className="w-11 h-11 rounded-2xl bg-gold/14 text-gold flex items-center justify-center shrink-0">
              <IconZap size={21} />
            </span>
            <span className="flex-1">
              <span className="block font-bold text-mist-100 text-[15px]">7-Day Pro Trial</span>
              <span className="block text-mist-500 text-[12px] mt-0.5">Unlimited tools, 7 days</span>
            </span>
            <span className="text-gold font-bold text-[14px]">100 🪙</span>
          </button>
        </PremiumCard>
        <PremiumCard accent i={4}>
          <button
            disabled={busy}
            onClick={() => doSpend("pro_30day", "30-day Pro")}
            className="pu-press w-full flex items-center gap-3.5 p-4 text-left"
          >
            <span className="w-11 h-11 rounded-2xl bg-gold/14 text-gold flex items-center justify-center shrink-0">
              <IconCrown size={21} />
            </span>
            <span className="flex-1">
              <span className="block font-bold text-mist-100 text-[15px]">30-Day Pro Trial</span>
              <span className="block text-mist-500 text-[12px] mt-0.5">Full month, full speed</span>
            </span>
            <span className="text-gold font-bold text-[14px]">300 🪙</span>
          </button>
        </PremiumCard>
      </div>

      {/* Lifetime Pro upsell — the real earning hook */}
      <PremiumCard accent className="mt-4 p-5 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,179,1,0.16), transparent 70%)" }}
        />
        <div className="flex items-center gap-2 mb-2">
          <IconCrown size={20} className="text-gold" />
          <span className="font-bold text-mist-100 text-[16px]">Pro — Lifetime</span>
        </div>
        <p className="text-mist-300 text-[13px] leading-relaxed">
          Unlimited PDF tools, priority AI, zero limits.{" "}
          <b className="text-gold">₹499 one-time</b> — less than ₹1.4/day.
        </p>
        <button
          onClick={async () => {
            try { if (typeof window !== "undefined" && typeof window.puEvent === "function") window.puEvent("product_cta_click", { product: "pro_lifetime", price_inr: 499 }); } catch (e) {}
            setBusy(true);
            setMsg("");
            try {
              // Step 1: Create order
              const or = await fetch("/api/payment/order", { method: "POST" });
              const oj = await or.json();
              if (!or.ok) {
                setMsg(oj.message || "Payment not available yet — try again soon.");
                setBusy(false);
                return;
              }
              // Step 2: Load Razorpay checkout
              if (!window.Razorpay) {
                await new Promise((res, rej) => {
                  const sc = document.createElement("script");
                  sc.src = "https://checkout.razorpay.com/v1/checkout.js";
                  sc.onload = res; sc.onerror = rej;
                  document.body.appendChild(sc);
                });
              }
              const rzp = new window.Razorpay({
                key: oj.keyId,
                amount: oj.amount,
                currency: oj.currency,
                name: "Pro Universe",
                description: "Pro Lifetime — one payment, forever",
                order_id: oj.orderId,
                theme: { color: "#f5b301" },
                handler: async (resp) => {
                  // Step 3: Verify payment
                  const vr = await fetch("/api/payment/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resp),
                  });
                  const vj = await vr.json();
                  if (vj.success) {
                    setMsg("🎉 Pro Lifetime unlocked! Welcome!");
                  } else {
                    setMsg(vj.error || "Verification failed — contact support.");
                  }
                  setBusy(false);
                },
                modal: { ondismiss: () => setBusy(false) },
              });
              rzp.open();
            } catch (e) {
              setMsg("Payment failed to start — check connection.");
              setBusy(false);
            }
          }}
          disabled={busy}
          className="pu-btn-premium pu-press w-full mt-4 text-[15px] disabled:opacity-60"
        >
          {busy ? "Please wait…" : "💳 Buy Pro Lifetime — ₹499"}
        </button>
        <p className="text-mist-600 text-[11px] mt-2.5 text-center">
          Launch offer: first 100 users get a special price
        </p>
      </PremiumCard>

      <p className="text-mist-600 text-[11px] mt-6 leading-relaxed text-center">
        Pro Coins can only be used inside the app — they have no cash value.
        Earned coins expire in 30 days.
      </p>
    </ModeShell>
  );
}
