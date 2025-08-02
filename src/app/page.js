import ScrollHeader from "@/components/header";
import CoverScroll from "@/components/CoverScroll";
import Section from "@/components/nextSection";
import VideoMaskTransition from "@/components/MaskVideo";

export default function Home() {
  return (
    <div>
      <ScrollHeader />
      <CoverScroll />
      <Section />
      <VideoMaskTransition />
    </div>
  );
}
