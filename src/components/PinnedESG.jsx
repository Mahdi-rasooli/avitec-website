
'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ESGsection from './test/ESGtest';

gsap.registerPlugin(ScrollTrigger);

const PinnedESG = () => {
  const componentRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: componentRef.current,
        start: 'top top',
        end: '+=200%', // Pin for a duration of 2x the viewport height
        pin: targetRef.current,
        scrub: 1,
        anticipatePin: 1,
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="h-[300vh] relative">
      <div ref={targetRef} className="h-screen w-full">
        <ESGsection />
      </div>
    </div>
  );
};

export default PinnedESG;
