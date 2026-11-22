import GenzToolPage from "../../../components/tools/GenzToolPage";
import Tool from "./Tool";

export const metadata = {
  title: "Resume Maker — 1 Minute me Professional CV | Gen-Z Tools",
  description:
    "Form bharo, 1 minute me professional resume banao aur PDF download karo. Student-friendly, bilkul free, koi signup nahi.",
  openGraph: {
    title: "Resume Maker — 1 Minute me Professional CV | Gen-Z Tools",
    description:
      "Professional resume in 1 minute — smart template, free, no signup.",
    url: "https://rpsworld.in/genz/resume-maker",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rpsworld.in/genz/resume-maker" },
};

export default function Page() {
  return (
    <GenzToolPage
      title="📝 Resume Maker"
      sub="Smart template se 1 minute me professional CV — details aapke phone me hi rehti hain, kahin upload nahi hoti."
      note="🔒 Aapki details sirf aapke browser me rehti hain — koi server upload ya storage nahi."
    >
      <Tool />
    </GenzToolPage>
  );
}
