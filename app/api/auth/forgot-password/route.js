import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase-server";

/**
 * POST /api/auth/forgot-password
 * Rate-limited password reset to prevent abuse/spam.
 * Max 3 requests per hour per email+IP combo.
 */

// In-memory rate limit store (resets on deploy, sufficient for abuse prevention)
const attempts = new Map();

function getClientIP(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxAttempts = 3;

  let record = attempts.get(key);
  if (!record || now - record.windowStart > windowMs) {
    record = { count: 0, windowStart: now };
  }

  record.count++;
  attempts.set(key, record);

  // Cleanup old entries periodically
  if (attempts.size > 1000) {
    for (const [k, v] of attempts.entries()) {
      if (now - v.windowStart > windowMs) attempts.delete(k);
    }
  }

  return record.count > maxAttempts;
}

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "valid email required" }, { status: 400 });
    }

    const ip = getClientIP(req);
    const key = `${email.toLowerCase()}:${ip}`;

    if (isRateLimited(key)) {
      return NextResponse.json(
        { error: "too many attempts, try again in an hour" },
        { status: 429 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      // next=/update-password is what routes the post-exchange recovery
      // session to the set-new-password page (see app/update-password).
      // Without it the callback lands on "/" signed-in and no password
      // form is ever shown — the reset could never complete.
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://rpsworld.in"}/auth/callback?next=/update-password`,
    });

    // Always return success to prevent email enumeration
    // (don't reveal if email exists or not)
    if (error) {
      console.error("Password reset error:", error.message);
    }

    return NextResponse.json({ sent: true });
  } catch (e) {
    return NextResponse.json({ error: "request failed" }, { status: 500 });
  }
}
