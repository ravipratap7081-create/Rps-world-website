import { PRO_PRICE_INR, PRO_TERMS } from "../../lib/pro";

export const metadata = {
  title: "Pro Refund & Cancellation Policy | ProTools",
  description:
    "Refund and cancellation policy for ProTools Pro (Rs 149/month) — separate from the Diwali Business Kit refund policy.",
  alternates: { canonical: "https://rps-world-website.onrender.com/pro-refund" },
};

export default function ProRefund() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Pro Refund &amp; Cancellation Policy</h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-8">
          Ye policy sirf ProTools Pro (₹{PRO_PRICE_INR}/month) ke liye hai. Diwali
          Business Kit (₹149 ZIP) ki refund policy alag hai — wo{" "}
          <a href="/refund-policy" className="text-amber-300 underline">Refund Policy</a>{" "}
          page par hai. Dono ko ek mat samjhein.
        </p>

        <section className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <h2 className="font-bold text-amber-300 mb-2">Terms (jo /coins par bhi dikhte hain)</h2>
          <p className="text-white/70 text-sm leading-relaxed">{PRO_TERMS}</p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <h2 className="font-bold text-amber-300 mb-2">Refund kab milega?</h2>
          <ul className="text-white/70 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>
              <strong className="text-white">Double payment (galti se do baar payment):</strong>{" "}
              7 din ke andar report karein to duplicate payment refund ki jayegi.
            </li>
            <li>
              <strong className="text-white">Month shuru hone ke baad:</strong>{" "}
              Pro ek digital subscription hai — month shuru hone ke baad koi refund
              nahi milega (double-payment wale case ko chhod kar).
            </li>
            <li>
              <strong className="text-white">Payment hua, Pro active nahi hua:</strong>{" "}
              pehle /coins par apna order status check karein (payment ID sambhal
              kar rakhein). Agar gateway par PAID dikhe aur Pro active na ho, to
              contact page se report karein — record verify karke Pro activate
              kiya jayega.
            </li>
          </ul>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <h2 className="font-bold text-amber-300 mb-2">Cancellation</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Pro me koi auto-renewal nahi hai — har mahine aap khud pay karke
            continue karte hain. Agle mahine pay na karein to Pro apne aap khatam
            ho jayega; cancel karne ke liye koi alag step nahi chahiye. Free tools
            hamesha free rahenge.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="font-bold text-amber-300 mb-2">Refund kaise maangein?</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            <a href="/contact" className="text-amber-300 underline">Contact page</a>{" "}
            se report karein — saath me payment ID / order ID aur payment email
            zaroor likhein, taaki record verify ho sake. Report ke 48 ghante ke
            andar jawab dene ki koshish ki jati hai.
          </p>
        </section>

        <footer className="text-center text-white/30 text-xs pt-8 border-t border-white/10 mt-8">
          ProTools • Pro Refund &amp; Cancellation Policy
        </footer>
      </main>
    </div>
  );
}
