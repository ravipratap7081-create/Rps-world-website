import { randomUUID } from "crypto";

export const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// Allowed types with magic-byte signatures (validated, not just declared MIME)
const TYPES = {
  "application/pdf": { ext: "pdf", magic: [[0x25, 0x50, 0x44, 0x46]] },
  "image/jpeg": { ext: "jpg", magic: [[0xff, 0xd8, 0xff]] },
  "image/png": {
    ext: "png",
    magic: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  },
  "image/webp": {
    ext: "webp",
    // RIFF....WEBP — check bytes 0-3 and 8-11
    magic: null,
    webp: true,
  },
};

function matchesMagic(bytes, sig) {
  if (bytes.length < sig.length) return false;
  return sig.every((b, i) => bytes[i] === b);
}

function isWebP(bytes) {
  if (bytes.length < 12) return false;
  const riff = [0x52, 0x49, 0x46, 0x46]; // RIFF
  const webp = [0x57, 0x45, 0x42, 0x50]; // WEBP
  return (
    riff.every((b, i) => bytes[i] === b) &&
    webp.every((b, i) => bytes[8 + i] === b)
  );
}

// Validate size, declared MIME, and actual file signature.
// Returns { ok, ext } or { ok:false, error }.
export async function validateFile(file) {
  if (!file || typeof file.size !== "number")
    return { ok: false, error: "no file" };
  if (file.size <= 0) return { ok: false, error: "empty file" };
  if (file.size > MAX_SIZE) return { ok: false, error: "file too large (max 10 MB)" };

  const type = TYPES[file.type];
  if (!type) return { ok: false, error: "type not allowed (PDF, JPG, PNG, WebP only)" };

  try {
    const buf = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    let sigOk = false;
    if (type.webp) sigOk = isWebP(buf);
    else sigOk = type.magic.some((sig) => matchesMagic(buf, sig));
    if (!sigOk) return { ok: false, error: "file content does not match its type" };
  } catch {
    return { ok: false, error: "could not read file" };
  }

  return { ok: true, ext: type.ext };
}

// Random storage path inside the user's own folder: <uid>/<uuid>.<ext>
export function storagePath(userId, ext) {
  return `${userId}/${randomUUID()}.${ext}`;
}

// Sanitize a filename for display (prevent path tricks / HTML injection)
export function safeFilename(name) {
  return String(name || "document")
    .replace(/[/\\]/g, "")
    .slice(0, 120)
    .trim() || "document";
}
