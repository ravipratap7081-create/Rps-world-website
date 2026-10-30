"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const U = process.env.NEXT_PUBLIC_SUPABASE_URL;
const K = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// GA4 measurement ID (format G-XXXXXXXXXX). Set via env at BUILD time
// (NEXT_PUBLIC_* vars are inlined by Next.js at build). No ID = GA stays off;
// nothing here invents or hardcodes an ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Route last-segment -> tool_name slug, for tool routes only. A "tool_open"
// means SUCCESSFUL ARRIVAL at a tool route (this pathname effect), NOT a tile
// tap — tile taps are "tool_click" (see components/Premium.js ToolTile).
const TOOL_ROUTES = {
  "photo-resizer": "photo_resizer",
  "image-compressor": "image_compressor",
  "pdf-compressor": "pdf_compressor",
  "signature-maker": "signature_maker",
  "up-police-photo": "up_police_photo",
  "exam-photo-signature": "exam_photo_signature",
  "scheme-finder": "scheme_finder",
  checklist: "document_checklist",
  vault: "document_vault",
  links: "sarkari_links",
};

function toolNameForPath(pathname) {
  const seg = (pathname || "/").split("/").filter(Boolean).pop();
  return TOOL_ROUTES[seg] || null;
}

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

// Funnel event, two sinks, both fail-silent (never throws into the page):
//  1. GA4 via window.gtag, when the GA loader below has run.
//  2. Supabase `events` table — NOTE: this table does not exist yet. Its
//     creation SQL is REVIEW-ONLY (see seo-verification-2026-10-27/
//     migration-events-review.sql) and needs approval + a page_views RLS
//     check before it is applied. Until then these writes fail silently
//     and GA still records the event.
function sendEvent(name, params) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  } catch (e) {}
  try {
    send("events", {
      event: name,
      params: params || {},
      page: typeof window !== "undefined" ? window.location.pathname : "/",
    });
  } catch (e) {}
}

export default function Tracker() {
  const pathname = usePathname();

  // GA4 loader FIRST (declared before the pathname effect): the gtag stub
  // must exist before the pathname effect fires on initial mount, or the
  // first manual page_view would be skipped. Only when a real measurement
  // ID is configured at build time. CSP already allows googletagmanager +
  // google-analytics (next.config.js), so no CSP change is needed.
  useEffect(() => {
    if (!GA_ID) return;
    if (document.querySelector("script[data-pu-ga]")) return;
    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      // send_page_view: false is DELIBERATE. GA4's automatic page_view
      // (initial load + history-change tracking) would double-count with
      // the manual page_view in the pathname effect below. With automatic
      // page_view off, the pathname effect is the SINGLE source of GA4
      // page_views: exactly one per route arrival. No other code in the
      // repo sends a GA4 page_view (verified by grep).
      window.gtag("config", GA_ID, { send_page_view: false });
      const s = document.createElement("script");
      s.async = true;
      s.setAttribute("data-pu-ga", "1");
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      document.head.appendChild(s);
    } catch (e) {}
  }, []);

  // Runs exactly once per route arrival (mount + every pathname change):
  // one Supabase page_view, one GA4 page_view, and — only on tool routes —
  // one tool_open (successful arrival, not a click).
  useEffect(() => {
    const path = pathname || "/";
    send("page_views", { page: path, site: typeof window !== "undefined" ? window.location.hostname : null });
    try {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: path,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    } catch (e) {}
    const tool = toolNameForPath(path);
    if (tool) sendEvent("tool_open", { tool_name: tool });
  }, [pathname]);

  useEffect(() => {
    const onInstall = () =>
      send("installs", { platform: navigator.platform || "unknown" });
    window.addEventListener("appinstalled", onInstall);
    window.trackLead = (n, p, t, d) =>
      send("leads", { name: n, phone: p, type: t, data: d || {} });
    // Public funnel-event hook used by shared UI (e.g. ToolTile clicks,
    // tool download buttons, product CTAs). Guarded at every call site;
    // safe to call before GA is configured.
    window.puEvent = (n, p) => sendEvent(n, p);
    return () => {
      window.removeEventListener("appinstalled", onInstall);
      try {
        delete window.puEvent;
      } catch (e) {}
    };
  }, []);

  return null;
}
