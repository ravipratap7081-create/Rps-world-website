import Tool from "./Tool";

export const metadata = {
  title: "UP Police Photo Resizer — 50KB",
  description:
    "UP Police bharti form ke liye photo 50KB ke andar ready karo — 600 × 760 px JPG. Photo browser me hi process hoti hai, koi upload nahi.",
  openGraph: {
    title: "UP Police Photo Resizer — 50KB",
    description:
      "UP Police bharti form ke liye photo 50KB ke andar ready karo — 600 × 760 px JPG. Photo browser me hi process hoti hai, koi upload nahi.",
    url: "https://rps-world-website.onrender.com/sarkari/up-police-photo",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <Tool />;
}
