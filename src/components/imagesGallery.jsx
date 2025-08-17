'use client'
import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CorporateCarousel = () => {
  const componentRef = useRef(null);
  const greenOverlayRef = useRef(null);
  const greenTextRef = useRef(null);

  const gridItems = [
    {
      title: "Why we invest in our people",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&crop=face",
      width: "w-72",
      height: "h-76"
    },
    {
      title: "Aramco and Aston Martin Racing take on F1",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop",
      width: "w-64",
      height: "h-80"
    },
    {
      title: "The Manifa Story",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&h=350&fit=crop",
      width: "w-80",
      height: "h-48"
    },
    {
      title: "Our perspective",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1581094613018-e2c30cfb9efd?w=500&h=550&fit=crop",
      width: "w-68",
      height: "h-72"
    },
    {
      title: "Managing our footprint",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=450&fit=crop",
      width: "w-76",
      height: "h-56"
    },
    {
      title: "Resources for journalists",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=550&h=500&fit=crop",
      width: "w-70",
      height: "h-68"
    }
  ];

  const headline = "Forging the Future of Digital Interaction";
  const paragraph = "We blend cutting-edge technology with visionary design to create immersive web experiences that captivate and inspire.";

  useLayoutEffect(() => {
    const greenOverlay = greenOverlayRef.current;
    const greenText = greenTextRef.current;
    const words = greenText.querySelectorAll('.split-word');

    const ctx = gsap.context(() => {
      gsap.set(greenOverlay, {
        position: 'absolute',
        backgroundColor: '#818181', // Tailwind green-700
        bottom: 0,
        height: '0vh',
        left: '5vw',
        right: '5vw',
        borderRadius: 12,
        zIndex: 20,
        transformOrigin: 'bottom center',
        willChange: 'height,left,right,border-radius'
      });
      gsap.set(words, { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: "bottom bottom",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(greenOverlay, {
        height: '100vh',
        left: '0vw',
        right: '0vw',
        borderRadius: 0,
        duration: 1,
        ease: 'none'
      })
      .to(words, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
      }, "-=0.8")
      .to(words, {
        autoAlpha: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.03,
      }, "+=0.5");

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="relative bg-gray-50 py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-gray-500 text-xs font-medium tracking-wider uppercase mb-6">
            WHAT WE BELIEVE
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-gray-800 max-w-2xl leading-tight mb-30">
            We believe in the power of energy to help transform lives,
            enhance communities, and advance human progress.
          </h1>
        </div>

        <div className="relative">
          <div
            className="flex items-end gap-4 overflow-x-auto scrollbar-hide pb-2 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {gridItems.map((item, index) => (
              <div
                key={index}
                className={`group cursor-pointer flex-shrink-0 ${item.width} ${item.height}`}
              >
                <div className="relative w-full h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="bg-white p-4 h-20 flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-gray-800 mb-2 leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
                      <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="text-sm font-medium">{item.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Green overlay that rises and expands */}
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
  );
};

export default CorporateCarousel;