"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ModeShell from "../../components/ModeShell";
import { useCoins } from "../../hooks/useCoins";
import { PageHeader, PremiumCard, SkeletonRow, EmptyState } from "../../components/Premium";
import AdSlot from "../../components/AdSlot";
import {
  IconCoins, IconCalendar, IconShare, IconCrown,
  IconGift, IconCheck, IconZap, IconLock,
} from "../../components/icons";
import { PRO_PRICE_INR, PRO_FEATURES, PRO_TERMS, PRO_ACTIVATION_NOTE } from "../../lib/pro";

export default function CoinsPage() {
  const router = useRouter();
  const { balance, earn, spend, loggedIn, loading } = useCoins();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [proEmail, setProEmail] = useState("");
  const [proPhone, setProPhone] = useState("");
  const [proOrder, setProOrder] = useState("");
  const [proStatus, setProStatus] = useState(null); // null | {pro_active, activation, pro_until, paid, note}
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const oid = q.get("pro_order_id") || "";
      if (oid.startsWith("PRO149_")) {
        setProOrder(oid);
        // Server-checked return status — this fetch never activates Pro,
        // it only reads /api/pro-status (Cashfree + pro_orders).
        fetch(`/api/pro-status?order_id=${encodeURIComponent(oid)}`)
          .then((r) => r.json().then((j) => ({ ok: r.ok, j })).catch(() => ({ ok: false, j: {} })))
          .then(({ ok, j }) => {
            if (ok) setProStatus(j);
            else setProStatus({ pro_active: false, activation: "check_failed", note: "Status check nahi ho paya — order ID sambhal kar rakhein." });
          })
          .catch(() => setProStatus({ pro_active: false, activation: "check_failed", note: "Status check nahi ho paya — order ID sambhal kar rakhein." }));
      }
    } catch (e) {}
  }, []);

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

    const buyPro = async () => {
    const email = proEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg("Sahi email daalo — payment confirmation usi par aayega.");
      return;
    }
    const phone = proPhone.replace(/\D/g, "");
    if (phone.length !== 10) {
      setMsg("10-digit mobile number daalo.");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const controller = new AbortController();
      const fetchTimer = setTimeout(() => controller.abort(), 15000);
      let r;
      try {
        // ROUTE CHANGE 29 Oct 2026: Payment Link route, no JS SDK.
        // The SDK checkout hung 4 times in-browser (no error, no
        // navigation); a Payment Link is a plain hosted-URL redirect.
        r = await fetch("/api/checkout/pro-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, phone }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(fetchTimer);
      }
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.link_url) {
        setMsg(r.status === 503 ? "Pro checkout abhi configure nahi hai — payment nahi li gayi hai." : (j.error || "Checkout start nahi ho paya."));
        setBusy(false);
        return;
      }
      // Plain redirect to Cashfree's hosted Payment Link page.
      window.location.href = j.link_url;
      return;
    } catch (e) {
      setMsg(e && e.name === "AbortError" ? "Checkout start nahi ho paya — request timeout (15s), server jawab nahi de raha." : `Checkout start nahi ho paya — ${e && e.message ? e.message : "connection check karo"}`);
      setBusy(false);
    }
  };

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
        {proOrder && (
          <p className="text-amber-200 text-[13px] mt-3 px-3">
            Pro order {proOrder} —{" "}
            {proStatus === null
              ? "status check ho raha hai…"
              : proStatus.pro_active
                ? `Pro ACTIVE hai — ${proStatus.pro_until ? new Date(proStatus.pro_until).toLocaleDateString("en-IN") : ""} tak.`
                : proStatus.activation === "manual_pending"
                  ? "Payment Cashfree par PAID dikha, par Pro record abhi active nahi hai — webhook record aane tak Pro active nahi hoga. Order ID sambhal kar rakhein."
                  : proStatus.activation === "check_failed"
                    ? proStatus.note
                    : "Payment complete nahi hua — Pro active nahi hai."}
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
            desc: "Unlock Pro trial — same Pro features as the paid plan (see below).",
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
              <span className="block text-mist-500 text-[12px] mt-0.5">Pro features, 7 days (coin trial)</span>
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
              <span className="block text-mist-500 text-[12px] mt-0.5">Pro features, full month (coin trial)</span>
            </span>
            <span className="text-gold font-bold text-[14px]">300 🪙</span>
          </button>
        </PremiumCard>
      </div>

      {/* Pro subscription — ₹149/month via Cashfree (no auto-renewal) */}
      <PremiumCard accent className="mt-4 p-5 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,179,1,0.16), transparent 70%)" }}
        />
        <div className="flex items-center gap-2 mb-2">
          <IconCrown size={20} className="text-gold" />
          <span className="font-bold text-mist-100 text-[16px]">Pro — ₹{PRO_PRICE_INR}/month</span>
        </div>
        <ul className="text-mist-300 text-[13px] leading-relaxed space-y-1 mb-3">
          {PRO_FEATURES.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>
        <p className="text-mist-300 text-[12px] leading-relaxed mb-3">{PRO_TERMS}</p>
        <p className="text-amber-200/90 text-[12px] leading-relaxed mb-3">{PRO_ACTIVATION_NOTE}</p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email (payment confirmation ke liye)"
            value={proEmail}
            onChange={(e) => setProEmail(e.target.value)}
            className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-[14px] outline-none"
          />
          <input
            type="tel"
            placeholder="10-digit mobile number"
            maxLength={10}
            value={proPhone}
            onChange={(e) => setProPhone(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-[14px] outline-none"
          />
        </div>
        <button
          onClick={buyPro}
          disabled={busy}
          className="pu-btn-premium pu-press w-full mt-4 text-[15px] disabled:opacity-60"
        >
          {busy ? "Please wait…" : `💳 Buy Pro — ₹${PRO_PRICE_INR}/month`}
        </button>
        <p className="text-mist-600 text-[11px] mt-2.5 text-center">
          Diwali Business Kit (₹149, Instamojo) alag product hai — Pro ka payment usse mix nahi hota hai.
        </p>
      </PremiumCard>

      <p className="text-mist-600 text-[11px] mt-6 leading-relaxed text-center">
        Pro Coins can only be used inside the app — they have no cash value.
        Earned coins expire in 30 days.
      </p>
    </ModeShell>
  );
}
