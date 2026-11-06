export const metadata = {
  title: "Login | ProTools",
  description: "ProTools account me login karo — coins, Pro aur saved tools ke liye. Email se secure sign-in, OTP verification ke saath.",
  openGraph: {
    title: "Login | ProTools",
    description: "ProTools account me login karo — coins, Pro aur saved tools ke liye. Email se secure sign-in, OTP verification ke saath.",
    url: "https://rps-world-website.onrender.com/login",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Login | ProTools", description: "ProTools account me login karo — coins, Pro aur saved tools ke liye. Email se secure sign-in, OTP verification ke saath." },
  alternates: { canonical: "https://rps-world-website.onrender.com/login" },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
