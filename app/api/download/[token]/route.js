import { NextResponse } from "next/server";
import {
  getServiceClient,
  hashToken,
  isValidTokenFormat,
  auditLog,
  checkRateLimit,
  getClientIp,
} from "../../../../lib/delivery";

/**
 * GET /api/download/[token]
 * Redeems a single-use download token and redirects to a short-lived
 * signed URL for the ZIP in private Supabase Storage.
 *
 * Security:
 *  - Token validated by format, then hashed; only the hash touches the DB.
 *  - claim_download_token RPC marks used ATOMICALLY (single UPDATE).
 *  - Denied attempts return a generic 404 (no information leak).
 *  - Signed URL expires in 10 minutes; tokens are single-use + 24h expiry.
 *  - Tokens are NOT bound to IP (mobile IPs rotate).
 */
export async function GET(req, { params }) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`download:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  const token = params?.token;
  if (!isValidTokenFormat(token)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  let supabase;
  try {
    supabase = getServiceClient();
  } catch {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  // Pre-check: verify the delivery file exists BEFORE claiming the token.
  // This prevents token burn when storage is unavailable.
  const bucket = process.env.DELIVERY_BUCKET || "diwali-delivery";
  const objectPath = process.env.DELIVERY_OBJECT || "diwali-business-promo-pack.zip";
  try {
    const { data: fileList, error: listErr } = await supabase.storage
      .from(bucket)
      .list("", { search: objectPath });
    const fileExists = !listErr && fileList && fileList.some(f => f.name === objectPath);
    if (!fileExists) {
      console.error("delivery: object not found in bucket:", objectPath);
      return NextResponse.json({
        error: "download_unavailable",
        message: "Download file not ready. Please try again in a few minutes or use recovery."
      }, { status: 503 });
    }
  } catch (e) {
    console.error("delivery: storage pre-check failed:", e.message);
    return NextResponse.json({
      error: "download_unavailable",
      message: "Download temporarily unavailable. Please try again."
    }, { status: 503 });
  }

  // Atomic claim-and-invalidate. Only succeeds if: hash matches, unused,
  // unexpired, AND linked order is paid.
  const { data, error } = await supabase.rpc("claim_download_token", {
    p_token_hash: hashToken(token),
  });

  if (error || !data?.length || !data[0].claimed) {
    await auditLog(supabase, null, "download_denied",
      "invalid/expired/used token redemption attempt");
    // Generic 404: do not reveal whether the token ever existed.
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const orderId = data[0].order_id;
  await auditLog(supabase, orderId, "download_claimed",
    "token redeemed, signed url issued");

  // Issue short-lived signed URL from the PRIVATE storage bucket.
  const { data: signed, error: signErr } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, 600, {
      download: "diwali-business-promo-pack.zip",
    });

  if (signErr || !signed?.signedUrl) {
    console.error("delivery: signed url failed:", signErr?.message);
    return NextResponse.json({
      error: "download_unavailable",
      message: "Download temporarily unavailable. Please use recovery with your order ID and email to get a new link."
    }, { status: 503 });
  }

  // 307 keeps the method; client follows to the signed URL.
  return NextResponse.redirect(signed.signedUrl, 307);
}
