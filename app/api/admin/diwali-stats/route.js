import { NextResponse } from "next/server";
import { getServiceClient } from "../../../../lib/delivery";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const adminKey = process.env.ADMIN_DASHBOARD_KEY;
  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  let supabase;
  try {
    supabase = getServiceClient();
  } catch {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }
  try {
    const { data: orders, error: ordersErr } = await supabase
      .from("delivery_orders")
      .select("id, cashfree_order_id, amount, status, customer_email, customer_phone, created_at, paid_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (ordersErr) throw ordersErr;
    const total = orders?.length || 0;
    const paid = orders?.filter(o => o.status === "paid") || [];
    const pending = orders?.filter(o => o.status === "pending")?.length || 0;
    const failed = orders?.filter(o => o.status === "failed")?.length || 0;
    const revenue = paid.reduce((sum, o) => sum + parseFloat(o.amount || 0), 0);
    const { data: tokens } = await supabase
      .from("download_tokens")
      .select("id, used_at, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    const tokensIssued = tokens?.length || 0;
    const tokensClaimed = tokens?.filter(t => t.used_at)?.length || 0;
    const dailyMap = {};
    paid.forEach(o => {
      if (o.paid_at) {
        const day = o.paid_at.split("T")[0];
        dailyMap[day] = (dailyMap[day] || 0) + parseFloat(o.amount || 0);
      }
    });
    const daily = Object.entries(dailyMap)
      .map(([date, rev]) => ({ date, revenue: rev }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 14);
    const recentOrders = (orders || []).slice(0, 20).map(o => ({
      order_id: o.cashfree_order_id,
      amount: o.amount,
      status: o.status,
      email_masked: o.customer_email ? o.customer_email.replace(/(.{2}).*(@.*)/, "$1***$2") : null,
      phone_masked: o.customer_phone ? o.customer_phone.replace(/(.{2}).*(.{2})/, "$1******$2") : null,
      created_at: o.created_at,
      paid_at: o.paid_at,
    }));
    const conversionRate = total > 0 ? ((paid.length / total) * 100).toFixed(1) : 0;
    return NextResponse.json({
      success: true,
      summary: {
        total_orders: total,
        paid_orders: paid.length,
        pending_orders: pending,
        failed_orders: failed,
        total_revenue: revenue,
        conversion_rate: `${conversionRate}%`,
        tokens_issued: tokensIssued,
        tokens_claimed: tokensClaimed,
      },
      daily_revenue: daily,
      recent_orders: recentOrders,
      target: {
        goal: 50000,
        achieved: revenue,
        remaining: Math.max(0, 50000 - revenue),
        progress_pct: ((revenue / 50000) * 100).toFixed(1),
      },
      generated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error("diwali-stats error:", e.message);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
