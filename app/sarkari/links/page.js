"use client";
import ModeShell from "../../../components/ModeShell";

const LINKS = [
  {
    category: "💰 PF / EPF",
    items: [
      { name: "EPFO Member Portal", desc: "PF balance, passbook, KYC", url: "https://www.epfo.gov.in" },
      { name: "PF Passbook", desc: "Download PF statement", url: "https://passbook.epfindia.gov.in/MemberPassBook/Login" },
      { name: "PF Claim / Withdrawal", desc: "Online PF withdrawal", url: "https://unifiedportal-mem.epfindia.gov.in/" },
    ],
  },
  {
    category: "🆔 Aadhaar",
    items: [
      { name: "myAadhaar Portal", desc: "Download, update, PVC order", url: "https://myaadhaar.uidai.gov.in/" },
      { name: "Aadhaar Services", desc: "All UIDAI services", url: "https://uidai.gov.in/" },
      { name: "Check Aadhaar Status", desc: "Enrolment / update status", url: "https://myaadhaar.uidai.gov.in/check-aadhaar-status" },
    ],
  },
  {
    category: "💳 PAN Card",
    items: [
      { name: "NSDL e-PAN", desc: "Apply / reprint PAN", url: "https://www.onlineservices.nsdl.com/" },
      { name: "UTIITSL PAN", desc: "PAN apply / correction", url: "https://www.pan.utiitsl.com/" },
      { name: "Instant e-PAN", desc: "Free instant PAN (Income Tax)", url: "https://www.incometax.gov.in/iec/foportal/" },
    ],
  },
  {
    category: "📋 Important Forms & Portals",
    items: [
      { name: "DigiLocker", desc: "Digital documents wallet", url: "https://www.digilocker.gov.in/" },
      { name: "JanSunwai (UP)", desc: "Complaints & grievances", url: "https://jansunwai.up.nic.in/" },
      { name: "e-District (UP)", desc: "Certificates: caste, income, domicile", url: "https://edistrict.up.gov.in/" },
      { name: "Voter Portal", desc: "Voter ID apply / check", url: "https://voters.eci.gov.in/" },
    ],
  },
];

export default function SarkariLinks() {
  return (
    <ModeShell mode="sarkari">
      <div className="pu-enter">
        <h1 className="text-2xl font-extrabold mb-1">
          🔗 <span className="pu-gradient-text">Sarkari Links</span>
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          PF, Aadhaar, PAN aur important portals — sab ek jagah
        </p>

        {LINKS.map((section, si) => (
          <div key={si} className="mb-6 pu-enter" style={{ animationDelay: `${si * 0.08}s` }}>
            <h2 className="text-base font-bold text-gold mb-3">{section.category}</h2>
            <div className="space-y-2.5">
              {section.items.map((link, li) => (
                <a
                  key={li}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pu-card pu-tile pu-press flex items-center justify-between p-4 no-underline"
                >
                  <div>
                    <p className="font-bold text-white text-[15px]">{link.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>
                  </div>
                  <span className="text-gold text-xl">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}

        <p className="text-[11px] text-gray-500 text-center mt-6 mb-4">
          ⚠️ Ye sab official government websites hain. Koi bhi OTP ya password kisi se share na karein.
        </p>
      </div>
    </ModeShell>
  );
}
