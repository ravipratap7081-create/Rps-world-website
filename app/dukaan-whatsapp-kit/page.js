import PrivacyChoicesLink from "../../components/PrivacyChoicesLink";

export const metadata = {
  title: "Dukaan WhatsApp Kit — ₹499 | ProTools",
  description: "Dukaan WhatsApp Kit ₹499 — 50 ready message templates, QR setup guide aur auto-reply. Diwali marketing khud karo, instant download.",
  openGraph: {
    title: "Dukaan WhatsApp Kit — ₹499 | ProTools",
    description: "Dukaan WhatsApp Kit ₹499 — 50 ready message templates, QR setup guide aur auto-reply. Diwali marketing khud karo, instant download.",
    url: "https://rps-world-website.onrender.com/dukaan-whatsapp-kit",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Dukaan WhatsApp Kit — ₹499 | ProTools", description: "Dukaan WhatsApp Kit ₹499 — 50 ready message templates, QR setup guide aur auto-reply. Diwali marketing khud karo, instant download." },
  alternates: { canonical: "https://rps-world-website.onrender.com/dukaan-whatsapp-kit" },
};

export default function DukaanKitPage() {
  return (
    <main className="min-h-screen bg-[#0A0E17] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Hero */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏪</div>
          <h1 className="text-3xl font-extrabold mb-3">
            Dukaan WhatsApp Kit
          </h1>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Har dukaan ke liye Diwali marketing — <strong className="text-white">khud karo!</strong><br/>
            50 ready message templates, QR setup guide, auto-reply — sab kuch!
          </p>
        </div>

        {/* Price card */}
        <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/20 border border-amber-500/30 rounded-2xl p-6 mb-8 text-center">
          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span className="text-4xl font-extrabold text-amber-300">₹499</span>
            <span className="text-white/40 line-through text-lg">₹999</span>
          </div>
          <p className="text-white/60 text-sm mb-4">One-time payment • Instant download</p>
          <div className="inline-block bg-white/10 border border-amber-500/30 text-amber-200 font-bold px-10 py-4 rounded-full text-lg">
            Jald Aa Raha Hai! 🚀
          </div>
          <p className="text-white/40 text-xs mt-3">Payment link setup ho raha hai — thoda intezaar karo!</p>
        </div>

        {/* What's inside */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-amber-300">📦 Kit me kya hai?</h2>
          <div className="space-y-3">
            {[
              ["💬", "50 Festival Message Templates", "Diwali, Holi, Eid, Christmas — Hindi + English, ready to copy-paste!"],
              ["📱", "QR Code Setup Guide", "Dukaan par QR lagao, customer khud scan karke judenge!"],
              ["🤖", "Auto-Reply Setup", "WhatsApp Business me 5 minute me auto-reply lagao!"],
              ["📅", "Festival Calendar 2026-27", "Kab kaunsa message bhejna hai — poora plan!"],
              ["💡", "Pro Tips", "Kab bhejo, kitna bhejo, kaise personalise karo!"],
            ].map(([emoji, title, desc]) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-2xl">{emoji}</span>
                <div>
                  <p className="font-bold text-[15px]">{title}</p>
                  <p className="text-white/60 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-amber-300">⚙️ Kaise kaam karega?</h2>
          <div className="space-y-3">
            {[
              "Kit kharido (₹499) — instant download!",
              "Guide padho (10 minute!)",
              "WhatsApp Business me setup karo",
              "QR print karke dukaan par lagao!",
              "Diwali par customers ko offer bhejo! 🎉",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="bg-amber-400 text-black font-bold w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0">{i + 1}</span>
                <p className="text-white/80 text-[15px] pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Honest note */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 text-center">
          <p className="text-[13px] text-white/60 leading-relaxed">
            🤝 <strong className="text-white">Honest promise:</strong> Ye DIY kit hai —
            aapko khud setup karna hoga (guide ke saath, 10 minute me!).
            Koi monthly fee nahi, koi hidden charge nahi.
          </p>
        </div>

        {/* Final CTA */}
        <div className="text-center mb-10">
          <div className="inline-block bg-white/10 border border-amber-500/30 text-amber-200 font-bold px-10 py-4 rounded-full text-lg">
            Jald Aa Raha Hai! 🚀
          </div>
        </div>

        <footer className="text-center text-white/40 text-[11px] pb-10 pt-4">
          <div className="flex justify-center gap-4 mb-2 flex-wrap">
            <a href="/about" className="hover:text-white/70">About</a>
            <a href="/contact" className="hover:text-white/70">Contact</a>
            <PrivacyChoicesLink className="hover:text-white/70" />
          </div>
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
        </footer>

      </div>
    </main>
  );
}
