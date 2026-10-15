"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MODES = ["sarkari", "genz", "parivaar"];

export default function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const m = localStorage.getItem("pro-mode");
      if (m && MODES.includes(m)) {
        router.replace("/" + m);
        return;
      }
    } catch (e) {}
    setChecked(true);
    router.replace("/onboarding");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-navy-900">
      <p className="text-gold text-lg animate-pulse">
        {checked ? "Onboarding…" : "Pro Universe…"}
      </p>
    </main>
  );
}
