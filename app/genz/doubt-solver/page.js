import GenzToolPage from "../../../components/tools/GenzToolPage";
import Tool from "./Tool";

export const metadata = {
  title: "AI Doubt Solver — Photo se Sawal Pucho | Gen-Z Tools",
  description:
    "Sawal ki photo lo ya type karo — AI Hindi me step-by-step solution deta hai: Maths, Science, GK. Free, bina signup.",
  openGraph: {
    title: "AI Doubt Solver — Photo se Sawal Pucho | Gen-Z Tools",
    description:
      "Snap a photo or type the question. Photo text is read on your phone when possible; if it is not clear, type the question. Answer comes from a free AI service.",
    url: "https://rpsworld.in/genz/doubt-solver",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://rpsworld.in/genz/doubt-solver" },
};

export default function Page() {
  return (
    <GenzToolPage
      title="📸 AI Doubt Solver"
      sub="Photo se text padhne ki koshish karo ya question type karo — AI step-by-step solution dega (Maths, Science, GK...)."
      note={
        <>
          🔒 Photo sirf aapke phone/browser me padhi jati hai — koi server upload nahi. Jawab ke
          liye aapka sawal ek <b>free bahari AI service</b> ko bheja jata hai, isliye
          personal/confidential jaankari sawal me mat likho.
        </>
      }
    >
      <Tool />
    </GenzToolPage>
  );
}
