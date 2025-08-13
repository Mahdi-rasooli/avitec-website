import ScrollHeader from "@/components/header";
import VideoMaskTransition from "@/components/MaskVideo";
import Scroll from "@/components/refinedHeroScroll";
import WorkSection from "@/components/workSection";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      <Scroll />
      <VideoMaskTransition />
      <WorkSection />
    </div>
  );
}
