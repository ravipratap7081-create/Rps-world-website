// Exam / portal photo & signature presets — researched 2026-10-20.
// Sources: official notifications / official upload-instruction PDFs where
// available, cross-checked against multiple credible secondary sources.
// px conversions: mm -> px at 300 DPI (px = mm / 25.4 * 300), rounded.
// Fields that could not be confirmed are null — do NOT guess them in UI;
// show the preset `note` to the user instead.

export const EXAM_PRESETS = [
  {
    id: 'ssc',
    name: 'SSC (CGL / CHSL)',
    photo: {
      // SSC CGL/CHSL 2025 & 2026: NO photo upload — the portal captures a
      // LIVE photograph via webcam / mySSC app during form filling.
      w: null,
      h: null,
      minKB: null,
      maxKB: null,
      format: 'jpg',
      bg: 'plain / light (live capture)',
    },
    sign: { w: 709, h: 236, minKB: 10, maxKB: 20 },
    dopStrip: false,
    jointSheet: false,
    extras: [
      'Live photo capture is mandatory for CGL/CHSL — no pre-taken photo upload; sit in good light, plain background, no cap / mask / glasses.',
      'Signature: 6.0 cm x 2.0 cm, black ink, clear & legible — blurred signatures are rejected.',
      'Older SSC exams / SSC GD Constable 2026 still use an uploaded photo: 3.5 cm x 4.5 cm (413x531 px @300 DPI), 20-50 KB, JPG, not older than 3 months, with the date of photo printed on it — check your exam notification.',
      'Historically SSC required the candidate name + date of photo (DOP) printed on the photograph; the live-capture system for CGL/CHSL has replaced that upload, so dopStrip is false for the current CGL/CHSL cycle.',
    ],
    verified: true,
    sources: [
      'https://ssc.gov.in',
      'https://testbook.com/amp/ssc-cgl-exam/apply-online',
      'https://entri.app/blog/ssc-cgl-apply-online/',
      'https://thattoolsite.com/guides/photo-and-signature-size-for-exams',
      'https://testbook.com/news/ssc-gd-signature-photo-size/',
    ],
    note: 'Signature 6.0 cm x 2.0 cm converted at 300 DPI = 709x236 px. Photo is LIVE capture in current CGL/CHSL — koi fixed px/KB upload spec nahi hai. Official notification se verify karein.',
  },
  {
    id: 'upsc',
    name: 'UPSC (Civil Services)',
    photo: {
      // Official UPSC upload-instruction PDF gives KB + JPG only, no px.
      w: null,
      h: null,
      minKB: 20,
      maxKB: 200,
      format: 'jpg',
      bg: 'plain white',
    },
    // Triple signature: sign 3 times vertically in ONE image.
    // Official PDF wording: "Image dimensions: 350 - 500 pixels" (no WxH split).
    sign: { w: null, h: null, minKB: 20, maxKB: 100 },
    dopStrip: true,
    jointSheet: false,
    extras: [
      'Name of candidate AND date on which the photo was taken must be clearly mentioned on the photograph (CSE 2025 notification).',
      'Photo must not be more than 10 days old from the start of the online application process; face must occupy 3/4th (75%) of the photo, both ear lobes visible.',
      'A LIVE photograph capture is also mandatory during the application and is matched against the uploaded photo — mismatch stops the application.',
      'TRIPLE SIGNATURE: sign 3 times vertically (one below the other) in black ink on plain white paper, scan all three in a single JPG named "signature", 20-100 KB, dimension 350-500 pixels.',
      'Photo ID (PDF, 20-300 KB in CSE 2025 form) is uploaded separately.',
    ],
    verified: true,
    sources: [
      'https://upsconline.nic.in/caf/assets/PDF/instruction-photo-signature-upload-upsc.pdf',
      'https://indianexpress.com/article/education/upsc-cse-2025-vacancies-announced-civil-services-this-year-changes-this-year-9792556/',
      'https://www.indiatvnews.com/amp/jobs/news/upsc-cse-2025-notification-released-for-979-vacancies-here-are-important-dates-vacancy-break-up-easy-steps-to-apply-online-exam-date-and-more-2025-01-22-972533',
    ],
    note: 'Official UPSC PDF (upsconline.nic.in) se: photo JPG 20-200 KB, plain white background, 75% face coverage; signature (triple) JPG 20-100 KB, 350-500 px. CSE 2025 ke kuch secondary sources 20-300 KB bolte hain — official notification se verify karein.',
  },
  {
    id: 'up-police',
    name: 'UP Police (UPPRPB)',
    photo: { w: 413, h: 531, minKB: 20, maxKB: 50, format: 'jpg', bg: 'white / light' },
    sign: { w: 413, h: 177, minKB: 5, maxKB: 20 },
    dopStrip: false,
    jointSheet: false,
    extras: [
      'Photo: 35 mm x 45 mm colour passport photo, JPG/JPEG, 20-50 KB; face clearly visible (~70%+ of frame), no spectacles, no selfie.',
      'Signature: 3.5 cm x 1.5 cm, running hand, black ink on white paper, 5-20 KB (some summaries quote 5.4 KB minimum).',
      'Photo and signature are uploaded as SEPARATE files in UPPRPB constable/SI forms — joint single-file photo+signature sheet is NOT required (that pattern belongs to some other UP boards/portals).',
    ],
    verified: true,
    sources: [
      'https://uppbpb.gov.in',
      'https://www.shiksha.com/sarkari-exams/police/articles/documents-required-for-up-police-constable-online-form-blogId-148067',
      'https://examresize.online/blog/up-police-constable-photo-signature-guide-2026',
      'https://www.fastjobsearchers.com/up/upprpb-up-police-constable',
    ],
    note: 'Photo 35x45 mm aur signature 3.5x1.5 cm ko 300 DPI par convert kiya gaya hai (413x531 px aur 413x177 px). Official notification se verify karein.',
  },
  {
    id: 'rrb',
    name: 'Railway RRB (NTPC / Group D)',
    photo: {
      // CEN 06/2026 (latest NTPC Graduate): LIVE photo capture, no upload.
      w: null,
      h: null,
      minKB: null,
      maxKB: null,
      format: 'jpg',
      bg: 'plain white only (live capture)',
    },
    sign: { w: 140, h: 60, minKB: 30, maxKB: 49 },
    dopStrip: false,
    jointSheet: false,
    extras: [
      'Latest CEN 06/2026: photograph is captured LIVE (webcam / phone front camera) on plain white background, non-white (preferably dark) clothing, head at least 50% of frame, no cap / mask / spectacles. Photographing an existing printed/digital photo is rejected.',
      'Signature: JPG/JPEG, minimum 140x60 px, scanned at 100 DPI or more, black ink on white paper inside a 35 mm x 20 mm box, running handwriting — BLOCK / CAPITAL letters are rejected.',
      'Previous cycle CEN 06/2025 & 07/2025 (NTPC Graduate + UG) used UPLOADED images at 100 DPI: photo 35 mm x 45 mm (also quoted as 320x240 px), 30-70 KB; signature 50 mm x 20 mm (140x60 px), 30-70 KB — use these if your CEN is from 2025.',
    ],
    verified: true,
    sources: [
      'https://www.rrbapply.gov.in',
      'https://www.freejobalert.com/articles/rrb-ntpc-graduate-recruitment-062026-notification-apply-online-for-3-477-posts-3068511',
      'https://www.practicemock.com/blog/rrb-ntpc-notification-2026/amp/',
      'https://www.jagranjosh.com/articles/rrb-ntpc-apply-online-2025-begins-at-rrbcdg-gov-in-register-now-for-8868-graduate-and-ug-level-posts-lb-106200',
      'https://www.sscadda.com/rrb-ntpc-apply-online/',
    ],
    note: 'Latest CEN 06/2026 me photo LIVE capture hai (upload spec nahi); signature 140x60 px minimum, 30-49 KB. 2025 CENs me photo upload 35x45 mm, 30-70 KB tha. Official notification se verify karein.',
  },
  {
    id: 'ibps',
    name: 'Bank IBPS (PO / Clerk)',
    photo: { w: 200, h: 230, minKB: 20, maxKB: 50, format: 'jpg', bg: 'light / white' },
    sign: { w: 140, h: 60, minKB: 10, maxKB: 20 },
    // IBPS-only extra uploads (structured, in addition to `extras` strings):
    thumb: { w: 240, h: 240, minKB: 20, maxKB: 50, format: 'jpg', dpi: 200 },
    declaration: { w: 800, h: 400, minKB: 50, maxKB: 100, format: 'jpg', dpi: 200 },
    dopStrip: false,
    jointSheet: false,
    extras: [
      'LEFT THUMB IMPRESSION required: 240x240 px @200 DPI (3x3 cm), 20-50 KB, JPG, black or blue ink on white paper. If no left thumb, right thumb / other finger may be used with a note.',
      'HANDWRITTEN DECLARATION required: 800x400 px @200 DPI (10x5 cm), 50-100 KB, JPG, in ENGLISH in the candidate\'s own handwriting, black ink, NOT in capital letters. Text: "I, ______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required."',
      'Photo: 4.5 cm x 3.5 cm recent passport-style colour photo, 200x230 px preferred, light (preferably white) background.',
      'Signature: black ink on white paper; signatures in CAPITAL letters are NOT accepted.',
      'Recent IBPS cycles (e.g. Clerk 2025) also capture a LIVE photo during the form in addition to the uploaded photo.',
    ],
    verified: true,
    sources: [
      'https://www.ibps.in',
      'https://www.practicemock.com/blog/document-required-for-ibps-clerk-2025/',
      'https://www.practicemock.com/ibps-po/application-form',
      'https://quikbench.com/ibps-photo-signature-resizer.html',
    ],
    note: 'IBPS CRP guidelines (Annexure - Guidelines for scanning) ke px seedha notification se liye gaye hain: photo 200x230, sign 140x60, thumb 240x240, declaration 800x400. Official notification se verify karein.',
  },
  {
    id: 'pan',
    name: 'PAN Card Photo (portal upload)',
    photo: {
      // Audit fix 31 Oct 2026: PAN preset added from the research plan's
      // cited band only (<50 KB). No px spec is asserted here — PAN
      // upload specs vary by form, so px fields stay null on purpose.
      w: null,
      h: null,
      minKB: null,
      maxKB: 50,
      format: 'jpg',
      bg: 'plain / light',
    },
    sign: { w: null, h: null, minKB: null, maxKB: null },
    dopStrip: false,
    jointSheet: false,
    extras: [
      'PAN photo upload me aam taur par 50 KB se kam ki JPG maangi jati hai — exact size apne form ke upload instructions se verify karein, kyunki PAN ke liye ek fixed px spec nahi hai.',
      'Is preset ka target sirf 50 KB ke andar laana hai; photo ka aspect ratio original jaisa hi rakha jata hai.',
    ],
    verified: false,
    sources: [
      'https://www.resizeindia.pro/',
      'https://www.setimgkb.com/',
    ],
    note: 'PAN preset research plan ke cited <50 KB band se liya gaya hai; px spec assert nahi ki gayi hai. Apne form/notification se verify karein.',
  },
  {
    id: 'nta',
    name: 'NTA Exams (JEE / NEET photo)',
    photo: {
      // Audit fix 31 Oct 2026: NTA preset added from the research plan's
      // cited 10-200 KB band. px spec bulletin-wise badalti hai, isliye
      // px fields null rakhe gaye hain — KB band hi assert kiya gaya hai.
      w: null,
      h: null,
      minKB: 10,
      maxKB: 200,
      format: 'jpg',
      bg: 'plain / light',
    },
    sign: { w: null, h: null, minKB: null, maxKB: null },
    dopStrip: false,
    jointSheet: false,
    extras: [
      'NTA forms me photo aam taur par 10-200 KB ki JPG maangi jati hai — exact px/dimensions apne saal ke NTA information bulletin se verify karein.',
      'Is preset ka target 10-200 KB band ke andar laana hai.',
    ],
    verified: false,
    sources: [
      'https://www.resizeindia.pro/',
      'https://www.setimgkb.com/',
    ],
    note: 'NTA preset research plan ke cited 10-200 KB band se liya gaya hai; px spec assert nahi ki gayi hai. Apne bulletin se verify karein.',
  },
  {
    id: 'passport',
    name: 'Passport Size (Generic 3.5 x 4.5 cm)',
    photo: { w: 413, h: 531, minKB: null, maxKB: null, format: 'jpg', bg: 'white' },
    sign: { w: null, h: null, minKB: null, maxKB: null },
    dopStrip: false,
    jointSheet: false,
    extras: [
      'Generic Indian "passport size" = 35 mm x 45 mm (3.5 x 4.5 cm) = 413x531 px @300 DPI, plain white background, face ~70-80% of frame, both ears visible. This is the size most exam/ID forms mean by "passport size photo".',
      'No single official KB limit exists for the generic size — every portal sets its own (commonly 20-50 KB or 10-200 KB). Isiliye minKB/maxKB null rakhe gaye hain.',
      'Actual Indian PASSPORT (Passport Seva) is different: the booklet/OCI/e-Visa photo is 2x2 inch (51x51 mm) square in many official contexts, while Passport Seva digital upload is quoted as 630x810 px, JPG, up to 250 KB in some guidance — passport ke liye hamesha passportindia.gov.in ki current guidance dekhein.',
    ],
    verified: false,
    sources: [
      'https://www.passportindia.gov.in',
      'https://goodspace.ai/blogs/540662/passport-size-photo-dimensions-in-india-3545mm-complete-size-guide-in-mm-cm-inches-pixels',
      'https://Visafoto.com/india/passport-photo',
      'https://www.indianembassynetherlands.gov.in/page/basic-requirements-and-photo-specifications/',
    ],
    note: 'Generic 35x45 mm size 300 DPI par 413x531 px hai. KB limit form-wise badalti hai — Official notification se verify karein.',
  },
];
