'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dummy Data
const sectionsData = [
    {
        id: 1,
        title: "Brand Strategy",
        content: "We define a powerful brand voice and visual identity that resonates with your target audience.",
        bgColor: "bg-neutral-800",
    },
    {
        id: 2,
        title: "Web Development",
        content: "High-performance websites built with modern technologies for speed and scale.",
        bgColor: "bg-cyan-800",
    },
    {
        id: 3,
        title: "Mobile Apps",
        content: "Engaging and intuitive mobile applications for iOS and Android that delight your users.",
        bgColor: "bg-blue-800",
    },
];

// Define constants for easy tweaking
const TITLE_AREA_HEIGHT = 80; // The vertical space each sticky title will occupy
const CONTENT_HEIGHT = "60vh"; // The height of the main content box

export default function StackedSectionsV2() {
    const containerRef = useRef(null);
    const panelsRef = useRef([]);
    panelsRef.current = [];

    const addToRefs = (el) => {
        if (el && !panelsRef.current.includes(el)) {
            panelsRef.current.push(el);
        }
    };

    useEffect(() => {
        const panels = panelsRef.current;
        const container = containerRef.current;

        // The master timeline
        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                start: "top top",
                // **THE FIX for the bug**: The end trigger is now calculated to give
                // each panel a full screen height (100vh) of scroll distance.
                end: () => `+=${(panels.length - 1) * 100}vh`,
            }
        });

        // Loop through panels to create the sequential animation
        panels.forEach((panel, i) => {
            // Skip the first panel, as it's the starting point
            if (i === 0) return;

            // Animate the current panel to slide up over the previous one
            masterTimeline.to(panel, {
                // Animate the panel's top edge to sit below the previous stacked titles
                y: i * TITLE_AREA_HEIGHT,
                ease: "none",
            },
            // The position parameter "<" ensures this animation starts
            // exactly when the previous one finishes, creating a clean sequence.
            "<"
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        // This container's height determines the total scrollable distance.
        // We give it a height of 100vh for each section.
        <div ref={containerRef} style={{ height: `${sectionsData.length * 100}vh`, position: 'relative' }}>
            {sectionsData.map((section, i) => (
                <div
                    key={section.id}
                    ref={addToRefs}
                    // **THE CHANGE for layout**: We now use `position: sticky` which is often
                    // more stable for pinning than animating an absolute element.
                    className="sticky top-0 w-full h-screen overflow-hidden"
                    style={{ zIndex: i }}
                >
                    <div className={`w-full h-full flex flex-col ${section.bgColor}`}>
                        {/* Title Area */}
                        <div
                            className="w-full flex items-center px-8"
                            style={{ height: `${TITLE_AREA_HEIGHT}px`, flexShrink: 0 }}
                        >
                            <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                        </div>

                        {/* Content Area - only takes up 60% of the height */}
                        <div
                            className="w-full flex items-center justify-center p-8 absolute bottom-0"
                            style={{ height: CONTENT_HEIGHT }}
                        >
                            <p className="text-white/80 text-xl max-w-2xl text-center">
                                {section.content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}