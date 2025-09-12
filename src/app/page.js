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
import Projects from "@/components/Projects";
import NextSection from "@/components/nextSection";
import ESG from "@/components/ESGsection";
import ESGsection from "@/components/test/ESGtest";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      {/* <Scroll /> */}
      {/* <BeliefSection /> */}
      {/* <TestHero /> 
      <Projects />
      <NextSection /> */}
      {/* <HomeSections /> */}
      {/* <ModernGalleryCarousel /> */}
      {/* <WorkSection /> */}
      <ESG />
      {/* <ESGsection /> */}
      {/* <SecondCompo /> */}
      {/* <VideoMaskTransition /> */}
      <TestVideoMask />
      {/* <MaskVideo /> */}
      {/* <ContactSection /> */}
    </div>
  );
}
