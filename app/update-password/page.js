"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import { IconShield, IconEye, IconEyeOff, IconCheck } from "../../components/icons";
import { SuccessCheck } from "../../components/Premium";

/**
 * /update-password — set a new password after a reset link.
 *
 * Reached via /auth/callback?next=/update-password after the PKCE code
 * exchange, which leaves a live (recovery) session in cookies. With a
 * session we show the form and save via supabase.auth.updateUser().
 * Without one, the link was expired/used/opened elsewhere — show a clear
 * dead-end-free state that points back to the forgot-password flow
 * instead of 404ing (the pre-fix behaviour).
 */
function UpdatePassword() {
  const router = useRouter();
  const [state, setState] = useState("checking"); // checking | form | done | invalid
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (alive) setState(data?.session ? "form" : "invalid");
    });
    // A recovery handoff can also complete just after mount.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) setState("form");
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const save = async () => {
    setErr("");
    if (pw.length < 6) {
      setErr("New password must be at least 6 characters.");
      return;
    }
    if (pw !== pw2) {
      setErr("Passwords don't match — type the same password twice.");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) throw error;
      // Password is set — end the recovery session so the user signs in
      // fresh with the new password.
      await supabase.auth.signOut();
      setState("done");
    } catch (e) {
      setErr("Could not update password — the link may have expired. Request a new reset link.");
    }
    setBusy(false);
  };

  return (
    <main className="min-h-screen bg-ink-950 pu-ambient pu-hero-glow px-5 py-10 flex flex-col items-center justify-center relative">
      <div className="animate-fadeUp text-center max-w-xs w-full relative">
        {state === "checking" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gold/12 border border-gold/25 text-gold flex items-center justify-center mb-4">
              <IconShield size={30} />
            </div>
            <h1 className="text-[22px] font-bold text-mist-100">Checking your link…</h1>
            <p className="text-mist-500 text-[13px] mt-1.5">One moment.</p>
          </>
        )}

        {state === "invalid" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gold/12 border border-gold/25 text-gold flex items-center justify-center mb-4">
              <IconShield size={30} />
            </div>
            <h1 className="text-[22px] font-bold text-mist-100">This link has expired</h1>
            <p className="text-mist-300 text-[14px] mt-2 leading-relaxed">
              The password-reset link has expired or was already used. Request a fresh
              link and open it right away.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="pu-btn-primary pu-press w-full mt-7 py-3.5 text-[15px]"
            >
              Get a New Reset Link
            </button>
            <p className="text-mist-500 text-[12.5px] mt-4 leading-relaxed">
              On the login screen, tap <b className="text-mist-300">Forgot password?</b> and
              enter your email.
            </p>
          </>
        )}

        {state === "done" && (
          <>
            <div className="mb-5 flex justify-center"><SuccessCheck /></div>
            <h1 className="text-[22px] font-bold text-mist-100">Password changed!</h1>
            <p className="text-mist-300 text-[14px] mt-2 leading-relaxed">
              Now log in with your new password.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="pu-btn-primary pu-press w-full mt-7 py-3.5 text-[15px]"
            >
              Log In
            </button>
          </>
        )}

        {state === "form" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gold/12 border border-gold/25 text-gold flex items-center justify-center mb-4">
              <IconShield size={30} />
            </div>
            <h1 className="text-[22px] font-bold text-mist-100">Set a new password</h1>
            <p className="text-mist-500 text-[13px] mt-1.5 mb-5">
              Use a strong password with at least 6 characters
            </p>
            <div className="flex flex-col gap-3 text-left">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="New password"
                  autoComplete="new-password"
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
              <input
                type={showPw ? "text" : "password"}
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                onKeyDown={(e) => e.key === "Enter" && save()}
                className="pu-input"
              />
              <button
                onClick={save}
                disabled={busy}
                className="pu-btn-primary pu-press w-full py-3.5 text-[15px] disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save Password"}
              </button>
            </div>
            {err && (
              <p className="text-red-400 text-[12.5px] mt-4 leading-relaxed">{err}</p>
            )}
            <p className="text-mist-600 text-[11px] mt-7 leading-relaxed flex items-start justify-center gap-1.5">
              <IconCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Your documents and coins stay visible only to you.</span>
            </p>
          </>
        )}
      </div>
    </main>
  );
}

// useSearchParams-free, but keep the same Suspense pattern as /login.
export default function UpdatePasswordPage() {
  return (
    <Suspense>
      <UpdatePassword />
    </Suspense>
  );
}
