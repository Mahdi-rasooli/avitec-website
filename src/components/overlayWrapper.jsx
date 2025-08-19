'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Scroll from './refinedHeroScroll'
import BeliefSection from './imagesGallery'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ParallaxSection = ({ children, className = '' }) => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

    const ctx = gsap.context(() => {
      gsap.fromTo(bg, {
        backgroundPosition: () => `50% ${-window.innerHeight * getRatio(section)}px`
      }, {
        backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative isolate min-h-screen overflow-hidden ${className}`}>
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(https://assets.codepen.io/16327/portrait-pattern-4.jpg)`,
          backgroundSize: 'cover',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

const OverlayWrapper = () => {
  return (
    <div>
      <Scroll />
      <div style={{ position: 'sticky', top: '0', zIndex: 10 }}>
        <ParallaxSection>
          <BeliefSection />
        </ParallaxSection>
      </div>
    </div>
  );
};

export default OverlayWrapper;
