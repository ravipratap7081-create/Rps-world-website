import GenzToolPage from "../../../components/tools/GenzToolPage";
import Tool from "./Tool";

export const metadata = {
  title: "AI Doubt Solver — Photo se Sawal Pucho | Gen-Z Tools",
  description:
    "Question ki photo lo ya sawal type karo — AI Hindi me step-by-step solution deta hai (Maths, Science, GK). Photo aapke phone me hi padhi jati hai; sawal ka jawab free AI service se aata hai.",
  openGraph: {
    title: "AI Doubt Solver — Photo se Sawal Pucho | Gen-Z Tools",
    description:
      "Snap a photo, get step-by-step solution. Photo phone me hi padhi jati hai; jawab free AI service se aata hai.",
    url: "https://rps-world-website.onrender.com/genz/doubt-solver",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <GenzToolPage
      title="📸 AI Doubt Solver"
      sub="Photo se sawal padho ya question type karo — AI step-by-step solution dega (Maths, Science, GK...)."
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
