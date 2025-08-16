import ScrollHeader from "@/components/header";
import VideoMaskTransition from "@/components/MaskVideo";
import Scroll from "@/components/refinedHeroScroll";
import WorkSection from "@/components/workSection";
import SecondCompo from "@/components/secondCompo";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      <Scroll />
      <VideoMaskTransition />
      {/* <WorkSection /> */}
      <SecondCompo />
      <ContactSection />
    </div>
  );
}
