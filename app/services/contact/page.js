import Link from "next/link";

export const metadata = {
  title: "Contact / Enquiry | RPS World Services",
  description:
    "Website banwane ke liye enquiry karo — WhatsApp par business type, pages aur content ki taiyari batao. Koi password ya login kabhi mat bhejo.",
  alternates: { canonical: "https://rps-world-website.onrender.com/services/contact" },
};

export default function ServicesContact() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Enquiry Karo</h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Website banwana hai to WhatsApp par ye 3 baatein bhejo — isse scope aur price turant tay hoga:
        </p>
        <ul className="text-white/70 text-[15px] leading-relaxed space-y-2 list-disc pl-5 mb-8">
          <li><strong className="text-white">Business kya hai</strong> — coaching, salon, clinic, shop, ya kuch aur?</li>
          <li><strong className="text-white">Kitne pages chahiye</strong> — 5 tak, 10 tak, ya usse zyada?</li>
          <li><strong className="text-white">Content taiyaar hai ya nahi</strong> — courses/timings/photos/text mil gaya hai ya banana hai?</li>
        </ul>

        <a href="https://wa.me/919235039317" className="inline-block rounded-xl px-6 py-3 font-bold bg-amber-400 text-black mb-8">
          💬 WhatsApp par enquiry bhejo →
        </a>
        <p className="text-white/70 text-[15px] leading-relaxed mb-8">
          Enquiry ka jawab <strong className="text-white">24 hours ke andar</strong> milega.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Privacy note</h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Sirf wahi jaankari bhejo jo scope ke liye chahiye. <strong className="text-white">Koi password, OTP, bank login ya API key kabhi mat bhejo</strong> — ye kabhi maanga hi nahi jayega.
            Enquiry ka jawab milne ke baad hi demo ya proposal share hoga.
          </p>
        </section>

        <p>
          <Link href="/services" className="text-amber-300 underline text-[15px]">← Services par wapas</Link>
        </p>
      </main>
    </div>
  );
}
