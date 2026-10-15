import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase-server";

// Admin emails — only these can access the dashboard
const ADMIN_EMAILS = [
  "ravipratap7081@gmail.com",
];

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Total coins issued (all time)
    const { data: coinStats } = await supabase
      .from("coin_ledger")
      .select("amount, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    const totalCoinsIssued = (coinStats || [])
      .filter(c => c.amount > 0)
      .reduce((sum, c) => sum + c.amount, 0);

    const today = new Date().toISOString().split("T")[0];
    const checkinsToday = (coinStats || []).filter(
      c => c.created_at?.startsWith(today) && c.amount > 0
    ).length;

    // Vault stats
    const { data: vaultFiles, count: vaultCount } = await supabase
      .from("vault_documents")
      .select("file_size, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(100);

    const totalStorage = (vaultFiles || []).reduce((sum, f) => sum + (f.file_size || 0), 0);
    const vaultToday = (vaultFiles || []).filter(f => f.created_at?.startsWith(today)).length;

    // Recent activity (last 10 coin transactions)
    const recentActivity = (coinStats || []).slice(0, 10).map(c => ({
      amount: c.amount,
      time: c.created_at,
      type: c.amount > 0 ? "earned" : "spent",
    }));

    return NextResponse.json({
      app: "pro-universe",
      coins: {
        totalIssued: totalCoinsIssued,
        checkinsToday,
        transactions: coinStats?.length || 0,
      },
      vault: {
        totalFiles: vaultCount || 0,
        totalStorageMB: (totalStorage / 1024 / 1024).toFixed(2),
        uploadsToday: vaultToday,
      },
      revenue: {
        proSales: 0,
        adRevenue: 0,
        affiliate: 0,
        total: 0,
        note: "Monetization not yet activated",
      },
      recentActivity,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
