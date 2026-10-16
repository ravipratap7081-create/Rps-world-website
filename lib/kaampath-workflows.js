// KaamPath — notice-to-action workflow database.
// Each workflow links its official portal. Fields set to null mean
// "could not be officially verified — UI shows 'आधिकारिक वेबसाइट पर देखें'".
// Never invent fees, deadlines or documents. Document checklists are best-effort
// guides compiled from official portals (last reviewed 2026-10-16, corrections
// applied per external audit) — users must confirm current requirements on the
// official portal before applying.

export const WORKFLOWS = [
  {
    slug: "up-scholarship",
    titleHi: "उत्तर प्रदेश छात्रवृत्ति (स्कॉलरशिप)",
    titleEn: "UP Scholarship",
    categoryHi: "शिक्षा",
    descHi:
      "उत्तर प्रदेश सरकार की छात्रवृत्ति योजना — पढ़ाई के खर्च और फीस में आर्थिक सहायता, सीधे आपके बैंक खाते में (DBT)।",
    officialSource: {
      name: "उत्तर प्रदेश छात्रवृत्ति पोर्टल",
      url: "https://scholarship.up.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "उत्तर प्रदेश के स्थायी निवासी छात्र-छात्राएं",
      "मान्यता प्राप्त स्कूल, कॉलेज या विश्वविद्यालय में पढ़ाई कर रहे हों",
      "पिछली परीक्षा उत्तीर्ण की हो",
      "पारिवारिक आय संबंधित वर्ग के नियमानुसार सीमा के भीतर हो",
      "बैंक खाते में आधार सीडिंग अनिवार्य है",
    ],
    documentsHi: [
      "आधार कार्ड",
      "पिछली कक्षा की मार्कशीट",
      "आय प्रमाण पत्र",
      "जाति प्रमाण पत्र (लागू होने पर)",
      "निवास प्रमाण पत्र",
      "बैंक पासबुक की प्रति",
      "फीस रसीद",
      "पासपोर्ट साइज फोटो",
    ],
    steps: [
      {
        titleHi: "OTR (वन टाइम रजिस्ट्रेशन) करें",
        detailHi:
          "सत्र 2025-26 से OTR अनिवार्य है। पोर्टल पर पहले OTR पंजीकरण करें, तभी छात्रवृत्ति फॉर्म भर पाएंगे।",
        link: "https://scholarship.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "बैंक खाते में आधार सीडिंग कराएं",
        detailHi:
          "भुगतान DBT से होता है, इसलिए अपने चालू बैंक खाते में आधार सीडिंग ज़रूर करा लें। पोर्टल पर सीडिंग की स्थिति जांच सकते हैं।",
        link: "https://scholarship.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "सही श्रेणी चुनें",
        detailHi:
          "अपनी कक्षा और पाठ्यक्रम के अनुसार सही श्रेणी चुनें: प्री-मैट्रिक (कक्षा 9–10), पोस्ट-मैट्रिक इंटरमीडिएट (कक्षा 11–12), या दशमोत्तर/अन्य उपयुक्त श्रेणी। वर्तमान सत्र की श्रेणी और निर्देश आधिकारिक पोर्टल पर जाँचें।",
        link: "https://scholarship.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "आवेदन फॉर्म भरें",
        detailHi:
          "OTR नंबर से लॉगिन करके व्यक्तिगत, शैक्षणिक, आय और बैंक विवरण सावधानी से भरें।",
        link: "https://scholarship.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "दस्तावेज़ अपलोड करें",
        detailHi:
          "मांगे गए दस्तावेज़ स्कैन करके तय साइज़ में अपलोड करें। फोटो व PDF सही साइज़ में बनाने के लिए नीचे दिए टूल काम आएंगे।",
        link: null,
        tool: "/sarkari/photo-resizer",
      },
      {
        titleHi: "फॉर्म जमा कर प्रिंट निकालें",
        detailHi:
          "सबमिट करने के बाद आवेदन का प्रिंट लें और हार्ड कॉपी अपने स्कूल/कॉलेज में सत्यापन हेतु जमा करें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "स्थिति ट्रैक करें",
        detailHi:
          "OTR नंबर से पोर्टल पर आवेदन की स्थिति (सबमिटेड/वेरिफाइड/फॉरवर्डेड) देखते रहें। स्वीकृति के बाद राशि DBT से खाते में आती है।",
        link: "https://scholarship.up.gov.in/",
        tool: null,
      },
    ],
    applyLink: "https://scholarship.up.gov.in/",
    deadlineHi:
      "सत्र 2026-27 हेतु आवेदन प्रक्रिया चालू है — अंतिम तिथि पोर्टल के टाइमटेबल सेक्शन में देखें",
    deadlineDate: null,
    feeHi: "आवेदन निःशुल्क है",
    relatedTools: [
      "/sarkari/photo-resizer",
      "/sarkari/image-compressor",
      "/sarkari/pdf-compressor",
      "/sarkari/signature-maker",
    ],
  },
  {
    slug: "jati-praman-patra",
    titleHi: "जाति प्रमाण पत्र (उत्तर प्रदेश)",
    titleEn: "Caste Certificate (UP)",
    categoryHi: "प्रमाण पत्र",
    descHi:
      "SC/ST/OBC वर्ग के लिए उत्तर प्रदेश का जाति प्रमाण पत्र — सरकारी नौकरी, आरक्षण और योजनाओं में काम आता है। ई-डिस्ट्रिक्ट पोर्टल से ऑनलाइन आवेदन।",
    officialSource: {
      name: "ई-डिस्ट्रिक्ट उत्तर प्रदेश",
      url: "https://edistrict.up.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "उत्तर प्रदेश के निवासी हों",
      "अनुसूचित जाति, अनुसूचित जनजाति या अन्य पिछड़ा वर्ग से संबंध रखते हों",
    ],
    documentsHi: [
      "स्व-प्रमाणित घोषणा पत्र (पोर्टल से डाउनलोड करके भरें)",
      "ग्राम प्रधान या पार्षद द्वारा जारी जाति संबंधी प्रमाण",
      "राशन कार्ड की प्रति",
      "निवास प्रमाण पत्र",
      "आधार कार्ड",
      "पासपोर्ट साइज फोटो",
    ],
    steps: [
      {
        titleHi: "ई-डिस्ट्रिक्ट पोर्टल पर रजिस्ट्रेशन करें",
        detailHi:
          "पोर्टल पर 'नवीन उपयोगकर्ता पंजीकरण' (Citizen Login / ई-साथी) से नाम, मोबाइल नंबर और ईमेल से रजिस्टर करें — OTP से सत्यापन होगा।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "लॉगिन करके प्रमाण पत्र सेवा चुनें",
        detailHi:
          "यूज़र ID-पासवर्ड से लॉगिन करें, फिर 'प्रमाण पत्र सेवा' सेक्शन में 'जाति प्रमाण पत्र' विकल्प चुनें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "आवेदन फॉर्म भरें",
        detailHi:
          "फॉर्म में नाम, पता, जाति आदि विवरण आधार कार्ड के अनुसार बिल्कुल सही भरें — स्पेलिंग में अंतर होने पर फॉर्म निरस्त हो सकता है।",
        link: null,
        tool: null,
      },
      {
        titleHi: "दस्तावेज़ अपलोड करें",
        detailHi:
          "घोषणा पत्र पर हस्ताक्षर करके स्कैन करें; फोटो और दस्तावेज़ तय साइज़ (JPG/PDF) में अपलोड करें। धुंधले स्कैन से फॉर्म रिजेक्ट हो जाता है।",
        link: null,
        tool: "/sarkari/image-compressor",
      },
      {
        titleHi: "शुल्क का ऑनलाइन भुगतान करें",
        detailHi:
          "निर्धारित सेवा शुल्क का UPI/नेट बैंकिंग से भुगतान करें और आवेदन सबमिट करें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "आवेदन संख्या संभालकर रखें",
        detailHi:
          "सबमिट होने पर मिली रसीद/आवेदन संख्या से पोर्टल पर 'आवेदन की स्थिति' में स्टेटस ट्रैक करें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "प्रमाण पत्र डाउनलोड करें",
        detailHi:
          "जाँच और स्वीकृति के बाद प्रमाणपत्र पोर्टल से डाउनलोड करें। जिस नौकरी, प्रवेश, आरक्षण या योजना में इसे उपयोग करना है, उसके संबंधित राज्य/केंद्र के नियम और प्रमाणपत्र प्रारूप अलग से जाँचें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
    ],
    applyLink: "https://edistrict.up.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: null,
    relatedTools: [
      "/sarkari/photo-resizer",
      "/sarkari/image-compressor",
      "/sarkari/pdf-compressor",
      "/sarkari/signature-maker",
    ],
  },
  {
    slug: "niwas-praman-patra",
    titleHi: "निवास प्रमाण पत्र (उत्तर प्रदेश)",
    titleEn: "Domicile Certificate (UP)",
    categoryHi: "प्रमाण पत्र",
    descHi:
      "उत्तर प्रदेश का स्थायी निवासी होने का प्रमाण — नौकरी, छात्रवृत्ति, होम लोन और योजनाओं में मांगा जाता है। ई-डिस्ट्रिक्ट पोर्टल से ऑनलाइन आवेदन।",
    officialSource: {
      name: "ई-डिस्ट्रिक्ट उत्तर प्रदेश",
      url: "https://edistrict.up.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "उत्तर प्रदेश में निवास करते हों",
      "आवेदन में दिया गया पता सत्यापन योग्य हो",
    ],
    documentsHi: [
      "स्व-प्रमाणित घोषणा पत्र (पोर्टल से डाउनलोड करके भरें)",
      "राशन कार्ड, बिजली बिल या वोटर ID की प्रति",
      "छात्र होने पर शैक्षणिक प्रमाण पत्र",
      "आधार कार्ड",
      "पासपोर्ट साइज फोटो",
    ],
    steps: [
      {
        titleHi: "ई-डिस्ट्रिक्ट पोर्टल पर रजिस्ट्रेशन करें",
        detailHi:
          "पोर्टल पर 'नवीन उपयोगकर्ता पंजीकरण' (Citizen Login / ई-साथी) से मोबाइल OTP द्वारा रजिस्टर करें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "लॉगिन करके निवास प्रमाण पत्र चुनें",
        detailHi:
          "लॉगिन के बाद 'प्रमाण पत्र सेवा' सेक्शन में 'निवास प्रमाण पत्र' विकल्प चुनें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "फॉर्म भरें और दस्तावेज़ अपलोड करें",
        detailHi:
          "पता व व्यक्तिगत विवरण सही भरें; घोषणा पत्र पर हस्ताक्षर करके स्कैन प्रति और अन्य दस्तावेज़ तय साइज़ में अपलोड करें।",
        link: null,
        tool: "/sarkari/pdf-compressor",
      },
      {
        titleHi: "शुल्क भुगतान करके सबमिट करें",
        detailHi:
          "निर्धारित सेवा शुल्क ऑनलाइन जमा करके फॉर्म सबमिट करें और आवेदन संख्या नोट कर लें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "स्टेटस देखें और प्रमाण पत्र डाउनलोड करें",
        detailHi:
          "पोर्टल पर आवेदन की स्थिति ट्रैक करें; जांच-स्वीकृति के बाद डिजिटल हस्ताक्षर वाला निवास प्रमाण पत्र डाउनलोड करें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
    ],
    applyLink: "https://edistrict.up.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: null,
    relatedTools: [
      "/sarkari/photo-resizer",
      "/sarkari/image-compressor",
      "/sarkari/pdf-compressor",
      "/sarkari/signature-maker",
    ],
  },
  {
    slug: "aay-praman-patra",
    titleHi: "आय प्रमाण पत्र (उत्तर प्रदेश)",
    titleEn: "Income Certificate (UP)",
    categoryHi: "प्रमाण पत्र",
    descHi:
      "परिवार की वार्षिक आय का आधिकारिक प्रमाण — छात्रवृत्ति, EWS कोटे, शिक्षा लोन और सरकारी योजनाओं में ज़रूरी। ई-डिस्ट्रिक्ट पोर्टल से ऑनलाइन आवेदन।",
    officialSource: {
      name: "ई-डिस्ट्रिक्ट उत्तर प्रदेश",
      url: "https://edistrict.up.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "उत्तर प्रदेश के निवासी हों",
      "सभी स्रोतों से होने वाली आय की सही जानकारी देनी होगी",
    ],
    documentsHi: [
      "स्व-प्रमाणित घोषणा पत्र (पोर्टल से डाउनलोड करके भरें)",
      "राशन कार्ड की प्रति",
      "वेतनभोगी होने पर वेतन पर्ची",
      "आधार कार्ड",
      "पासपोर्ट साइज फोटो",
    ],
    steps: [
      {
        titleHi: "ई-डिस्ट्रिक्ट पोर्टल पर रजिस्ट्रेशन करें",
        detailHi:
          "पोर्टल पर 'नवीन उपयोगकर्ता पंजीकरण' (Citizen Login / ई-साथी) से मोबाइल OTP द्वारा रजिस्टर करें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "लॉगिन करके आय प्रमाण पत्र चुनें",
        detailHi:
          "लॉगिन के बाद 'प्रमाण पत्र सेवा' सेक्शन में 'आय प्रमाण पत्र' विकल्प चुनें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "आय का विवरण भरें",
        detailHi:
          "सभी स्रोतों (नौकरी, खेती, व्यापार आदि) से वार्षिक आय सही-सही लिखें — गलत जानकारी पर आवेदन निरस्त हो सकता है।",
        link: null,
        tool: null,
      },
      {
        titleHi: "दस्तावेज़ अपलोड करें",
        detailHi:
          "हस्ताक्षरित घोषणा पत्र और अन्य दस्तावेज़ साफ़ स्कैन में, तय साइज़ सीमा के भीतर अपलोड करें।",
        link: null,
        tool: "/sarkari/image-compressor",
      },
      {
        titleHi: "शुल्क भुगतान करके सबमिट करें",
        detailHi:
          "निर्धारित सेवा शुल्क ऑनलाइन जमा करके फॉर्म सबमिट करें और आवेदन संख्या संभालकर रखें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "स्टेटस देखें और प्रमाण पत्र डाउनलोड करें",
        detailHi:
          "पोर्टल पर 'आवेदन की स्थिति' में ट्रैक करें; जांच-स्वीकृति के बाद डिजिटल हस्ताक्षर वाला आय प्रमाण पत्र डाउनलोड करें।",
        link: "https://edistrict.up.gov.in/",
        tool: null,
      },
    ],
    applyLink: "https://edistrict.up.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: null,
    relatedTools: [
      "/sarkari/photo-resizer",
      "/sarkari/image-compressor",
      "/sarkari/pdf-compressor",
      "/sarkari/signature-maker",
    ],
  },
  {
    slug: "up-ration-card",
    titleHi: "राशन कार्ड (उत्तर प्रदेश)",
    titleEn: "Ration Card (UP)",
    categoryHi: "खाद्य व आपूर्ति",
    descHi:
      "NFSA के तहत सस्ता/मुफ्त राशन पाने के लिए उत्तर प्रदेश का राशन कार्ड — खाद्य तथा रसद विभाग के पोर्टल से आवेदन।",
    officialSource: {
      name: "खाद्य तथा रसद विभाग, उत्तर प्रदेश",
      url: "https://fcs.up.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "उत्तर प्रदेश के निवासी हों",
      "परिवार के पास पहले से कोई वैध राशन कार्ड न हो",
      "NFSA पात्रता मानदंड (आय व श्रेणी संबंधी) पूर्ण करते हों",
    ],
    documentsHi: [
      "परिवार के सभी सदस्यों के आधार कार्ड (e-KYC हेतु)",
      "पता प्रमाण — वोटर ID, बिजली बिल, किराया अनुबंध आदि",
      "परिवार का समूह फोटो",
      "आय प्रमाण पत्र",
      "बैंक पासबुक की प्रति",
    ],
    steps: [
      {
        titleHi: "आवेदन फॉर्म डाउनलोड करें",
        detailHi:
          "fcs.up.gov.in पोर्टल पर 'Download Forms' में जाकर ग्रामीण या शहरी श्रेणी का आवेदन फॉर्म डाउनलोड करें।",
        link: "https://fcs.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "फॉर्म भरें और दस्तावेज़ तैयार करें",
        detailHi:
          "फॉर्म में परिवार के सभी सदस्यों का विवरण सही भरें; आधार, पता प्रमाण, फोटो आदि की स्कैन प्रतियां तैयार रखें।",
        link: null,
        tool: "/sarkari/photo-resizer",
      },
      {
        titleHi: "आवेदन जमा करें",
        detailHi:
          "भरा फॉर्म दस्तावेज़ों सहित नज़दीकी जन सेवा केंद्र (CSC) या तहसील केंद्र पर जमा करें; ऑनलाइन आवेदन की सुविधा होने पर पोर्टल से भी सबमिट कर सकते हैं।",
        link: "https://fcs.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "रेफरेंस नंबर संभालकर रखें",
        detailHi:
          "जमा करने पर मिली पावती/रेफरेंस संख्या से पोर्टल पर आवेदन की स्थिति ट्रैक करें।",
        link: "https://fcs.up.gov.in/",
        tool: null,
      },
      {
        titleHi: "सत्यापन के बाद ई-राशन कार्ड पाएं",
        detailHi:
          "जांच-स्वीकृति के बाद राशन कार्ड जारी होता है; ई-राशन कार्ड पोर्टल, Mera Ration ऐप या DigiLocker से भी डाउनलोड किया जा सकता है।",
        link: null,
        tool: null,
      },
      {
        titleHi: "मदद चाहिए तो हेल्पलाइन पर संपर्क करें",
        detailHi:
          "राशन कार्ड संबंधी सहायता के लिए टोल-फ्री हेल्पलाइन 1967 या 1800-1800-150 पर कॉल करें।",
        link: null,
        tool: null,
      },
    ],
    applyLink: "https://fcs.up.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: null,
    relatedTools: [
      "/sarkari/photo-resizer",
      "/sarkari/image-compressor",
      "/sarkari/pdf-compressor",
    ],
  },
  {
    slug: "voter-id-registration",
    titleHi: "वोटर ID पंजीकरण (नया मतदाता)",
    titleEn: "Voter ID Registration",
    categoryHi: "पहचान पत्र",
    descHi:
      "18+ आयु के नए मतदाताओं का निर्वाचक नामावली में नाम जुड़वाना — ECI के नागरिक सेवा पोर्टल पर फॉर्म 6 से ऑनलाइन आवेदन।",
    officialSource: {
      name: "ECI नागरिक सेवा पोर्टल (ECINet)",
      url: "https://voters.eci.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "भारत के नागरिक हों",
      "18 वर्ष या उससे अधिक आयु के हों (चुनाव आयोग की 4 अर्हता तिथियां: 1 जनवरी, 1 अप्रैल, 1 जुलाई, 1 अक्टूबर)",
      "किसी भी निर्वाचक नामावली में नाम पहले से दर्ज न हो",
      "आवेदन वाले पते पर सामान्य रूप से निवास करते हों",
    ],
    documentsHi: [
      "आयु प्रमाण — फॉर्म 6 की सूची से कोई एक (आधार, जन्म प्रमाण पत्र, 10वीं की मार्कशीट, PAN या पासपोर्ट)",
      "पता प्रमाण — फॉर्म 6 की सूची से कोई एक (तय अवधि का बिजली/पानी/गैस बिल, रजिस्टर्ड लीज डीड, आधार, बैंक पासबुक); हर बिल/अनुबंध अपने आप स्वीकार नहीं होता",
      "हालिया पासपोर्ट साइज फोटो",
    ],
    steps: [
      {
        titleHi: "पोर्टल पर अकाउंट बनाएं",
        detailHi:
          "voters.eci.gov.in पर मोबाइल नंबर और ईमेल से साइन-अप करें और OTP से सत्यापित करें।",
        link: "https://voters.eci.gov.in/",
        tool: null,
      },
      {
        titleHi: "फॉर्म 6 (नया मतदाता पंजीकरण) चुनें",
        detailHi:
          "लॉगिन के बाद डैशबोर्ड में 'New Voter Registration' के तहत फॉर्म 6 खोलें।",
        link: "https://voters.eci.gov.in/",
        tool: null,
      },
      {
        titleHi: "राज्य, जिला व विधानसभा चुनें",
        detailHi:
          "अपने वर्तमान निवास का राज्य, जिला और विधानसभा निर्वाचन क्षेत्र चुनकर आगे बढ़ें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "व्यक्तिगत विवरण भरें",
        detailHi:
          "नाम, जन्म तिथि, लिंग, माता-पिता/पति-पत्नी का नाम और पूरा पता दस्तावेज़ों के अनुसार भरें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "फोटो व दस्तावेज़ अपलोड करें",
        detailHi:
          "हालिया फोटो, आयु प्रमाण और पता प्रमाण की साफ़ स्कैन प्रतियां तय साइज़ में अपलोड करें।",
        link: null,
        tool: "/sarkari/image-compressor",
      },
      {
        titleHi: "घोषणा करके सबमिट करें",
        detailHi:
          "घोषणा अनुभाग भरकर सभी विवरण जांचें, कैप्चा डालें और सबमिट करें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "रेफरेंस ID संभालकर रखें",
        detailHi:
          "स्क्रीन पर दिखी रेफरेंस/एक्नॉलेजमेंट संख्या नोट कर लें — इसी से आवेदन ट्रैक होगा।",
        link: "https://voters.eci.gov.in/",
        tool: null,
      },
      {
        titleHi: "सत्यापन के बाद e-EPIC डाउनलोड करें",
        detailHi:
          "बूथ लेवल अधिकारी (BLO) जांच करेंगे; स्वीकृति के बाद नाम मतदाता सूची में जुड़ता है और e-EPIC पोर्टल से डाउनलोड किया जा सकता है।",
        link: "https://voters.eci.gov.in/",
        tool: null,
      },
    ],
    applyLink: "https://voters.eci.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: "आवेदन निःशुल्क है",
    relatedTools: ["/sarkari/photo-resizer", "/sarkari/image-compressor"],
  },
  {
    slug: "pan-card-epan",
    titleHi: "पैन कार्ड (इंस्टेंट ई-पैन)",
    titleEn: "PAN Card (Instant e-PAN)",
    categoryHi: "पहचान पत्र",
    descHi:
      "आधार से तुरंत डिजिटल पैन — आयकर विभाग के ई-फाइलिंग पोर्टल पर बिना फॉर्म भरे, OTP से कुछ मिनटों में ई-पैन।",
    officialSource: {
      name: "आयकर विभाग — ई-फाइलिंग पोर्टल",
      url: "https://www.incometax.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "वयस्क भारतीय निवासी व्यक्ति हों",
      "पहले से पैन आवंटित न हुआ हो",
      "वैध आधार नंबर हो",
      "आधार से जुड़ा सक्रिय मोबाइल नंबर हो (OTP हेतु)",
      "DigiLocker का एक्सेस हो",
    ],
    documentsHi: [
      "12 अंकों का आधार नंबर",
      "आधार से जुड़ा मोबाइल नंबर (OTP सत्यापन हेतु)",
      "DigiLocker खाता (जन्म तिथि विवरण हेतु)",
    ],
    steps: [
      {
        titleHi: "ई-फाइलिंग पोर्टल खोलें",
        detailHi:
          "आयकर विभाग की आधिकारिक वेबसाइट incometax.gov.in पर जाएं — यह प्री-लॉगिन सेवा है, अकाउंट बनाना ज़रूरी नहीं।",
        link: "https://www.incometax.gov.in/",
        tool: null,
      },
      {
        titleHi: "'Instant e-PAN' चुनें",
        detailHi:
          "होमपेज पर Quick Links में 'Instant e-PAN' पर क्लिक करें, फिर 'Get New e-PAN' चुनें।",
        link: "https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/instant-e-pan",
        tool: null,
      },
      {
        titleHi: "आधार नंबर दर्ज करें",
        detailHi:
          "अपना 12 अंकों का आधार नंबर लिखें, घोषणा पर टिक करके आगे बढ़ें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "OTP से सत्यापन करें",
        detailHi:
          "आधार से जुड़े मोबाइल पर आया 6 अंकों का OTP डालें और आधार विवरण UIDAI से सत्यापित करने की सहमति दें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "विवरण जांचें और सबमिट करें",
        detailHi:
          "आधार से आए नाम, जन्म तिथि आदि विवरण जांचें — यही आपके पैन रिकॉर्ड में दर्ज होगा। फिर सबमिट करें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "एक्नॉलेजमेंट नंबर संभालें",
        detailHi:
          "सबमिट होने पर एक्नॉलेजमेंट नंबर मिलेगा — इसी से पोर्टल पर स्टेटस देख सकते हैं।",
        link: "https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/instant-e-pan",
        tool: null,
      },
      {
        titleHi: "ई-पैन PDF डाउनलोड करें",
        detailHi:
          "आवंटन के बाद डिजिटल हस्ताक्षर वाला ई-पैन PDF डाउनलोड करें — यह फिज़िकल पैन कार्ड जैसा ही मान्य है।",
        link: null,
        tool: null,
      },
    ],
    applyLink: "https://www.incometax.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: "निःशुल्क — कोई शुल्क नहीं (आधिकारिक पोर्टल अनुसार)",
    relatedTools: [],
  },
  {
    slug: "passport-application",
    titleHi: "पासपोर्ट आवेदन",
    titleEn: "Passport Application",
    categoryHi: "पहचान पत्र",
    descHi:
      "नया भारतीय पासपोर्ट बनवाना — पासपोर्ट सेवा पोर्टल पर ऑनलाइन आवेदन, अपॉइंटमेंट और PSK पर सत्यापन।",
    officialSource: {
      name: "पासपोर्ट सेवा — विदेश मंत्रालय",
      url: "https://www.passportindia.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "भारत के नागरिक हों",
      "अवयस्क (18 से कम) आवेदक हेतु माता-पिता या अभिभावक की सहमति आवश्यक",
    ],
    documentsHi: [
      "पहचान प्रमाण — आधार, PAN या वोटर ID",
      "पता प्रमाण — आधार, बिजली बिल, किराया अनुबंध आदि",
      "जन्म तिथि प्रमाण — जन्म प्रमाण पत्र या स्कूल प्रमाण पत्र",
      "पुराना पासपोर्ट (री-इश्यू/नवीनीकरण हेतु)",
    ],
    steps: [
      {
        titleHi: "पोर्टल पर रजिस्टर करें",
        detailHi:
          "passportindia.gov.in पर 'Register Now' से लॉगिन ID बनाएं — अपने वर्तमान पते के अनुसार पासपोर्ट कार्यालय चुनें।",
        link: "https://www.passportindia.gov.in/",
        tool: null,
      },
      {
        titleHi: "'Apply for Fresh Passport' चुनें",
        detailHi:
          "लॉगिन करके 'Apply for Fresh Passport / Re-issue of Passport' लिंक पर क्लिक करें और नॉर्मल या तत्काल स्कीम चुनें।",
        link: "https://www.passportindia.gov.in/",
        tool: null,
      },
      {
        titleHi: "आवेदन फॉर्म भरें",
        detailHi:
          "आवेदन में व्यक्तिगत, पारिवारिक और पते का विवरण भरें तथा पोर्टल के निर्देशों के अनुसार आवश्यक दस्तावेज़ दें। PSK/POPSK अपॉइंटमेंट पर मूल दस्तावेज़ और उनकी फोटोकॉपी ले जाएँ; वहाँ सामान्य आवेदन के लिए फोटो ले जाना आवश्यक नहीं है। फ्रेश, री-इश्यू, नाबालिग, नॉर्मल व तत्काल — हर श्रेणी के दस्तावेज़ अलग हो सकते हैं; पोर्टल पर अपने केस की दस्तावेज़ सूची ज़रूर देखें।",
        link: null,
        tool: "/sarkari/photo-resizer",
      },
      {
        titleHi: "फीस दें और अपॉइंटमेंट बुक करें",
        detailHi:
          "'Pay and Schedule Appointment' से ऑनलाइन भुगतान करें (अपॉइंटमेंट हेतु ऑनलाइन पेमेंट अनिवार्य) और नज़दीकी PSK/POPSK का स्लॉट चुनें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "PSK पर मूल दस्तावेज़ लेकर जाएं",
        detailHi:
          "नियत तिथि पर सभी मूल दस्तावेज़ व स्व-प्रमाणित प्रतियों के साथ केंद्र जाएं — फोटो व बायोमेट्रिक वहीं लिया जाएगा।",
        link: null,
        tool: null,
      },
      {
        titleHi: "पुलिस सत्यापन पूरा होने दें",
        detailHi:
          "आवेदन के बाद पते का पुलिस सत्यापन होता है — स्थानीय पुलिस संपर्क कर सकती है।",
        link: null,
        tool: null,
      },
      {
        titleHi: "पासपोर्ट प्राप्त करें",
        detailHi:
          "स्वीकृति के बाद पासपोर्ट स्पीड पोस्ट से आपके पते पर भेजा जाता है; स्टेटस पोर्टल पर ट्रैक कर सकते हैं।",
        link: "https://www.passportindia.gov.in/",
        tool: null,
      },
    ],
    applyLink: "https://www.passportindia.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: "शुल्क पासपोर्ट के प्रकार, पेज संख्या और स्कीम पर निर्भर — पोर्टल के फीस कैलकुलेटर में देखें",
    relatedTools: [
      "/sarkari/photo-resizer",
      "/sarkari/image-compressor",
      "/sarkari/pdf-compressor",
      "/sarkari/signature-maker",
    ],
  },
  {
    slug: "driving-licence",
    titleHi: "ड्राइविंग लाइसेंस",
    titleEn: "Driving Licence",
    categoryHi: "पहचान पत्र",
    descHi:
      "लर्नर लाइसेंस से स्थायी ड्राइविंग लाइसेंस तक — सारथी (परिवहन सेवा) पोर्टल पर ऑनलाइन आवेदन, टेस्ट और डाउनलोड।",
    officialSource: {
      name: "परिवहन सेवा (सारथी) — सड़क परिवहन मंत्रालय",
      url: "https://parivahan.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "वाहन श्रेणी के अनुसार निर्धारित न्यूनतम आयु पूर्ण हो",
      "स्थायी DL हेतु उसी श्रेणी का वैध लर्नर लाइसेंस (कम से कम 30 दिन पुराना) हो",
      "किसी न्यायालय द्वारा ड्राइविंग हेतु अयोग्य घोषित न हों",
      "40+ आयु या कमर्शियल श्रेणी हेतु मेडिकल प्रमाण पत्र आवश्यक",
    ],
    documentsHi: [
      "आयु प्रमाण — जन्म प्रमाण पत्र, 10वीं की मार्कशीट, पासपोर्ट या PAN",
      "पता प्रमाण — आधार, पासपोर्ट, वोटर ID, बिजली बिल या किराया अनुबंध",
      "पहचान प्रमाण — आधार, PAN, पासपोर्ट या वोटर ID",
      "पासपोर्ट साइज फोटो व हस्ताक्षर की स्कैन प्रति",
      "फॉर्म 1 (स्व-घोषणा) / फॉर्म 1A (मेडिकल प्रमाणपत्र, लागू होने पर)",
    ],
    steps: [
      {
        titleHi: "सारथी पोर्टल पर राज्य चुनें",
        detailHi:
          "sarathi.parivahan.gov.in खोलकर अपने राज्य का चयन करें — सभी DL सेवाएं यहीं से शुरू होती हैं।",
        link: "https://sarathi.parivahan.gov.in/",
        tool: null,
      },
      {
        titleHi: "'Apply for Learner Licence' चुनें",
        detailHi:
          "लर्नर लाइसेंस सेक्शन में नया आवेदन खोलें और फॉर्म 2 में व्यक्तिगत विवरण, पता व वाहन श्रेणी भरें।",
        link: "https://sarathi.parivahan.gov.in/",
        tool: null,
      },
      {
        titleHi: "दस्तावेज़ अपलोड करें",
        detailHi:
          "आयु, पता व पहचान प्रमाण, फोटो-हस्ताक्षर और फॉर्म 1/1A पोर्टल पर बताई साइज़ सीमा में अपलोड करें।",
        link: null,
        tool: "/sarkari/image-compressor",
      },
      {
        titleHi: "शुल्क दें और टेस्ट स्लॉट बुक करें",
        detailHi:
          "निर्धारित शुल्क ऑनलाइन (UPI/नेट बैंकिंग/कार्ड) जमा करके लर्नर लाइसेंस टेस्ट का स्लॉट बुक करें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "लर्नर टेस्ट दें",
        detailHi:
          "ट्रैफिक नियमों व साइन पर आधारित MCQ टेस्ट दें (आमतौर पर 60% अंक पर उत्तीर्ण) — कई राज्यों में यह ऑनलाइन भी होता है।",
        link: null,
        tool: null,
      },
      {
        titleHi: "लर्नर लाइसेंस डाउनलोड करें",
        detailHi:
          "उत्तीर्ण होने पर लर्नर लाइसेंस (फॉर्म 3) पोर्टल से PDF में डाउनलोड करें।",
        link: "https://sarathi.parivahan.gov.in/",
        tool: null,
      },
      {
        titleHi: "30 दिन बाद स्थायी DL हेतु आवेदन करें",
        detailHi:
          "लर्नर लाइसेंस मिलने के कम से कम 30 दिन बाद (वैधता अवधि के भीतर) 'Apply for Driving Licence' से आवेदन करें।",
        link: "https://sarathi.parivahan.gov.in/",
        tool: null,
      },
      {
        titleHi: "RTO में ड्राइविंग टेस्ट दें",
        detailHi:
          "स्लॉट बुक करके RTO जाएं — मूल दस्तावेज़ व लर्नर लाइसेंस साथ रखें। टेस्ट में उत्तीर्ण होने पर DL जारी होकर पते पर भेजा जाता है।",
        link: null,
        tool: null,
      },
    ],
    applyLink: "https://sarathi.parivahan.gov.in/",
    deadlineHi: "लर्नर लाइसेंस की वैधता अवधि के भीतर स्थायी DL हेतु आवेदन करें",
    deadlineDate: null,
    feeHi: "शुल्क वाहन श्रेणी के अनुसार — पोर्टल पर भुगतान के समय देखें",
    relatedTools: [
      "/sarkari/photo-resizer",
      "/sarkari/image-compressor",
      "/sarkari/signature-maker",
    ],
  },
  {
    slug: "ayushman-card",
    titleHi: "आयुष्मान कार्ड (PM-JAY)",
    titleEn: "Ayushman Card",
    categoryHi: "स्वास्थ्य",
    descHi:
      "आयुष्मान भारत PM-JAY के तहत मुफ्त इलाज हेतु आयुष्मान कार्ड — NHA लाभार्थी पोर्टल पर e-KYC से ऑनलाइन आवेदन व डाउनलोड।",
    officialSource: {
      name: "राष्ट्रीय स्वास्थ्य प्राधिकरण — लाभार्थी पोर्टल",
      url: "https://beneficiary.nha.gov.in/",
    },
    verifiedDate: "2026-10-16",
    eligibilityHi: [
      "मार्ग 1 — PM-JAY/राज्य लाभार्थी: पात्रता लागू लाभार्थी डेटाबेस (जैसे SECC सूची या राज्य के विस्तार) पर निर्भर करती है — लाभार्थी पोर्टल पर जांचें",
      "मार्ग 2 — 70+ वरिष्ठ नागरिक: आधार में दर्ज आयु के आधार पर सभी भारतीय नागरिक पात्र (आय सीमा नहीं); आधार e-KYC अनिवार्य",
    ],
    documentsHi: [
      "70+ वरिष्ठ नागरिक मार्ग: आधार कार्ड (आधार e-KYC अनिवार्य — नामांकन हेतु यही आवश्यक दस्तावेज़)",
      "PM-JAY/राज्य लाभार्थी मार्ग: पोर्टल पर अपने परिवार हेतु बताई गई दस्तावेज़ सूची देखें (केस के अनुसार)",
      "OTP हेतु आधार से जुड़ा सक्रिय मोबाइल नंबर",
    ],
    steps: [
      {
        titleHi: "लाभार्थी पोर्टल खोलें",
        detailHi:
          "NHA के आधिकारिक लाभार्थी पोर्टल beneficiary.nha.gov.in पर जाएं (या आधिकारिक Ayushman App इस्तेमाल करें)।",
        link: "https://beneficiary.nha.gov.in/",
        tool: null,
      },
      {
        titleHi: "'Beneficiary' से लॉगिन करें",
        detailHi:
          "Beneficiary विकल्प चुनकर 10 अंकों का मोबाइल नंबर डालें और OTP से सत्यापित करें।",
        link: "https://beneficiary.nha.gov.in/",
        tool: null,
      },
      {
        titleHi: "राज्य चुनकर नाम खोजें",
        detailHi:
          "राज्य व जिला चुनकर आधार नंबर, राशन कार्ड नंबर या फैमिली ID से परिवार खोजें।",
        link: null,
        tool: null,
      },
      {
        titleHi: "e-KYC पूरी करें",
        detailHi:
          "आधार OTP से e-KYC करें (70+ मार्ग में यही मुख्य प्रक्रिया है) और पोर्टल पर दिखे विवरण सत्यापित करें।",
        link: null,
        tool: "/sarkari/photo-resizer",
      },
      {
        titleHi: "आवेदन सबमिट करें",
        detailHi:
          "सभी विवरण जांचकर आवेदन सबमिट करें — स्वीकृति के बाद डिजिटल आयुष्मान कार्ड तैयार हो जाता है।",
        link: null,
        tool: null,
      },
      {
        titleHi: "ई-कार्ड PDF डाउनलोड करें",
        detailHi:
          "पोर्टल से आयुष्मान ई-कार्ड PDF में डाउनलोड करें — सूचीबद्ध अस्पतालों में कैशलेस इलाज हेतु मान्य।",
        link: "https://beneficiary.nha.gov.in/",
        tool: null,
      },
      {
        titleHi: "ऑफलाइन विकल्प भी उपलब्ध",
        detailHi:
          "ऑनलाइन न हो पाए तो नज़दीकी CSC केंद्र या सूचीबद्ध अस्पताल के आयुष्मान मित्र डेस्क पर आधार (और लागू हो तो राशन कार्ड) लेकर जाएं; हेल्पलाइन 14555 पर भी मदद मिलती है।",
        link: null,
        tool: null,
      },
    ],
    applyLink: "https://beneficiary.nha.gov.in/",
    deadlineHi: null,
    deadlineDate: null,
    feeHi: null,
    relatedTools: ["/sarkari/photo-resizer", "/sarkari/image-compressor"],
  },
];

export const getWorkflow = (slug) => WORKFLOWS.find((w) => w.slug === slug);

export const getAllSlugs = () => WORKFLOWS.map((w) => w.slug);
