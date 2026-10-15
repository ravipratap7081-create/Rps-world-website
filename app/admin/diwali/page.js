"use client";
import { useEffect, useState } from "react";

export default function DiwaliDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const fetchStats = async (key) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/diwali-stats?key=${encodeURIComponent(key)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setStats(data);
      setAuthenticated(true);
      sessionStorage.setItem("diwali_admin_key", key);
    } catch (e) {
      setError(e.message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedKey = sessionStorage.getItem("diwali_admin_key");
    if (savedKey) {
      setApiKey(savedKey);
      fetchStats(savedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (apiKey.trim()) fetchStats(apiKey.trim());
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4">
        <div className="bg-[#1a1a2e] rounded-2xl p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-white mb-2">🪔 Diwali Dashboard</h1>
          <p className="text-white/60 text-sm mb-6">Enter admin key to view sales stats</p>
          <form onSubmit={handleLogin}>
            <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Admin API Key" className="w-full bg-[#0a0a1a] text-white rounded-xl px-4 py-3 mb-4 outline-none border border-white/10 focus:border-yellow-500" />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black font-bold rounded-xl py-3 hover:bg-yellow-400 disabled:opacity-50">
              {loading ? "Loading..." : "View Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const s = stats?.summary || {};
  const target = stats?.target || {};

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 pt-4">
          <h1 className="text-2xl font-bold">🪔 Diwali Sales Dashboard</h1>
          <button onClick={() => fetchStats(apiKey)} className="bg-white/10 rounded-xl px-4 py-2 text-sm hover:bg-white/20">🔄 Refresh</button>
        </div>
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 mb-6 border border-yellow-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">₹50,000 Goal Progress</span>
            <span className="text-2xl font-bold text-yellow-400">{target.progress_pct}%</span>
          </div>
          <div className="bg-black/40 rounded-full h-4 mb-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all" style={{ width: `${Math.min(100, parseFloat(target.progress_pct || 0))}%` }} />
          </div>
          <div className="flex justify-between text-sm">
            <span>₹{target.achieved?.toLocaleString("en-IN")} collected</span>
            <span className="text-white/60">₹{target.remaining?.toLocaleString("en-IN")} to go</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1a1a2e] rounded-2xl p-4">
            <p className="text-white/50 text-xs mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-green-400">₹{(s.total_revenue || 0).toLocaleString("en-IN")}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-2xl p-4">
            <p className="text-white/50 text-xs mb-1">Paid Orders</p>
            <p className="text-2xl font-bold text-white">{s.paid_orders || 0}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-2xl p-4">
            <p className="text-white/50 text-xs mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-white">{s.total_orders || 0}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-2xl p-4">
            <p className="text-white/50 text-xs mb-1">Conversion</p>
            <p className="text-2xl font-bold text-blue-400">{s.conversion_rate || "0%"}</p>
          </div>
        </div>
        <div className="bg-[#1a1a2e] rounded-2xl p-6">
          <h2 className="font-bold mb-4">🧾 Recent Orders</h2>
          <div className="space-y-3">
            {(stats?.recent_orders || []).map((o) => (
              <div key={o.order_id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <div>
                  <p className="font-mono text-xs text-white/50">{o.order_id?.slice(0, 20)}...</p>
                  <p className="text-white/60 text-xs">{o.email_masked}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{o.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${o.status === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{o.status}</span>
                </div>
              </div>
            ))}
            {(!stats?.recent_orders || stats.recent_orders.length === 0) && (
              <p className="text-white/40 text-sm text-center py-4">No orders yet. Share your link to get sales!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
