import PrivacyChoicesLink from "../../components/PrivacyChoicesLink";

export const metadata = {
  title: "Refund Policy | Diwali Business Kit",
  description: "Refund, resend and support policy for the Diwali Business Promo Pack (₹149 digital download) — 7 din ke andar WhatsApp par sampark karein.",
  openGraph: {
    title: "Refund Policy | Diwali Business Kit",
    description: "Refund, resend and support policy for the Diwali Business Promo Pack (₹149 digital download) — 7 din ke andar WhatsApp par sampark karein.",
    url: "https://rps-world-website.onrender.com/refund-policy",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Refund Policy | Diwali Business Kit", description: "Refund, resend and support policy for the Diwali Business Promo Pack (₹149 digital download) — 7 din ke andar WhatsApp par sampark karein." },
  alternates: { canonical: "https://rps-world-website.onrender.com/refund-policy" },
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2">Refund Policy</h1>
        <p className="text-white/50 text-sm mb-8">Diwali Business Promo Pack — Rs 149 digital download. Last updated: 21 Oct 2026.</p>

        <h2 className="font-bold text-amber-300 mb-2">Kya milta hai</h2>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Payment ke baad aapko ek ZIP file ka download link milta hai: 12 festive creatives (6 posters + 6 stories)
          aur 34 Hindi marketing texts. Ye digital product hai — koi physical delivery nahi hoti.
        </p>

        <h2 className="font-bold text-amber-300 mb-2">Refund kab milega</h2>
        <ul className="text-white/70 text-[15px] leading-relaxed mb-6 list-disc pl-5 space-y-1">
          <li>Download link kaam na kare ya file corrupt mile — pehle hum link dobara bhejenge; agar phir bhi na chale to poora refund.</li>
          <li>Galti se double payment ho jaye — extra payment ka poora refund.</li>
          <li>Payment kat jaye par download link hi na mile — poora refund.</li>
        </ul>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Refund ke liye payment ke <strong className="text-white">7 din ke andar</strong> sampark karein.
          File download karke use kar lene ke baad &ldquo;pasand nahi aaya&rdquo; par refund nahi milega,
          kyunki digital file wapas nahi ho sakti.
        </p>

        <h2 className="font-bold text-amber-300 mb-2">Download link dobara chahiye?</h2>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Link expire ho gaya ya kho gaya ho to humein batayein — hum naya link bhej denge.
        </p>

        <h2 className="font-bold text-amber-300 mb-2">Sampark</h2>
        <p className="text-white/70 text-[15px] leading-relaxed mb-2">
          WhatsApp: <a className="text-white font-semibold underline" href="https://wa.me/919235039317">+91 92350 39317</a>
        </p>
        <p className="text-white/70 text-[15px] leading-relaxed mb-8">
          Email support abhi uplabdh nahi hai — kripya WhatsApp par sampark karein (upar diya gaya number).
        </p>

        <p className="text-white/40 text-sm">
          <a className="underline" href="/">← Home par wapas</a>
        </p>
        <footer className="text-center text-white/40 text-[11px] pb-10 pt-4">
          <div className="flex justify-center gap-4 mb-2 flex-wrap">
            <a href="/about" className="hover:text-white/70">About</a>
            <a href="/contact" className="hover:text-white/70">Contact</a>
            <PrivacyChoicesLink className="hover:text-white/70" />
          </div>
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
        </footer>
      </main>
    </div>
  );
}
