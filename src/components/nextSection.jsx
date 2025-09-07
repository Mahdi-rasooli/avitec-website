'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

// --- SVG Icons ---
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ArrowIcon = ({ color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
);

// --- Re-engineered Animated Link Component ---
const AnimatedLink = () => {
    const [isHovered, setIsHovered] = useState(false);
    const linkRef = useRef(null);
    
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const linkWidth = scope.current.offsetWidth;
        const arrowWidth = 64; // Corresponds to w-16

        // Smoother, slower animation using a tween
        const animationOptions = {
            type: "tween",
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1], // A niceQuint ease-out curve
        };

        if (isHovered) {
            animate(scope.current.querySelector('.bg-pill'), { width: '100%' }, animationOptions);
            animate(scope.current.querySelector('.text-content'), { x: -72 }, animationOptions);
            animate(scope.current.querySelector('.arrow-container'), { x: linkWidth - arrowWidth }, animationOptions);
            animate(scope.current.querySelector('.text-content'), { color: '#FFFFFF' }, { duration: 0.3 });
        } else {
            animate(scope.current.querySelector('.bg-pill'), { width: arrowWidth }, animationOptions);
            animate(scope.current.querySelector('.text-content'), { x: 0 }, animationOptions);
            animate(scope.current.querySelector('.arrow-container'), { x: 0 }, animationOptions);
            animate(scope.current.querySelector('.text-content'), { color: '#DC2626' }, { duration: 0.3 });
        }
    }, [isHovered, animate, scope]);
    

    return (
        <motion.a
            ref={scope}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative font-santoshi flex items-center group cursor-pointer h-16 w-[420px] rounded-full overflow-hidden"
            aria-label="Our Vision, Values & Commitments"
        >
            {/* 1. The background pill */}
            <div className="bg-pill absolute left-0 top-0 h-full w-16 bg-red-600 rounded-full z-0" />
            
            {/* 2. The Text Content - slides left */}
            <span className="text-content relative z-10 pl-26 pr-5 text-lg font-semibold whitespace-nowrap text-red-600">
                Our Vision, Values & Commitments
            </span>
            
            {/* 3. The Arrow Container - slides right */}
            <div className="arrow-container absolute top-0 left-0 z-20 h-full w-16 flex items-center justify-center">
                <ArrowIcon color="white" />
            </div>
        </motion.a>
    );
};


// --- Main App Component with Enhanced Layout ---
const App = () => {
    const videoRef = useRef(null);

    return (
        <div className="bg-white min-h-screen flex flex-col-reverse lg:flex-row font-satoshi overflow-hidden">
            {/* Left Column: Video Player */}
            <div className="w-full lg:w-1/2 relative">
                <div
                    className="absolute inset-0 z-0 opacity-10 h-full"
                    style={{
                        backgroundImage: 'radial-gradient(#9ca3af 2px, transparent 2px)',
                        backgroundSize: '20px 20px',
                    }}
                />
                <div className="relative z-10 flex items-center justify-center h-full p-16 lg:p-8">
                    <div
                        className="relative w-full lg:w-[99%] h-[70%] lg:h-[95%] rounded-xl overflow-hidden"
                    >
                         <video
                            ref={videoRef}
                            src="/video2.mp4"
                            className="absolute rounded-xl top-0 left-0 w-full h-full object-cover"
                            loop
                            autoPlay
                            muted
                            playsInline
                            preload="metadata"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-16 lg:p-32 py-24">
                 <div 
                    className="max-w-3xl w-full text-left space-y-10"
                >
                    <h1
                        className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tighter"
                    >
                        <span className="text-red-600">AVITEC's </span>Extraordinary Teams Building Inspiring Projects
                    </h1>
                    <p
                        className="text-gray-700 text-2xl leading-relaxed"
                    >
                        We deliver first-of-a-kind projects that improve quality of life, foster economic growth, and promote sustainable development worldwide — from clean and efficient transportation systems and sustainable energy solutions to advanced manufacturing facilities.
                    </p>
                    <div
                        className="flex items-center gap-8 pt-6"
                    >
                        <AnimatedLink />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

