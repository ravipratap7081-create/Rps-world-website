"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "../lib/supabase-client";

export function useCoins() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  // Shared balance cache — all useCoins instances stay in sync
  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/coins/balance");
      if (!mounted.current) return;
      if (r.status === 401) {
        setUser(null);
        setBalance(null);
        if (typeof window !== "undefined") {
          window.__pu_balance = null;
          window.dispatchEvent(new CustomEvent("pu-balance", { detail: null }));
        }
        return;
      }
      const j = await r.json();
      if (typeof j.balance === "number") {
        setBalance(j.balance);
        if (typeof window !== "undefined") {
          window.__pu_balance = j.balance;
          window.dispatchEvent(new CustomEvent("pu-balance", { detail: j.balance }));
        }
      }
    } catch (e) {
      // network error — keep previous balance, don't wipe
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    const supabase = createClient();
    let cancelled = false;

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (cancelled || !mounted.current) return;
        setUser(session?.user || null);
        if (session?.user) {
          await refresh();
        }
      } catch (e) {
        // session read failed — stay logged out
      }
      if (!cancelled && mounted.current) setLoading(false);
    };
    init();

    // Listen for balance updates from other useCoins instances
    const onBalanceSync = (e) => {
      if (!cancelled && mounted.current && typeof e.detail === "number") {
        setBalance(e.detail);
      } else if (!cancelled && mounted.current && e.detail === null) {
        setBalance(null);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("pu-balance", onBalanceSync);
      // Pick up cached balance immediately if available
      if (typeof window.__pu_balance === "number") {
        setBalance(window.__pu_balance);
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (cancelled || !mounted.current) return;
        if (event === "INITIAL_SESSION") return; // init() already handled
        setUser(session?.user || null);
        if (session?.user) {
          await refresh();
        } else {
          setBalance(null);
        }
      }
    );

    return () => {
      cancelled = true;
      mounted.current = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("pu-balance", onBalanceSync);
      }
      sub.subscription.unsubscribe();
    };
  }, [refresh]);

  const earn = useCallback(async (action) => {
    try {
      const r = await fetch("/api/coins/earn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const j = await r.json();
      if (typeof j.balance === "number") {
        setBalance(j.balance);
        if (typeof window !== "undefined") {
          window.__pu_balance = j.balance;
          window.dispatchEvent(new CustomEvent("pu-balance", { detail: j.balance }));
        }
      }
      return j;
    } catch (e) { return null; }
  }, []);

  const spend = useCallback(async (reward) => {
    try {
      const r = await fetch("/api/coins/spend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reward }),
      });
      const j = await r.json();
      if (typeof j.balance === "number") {
        setBalance(j.balance);
        if (typeof window !== "undefined") {
          window.__pu_balance = j.balance;
          window.dispatchEvent(new CustomEvent("pu-balance", { detail: j.balance }));
        }
      }
      return j;
    } catch (e) { return null; }
  }, []);

  const logout = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setBalance(null);
  }, []);

  return { user, balance, loading, refresh, earn, spend, logout, loggedIn: !!user };
}
