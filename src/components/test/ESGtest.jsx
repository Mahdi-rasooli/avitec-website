'use client'
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

// --- Component Data ---
const esgData = [
  { key: 'e', letter: 'E', title: 'Environmental', bgImage: '/img19.jpg' },
  { key: 's', letter: 'S', title: 'Social',        bgImage: '/img24.jpg' },
  { key: 'g', letter: 'G', title: 'Governance',    bgImage: '/img21.jpg' },
];

function ESGsection() {
  const [activeSection, setActiveSection] = useState(null);

  // FIX 1: New useEffect for the infinite floating letter animation.
  // This runs only once when the component mounts.
  useEffect(() => {
    const floatingAnim = gsap.to('.letter', {
      y: -15,           // Move up by 15px
      repeat: -1,       // Repeat forever
      yoyo: true,       // Animate back and forth
      ease: 'sine.inOut', // A very smooth, gentle ease
      duration: 2.5,
      stagger: 0.2,     // Add a slight delay between each letter's animation
    });

    // Clean up this specific animation when the component unmounts
    return () => {
      floatingAnim.kill();
    };
  }, []); // Empty dependency array so it runs only once.


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power2.inOut' }
      });

      const revealClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      const hiddenClipPaths = {
        e: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        s: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
        g: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
      };

      gsap.set('.esg-section', { flexGrow: 1 });
      gsap.set('.letter', { scale: 1, opacity: 0.5 });
      gsap.set('.content', { opacity: 0, y: 20 });
      esgData.forEach(item => {
        gsap.set(`.background-image[data-section="${item.key}"]`, {
          clipPath: hiddenClipPaths[item.key]
        });
      });

      if (activeSection) {
        // FIX 2: Set z-index to ensure the new background animates ON TOP of the old one.
        // This prevents the "flash of black".
        gsap.set(`.background-wrapper[data-section="${activeSection}"]`, { zIndex: 2 });
        gsap.set(`.background-wrapper:not([data-section="${activeSection}"])`, { zIndex: 1 });

        const activeSelector = `[data-section="${activeSection}"]`;
        const otherSelectors = `.esg-section:not([data-section="${activeSection}"])`;

        tl.to(activeSelector, { flexGrow: 4 })
          .to(otherSelectors, { flexGrow: 1 }, '<')
          .to(`${activeSelector} .letter`, { scale: 2.2, opacity: 1 }, '<')
          .to(`${otherSelectors} .letter`, { scale: 0.9, opacity: 0.5 }, '<')
          .to(`${activeSelector} .content`, { opacity: 1, y: 0, delay: 0.2 }, '<')
          .to(`${otherSelectors} .content`, { opacity: 0, y: 20 }, '<');

        const activeBg = `.background-image[data-section="${activeSection}"]`;
        tl.to(activeBg, {
          clipPath: revealClipPath,
          duration: 1,
          ease: 'power3.out'
        }, '<');

        esgData.forEach(item => {
          if (item.key !== activeSection) {
            tl.to(`.background-image[data-section="${item.key}"]`, {
              clipPath: hiddenClipPaths[item.key],
              duration: 1,
              ease: 'power3.out'
            }, '<');
          }
        });
      }
    });

    return () => ctx.revert();
  }, [activeSection]);

  const handleSectionClick = (key) => {
    if (activeSection !== key) {
      setActiveSection(key);
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden font-sans bg-gray-800 text-white">
      <div className="absolute inset-0 z-0">
        {esgData.map(item => (
          // FIX 2: Added data-section to the wrapper for z-index targeting
          <div key={item.key} data-section={item.key} className="background-wrapper absolute inset-0">
            <div
              data-section={item.key}
              className="background-image absolute inset-0 h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.bgImage})` }}
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
            <h1 data-section={item.key} className="letter text-[15vw] font-black select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50">
              {item.letter}
            </h1>
            
            <div data-section={item.key} className="content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-0">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">{item.title}</h2>
              <button className="pointer-events-none rounded-md bg-slate-900/50 backdrop-blur-sm px-6 py-2 text-sm font-semibold text-white shadow-md">
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