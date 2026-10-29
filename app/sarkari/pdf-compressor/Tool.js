"use client";
import { useState } from "react";
import ToolPage from "../../../components/tools/ToolPage";
import FileDrop from "../../../components/tools/FileDrop";
import ProCheck from "../../../components/tools/ProCheck";
import { loadPdfLib } from "../../../lib/load-pdf-lib";
import { fmtSize, fireToolComplete } from "../../../lib/image-tools";
import { FREE_PDF_MAX_MB, PRO_PDF_MAX_MB } from "../../../lib/pro";
const TARGETS = [100, 200, 300];
const ATTEMPTS = [
  { q: 0.72, s: 0.8 },
  { q: 0.55, s: 0.65 },
  { q: 0.45, s: 0.5 },
  { q: 0.35, s: 0.4 },
];

const ENGINE_FAIL_MSG =
  "PDF engine load nahi ho paya — net check karke dobara try karo";
const ENCRYPTED_MSG =
  "Ye PDF khul nahi payi (password-wali ya kharab PDF compress nahi hogi).";

function canvasToBlobPromise(canvas, q) {
  return new Promise((resolve) => {
    try {
      canvas.toBlob((b) => resolve(b), "image/jpeg", q);
    } catch {
      resolve(null);
    }
  });
}

export default function Tool() {
  const [fileName, setFileName] = useState("");
  const [originalBytes, setOriginalBytes] = useState(null); // Uint8Array
  const [originalSize, setOriginalSize] = useState(0);
  const [pageCount, setPageCount] = useState(null);
  const [targetKB, setTargetKB] = useState(200);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [isPro, setIsPro] = useState(false);
  // Enforced free limit: PDF over FREE_PDF_MAX_MB is refused for free
  // users; a server-verified Pro email lifts it to PRO_PDF_MAX_MB.
  // (Previously 25MB for everyone — that was the ungated state.)
  const maxMB = isPro ? PRO_PDF_MAX_MB : FREE_PDF_MAX_MB;
  const MAX_SIZE = maxMB * 1024 * 1024;

  async function getPdfLibOrThrow() {
    let PDFLib;
    try {
      PDFLib = await loadPdfLib();
    } catch {
      throw new Error(ENGINE_FAIL_MSG);
    }
    if (!PDFLib) throw new Error(ENGINE_FAIL_MSG);
    return PDFLib;
  }

  async function handleFile(file) {
    setError("");
    setResult(null);
    setProgress("");
    setPageCount(null);
    setOriginalBytes(null);
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setError(
        `File ${fmtSize(file.size)} ki hai — ${isPro ? "Pro" : "free"} limit ${maxMB}MB se badi PDF yahan process nahi hogi. ${isPro ? "Chhoti PDF try karo." : `Pro email se check karo (Pro limit ${PRO_PDF_MAX_MB}MB) ya ${maxMB}MB se chhoti PDF try karo.`}`
      );
      return;
    }
    let buf;
    try {
      buf = await file.arrayBuffer();
    } catch {
      setError("File padhi nahi ja payi — dobara select karo.");
      return;
    }
    const bytes = new Uint8Array(buf);
    let PDFLib;
    try {
      PDFLib = await getPdfLibOrThrow();
    } catch (e) {
      setError(e.message);
      return;
    }
    let doc;
    try {
      doc = await PDFLib.PDFDocument.load(bytes.slice(0));
    } catch {
      setError(ENCRYPTED_MSG);
      return;
    }
    let pages = 0;
    try {
      pages = doc.getPageCount();
    } catch {
      setError(ENCRYPTED_MSG);
      return;
    }
    setFileName(file.name || "file.pdf");
    setOriginalBytes(bytes);
    setOriginalSize(bytes.length);
    setPageCount(pages);
  }

  async function runCompress() {
    if (running || !originalBytes) return;
    setError("");
    setResult(null);
    let PDFLib;
    try {
      PDFLib = await getPdfLibOrThrow();
    } catch (e) {
      setError(e.message);
      return;
    }
    const targetBytes = targetKB * 1024;
    const origLen = originalBytes.length;
    setRunning(true);

    let best = null; // { bytes, imagesFound, imagesCompressed, attemptIdx }
    try {
      for (let i = 0; i < ATTEMPTS.length; i++) {
        const { q, s } = ATTEMPTS[i];
        setProgress(`Photos compress ho rahi hain… (attempt ${i + 1}/${ATTEMPTS.length})`);
        // Har attempt me original se naya document — saare pages hamesha safe.
        let doc;
        try {
          doc = await PDFLib.PDFDocument.load(originalBytes.slice(0));
        } catch {
          continue;
        }
        let imagesFound = 0;
        let imagesCompressed = 0;
        try {
          // Pehle candidates collect karo, phir replace — taaki
          // enumeration ke beech document mutate na ho.
          const candidates = [];
          let entries = [];
          try {
            entries = Array.from(doc.context.enumerateIndirectObjects());
          } catch {
            entries = [];
          }
          for (const [ref, obj] of entries) {
            try {
              if (!(obj instanceof PDFLib.PDFRawStream)) continue;
              const dict = obj.dict;
              let subtype = null;
              try {
                subtype = dict.get(PDFLib.PDFName.of("Subtype"));
              } catch {
                subtype = null;
              }
              if (!subtype || subtype.toString() !== "/Image") continue;
              let hasSMask = false;
              try {
                hasSMask = !!dict.get(PDFLib.PDFName.of("SMask"));
              } catch {
                hasSMask = false;
              }
              if (hasSMask) continue; // mask-wali image skip
              let filterRaw = null;
              try {
                filterRaw = dict.get(PDFLib.PDFName.of("Filter"));
              } catch {
                filterRaw = null;
              }
              let filterStr = "";
              try {
                filterStr = filterRaw ? String(filterRaw.toString()) : "";
              } catch {
                filterStr = "";
              }
              if (!filterStr.includes("DCTDecode")) continue; // sirf JPEG
              let w = 0,
                h = 0;
              try {
                const wn = dict.get(PDFLib.PDFName.of("Width"));
                const hn = dict.get(PDFLib.PDFName.of("Height"));
                w = wn && wn.asNumber ? wn.asNumber() : 0;
                h = hn && hn.asNumber ? hn.asNumber() : 0;
              } catch {
                w = 0;
                h = 0;
              }
              if (!w || !h) continue;
              let raw = null;
              try {
                raw = obj.getContents();
              } catch {
                raw = null;
              }
              if (!raw || !raw.length) continue;
              imagesFound++;
              candidates.push({ ref, dict, raw, w, h });
            } catch {
              continue;
            }
          }

          for (const c of candidates) {
            try {
              const newW = Math.max(1, Math.round(c.w * s));
              const newH = Math.max(1, Math.round(c.h * s));
              let bitmap = null;
              try {
                bitmap = await createImageBitmap(
                  new Blob([c.raw], { type: "image/jpeg" })
                );
              } catch {
                bitmap = null; // decode fail → image skip, doc unchanged
              }
              if (!bitmap) continue;
              const canvas = document.createElement("canvas");
              canvas.width = newW;
              canvas.height = newH;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(bitmap, 0, 0, newW, newH);
              try {
                bitmap.close();
              } catch {}
              const newBlob = await canvasToBlobPromise(canvas, q);
              if (!newBlob || newBlob.size >= c.raw.length) continue;
              const newArr = new Uint8Array(await newBlob.arrayBuffer());
              const d = c.dict;
              try {
                d.set(PDFLib.PDFName.of("Filter"), PDFLib.PDFName.of("DCTDecode"));
                d.set(PDFLib.PDFName.of("Width"), PDFLib.PDFNumber.of(newW));
                d.set(PDFLib.PDFName.of("Height"), PDFLib.PDFNumber.of(newH));
                d.set(
                  PDFLib.PDFName.of("ColorSpace"),
                  PDFLib.PDFName.of("DeviceRGB")
                );
                d.set(PDFLib.PDFName.of("BitsPerComponent"), PDFLib.PDFNumber.of(8));
                d.delete(PDFLib.PDFName.of("DecodeParms"));
                d.set(PDFLib.PDFName.of("Length"), PDFLib.PDFNumber.of(newArr.length));
              } catch {}
              try {
                doc.context.assign(
                  c.ref,
                  PDFLib.PDFRawStream.of(d, newArr)
                );
                imagesCompressed++;
              } catch {}
            } catch {
              continue;
            }
          }

          let outBytes = null;
          try {
            outBytes = await doc.save({ useObjectStreams: true });
          } catch {
            outBytes = null;
          }
          if (!outBytes || !outBytes.length) continue;
          const shot = {
            bytes: outBytes,
            imagesFound,
            imagesCompressed,
            attemptIdx: i,
          };
          if (!best || outBytes.length < best.bytes.length) best = shot;
          if (outBytes.length <= targetBytes) break; // pehli target-hit keep
        } catch {
          continue;
        }
      }
    } catch {
      // ladder-level safety — best jo bhi mila, usi se result banao
    }

    if (!best) {
      setRunning(false);
      setProgress("");
      setError("Compress nahi ho paya — file dobara select karke try karo.");
      return;
    }

    let outBlob;
    let outSize;
    let usedOriginal = false;
    if (best.bytes.length >= origLen) {
      // Compressed output original se bada — original hi do, pages same.
      usedOriginal = true;
      outSize = origLen;
      outBlob = new Blob([originalBytes.slice(0)], { type: "application/pdf" });
    } else {
      outSize = best.bytes.length;
      outBlob = new Blob([best.bytes], { type: "application/pdf" });
    }

    const saved = Math.max(0, origLen - outSize);
    const pct = origLen ? ((saved / origLen) * 100).toFixed(1) : "0.0";
    const targetAchieved = !usedOriginal && outSize <= targetBytes;

    setResult({
      blob: outBlob,
      outSize,
      pct,
      imagesFound: best.imagesFound,
      imagesCompressed: best.imagesCompressed,
      targetAchieved,
      usedOriginal,
      pages: pageCount,
      attempts: ATTEMPTS.length,
      reachedAttempt: best.attemptIdx + 1,
    });
    setRunning(false);
    setProgress("");
  }

  function handleDownload() {
    if (!result || !result.blob) return;
    fireToolComplete("pdf_compressor");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(result.blob);
    a.download = "compressed.pdf";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 4000);
  }

  const ready = !!originalBytes && pageCount !== null;

  return (
    <ToolPage
      title="📄 PDF Compressor"
      sub="PDF ke andar ki photos compress karke size ghatao — saare pages safe rehte hain, koi page delete nahi hota."
    >
      <div className="space-y-4">
        <FileDrop
          accept="application/pdf"
          onFile={handleFile}
          icon="📄"
          title="PDF select karo"
          hint={`Max ${maxMB}MB${isPro ? " (Pro)" : " (free)"} • File sirf aapke browser me process hogi`}
        />
        <div className="mt-4">
          <ProCheck onChange={setIsPro} toolLabel="is PDF tool" />
        </div>

        {ready && (
          <div className="pu-card p-4">
            <p className="text-[14px] font-bold text-mist-100 break-all">{fileName}</p>
            <p className="text-[12px] text-mist-400 mt-1">
              Original: {fmtSize(originalSize)} • Pages: {pageCount}
            </p>
            <div className="mt-4">
              <p className="text-[13px] font-bold text-mist-200 mb-2">
                Target size chuno
              </p>
              <div className="flex gap-2">
                {TARGETS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTargetKB(t)}
                    className={`flex-1 py-2.5 rounded-xl text-[13px] font-extrabold border transition-all ${
                      targetKB === t
                        ? "bg-gold text-black border-gold"
                        : "bg-white/5 text-mist-200 border-white/15"
                    }`}
                  >
                    {t}KB
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              disabled={running}
              onClick={runCompress}
              className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px] mt-4"
            >
              {running ? "Compress ho raha hai…" : "Compress Karo"}
            </button>
            {running && progress && (
              <p className="text-[12px] text-mist-400 mt-2 text-center">{progress}</p>
            )}
          </div>
        )}

        {error && (
          <div className="pu-card p-4" style={{ borderColor: "rgba(248,113,113,0.5)" }}>
            <p className="text-[13px] font-bold text-red-300">⚠️ {error}</p>
          </div>
        )}

        {result && !running && (
          <div className="pu-card p-4">
            <p className="text-[15px] font-extrabold text-mist-100 mb-3">
              ✅ Result
            </p>
            <div className="space-y-1.5 text-[13px] text-mist-300">
              <p>
                Original size:{" "}
                <span className="font-bold text-mist-100">{fmtSize(originalSize)}</span>
              </p>
              <p>
                Output size:{" "}
                <span className="font-bold text-mist-100">
                  {fmtSize(result.outSize)}
                </span>{" "}
                <span className="text-green-400 font-bold">({result.pct}% kam)</span>
              </p>
              <p>
                Pages:{" "}
                <span className="font-bold text-mist-100">
                  {result.pages} → {result.pages}
                </span>
              </p>
              <p className="font-bold text-green-400">
                Saare {result.pages} pages safe hain — koi page delete nahi hua.
              </p>
              {result.targetAchieved ? (
                <p className="font-bold text-gold">
                  🎯 Target ({targetKB}KB) achieve ho gaya
                </p>
              ) : (
                <p className="text-mist-400">
                  Target achieve nahi hua — best effort me itna hi ho paya (photos
                  ki quality isse zyada ghataane par form reject ho sakta hai).
                </p>
              )}
              {result.imagesFound === 0 && (
                <p className="text-mist-400">
                  Is PDF me photo nahi mili — text/vector PDF browser me zyada
                  compress nahi hota.
                </p>
              )}
              {result.imagesFound > 0 && (
                <p className="text-[12px] text-mist-500">
                  {result.imagesCompressed}/{result.imagesFound} photos compress
                  hui (attempt {result.reachedAttempt}/{result.attempts}).
                </p>
              )}
              {result.usedOriginal && (
                <p className="text-mist-400">
                  Compressed version original se chhota nahi ban paya — isliye
                  original file hi download ke liye di ja rahi hai (koi page
                  delete nahi hua).
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px] mt-4"
            >
              ⬇️ Download {result.usedOriginal ? "Original PDF" : "Compressed PDF"}
            </button>
          </div>
        )}

        <p className="text-[12px] text-mist-500 leading-snug px-1">
          Sirf PDF ke andar ki photos (JPEG) compress hoti hain. Text aur vector
          graphics waise ke waise rehte hain — isliye har PDF 100KB tak jaana
          mumkin nahi.
        </p>
      </div>
    </ToolPage>
  );
}
