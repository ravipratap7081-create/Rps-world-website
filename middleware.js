import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // DUPLICATE-HOST CANONICAL (12 Nov 2026, audit P1-8; Round 10: Render is
  // canonical). The Vercel mirror (pro-universe-nine.vercel.app) 308s every
  // page to the same path on Render, so search engines see one host.
  // Canonical <link> tags already point at Render on both hosts; this
  // redirect closes the gap for any page without one. Only the exact mirror
  // host redirects — Render, localhost and Vercel preview hosts are untouched.
  if (request.nextUrl.hostname === "pro-universe-nine.vercel.app") {
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
