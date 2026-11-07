import PrivacyChoicesLink from "../../components/PrivacyChoicesLink";

export const metadata = {
  title: "Contact RPS World",
  description: "Contact RPS World — website enquiries, support, feedback aur privacy requests. WhatsApp par jawab 24 hours ke andar.",
  openGraph: {
    title: "Contact RPS World",
    description: "Contact RPS World — website enquiries, support, feedback aur privacy requests. WhatsApp par jawab 24 hours ke andar.",
    url: "https://rps-world-website.onrender.com/contact",
    type: "website",
    images: [{ url: "/og-rps-world.png", width: 1200, height: 630, alt: "RPS World — premium business websites, free homepage concept first" }],
  },
  twitter: { card: "summary_large_image", title: "Contact RPS World", description: "Contact RPS World — website enquiries, support, feedback aur privacy requests. WhatsApp par jawab 24 hours ke andar.", images: ["/og-rps-world.png"] },
  alternates: { canonical: "https://rps-world-website.onrender.com/contact" },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="px-4 py-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Contact RPS World</h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-8">
          Website banwana hai, tools me madad chahiye, ya koi sawaal hai — WhatsApp par likho. Pehla jawab <strong className="text-white">24 hours ke andar</strong> milega.
        </p>

        <div className="grid gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="font-bold text-amber-300 mb-2">🌐 Website Enquiries</h2>
            <p className="text-white/70 text-sm mb-1">
              Business website banwana hai — pehle free homepage concept dekho:
            </p>
            <p className="text-white font-semibold">WhatsApp: +91 92350 39317</p>
            <p className="text-white/40 text-xs mt-2">Pehla jawab 24 hours ke andar.</p>
            <p className="mt-2">
              <a href="/services/contact" className="text-amber-300 underline text-sm">Enquiry ka tareeka dekho →</a>
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="font-bold text-amber-300 mb-2">💬 ProTools Support</h2>
            <p className="text-white/70 text-sm mb-1">
              For help with tools, accounts, or technical issues:
            </p>
            <p className="text-white font-semibold">WhatsApp: +91 92350 39317</p>
            <p className="text-white/40 text-xs mt-2">We aim to respond within 24 hours.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="font-bold text-amber-300 mb-2">🔒 Privacy Requests</h2>
            <p className="text-white/70 text-sm mb-1">
              Data deletion, access requests, or privacy questions:
            </p>
            <p className="text-white font-semibold">WhatsApp: +91 92350 39317</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="font-bold text-amber-300 mb-2">💼 Business & Advertising</h2>
            <p className="text-white/70 text-sm mb-1">
              Partnerships, advertising, and business inquiries:
            </p>
            <p className="text-white font-semibold">WhatsApp: +91 92350 39317</p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-amber-300">Before You Write</h2>
          <ul className="text-white/60 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Check that you&apos;re using the latest version of your browser — most tool issues are browser-related.</li>
            <li>For file processing issues, mention the file type, size, and which tool you used.</li>
            <li>We cannot recover deleted Vault documents — please keep backups of critical files.</li>
          </ul>
        </section>

        <footer className="text-center text-white/30 text-xs pt-8 border-t border-white/10">
          RPS World • Premium Business Websites
          <br />
          Operated by Ravi Pratap Singh · RPS World, Kanpur, India
          <div className="mt-1">
            <PrivacyChoicesLink />
          </div>
        </footer>
      </main>
    </div>
  );
}
