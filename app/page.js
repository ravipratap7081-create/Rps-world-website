import HomeClient from "./HomeClient";
import ExamToolsSection from "../components/ExamToolsSection";
import AuroraMotion from "../components/AuroraMotion";

// Metadata + JSON-LD below are BYTE-EXACT from the live repo (commit 90c9400)
// — preserve list items 1, 2, 6, 7, 8, 9, 10. Do not edit them for design.
export const metadata = {
  title: "RPS World — Websites & Promotional Reels in Kanpur | ProTools",
  description: "Mobile-first websites & promotional reels for Kanpur businesses—cafés, salons, boutiques, jewellers & gyms. Get a free homepage concept before you pay.",
  openGraph: {
    title: "RPS World — Websites & Promotional Reels in Kanpur | ProTools",
    description: "Mobile-first websites & promotional reels for Kanpur businesses—cafés, salons, boutiques, jewellers & gyms. Get a free homepage concept before you pay.",
    url: "https://rpsworld.in/",
    type: "website",
    images: [{ url: "/og-rps-world.png", width: 1200, height: 630 }],
    videos: [{ url: "https://rpsworld.in/rps-world-promo.mp4", secureUrl: "https://rpsworld.in/rps-world-promo.mp4", type: "video/mp4", width: 1280, height: 720 }],
  },
  twitter: { card: "summary_large_image", title: "RPS World — Websites & Promotional Reels in Kanpur | ProTools", description: "Mobile-first websites & promotional reels for Kanpur businesses—cafés, salons, boutiques, jewellers & gyms. Get a free homepage concept before you pay." },
  alternates: { canonical: "https://rpsworld.in/" },
};

const WA_FREE_CONCEPT =
  "https://wa.me/919235039317?text=Hi%20RPS%20World!%20Mujhe%20Free%20Homepage%20Concept%20chahiye.";
const WA_REELS =
  "https://wa.me/919235039317?text=Hi!%20Mujhe%20Reels%20ka%20%E2%82%B9499%20pilot%20chahiye.";
const WA_FREE_CONCEPT_SHORT =
  "https://wa.me/919235039317?text=Hi!%20Mujhe%20Free%20Homepage%20Concept%20chahiye.";
const WA_WEBSITE =
  "https://wa.me/919235039317?text=Hi!%20Mujhe%20Business%20Website%20chahiye%20(%E2%82%B918%2C000%E2%80%9325%2C000).";
const WA_STORE =
  "https://wa.me/919235039317?text=Hi!%20Mujhe%20Preetam%20General%20Store%20app%20ke%20baare%20me%20jaanna%20hai.";

const MARQUEE_ITEMS = [
  "WEBSITES ₹18,000–25,000",
  "REELS ₹499 PILOT",
  "NYOTA ₹2,499 / ₹3,999",
  "PROTOOLS PRO ₹149/MONTH",
  "FREE HOMEPAGE CONCEPT",
  "7–10 DIN DELIVERY",
];

const TICKER_ITEMS = [
  "RRB CORRECTION 16–25 NOV OPEN",
  "UP TGT FEE 28 NOV",
  "UP TGT CORRECTION 30 NOV",
  "EXAM 23–24 DEC",
  "₹250 PER MODIFICATION",
];

// 6 flip cards — spec §3.4, text/links byte-exact. Card 6 = /resize (200
// verified); /image-compressor is 404 and is NOT used anywhere.
const TOOLS = [
  { icon: "🖼️", badge: "20 – 50 KB", title: "SSC Photo 20–50KB", front: "SSC forms ke liye live-capture size rules ke hisaab se photo resize karo.", back: "Size pehle se exact — form reject hone ka risk kam, upload ek baar me pass.", limit: "Limit: 20–50 KB · Free", href: "https://protools.rpsworld.in/ssc-photo-20-50kb" },
  { icon: "✍️", badge: "10 – 20 KB", title: "SSC Signature 10–20KB", front: "SSC signature ko exact 10–20 KB me lao — bina quality khoye.", back: "Signature exact size me — form upload par atakega nahi, dobara banana nahi padega.", limit: "Limit: 10–20 KB · Free", href: "https://protools.rpsworld.in/signature-10-20kb" },
  { icon: "🚆", badge: "30 – 49 KB", title: "RRB Signature 30–49KB", front: "RRB NTPC UG signature — correction window me turant theek karo.", back: "Correction window 16–25 Nov open hai — signature abhi theek karo, last date ka wait mat karo.", limit: "Limit: 30–49 KB · Free", href: "https://protools.rpsworld.in/rrb-ntpc-signature-30-49kb" },
  { icon: "🪪", badge: "20 KB", title: "Passport Photo 20KB", front: "Passport-size photo — official dimensions aur 20 KB target ke saath.", back: "Official dimensions ke saath 20 KB target — passport form ke liye ready photo.", limit: "Limit: 20 KB · Free", href: "https://protools.rpsworld.in/passport-photo-20kb" },
  { icon: "📄", badge: "100 KB", title: "PDF Compressor 100KB", front: "PDF ko 100 KB tak compress karo — form upload ke liye ready.", back: "PDF 100 KB tak — badi file ki wajah se form upload fail nahi hoga.", limit: "Limit: 100 KB · Free", href: "https://protools.rpsworld.in/pdf-compressor-100kb" },
  { icon: "🗜️", badge: "10–500 KB", title: "Image Resize — Any KB", front: "Kisi bhi photo ko 10–500 KB ke beech kisi bhi target par resize karo — browser me hi, upload nahi.", back: "Browser me hi resize — photo upload nahi hoti, kisi bhi target KB par exact size.", limit: "Limit: 10–500 KB · Free", href: "https://protools.rpsworld.in/resize" },
];

const REELS = [
  { no: "REEL 01 — HOOK", title: "Hook Reel", desc: "Pehle 3 second me dhyaan khinchne wala opening — offer, product ya kahani se shuru." },
  { no: "REEL 02 — PRODUCT", title: "Product Reel", desc: "Product ko use me dikhao — daam, fayda aur order ka rasta, sab ek reel me." },
  { no: "REEL 03 — STORY", title: "Story Reel", desc: "Dukaan ke peeche ki kahani — log brand se judte hain, sirf daam se nahi." },
];

// YouTube search links — spec §5.4. Exact channel handles NOT FOUND in the
// preview; handles are deliberately NOT invented (spec §11.2 P-A).
const YT = [
  { emoji: "🏏", title: "Cricket", desc: "Match analysis, cricket stories aur game ki baatein.", href: "https://www.youtube.com/results?search_query=Cricket+Ke+Record" },
  { emoji: "🌍", title: "Fact Duniya", desc: "Rochak facts aur duniya-bhar ki hairan karne wali jaankari.", href: "https://www.youtube.com/results?search_query=Fact+Duniya" },
  { emoji: "📚", title: "Sarkari GK", desc: "Sarkari exams ke liye GK, current affairs aur taiyaari.", href: "https://www.youtube.com/results?search_query=Sarkari+GK+Quiz" },
  { emoji: "🌐", title: "World", desc: "Duniya-bhar ki khabrein, jagah aur kahaniyan.", href: "https://www.youtube.com/results?search_query=World+Shaped" },
  { emoji: "✨", title: "Khushi", desc: "Khushi ke shorts aur lifestyle videos.", href: "https://www.youtube.com/results?search_query=Khushi+in+Korea" },
  { emoji: "🍯", title: "Honey", desc: "Honey ke videos — masti, style aur stories.", href: "https://www.youtube.com/results?search_query=Honey+Thakur+Fitness" },
  { emoji: "🎬", title: "BBV", desc: "Bollywood Vichaar — films, gossip aur bigg-boss style baatein.", href: "https://www.youtube.com/results?search_query=Bollywood+Vichar" },
];

export default function Home() {
  return (
    <main className="aurora-page min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"ProfessionalService","name":"RPS World","url":"https://rpsworld.in","logo":"https://rpsworld.in/favicon.png","image":"https://rpsworld.in/og-rps-world.png","description":"Mobile-first website design and promotional video reel creation agency for local businesses in Kanpur, including cafés, salons, boutiques, jewellers, gyms, and coaching institutes.","founder":{"@type":"Person","name":"Ravi Pratap Singh","jobTitle":"Founder, RPS World — Website Designer & Video Creator","description":"Founder of RPS World (Kanpur) — mobile-first websites and promotional reels for local businesses; creator of ProTools free exam tools.","address":{"@type":"PostalAddress","addressLocality":"Kanpur","addressRegion":"Uttar Pradesh","postalCode":"208024","addressCountry":"IN"},"sameAs":["https://www.linkedin.com/in/ravi-pratap-singh-283475449","https://www.truelancer.com/freelancer/ravisingh12110","https://www.instagram.com/its.ravipratap_/"]},"telephone":"+91-9235039317","priceRange":"₹₹","address":{"@type":"PostalAddress","addressLocality":"Kanpur","addressRegion":"Uttar Pradesh","postalCode":"208024","addressCountry":"IN"},"areaServed":{"@type":"City","name":"Kanpur"},"contactPoint":{"@type":"ContactPoint","telephone":"+91-9235039317","contactType":"sales","availableLanguage":["Hindi","English"]},"sameAs":["https://wa.me/919235039317","https://www.instagram.com/its.ravipratap_/","https://www.linkedin.com/in/ravi-pratap-singh-283475449","https://www.truelancer.com/freelancer/ravisingh12110"],"hasOfferCatalog":{"@type":"OfferCatalog","name":"Digital Services for Local Businesses","itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"Mobile-First Website Design & Development","description":"Custom, fast-loading websites for cafés, salons, jewellers, boutiques, and coaching institutes in Kanpur with a free homepage concept preview."}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Promotional Food & Brand Reels","description":"Short-form promotional video reels tailored for restaurants, cafés, and local retail brands in Kanpur."}}]}}` }} />
      <AuroraMotion />
      <div className="aurora" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="orb o3" />
        <div className="orb o4" />
      </div>
      <div className="grain" aria-hidden="true" />

      

      {/* ---------- HERO ---------- */}
      <section className="hero" id="top">
        <div className="hero-card">
          <div>
            <span className="eyebrow hero-eyebrow hero-el" style={{ animationDelay: ".05s" }}>✦ RPS World · Kanpur</span>
            <h1 className="hero-el" style={{ animationDelay: ".15s" }}>
              Small Shop.<br />
              <span className="grad">Big Brand.</span>
            </h1>
            <p className="lede hero-el" style={{ animationDelay: ".28s" }}>
              Website, Reels, YouTube aur Apps — chhoti dukaan ko badi pehchaan dene ka ek hi thikaana. Pehle free concept dekho, phir decide karo.
            </p>
            <div className="hero-ctas hero-el" style={{ animationDelay: ".4s" }}>
              <a href={WA_FREE_CONCEPT} target="_blank" rel="noopener" data-cursor="Chat" className="btn btn-hero magnetic">
                Free Homepage Concept ↗
              </a>
              <a href="#tools" className="btn btn-ghost magnetic">
                Explore Free Tools ↓
              </a>
            </div>
            <div className="hero-chips hero-el" style={{ animationDelay: ".52s" }}>
              <span className="chip">Free concept pehle</span>
              <span className="chip">Website 7–10 din</span>
              <span className="chip">Reels ₹499 pilot</span>
            </div>
          </div>
          <div className="hero-media hero-el" style={{ animationDelay: ".35s" }}>
            <div className="vid-frame">
              {/* Preserve: autoPlay muted loop playsInline kept from live repo.
                  Spec adds poster + controls (audit P1-11 fix). */}
              <video
                src="https://rpsworld.in/rps-world-promo.mp4"
                poster="https://rpsworld.in/og-rps-world.png"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                data-cursor="Play"
              />
              <span className="vid-tag">RPS World · Promo Video</span>
            </div>
            <span className="float-badge">▶ Watch our story</span>
            <div aria-hidden="true">
              <span className="float-chip fc1">₹499 · 1 Finished Reel</span>
              <span className="float-chip fc2">₹18,000+ · Website</span>
              <span className="float-chip fc3">Pro ₹149/mo</span>
            </div>
          </div>
        </div>

        <div className="deadlines">
          <a href="https://protools.rpsworld.in/rrb-ntpc-signature-30-49kb" target="_blank" rel="noopener" className="deadline-card reveal">
            <span className="dot" aria-hidden="true" />
            <div>
              <h3>RRB NTPC Correction Window</h3>
              <p>16–25 Nov 2026 · Photo &amp; signature abhi theek karo — RRB Signature 30–49KB tool free hai.</p>
              <span className="deadline-cta">Tool kholo →</span>
            </div>
            <span className="tag">OPEN</span>
          </a>
          <a href="https://protools.rpsworld.in/up-tgt-2026-photo-signature-pdf" target="_blank" rel="noopener" className="deadline-card urgent reveal">
            <span className="dot" aria-hidden="true" />
            <div>
              <h3>UP TGT — Fee Last Date</h3>
              <p>28 Nov 2026 · Form bharne se pehle photo + signature 10–100 KB me ready rakho.</p>
              <span className="deadline-cta">Tool kholo →</span>
            </div>
            <span className="tag">28 NOV</span>
          </a>
        </div>
      </section>

      {/* ---------- TICKER #1 — prices ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
            <span key={i}>{t} <i>✦</i></span>
          ))}
        </div>
      </div>

      {/* ---------- TICKER #2 — deadlines, reverse ---------- */}
      <div className="ticker-deadline" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i}>{t} <i>✦</i></span>
          ))}
        </div>
      </div>

      {/* ---------- TOOLS / ProTools ---------- */}
      <section className="tools-sec" id="tools">
        <div className="aurora-wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">✦ ProTools — Free Exam Tools</span>
            <h2>
              Form photo, exact KB me.<br />
              Free, no upload, no watermark.
            </h2>
            <p>SSC, RRB, UP TGT — official size rules ke hisaab se photo aur signature taiyaar karo. Sab kuch aapke browser me hota hai.</p>
          </div>
          <div className="tools-grid">
            {TOOLS.map((t) => (
              <article key={t.title} className="tool-card tilt reveal" data-tilt="8">
                <div className="flip-inner">
                  <div className="flip-face flip-front">
                    <span className="tool-ico" aria-hidden="true">{t.icon}</span>
                    <span className="kb-badge">{t.badge}</span>
                    <h3>{t.title}</h3>
                    <p>{t.front}</p>
                    <button type="button" className="flip-toggle" aria-expanded="false" data-cursor="Flip">
                      ↻ Open
                    </button>
                  </div>
                  <div className="flip-face flip-back">
                    <span className="kb-badge">{t.badge}</span>
                    <h3>{t.title}</h3>
                    <p>{t.back}</p>
                    <span className="flip-limit">{t.limit}</span>
                    <a href={t.href} target="_blank" rel="noopener" className="btn btn-tool magnetic">
                      Open Tool →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="tools-note reveal">
            <p><b>ProTools Pro — ₹149/month:</b> bade files, zyada limits, sab tools unlocked. Payment ke baad turant active.</p>
            <a href="https://rpsworld.in/coins" className="btn btn-tool-solid magnetic">
              Get Pro ₹149/mo →
            </a>
          </div>
        </div>
      </section>

      <ExamToolsSection />

      {/* ---------- REELS ---------- */}
      <section className="reels-sec" id="reels">
        <div className="aurora-wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">✦ Reel Service</span>
            <h2>Reels jo ruk kar dekhi jaayein.</h2>
            <p>Hook, script, edit aur posting — dukaan ya business ke liye finished reel, ek pilot se shuru karo.</p>
          </div>
          <div className="reel-strip">
            {REELS.map((r) => (
              <article key={r.title} className="reel-frame tilt reveal" data-cursor="View">
                <div className="film-holes" aria-hidden="true" />
                <div className="reel-body">
                  <span className="reel-no">{r.no}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <a href={WA_REELS} target="_blank" rel="noopener" className="btn btn-reel magnetic">
                    Book Pilot →
                  </a>
                </div>
                <div className="film-holes bottom" aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="reels-offer reveal">
            <span className="price">₹499<small>₹499 pilot · 1 finished reel</small></span>
            <p><b>Pilot se shuru karo.</b> Ek finished reel — pasand aaye to monthly retainer par regular reels. Koi lamba contract pehle se nahi.</p>
            <div className="reels-cta-wrap">
              <a href={WA_REELS} target="_blank" rel="noopener" className="btn btn-reel magnetic">
                WhatsApp par Book Karo →
              </a>
              <span className="reels-micro">₹499 pilot · 1 finished reel · koi contract nahi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- YOUTUBE ---------- */}
      <section className="yt-sec" id="youtube">
        <div className="aurora-wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">✦ YouTube Channels</span>
            <h2>
              Stories, facts aur gyaan —<br />
              har channel, apni duniya.
            </h2>
            <p>RPS World ke YouTube channels — cricket se lekar sarkari taiyaari tak. Subscribe karo, nayi videos dekhte raho.</p>
          </div>
          <div className="yt-grid">
            {YT.map((c) => (
              <a key={c.title} href={c.href} target="_blank" rel="noopener" data-cursor="Play" className="yt-card reveal">
                <span className="yt-thumb">
                  <span className="play-circle" aria-hidden="true" />
                  <span className="dur">▶ Channel</span>
                </span>
                <div className="yt-body">
                  <h3><span aria-hidden="true">{c.emoji}</span> {c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </a>
            ))}
            <a href="https://www.youtube.com/results?search_query=RPS+World" target="_blank" rel="noopener" data-cursor="Play" className="yt-card reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, background: "linear-gradient(135deg, rgba(239,68,68,.16), rgba(139,92,246,.14))" }}>
              <div className="yt-body" style={{ textAlign: "center" }}>
                <h3>7 Channels.<br />Ek hi parivaar.</h3>
                {/* Task-directed: spec §11.2 P-B inconsistency resolved to
                    "regularly" to match the .yt-note below. */}
                <p>Naye videos regularly — bell icon dabana mat bhoolna.</p>
              </div>
            </a>
          </div>
          <p className="yt-note reveal">▶ Har channel par <b>nayi videos regularly</b> — koi ek channel pasand aaye to subscribe karo.</p>
          <div className="yt-cta-wrap reveal">
            <a href="https://www.youtube.com/results?search_query=RPS+World" target="_blank" rel="noopener" className="btn-yt magnetic">
              Saare Channels YouTube Par ↗
            </a>
          </div>
        </div>
      </section>

      {/* ---------- WEBSITE ---------- */}
      <section className="web-sec" id="website">
        <div className="aurora-wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">✦ Website Service</span>
            <h2 style={{ color: "#fff" }}>
              Aapki dukaan, ab online.<br />
              7–10 din me live.
            </h2>
            <p style={{ color: "var(--aurora-muted)" }}>Free homepage concept pehle — design pasand aaye, tabhi aage badho. Koi advance, concept dekhne se pehle nahi.</p>
          </div>
          <div className="web-grid">
            <article className="web-card tilt reveal">
              <span className="w-tag">Step 1 · Free</span>
              <h3>Free Homepage Concept</h3>
              <span className="w-price">₹0 <small>pehle dekho</small></span>
              <p>Aapki dukaan ka homepage design — bilkul free. Pasand aaye to hi aage badho.</p>
              <ul>
                <li>Ek homepage concept</li>
                <li>Aapki dukaan ke hisaab se</li>
                <li>Koi advance nahi</li>
              </ul>
              <a href={WA_FREE_CONCEPT_SHORT} target="_blank" rel="noopener" className="btn btn-web magnetic">
                Get Free Concept →
              </a>
              <p className="web-micro">Concept free · pasand aaye tabhi aage badho</p>
            </article>
            <article className="web-card tilt reveal">
              <span className="w-tag">Website · 7–10 din</span>
              <h3>Business Website</h3>
              <span className="w-price">₹18,000–25,000 <small>one-time</small></span>
              <p>Poori website — homepage se lekar contact tak. Mobile par perfect, Google par dikhne wali.</p>
              <ul>
                <li>7–10 din me delivery</li>
                <li>Mobile-friendly design</li>
                <li>WhatsApp + call buttons</li>
              </ul>
              <a href={WA_WEBSITE} target="_blank" rel="noopener" className="btn btn-web magnetic">
                Start My Website →
              </a>
            </article>
            <article className="web-card tilt reveal">
              <span className="w-tag">Nyota · Shaadi Cards</span>
              <h3>Nyota Wedding Invite</h3>
              <span className="w-price">₹2,499 <small>/ ₹3,999 premium</small></span>
              <p>Digital shaadi ka card — photo, video, venue map aur RSVP ke saath. WhatsApp par share karo.</p>
              <ul>
                <li>Animated digital invite</li>
                <li>Photo + video gallery</li>
                <li>Venue map &amp; RSVP</li>
              </ul>
              <a href="https://nyota.rpsworld.in/" target="_blank" rel="noopener" className="btn btn-web magnetic">
                See Nyota →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- APPS ---------- */}
      <section className="apps-sec" id="apps">
        <div className="aurora-wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">✦ Our Apps</span>
            <h2>
              Tools aur dukaan —<br />
              ab aapki jeb me.
            </h2>
            <p>ProTools exam tools aur Preetam General Store — dono apps, ek hi bharosa.</p>
          </div>
          <div className="apps-grid">
            <article className="app-phone tilt reveal" data-tilt="4">
              <div className="phone" aria-hidden="true">
                <div className="notch" />
                <div className="screen">
                  <span className="app-name">ProTools</span>
                  <span className="app-sub">PDF &amp; Image Resizer</span>
                  <span className="mini">📸 <b>SSC Photo</b> · 20–50KB</span>
                  <span className="mini">✍️ <b>Signature</b> · 10–20KB</span>
                  <span className="mini">📄 <b>PDF</b> · Compress 100KB</span>
                  <span className="mini">⭐ <b>Pro</b> · ₹149/month</span>
                </div>
              </div>
              <div className="app-info">
                <h3>ProTools App</h3>
                <p>Exam form ke saare tools ek app me — photo, signature, PDF compress, merge aur split. Free se shuru karo.</p>
                <p className="app-price"><b>Pro ₹149/month</b> — bade files, zyada limits.</p>
                <div className="app-btns">
                  <a href="https://protools.rpsworld.in/app" target="_blank" rel="noopener" className="btn btn-app magnetic">
                    Open App →
                  </a>
                  <a href="https://rpsworld.in/coins" className="btn-app-ghost magnetic">
                    Get Pro
                  </a>
                </div>
              </div>
            </article>
            <article className="app-phone tilt reveal" data-tilt="4">
              <div className="phone" aria-hidden="true">
                <div className="notch" />
                <div className="screen">
                  <span className="app-name">Preetam Store</span>
                  <span className="app-sub">General Store · Vinayakpur</span>
                  <span className="mini">🛒 <b>Kiraana</b> · Daily needs</span>
                  <span className="mini">📦 <b>Order</b> · Ghar baithe</span>
                  <span className="mini">💳 <b>Payment</b> · Online / COD</span>
                  <span className="mini">🚚 <b>Delivery</b> · Local, fast</span>
                </div>
              </div>
              <div className="app-info">
                <h3>Preetam General Store</h3>
                <p>Vinayakpur ki apni dukaan — roz ka saaman, online order karo. Store app par order aur payment, sab ek jagah.</p>
                <p className="app-price"><b>Local delivery</b> — Vinayakpur aur aas-paas.</p>
                <div className="app-btns">
                  <a href={WA_STORE} target="_blank" rel="noopener" className="btn btn-app magnetic">
                    Ask on WhatsApp →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <HomeClient />

      <footer className="aurora-footer">
        <div className="f-logo">RPS <span>WORLD</span></div>
        <p>Small Shop. Big Brand. — Website, Reels, YouTube aur Apps, ek hi jagah. Kanpur se, poore India ke liye.</p>
        <div className="f-links">
          <a href="https://protools.rpsworld.in/" target="_blank" rel="noopener">ProTools</a>
          <a href="https://nyota.rpsworld.in/" target="_blank" rel="noopener">Nyota</a>
          <a href="https://rpsworld.in/coins">Pro ₹149/mo</a>
          <a href="https://wa.me/919235039317" target="_blank" rel="noopener">WhatsApp</a>
        </div>
              </footer>
    </main>
  );
}
