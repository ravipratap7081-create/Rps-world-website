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
  const bucket = process.env.DELIVERY_BUCKET || "diwali-delivery";
  const objectPath = process.env.DELIVERY_OBJECT || "diwali-business-promo-pack.zip";
  const { data: signed, error: signErr } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, 600, {
      download: "diwali-business-promo-pack.zip",
    });

  if (signErr || !signed?.signedUrl) {
    console.error("delivery: signed url failed:", signErr?.message);
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }

  // 307 keeps the method; client follows to the signed URL.
  return NextResponse.redirect(signed.signedUrl, 307);
}
