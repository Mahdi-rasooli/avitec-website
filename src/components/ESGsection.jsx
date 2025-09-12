'use client'
import React, { useState, useEffect, useRef } from 'react';
import image19 from '../../public/img19.jpg'
import image21 from '../../public/img21.jpg'
import image16 from '../../public/img24.jpg'
// --- Component Data ---
const esgData = [
  { key: 'e', letter: 'E', title: 'Environmental', bgImage: image19.src  },
  { key: 's', letter: 'S', title: 'Social',        bgImage: image16.src },
  { key: 'g', letter: 'G', title: 'Governance',    bgImage: image21.src },
];

function ESGsection() {
  const [activeSection, setActiveSection] = useState(null);
  const [isGsapReady, setIsGsapReady] = useState(false);
  const mainRef = useRef(null);

  // --- SCRIPT LOADING ---
  // We can't import gsap directly, so we load it via a script tag.
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => setIsGsapReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  // --- INTRO & DEFAULT STATE ANIMATION ---
  useEffect(() => {
    // We must wait for the GSAP script to be loaded and ready.
    if (!isGsapReady) return;

    const { gsap } = window;
    const ctx = gsap.context(() => {
      
      gsap.from('.esg-section', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.out',
      });
      
      const timer = setTimeout(() => {
        setActiveSection('e');
      }, 3000);

      return () => clearTimeout(timer);

    }, mainRef);

    return () => ctx.revert();
  }, [isGsapReady]); // This effect now depends on GSAP being ready.


  // --- ACTIVE SECTION CHANGE ANIMATION ---
  useEffect(() => {
    // Also wait for GSAP to be ready here.
    if (!isGsapReady || !activeSection) return;
    
    const { gsap } = window;
    const ctx = gsap.context(() => {
      const revealClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      const hiddenClipPath = 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)';
      
      const activeSelector = `[data-section="${activeSection}"]`;
      const otherSelectors = `.esg-section:not(${activeSelector})`;
      const activeBg = `.background-image[data-section="${activeSection}"]`;
      const otherBgs = `.background-image:not(${activeBg})`;

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.inOut' }
      });

      tl.to(activeSelector, { flexGrow: 4 })
        .to(otherSelectors, { flexGrow: 1 }, '<')
        .to(`${activeSelector} .letter`, { scale: 2.2, opacity: 1 }, '<')
        .to(`${otherSelectors} .letter`, { scale: 0.9, opacity: 0.5 }, '<')
        .to(`${activeSelector} .content`, { opacity: 1, y: 0, delay: 0.1 }, '<')
        .to(`${otherSelectors} .content`, { opacity: 0, y: 20 }, '<');

      gsap.set(`.background-wrapper[data-section="${activeSection}"]`, { zIndex: 2 });
      gsap.set(`.background-wrapper:not([data-section="${activeSection}"])`, { zIndex: 1 });
      
      tl.to(activeBg, { clipPath: revealClipPath }, '<')
        .to(otherBgs, { clipPath: hiddenClipPath }, '<');

    }, mainRef);

    return () => ctx.revert();
  }, [activeSection, isGsapReady]); // Also depends on GSAP readiness.

  const handleSectionClick = (key) => {
    if (activeSection !== key) {
      setActiveSection(key);
    }
  };

  return (
    <main ref={mainRef} className="h-screen w-screen overflow-hidden font-sans bg-black text-white">
      <div className="absolute inset-0 z-0">
        {esgData.map(item => (
          <div key={item.key} data-section={item.key} className="background-wrapper absolute inset-0">
            <div
              data-section={item.key}
              style={{ 
                backgroundImage: `url(${item.bgImage})`,
                clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)'
              }}
              className="background-image absolute inset-0 h-full w-full bg-cover bg-center"
            ></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full w-full">
        {esgData.map(item => (
          <div
            key={item.key}
            data-section={item.key}
            onClick={() => handleSectionClick(item.key)}
            className="esg-section flex-1 h-full cursor-pointer relative overflow-hidden border-l border-white/20 first:border-l-0"
          >
            <h1 data-section={item.key} className="letter text-[15vw] font-black select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 opacity-50">
              {item.letter}
            </h1>
            
            <div data-section={item.key} className="content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-0" style={{ transform: 'translateY(20px)' }}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">{item.title}</h2>
              <button className="pointer-events-none rounded-full bg-black/30 backdrop-blur-sm px-8 py-3 text-sm font-semibold text-white shadow-xl">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ESGsection;

