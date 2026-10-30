import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, getServiceClient } from "../../../lib/delivery";

export const dynamic = "force-dynamic";

/**
 * GET /api/premium-stats
 * Premium aggregates ONLY, for the RPS Dashboard app's own separate
 * Premium section. No personal data of any kind leaves the server:
 * no emails, no phones, no names — only three scalar numbers computed
 * from pro_orders via the service-role client (server only; clients
 * must never read pro_orders, and this route never returns its rows).
 *   active_pro:        paid rows whose pro_until is still in the future
 *   total_revenue_inr: sum of amount over all paid rows
 *   added_this_month:  paid rows with paid_at in the current IST month
 * Fails closed with 503 when the service client is not configured.
 */
export async function GET(req) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`premium-stats:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  let supabase;
  try {
    supabase = getServiceClient();
  } catch {
    return NextResponse.json({ error: "premium_not_configured" }, { status: 503 });
  }
  const nowIso = new Date().toISOString();
  // Current month start in IST (UTC+5:30), so "is mahine" matches IST dates.
  const istNow = new Date(Date.now() + 5.5 * 3600 * 1000);
  const monthStartIso = new Date(
    Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), 1) - 5.5 * 3600 * 1000
  ).toISOString();
  try {
    const [
      { count: activePro, error: e1 },
      { data: paidRows, error: e2 },
      { count: addedThisMonth, error: e3 },
    ] = await Promise.all([
      supabase
        .from("pro_orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "paid")
        .gt("pro_until", nowIso),
      supabase.from("pro_orders").select("amount").eq("status", "paid"),
      supabase
        .from("pro_orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "paid")
        .gte("paid_at", monthStartIso),
    ]);
    if (e1 || e2 || e3) {
      return NextResponse.json({ error: "premium_upstream_error" }, { status: 502 });
    }
    const totalRevenueInr = (paidRows || []).reduce(
      (sum, r) => sum + (Number(r.amount) || 0),
      0
    );
    return NextResponse.json({
      active_pro: activePro ?? 0,
      total_revenue_inr: totalRevenueInr,
      added_this_month: addedThisMonth ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "premium_upstream_error" }, { status: 502 });
  }
}
