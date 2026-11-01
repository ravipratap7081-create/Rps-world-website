"use client";
import { useRef, useState } from "react";
import ToolPage from "../../../components/tools/ToolPage";
import FileDrop from "../../../components/tools/FileDrop";
import { EXAM_PRESETS } from "../../../lib/exam-presets";
import {
  loadImageFromFile,
  compressToBand,
  drawToCanvas,
  downloadBlob,
  fmtSize,
} from "../../../lib/image-tools";

// One upload → process → download block for a single spec (photo / sign / thumb / declaration).
function SpecTool({ spec, label, fileName, strip, targetKB }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const urlRef = useRef(null);

  async function process(file) {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      let { img, url } = await loadImageFromFile(file);
      urlRef.current = url;

      // Optional name+date strip (UPSC-style): extend canvas with a white band.
      if (strip && strip.enabled && (strip.name || strip.date)) {
        const base = drawToCanvas(img, img.naturalWidth, img.naturalHeight, "contain");
        const stripH = Math.round(base.height * 0.14);
        const c = document.createElement("canvas");
        c.width = base.width;
        c.height = base.height + stripH;
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(base, 0, 0);
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.font = `bold ${Math.round(stripH * 0.38)}px sans-serif`;
        const txt = [strip.name, strip.date].filter(Boolean).join("   ");
        ctx.fillText(txt, c.width / 2, base.height + stripH * 0.68);
        const dataUrl = c.toDataURL("image/jpeg", 0.95);
        img = await new Promise((res, rej) => {
          const i2 = new Image();
          i2.onload = () => res(i2);
          i2.onerror = rej;
          i2.src = dataUrl;
        });
      }

      const outW = spec.w || Math.min(img.naturalWidth, 1200);
      const outH =
        spec.h ||
        Math.round((outW / img.naturalWidth) * img.naturalHeight);
      const maxKB = spec.maxKB || targetKB || 50;
      const minKB = spec.minKB || 0;
      const out = await compressToBand(img, { outW, outH, minKB, maxKB });
      if (!out) {
        setError(
          "Is size me fit nahi ho paya — dusri (halki) photo try karo, ya photo ko pehle crop karke bhejo."
        );
        return;
      }
      const kb = out.blob.size / 1024;
      setResult({
        blob: out.blob,
        url: URL.createObjectURL(out.blob),
        kb,
        w: out.width,
        h: out.height,
        belowMin: minKB > 0 && kb < minKB,
        minKB,
        maxKB,
      });
    } catch (e) {
      setError(e.message || "Kuch galat ho gaya — dobara try karo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pu-card p-4 mb-4">
      <p className="font-bold text-[15px] text-mist-100 mb-1">{label}</p>
      <p className="text-[12px] text-mist-500 mb-3">
        {spec.w && spec.h ? `${spec.w} × ${spec.h} px` : "Portal px fix nahi deta — size KB band se ready hoga"}
        {spec.minKB || spec.maxKB
          ? ` • ${spec.minKB ? spec.minKB + "–" : ""}${spec.maxKB || ""} KB`
          : ""}
        {spec.bg ? ` • Background: ${spec.bg}` : ""}
      </p>
      <FileDrop
        accept="image/*"
        icon="🖼️"
        title={busy ? "Ready ho raha hai…" : "Photo / image select karo"}
        hint="JPG / PNG — gallery ya camera se"
        onFile={process}
      />
      {error && (
        <p className="mt-3 text-[13px] text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
          {error}
        </p>
      )}
      {result && (
        <div className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.url}
            alt={label}
            className="rounded-xl max-h-56 mx-auto border border-white/10 bg-white"
          />
          <p className="text-center text-[13px] mt-3 text-emerald-300 font-semibold">
            Ready: {fmtSize(result.blob.size)} • {result.w} × {result.h} px
          </p>
          {result.belowMin ? (
            <p className="text-center text-[12px] mt-1 text-amber-300">
              ⚠️ Portal minimum {result.minKB} KB maangta hai, output{" "}
              {result.kb.toFixed(1)} KB hai — reject ho sakta hai. Thodi
              zyada detail wali photo try karo.
            </p>
          ) : (
            <p className="text-center text-[12px] mt-1 text-mist-500">
              Size band ke andar hai ✓ (max {result.maxKB} KB)
            </p>
          )}
          <button
            onClick={() => downloadBlob(result.blob, fileName)}
            className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px] mt-3"
          >
            ⬇️ Download {label}
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExamPhotoSignature() {
  const [presetId, setPresetId] = useState("up-police");
  const [stripOn, setStripOn] = useState(false);
  const [stripName, setStripName] = useState("");
  const [stripDate, setStripDate] = useState("");
  const [targetKB, setTargetKB] = useState(50);
  const preset = EXAM_PRESETS.find((p) => p.id === presetId) || EXAM_PRESETS[0];
  const photoLive = preset.photo && !preset.photo.w && !preset.photo.minKB && !preset.photo.maxKB;

  return (
    <ToolPage
      title="🪪 Exam Photo–Signature Maker"
      sub="Exam chuno — photo aur signature exact portal size (px + KB) me ready. Specs official notifications se liye gaye hain."
    >
      <div className="grid grid-cols-2 gap-2 mb-4">
        {EXAM_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPresetId(p.id)}
            className={`pu-press py-3 px-3 rounded-xl text-[13px] font-bold border text-left ${
              p.id === presetId
                ? "bg-gold text-ink-950 border-gold"
                : "bg-white/5 border-white/10 text-mist-200"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {!preset.verified && (
        <p className="text-[13px] text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2 mb-4">
          ⚠️ Ye preset official source se fully verify nahi hai — final spec
          apne form ke notification se zaroor confirm karein.
        </p>
      )}

      <div className="pu-card p-4 mb-4">
        <p className="font-bold text-[14px] text-mist-100 mb-2">📌 {preset.name} — zaroori baatein</p>
        <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-mist-300 leading-snug">
          {preset.extras.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <p className="text-[12px] text-mist-500 mt-3">{preset.note}</p>
        <p className="text-[11px] text-mist-600 mt-2">
          Sources: {preset.sources.map((s) => s.replace(/^https?:\/\//, "").split("/")[0]).join(", ")} •
          Last checked: {preset.lastChecked || "2026-10-20"} — specs badal sakte
          hain, upload se pehle apne saal ke notification se zaroor milao;
          notification hi final hai.
        </p>
      </div>

      <div className="pu-card p-4 mb-4">
        <p className="text-[13px] text-mist-300 leading-snug">
          🔧 <b className="text-mist-100">Aapka exam ya size list me nahi hai, ya
          notification me alag size diya hai?</b> Koi preset zaroori nahi —{" "}
          <a href="/sarkari/image-compressor" className="text-amber-300 underline font-semibold">
            Image Compressor me apna custom KB target aur max width khud set karo
          </a>{" "}
          aur result ka size upload se pehle khud check karo.
        </p>
      </div>

      {photoLive ? (
        <div className="pu-card p-4 mb-4">
          <p className="font-bold text-[15px] text-mist-100 mb-1">📸 Photo — LIVE Capture</p>
          <p className="text-[13px] text-mist-300 leading-snug">
            Is exam me photo form bharte time <b>webcam / phone camera se LIVE</b>{" "}
            li jaati hai — pehle se bani photo upload nahi hoti. Achhi roshni,
            plain background rakho, cap/mask/glasses hata do. Neeche signature
            tool se signature ready kar sakte ho.
          </p>
        </div>
      ) : (
        <>
          {preset.dopStrip && (
            <div className="pu-card p-4 mb-4">
              <label className="flex items-center gap-2 text-[14px] font-semibold text-mist-100">
                <input
                  type="checkbox"
                  checked={stripOn}
                  onChange={(e) => setStripOn(e.target.checked)}
                  className="w-4 h-4 accent-yellow-400"
                />
                Photo par Naam + Date ki strip lagao (is exam me zaroori hai)
              </label>
              {stripOn && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <input
                    value={stripName}
                    onChange={(e) => setStripName(e.target.value)}
                    placeholder="Candidate ka naam"
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none"
                  />
                  <input
                    value={stripDate}
                    onChange={(e) => setStripDate(e.target.value)}
                    placeholder="Photo ki date (dd-mm-yyyy)"
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none"
                  />
                </div>
              )}
            </div>
          )}
          {!preset.photo.maxKB && (
            <div className="pu-card p-4 mb-4">
              <p className="text-[13px] text-mist-300 mb-2">
                Is size ke liye koi fixed KB limit nahi hai — apna target chuno:
              </p>
              <div className="flex gap-2">
                {[20, 50, 100, 200].map((kb) => (
                  <button
                    key={kb}
                    onClick={() => setTargetKB(kb)}
                    className={`pu-press flex-1 py-2 rounded-xl text-[13px] font-bold border ${
                      targetKB === kb
                        ? "bg-gold text-ink-950 border-gold"
                        : "bg-white/5 border-white/10 text-mist-200"
                    }`}
                  >
                    {kb} KB
                  </button>
                ))}
              </div>
            </div>
          )}
          <SpecTool
            key={"photo-" + preset.id + targetKB}
            spec={preset.photo}
            label="📸 Photo"
            fileName={`${preset.id}-photo.jpg`}
            targetKB={targetKB}
            strip={
              preset.dopStrip
                ? { enabled: stripOn, name: stripName, date: stripDate }
                : null
            }
          />
        </>
      )}

      {preset.sign && (preset.sign.w || preset.sign.minKB || preset.sign.maxKB) && (
        <SpecTool
          key={"sign-" + preset.id}
          spec={preset.sign}
          label="✍️ Signature"
          fileName={`${preset.id}-signature.jpg`}
        />
      )}
      {preset.thumb && (
        <SpecTool
          key={"thumb-" + preset.id}
          spec={preset.thumb}
          label="👍 Left Thumb Impression"
          fileName={`${preset.id}-thumb.jpg`}
        />
      )}
      {preset.declaration && (
        <SpecTool
          key={"decl-" + preset.id}
          spec={preset.declaration}
          label="📝 Handwritten Declaration"
          fileName={`${preset.id}-declaration.jpg`}
        />
      )}

      <p className="text-[12px] text-mist-500 leading-snug">
        💡 Signature ke liye: safed kagaz par kaale pen se sign karke uski
        saaf photo khicho, phir yahan upload karo. Har exam ka notification
        alag ho sakta hai — apply karne se pehle final size official
        notification se confirm karein.
      </p>
    </ToolPage>
  );
}
