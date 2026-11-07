/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Velvet obsidian system — never pure black
        ink: {
          950: "#0A0E17", // base background
          900: "#0D1322", // page alt
          800: "#111827", // card surface
          700: "#1A2233", // raised / modal
          600: "#243044", // borders-strong / hover
        },
        navy: { 900: "#0D1322", 800: "#111827", 700: "#1A2233" }, // legacy alias
        gold: { DEFAULT: "#F5B301", dim: "#C98F00", soft: "#FFD34D" },
        mist: {
          100: "#F1F5F9", // primary text (off-white)
          300: "#CBD5E1", // secondary text (sunlight-safe)
          500: "#94A3B8", // muted
          600: "#64748B", // faint
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Noto Sans Devanagari",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        // RPS World Mix design (Option D) — editorial serif headlines
        serif: ["Fraunces", "Georgia", "Times New Roman", "serif"],
      },
      borderRadius: {
        card: "20px",
        sheet: "24px",
      },
      boxShadow: {
        card: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.35)",
        lift: "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.45)",
        glow: "0 0 32px rgba(245,179,1,0.22)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "60%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both",
        popIn: "popIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
        floaty: "floaty 5s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
      },
    },
  },
  plugins: [],
};
