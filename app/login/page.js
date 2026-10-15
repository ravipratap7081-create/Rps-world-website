"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import { IconShield, IconEye, IconEyeOff, IconCheck } from "../../components/icons";
import { SuccessCheck } from "../../components/Premium";

// Friendly messages for the ?error= codes set by /auth/callback.
// (Previously these failures bounced to a silent login form.)
const ERROR_TEXT = {
  auth_failed:
    "That link couldn't finish signing you in. Your email may already be confirmed — try logging in with your password below.",
  other_browser:
    "The confirmation link opened in a different browser/app, so it couldn't finish automatically. Good news: your email is already confirmed — just log in with your password below.",
  link_expired:
    "This link has expired or was already used. Please create your account again from the login screen.",
  no_code: "Something interrupted the sign-in. Please try logging in.",
};

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(() => ERROR_TEXT[searchParams.get("error")] || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [mode, setMode] = useState("signin"); // signin | signup | forgot | forgot-sent | check-email | new-password | pw-done
  const [newPw, setNewPw] = useState("");

  // Handle password-recovery redirect: Supabase drops a recovery session in the URL hash
  useEffect(() => {
    const supabase = createClient();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("new-password");
        setErr("");
      }
    });
    // Also catch an already-detected recovery session on load
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session && typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
        setMode("new-password");
      }
    });
    // PKCE recovery path: /auth/callback exchanges the code, then lands here
    // with ?flow=recovery. If a session exists, show the new-password form.
    if (searchParams.get("flow") === "recovery") {
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session) {
          setMode("new-password");
          setErr("");
        } else {
          setErr("Open the password-reset link from your email first, then set a new password here.");
        }
      });
    }
    return () => sub.subscription.unsubscribe();
  }, [searchParams]);

  const setNewPassword = async () => {
    setErr("");
    if (newPw.length < 6) {
      setErr("New password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) throw error;
      setMode("pw-done");
    } catch (e) {
      setErr("Could not update password — reopen the link or request a new one.");
    }
    setBusy(false);
  };

  // Google OAuth disabled 2026-10-11 (provider not enabled in Supabase).
  // loginGoogle removed — re-add when OAuth is configured.

  const validEmail = email.includes("@") && email.includes(".");

  const loginEmail = async () => {
    setErr("");
    if (!validEmail || password.length < 6) {
      setErr("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback?next=/sarkari`,
          },
        });
        if (error) throw error;
        setMode("check-email");
        setBusy(false);
        return;
      }
      router.push("/sarkari");
      router.refresh();
    } catch (e) {
      setBusy(false);
      const msg = (e.message || "").toLowerCase();
      if (msg.includes("email not confirmed"))
        setErr("Email not confirmed — open the confirmation link in your inbox, then log in.");
      else if (msg.includes("invalid login credentials"))
        setErr("Wrong email or password — please check again.");
      else if (msg.includes("already registered") || msg.includes("already exists"))
        setErr("This email is already registered — please log in.");
      else if (msg.includes("rate limit"))
        setErr("Too many attempts — please wait a moment and try again.");
      else setErr("Could not log in — check your internet and try again.");
    }
  };

  const sendReset = async () => {
    setErr("");
    if (!validEmail) {
      setErr("Enter your email address first.");
      return;
    }
    setBusy(true);
    try {
      // Rate-limited via server API to prevent abuse
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429)
          throw new Error("Too many attempts — try again in an hour.");
        throw new Error(data.error || "Request failed");
      }
      setMode("forgot-sent");
    } catch (e) {
      const msg = (e.message || "").toLowerCase();
      if (msg.includes("rate limit"))
        setErr("Email limit reached — try again in a little while.");
      else setErr("Could not send reset email — try again.");
    }
    setBusy(false);
  };

  // ---- new-password form (after clicking reset link) ----
  if (mode === "new-password" || mode === "pw-done") {
    return (
      <main className="min-h-screen bg-ink-950 pu-ambient pu-hero-glow px-5 py-10 flex flex-col items-center justify-center relative">
        <div className="animate-fadeUp text-center max-w-xs w-full relative">
          {mode === "pw-done" ? (
            <>
              <div className="mb-5 flex justify-center"><SuccessCheck /></div>
              <h1 className="text-[22px] font-bold text-mist-100">Password changed!</h1>
              <p className="text-mist-300 text-[14px] mt-2 leading-relaxed">
                Now log in with your new password.
              </p>
              <button
                onClick={() => { setMode("signin"); setNewPw(""); setPassword(""); }}
                className="pu-btn-primary pu-press w-full mt-7 py-3.5 text-[15px]"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gold/12 border border-gold/25 text-gold flex items-center justify-center mb-4">
                <IconShield size={30} />
              </div>
              <h1 className="text-[22px] font-bold text-mist-100">Set a new password</h1>
              <p className="text-mist-500 text-[13px] mt-1.5 mb-5">
                Use a strong password with at least 6 characters
              </p>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="New password"
                autoComplete="new-password"
                onKeyDown={(e) => e.key === "Enter" && setNewPassword()}
                className="pu-input"
              />
              <button
                onClick={setNewPassword}
                disabled={busy}
                className="pu-btn-primary pu-press w-full mt-3 py-3.5 text-[15px] disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save Password"}
              </button>
              {err && (
                <p className="text-red-400 text-[12.5px] mt-4 leading-relaxed">{err}</p>
              )}
            </>
          )}
        </div>
      </main>
    );
  }

  // ---- check-email confirmation notice ----
  if (mode === "check-email") {
    return (
      <main className="min-h-screen bg-ink-950 pu-ambient pu-hero-glow px-5 py-10 flex flex-col items-center justify-center relative">
        <div className="animate-fadeUp text-center max-w-xs relative">
          <div className="mb-5 flex justify-center"><SuccessCheck /></div>
          <h1 className="text-[22px] font-bold text-mist-100">Account created!</h1>
          <p className="text-mist-300 text-[14px] mt-2 leading-relaxed">
            <b className="text-mist-100">{email}</b> We\u2019ve sent a confirmation link.\n            Open it, then log in.
          </p>
          <button
            onClick={() => setMode("signin")}
            className="pu-btn-primary pu-press w-full mt-7 py-3.5 text-[15px]"
          >
            Back to Login
          </button>
        </div>
      </main>
    );
  }

  // ---- forgot-sent notice ----
  if (mode === "forgot-sent") {
    return (
      <main className="min-h-screen bg-ink-950 pu-ambient pu-hero-glow px-5 py-10 flex flex-col items-center justify-center relative">
        <div className="animate-fadeUp text-center max-w-xs relative">
          <div className="mb-5 flex justify-center"><SuccessCheck /></div>
          <h1 className="text-[22px] font-bold text-mist-100">Email sent!</h1>
          <p className="text-mist-300 text-[14px] mt-2 leading-relaxed">
            <b className="text-mist-100">{email}</b> We\u2019ve sent a password reset link.\n            Open the link to set a new password.
          </p>
          <button
            onClick={() => setMode("signin")}
            className="pu-btn-primary pu-press w-full mt-7 py-3.5 text-[15px]"
          >
            Back to Login
          </button>
        </div>
      </main>
    );
  }

  const isForgot = mode === "forgot";

  return (
    <main className="min-h-screen bg-ink-950 pu-ambient pu-hero-glow px-5 py-10 flex flex-col items-center justify-center relative">
      <div className="text-center mb-8 animate-fadeUp relative">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gold/12 border border-gold/25 text-gold flex items-center justify-center mb-4">
          <IconShield size={30} />
        </div>
        <h1 className="text-[24px] font-extrabold text-mist-100 tracking-tight">
          {isForgot ? "Forgot password?" : mode === "signup" ? "Create your account" : "Welcome Back"}
        </h1>
        <p className="text-mist-500 text-[13.5px] mt-1.5 max-w-[260px] leading-relaxed">
          {isForgot
            ? "Enter your email — we\u2019ll send a reset link"
            : "Your documents are visible only to you"}
        </p>
      </div>

      <div className="w-full max-w-xs animate-fadeUp relative" style={{ animationDelay: "80ms" }}>
        {!isForgot && (
          <>
            {/* Google OAuth disabled 2026-10-11: provider not enabled in Supabase, user cannot configure it.
                Button hidden to avoid dead-end 400 error. Re-enable when OAuth is configured. */}
            <div className="flex items-center gap-3 w-full mb-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-mist-600 text-[12px]">continue with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </>
        )}

        <div className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="pu-input"
          />
          {!isForgot && (
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 characters)"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                onKeyDown={(e) => e.key === "Enter" && loginEmail()}
                className="pu-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="pu-press absolute right-3 top-1/2 -translate-y-1/2 text-mist-500 p-1"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <IconEyeOff size={19} /> : <IconEye size={19} />}
              </button>
            </div>
          )}

          {isForgot ? (
            <button
              onClick={sendReset}
              disabled={busy}
              className="pu-btn-primary pu-press w-full py-3.5 text-[15px] disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send Reset Link"}
            </button>
          ) : (
            <button
              onClick={loginEmail}
              disabled={busy}
              className="pu-btn-primary pu-press w-full py-3.5 text-[15px] disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Log In with Email" : "Create Account"}
            </button>
          )}

          <div className="flex items-center justify-between mt-1">
            {!isForgot ? (
              <>
                <button
                  onClick={() => { setMode("forgot"); setErr(""); }}
                  className="pu-press text-mist-500 text-[12.5px] font-medium"
                >
                  Forgot password?
                </button>
                <button
                  onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setErr(""); }}
                  className="pu-press text-gold text-[12.5px] font-semibold"
                >
                  {mode === "signin" ? "Create account" : "Log In"}
                </button>
              </>
            ) : (
              <button
                onClick={() => { setMode("signin"); setErr(""); }}
                className="pu-press text-gold text-[12.5px] font-semibold mx-auto"
              >
                ← Back to Login
              </button>
            )}
          </div>
        </div>

        {err && (
          <p className="text-red-400 text-[12.5px] mt-4 text-center leading-relaxed animate-fadeUp">
            {err}
          </p>
        )}

        <p className="text-mist-600 text-[11px] mt-7 text-center leading-relaxed flex items-start justify-center gap-1.5">
          <IconCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />
          <span>{mode === "signup" ? "Creating an account is free. Your coins and documents are visible only to you." : "Logging in creates your secure account. Your coins and documents are visible only to you."}</span>
        </p>
      </div>
    </main>
  );
}

// useSearchParams() needs a Suspense boundary (Next.js static-render rule).
export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
