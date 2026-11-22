import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // TEMP-DEBUG 22 Nov 2026 — Patch 1 (onrender 308) diagnosis ONLY.
  // Middleware runs (build log: "ƒ Middleware 87.3 kB") but onrender still
  // serves 200, so we log + header exactly what hostname it sees.
  // REVERT this whole block after the root cause is found.
  const dbgHost = request.headers.get("host") || "";
  const dbgXfh = request.headers.get("x-forwarded-host") || "";
  const dbgNextHost = request.nextUrl.hostname;
  const dbgPath = request.nextUrl.pathname;
  console.log(
    "[MW-DEBUG]",
    JSON.stringify({ host: dbgHost, xfh: dbgXfh, nextUrlHost: dbgNextHost, path: dbgPath })
  );
  const dbgVal = `host=${dbgHost};nextUrl=${dbgNextHost};path=${dbgPath}`;

  // DUPLICATE-HOST CANONICAL (12 Nov 2026, audit P1-8; Round 10: Render is
  // canonical). The Vercel mirror (pro-universe-nine.vercel.app) 308s every
  // page to the same path on Render, so search engines see one host.
  // 22 Nov 2026 audit: the Render default host (rps-world-website.onrender.com)
  // serves the SAME app with HTTP 200 and is indexed by Google with a STALE
  // "Velocity Institute — NEET / JEE" title for the root URL. It 308s too now.
  // Canonical <link> tags already point at Render on both hosts; this
  // redirect closes the gap for any page without one. Only the exact mirror
  // host redirects — Render, localhost and Vercel preview hosts are untouched.
  if (
    request.nextUrl.hostname === "pro-universe-nine.vercel.app" ||
    request.nextUrl.hostname === "rps-world-website.onrender.com"
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "rpsworld.in";
    url.port = "";
    const redir = NextResponse.redirect(url, 308);
    redir.headers.set("x-mw-debug", dbgVal);
    return redir;
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
  response.headers.set("x-mw-debug", dbgVal);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icon-.*\\.png|tools/.*).*)"],
};
