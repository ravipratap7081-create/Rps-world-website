"use client";
import { useRef, useState } from "react";
import ToolPage from "../../../components/tools/ToolPage";
import FileDrop from "../../../components/tools/FileDrop";
import {
  loadImageFromFile,
  fmtSize,
  downloadBlob,
  canvasToBlob,
  drawToCanvas,
  compressToBand,
  fireToolComplete,
} from "../../../lib/image-tools";

function computeDims(img, maxWidth) {
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!maxWidth || nw <= maxWidth) return { w: nw, h: nh };
  const s = maxWidth / nw;
  return { w: Math.round(nw * s), h: Math.max(1, Math.round(nh * s)) };
}

export default function Tool() {
  const imgRef = useRef(null);
  const resultUrlRef = useRef(null);

  const [meta, setMeta] = useState(null); // { name, size, previewUrl }
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(0); // 0 = Original
  const [target, setTarget] = useState(0); // 0 = koi target nahi, else KB
  const [result, setResult] = useState(null); // { blob, url, size, w, h, achieved }
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function compressWith(img, { q, mw, tg }) {
    setBusy(true);
    setError("");
    try {
      const { w, h } = computeDims(img, mw);
      let blob = null;
      let outW = w;
      let outH = h;
      let achieved = true;

      if (tg > 0) {
        const res = await compressToBand(img, {
          outW: w,
          outH: h,
          maxKB: tg,
          minKB: 0,
          mode: "contain",
        });
        if (res && res.blob) {
          blob = res.blob;
          outW = res.width;
          outH = res.height;
        } else {
          // Sabse chhoti koshish bhi target se badi rahi — sabse halka
          // version bana ke do, aur sach-sach batao target pura nahi hua.
          const c = drawToCanvas(img, w, h, "contain");
          blob = await canvasToBlob(c, "image/jpeg", 0.1);
          achieved = false;
        }
      } else {
        const c = drawToCanvas(img, w, h, "contain");
        blob = await canvasToBlob(c, "image/jpeg", q / 100);
      }

      if (!blob) throw new Error("Compress nahi ho paya — dusri photo try karo.");

      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResult({ blob, url, size: blob.size, w: outW, h: outH, achieved, target: tg });
    } catch (e) {
      setError(e?.message || "Kuch gadbad ho gayi — photo dobara try karo.");
    } finally {
      setBusy(false);
    }
  }

  async function onFile(file) {
    setError("");
    setResult(null);
    try {
      const { img, url } = await loadImageFromFile(file);
      imgRef.current = img;
      setMeta({ name: file.name, size: file.size, previewUrl: url });
      // Pehli baar default settings se auto-compress
      compressWith(img, { q: 80, mw: 0, tg: 0 });
    } catch (e) {
      setError(e?.message || "Photo load nahi ho payi — JPG/PNG photo try karo.");
    }
  }

  function onCompressClick() {
    if (!imgRef.current) return;
    compressWith(imgRef.current, { q: quality, mw: maxWidth, tg: target });
  }

  function reset() {
    imgRef.current = null;
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    resultUrlRef.current = null;
    if (meta?.previewUrl) URL.revokeObjectURL(meta.previewUrl);
    setMeta(null);
    setResult(null);
    setError("");
    setQuality(80);
    setMaxWidth(0);
    setTarget(0);
  }

  const pct =
    result && meta ? Math.round((1 - result.size / meta.size) * 100) : 0;

  return (
    <ToolPage
      title="🗜️ Image Compressor"
      sub="Photo ka size KB me kam karo — quality aur target size tumhare haath me. Sarkari form, WhatsApp, kahin bhi use karo."
    >
      {!meta && (
        <FileDrop
          accept="image/*"
          onFile={onFile}
          icon="🖼️"
          title="Photo select karo"
          hint="JPG / PNG — tap karke gallery se photo chuno"
        />
      )}

      {error && (
        <div className="pu-card p-4 mt-4" style={{ borderColor: "rgba(248,113,113,0.4)" }}>
          <p className="text-[13px] font-semibold text-red-300">{error}</p>
        </div>
      )}

      {meta && (
        <>
          <div className="pu-card p-4">
            <img
              src={meta.previewUrl}
              alt="Original photo"
              className="w-full max-h-64 object-contain rounded-xl bg-black/30"
            />
            <p className="text-[13px] text-mist-300 mt-3 font-semibold truncate">{meta.name}</p>
            <p className="text-[12px] text-mist-500 mt-0.5">
              Original size: <span className="text-mist-200 font-bold">{fmtSize(meta.size)}</span>
              {imgRef.current &&
                ` • ${imgRef.current.naturalWidth}×${imgRef.current.naturalHeight}px`}
            </p>
          </div>

          <div className="pu-card p-4 mt-4 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-bold text-mist-200">Quality</label>
                <span className="text-[13px] font-extrabold text-gold">{quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={1}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-[#F5B301]"
                disabled={target > 0}
              />
              <p className="text-[11px] text-mist-500 mt-1">
                {target > 0
                  ? "Target size set hai — quality auto adjust hogi."
                  : "Zyada quality = saaf photo, bada size. Kam quality = halki photo."}
              </p>
            </div>

            <div>
              <label className="text-[13px] font-bold text-mist-200 block mb-2">Max width</label>
              <select
                className="pu-input"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
              >
                <option value={0}>Original (jaise hai waisi)</option>
                <option value={1920}>1920 px</option>
                <option value={1280}>1280 px</option>
                <option value={800}>800 px</option>
              </select>
            </div>

            <div>
              <label className="text-[13px] font-bold text-mist-200 block mb-2">Target size</label>
              <select
                className="pu-input"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
              >
                <option value={0}>Koi target nahi</option>
                <option value={50}>50 KB ke andar</option>
                <option value={100}>100 KB ke andar</option>
                <option value={200}>200 KB ke andar</option>
              </select>
              <p className="text-[11px] text-mist-500 mt-1">
                Output format: JPEG (sab jagah chalta hai, sabse halka).
              </p>
            </div>

            <button
              type="button"
              onClick={onCompressClick}
              disabled={busy}
              className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px]"
            >
              {busy ? "Compress ho raha hai…" : "🗜️ Compress karo"}
            </button>
          </div>
        </>
      )}

      {result && meta && (
        <div className="pu-card p-4 mt-4">
          <p className="text-[13px] font-bold text-emerald-300 mb-3">✅ Compress ho gaya!</p>
          <img
            src={result.url}
            alt="Compressed photo"
            className="w-full max-h-64 object-contain rounded-xl bg-black/30"
          />
          <p className="text-[14px] font-extrabold text-mist-100 mt-3">
            Original: {fmtSize(meta.size)} → New: {fmtSize(result.size)}{" "}
            {pct >= 0 ? (
              <span className="text-emerald-300">({pct}% kam)</span>
            ) : (
              <span className="text-amber-300">({Math.abs(pct)}% zyada — quality kam karke try karo)</span>
            )}
          </p>
          <p className="text-[12px] text-mist-500 mt-1">
            New size: {result.w}×{result.h}px • JPEG
          </p>
          {result.target > 0 && result.achieved && (
            <p className="text-[12px] text-emerald-300 mt-1 font-semibold">
              🎯 Target ({result.target} KB) ke andar aa gaya.
            </p>
          )}
          {result.target > 0 && !result.achieved && (
            <p className="text-[12px] text-amber-300 mt-1 font-semibold">
              ⚠️ Sach ye hai: {result.target} KB target pura nahi ho paya — ye sabse halka
              version hai jo ban paya ({fmtSize(result.size)}). Max width 800px karke dobara
              try karo, size aur kam hoga.
            </p>
          )}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => { fireToolComplete("image_compressor"); downloadBlob(result.blob, "compressed-image.jpg"); }}
              className="pu-btn-primary pu-press flex-1 py-3.5 rounded-2xl font-extrabold text-[15px]"
            >
              ⬇️ Download karo
            </button>
            <button
              type="button"
              onClick={reset}
              className="pu-btn-ghost pu-press px-5 rounded-2xl font-bold text-[14px]"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      )}
    </ToolPage>
  );
}
