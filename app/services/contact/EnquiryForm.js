"use client";
import { useState } from "react";

// Website enquiry form — the WhatsApp ALTERNATIVE (audit Fix 5, 7 Nov 2026).
// WhatsApp stays the primary CTA on this page; this form is for visitors
// who will not WhatsApp a stranger first. It posts to the EXISTING leads
// path: window.trackLead (components/Tracker.js) -> Supabase `leads` table.
// trackLead is fail-silent by design (no env in local dev = no-op); in
// production the Render env vars are set and the row is recorded. No new
// API route was created for this form.
const BUSINESS_TYPES = [
  "Boutique",
  "Salon",
  "Jewellery",
  "Cafe",
  "Gym",
  "Coaching",
  "Photography",
  "Other",
];

const PAGE_OPTIONS = ["5 tak", "10 tak", "Usse zyada"];

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [pages, setPages] = useState("5 tak");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError("Apna naam likho.");
      return;
    }
    if (!businessType) {
      setError("Business type chuno.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError("Sahi 10-digit WhatsApp number likho (6–9 se shuru).");
      return;
    }
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.trackLead === "function"
      ) {
        window.trackLead(name.trim(), digits, "website-enquiry", {
          businessType,
          pages,
        });
      }
    } catch (err) {
      // fail-silent, like the rest of the tracker — the WhatsApp
      // alternative below stays available.
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-5">
        <p className="font-bold text-white mb-1">
          Enquiry bhej di gayi hai. Dhanyavaad!
        </p>
        <p className="text-white/70 text-sm mb-3">
          Pehla jawab 24 hours ke andar milega. Turant baat karni ho to
          WhatsApp par bhi bhej sakte ho:
        </p>
        <a
          href="https://wa.me/919235039317?text=Namaste%2C%20mujhe%20website%20banwana%20hai.%20Business%20type%3A%20%20Business%20name%3A%20%20Pages%20chahiye%3A%20%20Content%20taiyaar%20hai%3A%20Haan%2FNahi%20%20Contact%20person%20ka%20naam%3A%20"
          className="inline-block rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-black"
        >
          💬 WhatsApp par enquiry bhejo →
        </a>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white outline-none placeholder-white/40 focus:border-amber-400/60";
  const label = "block text-sm font-bold text-white mb-1.5";

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div>
        <label htmlFor="eq-name" className={label}>
          Aapka naam
        </label>
        <input
          id="eq-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jaise: Ritu Sharma"
          autoComplete="name"
          className={input}
        />
      </div>
      <div>
        <label htmlFor="eq-type" className={label}>
          Business type
        </label>
        <select
          id="eq-type"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className={input}
        >
          <option value="" className="text-black">
            Chuno…
          </option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t} className="text-black">
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="eq-pages" className={label}>
          Kitne pages chahiye
        </label>
        <select
          id="eq-pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className={input}
        >
          {PAGE_OPTIONS.map((p) => (
            <option key={p} value={p} className="text-black">
              {p}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="eq-phone" className={label}>
          WhatsApp number
        </label>
        <input
          id="eq-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10-digit mobile number"
          inputMode="numeric"
          autoComplete="tel"
          className={input}
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm font-semibold text-red-400">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-black hover:bg-amber-300"
      >
        Enquiry bhejo →
      </button>
      <p className="text-white/50 text-xs">
        Sirf wahi jaankari bhejo jo scope ke liye chahiye. Koi password, OTP,
        bank login ya API key kabhi mat bhejo.
      </p>
    </form>
  );
}
