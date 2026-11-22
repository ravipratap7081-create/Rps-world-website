export const metadata = {
  title: "Parivaar Mode — Ghar ke Tools | ProTools",
  description: "Parivaar Mode — ghar ke kaam ek jagah: savings, kharcha, documents aur sarkari kaam. Free tools, Hindi me.",
  openGraph: {
    title: "Parivaar Mode — Ghar ke Tools | ProTools",
    description: "Parivaar Mode — ghar ke kaam ek jagah: savings, kharcha, documents aur sarkari kaam. Free tools, Hindi me.",
    url: "https://rpsworld.in/parivaar",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Parivaar Mode — Ghar ke Tools | ProTools", description: "Parivaar Mode — ghar ke kaam ek jagah: savings, kharcha, documents aur sarkari kaam. Free tools, Hindi me." },
  alternates: { canonical: "https://rpsworld.in/parivaar" },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
