"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * /reset-password — friendly alias for the set-new-password page.
 * Nothing links here today, but users (and old reset emails) guess this
 * URL; send them to the real page instead of a 404.
 *
 * NOTE (10 Nov 2026 audit): the previous version used server-side
 * redirect() here. Next prerenders this page statically and the live
 * response was a 307 WITHOUT a Location header on both hosts, so browsers
 * went nowhere. The redirect now also lives in next.config.js redirects()
 * (the /refund pattern, which works). This client-side replace is the
 * belt-and-braces fallback if the config redirect is ever bypassed, plus
 * a visible link so the page is never a blank dead end.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/update-password");
  }, [router]);
  return (
    <main className="min-h-screen bg-[#0A0616] text-white flex items-center justify-center px-4">
      <p className="text-white/70 text-[15px]">
        Password reset page par le ja rahe hain…{" "}
        <a href="/update-password" className="text-[#E3B34B] underline">
          Yahan click karein
        </a>
      </p>
    </main>
  );
}
