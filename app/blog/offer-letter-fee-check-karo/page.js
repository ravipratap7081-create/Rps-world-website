import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Offer Letter Aaya Aur Fee Maangi Ja Rahi Hai? Fee Dene Se Pehle Ye 5 Check Karo | ProTools",
  description:
    "Offer letter ke baad registration, training ya verification fee maangi ja rahi hai? Fee dene se pehle ye 5 free check kar lo — official number par HR call, domain match, MCA/GST match, dabav ki pehchan. Lucknow office ka physical check bhi hota hai.",
  keywords:
    "offer letter fee check, fake job offer kaise pehchane, job ke liye fee maang rahe hain, registration fee job scam, offer letter genuine kaise check kare, Lucknow job verification",
  openGraph: {
    title: "Offer Letter Aaya Aur Fee Maangi Ja Rahi Hai? Fee Dene Se Pehle Ye 5 Check Karo",
    description: "Fee dene se pehle 5 free check: official number par HR call, domain match, MCA/GST match, fee-demand red flag aur dabav ki pehchan. Koi guarantee nahi, sirf observations report.",
    type: "article",
    url: `${SITE}/blog/offer-letter-fee-check-karo`,
    siteName: "ProTools",
    images: [
      {
        url: `${SITE}/og-sarkari.png`,
        width: 1200,
        height: 630,
        alt: "Offer Letter Fee Check — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "Offer Letter Aaya Aur Fee Maangi Ja Rahi Hai? Fee Dene Se Pehle Ye 5 Check Karo", description: "Fee dene se pehle 5 free check — official number par HR call, domain match, MCA/GST match, dabav ki pehchan." },
  alternates: { canonical: `${SITE}/blog/offer-letter-fee-check-karo` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Offer Letter Aaya Aur Fee Maangi Ja Rahi Hai? Fee Dene Se Pehle Ye 5 Check Karo",
  description: "Offer letter ke baad fee maangi jaye to fee dene se pehle 5 free check kar lo, aur Lucknow office ke physical check ke baare me jaan lo. Ye report guarantee nahi hai aur genuine/fraud certificate nahi hai.",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  inLanguage: ["hi"],
  mainEntityOfPage: `${SITE}/blog/offer-letter-fee-check-karo`,
};

const CHECKS = [
  {
    t: "Fee ka naam kuch bhi ho, joining se pehle fee maangna hi sabse bada red flag hai",
    d: "Registration, training, uniform, verification, gate-pass — naam badal jata hai, tareeka wahi rehta hai. Genuine employer job dene ke liye candidate se fee nahi maangta; recruitment ka kharcha employer uthata hai.",
  },
  {
    t: "Offer kis number/email se aaya hai, ye check karo",
    d: "Company ke official domain wale email se aaya hai ya WhatsApp number ya free email (Gmail/Yahoo) se? Free email se bheja gaya official offer letter pehla shak hai. Logo aur PDF ki chamak ko saboot mat mano — ye dono nakli bhi ban sakte hain.",
  },
  {
    t: "HR ko company ke official number par khud call karo — WhatsApp wale number par nahi",
    d: "Company ki official website khud search karke kholo (offer letter me diye link par click mat karo), wahan se HR/contact number nikalo, aur us par poochho: kya ye candidate select hai, kya koi fee li jati hai, contact kaun hai. Jo number sender ne diya hai, us par ki gayi call usi sender ko jayegi — wo check nahi hai.",
  },
  {
    t: "Company ka naam aur address MCA/GST par match karo",
    d: "Company ka legal naam MCA/GST record me maujood hai ya nahi, aur stated office address official address se milta hai ya nahi. Yaad rakho: naam maujood hona ye saabit nahi karta ki offer asli hai — nakli offer asli company ke naam par bhi bheja jata hai. Par naam ka na milna bada red flag hai.",
  },
  {
    t: "Jaldi ke dabav ko pehchano",
    d: "Aaj hi fee do warna offer khatam — genuine employer aisa dabav nahi banata. Dabav ka matlab hai ki tumko sochne ka time nahi dena chahte. Is point par ruk jao, ghar me kisi bade se baat karo, aur upar ke 4 check poore karo.",
  },
];

const FAQS = [
  { q: "Fee maangna hamesha scam hota hai?", a: "Joining se pehle candidate se fee maangna hi sabse bada red flag hai — genuine employer job dene ke liye fee nahi maangta. Iska matlab ye nahi ki har fee-demand wala case court me fraud saabit ho jayega, isliye report me sirf observations likhe jate hain, final faisla nahi." },
  { q: "Company ka naam MCA/GST par mil gaya to offer asli hai?", a: "Nahi. Naam milna ye saabit nahi karta ki offer asli hai — nakli offer asli company ke naam par bhi bheja jata hai. Isliye official number par HR confirmation aur office ka physical check alag se zaroori hai." },
  { q: "Lucknow ke bahar ke office wale offer ka check hoga?", a: "Abhi nahi. Sirf Lucknow ke office wale offer liye jayenge. Phone ya WhatsApp-only offer, jiska koi office address hi nahi hai, is check se nahi hoga." },
  { q: "Report me GREEN aaya to kya fee de dena safe hai?", a: "Nahi. Report guarantee nahi hai aur genuine/fraud certificate nahi hai. GREEN ka matlab sirf itna hai ki visit aur call me offer ki pushti ke liye support mila — aakhri faisla tumhara hoga, aur fee dene se pehle dobara official channel se pushti karo." },
];

export default function OfferLetterFeeCheck() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="Offer Letter Aaya? Fee Dene Se Pehle Ruk Jao ✋" subtitle="Fee dene se pehle 5 free check — official number par HR call, domain match, MCA/GST match" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            Offer letter dekh kar khushi hoti hai. Phir message aata hai: registration fee, verification
            fee, training fee, gate-pass fee — kisi na kisi naam par joining se pehle paise maange jate
            hain. Ye moment hi sabse khatarnak hai, kyunki offer haath me hai aur dabav hai ki fee do,
            warna offer chala jayega. LocalCircles ke May 2025 survey me (22,000 respondents, 312
            districts) 42% WhatsApp users ne bataya ki unhe payment maangne wale fake job offer mile
            the. Isliye fee dene se pehle rukna aur check karna hi samajhdari hai — fee dene ke baad
            wapas lena bahut mushkil hota hai.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">✅ Fee dene se pehle ye 5 check khud kar lo (free)</h2>
          <ol className="mt-4 space-y-4">
            {CHECKS.map((c, i) => (
              <li key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold text-amber-200">{i + 1}. {c.t}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{c.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <PremiumCard className="mb-2 !border-red-500/30 bg-gradient-to-br from-red-950/60 to-orange-950/30">
          <h2 className="text-xl font-extrabold text-red-200">🚫 Ye do baatein kabhi mat karna</h2>
          <p className="mt-2 text-[15px] text-red-100/80">
            Kisi ko OTP, password ya bank login kabhi mat do. Aur fee kisi personal (vyakti ke naam
            wale) account me kabhi mat bhejo. Ye dono hi financial fraud ke seedhe raste hain.
          </p>
        </PremiumCard>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🏢 Agar shaq reh jaye to: Lucknow office ka physical check</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Agar offer me Lucknow ka office address likha hai, to us office ka physical check karwaya
            ja sakta hai: koi verifier us address par jakar building aur name-board ki photo le,
            reception/HR se official number par scripted sawaal poochhe, aur MCA/GST/domain ki basic
            remote check kare. Uske baad Hindi me dated observations report milegi — GREEN, YELLOW ya RED.
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Ye report kya hai:</strong> sirf wahi, jo visit/call me dekha ya confirm hua, ya confirm nahi hua.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Ye report kya nahi hai:</strong> guarantee nahi hai, aur genuine/fraud certificate nahi hai. GREEN ka matlab sirf support mila hai, safe hone ki guarantee nahi.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Price (test price):</strong> ₹299 basic (24-48 ghante), ₹499 urgent (same-day sirf tab jab us din ka slot confirm ho, warna basic window me delivery hogi).</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Refund:</strong> agar visit/call promised window me na ho paye to refund milega.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Follow-up:</strong> agar report ke baad koi discrepancy mile to buyer report kare — case record me darj hoga aur correction hogi.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Order ke liye chahiye:</strong> offer letter ki copy, stated office address, kitni fee maangi gayi hai, aur fee dene ki deadline.</span></li>
          </ul>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            Order se pehle eligibility confirm ki jayegi — isliye pehle WhatsApp (+91 92350 39317) par
            offer letter aur address bhejo, payment link eligibility confirm hone ke baad di jayegi.
            Sirf Lucknow ke office wale offer liye jayenge.
          </p>
          <a href="https://wa.me/919235039317" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            💬 WhatsApp par offer letter bhejo →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📄 Sample report — ye kaisi dikhegi (SAMPLE HAI, ASLI REPORT NAHI HAI)</h2>
          <p className="mt-3 text-[14px] text-white/60">
            Neeche wala sample demo ke liye banaya gaya udaharan hai, kisi asli company ke baare me
            nahi hai. Asli report me bhi yahi format hoga — jo dekha, wahi likha jayega.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[14px] leading-relaxed text-white/70">
            <p><strong className="text-amber-200">Naukri Sachai Check — Observations Report (SAMPLE)</strong></p>
            <p className="mt-2">Stated company: [Sample Company Pvt. Ltd. — fictional example]</p>
            <p>Stated office address: [address as given in offer]</p>
            <p className="mt-2">Observations:</p>
            <ul className="mt-1 space-y-1">
              <li>• Diye gaye address par is naam ka board nahi mila. Building me is naam ka office hone ka koi board/list nahi mili.</li>
              <li>• Company ke official number par call ki gayi. HR ne is candidate ke selection ki pushti nahi ki aur kaha fee ke baare me unhe jaankari nahi hai.</li>
              <li>• MCA par company ka naam mila / nahi mila: [as observed]</li>
            </ul>
            <p className="mt-2"><strong className="text-amber-200">Verdict: RED</strong> (observations ke aadhar par — iska matlab ye nahi ki company fraud hai, iska matlab ye hai ki diye gaye address aur HR confirmation se offer ki pushti nahi hui)</p>
            <p>Salah: Fee dene se pehle official channel se dobara pushti karo, aur cyber helpline 1930 par shikayat ka option yaad rakho.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🆘 Agar paise de chuke ho ya fraud lag raha hai to</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Turant apne bank ko inform karo, payment ki receipt, number, message aur offer letter
            sambhal kar rakho, aur cybercrime helpline 1930 ya National Cyber Crime Reporting Portal
            (cybercrime.gov.in) par report karo. Ye article kanooni salah nahi hai — bade nuksaan par
            police/bank se turant sampark karo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">❓ Common questions</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold text-amber-200">{f.q}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/70">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">Related</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/blog" className="text-amber-300 underline">📚 Guides &amp; Tutorials — sabhi guides</Link></li>
            <li><Link href="/sarkari" className="text-amber-300 underline">🏛️ Sarkari tools hub — free tools</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
