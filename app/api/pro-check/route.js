import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "../../../lib/delivery";
import { getProByEmail } from "../../../lib/pro-server";

/**
 * GET /api/pro-check?email=...
 * Server-checked Pro status by PAYMENT EMAIL. This is the only source
 * tools use to lift the free file-size cap.
 * - Returns { isPro, pro_until } only. No phone, no order list.
 * - Fail-closed: missing DB/env/table returns isPro:false (free tier).
 *   A Pro grant must never come from an error path.
 * - Rate-limited (20/min/IP). Email is lowercased before lookup.
 * - This route never writes anything and never activates Pro.
 */
export async function GET(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`pro-check:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const email = req.nextUrl.searchParams.get("email") || "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  const result = await getProByEmail(email);
  return NextResponse.json({
    isPro: result.isPro,
    pro_until: result.proUntil,
    checked: result.checked,
  });
}
