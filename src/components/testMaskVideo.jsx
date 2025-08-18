'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function MaskVideo() {
    const containerRef = useRef(null);
    const backgroundVideoRef = useRef(null);
    const textMaskRef = useRef(null);
    const maskedVideoRef = useRef(null);
    const greenOverlayRef = useRef(null);
    const greenTextRef = useRef(null);
    const nextSectionRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const backgroundVideo = backgroundVideoRef.current;
        const textMask = textMaskRef.current;
        const maskedVideo = maskedVideoRef.current;
        const greenOverlay = greenOverlayRef.current;

        // Initial states
        gsap.set(maskedVideo, { opacity: 0 });
        gsap.set(textMask, { scale: 6, opacity: 0, transformOrigin: "center center" });
        // Green overlay starts at bottom with 0 height and 90% width, then grows up to fill
        if (greenOverlay) {
            // use the overlay as a black fade-to-cover element
            gsap.set(greenOverlay, {
                position: 'absolute',
                backgroundColor: '#000',
                autoAlpha: 0,
                bottom: 0,
                height: '0vh',
                left: '5vw',
                right: '5vw',
                borderRadius: 12,
                zIndex: 40,
                transformOrigin: 'bottom center',
                willChange: 'height,left,right,border-radius,opacity'
            });
        }
        // prepare the footer (from ContactSection) to slide up
        const footerEl = typeof document !== 'undefined' ? document.getElementById('site-footer') : null;
        if (footerEl) {
            gsap.set(footerEl, { y: '100%', force3D: true });
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
                end: "+=220%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

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
        // expand overlay to cover the screen (fade to black)
        .to(greenOverlay, {
            height: '100vh',
            left: '0vw',
            right: '0vw',
            borderRadius: 0,
            duration: 0.8,
            ease: 'power2.out',
            autoAlpha: 1
        }, 'brandShown')
        // after overlay has covered, slide the footer up from bottom
        .to(footerEl || {}, {
            y: '0%',
            duration: 0.9,
            ease: 'power2.out'
        }, 'brandShown+=0.7');

        // Animate words in with a stagger
        if (greenText) {
            const words = greenText.querySelectorAll('.split-word');
            // keep existing text animation but leave timing as-is in case overlay/text interplay is desired
            tl.to(words, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.05,
            }, 'brandShown+=0.2')
            .to(words, {
                autoAlpha: 0,
                y: -15,
                duration: 0.4,
                ease: 'power2.in',
                stagger: 0.03,
            }, 'brandShown+=1.2');
        }

        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);

    const headline = "Forging the Future of Digital Interaction";
    const paragraph = "We blend cutting-edge technology with visionary design to create immersive web experiences that captivate and inspire.";

    return (
        <div className="relative">
            <div ref={containerRef} className="h-screen relative overflow-hidden bg-black">
                {/* ... video and mask elements ... */}
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

                {/* Gray overlay that rises and expands */}
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