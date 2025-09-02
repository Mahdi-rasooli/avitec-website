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

    // Initial states
    gsap.set(maskedVideo, { opacity: 0 });
    gsap.set(textMask, { scale: 6, opacity: 0, transformOrigin: "center center" });
    if (overlaySection) {
      // Ensure overlay sits above the video wrapper when expanded
      // Position at bottom so height animation expands upward (from bottom to top)
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
      // Make sure text container is above overlay internals
      if (greenTextRef.current) gsap.set(greenTextRef.current, { position: 'relative', zIndex: 70 });
    }

    // prepare green overlay text initial state
    const greenText = greenTextRef.current;
    if (greenText) {
      const words = greenText.querySelectorAll('.split-word');
      gsap.set(words, { autoAlpha: 0, y: 30 });
    }

    // Master timeline: first expand subsection video from 50vh to full screen,
    // then run the existing AVITEC mask/video sequence.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=350%", // extended further to add an extra scroll step
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Subsection expand: start with subsection video wrapper at 50vh and ensure
    // it reaches exactly 100vh (full viewport height) during the scroll.
    if (subsectionVideoWrapperRef.current) {
      const wrapper = subsectionVideoWrapperRef.current;
      // Use vw/vh-aware sizing: set initial height to 50vh so it's half-screen
      gsap.set(wrapper, { height: '50vh', position: 'relative', zIndex: 40 });
      // Ensure the title section sits below the video in stacking context
      if (subsectionRef.current) {
        gsap.set(subsectionRef.current, { position: 'relative', zIndex: 20 });
      }

      // Animate to exact 100vh to guarantee full-screen coverage and translate
      // the wrapper upward so it covers the title above it.
      const titleHeight = () => (subsectionRef.current ? subsectionRef.current.getBoundingClientRect().height : 0);

      tl.to(wrapper, {
        height: () => `${window.innerHeight}px`,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0)
      .to(wrapper, {
        y: () => -titleHeight(),
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0)
      // mark expand completion so the AVITEC mask runs after the video fully fills the screen
      .add('expanded', 1.25);
    }

    // Mask + video transition (starts after expand completes)
    // Smooth the crossfade and sync masked video playback to the background video
    // to avoid visible jumps when switching to the full-screen masked video.
    tl.to(textMask, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power4.out"
    }, 'expanded+=0.05')
      .to(maskedVideo, {
        opacity: 1,
        duration: 1.4, // slightly longer crossfade for smoother transition
        ease: "power2.inOut",
        onStart: () => {
          // When masked video becomes visible, attempt to sync its currentTime
          // to the background video to avoid jumps.
          try {
            const bg = backgroundVideo;
            const fgVideo = maskedVideo.querySelector('video');
            if (bg && fgVideo && Math.abs((fgVideo.currentTime || 0) - (bg.currentTime || 0)) > 0.1) {
              // small tolerance before seeking
              fgVideo.currentTime = Math.min(bg.currentTime || 0, Math.max(0, fgVideo.duration || Infinity));
            }
          } catch (e) {
            // swallow errors to avoid breaking the timeline
          }
        }
      }, 'expanded+=0.15')
      .to(backgroundVideo, {
        opacity: 0,
        duration: 1.2, // lengthen fade out to match masked video and remove abruptness
        ease: "power2.inOut"
      }, 'expanded+=0.15')
      .add('brandShown', 'expanded+=1.6')
      // Hold the brand visible a bit longer before starting the exit/overlay
      .add('brandHold', 'brandShown+=0.8')
      .to(maskedVideo, {
        opacity: 0,
        duration: 1,
        ease: 'none'
      }, 'brandHold')
      .to(overlaySection, {
        height: '100vh',
        left: '0vw',
        right: '0vw',
        borderRadius: 0,
        duration: 1,
        ease: 'none'
      }, 'brandHold');

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
      }, 'brandHold+=0.15')

        // Paragraph reveal (headline stays visible)
        .to(paragraphWords, {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.04,
        }, 'brandHold+=0.75')

        //  Exit words one by one
        .to([...headlineWords, ...paragraphWords], {
          autoAlpha: 0,
          y: -30,
          rotationX: 12,
          duration: 0.8,
          ease: 'power2.in',
          stagger: 0.05, // makes them disappear one by one
        }, 'brandHold+=2.2'); // exit starts later so both are visible first
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
          <h3 className="text-2xl md:text-4xl font-bold mb-3 text-left">AVITEC — Branded Motion</h3>
          <p className="text-base md:text-lg text-gray-300 mb-6 text-left">Scroll to expand the video — it will animate into a full-screen branded reveal.</p>
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
