'use client'
import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CorporateCarousel = () => {
  const componentRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayTextRef = useRef(null);
  const galleryRef = useRef(null);

  // --- REFINED: New images with varied, smaller dimensions ---
  const gridItems = [
    {
      title: "Innovations in Construction",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80", 
      width: "w-80",
      height: "h-64"
    },
    {
      title: "Strategic Procurement",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80", 
      width: "w-60",
      height: "h-80"
    },
    {
      title: "Engineering Excellence",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1581091012184-5c814c52b8d4?auto=format&fit=crop&w=1000&q=80", 
      width: "w-96",
      height: "h-64"
    },
    {
      title: "Corporate Collaboration",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80", 
      width: "w-64",
      height: "h-80"
    },
    {
      title: "Modern Infrastructure",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=720&q=80", 
      width: "w-72",
      height: "h-56"
    },
    {
      title: "Company Vision",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", 
      width: "w-80",
      height: "h-64"
    }
  ];
  
  

  const headline = "AVITEC works for a better future";
  const paragraph = "AVITEC was founded to develop and expand services to Customers in the Energy, Oil, Gas, and Petrochemical industries with a modern, advanced, innovative, and sustainable approach.";

  useLayoutEffect(() => {
    const component = componentRef.current;
    const contentWrapper = contentWrapperRef.current;
    const overlay = overlayRef.current;
    const overlayText = overlayTextRef.current;
    const words = overlayText.querySelectorAll('.split-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(contentWrapper,
        { yPercent: 15 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: component,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          }
        }
      );
      
      gsap.set(overlay, {
        position: 'absolute',
        backgroundColor: '#F9FAFB',
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
          trigger: component,
          start: "bottom bottom",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to({}, { duration: 1 })
        .to(overlay, {
          height: '100vh',
          left: '0vw',
          right: '0vw',
          borderRadius: 0,
          duration: 1,
          ease: 'power1.inOut'
        }, "overlay_in")
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

  // --- NEW: Drag & Push Gallery (Mouse + Touch) ---
  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
      gallery.classList.add("dragging");
    };

    const handleMouseLeave = () => {
      isDown = false;
      gallery.classList.remove("dragging");
    };

    const handleMouseUp = () => {
      isDown = false;
      gallery.classList.remove("dragging");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.2; // speed factor
      gallery.scrollLeft = scrollLeft - walk;
    };

    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = gallery.scrollLeft;
    };

    const handleTouchMove = (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1.2;
      gallery.scrollLeft = touchScrollLeft - walk;
    };

    gallery.addEventListener("mousedown", handleMouseDown);
    gallery.addEventListener("mouseleave", handleMouseLeave);
    gallery.addEventListener("mouseup", handleMouseUp);
    gallery.addEventListener("mousemove", handleMouseMove);

    gallery.addEventListener("touchstart", handleTouchStart);
    gallery.addEventListener("touchmove", handleTouchMove);

    return () => {
      gallery.removeEventListener("mousedown", handleMouseDown);
      gallery.removeEventListener("mouseleave", handleMouseLeave);
      gallery.removeEventListener("mouseup", handleMouseUp);
      gallery.removeEventListener("mousemove", handleMouseMove);

      gallery.removeEventListener("touchstart", handleTouchStart);
      gallery.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div ref={componentRef} className="relative bg-gray-900 min-h-screen text-gray-100" style={{ zIndex: 10 }}>
      <div ref={contentWrapperRef} className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 md:mb-24 mt-12 md:mt-20 text-center md:text-left">
            <p className="text-gray-100 text-xs font-medium tracking-wider uppercase mb-6">
              WHAT WE BELIEVE
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-gray-50 max-w-3xl mx-auto md:mx-0 leading-tight">
              We believe in the power of energy to transform lives,
              enhance communities, and advance human progress.
            </h1>
          </div>

          <div className="relative">
            <div
              ref={galleryRef}
              className="flex items-end gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {gridItems.map((item, index) => (
                <div
                  key={index}
                  className={`group relative cursor-pointer flex-shrink-0 ${item.width} ${item.height} rounded-lg overflow-hidden`}
                >
                  <div className="relative w-full h-full bg-gray-800 rounded-lg border border-white/10 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col">
                    <div className="flex-1 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-base font-medium text-white mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
                        <span className="text-sm font-medium">{item.description}</span>
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
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
      </div>

      <div ref={overlayRef} className="pointer-events-none overflow-hidden">
        <div ref={overlayTextRef} className="w-full h-full flex items-center justify-center">
          <div className="text-gray-900 text-center max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              {headline.split(" ").map((word, index) => (
                <span key={index} className="inline-block overflow-hidden">
                  <span className="inline-block split-word">{word}&nbsp;</span>
                </span>
              ))}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-gray-700">
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
