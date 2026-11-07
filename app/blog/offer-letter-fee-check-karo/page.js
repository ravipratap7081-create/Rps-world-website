import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rps-world-website.onrender.com";

export const metadata = {
  title: "Offer Letter Aaya Aur Fee Maangi Ja Rahi Hai? Fee Dene Se Pehle Ye 5 Check Karo | ProTools",
  description:
    "Offer letter ke baad registration, training ya verification fee maangi ja rahi hai? Fee dene se pehle ye 5 free check kar lo.",
  keywords:
    "offer letter fee check, fake job offer kaise pehchane, job ke liye fee maang rahe hain, registration fee job scam, offer letter genuine kaise check kare, Lucknow job verification",
  openGraph: {
    title: "Offer Letter Aaya Aur Fee Maangi Ja Rahi Hai? Fee Dene Se Pehle Ye 5 Check Karo",
    description: "Offer letter ke baad registration, training ya verification fee maangi ja rahi hai? Fee dene se pehle ye 5 free check kar lo.",
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
  dateModified: "2026-11-07",
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
          <div className="rounded-2xl border border-amber-300/30 bg-amber-950/30 p-5">
            <h2 className="text-xl font-extrabold text-amber-200">🏢 Ye service kya deti hai: Lucknow office-visit evidence report</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/80">
              Ye service Lucknow me office-visit evidence report deti hai — matlab hamara verifier
              us office tak jaakar wahan ki haalat ki photo + note wali report banata hai.
            </p>
          </div>
          <h3 className="mt-6 text-lg font-bold text-amber-200">Visit kya check karta hai</h3>
          <ul className="mt-2 space-y-2 text-[15px] text-white/75">
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Office diye gaye address par maujood hai ya nahi</span></li>
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Office ka board/signage aur bahar se dikhne wali haalat</span></li>
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Visit ke waqt wahan kaam hota dikh raha hai ya nahi</span></li>
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Recruiter se saamna ho to us baat-cheet ka note (jahan mumkin ho)</span></li>
          </ul>
          <h3 className="mt-6 text-lg font-bold text-amber-200">Visit kya prove NAHI karta — ye bhi utna hi zaroori hai</h3>
          <ul className="mt-2 space-y-2 text-[15px] text-white/75">
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Ye job genuine hone ka certificate NAHI hai</span></li>
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Ye offer letter ki asli/nakli jaanch ka certificate NAHI hai</span></li>
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Ye company background verification ya employment guarantee NAHI hai</span></li>
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Ye sarkari (MEA/NCS) jaanch ka substitute NAHI hai</span></li>
          </ul>
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

        <section>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-950/30 p-5">
            <h3 className="font-bold text-amber-200">🏛️ Embassy ya sarkari naam wali site bhi nakli ho sakti hai</h3>
            <p className="mt-1 text-[14px] leading-relaxed text-white/70">
              Delhi Police ne nakli Russian Embassy recruitment website chalane par 2 log giraftar
              kiye — embassy jaisi dikhne wali site ka hona asli hone ka saboot nahi hai. Embassy ko
              uske apne official channel se verify karo, recruitment site ke diye links se nahi.
            </p>
          </div>
        </section>

        <section>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-950/30 p-5">
            <h3 className="font-bold text-amber-200">🎖️ Paise dekar Assam Rifles / CAPF bharti nahi hoti — sirf SSC GD exam se</h3>
            <p className="mt-1 text-[14px] leading-relaxed text-white/70">
              5 Nov 2026 ko Assam Police ne Udalguri se fake Assam Rifles recruitment racket ke
              mastermind Firoz Ali ko giraftar kiya — paise lekar paramilitary appointment dilane ka
              jhansa de raha tha (CID Case No. 07/2026). Assam Rifles aur CAPF me bharti SSC GD exam
              se hoti hai; koi agent, koi fee, koi &ldquo;setting&rdquo; se appointment nahi milti. Aisi
              offer aaye to fee dene se pehle SSC GD ki official notification khud check karo.{" "}
              <a href="https://www.indiatodayne.in/assam/story/assam-police-arrest-man-suspected-of-masterminding-fake-assam-rifles-recruitment-racket-1471642-2026-11-05" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline">Source: India Today NE, 5 Nov 2026</a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📰 Taaza cases — November 2026: yehi pattern baar-baar dohra raha hai</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-amber-300/20 bg-amber-950/30 p-5">
              <h3 className="font-bold text-amber-200">💰 ED ne ₹400 crore ka fake-job racket pakda (5 Nov 2026)</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-white/70">
                Social media par job offer dekar 600+ victims se paise mule accounts me liye gaye,
                phir crypto me layering ki gayi. ED ne 2 log giraftar kiye (Roshan Fiaz, Ammar).
                Job offer ke baad kisi ke personal account me paise bhejne ko kaha jaye to wahi
                purana pattern hai.{" "}
                <a href="https://timesofindia.indiatimes.com/city/chennai/ed-busts-rs-400crore-cyber-fraud-network-by-arresting-two-tn-men/articleshow/135574307.cms" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline">Source: Times of India, 5 Nov 2026</a>
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-950/30 p-5">
              <h3 className="font-bold text-amber-200">✈️ Rajasthan–Malaysia job fraud: ₹28.90 lakh, visitor visa par bhej diya (5 Nov 2026)</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-white/70">
                4 ladkon se work visa aur Malaysia me naukri ka wada karke ₹28.90 lakh liye gaye,
                phir visitor visa par bhej diya gaya; hotel booking aur return ticket ke documents
                Malaysia airport par fake nikle aur chaaron ko wapas bhej diya gaya. Accused
                Heeralal Patel (DRG Associate Tour and Travellers) ko Dungarpur police ne giraftar
                kiya. Videsh naukri ke liye visa category aur agency ka registration khud verify
                karo, agent ke bharose mat chhodo.{" "}
                <a href="https://immigrationfrauds.com/rajasthan-malaysia-job-fraud/" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline">Source: Immigration Frauds, 5 Nov 2026</a>
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-950/30 p-5">
              <h3 className="font-bold text-amber-200">🚆 Thrissur railway job fraud: ₹1 crore, 2 saal bhaaga accused pakda gaya (3 Nov 2026)</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-white/70">
                Railway me naukri dilane ke naam par kai logon se lagbhag ₹1 crore liye gaye the
                (2024 case). Accused Ranjith (45) lagbhag 2 saal se bhaag raha tha; 3 Nov 2026 ko
                Thrissur me ACP office ke paas se guzarte hue ek police officer ne pehchan liya aur
                giraftar kar liya. Sarkari naukri ke liye koi agent fee lekar appointment nahi
                dilata — sirf official exam/notification se bharti hoti hai.{" "}
                <a href="https://www.onmanorama.com/news/kerala/2026/11/03/after-two-years-on-the-run-job-fraud-accused-walks-past-acp-office-in-thrissur-gets-caught.amp.html" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline">Source: Onmanorama, 3 Nov 2026</a>
              </p>
            </div>
          </div>
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
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Ye report kya nahi hai:</strong> guarantee nahi hai, aur genuine/fraud certificate nahi hai. GREEN ka matlab sirf itna hai ki employer + office ne offer ki pushti ki AUR specific offer/fee-demand ko independent support mila — sirf company ka wajood ya building ka photo GREEN nahi hai. GREEN guarantee nahi hai, safe hone ki guarantee nahi.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Price:</strong> price, timeline aur refund rules likhit scope ke saath bataye jayenge — article par koi price ya delivery deadline ka pakka wada nahi hai.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Refund:</strong> agar visit/call promised window me na ho paye to refund milega.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Follow-up:</strong> agar report ke baad koi discrepancy mile to buyer report kare — case record me darj hoga aur correction hogi.</span></li>
            <li className="flex gap-3 text-[15px] text-white/75"><span className="text-amber-300">•</span><span><strong>Order ke liye chahiye:</strong> offer letter ki copy, stated office address, kitni fee maangi gayi hai, aur fee dene ki deadline.</span></li>
          </ul>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            <strong>Filhaal sirf Lucknow ke offices ke liye. Lucknow se bahar ke request accept nahi hote.</strong>
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf0YvKnpJnPmm1u11VcyAdcx4ZjJ3Rwpfx7DvuZz1EQUkTYMw/viewform" className="pu-btn-primary mt-4 inline-block rounded-xl px-6 py-3 font-bold">
            📝 Office Visit Request bhejein →
          </a>
          <a href="https://wa.me/919235039317" className="mt-4 ml-3 inline-block rounded-xl border border-white/20 px-6 py-3 font-bold text-white/80">
            💬 WhatsApp (secondary contact)
          </a>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            Form bharna = request bhejna hai, order confirmation NAHI hai. Payment tabhi, jab scope +
            price + timeline likhit me mile aur aap accept karein; usse pehle koi payment link share
            nahi hoga.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🔒 Request me kya data liya jata hai</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75">
            Form me ye liya jata hai: naam, mobile/WhatsApp number, Lucknow office locality,
            company/recruiter ka naam, office address, kya verify karna hai, preferred response time.
          </p>
          <ul className="mt-3 space-y-2 text-[15px] text-white/75">
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Aadhaar, PAN, bank details ya offer letter form me NAHI manga jata.</span></li>
            <li className="flex gap-3"><span className="text-amber-300">•</span><span>Data sirf request ki screening ke liye use hoga, 90 din baad delete kar diya jayega; deletion/correction business WhatsApp 9235039317 par maangi ja sakti hai.</span></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">📄 Sample report — ye kaisi dikhegi (SAMPLE HAI, ASLI REPORT NAHI HAI)</h2>
          <p className="mt-3 text-[14px] text-white/60">
            Neeche wale samples demo ke liye banaye gaye udaharan hain, kisi asli company ke baare me
            nahi hain. Asli report me bhi yahi format hoga — jo dekha, wahi likha jayega. YELLOW
            sabse aam honest outcome hai: aksar office mil jata hai, par HR pushti nahi karta.
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
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[14px] leading-relaxed text-white/70">
            <p><strong className="text-amber-200">Naukri Sachai Check — Observations Report (SAMPLE — YELLOW)</strong></p>
            <p className="mt-2">Stated company: [Sample Company Pvt. Ltd. — fictional example]</p>
            <p>Stated office address: [address as given in offer]</p>
            <p className="mt-2">Observations:</p>
            <ul className="mt-1 space-y-1">
              <li>• Address par building mili, par reception ne HR se milne ya confirm karne se mana kar diya.</li>
              <li>• Official number par call ka jawab nahi mila / call back ka vada mila, par pushti nahi hui.</li>
              <li>• MCA/GST par company maujood hai — par isse ye saabit nahi hota ki ye offer asli hai.</li>
            </ul>
            <p className="mt-2"><strong className="text-amber-200">Verdict: YELLOW — inconclusive.</strong> Iska matlab hai pushti nahi ho payi, na haan na na.</p>
            <p>Note: YELLOW report ka matlab ye nahi hai ki fee de do. Fee dene se pehle official channel se khud pushti karo. YELLOW par bhi poori fee lagti hai, kyunki visit aur report ka kaam ho chuka hota hai.</p>
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
