// Shared client-side image helpers for the sarkari tools.
// Everything runs in the browser — no upload to any server.

export function fmtSize(bytes) {
  if (!bytes && bytes !== 0) return "—";
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB";
  return (bytes / 1024).toFixed(1) + " KB";
}

export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Photo load nahi ho payi — JPG/PNG photo try karo."));
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
export function drawToCanvas(img, outW, outH, mode = "cover", bg = "#ffffff") {
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
