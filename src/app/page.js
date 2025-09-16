import ScrollHeader from "@/components/header";
import TestHero from "@/components/heroTest";
import Projects from "@/components/Projects";
import NextSection from "@/components/nextSection";
import PinnedESG from "@/components/PinnedESG";
import TestVideoMask from "@/components/testMask";
import ESGsection from "@/components/test/ESGtest";
import WorkSection from "@/components/ScrollPinnedCards";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      <TestHero /> 
      <Projects />
      <NextSection />
      <WorkSection />
      {/* <ESGsection /> */}
      <PinnedESG />
      <TestVideoMask />
    </div>
  );
}