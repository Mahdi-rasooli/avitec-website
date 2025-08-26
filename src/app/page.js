import Scroll from "@/components/refinedHeroScroll";
import BeliefSection from "@/components/imagesGallery";
import SecondCompo from '@/components/ScrollPinnedCards'
import ContactSection from "@/components/ContactSection";
import VideoMaskTransition from "@/components/MaskVideo";
import MaskVideo from "@/components/testMaskVideo";
import HomeSections from "@/components/overlayWrapper";
import ScrollHeader from "@/components/header";
import ModernGalleryCarousel from "@/components/gallery";
import TestVideoMask from "@/components/testMask";
import TestHero from "@/components/heroTest";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      {/* <Scroll /> */}
      {/* <BeliefSection /> */}
      {/* <TestHero /> */}
      <HomeSections />
      {/* <ModernGalleryCarousel /> */}
      {/* <WorkSection /> */}
      <SecondCompo />
      {/* <VideoMaskTransition /> */}
      <TestVideoMask />
      {/* <MaskVideo /> */}
      <ContactSection />
    </div>
  );
}
