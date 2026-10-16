// KaamPath shared metadata: sarkari tool labels + category icon/tint map.
// Static data only — no logic, safe to import from server or client components.

import {
  IconGraduationCap,
  IconFileText,
  IconReceipt,
  IconFingerprint,
  IconPill,
} from "../../../components/icons";

export const TOOL_META = {
  "/sarkari/photo-resizer": { label: "फोटो रिसाइज़र", emoji: "📸" },
  "/sarkari/image-compressor": { label: "इमेज कंप्रेसर", emoji: "🗜️" },
  "/sarkari/pdf-compressor": { label: "PDF कंप्रेसर", emoji: "📄" },
  "/sarkari/scheme-finder": { label: "स्कीम फाइंडर", emoji: "🎓" },
  "/sarkari/signature-maker": { label: "सिग्नेचर मेकर", emoji: "✍️" },
};

export const CATEGORY_META = {
  "शिक्षा": { icon: IconGraduationCap, tint: "rgba(245,179,1,0.12)" },
  "प्रमाण पत्र": { icon: IconFileText, tint: "rgba(96,165,250,0.12)" },
  "खाद्य व आपूर्ति": { icon: IconReceipt, tint: "rgba(52,211,153,0.12)" },
  "पहचान पत्र": { icon: IconFingerprint, tint: "rgba(168,85,247,0.12)" },
  "स्वास्थ्य": { icon: IconPill, tint: "rgba(248,113,113,0.12)" },
};
