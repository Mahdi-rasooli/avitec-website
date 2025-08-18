import Scroll from "@/components/refinedHeroScroll";
import BeliefSection from "@/components/imagesGallery";
import SecondCompo from '@/components/secondCompo'
import ContactSection from "@/components/ContactSection";
import VideoMaskTransition from "@/components/MaskVideo";
import MaskVideo from "@/components/testMaskVideo";

export default function Home() {
  return (
    <div>
      {/* <ScrollHeader /> */}
      <Scroll />
      <BeliefSection />
      {/* <ModernGalleryCarousel /> */}
      {/* <MaskVideo /> */}
      <VideoMaskTransition />
      {/* <WorkSection /> */}
      <SecondCompo />
      <ContactSection />
    </div>
  );
}
