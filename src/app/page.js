import ScrollHeader from "@/components/header";
import VideoMaskTransition from "@/components/MaksVideo";
import CoverScroll from "@/components/CoverScroll";
import Section from "@/components/nextSection";

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
