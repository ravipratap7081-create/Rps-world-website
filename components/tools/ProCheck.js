// components/tools/ProCheck.js — client-side Pro status UI, server-decided.
// The component asks for the PAYMENT EMAIL, calls /api/pro-check, and
// reports isPro to the parent via onChange. It never stores anything in
// localStorage, never sets a client flag, and never grants Pro on error:
// any check failure leaves the tool on the FREE cap. Pro status is
// re-checked per page load (state only), so an expired Pro stops lifting
// the cap as soon as pro_until passes.
"use client";
import { useState } from "react";

export default function ProCheck({ onChange, toolLabel = "tool" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState(null); // null | { isPro, pro_until, checked }
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const check = async () => {
    setError("");
    setBusy(true);
    try {
      const r = await fetch(`/api/pro-check?email=${encodeURIComponent(email.trim())}`);
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(j.error || "Pro check nahi ho paya — free limit hi lagegi.");
        setState({ isPro: false, pro_until: null, checked: false });
        onChange(false);
        return;
      }
      setState(j);
      onChange(!!j.isPro);
    } catch {
      setError("Pro check nahi ho paya — free limit hi lagegi.");
      setState({ isPro: false, pro_until: null, checked: false });
      onChange(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pu-card p-4">
      <p className="text-[13px] font-bold text-mist-100">Pro hai? Payment email daalo</p>
      <p className="text-[12px] text-mist-400 mt-1 leading-snug">
        Pro ka limit sirf tabhi milega jab server aapke payment email par active
        Pro paaye. Ye check har baar server se hota hai — browser me kuch save nahi hota.
      </p>
      <div className="flex gap-2 mt-3">
        <input
          type="email"
          placeholder="Payment email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-black/30 rounded-xl px-3 py-2.5 text-[14px] outline-none"
        />
        <button
          type="button"
          onClick={check}
          disabled={busy || !email.includes("@")}
          className="pu-btn-primary pu-press px-4 rounded-xl font-bold text-[13px] disabled:opacity-60"
        >
          {busy ? "Check…" : "Check Pro"}
        </button>
      </div>
      {state && state.isPro && (
        <p className="text-emerald-300 text-[13px] font-semibold mt-2">
          ✓ Pro ACTIVE hai — {state.pro_until ? new Date(state.pro_until).toLocaleDateString("en-IN") : ""} tak {toolLabel} par Pro limit milegi.
        </p>
      )}
      {state && !state.isPro && !error && (
        <p className="text-mist-400 text-[13px] mt-2">
          Is email par active Pro nahi mila — free limit lagegi.
        </p>
      )}
      {error && <p className="text-red-300 text-[13px] mt-2">{error}</p>}
    </div>
  );
}
