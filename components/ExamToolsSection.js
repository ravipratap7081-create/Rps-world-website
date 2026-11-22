// Free Exam Document Tools — server-rendered referral section (Round 9,
// 11 Nov 2026). Rendered in app/page.js right after the hero, OUTSIDE
// HomeClient, so crawlers see it in the initial HTML — HomeClient alone
// renders only a loading pulse server-side (useEffect reads
// localStorage["pro-mode"]). All three links verified HTTP 200 before
// adding. No invented claims: titles/descriptions match the linked
// ProTools pages; deadlines are the form deadlines as given for this
// section. Style matches the homepage tools grid (same card class).
const UTM =
  "?utm_source=rps-world&utm_medium=referral&utm_campaign=exam-tools";

const TOOLS = [
  {
    href:
      "https://pdf-merge-split-free.vercel.app/rrb-ntpc-signature-30-49kb" +
      UTM,
    icon: "📄",
    title: "RRB NTPC Signature 30–49KB",
    desc: "Signature ko 30–49KB me taiyaar karo",
    deadline: "Registration closed 15 Nov 2026, 23:59 • Correction window 16–25 Nov OPEN",
  },
  {
    href:
      "https://pdf-merge-split-free.vercel.app/cwc-recruitment-2026-document-preparation" +
      UTM,
    icon: "📝",
    title: "CWC Recruitment 2026",
    desc: "Registration ke liye documents taiyaar karo",
    deadline: "Registration + fee last date: 15 Nov 2026",
  },
  {
    href:
      "https://pdf-merge-split-free.vercel.app/up-tgt-2026-photo-signature-pdf" +
      UTM,
    icon: "🎓",
    title: "UP TGT 2026",
    desc: "Photo aur signature sahi size me taiyaar karo",
    deadline: "Fee last date: 23 Nov 2026",
  },
];

export default function ExamToolsSection() {
  const card =
    "block rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-400/40";
  return (
    <section aria-label="Free Exam Document Tools" className="mt-8">
      <p className="mix-kicker">ProTools · Free</p>
      <h2 className="text-[18px] font-bold text-amber-300 mt-1 mb-1">
        Free Exam Document Tools
      </h2>
      <p className="text-[13px] text-white/60 leading-relaxed">
        Exam form ke liye photo aur signature sahi size me — free, bina login,
        bina signup. File aapke browser me hi process hoti hai.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {TOOLS.map((t) => (
          <a key={t.href} href={t.href} className={card}>
            <p className="font-bold text-white">
              {t.icon} {t.title}
            </p>
            <p className="text-[13px] text-white/60 mt-1">{t.desc}</p>
            <p className="text-[13px] text-amber-300/90 font-semibold mt-2">
              ⏰ {t.deadline}
            </p>
            <p className="text-[13px] text-[#E3B34B] font-bold mt-1">
              Open free tool →
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
