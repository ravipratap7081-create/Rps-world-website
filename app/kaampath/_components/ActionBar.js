"use client";
import { useState } from "react";
import { IconShare, IconDownload, IconCalendar } from "../../../components/icons";

export default function ActionBar({ slug, titleHi, deadlineDate }) {
  const [copied, setCopied] = useState(false);

  const publicUrl = () =>
    `${window.location.origin}/kaampath/${slug}`;

  const share = async () => {
    // ALWAYS share the public workflow URL — never the user's private progress.
    const url = publicUrl();
    const data = {
      title: `KaamPath — ${titleHi}`,
      text: `सरकारी काम step-by-step: ${titleHi}`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (e) {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch (e) {}
    }
  };

  const print = () => window.print();

  const downloadIcs = () => {
    // .ics rule: only callable when deadlineDate is non-null (button stays hidden otherwise).
    if (!deadlineDate) return;
    const d = String(deadlineDate).replace(/-/g, "");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Pro Universe//KaamPath//HI",
      "BEGIN:VEVENT",
      `UID:kaampath-${slug}@pro-universe`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${d}`,
      `SUMMARY:KaamPath: ${titleHi} — अंतिम तिथि`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([lines], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `kaampath-${slug}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  return (
    <div className="kp-print-hide sticky bottom-4 z-10 mt-6">
      <div
        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl border border-white/12"
        style={{
          background: "rgba(10,14,23,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
        }}
      >
        <button
          onClick={share}
          className="pu-press flex items-center gap-1.5 text-[12.5px] font-bold text-mist-100 bg-white/8 border border-white/12 px-4 py-2.5 rounded-xl"
        >
          <IconShare size={15} />
          {copied ? "लिंक कॉपी हो गया ✓" : "शेयर करें"}
        </button>
        <button
          onClick={print}
          className="pu-press flex items-center gap-1.5 text-[12.5px] font-bold text-mist-100 bg-white/8 border border-white/12 px-4 py-2.5 rounded-xl"
        >
          <IconDownload size={15} />
          प्रिंट करें
        </button>
        {deadlineDate && (
          <button
            onClick={downloadIcs}
            className="pu-press flex items-center gap-1.5 text-[12.5px] font-bold text-ink-950 bg-gold px-4 py-2.5 rounded-xl"
          >
            <IconCalendar size={15} />
            कैलेंडर में जोड़ें
          </button>
        )}
      </div>
    </div>
  );
}
