import "./globals.css";
import Tracker from "../components/Tracker";
import ConsentBanner from "../components/ConsentBanner";
import AuthCodeForwarder from "../components/AuthCodeForwarder";
import RpsNav from "../components/RpsNav";
import RpsFab from "../components/RpsFab";

export const metadata = {
  metadataBase: new URL("https://rpsworld.in"),
  title: "ProTools — Free Photo Resizer, PDF Compressor & Sarkari Tools",
  description: "ProTools — free photo resizer, PDF compressor aur sarkari form tools. Passport photo 20KB, PDF 100KB, scheme finder aur document vault — bina signup.",
  keywords: "photo resizer, passport photo 20kb, pdf compressor, pdf compress 100kb, sarkari form tools, government scheme finder, document vault, free online tools india",
  manifest: "/manifest.json",
  themeColor: "#0A0E17",
  icons: { icon: [{ url: "/favicon.png", sizes: "96x96", type: "image/png" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
  openGraph: {
    title: "ProTools — Free Photo Resizer, PDF Compressor & Sarkari Tools",
    description: "ProTools — free photo resizer, PDF compressor aur sarkari form tools. Passport photo 20KB, PDF 100KB, scheme finder aur document vault — bina signup.",
    type: "website",
    url: "https://rpsworld.in",
    images: [
      {
        url: "/og-rps-world.png",
        width: 1200,
        height: 630,
        alt: "RPS World",
      },
        ],
    videos: [
      {
        url: "https://rpsworld.in/rps-world-promo.mp4",
        secureUrl: "https://rpsworld.in/rps-world-promo.mp4",
        type: "video/mp4",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProTools — Free Photo Resizer, PDF Compressor & Sarkari Tools",
    description: "ProTools — free photo resizer, PDF compressor aur sarkari form tools. Passport photo 20KB, PDF 100KB, scheme finder aur document vault — bina signup.",
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&display=swap"
          rel="stylesheet"
        />
        {/* Aurora Glass v2 fonts (ADDED 22 Nov 2026 — existing font links above unchanged) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-site-verification" content="xsixEtYT0sOZJIDlBMKAYW6sFpXU6CscIraGkpIZS-s" />
        <meta name="google-site-verification" content="N4WjKoZHNw1SbPDbHBRyEJcri4vcK6V9cZW7XtmCCr8" />
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
        <ConsentBanner />
        <AuthCodeForwarder />
        <RpsNav />
        {children}
        <RpsFab />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}`,
          }}
        />
        {/*
          MICROSOFT CLARITY — CONSENT-GATED (project z9hgilk6b4, RPS World).
          Loads ONLY when localStorage 'rps-consent-v1' parses with
          analytics:true (and DNT off). No consent banner ships yet, so
          this stays dormant until consent exists — exactly like the
          ProTools beacon. NEVER load Clarity unconditionally.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var c=null;try{c=JSON.parse(localStorage.getItem('rps-consent-v1')||'null')}catch(e){}if(c&&c.analytics===true&&navigator.doNotTrack!=='1'&&window.doNotTrack!=='1'){window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};var t=document.createElement('script');t.async=1;t.src='https://www.clarity.ms/tag/z9hgilk6b4';var y=document.getElementsByTagName('script')[0];y.parentNode.insertBefore(t,y);try{window.clarity('consentv2',{ad_Storage:'granted',analytics_Storage:'granted'})}catch(e){}}}catch(e){}`,
          }}
        />
        {/*
          RPS COPY GUARD — site-wide (8 Nov 2026, funnel fixes). Same script
          as the demo pages: deters casual copying (right-click, selection,
          drag, shortcuts). Input fields / textareas / contentEditable are
          exempt, and copy buttons keep working — they copy via the
          clipboard API, not via page selection. NEVER remove without
          Ravi's Haan.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function inField(t){return !!t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);}document.addEventListener('contextmenu',function(e){e.preventDefault();},false);document.addEventListener('selectstart',function(e){if(!inField(e.target))e.preventDefault();},false);document.addEventListener('dragstart',function(e){e.preventDefault();},false);document.addEventListener('copy',function(e){if(!inField(e.target))e.preventDefault();},false);document.addEventListener('keydown',function(e){var mod=e.ctrlKey||e.metaKey;if(e.key==='F12'){e.preventDefault();e.stopPropagation();return;}if(mod&&e.shiftKey&&['I','J','C'].indexOf((e.key||'').toUpperCase())>=0){e.preventDefault();e.stopPropagation();return;}if(mod&&['c','x','u','s','p'].indexOf((e.key||'').toLowerCase())>=0&&!inField(e.target)){e.preventDefault();e.stopPropagation();return;}},true);})();`,
          }}
        />
      </body>
    </html>
  );
}
