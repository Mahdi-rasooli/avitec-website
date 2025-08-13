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
            gsap.set(greenOverlay, {
                position: 'absolute',
                backgroundColor: '#88CE02',
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

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                                end: "+=120%",
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
        // Ensure we start the green entrance only after AVITEC is fully shown
        .add('brandShown', 1.35)
        // Green overlay rises from bottom and expands from 90% to 100% width while mask fades
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

        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);

    return (
        <div className="relative">
            <div ref={containerRef} className="h-screen relative overflow-hidden bg-black">
                {/* Background Video */}
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

                {/* Green overlay that rises and expands */}
                <div ref={greenOverlayRef} className="pointer-events-none" />
            </div>
        </div>
    );
}