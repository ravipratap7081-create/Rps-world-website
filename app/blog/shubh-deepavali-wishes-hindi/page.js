import Link from "next/link";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

const SITE = "https://rpsworld.in";

export const metadata = {
  title: "50+ शुभ दीपावली शुभकामनाएं — Hindi Diwali Wishes, Shayari & Messages | ProTools",
  description:
    "सबसे सुंदर शुभ दीपावली शुभकामनाएं: 50+ हिंदी संदेश, शायरी और WhatsApp wishes। अपने नाम वाला फ्री दिवाली कार्ड भी बनाएं!",
  keywords:
    "शुभ दीपावली शुभकामनाएं, दिवाली शुभकामना संदेश हिंदी, deepavali wishes in hindi, diwali shayari hindi, दिवाली कार्ड, happy diwali hindi wishes",
  openGraph: {
    title: "50+ शुभ दीपावली शुभकामनाएं 🪔",
    description: "हिंदी में सबसे सुंदर दिवाली संदेश, शायरी + फ्री नाम वाला दिवाली कार्ड।",
    type: "article",
    url: `${SITE}/blog/shubh-deepavali-wishes-hindi`,
    siteName: "ProTools",
    locale: "hi_IN",
    images: [
      {
        url: `${SITE}/og-diwali-card.png`,
        width: 1200,
        height: 630,
        alt: "50+ शुभ दीपावली शुभकामनाएं — ProTools",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: "50+ शुभ दीपावली शुभकामनाएं 🪔", description: "हिंदी दिवाली संदेश + फ्री दिवाली कार्ड मेकर।" },
  alternates: { canonical: `${SITE}/blog/shubh-deepavali-wishes-hindi` },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "50+ शुभ दीपावली शुभकामनाएं — Hindi Diwali Wishes, Shayari & Messages",
  description: "सबसे सुंदर शुभ दीपावली शुभकामनाएं हिंदी में: संदेश, शायरी और WhatsApp wishes।",
  author: { "@type": "Organization", name: "ProTools", url: SITE },
  publisher: { "@type": "Organization", name: "ProTools" },
  datePublished: "2026-10-12",
  dateModified: "2026-10-12",
  inLanguage: ["hi"],
  mainEntityOfPage: `${SITE}/blog/shubh-deepavali-wishes-hindi`,
};

const SANDESH = [
  "दीपावली के इस पावन अवसर पर आपके जीवन में सुख, शांति और समृद्धि का वास हो। शुभ दीपावली!",
  "मां लक्ष्मी आपके घर पधारें, धन-धान्य से भंडार भरें। दीपावली की हार्दिक शुभकामनाएं!",
  "दीयों की जगमगाहट आपके जीवन के हर अंधेरे को दूर करे। शुभ दीपावली 2026!",
  "प्यार, खुशी और समृद्धि से भरी हो आपकी दिवाली। अपनों के साथ मनाएं ये खुशियों वाला त्योहार!",
  "गणपति बप्पा आपके सारे विघ्न हरें, लक्ष्मी मैया सुख-समृद्धि बरसाएं। शुभ दीपावली!",
  "रोशनी के इस त्योहार पर हर दिल में उम्मीद की ज्योति जले। दीपावली मुबारक हो!",
  "मीठी-मीठी बातें, प्यारे-प्यारे लोग, जगमगाते दीये — यही है दिवाली का असली रंग!",
  "आपके घर आंगन में खुशियों के दीप जलें, हर दिन दिवाली जैसा लगे। शुभ दीपावली!",
  "धनतेरस से भाई दूज तक, हर दिन आपके लिए खुशियां लाए। शुभ दीपावली!",
  "पुराने गिले-शिकवे भुलाकर नई शुरुआत करें, दिवाली का यही संदेश है। शुभ दीपावली!",
  "सोने-चांदी से नहीं, अपनों के प्यार से घर सजता है। दिवाली की शुभकामनाएं!",
  "पटाखों की धूम, मिठाइयों की खुशबू और अपनों का साथ — दिवाली मुबारक!",
];

const SHAYARI = [
  "आई दिवाली, छाई खुशियाली,\nहर घर में जले प्यार की दीवाली।\nमिटे अंधेरा, फैले उजाला,\nखुशियों से भर जाए जीवन सारा।\nशुभ दीपावली!",
  "दिल में हो उजाला, चेहरे पर हो नूर,\nगम का हर साया हो आपसे दूर।\nचांद-सितारों से सजे आपका आंगन,\nखुशियों से महके आपका जीवन।\nशुभ दीपावली!",
  "लक्ष्मी जी विराजें आपके द्वार,\nगणेश जी करें हर काम साकार।\nसुख-शांति-समृद्धि का हो वास,\nयही है हमारी दिल से आस।\nशुभ दीपावली!",
  "ना रहे कोई शिकवा, ना रहे कोई गिला,\nदिवाली पर सबको गले लगा लो।\nप्यार बांटो, खुशियां लुटाओ,\nरोशनी का त्योहार मनाओ।\nशुभ दीपावली!",
];

const RISHTEDAR = [
  { r: "माता-पिता के लिए", t: "आपके आशीर्वाद से ही जीवन रोशन है। इस दिवाली आपके चरणों में सादर प्रणाम। शुभ दीपावली मम्मी-पापा!" },
  { r: "दोस्तों के लिए", t: "पटाखे फोड़ेंगे, मिठाई खाएंगे, पुरानी यादें ताज़ा करेंगे। दिवाली पार्टी पक्की! शुभ दीपावली दोस्त!" },
  { r: "पति/पत्नी के लिए", t: "तुम हो तो हर दिन दिवाली है। इस खास दिवाली पर तुम्हें ढेर सारा प्यार। शुभ दीपावली जान!" },
  { r: "बॉस/क्लाइंट के लिए", t: "दीपावली के शुभ अवसर पर आपको और आपके परिवार को हार्दिक शुभकामनाएं। आने वाला वर्ष सफलता से भरा हो।" },
  { r: "पड़ोसियों के लिए", t: "मोहल्ले की रौनक आप सबसे है। मिलकर मनाएंगे दिवाली धूमधाम से। शुभ दीपावली!" },
  { r: "शिक्षकों के लिए", t: "आपके ज्ञान की रोशनी ने जीवन का अंधेरा मिटाया। गुरु जी को दीपावली की सादर शुभकामनाएं!" },
];

export default function ShubhDeepavaliHindi() {
  return (
    <ModeShell mode="genz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHeader title="50+ शुभ दीपावली शुभकामनाएं 🪔" subtitle="हिंदी संदेश, शायरी और WhatsApp wishes" />

      <article className="space-y-6">
        <section>
          <p className="text-[15px] leading-relaxed text-white/75">
            दिवाली सिर्फ दीये और पटाखों का त्योहार नहीं — ये <strong>अपनों को याद करने</strong> का त्योहार है।
            सही शब्दों में भेजी गई शुभकामना दिल को छू जाती है। यहां हमने चुने हैं <strong>सबसे सुंदर शुभ
            दीपावली शुभकामना संदेश</strong> — परिवार, दोस्तों, रिश्तेदारों और ऑफिस के लिए। हर संदेश को कॉपी
            करके सीधे WhatsApp पर भेज सकते हैं।
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">💌 शुभ दीपावली संदेश — कॉपी करें, भेजें</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {SANDESH.map((s, i) => (
              <div key={i} className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 to-orange-950/20 p-5">
                <p className="text-[15px] leading-relaxed text-amber-100/90">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">🎭 दिवाली शायरी — दिल से</h2>
          <div className="mt-4 grid gap-4">
            {SHAYARI.map((s, i) => (
              <div key={i} className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 to-orange-950/20 p-5">
                <p className="text-[15px] leading-relaxed text-amber-100/90 whitespace-pre-line">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-amber-200">👨‍👩‍👧 हर रिश्ते के लिए खास संदेश</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {RISHTEDAR.map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold text-amber-300">{item.r}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{item.t}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-200">और पढ़ें</h2>
          <ul className="mt-2 space-y-2 text-[15px]">
            <li><Link href="/blog/diwali-wishes-2026" className="text-amber-300 underline">🪔 100+ Happy Diwali Wishes 2026 (English + Hindi)</Link></li>
            <li><Link href="/blog/diwali-card-ideas" className="text-amber-300 underline">🎨 15 Diwali Card Design Ideas 2026</Link></li>
          </ul>
        </section>
      </article>
    </ModeShell>
  );
}
