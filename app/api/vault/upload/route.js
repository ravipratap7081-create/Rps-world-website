import { NextResponse } from "next/server";
import { createClient, getAuthUser } from "../../../../lib/supabase-server";
import { validateFile, storagePath, safeFilename, MAX_SIZE } from "../../../../lib/vault";

// Cap the raw request body BEFORE parsing.
// req.formData() buffers the entire body into memory, so file.size checks
// alone are NOT enough — a huge body would be fully read first.
// MAX_SIZE + 2MB allows multipart overhead around a 10MB file.
const MAX_BODY_BYTES = MAX_SIZE + 2 * 1024 * 1024;

export async function POST(req) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "login required" }, { status: 401 });

  // Pre-parse gate: reject oversized bodies via Content-Length header.
  // (Chunked requests without Content-Length still hit the file.size check
  // inside validateFile() after parsing.)
  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "request too large (max 10 MB file)" }, { status: 413 });
  }

  let file;
  try {
    const form = await req.formData();
    file = form.get("file");
  } catch {
    return NextResponse.json({ error: "invalid upload" }, { status: 400 });
  }

  const v = await validateFile(file);
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  const supabase = await createClient();
  // Server-generated path: <uid>/<random-uuid>.<ext> — client never supplies it.
  const path = storagePath(user.id, v.ext);
  const filename = safeFilename(file.name);

  // 1. Upload to private bucket
  const { error: upErr } = await supabase.storage
    .from("vault-docs")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) {
    return NextResponse.json({ error: "upload failed" }, { status: 500 });
  }

  // 2. Insert metadata — owner_id and path both derive from verified session.
  const { data, error: dbErr } = await supabase
    .from("vault_documents")
    .insert({
      owner_id: user.id,
      filename,
      storage_path: path,
      mime_type: file.type,
      file_size: file.size,
    })
    .select("id, filename, mime_type, file_size, created_at")
    .single();

  if (dbErr) {
    // Metadata failed: remove the orphaned file.
    // Log cleanup failures server-side (no file content, no credentials)
    // so orphans can be found later via the reconciliation query.
    try {
      await supabase.storage.from("vault-docs").remove([path]);
    } catch (cleanupErr) {
      console.error("[vault] orphan cleanup failed", {
        userId: user.id,
        path,
        reason: cleanupErr?.message ?? "unknown",
      });
    }
    return NextResponse.json({ error: "could not save document" }, { status: 500 });
  }

  return NextResponse.json({ document: data });
}
