"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import { IconShield, IconCrown, IconLock, IconZap } from "../../components/icons";

const ADMIN_EMAILS = ["ravipratap7081@gmail.com"];

// Future apps register here — dashboard auto-supports them
const CONNECTED_APPS = [
  { id: "pro-universe", name: "ProTools", icon: "🏢", status: "live", url: "https://rps-world-website.onrender.com" },
  // Add future apps here: { id: "app-2", name: "My Next App", ... }
];

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 pu-press-card">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gold">{icon}</span>
        <span className="text-mist-500 text-[11px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-[26px] font-extrabold text-mist-100">{value}</div>
      {sub && <div className="text-mist-500 text-[11px] mt-1">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState(null);
  const [selectedApp, setSelectedApp] = useState("pro-universe");

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !ADMIN_EMAILS.includes(user.email)) {
        router.replace("/login");
        return;
      }
      setAuthorized(true);
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          setStats(await res.json());
        }
      } catch (e) {}
      setLoading(false);
    })();
  }, [router]);

  if (!authorized || loading) {
    return (
      <main className="min-h-screen bg-ink-950 flex items-center justify-center">
        <p className="text-gold animate-pulse">Loading Command Center…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink-950 pu-ambient px-5 py-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center">
            <IconZap size={24} className="text-gold" />
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold text-mist-100">Command Center</h1>
            <p className="text-mist-500 text-[12px]">All your apps, one dashboard</p>
          </div>
        </div>

        {/* App Switcher */}
        <div className="mb-6">
          <p className="text-mist-500 text-[11px] font-semibold uppercase tracking-wide mb-2">Connected Apps</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CONNECTED_APPS.map(app => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app.id)}
                className={`pu-press flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-semibold whitespace-nowrap ${
                  selectedApp === app.id
                    ? "bg-gold/15 border-gold/40 text-gold"
                    : "bg-white/[0.03] border-white/10 text-mist-300"
                }`}
              >
                <span>{app.icon}</span>
                {app.name}
                <span className={`w-2 h-2 rounded-full ${app.status === "live" ? "bg-emerald-400" : "bg-yellow-400"}`} />
              </button>
            ))}
            <button className="pu-press flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-white/20 text-mist-500 text-[13px] whitespace-nowrap">
              + Connect App
            </button>
          </div>
        </div>

        {stats ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatCard
                icon={<IconZap size={16} />}
                label="Coins Issued"
                value={stats.coins.totalIssued.toLocaleString()}
                sub={`${stats.coins.checkinsToday} check-ins today`}
              />
              <StatCard
                icon={<IconLock size={16} />}
                label="Vault Files"
                value={stats.vault.totalFiles}
                sub={`${stats.vault.totalStorageMB} MB stored`}
              />
              <StatCard
                icon={<IconCrown size={16} />}
                label="Revenue"
                value={`₹${stats.revenue.total.toLocaleString()}`}
                sub={stats.revenue.note}
              />
              <StatCard
                icon={<IconShield size={16} />}
                label="Transactions"
                value={stats.coins.transactions}
                sub={`${stats.vault.uploadsToday} uploads today`}
              />
            </div>

            {/* Recent Activity */}
            <div className="mb-6">
              <p className="text-mist-500 text-[11px] font-semibold uppercase tracking-wide mb-2">Recent Activity</p>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl divide-y divide-white/5">
                {stats.recentActivity.length === 0 ? (
                  <p className="text-mist-500 text-[13px] p-4 text-center">No activity yet</p>
                ) : (
                  stats.recentActivity.map((a, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <span className="text-mist-300 text-[13px]">
                        {a.type === "earned" ? "🪙 Coins earned" : "💸 Coins spent"}
                      </span>
                      <span className={`text-[13px] font-bold ${a.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {a.amount > 0 ? "+" : ""}{a.amount}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
                className="pu-press bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-left"
              >
                <p className="text-mist-100 text-[14px] font-bold">🗄️ Database</p>
                <p className="text-mist-500 text-[11px] mt-1">Open Supabase dashboard</p>
              </button>
              <button
                onClick={() => window.open("https://vercel.com", "_blank")}
                className="pu-press bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-left"
              >
                <p className="text-mist-100 text-[14px] font-bold">🚀 Deployments</p>
                <p className="text-mist-500 text-[11px] mt-1">Open Vercel dashboard</p>
              </button>
            </div>

            <p className="text-mist-600 text-[10px] text-center mt-6">
              Last updated: {new Date(stats.timestamp).toLocaleString("en-IN")}
            </p>
          </>
        ) : (
          <p className="text-mist-500 text-center py-10">Could not load stats</p>
        )}
      </div>
    </main>
  );
}
