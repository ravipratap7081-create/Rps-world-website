import GenzToolPage from "../../../components/tools/GenzToolPage";
import Tool from "./Tool";

export const metadata = {
  title: "AI Doubt Solver — Photo se Sawal Pucho | Gen-Z Tools",
  description:
    "Question ki photo lo ya sawal type karo — photo se text padhne ki koshish hoti hai, aur AI Hindi me step-by-step solution deta hai (Maths, Science, GK). Agar photo se text clear na aaye to sawal type kar do; sawal ka jawab free AI service se aata hai.",
  openGraph: {
    title: "AI Doubt Solver — Photo se Sawal Pucho | Gen-Z Tools",
    description:
      "Snap a photo or type the question. Photo text is read on your phone when possible; if it is not clear, type the question. Answer comes from a free AI service.",
    url: "https://rps-world-website.onrender.com/genz/doubt-solver",
    images: [{ url: "/og-sarkari.png", width: 1200, height: 630 }],
  },
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
