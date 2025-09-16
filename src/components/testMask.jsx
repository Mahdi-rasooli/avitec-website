'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TestVideoMask() {
  const containerRef = useRef(null);
  const backgroundVideoRef = useRef(null);
  const textMaskRef = useRef(null);
  const maskedVideoRef = useRef(null);
  const overlaySectionRef = useRef(null);
  const greenTextRef = useRef(null);
  const subsectionRef = useRef(null);
  const subsectionVideoWrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const backgroundVideo = backgroundVideoRef.current;
    const textMask = textMaskRef.current;
    const maskedVideo = maskedVideoRef.current;
    const overlaySection = overlaySectionRef.current;
    const greenText = greenTextRef.current;
    const subsectionVideoWrapper = subsectionVideoWrapperRef.current;
    const subsection = subsectionRef.current;

    // --- Initial States ---
    gsap.set(maskedVideo, { clipPath: 'inset(0% 0 0% 0)' }); // Start as a horizontal line in the middle
    gsap.set(textMask, { fontSize: '500vw' });

    if (overlaySection) {
        gsap.set(overlaySection, {
            position: 'absolute',
            backgroundColor: '#000000',
            bottom: 0,
            height: '0vh',
            left: '5vw',
            right: '5vw',
            borderRadius: 12,
            zIndex: 60,
            transformOrigin: 'bottom center',
            willChange: 'height,left,right,border-radius'
        });
        if (greenText) gsap.set(greenText, { position: 'relative', zIndex: 70 });
    }

    if (greenText) {
        const words = greenText.querySelectorAll('.split-word');
        gsap.set(words, { autoAlpha: 0, y: 30 });
    }

    // --- Master Timeline ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=350%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
        },
    });

    // --- Subsection Expand Animation ---
    if (subsectionVideoWrapper) {
        gsap.set(subsectionVideoWrapper, { height: '60vh', position: 'relative', zIndex: 40 , top: '0%'});
        if (subsection) {
            gsap.set(subsection, { position: 'relative', zIndex: 20 });
        }
        const titleHeight = () => (subsection ? subsection.getBoundingClientRect().height : 0);
        tl.to(subsectionVideoWrapper, {
            height: () => `${window.innerHeight}px`,
            duration: 1.2,
            ease: 'power2.inOut'
        }, 0)
        .to(subsectionVideoWrapper, {
            y: () => -titleHeight(),
            duration: 1.2,
            ease: 'power2.inOut'
        }, 0)
        .add('expanded', 1.25);
    }

    // --- New Mask + Video Reveal Animation ---
    tl.fromTo(textMask, {
        x: '180vw', // Start completely off-screen to the right
    }, {
        x: '0vw', // Animate to the center
        duration: 2,
        ease: 'power2.inOut'
    }, 'expanded')
    .to(maskedVideo, {
        clipPath: 'inset(0% 0 0% 0)', // Animate to be fully visible (expanding from middle)
        duration: 2,
        ease: 'power2.inOut'
    }, 'expanded')
    .to(textMask, {
        fontSize: '22vw',
        duration: 2,
        ease: 'power2.inOut'
    }, 'expanded')
    .to(backgroundVideo, {
        opacity: 0,
        duration: 0.1
    }, 'expanded')
    .add('brandShown', 'expanded+=1.8');

    // --- Overlay and Text Animation ---
    tl.to(maskedVideo, {
        opacity: 0,
        duration: 1,
        ease: 'none'
    }, 'brandShown+=0.8')
    .to(overlaySection, {
        height: '100vh',
        left: '0vw',
        right: '0vw',
        borderRadius: 0,
        duration: 1,
        ease: 'none'
    }, 'brandShown+=0.8');

    if (greenText) {
        const headlineWords = greenText.querySelectorAll('h2 .split-word');
        const paragraphWords = greenText.querySelectorAll('p .split-word');
        gsap.set([...headlineWords, ...paragraphWords], {
            autoAlpha: 0,
            y: 40,
            rotationX: -12,
            transformOrigin: '50% 50% -50px'
        });
        tl.to(headlineWords, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.06,
        }, 'brandShown+=0.95')
        .to(paragraphWords, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.04,
        }, 'brandShown+=1.55')
        .to([...headlineWords, ...paragraphWords], {
            autoAlpha: 0,
            y: -30,
            rotationX: 12,
            duration: 0.8,
            ease: 'power2.in',
            stagger: 0.05,
        }, 'brandShown+=3');
    }

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const headline = "AVITEC works for a better future";
  const paragraph = "AVITEC was founded to develop and expand services to Customers in the Energy, Oil, Gas, and Petrochemical industries with a modern, advanced, innovative, and sustainable approach.";

  return (
    <div className="relative">
      <div ref={containerRef} className="h-screen relative overflow-hidden bg-black">
        {/* Subsection title and description (above the video) */}
        <section ref={subsectionRef} className="relative z-0 text-white px-6 py-10 md:py-20 max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold mb-3 text-left"></h3>
          <p className="text-base md:text-lg text-gray-300 mb-6 text-left"></p>
        </section>

        {/* Full-bleed video wrapper (not constrained by max-width) */}
        <div ref={subsectionVideoWrapperRef} className="w-full overflow-hidden bg-black relative">
          {/* Background video */}
          <video
            ref={backgroundVideoRef}
            className="absolute inset-0 w-full h-full object-cover rounded-lg z-0 p-0"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video2.mp4" type="video/mp4" />
          </video>

          {/* Masked Video inside AVITEC */}
          <div ref={maskedVideoRef} className="absolute inset-0 z-10 pointer-events-none">
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
        </div>

        {/* Overlay with text */}
        <div ref={overlaySectionRef} className="pointer-events-none overflow-hidden">
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
