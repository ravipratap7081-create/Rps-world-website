import "./globals.css";
import Tracker from "../components/Tracker";
import AuthCodeForwarder from "../components/AuthCodeForwarder";

export const metadata = {
  metadataBase: new URL("https://rps-world-website.onrender.com"),
  title: "Pro Universe — Free Photo Resizer, PDF Compressor & Sarkari Tools",
  description: "Free online tools: resize passport photos to 20KB, compress PDFs to 100KB, check which government schemes fit you, secure document vault. No signup needed for basic tools.",
  keywords: "photo resizer, passport photo 20kb, pdf compressor, pdf compress 100kb, sarkari form tools, government scheme finder, document vault, free online tools india",
  manifest: "/manifest.json",
  themeColor: "#0A0E17",
  openGraph: {
    title: "Pro Universe — Free Sarkari & AI Tools",
    description: "Resize photos, compress PDFs, find schemes, secure vault — all free!",
    type: "website",
    url: "https://rps-world-website.onrender.com",
    images: [
      {
        url: "/og-sarkari.png",
        width: 1200,
        height: 630,
        alt: "Pro Universe — Free Sarkari Tools",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#0A0E17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-site-verification" content="xsixEtYT0sOZJIDlBMKAYW6sFpXU6CscIraGkpIZS-s" />
        {/*
          GOOGLE ADSENSE — READY TO ACTIVATE
          To enable: replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense publisher ID,
          then uncomment the script tag below and the <AdSlot> usages.
          Do NOT apply until the site has Privacy Policy, Terms, Contact & About pages (done).
        */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className="bg-ink-950 min-h-screen">
        <Tracker />
        <AuthCodeForwarder />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}`,
          }}
        />
      </body>
    </html>
  );
}
