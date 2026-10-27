"use client";
import { useEffect, useRef, useState } from "react";
import ToolPage from "../../../components/tools/ToolPage";
import FileDrop from "../../../components/tools/FileDrop";
import {
  loadImageFromFile,
  downloadBlob,
  canvasToBlob,
  fireToolComplete,
} from "../../../lib/image-tools";

const W = 700;
const H = 360;

const FONT_STYLES = [
  { label: "Style 1", stack: "Segoe Script, Brush Script MT, cursive" },
  { label: "Style 2", stack: "Brush Script MT, cursive" },
  { label: "Style 3", stack: "Lucida Handwriting, cursive" },
  { label: "Style 4", stack: "cursive" },
];

const CHECKER = {
  backgroundImage:
    "repeating-conic-gradient(#232c42 0% 25%, #151b2c 0% 50%)",
  backgroundSize: "20px 20px",
};

// Content ki alpha bounding-box nikaalo aur utna hi crop karo.
// Khaali canvas ho to null.
function trimCanvas(src) {
  const ctx = src.getContext("2d", { willReadFrequently: true });
  let data;
  try {
    data = ctx.getImageData(0, 0, src.width, src.height).data;
  } catch {
    return null;
  }
  let minX = src.width,
    minY = src.height,
    maxX = -1,
    maxY = -1;
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const a = data[(y * src.width + x) * 4 + 3];
      if (a > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  const pad = 6;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(src.width - 1, maxX + pad);
  maxY = Math.min(src.height - 1, maxY + pad);
  const out = document.createElement("canvas");
  out.width = maxX - minX + 1;
  out.height = maxY - minY + 1;
  out.getContext("2d").drawImage(src, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
  return out;
}

export default function Tool() {
  const [tab, setTab] = useState("draw"); // draw | type | upload
  const [inkColor, setInkColor] = useState("#1e3a8a");
  const [lineWidth, setLineWidth] = useState(3);
  const [typedText, setTypedText] = useState("");
  const [fontIdx, setFontIdx] = useState(0);
  const [threshold, setThreshold] = useState(235);
  const [uploadName, setUploadName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const drawRef = useRef(null);
  const previewRef = useRef(null);
  const typeCanvasRef = useRef(null);
  const uploadCanvasRef = useRef(null);
  const uploadImgRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef(null);
  const hasDrawnRef = useRef(false);

  /* ---------------- preview sync ---------------- */
  function syncPreview(source) {
    const p = previewRef.current;
    if (!p || !source) return;
    p.width = source.width;
    p.height = source.height;
    const ctx = p.getContext("2d");
    ctx.clearRect(0, 0, p.width, p.height);
    ctx.drawImage(source, 0, 0);
  }

  /* ---------------- type rendering ---------------- */
  function renderTypeCanvas() {
    if (!typeCanvasRef.current) {
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      typeCanvasRef.current = c;
    }
    const c = typeCanvasRef.current;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    const text = typedText.trim();
    if (text) {
      const stack = FONT_STYLES[fontIdx].stack;
      let size = 90;
      ctx.font = `${size}px ${stack}`;
      const w = ctx.measureText(text).width;
      if (w > W - 40) size = Math.max(28, Math.floor(size * ((W - 40) / w)));
      ctx.font = `${size}px ${stack}`;
      ctx.fillStyle = inkColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, W / 2, H / 2);
    }
    return c;
  }

  // Type tab ke changes preview me live dikhao
  useEffect(() => {
    if (tab === "type") syncPreview(renderTypeCanvas());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, typedText, fontIdx, inkColor]);

  // Tab switch par preview active canvas se sync karo
  useEffect(() => {
    if (tab === "draw" && drawRef.current) syncPreview(drawRef.current);
    if (tab === "upload" && uploadCanvasRef.current) syncPreview(uploadCanvasRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  /* ---------------- draw handlers ---------------- */
  function posFromEvent(e) {
    const canvas = drawRef.current;
    const r = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * canvas.width) / r.width,
      y: ((e.clientY - r.top) * canvas.height) / r.height,
    };
  }

  function onPointerDown(e) {
    const canvas = drawRef.current;
    if (!canvas) return;
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = posFromEvent(e);
    lastRef.current = p;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = inkColor;
    ctx.fillStyle = inkColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(p.x, p.y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    hasDrawnRef.current = true;
  }

  function onPointerMove(e) {
    if (!drawingRef.current) return;
    const canvas = drawRef.current;
    const ctx = canvas.getContext("2d");
    const p = posFromEvent(e);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
  }

  function onPointerUp() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (drawRef.current) syncPreview(drawRef.current);
  }

  function clearDraw() {
    const canvas = drawRef.current;
    if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    hasDrawnRef.current = false;
    setError("");
    syncPreview(canvas);
  }

  /* ---------------- upload processing ---------------- */
  function processUpload(img, th) {
    const scale = Math.min(1, 1000 / img.naturalWidth);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    const feather = 32;
    for (let i = 0; i < d.length; i += 4) {
      const m = Math.min(d[i], d[i + 1], d[i + 2]);
      if (m >= th) {
        d[i + 3] = 0;
      } else if (m > th - feather) {
        const f = (th - m) / feather; // threshold ke paas = zyada transparent
        d[i + 3] = Math.round(d[i + 3] * (1 - f));
      }
    }
    ctx.putImageData(imgData, 0, 0);
    const trimmed = trimCanvas(c);
    uploadCanvasRef.current = trimmed || c;
    syncPreview(uploadCanvasRef.current);
  }

  async function onUploadFile(file) {
    setError("");
    try {
      const { img, url } = await loadImageFromFile(file);
      URL.revokeObjectURL(url); // img already decoded hai, URL ki zaroorat nahi
      uploadImgRef.current = img;
      setUploadName(file.name);
      processUpload(img, threshold);
    } catch (e) {
      setError(e?.message || "Photo load nahi ho payi — JPG/PNG photo try karo.");
    }
  }

  // Threshold badalne par uploaded photo dobara process karo
  useEffect(() => {
    if (uploadImgRef.current) processUpload(uploadImgRef.current, threshold);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);

  /* ---------------- download ---------------- */
  async function onDownload() {
    setError("");
    let source = null;
    if (tab === "draw") {
      if (!hasDrawnRef.current) {
        setError("Pehle signature banao — canvas khaali hai, pehle draw karo.");
        return;
      }
      source = drawRef.current;
    } else if (tab === "type") {
      if (!typedText.trim()) {
        setError("Pehle signature banao — naam type karo, phir download hoga.");
        return;
      }
      source = renderTypeCanvas();
    } else {
      if (!uploadCanvasRef.current) {
        setError("Pehle signature banao — signature ki photo upload karo.");
        return;
      }
      source = uploadCanvasRef.current;
    }
    if (!source) {
      setError("Pehle signature banao.");
      return;
    }
    const trimmed = tab === "upload" ? source : trimCanvas(source);
    if (!trimmed) {
      setError("Pehle signature banao — khaali canvas download nahi hoga.");
      return;
    }
    setBusy(true);
    try {
      const blob = await canvasToBlob(trimmed, "image/png");
      if (!blob) throw new Error("PNG nahi ban paya — dobara try karo.");
      downloadBlob(blob, "signature.png");
      fireToolComplete("signature_maker");
    } catch (e) {
      setError(e?.message || "Download nahi ho paya — dobara try karo.");
    } finally {
      setBusy(false);
    }
  }

  const tabBtn = (id, label) => (
    <button
      type="button"
      onClick={() => {
        setTab(id);
        setError("");
      }}
      className="pu-press flex-1 py-2.5 rounded-xl text-[13px] font-bold"
      style={
        tab === id
          ? { background: "#F5B301", color: "#0a0e17", border: "1px solid #F5B301" }
          : {
              background: "rgba(255,255,255,0.05)",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.1)",
            }
      }
    >
      {label}
    </button>
  );

  return (
    <ToolPage
      title="✍️ Signature Maker"
      sub="Draw karo, type karo ya signature ki photo upload karo — transparent PNG download karke form me lagao."
    >
      <div className="flex gap-2 mb-4">
        {tabBtn("draw", "✏️ Draw")}
        {tabBtn("type", "⌨️ Type")}
        {tabBtn("upload", "📤 Upload")}
      </div>

      {tab === "draw" && (
        <div>
          <div className="rounded-2xl overflow-hidden" style={{ background: "#ffffff" }}>
            <canvas
              ref={drawRef}
              width={W}
              height={H}
              className="w-full h-auto block"
              style={{ touchAction: "none", cursor: "crosshair" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          </div>
          <p className="text-[11px] text-mist-500 mt-2">
            Canvas safed dikhta hai, lekin download hamesha transparent PNG hoga.
          </p>
          <div className="pu-card p-4 mt-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[13px] font-bold text-mist-200">Ink color</span>
              <input
                type="color"
                value={inkColor}
                onChange={(e) => setInkColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10"
              />
              <span className="text-[12px] text-mist-400">{inkColor}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-bold text-mist-200">Line width</label>
              <span className="text-[13px] font-extrabold text-gold">{lineWidth}px</span>
            </div>
            <input
              type="range"
              min={2}
              max={6}
              step={1}
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-full accent-[#F5B301]"
            />
            <button
              type="button"
              onClick={clearDraw}
              className="pu-btn-ghost pu-press w-full py-3 rounded-2xl font-bold text-[14px] mt-3"
            >
              🗑️ Clear karo
            </button>
          </div>
        </div>
      )}

      {tab === "type" && (
        <div className="pu-card p-4">
          <label className="text-[13px] font-bold text-mist-200 block mb-2">Apna naam likho</label>
          <input
            type="text"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Jaise: Ravi Pratap Singh"
            className="pu-input"
            maxLength={40}
          />
          <label className="text-[13px] font-bold text-mist-200 block mt-4 mb-2">
            Signature style chuno
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FONT_STYLES.map((f, i) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setFontIdx(i)}
                className="pu-press py-3 rounded-xl text-[16px]"
                style={{
                  fontFamily: f.stack,
                  ...(fontIdx === i
                    ? {
                        background: "rgba(245,179,1,0.12)",
                        border: "1px solid rgba(245,179,1,0.6)",
                        color: "#F5B301",
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#e2e8f0",
                      }),
                }}
              >
                {typedText.trim() || "Signature"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-[13px] font-bold text-mist-200">Ink color</span>
            <input
              type="color"
              value={inkColor}
              onChange={(e) => setInkColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10"
            />
            <span className="text-[12px] text-mist-400">{inkColor}</span>
          </div>
          <p className="text-[11px] text-mist-500 mt-3">
            Note: Style tumhare phone/computer ke fonts par depend karta hai — jo font
            device me nahi hoga, uski jagah normal handwriting jaisa font dikhega.
          </p>
        </div>
      )}

      {tab === "upload" && (
        <div>
          <FileDrop
            accept="image/*"
            onFile={onUploadFile}
            icon="✍️"
            title="Signature ki photo upload karo"
            hint="Safed paper par kiye signature ki saaf photo — background auto transparent hoga"
          />
          {uploadName && (
            <p className="text-[12px] text-mist-400 mt-3 truncate">📎 {uploadName}</p>
          )}
          <div className="pu-card p-4 mt-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-bold text-mist-200">
                Safedi hatane ki setting (threshold)
              </label>
              <span className="text-[13px] font-extrabold text-gold">{threshold}</span>
            </div>
            <input
              type="range"
              min={180}
              max={250}
              step={1}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-[#F5B301]"
            />
            <p className="text-[11px] text-mist-500 mt-1">
              Value zyada = zyada safed hissa gayab. Agar signature ke halke hisse bhi
              udd jayein to value kam karo.
            </p>
          </div>
        </div>
      )}

      <div className="pu-card p-4 mt-4">
        <p className="text-[12px] text-mist-400 mb-2 font-semibold">
          Preview (checkerboard = transparent hissa):
        </p>
        <div className="rounded-xl p-3 flex items-center justify-center min-h-[120px]" style={CHECKER}>
          <canvas ref={previewRef} width={W} height={H} className="max-w-full h-auto" />
        </div>
      </div>

      {error && (
        <div className="pu-card p-4 mt-4" style={{ borderColor: "rgba(248,113,113,0.4)" }}>
          <p className="text-[13px] font-semibold text-red-300">{error}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onDownload}
        disabled={busy}
        className="pu-btn-primary pu-press w-full py-3.5 rounded-2xl font-extrabold text-[15px] mt-4"
      >
        {busy ? "PNG ban raha hai…" : "⬇️ Download Signature (PNG)"}
      </button>
    </ToolPage>
  );
}
