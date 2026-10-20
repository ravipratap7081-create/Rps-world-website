"use client";
import { useEffect, useRef, useState } from "react";
import ToolPage from "../../../components/tools/ToolPage";
import FileDrop from "../../../components/tools/FileDrop";
import {
  loadImageFromFile,
  compressToBand,
  fmtSize,
  downloadBlob,
} from "../../../lib/image-tools";

const OUT_W = 413;
const OUT_H = 531;
const MIN_KB = 15;
const MAX_KB = 20;
const DOWNLOAD_NAME = "passport-photo-20kb.jpg";

export default function Tool() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const previewUrlRef = useRef(null);

  const clearPreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearPreview();
    };
  }, []);

  const reset = () => {
    clearPreview();
    setResult(null);
    setError("");
    setProcessing(false);
  };

  const handleFile = async (file) => {
    clearPreview();
    setResult(null);
    setError("");
    setProcessing(true);
    let srcUrl = null;
    try {
      const { img, url } = await loadImageFromFile(file);
      srcUrl = url;
      const out = await compressToBand(img, {
        outW: OUT_W,
        outH: OUT_H,
        minKB: MIN_KB,
        maxKB: MAX_KB,
        mode: "cover",
      });
      if (!out) {
        setError(
          "Ye photo 20KB ke andar fit nahi ho payi — photo bahut zyada detailed / badi hai. Dusri, thodi simple ya chhoti photo try karo, ya photo ko pehle crop karke dobara try karo."
        );
        return;
      }
      const previewUrl = URL.createObjectURL(out.blob);
      previewUrlRef.current = previewUrl;
      setResult({ ...out, previewUrl });
    } catch (e) {
      setError(
        e?.message ||
          "Photo process nahi ho payi — JPG/PNG photo try karo."
      );
    } finally {
      if (srcUrl) URL.revokeObjectURL(srcUrl);
      setProcessing(false);
    }
  };

  const kb = result ? result.blob.size / 1024 : 0;
  const inBand = result && kb >= MIN_KB && kb <= MAX_KB;

  return (
    <ToolPage
      title="Passport Photo Resizer — 20KB"
      sub="Passport size photo ko 20KB ke andar ready karo — form ke liye perfect."
    >
      {!result && !processing && (
        <FileDrop
          accept="image/*"
          onFile={handleFile}
          icon="📸"
          title="Photo select karo"
          hint="JPG / PNG photo chuno — auto resize + 20KB ke andar ready ho jayegi"
        />
      )}

      {processing && (
        <div className="pu-card p-4 text-center">
          <p className="text-[15px] font-bold text-mist-100">
            Photo ready ho rahi hai…
          </p>
          <p className="text-[12px] text-mist-400 mt-1">
            Size adjust ho raha hai, ek moment rukiye.
          </p>
        </div>
      )}

      {error && !processing && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 mt-4">
          <p className="text-[13px] leading-snug text-red-200">{error}</p>
          <button
            type="button"
            onClick={reset}
            className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px] mt-4"
          >
            Dusri photo choose karo
          </button>
        </div>
      )}

      {result && !processing && (
        <div className="pu-card p-4">
          <p className="text-[15px] font-extrabold text-mist-100 mb-3">
            Photo ready hai ✓
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.previewUrl}
            alt="Passport photo preview"
            className="mx-auto rounded-xl border border-white/10 max-w-[240px] w-full h-auto bg-white"
          />
          <div className="mt-4 space-y-1.5 text-[13px] text-mist-300">
            <p>
              Size:{" "}
              <span className="font-bold text-mist-100">
                {fmtSize(result.blob.size)}
              </span>
            </p>
            <p>
              Dimensions:{" "}
              <span className="font-bold text-mist-100">
                {result.width} × {result.height} px
              </span>
            </p>
            {inBand ? (
              <p className="text-emerald-300 font-semibold">
                Size: ~{kb.toFixed(1)} KB (20KB limit ke andar ✓)
              </p>
            ) : (
              <p>
                Final size {fmtSize(result.blob.size)} hai — ye 20KB limit
                ke andar hai, lekin 15–20KB band se neeche hai.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => downloadBlob(result.blob, DOWNLOAD_NAME)}
            className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px] mt-4"
          >
            Download karo — {DOWNLOAD_NAME}
          </button>
          <button
            type="button"
            onClick={reset}
            className="pu-btn-ghost pu-press w-full py-3.5 rounded-2xl font-bold text-[14px] mt-3"
          >
            Dusri photo choose karo
          </button>
        </div>
      )}

      {!result && !processing && !error && (
        <p className="text-[12px] text-mist-500 mt-4 leading-snug">
          Output: 413 × 531 px JPG (35×45mm @300dpi), target size 15–20KB.
          Photo centre se crop hogi — chehra beech me rakhein.
        </p>
      )}
    </ToolPage>
  );
}
