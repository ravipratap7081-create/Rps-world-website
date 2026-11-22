import Link from "next/link";
import EnquiryForm from "./EnquiryForm";
import WhatsAppIcon from "../../../components/WhatsAppIcon";

export const metadata = {
  title: "Contact / Enquiry | RPS World Services",
  description:
    "Website banwane ke liye enquiry karo — WhatsApp par business type, pages aur content ki taiyari batao. Koi password ya login kabhi mat bhejo.",
  openGraph: {
    title: "Contact / Enquiry | RPS World Services",
    description: "Website banwane ke liye enquiry karo — WhatsApp par business type, pages aur content ki taiyari batao. Koi password ya login kabhi mat bhejo.",
    url: "https://rpsworld.in/services/contact",
    type: "website",
    images: [{ url: "/og-rps-world.png", width: 1200, height: 630, alt: "RPS World — premium business websites, free homepage concept first" }],
  },
  twitter: { card: "summary_large_image", title: "Contact / Enquiry | RPS World Services", description: "Website banwane ke liye enquiry karo — WhatsApp par business type, pages aur content ki taiyari batao. Koi password ya login kabhi mat bhejo.", images: ["/og-rps-world.png"] },
  alternates: { canonical: "https://rpsworld.in/services/contact" },
};

export default function ServicesContact() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0A0616] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="mix-h text-[34px] leading-tight mb-4">Enquiry Karo</h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-6">
          Website banwana hai to WhatsApp par ye 3 baatein bhejo — isse scope aur price turant tay hoga:
        </p>
        <ul className="text-white/70 text-[15px] leading-relaxed space-y-2 list-disc pl-5 mb-8">
          <li><strong className="text-white">Business kya hai</strong> — coaching, salon, clinic, shop, ya kuch aur?</li>
          <li><strong className="text-white">Kitne pages chahiye</strong> — 5 tak, 10 tak, ya usse zyada?</li>
          <li><strong className="text-white">Content taiyaar hai ya nahi</strong> — courses/timings/photos/text mil gaya hai ya banana hai?</li>
        </ul>

        <a href="https://wa.me/919235039317?text=Namaste%2C%20mujhe%20website%20banwana%20hai.%20Business%20type%3A%20%20Business%20name%3A%20%20Pages%20chahiye%3A%20%20Content%20taiyaar%20hai%3A%20Haan%2FNahi%20%20Contact%20person%20ka%20naam%3A%20" className="mix-btn-wa mb-8 w-full justify-center sm:w-auto">
          <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" /> WhatsApp par enquiry bhejo →
        </a>
        <p className="text-white/70 text-[15px] leading-relaxed mb-8">
          Enquiry ka pehla jawab <strong className="text-white">24 hours ke andar</strong> milega.
        </p>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Free demo — iska matlab kya hai</h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Free demo matlab aapke business ke liye ek limited homepage VISUAL
            concept — qualification ke baad. Poori coded website, hosting,
            deployment, source code ya unlimited revisions nahi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Ya form bharo</h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-4">
            WhatsApp nahi karna ho to ye form bharo — hum aapko WhatsApp par
            jawab denge.
          </p>
          <EnquiryForm />
        </section>

        <section className="mb-8">
          <h2 className="mix-h text-xl mb-3 text-[#E3B34B]">Privacy note</h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Sirf wahi jaankari bhejo jo scope ke liye chahiye. <strong className="text-white">Koi password, OTP, bank login ya API key kabhi mat bhejo</strong> — ye kabhi maanga hi nahi jayega.
            Enquiry ka jawab milne ke baad hi demo ya proposal share hoga.
          </p>
        </section>

        <p>
          <Link href="/services" className="text-[#E3B34B] underline text-[15px]">← Services par wapas</Link>
        </p>
        <footer className="text-center text-white/40 text-[11px] pb-10 pt-4">
          <div className="flex justify-center gap-4 mb-2 flex-wrap">
            <a href="/about" className="hover:text-white/70">About</a>
            <a href="/contact" className="hover:text-white/70">Contact</a>
          </div>
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
        </footer>
      </main>
    </div>
  );
}
