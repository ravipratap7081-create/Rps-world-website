import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";

/**
 * GET /auth/callback — completes Supabase PKCE auth handoffs
 * (signup confirmation, password recovery, OAuth).
 *
 * Every failure redirects to /login with a descriptive `error` code that the
 * login page displays — previously failures bounced to a silent login form
 * ("app kaam nahi kar raha" from the user's perspective).
 *
 * Error codes consumed by app/login/page.js:
 *   auth_failed   — generic exchange failure
 *   other_browser — PKCE code verifier missing (link opened in a different
 *                   browser/app). Email is already confirmed server-side,
 *                   so the user can simply log in with their password.
 *   link_expired  — token expired or already used
 *   no_code       — reached here without any auth payload
 */
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const goTrueError = searchParams.get("error");
  const goTrueDesc = (searchParams.get("error_description") || "").toLowerCase();

  const fail = (errorCode) =>
    NextResponse.redirect(`${origin}/login?error=${errorCode}`);

  // GoTrue itself rejected the link (expired/used token etc.) before we ran.
  if (goTrueError) {
    if (goTrueDesc.includes("expired")) return fail("link_expired");
    return fail("auth_failed");
  }

  if (!code) return fail("no_code");

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const msg = (error.message || "").toLowerCase();
    if (msg.includes("code verifier") || msg.includes("pkce")) {
      return fail("other_browser");
    }
    if (msg.includes("expired")) return fail("link_expired");
    return fail("auth_failed");
  }

  return NextResponse.redirect(`${origin}${next}`);
}
