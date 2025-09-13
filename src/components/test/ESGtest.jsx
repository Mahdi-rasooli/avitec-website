"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

// --- Component Data ---
const esgData = [
  { key: "e", letter: "E", title: "Environmental", bgImage: "/img29.jpg" },
  { key: "s", letter: "S", title: "Social", bgImage: "/img28.jpg" },
  { key: "g", letter: "G", title: "Governance", bgImage: "/img27.jpg" },
];

function ESGsection() {
  const [activeSection, setActiveSection] = useState(null);
  const [isEntryAnimationComplete, setIsEntryAnimationComplete] = useState(false);
  const previousSectionRef = useRef(null);
  const isAnimating = useRef(false);
  const isInitialMount = useRef(true);

  // Preload images
  useEffect(() => {
    esgData.forEach((item) => {
      const img = new Image();
      img.src = item.bgImage;
    });
  }, []);

  // --- Entry Animation ---
  useEffect(() => {
    const entryOrder = ["g", "s", "e"];

    gsap.set(".background-image", {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    });
    gsap.set(".letter", { opacity: 0, xPercent: -50, yPercent: -10 });

    const entryTl = gsap.timeline({
      onComplete: () => {
        gsap.to(".letter", {
          y: -15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 2.5,
          stagger: { each: 0.2, from: "start" },
        });
        setActiveSection("e");
        gsap.set('[data-section="e"] .background-wrapper', { zIndex: 2 });
        setIsEntryAnimationComplete(true);
      },
    });

    entryOrder.forEach((key, index) => {
      const letterSelector = `[data-section="${key}"] .letter`;
      entryTl.fromTo(
             letterSelector,
             {
               clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
               y: 60,
               scale: 0.95,
               opacity: 0,
               filter: "blur(8px)",
               xPercent: -50,
               yPercent: -10,
             },
             {
               clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
               y: 0,
               scale: 1,
               opacity: 0.5,
               filter: "blur(0px)",
               duration: 1.6,
               ease: "power4.out",
               xPercent: -50,
               yPercent: -10,
             },
             index * 0.25
           );
    });

    entryTl.to(
      ".background-image",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power3.out",
        stagger: {
          each: 0.4,
          from: "start",
        },
      },
      "+=0.4"
    );
  }, []);

  // --- Main Interaction Logic ---
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!activeSection) return;

    const DURATION = 0.8;
    const EASE = "power2.inOut";
    const BG_DURATION = 1.0;
    const BG_EASE = "power3.out";

    const previousSection = previousSectionRef.current;
    const activeSelector = `[data-section="${activeSection}"]`;
    const prevSelector = previousSection
      ? `[data-section="${previousSection}"]`
      : null;

    const revealClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    const hiddenClipPaths = {
      e: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      s: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
      g: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    };

    isAnimating.current = true;

    const layoutTl = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE },
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    layoutTl
      .to(activeSelector, { flexGrow: 5 }, 0)
      .to(`.esg-section:not(${activeSelector})`, { flexGrow: 2.3 }, 0)
      .to(`${activeSelector} .background-overlay`, { opacity: 0 }, 0)
      .to(
        `.esg-section:not(${activeSelector}) .background-overlay`,
        { opacity: 0.5 },
        0
      )
      .to(
        `${activeSelector} .letter`,
        { scale: 1.5, opacity: 1, left: "30%", xPercent: -50 },
        0
      )
      .to(
        `.esg-section:not(${activeSelector}) .letter`,
        { scale: 0.9, opacity: 0.5, left: "50%", xPercent: -50 },
        0
      )
      .to(
        `${activeSelector} .content`,
        { opacity: 1, y: 0, left: "65%", xPercent: -50 },
        0
      )
      .to(
        `.esg-section:not(${activeSelector}) .content`,
        { opacity: 0, y: 20, left: "50%", xPercent: -50 },
        0
      );

    if (previousSection) {
      gsap.set(`.background-wrapper`, { zIndex: 1 });
      gsap.set(`.background-wrapper${prevSelector}`, { zIndex: 2 });
      gsap.set(`.background-wrapper${activeSelector}`, { zIndex: 3 });

      gsap.fromTo(
        `.background-image${activeSelector}`,
        { clipPath: hiddenClipPaths[activeSection] },
        {
          clipPath: revealClipPath,
          duration: BG_DURATION,
          ease: BG_EASE,
          onComplete: () => {
            gsap.set(`.background-wrapper${prevSelector}`, { zIndex: 1 });
          },
        }
      );
    }
  }, [activeSection]);

  useEffect(() => {
    previousSectionRef.current = activeSection;
  }, [activeSection]);

  const handleSectionClick = (key) => {
    if (!isEntryAnimationComplete) return;
    
    if (activeSection !== key && !isAnimating.current) {
      setActiveSection(key);
    }
  };

  const handleMouseEnter = (key) => {
    if (key !== activeSection) {
      const sel = `[data-section="${key}"]`;
      const btnSel = `${sel} .learn-more-btn`;

      // ✨ FIX: Reverted to your original scale animation
      gsap.to(`${sel} .letter`, { scale: 1.5, duration: 0.3, ease: "power2.out" });
      gsap.to(`${sel} .background-overlay`, { opacity: 0.3, duration: 0.3, ease: "power2.out" });

      const tl = gsap.timeline();
      tl.to(`${btnSel} .btn-bg`, { scaleX: 1, duration: 0.4, ease: "power2.inOut" })
        .to(btnSel, { borderColor: '#ef4444', duration: 0.3 }, 0) // Tailwind's red-500
        // ✨ FIX: Target only the text span with the specific '.btn-text' class
        .to(`${btnSel} .btn-text`, { color: '#ef4444', duration: 0.3 }, 0);
    }
  };

  const handleMouseLeave = (key) => {
    if (key !== activeSection) {
      const sel = `[data-section="${key}"]`;
      const btnSel = `${sel} .learn-more-btn`;

      gsap.to(`${sel} .letter`, { scale: 0.9, duration: 0.3, ease: "power2.out" });
      gsap.to(`${sel} .background-overlay`, { opacity: 0, duration: 0.3, ease: "power2.out" });

      const tl = gsap.timeline();
      tl.to(`${btnSel} .btn-bg`, { scaleX: 0, duration: 0.4, ease: "power2.inOut" })
        .to(btnSel, { borderColor: '#e5e7eb', duration: 0.3 }, 0) // Tailwind's gray-200
        // ✨ FIX: Target only the text span with the specific '.btn-text' class
        .to(`${btnSel} .btn-text`, { color: '#ffffff', duration: 0.3 }, 0);
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden font-satoshi bg-black text-white">
      <div className="absolute inset-0 z-0">
        {esgData.map((item) => (
          <div
            key={item.key}
            data-section={item.key}
            className="background-wrapper absolute inset-0"
          >
            <div
              data-section={item.key}
              className="background-image absolute inset-0 h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="relative z-10 flex h-full w-full">
        {esgData.map((item) => (
          <div
            key={item.key}
            data-section={item.key}
            onClick={() => handleSectionClick(item.key)}
            onMouseEnter={() => handleMouseEnter(item.key)}
            onMouseLeave={() => handleMouseLeave(item.key)}
            className={`esg-section flex-1 h-full relative overflow-hidden first:before:hidden before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-white/20 before:content-[''] ${isEntryAnimationComplete ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className="background-overlay pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300"></div>
            <h1
              data-section={item.key}
              className="letter text-[17vw] font-black select-none absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-[10%] text-white opacity-0"
            >
              {item.letter}
            </h1>
            <div
              data-section={item.key}
              className="content absolute top-[22%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-0"
            >
              <h2 className="text-4xl lg:text-5xl left-[50%] font-bold text-white">
                <span className="text-red-500">{item.title.charAt(0)}</span>{item.title.slice(1)}
              </h2>
              <button className="learn-more-btn relative flex items-center border border-gray-200 rounded-full backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white shadow-md overflow-hidden transition-colors duration-300">
                <span className="btn-bg absolute inset-0 bg-white" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}></span>
                {/* ✨ FIX: Added 'z-10' for stacking and 'btn-text' class for specific targeting */}
                <span className="btn-text relative z-10 flex items-center gap-2">
                  Learn More <ArrowRight />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ESGsection;