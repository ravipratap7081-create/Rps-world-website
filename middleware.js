import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // DUPLICATE-HOST CANONICAL (12 Nov 2026, audit P1-8; Round 10: Render is
  // canonical). The Vercel mirror (pro-universe-nine.vercel.app) 308s every
  // page to the same path on Render, so search engines see one host.
  // 22 Nov 2026 audit: the Render default host (rps-world-website.onrender.com)
  // serves the SAME app with HTTP 200 and is indexed by Google with a STALE
  // "Velocity Institute — NEET / JEE" title for the root URL. It 308s too now.
  // Canonical <link> tags already point at Render on both hosts; this
  // redirect closes the gap for any page without one. Only the exact mirror
  // host redirects — Render, localhost and Vercel preview hosts are untouched.
  //
  // HOST CHECK — Host header, NOT request.nextUrl.hostname (fix 22 Nov 2026):
  // temp debug deploy proved that on Render's Node server nextUrl.hostname is
  // "localhost" even when the Host header is rps-world-website.onrender.com,
  // so the old nextUrl check never matched and onrender served 200.
  // nextUrl.hostname stays as a fallback (correct on Vercel).
  const hosts = new Set([
    (request.headers.get("host") || "").split(":")[0].toLowerCase(),
    request.nextUrl.hostname,
  ]);
  if (
    hosts.has("pro-universe-nine.vercel.app") ||
    hosts.has("rps-world-website.onrender.com")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "rpsworld.in";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — keeps auth alive across requests
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icon-.*\\.png|tools/.*).*)"],
};
