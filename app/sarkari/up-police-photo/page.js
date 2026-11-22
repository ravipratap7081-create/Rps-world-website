import Tool from "./Tool";

export const metadata = {
  title: "UP Police Photo Resizer — 50KB",
  description:
    "UP Police bharti form ke liye photo 50KB ke andar ready karo — 600 × 760 px JPG. Photo browser me hi process hoti hai, koi upload nahi.",
  openGraph: {
    title: "UP Police Photo Resizer — 50KB",
    description:
      "UP Police bharti form ke liye photo 50KB ke andar ready karo — 600 × 760 px JPG. Photo browser me hi process hoti hai, koi upload nahi.",
    url: "https://rpsworld.in/sarkari/up-police-photo",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rpsworld.in/sarkari/up-police-photo" },
};

export default function Page() {
  return (
    <>
      <Tool />
      <div className="px-4 pb-8">
        <div className="max-w-md mx-auto rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-[13px] leading-snug text-amber-100">
            ⚠️ <b>Spec note — notification hi final hai:</b> ye tool photo ko
            600 × 760 px JPG me 50KB ke andar laata hai. Exam preset page par
            UP Police ke liye 35 × 45 mm (413 × 531 px), 20–50KB bhi darj hai —
            dono figures alag hain, isliye apne bharti ke official notification
            se final spec zaroor milao. Notification me alag size ho to{" "}
            <a href="/sarkari/image-compressor" className="underline font-semibold">Image Compressor me custom target set karo</a>{" "}
            ya <a href="/sarkari/exam-photo-signature" className="underline font-semibold">Exam Photo–Signature preset</a> use
            karo. Page note: 1 Nov 2026.
          </p>
        </div>
      </div>
      <div className="px-4 pb-8 text-center">
        <a href="/blog/up-police-photo-size" className="text-gold underline text-[13px]">📖 Guide: UP Police Photo Size 2026 — preset, spec notes &amp; rejection fixes</a>
      </div>
    </>
  );
}
