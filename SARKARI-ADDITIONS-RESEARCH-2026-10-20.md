# Sarkari Section — Kya ADD Karein? (Research, 2026-10-20)

**Sawaal:** RPS World /sarkari section (abhi 9 tools: Photo Resizer, PDF Compressor, Scheme Finder, Document Vault, Sarkari Links, Image Compressor, Signature Maker, Diwali Card Maker, Pro Universe Pro) me kya naya add ho sakta hai?
**Audience:** Tier-2/3 phone users (Kanpur/UP focus) jo sarkari form bhar rahe hain. Owner ka rule: ek tool = ek saaf dard, browser me 100% client-side jahan ho sake, free tools pe login nahi.

---

## Demand ke saboot (search se, 20 Oct 2026)

1. **Exam photo/signature exact-spec tools ka poora bazaar hai** — photokb.in, naukriphoto.in, formmate.in, sizefix.in, resizewala.in, easyjoinimage.in jaisi sites SIRF isi ek kaam pe chal rahi hain. Matlab search demand bahut bada hai, aur ye sites proof hain ki log roz "photo 20KB karna hai", "signature resize SSC" dhoondhte hain.
2. **Har portal ka spec ALAG hai** (px + KB ka MIN–MAX band, sirf max nahi):
   - SSC: photo 200×230px (kuchh cycles me 350×450), 20–50KB; signature 140×60, 10–20KB; **photo pe naam + date (DOP) strip bhi chahiye**
   - UPSC: 350×350 min, 20–300KB | IBPS/SBI: 200×230, 20–50KB; sign 140×60, 10–20KB; **+ left thumb impression aur handwritten declaration**
   - Railway RRB: 35×45mm, 30–70KB | NTA (NEET/JEE): photo 10–200KB (face 80%, white BG), sign 4–30KB, **postcard photo bhi**
   - UP Police / State PSC: photo 20–50KB; **UP Police aur kai state PSC me photo+signature ki JOINT sheet <50KB**
   - PAN (NSDL): photo 213×213, sign 400×200, max 50KB | DL (Sarathi): max 20KB | Ayushman photo: max 50KB
   - Signature kabhi-kabhi MINIMUM KB se neeche hone pe bhi reject hota hai (saaf sign 2–3KB ban jata hai) — achhe tools dono taraf handle karte hain.
3. **Form reject hone ki sabse badi wajahen:** galat size/dimension, dark/busy background (white/light BG compulsory), face photo ka 70–80% se kam hona, galat format (JPG ki jagah PNG/PDF). (UptoDate24x ki "5 Common Mistakes" list.)
4. **"Status check kaise karein" ek alag hi search-shailey hai** — Ayushman card status (beneficiary.nha.gov.in; Approved/Pending/Rejected ka matlab samjhane wali darjanon sites), Voter ID status + e-EPIC download steps, PM-Kisan/e-Shram status, PAN–Aadhaar link status — log official portal se zyada guide sites pe pehle aate hain kyunki portal unhe samajh nahi aata.
5. **Portal JPG nahi leta, PDF maangta hai** — phone photo ko PDF me badalna + size cap (aksar 200KB) ke andar rakhna roz ka kaam hai (sarkariresult.tools ka img2pdf tool, Kaagaz jaise scanner apps isi pe bane hain).
6. **Fraud ka mahaul garam hai** — The Hindu (Oct 2026): voter verification ke naam pe fake links/WhatsApp se ₹11.92 lakh ki thagi. Log official link pehchan nahi paate — "asli link + kaise pehchano" wali bharose ki content ki asal value hai.

---

## Bucket A — Naye standalone tools

### A1. PDF → JPG Converter
- **Kya:** PDF ke pages ko JPG me badlo, portal ke size pe (KB target ke saath).
- **Kise:** Jiska certificate/marksheet PDF me hai par portal JPG maang raha hai (aur ulta bhi hota hai).
- **Fit:** Maujooda PDF Compressor ke saath jodi; document-prep ki chain poori hoti hai.
- **Client-side:** Haan (pdf.js canvas render). **Effort:** Medium.

### A2. JPG → PDF Maker (multi-photo, size target ke saath)
- **Kya:** Kai photo/scan ko ek PDF, aur output size slider se cap ke neeche (200KB/300KB presets).
- **Kise:** Har form-bharne wala — portal PDF maangta hai, phone photo deta hai. (Saboot: point 5 upar.)
- **Fit:** /sarkari ki sabse zyada use hone wali document aadat; Photo Resizer ke baad ka natural agla step.
- **Client-side:** Haan (canvas + jsPDF-type lib). **Effort:** Chhota–Medium.

### A3. Photo Background Changer (White/Light)
- **Kya:** Photo ka background safed/halla karke form-ready photo.
- **Kise:** Ghar pe khichi photo dark/deewar wale BG ke saath reject hoti hai — top rejection wajah (point 3).
- **Fit:** Photo Resizer ka missing saathi — pehle BG safed, phir exact size.
- **Client-side:** Haan, basic version (plain-ish BG pe threshold/flatten). Note: perfect cutout ke liye ML chahiye, basic version zyadaatar studio photos pe kaafi hai. **Effort:** Medium.

### A4. Age & Eligibility Calculator
- **Kya:** DOB daalo → exam/kaam ki cutoff date pe exact umar + eligible ho ya nahi (category-wise relaxation ke saath).
- **Kise:** Har exam candidate form bharne SE PEHLE yahi check karta hai; competitor resizer sites bhi is calculator ko saath jodti hain (generalknowledge.in).
- **Fit:** Chhota tool, har dusre tool ke saath cross-link hota hai.
- **Client-side:** Haan, 100%. **Effort:** Chhota.

### A5. Document Checklist Generator ("Is kaam ke liye kya-kya chahiye")
- **Kya:** Kaam chuno (Ayushman card / Voter correction / PAN correction / Ration card me naam / UP Police form / Passport) → exact document list + photo/sign spec + official link, ek saaf page.
- **Kise:** Jo aadhe document leke CSC ke chakkar kaatta hai.
- **Fit:** Section ke tools + links ko ek kahani me baandhta hai — user checklist se seedha Photo Resizer/Vault pe aata hai.
- **Client-side:** Haan (static data + simple UI). **Effort:** Chhota.

---

## Bucket B — Maujooda tools ke upgrades

### B1. ⭐ Photo Resizer + Signature Maker → "Exam Photo–Signature Maker" (presets ke saath)
- **Kya:** Dono tools me exam/portal PRESETS: SSC, UPSC, IBPS/SBI, Railway, NTA, UP Police, PAN, DL, Ayushman — preset chunte hi exact px + KB ka MIN–MAX band apne aap; custom mode bhi rahe.
- **Kise:** Sabse bada dard hi yahi hai (point 1–2). Generic "50KB kar do" kaafi nahi — portal min KB se neeche bhi reject karta hai.
- **Fit:** Ye upgrade nahi, section ki pehchan ban sakta hai; maujooda traffic seedha yahi dhoondh raha hai.
- **Client-side:** Haan (canvas binary-search compression — competitors yahi karte hain). **Effort:** Medium.

### B2. ⭐ Naam + Date Strip (DOP) aur Joint Photo–Signature Sheet
- **Kya:** (i) Photo ke neeche naam + photo ki date ki strip (SSC ki shart), (ii) Photo upar + signature neeche wali ek joint sheet <50KB (UP Police/State PSC format).
- **Kise:** SSC aur UP Police ke candidates — UP audience ke liye ye do feature hi kaaran ban sakte hain site chunne ka.
- **Fit:** B1 ke upar chhota add-on; koi dusri badi site itni UP-focused nahi hai.
- **Client-side:** Haan (canvas compose). **Effort:** Chhota.

### B3. Sarkari Links → "Status Check Hub"
- **Kya:** Har bade kaam ke liye alag block: **Status check karo** (direct official deep link) + **Download karo** + **Documents chahiye** — Ayushman, Voter ID/e-EPIC, PM-Kisan, e-Shram, PAN–Aadhaar link status, DL/RC, e-Challan, Ration Card.
- **Kise:** "Status kaise check karein" wali poori search bheed (point 4) — log portal pe jaane se pehle humari page pe aayenge.
- **Fit:** Sirf links ki list se "kaam karwane wala page" banta hai; koi data hum nahi lete, seedha official portal khulta hai = surakshit + bharosa.
- **Client-side:** N/A (content + links). **Effort:** Chhota.

### B4. Scheme Finder → Eligibility Quiz
- **Kya:** 4–5 sawaal (umar, aay, pesha, state) → kaunsi yojana pe fit ho, official link ke saath.
- **Kise:** Jise yojana ka naam hi nahi pata, sirf apni sthiti pata hai.
- **Fit:** Finder ko list se "jawab dene wala" banata hai; Kanpur/UP ki yojanaen pehle.
- **Client-side:** Haan (rule-based, static data). **Effort:** Medium.

### B5. Document Vault → Phase 2: Client-Side (End-to-End) Encryption
- **Kya:** Documents user ke password se USKE phone pe hi encrypt hon — server ko sirf band dabba mile. Abhi page khud chetaavni deta hai "Aadhaar/PAN abhi upload na karo" — Phase 2 ke baad ye chetaavni sach me hat sakti hai.
- **Kise:** Vault ko asal me istemal karne wala har user; bharose ka sabse bada feature.
- **Fit:** Pure section me kisi ke paas nahi hai; "tumhara Aadhaar hum dekh hi nahi sakte" = sabse badi trust line.
- **Client-side:** Encryption client-side; storage server pe encrypted blob. **Effort:** Bada (savdhaani se; password bhoolna = data gaya, ye saaf likhna padega).

### B6. Signature Maker → Ink saaf + Thumb Impression preset
- **Kya:** Photo khiche signature ka BG saaf karke ink ghana karna (blue/black auto), + bank forms ke liye Left Thumb Impression aur Handwritten Declaration ke presets B1 ke saath.
- **Client-side:** Haan (canvas filters). **Effort:** Chhota–Medium.

---

## Bucket C — Bharosa / Traffic features

### C1. Top-5 Sarkari Kaam ki Step-by-Step Hindi Guides
- **Kya:** Har guide ek page: (1) Ayushman card banana/status, (2) Voter ID sudhaar + e-EPIC download, (3) PAN correction, (4) Ration card me naam jodna, (5) UP Police form ke liye photo tayyar karna. Har guide me: documents list, official link, aur humare tool ka link jahan zaroorat pade.
- **Kise/kyun:** Search ki bheed pehle guide pe aati hai, tool baad me (point 4, 6). Yahi section ka traffic engine bange.
- **Effort:** Medium (content likhna hai, code na ke barabar).

### C2. Hindi-first UI Toggle (पूरा section Hindi me)
- **Kya:** Ek toggle — poora /sarkari Hindi (Devanagari) me. Default Hinglish ki jagah user chun sake.
- **Kise:** Asli audience Hindi me sochta hai; "sab jagah le jata" wali saral bhasha hi is section ki taakat hai.
- **Effort:** Medium (sab labels ka translation ek baar).

### C3. Result ka WhatsApp Share + "Form Pack" download
- **Kya:** Tool ka result (ready photo/sign/PDF) ek tap pe WhatsApp pe khud ko ya dukaan/CSC wale ko bhejo; aur form ke saare files (photo + sign + docs) ek saath "Form Pack" ke roop me.
- **Kise:** Phone-user ka asil workflow WhatsApp hi hai — file gallery me kho jati hai.
- **Client-side:** Haan (Web Share API). **Effort:** Chhota.

### C4. "Asli Link Pehchano" trust strip har guide/links page pe
- **Kya:** Har official link ke paas ek line: asli site ka address kaisa dikhta hai (.gov.in/.nic.in), OTP/paise koi maange to ruk jao — fraud se bachav (point 6).
- **Effort:** Chhota. Bharosa = is section ka brand.

---

## 🏆 RANKED TOP 10 (demand × fit × kam effort)

| # | Proposal | Ek line me kyun |
|---|----------|---|
| 1 | **B1 — Exam Photo–Signature Maker (portal presets, min–max KB)** | Sabse badi proven search demand isi ki hai; poori sites sirf ispe chalti hain — aur humare 2 tools pehle se aadhe ready hain. |
| 2 | **B2 — Naam+Date strip & Joint Photo-Sign Sheet** | SSC/UP Police ki khaas shartein; UP audience ke liye koi bada competitor itna focused nahi — chhote effort me alag pehchan. |
| 3 | **B3 — Sarkari Links → Status Check Hub** | "Status check" wali vishaal search bheed ko pakadta hai bina koi data liye — sirf content + official deep links, sabse surakshit bada jeet. |
| 4 | **A2 — JPG→PDF Maker (size target ke saath)** | Portal PDF maangta hai, phone photo deta hai — roz ka kaam, client-side aasan. |
| 5 | **A5 — Document Checklist Generator** | Aadhe document pe CSC ke chakkar khatam; section ke saare tools ko ek jagah baandhta hai, build na ke barabar. |
| 6 | **A3 — Photo Background Changer (White)** | Form reject ki #1 wajah hi background hai; resizer se pehle ka missing step. |
| 7 | **A4 — Age & Eligibility Calculator** | 5-minute ka tool jo har form se pehle khulta hai; har page se cross-link = poora section ghoomta hai. |
| 8 | **C1 — Top-5 Hindi Step-by-Step Guides** | Traffic ka engine: log guide dhoondhte aate hain, tool istemal karke jaate hain. |
| 9 | **A1 — PDF→JPG Converter** | A2 ka ulta raasta bhi portal maangta hai; document chain dono taraf se poori. |
| 10 | **B5 — Vault Phase 2 (Client-Side Encryption)** | Effort bada hai par ye ekmatra feature hai jo section ko "bharose wala ghar" banata hai — Aadhaar-class documents ke liye asal unlock. |

*Honourable mentions:* C2 Hindi toggle (Top-10 ke bilkul peeche — bada kaam, par audience-fit sabse zyada), C3 WhatsApp share (har tool me lagne wala chhota feature), B4 Scheme Finder quiz, B6 thumb-impression presets (B1 ke saath hi ghus jayenge).

---

## 🚫 Kya NA add karein (3)

1. **Aadhaar/PAN number daalke status/result dene wala koi bhi feature.** Official portals OTP/biometric se chalte hain; beech me hum number lenge to (a) DPDP/privacy ka khatra, (b) bilkul wahi pattern jo fraud wale use karte hain (Oct 2026 ki voter-scam khabar). Hamesha official portal ka deep link do — number kabhi humare paas nahi.
2. **PVC card print / "card download" ki asal service** (e-PAN download, Ayushman card issue, Voter PVC). Ye CSC-license + official OTP flows ka kaam hai; client-side ho hi nahi sakta. Jhootha button lagana = bharosa khatam. Guide + link hi sahi rasta hai.
3. **Duplicate generic PDF Merge/Split suite aur paid-API wale tools (AI background-removal/OCR APIs).** Merge/split ProTools PDF site pe pehle se hai — yahan dohrao mat; aur jis tool ki lagat (API kharcha) hai par aamdani zero, wo free section ko kha jayega. Haath se form-bharne ki service bhi free tools me NAHI — wo Site48 ki alag, paid gali hai; dono ko milana dono ko bigadega.

---

## Note on sources
Demand ke daave upar ke searches se hain (competitor tool sites photokb.in, naukriphoto.in, formmate.in, sizefix.in, resizewala.in; portal spec tables; Ayushman/Voter status-guide sites; The Hindu ki fraud report). Spec numbers notifications ke hisaab se badalte hain — koi preset live karne se pehle us cycle ki official notification se verify karna zaroori hai. Ranking meri recommendation hai (demand × fit × effort pe), tathya nahi.
