// Loads pdf-lib with a resilient chain: self-hosted copy first, then CDNs.
// Returns window.PDFLib. Throws only if EVERY source fails — callers must
// show an honest error (never leave a dead UI).

const SOURCES = [
  "/libs/pdf-lib.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
  "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js",
  "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js",
];

let cached = null;

function tryScript(src, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    const timer = setTimeout(() => {
      s.remove();
      reject(new Error("timeout: " + src));
    }, timeoutMs);
    s.src = src;
    s.async = true;
    s.onload = () => {
      clearTimeout(timer);
      if (window.PDFLib) resolve(window.PDFLib);
      else reject(new Error("loaded but PDFLib missing: " + src));
    };
    s.onerror = () => {
      clearTimeout(timer);
      s.remove();
      reject(new Error("failed: " + src));
    };
    document.head.appendChild(s);
  });
}

export async function loadPdfLib() {
  if (typeof window !== "undefined" && window.PDFLib) return window.PDFLib;
  if (cached) return cached;
  let lastErr = null;
  for (const src of SOURCES) {
    try {
      cached = await tryScript(src);
      return cached;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("pdf-lib load failed");
}
