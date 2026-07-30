import Hero from "@/components/sections/Hero";
import Valeur from "@/components/sections/Valeur";
import CommentCaMarche from "@/components/sections/CommentCaMarche";
import ChatExamples from "@/components/ChatExamples";
import Clients from "@/components/sections/Clients";
import Tarifs from "@/components/sections/Tarifs";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Valeur />
      <CommentCaMarche />
      <ChatExamples />
      <Clients />
      <Tarifs />
      <Faq />
    </main>
  );
}
