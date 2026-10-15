"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const U = process.env.NEXT_PUBLIC_SUPABASE_URL;
const K = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function send(table, row) {
  if (!U || !K) return; // tracking disabled without env config
  try {
    fetch(U + "/rest/v1/" + table, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: K,
        Authorization: "Bearer " + K,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {}
}

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    send("page_views", { page: pathname || "/" });
  }, [pathname]);

  useEffect(() => {
    const onInstall = () =>
      send("installs", { platform: navigator.platform || "unknown" });
    window.addEventListener("appinstalled", onInstall);
    window.trackLead = (n, p, t, d) =>
      send("leads", { name: n, phone: p, type: t, data: d || {} });
    return () => window.removeEventListener("appinstalled", onInstall);
  }, []);

  return null;
}
