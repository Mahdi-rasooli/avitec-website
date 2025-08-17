"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import image1 from '../../public/img1.jpg'
import image2 from '../../public/img2.jpg'
import image3 from '../../public/img3.jpg'
import image4 from '../../public/img4.jpg'
import image5 from '../../public/img5.jpg'
import image6 from '../../public/img6.jpg'
import image7 from '../../public/img7.jpg'
import image8 from '../../public/img8.jpg'
import image9 from '../../public/img9.jpg'
import image10 from '../../public/img10.jpg'
import image12 from '../../public/img12.jpg'


gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
  {
    id: 1,
    title: "Engineering Excellence",
    subtitle: "Innovation • Precision • Sustainability",
    content: "Our engineering services provide innovative solutions for complex challenges. We focus on delivering sustainable and efficient designs that stand the test of time, ensuring your project's success from concept to completion.",
    features: ["Advanced CAD Design", "Structural Analysis", "Environmental Impact", "Quality Assurance"],
    img: "https://unsplash.com/photos/a-black-and-white-photo-of-a-building-with-scaffolding-1zBtevAUvNg",
    stats: { value: "500+", label: "Projects" }
  },
  {
    id: 2,
    title: "Strategic Procurement",
    subtitle: "Efficiency • Quality • Cost Optimization", 
    content: "We streamline the procurement process, ensuring timely delivery of high-quality materials and services. Our strategic sourcing and supplier management expertise minimizes costs and risks for your project.",
    features: ["Global Supplier Network", "Cost Optimization", "Risk Management", "Quality Assurance"],
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    stats: { value: "98%", label: "On Time" }
  },
  {
    id: 3,
    title: "Premium Construction",
    subtitle: "Safety • Craftsmanship • Reliability",
    content: "Our construction teams are committed to safety, quality, and efficiency. We manage every aspect of the construction process to deliver projects on time and within budget, with a focus on craftsmanship and attention to detail.",
    features: ["Safety First Protocol", "Premium Materials", "Expert Craftsmanship", "Timely Delivery"],
    img: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1600&q=80",
    stats: { value: "100%", label: "Safety Record" }
  },
];

export default function WorkSection() {
  useEffect(() => {
    const titles = gsap.utils.toArray(".left-content");
    const cards = gsap.utils.toArray(".right .card");

    // wrapper element to animate subtle background color when cards change
    const wrapperEl = document.querySelector('.wrapper');
    const bgColors = ['#f8fafc', '#eef2ff', '#f0fff4'];

    // Initial setup - set all text elements to hidden state
    const allTextElements = gsap.utils.toArray(".text-element");
    gsap.set(allTextElements, { autoAlpha: 0, y: 30, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=" + 100 * cards.length + "%",
        scrub: true,
        pin: true,
      },
    });

    cards.forEach((card, i) => {
      const title = titles[i];
      const prevTitle = titles[i - 1];

      // Card reveal animation
      tl.to(card, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "none",
      }).call(
        () => {
          const direction = tl.scrollTrigger.direction > 0;
          const currentTextElements = title?.querySelectorAll('.text-element') || [];
          
          if (direction) {
            // Scrolling down - show current content with stagger
            gsap.to(title, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
            gsap.to(currentTextElements, {
              autoAlpha: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.1
            });
          } else {
            // Scrolling up - hide current content
            gsap.to(currentTextElements, {
              autoAlpha: 0,
              y: 50,
              scale: 0.95,
              duration: 0.3,
              stagger: -0.05,
              ease: "power2.in"
            });
            gsap.to(title, {
              autoAlpha: 0,
              y: 100,
              duration: 0.3,
              delay: 0.2,
              ease: "power2.in"
            });
          }
        },
        [],
        i + 0.5
      );

      // Handle previous title
      if (prevTitle) {
        tl.call(
          () => {
            const direction = tl.scrollTrigger.direction > 0;
            const prevTextElements = prevTitle?.querySelectorAll('.text-element') || [];
            
            if (direction) {
              // Scrolling down - hide previous content
              gsap.to(prevTextElements, {
                autoAlpha: 0,
                y: -30,
                scale: 0.9,
                duration: 0.3,
                stagger: -0.05,
                ease: "power2.in"
              });
              gsap.to(prevTitle, {
                autoAlpha: 0,
                y: -50,
                duration: 0.3,
                delay: 0.1,
                ease: "power2.in"
              });
            } else {
              // Scrolling up - show previous content
              gsap.to(prevTitle, {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              });
              gsap.to(prevTextElements, {
                autoAlpha: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.08,
                ease: "power2.out",
                delay: 0.1
              });
            }
          },
          [],
          "<"
        );
      }

      // Background color change
      tl.call(() => {
        const color = bgColors[i] || '#ffffff';
        if (wrapperEl) gsap.to(wrapperEl, { backgroundColor: color, duration: 0.6, ease: 'power1.out' });
      }, [], i + 0.6);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full">
      <div className="wrapper w-full flex overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 transition-colors duration-500">
        {/* Left Content - Enhanced Styling */}
        <div className="column left relative flex-1 flex justify-center items-center h-screen overflow-hidden px-8 md:px-20">
          {sectionsData.map((section, i) => (
            <div
              key={section.id}
              className="left-content absolute opacity-0 invisible text-gray-900 flex items-center justify-center"
            >
              {/* Content positioned outside any bordered container */}
              <div className="w-full max-w-2xl space-y-8">
                {/* Section Number */}
                <div className="text-element flex items-center gap-6 mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl transform hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: section.accentColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="h-px flex-1" style={{ 
                    background: `linear-gradient(to right, ${section.accentColor}40, transparent)` 
                  }}></div>
                </div>

                {/* Title */}
                <div className="text-element space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 leading-tight">
                    {section.title}
                  </h1>
                  <p className="text-lg font-medium text-gray-500 tracking-wide">
                    {section.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-element text-xl text-gray-700 leading-relaxed font-light">
                  {section.content}
                </p>

                {/* Features */}
                <div className="text-element grid grid-cols-2 gap-4">
                  {section.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div 
                        className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: section.accentColor }}
                      ></div>
                      <span className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-element pt-4">
                  <button 
                    className="group relative inline-flex items-center gap-3 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1"
                    style={{ backgroundColor: section.accentColor }}
                  >
                    <span>Explore {section.title}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Cards - Enhanced Visual Design */}
        <div className="column right relative flex-1 flex justify-center items-center h-screen p-8">
          {sectionsData.map((section, i) => (
            <div
              key={section.id}
              className="card absolute w-[85%] h-[85%] max-w-[500px] max-h-[500px] rounded-3xl overflow-hidden [clip-path:polygon(0%_100%,100%_100%,100%_100%,0_100%)] shadow-2xl ring-1 ring-black/10 group"
              style={{
                backgroundImage: `url(${section.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
              
              {/* Floating Stats Card */}
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/30 shadow-lg">
                <div className="text-black font-bold text-lg">{section.stats.value}</div>
                <div className="text-black/80 text-xs font-medium">{section.stats.label}</div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-4">
                  <h2 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
                    {section.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                    <div className="text-white/90 text-sm font-medium">
                      Industry Leading Excellence
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-40 h-40 border border-white rounded-full animate-spin-slow"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}