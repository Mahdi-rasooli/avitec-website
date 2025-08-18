'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react'; // Assuming you're using lucide-react for the icon

gsap.registerPlugin(ScrollTrigger);

// You'll need to define these components or replace them with standard HTML elements
const SectionTitle = ({ children }) => <h3 className="text-xl font-semibold mb-4 text-gray-400">{children}</h3>;
const AnimatedLink = ({ children, href }) => <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300">{children}</a>;

export default function MaskVideo() {
    const containerRef = useRef(null);
    const backgroundVideoRef = useRef(null);
    const textMaskRef = useRef(null);
    const maskedVideoRef = useRef(null);
    const footerRef = useRef(null); // <-- Ref for the footer

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = containerRef.current;
        const backgroundVideo = backgroundVideoRef.current;
        const textMask = textMaskRef.current;
        const maskedVideo = maskedVideoRef.current;
        const footerEl = footerRef.current;

        // Initial states
        gsap.set(maskedVideo, { opacity: 0 });
        gsap.set(textMask, { scale: 6, opacity: 0, transformOrigin: "center center" });

        // Prepare the footer to slide up
        if (footerEl) {
            gsap.set(footerEl, { y: '100%', force3D: true });
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
        // After the masked video fades, slide the footer up from the bottom
        .to(footerEl, {
            y: '0%',
            duration: 0.9,
            ease: 'power2.out'
        }, 'brandShown+=0.2'); // Adjusted timing for a smooth transition

        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);

    return (
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

            {/* Masked Video */}
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

            {/* The footer that will be animated */}
            <footer ref={footerRef} className="bg-black text-white pt-24 pb-12 px-4 sm:px-8 md:px-16 absolute bottom-0 left-0 w-full z-20">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-6">
                            <h1 className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-none relative right-40 bottom-20">AVITEC</h1>
                        </div>
                        <div className="md:col-span-3">
                            <SectionTitle>Contact</SectionTitle>
                            <div className="flex flex-col space-y-2 text-lg">
                                <p className="font-semibold">Avitec contact</p>
                                <p className="text-gray-400">123 AVITEC<br />Tehran City, Vanak</p>
                                <p className="text-gray-400">+1 (234) 567-8900</p>
                                <AnimatedLink href="mailto:hello@avitec.com">info@avitec.com</AnimatedLink>
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <SectionTitle>Links</SectionTitle>
                            <div className="flex flex-col space-y-2 text-lg">
                                <AnimatedLink>Instagram</AnimatedLink>
                                <AnimatedLink>LinkedIn</AnimatedLink>
                                <AnimatedLink>Newsletter</AnimatedLink>
                                <div className="pt-4">
                                    <p>Privacy Policy</p>
                                    <p>Terms & Conditions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-24 flex justify-between items-end relative right-40">
                        <p className="text-lg text-gray-400 max-w-sm">The Leading Technical and Commercial <br/>Company of Energy Develop Avin</p>
                        <button onClick={scrollToTop} className="border border-gray-500 rounded-full p-3 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out" aria-label="Scroll to top">
                            <ArrowUp size={24} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}