// Shared client-side image helpers for the sarkari tools.
// Everything runs in the browser — no upload to any server.

export function fmtSize(bytes) {
  if (!bytes && bytes !== 0) return "—";
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB";
  return (bytes / 1024).toFixed(1) + " KB";
}

// iOS canvas pixel wall: Safari fails/times out on canvases above roughly
// 16.7M pixels. Guard every canvas allocation to 16M pixels (audit fix
// 31 Oct 2026) so a very large phone photo is downscaled before canvas
// instead of crashing the tab. Aspect ratio is preserved.
export const MAX_CANVAS_PIXELS = 16000000;
export function guardCanvasDims(w, h) {
  const px = Math.max(1, w) * Math.max(1, h);
  if (px <= MAX_CANVAS_PIXELS) return { w, h };
  const s = Math.sqrt(MAX_CANVAS_PIXELS / px);
  return { w: Math.max(1, Math.round(w * s)), h: Math.max(1, Math.round(h * s)) };
}

export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      const name = (file && file.name ? file.name : "").toLowerCase();
      if (name.endsWith(".heic") || name.endsWith(".heif")) {
        reject(
          new Error(
            "Ye HEIC photo hai — is tool me HEIC support nahi hai. iPhone Photos app se photo ko JPG me convert karke (Share → Save as JPG / Files me copy karke) dobara try karo."
          )
        );
        return;
      }
      reject(new Error("Photo load nahi ho payi — JPG/PNG photo try karo. HEIC photos support nahi hain."));
    };
    img.src = url;
  });
}

export function canvasToBlob(canvas, type = "image/jpeg", quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export function downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 4000);
}

// Draw an image onto a fresh canvas at exact output dimensions.
// mode "cover" center-crops to fill; "contain" letterboxes on white.
// Dimensions are passed through guardCanvasDims first (iOS pixel wall).
export function drawToCanvas(img, outW, outH, mode = "cover", bg = "#ffffff") {
  const g = guardCanvasDims(outW, outH);
  outW = g.w;
  outH = g.h;
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, outW, outH);
  const scale =
    mode === "cover"
      ? Math.max(outW / img.naturalWidth, outH / img.naturalHeight)
      : Math.min(outW / img.naturalWidth, outH / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.drawImage(img, (outW - w) / 2, (outH - h) / 2, w, h);
  return canvas;
}

// Binary-search JPEG quality (and, if needed, progressively downscale)
// so the output lands inside [minKB, maxKB]. Returns { blob, quality, scale }
// or null if even the smallest attempt exceeds maxKB.
export async function compressToBand(
  img,
  { outW, outH, minKB = 0, maxKB, mode = "cover" }
) {
  let scaleDown = 1;
  for (let attempt = 0; attempt < 4; attempt++) {
    const w = Math.max(50, Math.round(outW * scaleDown));
    const h = Math.max(50, Math.round(outH * scaleDown));
    const canvas = drawToCanvas(img, w, h, mode);
    let lo = 0.05,
      hi = 0.95,
      best = null;
    for (let i = 0; i < 9; i++) {
      const q = (lo + hi) / 2;
      const blob = await canvasToBlob(canvas, "image/jpeg", q);
      if (!blob) break;
      const kb = blob.size / 1024;
      if (kb <= maxKB) {
        best = { blob, quality: q };
        if (kb >= minKB) return { ...best, scale: scaleDown, width: w, height: h };
        lo = q; // too small — try better quality
      } else {
        hi = q;
      }
    }
    if (best) return { ...best, scale: scaleDown, width: w, height: h };
    scaleDown *= 0.75; // still too big — shrink dimensions and retry
  }
  return null;
}

// Funnel event: tool completed (user downloaded a result). Guarded and
// fail-silent — a tracking failure must never break the download.
export function fireToolComplete(toolName) {
  try {
    if (typeof window !== "undefined" && typeof window.puEvent === "function") {
      window.puEvent("tool_complete", { tool_name: toolName });
    }
  } catch (e) {}
}

// Funnel event: file refused for size (limit-hit). Fired by every tool
// at the exact point it refuses an over-limit file, so limit-hits are
// measurable separately from completions (audit fix 31 Oct 2026).
// NOTE: window.puEvent sends to GA4 (when configured) and to the
// Supabase `events` table — that table does NOT exist yet (creation SQL
// is review-only and needs owner approval), so until it is created this
// event is recorded only where GA4 is configured. The code path itself
// is live and fail-silent either way.
export function fireLimitHit(toolName, limitMB, fileMB) {
  try {
    if (typeof window !== "undefined" && typeof window.puEvent === "function") {
      window.puEvent("limit_hit", {
        tool_name: toolName,
        limit_mb: limitMB,
        file_mb: Math.round(fileMB * 10) / 10,
      });
    }
  } catch (e) {}
}
