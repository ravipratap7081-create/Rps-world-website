// Free Exam Document Tools — server-rendered referral section (Round 9,
// 11 Nov 2026). Rendered in app/page.js right after the Tools section,
// OUTSIDE HomeClient, so crawlers see it in the initial HTML.
// All three links verified HTTP 200 before adding. No invented claims:
// titles/descriptions match the linked ProTools pages; deadlines are the
// form deadlines as given for this section.
// AURORA GLASS v2 (22 Nov 2026): only styling changed — links (incl. UTM),
// titles, descriptions and deadlines are UNCHANGED.
const UTM =
  "?utm_source=rps-world&utm_medium=referral&utm_campaign=exam-tools";

const TOOLS = [
  {
    href:
      "https://protools.rpsworld.in/rrb-ntpc-signature-30-49kb" +
      UTM,
    icon: "📄",
    title: "RRB NTPC Signature 30–49KB",
    desc: "Signature ko 30–49KB me taiyaar karo",
    deadline: "Registration closed 15 Nov 2026, 23:59 • Correction window 16–25 Nov OPEN",
  },
  {
    href:
      "https://protools.rpsworld.in/cwc-recruitment-2026-document-preparation" +
      UTM,
    icon: "📝",
    title: "CWC Recruitment 2026",
    desc: "Registration ke liye documents taiyaar karo",
    deadline: "Registration + fee last date: 15 Nov 2026",
  },
  {
    href:
      "https://protools.rpsworld.in/up-tgt-2026-photo-signature-pdf" +
      UTM,
    icon: "🎓",
    title: "UP TGT 2026",
    desc: "Photo aur signature sahi size me taiyaar karo",
    deadline: "Fee last date: 23 Nov 2026",
  },
];

export default function ExamToolsSection() {
  return (
    <section aria-label="Free Exam Document Tools" className="exam-tools-sec">
      <div className="aurora-wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">✦ ProTools · Free</span>
          <h2 style={{ fontSize: "clamp(28px, 4.6vw, 44px)" }}>
            Free Exam Document Tools
          </h2>
          <p>
            Exam form ke liye photo aur signature sahi size me — free, bina login,
            bina signup. File aapke browser me hi process hoti hai.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOOLS.map((t) => (
            <a key={t.href} href={t.href} target="_blank" rel="noopener" className="exam-tool-card reveal">
              <p className="font-bold text-white">
                {t.icon} {t.title}
              </p>
              <p className="text-[13px] text-white/60 mt-1">{t.desc}</p>
              <p className="text-[13px] font-semibold mt-2" style={{ color: "#5eead4" }}>
                ⏰ {t.deadline}
              </p>
              <p className="text-[13px] font-bold mt-1" style={{ color: "#5eead4" }}>
                Open free tool →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
