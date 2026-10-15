"use client";
import { useEffect } from "react";

/**
 * AuthCodeForwarder — rescues Supabase auth handoffs that land on the wrong URL.
 *
 * Root cause (verified 2026-10-11): Supabase drops our `emailRedirectTo`
 * (/auth/callback?next=...) because it is not in the dashboard's Redirect-URL
 * allowlist, and falls back to the project Site URL (/). GoTrue still appends
 * the PKCE `?code=` (or `?error=`) to that fallback URL. Without this
 * forwarder the homepage discards the query via router.replace("/onboarding")
 * and no session is ever created — the "login me full issue hai" bug.
 *
 * Runs on every page (mounted in RootLayout, before page content so its
 * effect fires first). Uses window.location.replace — immediate, no race
 * with page-level redirects.
 */
export default function AuthCodeForwarder() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const path = url.pathname;
      const hasCode = url.searchParams.has("code");
      const hasError = url.searchParams.has("error");
      if (!hasCode && !hasError) return;
      if (path.startsWith("/auth/callback")) return; // already at the handler
      if (path === "/login" && hasError && !hasCode) return; // login page displays it
      const target = hasCode ? "/auth/callback" + url.search : "/login" + url.search;
      window.location.replace(target);
    } catch {
      /* never break page render for an auth nicety */
    }
  }, []);
  return null;
}
