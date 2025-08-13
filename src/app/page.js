import ScrollHeader from "@/components/header";
import VideoMaskTransition from "@/components/MaskVideo";
import Scroll from "@/components/refinedHeroScroll";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      <Scroll />
      <VideoMaskTransition />
    </div>
  );
}
