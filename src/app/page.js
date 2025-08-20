import Scroll from "@/components/refinedHeroScroll";
import BeliefSection from "@/components/imagesGallery";
import SecondCompo from '@/components/ScrollPinnedCards'
import ContactSection from "@/components/ContactSection";
import VideoMaskTransition from "@/components/MaskVideo";
import MaskVideo from "@/components/testMaskVideo";
import HomeSections from "@/components/overlayWrapper";
import ScrollHeader from "@/components/header";
import ModernGalleryCarousel from "@/components/gallery";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      {/* <Scroll /> */}
      {/* <BeliefSection /> */}
      <HomeSections />
      {/* <ModernGalleryCarousel /> */}
      {/* <WorkSection /> */}
      <SecondCompo />
      <VideoMaskTransition />
      {/* <MaskVideo /> */}
      <ContactSection />
    </div>
  );
}
