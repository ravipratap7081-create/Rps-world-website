"use client";
import { useRouter } from "next/navigation";
import { IconLandmark, IconZap, IconHome, IconChevronRight } from "../../components/icons";

const MODES = [
  {
    id: "sarkari",
    icon: <IconLandmark size={30} />,
    title: "Sarkari Mode",
    tagline: "Forms, photos, PDFs — all government work in one place",
    tint: "rgba(249,115,22,0.14)",
    glow: "rgba(249,115,22,0.25)",
  },
  {
    id: "genz",
    icon: <IconZap size={30} />,
    title: "Gen-Z Mode",
    tagline: "AI tools, resume, doubt-solver — full speed",
    tint: "rgba(167,139,250,0.14)",
    glow: "rgba(167,139,250,0.25)",
  },
  {
    id: "parivaar",
    icon: <IconHome size={30} />,
    title: "Parivaar Mode",
    tagline: "Home tasks, bills, kids\u2019 education",
    tint: "rgba(52,211,153,0.14)",
    glow: "rgba(52,211,153,0.25)",
  },
];

export default function Onboarding() {
  const router = useRouter();

  const pick = (id) => {
    try {
      localStorage.setItem("pro-mode", id);
      localStorage.setItem("pro-onboarded", "1");
    } catch (e) {}
    router.push("/" + id);
  };

  return (
    <main className="min-h-screen bg-ink-950 pu-ambient px-5 py-10 flex flex-col items-center justify-center relative">
      <div className="text-center mb-9 animate-fadeUp relative">
        <div
          className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-5 animate-floaty"
          style={{
            background: "linear-gradient(135deg, rgba(245,179,1,0.2), rgba(245,179,1,0.05))",
            border: "1px solid rgba(245,179,1,0.3)",
            boxShadow: "0 0 40px rgba(245,179,1,0.18)",
          }}
        >
          <span className="text-gold font-extrabold text-3xl">P</span>
        </div>
        <h1 className="text-[32px] font-extrabold text-mist-100 tracking-tight">
          Pro Universe
        </h1>
        <p className="text-mist-300 mt-2 text-[15px] leading-relaxed">
          Choose your mode —
          <br />
          the app will adapt accordingly
        </p>
      </div>

      <div className="w-full max-w-md space-y-3.5 pu-stagger relative">
        {MODES.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => pick(m.id)}
            style={{ "--i": idx }}
            className="pu-card pu-press pu-press-card w-full text-left p-5 flex items-center gap-4"
          >
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-gold"
              style={{
                background: m.tint,
                boxShadow: `0 0 24px ${m.glow}`,
              }}
            >
              {m.icon}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[17px] font-bold text-mist-100">
                {m.title}
              </span>
              <span className="block text-mist-500 text-[13px] mt-0.5 leading-snug">
                {m.tagline}
              </span>
            </span>
            <span className="text-gold shrink-0">
              <IconChevronRight size={22} />
            </span>
          </button>
        ))}
      </div>

      <p className="text-mist-600 text-[12px] mt-8 text-center relative">
        You can switch modes anytime later
      </p>
    </main>
  );
}
