'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoMaskTransition() {
  const containerRef = useRef(null);
  const backgroundVideoRef = useRef(null);
  const textMaskRef = useRef(null);
  const maskedVideoRef = useRef(null);
  const greenOverlayRef = useRef(null);
  const greenTextRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const backgroundVideo = backgroundVideoRef.current;
    const textMask = textMaskRef.current;
    const maskedVideo = maskedVideoRef.current;
    const greenOverlay = greenOverlayRef.current;

    // Initial states
    gsap.set(maskedVideo, { opacity: 0 });
    gsap.set(textMask, { scale: 6, opacity: 0, transformOrigin: "center center" });
    if (greenOverlay) {
      gsap.set(greenOverlay, {
        position: 'absolute',
        backgroundColor: '#000000',
        bottom: 0,
        height: '0vh',
        left: '5vw',
        right: '5vw',
        borderRadius: 12,
        zIndex: 20,
        transformOrigin: 'bottom center',
        willChange: 'height,left,right,border-radius'
      });
    }

    // prepare green overlay text initial state
    const greenText = greenTextRef.current;
    if (greenText) {
      const words = greenText.querySelectorAll('.split-word');
      gsap.set(words, { autoAlpha: 0, y: 30 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=250%", // longer so entry + exit fit
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Mask + video transition
    tl.to(textMask, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power4.out"
    }, 0.1)
      .to(maskedVideo, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.2)
      .to(backgroundVideo, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0.3)
      .add('brandShown', 1.35)
      .to(maskedVideo, {
        opacity: 0,
        duration: 1,
        ease: 'none'
      }, 'brandShown')
      .to(greenOverlay, {
        height: '100vh',
        left: '0vw',
        right: '0vw',
        borderRadius: 0,
        duration: 1,
        ease: 'none'
      }, 'brandShown');

    // Animate overlay text
    if (greenText) {
      const headlineWords = greenText.querySelectorAll('h2 .split-word');
      const paragraphWords = greenText.querySelectorAll('p .split-word');

      gsap.set([...headlineWords, ...paragraphWords], {
        autoAlpha: 0,
        y: 40,
        rotationX: -12,
        transformOrigin: '50% 50% -50px'
      });

      // Headline reveal
      tl.to(headlineWords, {
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.06,
      }, 'brandShown+=0.15')

        // Paragraph reveal (headline stays visible)
        .to(paragraphWords, {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.04,
        }, 'brandShown+=0.75')

        // 🔥 Exit words one by one
        .to([...headlineWords, ...paragraphWords], {
          autoAlpha: 0,
          y: -30,
          rotationX: 12,
          duration: 0.8,
          ease: 'power2.in',
          stagger: 0.05, // makes them disappear one by one
        }, 'brandShown+=2.2'); // exit starts later so both are visible first
    }

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const headline = "AVITEC works for a better future";
  const paragraph = "AVITEC was founded to develop and expand services to Customers in the Energy, Oil, Gas, and Petrochemical industries with a modern, advanced, innovative, and sustainable approach.";

  return (
    <div className="relative">
      <div ref={containerRef} className="h-screen relative overflow-hidden bg-black">
        {/* Background video */}
        <video
          ref={backgroundVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>

        {/* Masked Video inside AVITEC */}
        <div ref={maskedVideoRef} className="absolute inset-0 z-10">
          <svg className="w-full h-full">
            <defs>
              <mask id="avitec-text-mask">
                <rect width="100%" height="100%" fill="black" />
                <text
                  ref={textMaskRef}
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="22vw"
                  fontWeight="900"
                  fontFamily="Arial Black, sans-serif"
                  style={{ transformOrigin: 'center center', transformBox: 'fill-box' }}
                >
                  AVITEC
                </text>
              </mask>
            </defs>
            <foreignObject width="100%" height="100%" mask="url(#avitec-text-mask)">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/video2.mp4" type="video/mp4" />
              </video>
            </foreignObject>
          </svg>
        </div>

        {/* Overlay with text */}
        <div ref={greenOverlayRef} className="pointer-events-none overflow-hidden">
          <div ref={greenTextRef} className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center max-w-4xl mx-auto px-4">
              <h2 className="text-5xl md:text-7xl font-bold">
                {headline.split(" ").map((word, index) => (
                  <span key={index} className="inline-block overflow-hidden">
                    <span className="inline-block split-word">{word}&nbsp;</span>
                  </span>
                ))}
              </h2>
              <p className="mt-6 text-xl md:text-2xl text-gray-300">
                {paragraph.split(" ").map((word, index) => (
                  <span key={index} className="inline-block overflow-hidden">
                    <span className="inline-block split-word">{word}&nbsp;</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
