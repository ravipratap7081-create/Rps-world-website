import HomeClient from "./HomeClient";

export const metadata = {
  title: "ProTools — Free Photo Resizer, PDF Compressor & Sarkari Tools",
  description: "ProTools — free photo resizer, PDF compressor aur sarkari form tools. Passport photo 20KB, PDF 100KB, scheme finder aur document vault — bina signup.",
  openGraph: {
    title: "ProTools — Free Photo Resizer, PDF Compressor & Sarkari Tools",
    description: "ProTools — free photo resizer, PDF compressor aur sarkari form tools. Passport photo 20KB, PDF 100KB, scheme finder aur document vault — bina signup.",
    url: "https://rps-world-website.onrender.com/",
    type: "website",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ProTools — Free Photo Resizer, PDF Compressor & Sarkari Tools", description: "ProTools — free photo resizer, PDF compressor aur sarkari form tools. Passport photo 20KB, PDF 100KB, scheme finder aur document vault — bina signup." },
  alternates: { canonical: "https://rps-world-website.onrender.com/" },
};

export default function Home() {
  return <HomeClient />;
}
