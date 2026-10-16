import ModeShell from "../../components/ModeShell";
import { WORKFLOWS } from "../../lib/kaampath-workflows";
import { PageHeader, PremiumCard, SectionLabel, TrustBadge } from "../../components/Premium";
import { IconShield, IconLandmark, IconCheck } from "../../components/icons";
import CategoryFilter from "./_components/CategoryFilter";
import MereKaamSection from "./_components/MereKaamSection";

export const metadata = {
  title: "KaamPath — सरकारी काम, step-by-step",
  description:
    "स्कॉलरशिप, जाति-निवास-आय प्रमाण पत्र, राशन कार्ड, वोटर ID, ई-पैन, पासपोर्ट, ड्राइविंग लाइसेंस और आयुष्मान कार्ड — आधिकारिक स्रोत से सत्यापित step-by-step गाइड, दस्तावेज़ चेकलिस्ट और काम के टूल, सब एक जगह।",
  keywords:
    "kaampath, सरकारी काम, up scholarship, जाति प्रमाण पत्र, निवास प्रमाण पत्र, आय प्रमाण पत्र, राशन कार्ड, voter id, pan card, passport, driving licence, ayushman card",
};

const HOW_IT_WORKS = [
  { n: 1, title: "चुनें", desc: "10 सत्यापित गाइड में से अपना सरकारी काम चुनें।" },
  { n: 2, title: "तैयार करें", desc: "दस्तावेज़ तैयार करके step-by-step आवेदन करें।" },
  { n: 3, title: "ट्रैक करें", desc: "प्रगति सेव करके आगे की स्थिति ट्रैक करें।" },
];

export default function KaamPathLanding() {
  return (
    <ModeShell mode="sarkari">
      {/* Hero */}
      <PageHeader
        title="KaamPath — सरकारी काम, step-by-step"
        subtitle="हर सरकारी काम का सही रास्ता — आधिकारिक पोर्टल से सत्यापित स्टेप्स, दस्तावेज़ों की चेकलिस्ट और काम के टूल, सब एक जगह।"
        right={
          <span className="shrink-0">
            <TrustBadge icon={<IconShield size={12} />} text="स्रोत-सत्यापित" />
          </span>
        }
      />

      {/* How it works strip */}
      <section className="mb-7">
        <SectionLabel>कैसे काम करता है</SectionLabel>
        <div className="pu-stagger grid grid-cols-3 gap-2.5">
          {HOW_IT_WORKS.map((s, i) => (
            <PremiumCard key={s.n} i={i} className="p-3.5 text-center">
              <span className="w-8 h-8 mx-auto rounded-full bg-gold/12 text-gold text-[14px] font-extrabold flex items-center justify-center mb-2">
                {s.n}
              </span>
              <p className="text-[13.5px] font-bold text-mist-100">{s.title}</p>
              <p className="text-mist-500 text-[11.5px] mt-1 leading-snug">{s.desc}</p>
            </PremiumCard>
          ))}
        </div>
      </section>

      {/* Saved workflows */}
      <MereKaamSection />

      {/* Category filter + grid */}
      <CategoryFilter workflows={WORKFLOWS} />

      {/* Trust note */}
      <PremiumCard className="p-4 flex items-start gap-3" accent>
        <span className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/12 text-emerald-300 flex items-center justify-center">
          <IconLandmark size={19} />
        </span>
        <div>
          <p className="text-[13.5px] font-bold text-mist-100 flex items-center gap-1.5">
            <IconCheck size={15} className="text-emerald-300" />
            सिर्फ आधिकारिक जानकारी
          </p>
          <p className="text-mist-500 text-[12.5px] mt-1 leading-relaxed">
            हर गाइड 16 अक्टूबर 2026 को आधिकारिक सरकारी पोर्टल से सत्यापित है। जहां जानकारी
            सत्यापित नहीं हो सकी, वहां फीस/अंतिम तिथि के बजाय "आधिकारिक वेबसाइट पर देखें" दिखता है —
            कोई अंदाज़ा नहीं।
          </p>
        </div>
      </PremiumCard>
    </ModeShell>
  );
}
