import Scroll from "@/components/refinedHeroScroll";
import BeliefSection from "@/components/imagesGallery";
import SecondCompo from '@/components/secondCompo'
import ContactSection from "@/components/ContactSection";
import VideoMaskTransition from "@/components/MaskVideo";

export default function Home() {
  return (
    <div>
      {/* <ScrollHeader /> */}
      <Scroll />
      <BeliefSection />
      {/* <ModernGalleryCarousel /> */}
      {/* <VideoMaskTransition /> */}
      {/* <WorkSection /> */}
      <SecondCompo />
      <ContactSection />
    </div>
  );
}
