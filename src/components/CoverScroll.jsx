'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import image1 from '../../../public/img1.jpg'
// import image2 from '../../../public/img2.jpg'
// import image3 from '../../../public/img3.jpg'
// import image4 from '../../../public/img4.jpg'
// import image5 from '../../../public/img5.jpg'
// import image6 from '../../../public/img6.jpg'
import image7 from '../../../public/img7.jpg'
import image8 from '../../../public/img8.jpg'
import image9 from '../../../public/img9.jpg'
import image10 from '../../../public/img10.jpg'
import image11 from '../../../public/img11.jpg'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Premium, high-impact images that match the corporate excellence theme
const slides = [
  {
    id: 'engineering',
    text: 'Engineering',
    subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: image10
  },
  {
    id: 'procurement',
    text: 'Procurement',
    subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: image7
  },
  {
    id: 'construction',
    text: 'Construction',
    subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?fit=crop&w=1920&q=80',
  },
];

const CoverScroll = () => {
  const componentRef = useRef(null);
  const horizontalStripRef = useRef(null);
  const navigationRef = useRef(null);
  const progressBarRef = useRef(null);
  const glossyBarRef = useRef(null);
  const navVisible = useRef(false);
  const heroContentRef = useRef(null);
  const stRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [activeImage, setActiveImage] = useState(-1);

  const handleTagClick = (slideId) => {
    const st = stRef.current;
    const strip = horizontalStripRef.current;
    if (!st || !strip) return;

    const targetEl = document.getElementById(`slide-${slideId}`);
    if (!targetEl) return;

    const scrollWidth = strip.scrollWidth - window.innerWidth;
    const targetOffsetLeft = targetEl.offsetLeft;

    const progress = targetOffsetLeft / scrollWidth;
    const targetScrollY = st.start + progress * (st.end - st.start);

    gsap.to(window, { scrollTo: { y: targetScrollY }, duration: 1.5, ease: 'power2.inOut' });
  };

  useLayoutEffect(() => {
    const strip = horizontalStripRef.current;
    const navigation = navigationRef.current;
    const allSections = gsap.utils.toArray(".desktop-section");
    const introSection = allSections[0];
    const imageSections = allSections.slice(1);

    gsap.from(heroContentRef.current.children, { autoAlpha: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.5 });

    const scrollWidth = strip.scrollWidth - window.innerWidth;

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: componentRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, { autoAlpha: 1 - self.progress * 20, duration: 0.1 });
          }
          
          const introWidth = introSection.offsetWidth;
          const progress = self.progress;
          const totalScroll = self.end - self.start;
          const introPortion = introWidth / totalScroll;

          const shouldBeVisible = progress > introPortion && progress < 0.99;
          if (shouldBeVisible !== navVisible.current) {
            navVisible.current = shouldBeVisible;
            gsap.to(navigation, { autoAlpha: shouldBeVisible ? 1 : 0, y: shouldBeVisible ? 0 : 30, duration: 0.3 });
          }

          if (progress > introPortion) {
            const horizontalProgress = gsap.utils.normalize(introPortion, 1, progress);
            const imageIndex = Math.floor(horizontalProgress * slides.length);
            setActiveImage(Math.min(imageIndex, slides.length - 1));

            const thumbnailWidth = 180;
            const thumbnailGap = 12;
            const maxProgressDistance = (slides.length - 1) * (thumbnailWidth + thumbnailGap);
            const progressX = horizontalProgress * maxProgressDistance;

            gsap.set([progressBarRef.current, glossyBarRef.current], { x: progressX, ease: 'none' });
          }
        },
      },
    });

    masterTimeline.to(strip, { x: -scrollWidth, ease: 'none' });
    stRef.current = masterTimeline.scrollTrigger;

    imageSections.forEach((section) => {
      const textEl = section.querySelector('.slide-text');
      const imageEl = section.querySelector('.slide-image');
      gsap.set(imageEl, { filter: 'blur(8px)', scale: 1.05 });

      ScrollTrigger.create({
        trigger: section,
        containerAnimation: masterTimeline,
        start: 'left center',
        end: 'right center',
        onEnter: () => gsap.to(textEl, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }),
        onLeave: () => gsap.to(textEl, { autoAlpha: 0, y: -40, duration: 0.4, ease: 'power2.in' }),
        onEnterBack: () => gsap.to(textEl, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(textEl, { autoAlpha: 0, y: 40, duration: 0.4, ease: 'power2.in' }),
      });

      ScrollTrigger.create({
        trigger: section,
        containerAnimation: masterTimeline,
        start: 'left 60%',
        end: 'right 40%',
        onEnter: () => gsap.to(imageEl, { filter: 'blur(0px)', scale: 1, duration: 0.5, ease: 'power2.out' }),
        onLeave: () => gsap.to(imageEl, { filter: 'blur(8px)', scale: 1.05, duration: 0.5, ease: 'power2.in' }),
        onEnterBack: () => gsap.to(imageEl, { filter: 'blur(0px)', scale: 1, duration: 0.5, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(imageEl, { filter: 'blur(8px)', scale: 1.05, duration: 0.5, ease: 'power2.in' }),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={componentRef} className="relative overflow-hidden">
      <div className="h-screen w-screen overflow-hidden relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '80%', animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ top: '60%', left: '10%', animationDelay: '4s', animationDuration: '12s' }}></div>
          <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ top: '30%', left: '40%', animationDelay: '2s', animationDuration: '10s' }}></div>
        </div>

        <div ref={horizontalStripRef} className="flex h-full w-max">
          <section className="desktop-section relative h-full w-[75vw] flex-shrink-0 flex text-white">
            {/* Main Hero Section */}
            <div className="w-2/3 h-full flex justify-center items-center relative overflow-hidden">
              {/* Dynamic gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute bottom-32 left-16 w-24 h-24 border border-emerald-400/30 rounded-lg rotate-45 animate-pulse"></div>
              <div className="absolute top-1/2 right-32 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>

              <div ref={heroContentRef} className="max-w-2xl text-left p-12 relative z-10">
                <h1 className="text-4xl font-black leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                  AVITEC was founded to develop and expand services to Customers in the Energy, Oil, Gas, and Petrochemical industries with a modern, advanced, innovative, and sustainable approach.
                </h1>

                {/* <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  We help clients shape better decisions through our expertise in risk, retirement, and health.
                  Experience the future of strategic consulting.
                </p> */}

                <div className="flex gap-4">
                  <button className="relative cursor-pointer overflow-hidden group border-2 border-white/30 hover:border-white/60 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 backdrop-blur-sm">
                    <span className="relative z-10 group-hover:text-blue-500 transition-colors duration-300">Learn More</span>
                    <span className="absolute inset-0 bg-white/80 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></span>
                  </button>

                </div>
              </div>
            </div>

            {/* Navigation Sidebar */}
            <div className="w-1/3 h-full flex flex-col justify-center items-center relative overflow-hidden">
              {/* Premium background with overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-blue-900 to-blue-900"></div>
              {/* <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Corporate office"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
              /> */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div> */}

              {/* Animated accent lines */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"></div>
              <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>

              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Navigate Sections
                  </h2>
                </div>

                <ul className="space-y-6">
                  {slides.map((slide, index) => (
                    <li key={slide.id}>
                      <button
                        onClick={() => handleTagClick(slide.id)}
                        className="group relative overflow-hidden px-8 py-4 border border-white/40  rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                      >
                        <span className="relative cursor-pointer z-10 text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">
                          {slide.text}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Image Slides */}
          {slides.map((slide, index) => (
            <section key={slide.id} id={`slide-${slide.id}`} className="desktop-section relative h-full w-screen flex-shrink-0 flex justify-center items-center overflow-hidden">
              {/* Dynamic background with parallax effect */}
              <div className="absolute top-0 left-0 h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.text}
                  layout="fill"
                  objectFit="cover"
                  priority={slide.id === 'engineering'}
                  className="slide-image"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20"></div>
              </div>



              {/* Enhanced text content - positioned to the left */}
              <div className="slide-text absolute left-16 top-1/4  z-10 text-white opacity-0 -translate-y-10">
                <div className="bg-gradient-to-br from-black/40 via-black/30 to-transparent border border-white/20 rounded-3xl shadow-2xl p-12 max-w-xl">
                  {/* Category badge */}
                  {/* <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full border border-white/30 backdrop-blur-sm mb-6">
                    <span className="text-blue-200 text-sm font-semibold tracking-widest uppercase">
                      {slide.id.replace(/^\w/, c => c.toUpperCase())} Excellence
                    </span>
                  </div> */}

                  <h2 className="text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    {slide.text}
                  </h2>
                  <p className="text-xl leading-relaxed text-slate-200 font-light tracking-wide">
                    {slide.subtext}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Scroll Right Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute top-1/2 right-16 -translate-y-1/2 z-20 text-white flex items-center space-x-4 pointer-events-none"
        >
          <span className="text-sm font-medium tracking-widest animate-pulse uppercase">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        {/* Enhanced Navigation Bar */}
        <div ref={navigationRef} className="fixed bottom-8 left-1/4 -translate-x-1/2 z-50 opacity-0">
          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="w-full h-1 bg-gradient-to-r from-black/20 via-black/40 to-black/20 rounded-full backdrop-blur-lg border border-white/20 shadow-2xl"></div>
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-1 bg-purple-500 rounded-full shadow-lg shadow-blue-500/50"
              style={{ width: '180px' }}
            ></div>
            {/* <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-white/30 to-transparent rounded-full animate-pulse" style={{ width: '60px' }}></div> */}
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-4 relative">
            {/* Glossy overlay */}
            <div
              ref={glossyBarRef}
              className="absolute top-0 left-0 rounded-2xl border-2 border-white/60 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-white/20 via-white/10 to-transparent"
              style={{ width: '180px', height: '120px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 rounded-2xl"></div>
            </div>

            {slides.map((slide, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border-2 transition-all duration-500 relative z-10 cursor-pointer hover:scale-110 ${activeImage === i
                  ? 'border-white/80 scale-105 shadow-xl shadow-blue-500/30'
                  : 'border-gray-400/30 opacity-60 hover:opacity-80'
                  }`}
                style={{ width: '180px', height: '120px' }}
                onClick={() => handleTagClick(slide.id)}
              >
                <Image src={slide.image} alt={`thumbnail-${i}`} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-sm font-semibold truncate">{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverScroll;