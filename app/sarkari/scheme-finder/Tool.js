"use client";
import { useState } from "react";
import Link from "next/link";
import { SCHEMES } from "../../../lib/schemes-data";

// Income bands: 1 = ₹2 Lakh se kam, 2 = ₹2–5 Lakh, 3 = ₹5 Lakh se zyada
// Scheme maxIncomeBand = sabse zyada eligible band. User band <= scheme maxIncomeBand hona chahiye.
// scheme.maxIncomeBand null = koi income rule nahi = pass.

const OCC_LABELS = {
  student: "Student",
  farmer: "Kisaan",
  business: "Business / Self-employed",
  job: "Naukri",
  unemployed: "Unemployed",
  widow: "Widow",
  senior: "Senior Citizen",
};

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function matchesScheme(s, { age, gender, category, incomeBand, occupation }) {
  const r = s.rules;
  if (r.minAge != null && age < r.minAge) return false;
  if (r.maxAge != null && age > r.maxAge) return false;
  if (r.gender === "Female" && gender !== "Female") return false;
  if (r.categories) {
    const catOk = r.categories.includes(category);
    const womenOk = r.womenEligible && gender === "Female";
    if (!catOk && !womenOk) return false;
  }
  if (r.maxIncomeBand != null && incomeBand > r.maxIncomeBand) return false;
  if (r.occupations) {
    const occOk = r.occupations.includes(occupation) || r.occupations.includes("any");
    if (!occOk) return false;
  }
  return true;
}

export default function Tool() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("General");
  const [incomeBand, setIncomeBand] = useState("1");
  const [occupation, setOccupation] = useState("student");
  const [results, setResults] = useState(null);

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none";
  const labelCls = "block text-[13px] font-semibold text-mist-300 mb-1.5";

  function onSubmit(e) {
    e.preventDefault();
    const a = parseInt(age, 10);
    if (!age || Number.isNaN(a) || a < 1 || a > 120) {
      alert("Sahi umra likhein (1–120 ke beech).");
      return;
    }
    const q = {
      age: a,
      gender,
      category,
      incomeBand: parseInt(incomeBand, 10),
      occupation,
    };
    const matched = SCHEMES.filter((s) => matchesScheme(s, q));
    setResults(matched);
  }

  function resetAll() {
    setResults(null);
  }

  return (
    <div>
      <div className="pu-card p-4 mb-5">
        <p className="text-[13px] text-mist-300 leading-snug">
          Koi AI nahi — ye list official sarkari jaankari se bani hai. Aapki details kahin
          bheji nahi jaati. Sab kuch aapke phone/browser me hi filter hota hai —{" "}
          <span className="font-extrabold text-mist-100">koi phone number nahi manga jata</span>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="pu-card p-4 space-y-4">
        <div>
          <label className={labelCls}>Aapki umra (Age)</label>
          <input
            type="number"
            min="1"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Jaise: 24"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputCls}
          >
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            <option value="General">General</option>
            <option value="EWS">EWS</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Parivaar ki saalana aay (Family income)</label>
          <select
            value={incomeBand}
            onChange={(e) => setIncomeBand(e.target.value)}
            className={inputCls}
          >
            <option value="1">₹2 Lakh se kam</option>
            <option value="2">₹2–5 Lakh</option>
            <option value="3">₹5 Lakh se zyada</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Kaam (Occupation)</label>
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className={inputCls}
          >
            {Object.entries(OCC_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px]"
        >
          🔍 Schemes dekhein
        </button>
      </form>

      {results !== null && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-extrabold text-mist-100">
              {results.length > 0 ? `${results.length} scheme(s) mili` : "Koi match nahi"}
            </h2>
            <button
              onClick={resetAll}
              className="text-[13px] font-semibold text-gold underline underline-offset-2"
            >
              ↺ Dobara check karein
            </button>
          </div>

          <p className="text-[13px] text-mist-300 mb-4 leading-snug">
            Possible matches — final eligibility official portal par confirm karein
          </p>

          {results.length === 0 ? (
            <div className="pu-card p-5 text-center">
              <p className="text-[15px] font-bold text-mist-100 mb-2">
                Is profile ke hisaab se hamari list me koi scheme match nahi hui.
              </p>
              <p className="text-[13px] text-mist-400 leading-snug mb-4">
                Chinta na karein — shayad galti se koi option galat chun gaya ho. Ek baar
                dobara check kar lein, ya official portals ki poori list dekhein.
              </p>
              <Link
                href="/sarkari/links"
                className="pu-btn-primary pu-press inline-block px-6 py-3 rounded-2xl font-extrabold text-[14px]"
              >
                🔗 Sabhi sarkari portals dekhein
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((s) => (
                <div key={s.id} className="pu-card p-4">
                  <h3 className="text-[15px] font-extrabold text-mist-100 mb-1">{s.name}</h3>
                  <p className="text-[13px] text-mist-300 leading-snug mb-3">{s.benefit}</p>
                  <p className="text-[12px] font-semibold text-mist-400 mb-2">
                    Zaroori kagaz:
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {s.docs.map((d, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-mist-300"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <a
                    href={s.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pu-btn-primary pu-press inline-block px-5 py-2.5 rounded-2xl font-extrabold text-[14px]"
                  >
                    🔗 Official portal par apply karein
                  </a>
                  <p className="text-[11px] text-mist-500 mt-3">
                    Source: {domainOf(s.sourceUrl)} • Last verified: {s.lastVerified}
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="text-[12px] text-mist-500 leading-snug mt-6">
            ⚠️ Ye list curated jaankari se bani hai — niyam samay ke saath badal sakte hain.
            Apply karne se pehle official portal ki eligibility zaroor padh lein.
          </p>
        </div>
      )}
    </div>
  );
}
