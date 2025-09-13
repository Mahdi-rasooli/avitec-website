"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const esgData = [
  { key: "e", letter: "E", title: "Environmental", bgImage: "/img29.jpg" },
  { key: "s", letter: "S", title: "Social", bgImage: "/img28.jpg" },
  { key: "g", letter: "G", title: "Governance", bgImage: "/img27.jpg" },
];

const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power2.inOut",
  bgDuration: 1.0,
  bgEase: "power3.out",
  activeFlex: 5,
  inactiveFlex: 2.3,
  activeLetterScale: 1.5,
  inactiveLetterScale: 0.9,
  activeLetterLeft: "30%",
  inactiveLetterLeft: "50%",
  activeContentLeft: "65%",
  inactiveContentLeft: "50%",
};

function ESGsection() {
  const [activeSection, setActiveSection] = useState(null);
  const [isEntryAnimationComplete, setIsEntryAnimationComplete] = useState(false);
  const previousSectionRef = useRef(null);
  const isAnimating = useRef(false);
  const isInitialMount = useRef(true);

  const pinContainerRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    esgData.forEach((item) => { (new window.Image()).src = item.bgImage; });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: "+=200%",
        pin: mainRef.current,
        scrub: 1,
        anticipatePin: 1,
      });

      gsap.set(".background-image-container", { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
      gsap.set(".letter", { opacity: 0, xPercent: -50, yPercent: -10 });

      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          gsap.to(".letter", { y: -15, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2.5, stagger: { each: 0.2, from: "start" } });
          setActiveSection("e");
          gsap.set('[data-section="e"] .background-wrapper', { zIndex: 2 });
          setIsEntryAnimationComplete(true);
        },
      });

      const entryOrder = ["g", "s", "e"];
      entryOrder.forEach((key, index) => {
        const letterSelector = `[data-section="${key}"] .letter`;
        entryTl.fromTo(letterSelector, 
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: 60, scale: 0.95, opacity: 0, filter: "blur(8px)", xPercent: -50, yPercent: -10 }, 
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0, scale: 1, opacity: 0.5, filter: "blur(0px)", duration: 1.6, ease: "power4.out", xPercent: -50, yPercent: -10 }, 
          index * 0.25
        );
      });

      entryTl.to(".background-image-container", 
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power3.out", stagger: { each: 0.4, from: "start" } }, 
        "+=0.4"
      );

    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!activeSection) return;

    const { duration, ease, bgDuration, bgEase, activeFlex, inactiveFlex, activeLetterScale, inactiveLetterScale, activeLetterLeft, inactiveLetterLeft, activeContentLeft, inactiveContentLeft } = ANIMATION_CONFIG;
    const previousSection = previousSectionRef.current;
    const activeSelector = `[data-section="${activeSection}"]`;
    const prevSelector = previousSection ? `[data-section="${previousSection}"]` : null;

    isAnimating.current = true;
    const layoutTl = gsap.timeline({ defaults: { duration, ease }, onComplete: () => { isAnimating.current = false; } });

    layoutTl
      .to(activeSelector, { flexGrow: activeFlex }, 0)
      .to(`.esg-section:not(${activeSelector})`, { flexGrow: inactiveFlex }, 0)
      .to(`${activeSelector} .background-overlay`, { opacity: 0 }, 0)
      .to(`.esg-section:not(${activeSelector}) .background-overlay`, { opacity: 0.5 }, 0)
      .to(`${activeSelector} .letter`, { scale: activeLetterScale, opacity: 1, left: activeLetterLeft, xPercent: -50 }, 0)
      .to(`.esg-section:not(${activeSelector}) .letter`, { scale: inactiveLetterScale, opacity: 0.5, left: inactiveLetterLeft, xPercent: -50 }, 0)
      .to(`${activeSelector} .content`, { opacity: 1, y: 0, left: activeContentLeft, xPercent: -50 }, 0)
      .to(`.esg-section:not(${activeSelector}) .content`, { opacity: 0, y: 20, left: inactiveContentLeft, xPercent: -50 }, 0);

    if (previousSection) {
      const revealClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      const hiddenClipPaths = { e: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", s: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)", g: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" };
      gsap.set(`.background-wrapper`, { zIndex: 1 });
      gsap.set(`.background-wrapper${prevSelector}`, { zIndex: 2 });
      gsap.set(`.background-wrapper${activeSelector}`, { zIndex: 3 });
      gsap.fromTo(
        `.background-image-container${activeSelector}`,
        { clipPath: hiddenClipPaths[activeSection] },
        { clipPath: revealClipPath, duration: bgDuration, ease: bgEase, onComplete: () => { gsap.set(`.background-wrapper${prevSelector}`, { zIndex: 1 }); } }
      );
    }
  }, [activeSection]);

  useEffect(() => { previousSectionRef.current = activeSection; }, [activeSection]);

  const handleSectionClick = (key) => {
    if (!isEntryAnimationComplete || activeSection === key || isAnimating.current) return;
    setActiveSection(key);
  };

  const handleMouseEnter = (key) => {
    if (key === activeSection) return;
    gsap.to(`[data-section="${key}"] .letter`, { scale: ANIMATION_CONFIG.activeLetterScale, duration: 0.3, ease: "power2.out" });
    gsap.to(`[data-section="${key}"] .background-overlay`, { opacity: 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (key) => {
    if (key === activeSection) return;
    gsap.to(`[data-section="${key}"] .letter`, { scale: ANIMATION_CONFIG.inactiveLetterScale, duration: 0.3, ease: "power2.out" });
    gsap.to(`[data-section="${key}"] .background-overlay`, { opacity: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div ref={pinContainerRef} className="h-[300vh] relative">
      <main ref={mainRef} className="h-screen w-screen overflow-hidden font-satoshi bg-black text-white">
        <div className="absolute inset-0 z-0">
          {esgData.map((item) => (
            <div key={item.key} data-section={item.key} className="background-wrapper absolute inset-0">
              <div data-section={item.key} className="background-image-container absolute inset-0 h-full w-full">
                <Image src={item.bgImage} layout="fill" objectFit="cover" alt={item.title} />
              </div>
            </div>
          ))}
        </div>
        <div className="relative z-10 flex h-full w-full">
          {esgData.map((item) => (
            <button
              key={item.key}
              data-section={item.key}
              onClick={() => handleSectionClick(item.key)}
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={() => handleMouseLeave(item.key)}
              className={`esg-section flex-1 h-full relative overflow-hidden first:before:hidden before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-white/20 before:content-[''] focus:outline-none ${isEntryAnimationComplete ? 'cursor-pointer' : 'cursor-default'}`}>
              <div className="background-overlay pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300"></div>
              <h2 data-section={item.key} aria-hidden="true" className="letter text-[17vw] font-black select-none absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-[10%] text-white opacity-0">{item.letter}</h2>
              <div data-section={item.key} className="content absolute top-[28%] lg:top-[22%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-0">
                <h3 className="text-4xl lg:text-5xl left-[50%] font-bold text-white"><span className="text-red-500">{item.title.charAt(0)}</span>{item.title.slice(1)}</h3>
                <div className="learn-more-btn group relative flex items-center border border-gray-200 rounded-full backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white shadow-md overflow-hidden transition-colors duration-300 group-hover:border-red-500">
                  <span className="btn-bg absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" style={{ transformOrigin: 'left' }}></span>
                  <span className="btn-text relative z-10 flex items-center gap-2 text-white group-hover:text-red-500 transition-colors duration-300">Learn More <ArrowRight /></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ESGsection;