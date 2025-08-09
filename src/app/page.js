import ScrollHeader from "@/components/header";
// import CoverScroll from "@/components/CoverScroll";
import Section from "@/components/nextSection";
import VideoMaskTransition from "@/components/MaskVideo";
import HeroScroll from "@/components/heroScroll";
import Scroller from "@/components/scroller";
import CoverScroll from "@/components/CoverScroll";
import Scroll from "@/components/refinedHeroScroll";
import HorizontalHero from "@/components/test";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      <Scroll />
      <VideoMaskTransition />
    </div>
  );
}
