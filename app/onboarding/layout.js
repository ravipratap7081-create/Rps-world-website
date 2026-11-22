export const metadata = {
  title: "Welcome — Apna Mode Chuno | ProTools",
  description: "ProTools setup — apna mode chuno: Sarkari, Gen-Z ya Parivaar. 30 second me shuru karo; basic tools bina signup bhi chalenge.",
  openGraph: {
    title: "Welcome — Apna Mode Chuno | ProTools",
    description: "ProTools setup — apna mode chuno: Sarkari, Gen-Z ya Parivaar. 30 second me shuru karo; basic tools bina signup bhi chalenge.",
    url: "https://rpsworld.in/onboarding",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Welcome — Apna Mode Chuno | ProTools", description: "ProTools setup — apna mode chuno: Sarkari, Gen-Z ya Parivaar. 30 second me shuru karo; basic tools bina signup bhi chalenge." },
  alternates: { canonical: "https://rpsworld.in/onboarding" },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
