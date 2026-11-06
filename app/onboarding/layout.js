export const metadata = {
  title: "Welcome — Apna Mode Chuno | ProTools",
  description: "ProTools setup — apna mode chuno: Sarkari, Gen-Z ya Parivaar. 30 second me shuru karo; basic tools bina signup bhi chalenge.",
  openGraph: {
    title: "Welcome — Apna Mode Chuno | ProTools",
    description: "ProTools setup — apna mode chuno: Sarkari, Gen-Z ya Parivaar. 30 second me shuru karo; basic tools bina signup bhi chalenge.",
    url: "https://rps-world-website.onrender.com/onboarding",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Welcome — Apna Mode Chuno | ProTools", description: "ProTools setup — apna mode chuno: Sarkari, Gen-Z ya Parivaar. 30 second me shuru karo; basic tools bina signup bhi chalenge." },
  alternates: { canonical: "https://rps-world-website.onrender.com/onboarding" },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
