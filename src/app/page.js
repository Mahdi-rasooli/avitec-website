import Scroll from "@/components/refinedHeroScroll";
import BeliefSection from "@/components/imagesGallery";
import SecondCompo from '@/components/ScrollPinnedCards'
import ContactSection from "@/components/ContactSection";
import VideoMaskTransition from "@/components/MaskVideo";
import MaskVideo from "@/components/testMaskVideo";
import HomeSections from "@/components/overlayWrapper";

export default function Home() {
  return (
    <div>
      {/* <ScrollHeader /> */}
      <Scroll />
      <BeliefSection />
      {/* <HomeSections /> */}
      {/* <ModernGalleryCarousel /> */}
      <VideoMaskTransition />
      {/* <WorkSection /> */}
      <SecondCompo />
      {/* <MaskVideo /> */}
      <ContactSection />
    </div>
  );
}
