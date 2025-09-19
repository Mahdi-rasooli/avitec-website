'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowRight, MoveRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import image3 from '../../public/img3.jpg'
import image7 from '../../public/img7.jpg'
import image5 from '../../public/img5.jpg'
import image8 from '../../public/img8.jpg'
import image16 from '../../public/img16.jpg'
import image10 from '../../public/img10.jpg'
import image21 from '../../public/img21.jpg'
import image22 from '../../public/img22.jpg'
import image23 from '../../public/img23.jpg'



// Data for the slides, making the component data-driven
const slides = [
  {
    id: 'engineering',
    text: 'Engineering',
    mobileTitle: 'Precision Engineering',
    subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: image16
  },
  {
    id: 'procurement',
    text: 'Procurement',
    mobileTitle: 'Strategic Procurement',
    subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: image7
  },
  {
    id: 'construction',
    text: 'Construction',
    mobileTitle: 'Excellence in Construction',
    subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: image8,
  },
];

const HeroTest = () => {
  const componentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroBackgroundRef = useRef(null);
  const heroContentRef = useRef(null);
  const navigatorSectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const navigationRef = useRef(null);
  const progressBarRef = useRef(null);
  const spotlightRef = useRef(null);
  const skipButtonRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  const imageRefs = useRef([]);
  const overlayRefs = useRef([]);
  const textRefs = useRef([]);
  const baseThumbRefs = useRef([]);
  const glassThumbRefs = useRef([]);
  const baseBorderRefs = useRef([]);
  const glassBorderRefs = useRef([]);

  const navVisible = useRef(false);
  const stRef = useRef(null);
  const navTlRef = useRef(null);
  const activeThumbIndexRef = useRef(-1);

  const galleryRef = useRef(null);
  const mobileLenisRef = useRef(null);
  const mobileRafIdRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Dynamically import Lenis only on the client-side for the mobile effect
    let Lenis;
    import('@studio-freight/lenis').then(module => {
      Lenis = module.default;
    });

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    // Horizontal scrolling for mobile gallery
    if (isMobile && galleryRef.current && Lenis) {
      const wrapper = galleryRef.current;
      const content = wrapper.querySelector('.gallery-content');

      const lenis = new Lenis({
        wrapper: wrapper,
        content: content,
        orientation: 'horizontal',
        gestureDirection: 'vertical',
        lerp: 0.1,
        smoothWheel: true,
        smoothTouch: true,
      });
      mobileLenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        mobileRafIdRef.current = requestAnimationFrame(raf);
      };
      mobileRafIdRef.current = requestAnimationFrame(raf);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mobileRafIdRef.current) cancelAnimationFrame(mobileRafIdRef.current);
      if (mobileLenisRef.current) {
        mobileLenisRef.current.stop();
        mobileLenisRef.current.destroy();
        mobileLenisRef.current = null;
      }
    };
  }, [isMobile]);

  const scrollToSlide = (slideIndex) => {
    if (isMobile || !stRef.current) return;

    // // << REFINEMENT: Define constants for animation breakpoints
    const HERO_END = 0.2;
    const IMAGE_END = 1;

    const total = slides.length - 1;
    const normalized = slideIndex / total;
    const targetProgress = HERO_END + normalized * (IMAGE_END - HERO_END);
    const targetScrollY = stRef.current.start + targetProgress * (stRef.current.end - stRef.current.start);

    gsap.to(window, { scrollTo: { y: targetScrollY }, duration: 1.2, ease: 'power2.inOut' });
    
    requestAnimationFrame(() => {
      const thumbs = baseThumbRefs.current;
      if (!progressBarRef.current || !spotlightRef.current || !thumbs[0]) return;

      // << REFINEMENT: Define thumbnail dimensions as constants
      const THUMB_WIDTH = 270;
      const THUMB_GAP = 24;

      const lastIndex = thumbs.length - 1;
      const leftInset = slideIndex * (THUMB_WIDTH + THUMB_GAP);
      const trackWidth = (thumbs[lastIndex].offsetLeft || 0) + THUMB_WIDTH;
      const rightInset = Math.max(0, trackWidth - (leftInset + THUMB_WIDTH));
      
      gsap.set(progressBarRef.current, { width: leftInset + THUMB_WIDTH });
      gsap.set(spotlightRef.current, { clipPath: `inset(0px ${rightInset}px 0px ${leftInset}px)` });
    });
  };

  const handleTagClick = (slideId) => {
    const slideIndex = slides.findIndex(slide => slide.id === slideId);
    if (slideIndex !== -1) scrollToSlide(slideIndex);
  };

  const handleThumbnailClick = (slideIndex) => {
    scrollToSlide(slideIndex);
  };

  const handleSkipSection = () => {
    if (!stRef.current) return;
    const targetScrollY = stRef.current.end + 100;
    gsap.to(window, { scrollTo: { y: targetScrollY }, duration: 1.0, ease: 'none' });
  };

  useLayoutEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // << REFINEMENT: Animation constants are now defined here for easier management
    const HERO_END = 0.2;
    const IMAGE_END = 1;
    const NAVIGATOR_RETRACT_START = 0.5;
    const THUMB_WIDTH = 270;
    const THUMB_GAP = 24;

    const ctx = gsap.context(() => {
        const { heroSection, heroBackground, navigatorSection, imageContainer, navigation, heroContent, skipButton } = {
          heroSection: heroSectionRef.current, heroBackground: heroBackgroundRef.current, navigatorSection: navigatorSectionRef.current,
          imageContainer: imageContainerRef.current, navigation: navigationRef.current, heroContent: heroContentRef.current, skipButton: skipButtonRef.current,
        };
        
        const titles = textRefs.current.map(ref => ref?.querySelector('h2'));
        const paragraphs = textRefs.current.map(ref => ref?.querySelector('p'));

        // Using quickSetter for performance is a great choice
        const setHeroContentOpacity = gsap.quickSetter(heroContent, 'opacity');
        const setHeroSectionX = gsap.quickSetter(heroSection, 'xPercent');
        const setImageContainerX = gsap.quickSetter(imageContainer, 'x', 'vw');
        const setNavigatorX = gsap.quickSetter(navigatorSection, 'x', 'vw');

        const applyThumbBorder = (index) => {
            if (activeThumbIndexRef.current === index) return;
            const prev = activeThumbIndexRef.current;
            if (prev >= 0) gsap.set([baseBorderRefs.current[prev], glassBorderRefs.current[prev]], { autoAlpha: 0 });
            gsap.set([baseBorderRefs.current[index], glassBorderRefs.current[index]], { autoAlpha: 1 });
            activeThumbIndexRef.current = index;
        };
        const clearThumbBorder = () => {
            const prev = activeThumbIndexRef.current;
            if (prev >= 0) {
                gsap.set([baseBorderRefs.current[prev], glassBorderRefs.current[prev]], { autoAlpha: 0 });
                activeThumbIndexRef.current = -1;
            }
        };

        // Initial scene setup
        gsap.from(heroContent.children, { autoAlpha: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.5 });
        gsap.set(componentRef.current, { height: '100vh', overflow: 'hidden' });
        
        gsap.set(heroSection, { position: 'absolute', left: 0, top: 0, width: '50vw', height: '100%', zIndex: 5 });
        gsap.set(imageContainer, { position: 'absolute', left: '50vw', top: 0, width: '100vw', height: '100%', zIndex: 3 });
        gsap.set(navigatorSection, { position: 'absolute', left: '50vw', top: 0, width: '25vw', height: '100%', zIndex: 4, background: '#262836f2' });
        
        gsap.set(imageRefs.current, { x: '0%' });
        gsap.set(imageRefs.current.slice(1), { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });

        gsap.set(imageRefs.current.map(ref => ref.querySelector('.slide-image')), { filter: 'none', scale: 1 });
        gsap.set(overlayRefs.current, { opacity: (i) => i === 0 ? 0.25 : 0.35 });
        gsap.set(textRefs.current, { opacity: 0, y: 50 });
        gsap.set([navigation, skipButton], { autoAlpha: 0, visibility: 'hidden', pointerEvents: 'none' });
        gsap.set(progressBarRef.current, { width: THUMB_WIDTH });
        navVisible.current = false;

        const navTl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power3.out' } })
            .to(navigation, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)' }, 0)
            .to(skipButton, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)' }, 0.05)
            .to(textRefs.current[0], { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power4.out' }, 0.2);
        gsap.set([navigation, skipButton], { y: 16, scale: 0.98, filter: 'blur(6px)' });
        navTl.eventCallback('onStart', () => gsap.set([navigation, skipButton], { visibility: 'visible', pointerEvents: 'auto' }));
        navTl.eventCallback('onComplete', () => gsap.set([navigation, skipButton], { pointerEvents: 'auto' }));
        navTl.eventCallback('onReverseComplete', () => gsap.set([navigation, skipButton], { pointerEvents: 'none', visibility: 'hidden' }));
        navTlRef.current = navTl;

        const masterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: componentRef.current, pin: true, scrub: 0.1, start: 'top top',
              end: `+=${slides.length * 150 + 180}%`, anticipatePin: 1,
              fastScrollEnd: true, invalidateOnRefresh: true,

              onUpdate: (self) => {
                const { progress } = self;
            
                if (progress <= HERO_END) {
                    const sectionProgress = progress / HERO_END;
                    const easedSectionProgress = gsap.parseEase('power1.inOut')(sectionProgress);  

                    setHeroSectionX(-100 * easedSectionProgress);
                    setImageContainerX(-50 * easedSectionProgress);
                    setHeroContentOpacity(1 - easedSectionProgress);
                    gsap.set(heroBackground, { opacity: 1 });
                    
                    const retractionDistance = 75 - (50 * NAVIGATOR_RETRACT_START);
                    let navX = (easedSectionProgress <= NAVIGATOR_RETRACT_START) 
                        ? -50 * easedSectionProgress 
                        : -50 * NAVIGATOR_RETRACT_START - retractionDistance * ((easedSectionProgress - NAVIGATOR_RETRACT_START) / (1 - NAVIGATOR_RETRACT_START));
                    setNavigatorX(navX);
              
                    if (scrollIndicatorRef.current) {
                        // Scroll indicator now starts fading earlier
                        const startFade = 0.96; // Changed from 0.92
                        const opacity = easedSectionProgress <= startFade ? 1 : Math.max(0, 1 - ((easedSectionProgress - startFade) / (1 - startFade)));
                        
                        gsap.set(scrollIndicatorRef.current, { autoAlpha: opacity, x: `${navX * 1.08}vw` });
            
                        const line = scrollIndicatorRef.current.querySelector('.arrow-line');
                        const icon = scrollIndicatorRef.current.querySelector('svg');
                        if (line && icon) {
                            line.style.width = `${Math.min(192, 32 + (easedSectionProgress * 280))}px`;
                            icon.style.opacity = Math.min(1, easedSectionProgress * 6);
                        }
                    }
            
                    gsap.set(textRefs.current, { opacity: 0, y: 50 });
                    gsap.set(imageRefs.current.slice(1), { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });
                    if (navVisible.current) { navTlRef.current?.reverse(); navVisible.current = false; }
            
                } else {
                    gsap.set(heroContent, { opacity: 0 });
                    gsap.set(heroBackground, { opacity: 0 });
                    setHeroSectionX(-100);
                    setImageContainerX(-50);
                    setNavigatorX(-75);
                    if (scrollIndicatorRef.current) gsap.set(scrollIndicatorRef.current, { autoAlpha: 0 });
                    if (!navVisible.current) { navTlRef.current?.play(0); navVisible.current = true; }
            
                    const imageSectionProgress = (progress - HERO_END) / (IMAGE_END - HERO_END);
            
                    if (progress <= IMAGE_END) {
                        const totalSlides = slides.length - 1;
                        const currentSlideFloat = imageSectionProgress * totalSlides;
                        const currentSlide = Math.floor(currentSlideFloat);
                        const slideTransitionProgress = currentSlideFloat - currentSlide;
                        const easedSlide = gsap.parseEase('power3.inOut')(slideTransitionProgress);
                        
                        const nearestIndex = Math.round(currentSlideFloat);
                        if (Math.abs(currentSlideFloat - nearestIndex) <= 0.03) applyThumbBorder(nearestIndex);
                        else clearThumbBorder();
            
                        imageRefs.current.forEach((imgRef, index) => {
                            if (index > currentSlide) {
                                const isNext = index === currentSlide + 1;
                                // const reveal = isNext ? 100 - (100 * easedSlide) : 100;
                                const reveal = isNext ? 100 - (100 * Math.pow(easedSlide, 0.55)) : 100;

                                
                                //Added scale animation alongside blur
                                const blur = isNext ? 8 * (1 - easedSlide) : 8;
                                const scale = isNext ? 1 + 0.15 * (1 - easedSlide) : 1.15; // Zoom from 1.15 to 1
                                gsap.set(imgRef.querySelector('.slide-image'), { filter: `blur(${blur}px)`, scale: scale });
                                gsap.set(imgRef, { clipPath: `polygon(${reveal}% 0%, 100% 0%, 100% 100%, ${reveal}% 100%)` });
                            } else {
                                // Ensure current/past images are not scaled
                                gsap.set(imgRef.querySelector('.slide-image'), { filter: 'blur(0px)', scale: 1 });
                                gsap.set(imgRef, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
                            }
                        });
            
                        overlayRefs.current.forEach((overlayRef, index) => {
                            if (index === currentSlide) gsap.set(overlayRef, { opacity: 0.25 + (0.10 * easedSlide) });
                            else if (index === currentSlide + 1) gsap.set(overlayRef, { opacity: 0.35 - (0.10 * easedSlide) });
                        });
            
                        textRefs.current.forEach((textRef, index) => {
                            if (index === 0) {
                                if (currentSlide === 0) {
                                    const fadeOutProgress = slideTransitionProgress > 0.5 ? Math.min(1, (slideTransitionProgress - 0.5) / 0.5) : 0;
                                    if (fadeOutProgress > 0) {
                                        const opacity = 1 - gsap.parseEase("power2.out")(fadeOutProgress);
                                        const y = 60 * gsap.parseEase("power2.in")(fadeOutProgress);
                                        gsap.set(textRef, { opacity, y });
                                    }
                                }
                            } else {
                                let opacity = 0, y = 60;
                                if (index === currentSlide) {
                                    const fadeOutProgress = slideTransitionProgress > 0.5 ? Math.min(1, (slideTransitionProgress - 0.5) / 0.5) : 0;
                                    opacity = 1 - gsap.parseEase("power2.out")(fadeOutProgress);
                                    y = 60 * gsap.parseEase("power2.in")(fadeOutProgress);
                                }
                                if (index === currentSlide + 1 && slideTransitionProgress > 0.6) {
                                    const fadeInProgress = Math.min(1, (slideTransitionProgress - 0.6) / 0.4);
                                    opacity = gsap.parseEase("power2.out")(fadeInProgress);
                                    y = 60 * (1 - gsap.parseEase("power2.out")(fadeInProgress));
                                }
                                gsap.set(textRef, { opacity, y });
                            }
                        });
                        
                        if (progressBarRef.current && spotlightRef.current) {
                            const maxTravel = (slides.length - 1) * (THUMB_WIDTH + THUMB_GAP);
                            const currentX = imageSectionProgress * maxTravel;
                            const trackWidth = (slides.length * THUMB_WIDTH) + ((slides.length - 1) * THUMB_GAP);
                            const rightInset = trackWidth - (currentX + THUMB_WIDTH);
                            gsap.set(progressBarRef.current, { width: currentX + THUMB_WIDTH });
                            gsap.set(spotlightRef.current, { clipPath: `inset(0px ${rightInset}px 0px ${currentX}px)` });
                        }
                    } else {
                        gsap.set(imageRefs.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
                        imageRefs.current.forEach(ref => gsap.set(ref.querySelector('.slide-image'), { filter: 'blur(0px)', scale: 1 }));
                        if(overlayRefs.current[slides.length - 1]) gsap.set(overlayRefs.current[slides.length - 1], { opacity: 0.25 });
            
                        textRefs.current.forEach((textRef, index) => {
                            gsap.set(textRef, { opacity: index === slides.length - 1 ? 1 : 0, y: index === slides.length - 1 ? 0 : 60 });
                        });
            
                        if (progressBarRef.current && spotlightRef.current) {
                            const maxTravel = (slides.length - 1) * (THUMB_WIDTH + THUMB_GAP);
                            const trackWidth = (slides.length * THUMB_WIDTH) + ((slides.length - 1) * THUMB_GAP);
                            gsap.set(progressBarRef.current, { width: trackWidth });
                            gsap.set(spotlightRef.current, { clipPath: `inset(0px 0px 0px ${maxTravel}px)` });
                        }
                        applyThumbBorder(slides.length - 1);
                    }
                }
            },
            },
        });
        stRef.current = masterTimeline.scrollTrigger;
    }, componentRef);

    return () => {
        ctx.revert();
        if (stRef.current) stRef.current.kill();
    };
}, [isMobile]);

  // Mobile Layout remains unchanged
  if (isMobile) {
    return (
      <div className="bg-[#262836] min-h-screen">
        <div className="px-6 py-12 text-white">
          <h1 className="text-4xl font-bold mb-6 leading-tight md:leading-none">
            AVITEC is the
            <br />
            <span className="font-normal">Engineering</span>
            <br />
            <span className="font-normal">Procurement</span>
            <br />
            <span className="font-normal">Construction</span>
          </h1>
          <button className="group relative overflow-hidden cursor-pointer bg-red-600 text-white px-6 py-3 text-base font-medium inline-flex items-center gap-2">
            <span className="absolute inset-0 border border-red-600 bg-[#262836] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Learn More</span>
            <ArrowRight className="w-4 h-4 relative" />
          </button>
        </div>

        <div ref={galleryRef} className="relative h-screen overflow-hidden">
          <div className="gallery-content flex flex-nowrap h-full" style={{ width: `${slides.length * 100}vw` }}>
            {slides.map((slide, index) => (
              <div key={slide.id} className="w-screen h-screen relative flex-shrink-0">
                <Image src={slide.image} alt={slide.text} fill style={{ objectFit: 'cover' }} priority={index === 0} />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute left-6 top-1/4 z-10 text-white max-w-[80%]">
                  <h2 className="text-3xl font-bold mb-4 leading-tight">{slide.mobileTitle}</h2>
                  <p className="text-lg opacity-90 leading-relaxed">{slide.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout remains unchanged
  const thumbnailWidth = 270;
  const thumbnailGap = 24;
  const trackWidthStyle = {
    width: `${(slides.length * thumbnailWidth) + ((slides.length - 1) * thumbnailGap)}px`
  };

  return (
    <div ref={componentRef} className={`relative bg-[#262836] hero-test-container`}>
      <div className="h-screen w-screen relative">
        <section ref={heroSectionRef} className="flex text-white">
          <div ref={heroBackgroundRef} className="absolute inset-0 bg-[#262836]"></div>
          <div ref={heroContentRef} className="relative flex-1 flex justify-between items-center px-8 md:px-12 py-8 md:py-25 z-10">
            <div className="flex flex-col justify-center flex-1">
              <h1 className="text-5xl md:text-4xl lg:text-8xl mb-6 md:mb-8 leading-none tracking-wide font-extrabold">
                <span className='text-8xl'>AVITEC</span> <br /> <span>Is in the</span> <br /> <span>Bussines </span> <br /> <span>Of The Future</span>
              </h1>
              <button className="group relative overflow-hidden cursor-pointer bg-red-600 text-white px-8 py-3 text-lg font-medium inline-flex items-center gap-2 w-fit">
                <span className="absolute inset-0 border border-red-600 bg-[#262836] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
                <span className="relative">Learn More</span>
                <ArrowRight className="w-5 h-5 relative" />
              </button>
            </div>
          </div>
        </section>

        <div ref={navigatorSectionRef} className="flex flex-col gap-6 md:gap-8 text-lg justify-center items-center p-4 text-white">
          {slides.map((slide) => (
            <div key={slide.id} className="group cursor-pointer" onClick={() => handleTagClick(slide.id)}>
              <div className="inline-flex items-center relative">
                <span className={`text-gray-300 text-4xl group-hover:text-white transition-colors duration-300 underline hover:no-underline`}>{slide.text}</span>
                <MoveRight size={30} className=" ml-1 text-gray-400 group-hover:text-white transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div ref={imageContainerRef} className="relative h-full overflow-hidden bg-black">
          {slides.map((slide, index) => (
            <div key={slide.id} ref={el => imageRefs.current[index] = el} className="absolute inset-0 w-full h-full">
              <Image src={slide.image} alt={slide.text} fill style={{ objectFit: 'cover' }} className="slide-image" priority={index === 0} />
              <div ref={el => overlayRefs.current[index] = el} className="absolute inset-0 bg-black"></div>
              <div ref={el => textRefs.current[index] = el} className="absolute left-4 md:left-16 top-45 md:top-30 z-10 text-white">
                <h2 className="text-3xl md:text-7xl font-extrabold mb-6 leading-tight">{slide.text}</h2>
                <p className="text-lg md:text-2xl font-bold opacity-90 max-w-lg leading-relaxed mb-8">{slide.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        <div ref={skipButtonRef} className="fixed max-sm:hidden bottom-4 md:bottom-8 right-4 md:right-8 z-50 opacity-0">
          <button onClick={handleSkipSection} className="group cursor-pointer relative overflow-hidden top-8 left-8 bg-white/90 border border-white/20 text-black px-10 py-7 rounded-none font-medium inline-flex items-center gap-2  transition-all duration-300 hover:scale-105 hover:text-white">
            <span className="absolute inset-0 bg-red-500 transform -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0 rounded-none"></span>
            <span className="relative text-lg font-bold">Skip Section</span>
            <ChevronDown className="w-4 h-4 relative transform group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        <div ref={scrollIndicatorRef} className="absolute top-1/2 -right-30 -translate-y-1/2 z-20 text-white flex items-center space-x-2 md:space-x-4 pointer-events-none">
          <div className="flex items-center">
            <span className="text-lg font-bold opacity-75 mr-4">Scroll</span>
            <div className="relative overflow-hidden w-48">
              <div className="flex items-center">
                <div className="arrow-line h-px bg-white/50 transition-all duration-500 ease-out" style={{ width: '32px' }}></div>
                <svg className="w-6 h-6 ml-2 transition-opacity duration-300" style={{ opacity: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div ref={navigationRef} className="fixed bottom-8 md:bottom-12 left-4 md:left-12 z-50 opacity-0 px-4 md:px-0">
          <div className="relative mb-4 md:mb-6">
            <div className="w-full h-0.5 bg-gray-200 shadow-2xl rounded-lg"></div>
            <div ref={progressBarRef} className="absolute rounded-lg top-0 left-0 h-0.5 bg-red-500 shadow-2xl shadow-blue-500/50"></div>
          </div>
          <div className="flex gap-4 md:gap-6 relative overflow-hidden">
            {slides.map((slide, i) => (
              <div key={i} className={`overflow-hidden rounded-none transition-all duration-500 relative z-10 cursor-pointer flex-shrink-0 border-gray-400/30 opacity-100`} style={{ width: '270px', height: '150px' }} ref={el => baseThumbRefs.current[i] = el} onClick={() => handleThumbnailClick(i)}>
                <Image src={slide.image} alt={`thumbnail-${i}`} fill style={{ objectFit: 'cover' }} />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 right-1 md:right-2">
                  <p className="text-white text-md md:text-base font-extrabold truncate">{slide.text}</p>
                </div>
                <div ref={el => baseBorderRefs.current[i] = el} className="pointer-events-none absolute inset-0 z-30 rounded-none opacity-0 border-2 border-white shadow-[0_0_0_2px_rgba(255,255,255,1)] transition-opacity duration-150" />
              </div>
            ))}
            <div ref={spotlightRef} className="absolute top-0 left-0 h-full pointer-events-none z-20 overflow-hidden">
              <div className="h-full flex gap-4 md:gap-6" style={trackWidthStyle}>
                {slides.map((slide, i) => (
                  <div key={`spotlight-${i}`} className="rounded-none shadow-2xl bg-white/[.20] backdrop-blur-sm backdrop-saturate-150 flex-shrink-0 relative" style={{ width: '270px', height: '150px' }} ref={el => glassThumbRefs.current[i] = el} >
                     <Image src={slide.image} alt={`thumbnail-${i}`} fill style={{ objectFit: 'cover' }} />
                     <div className="absolute inset-0 bg-transparent"></div>
                     <div ref={el => glassBorderRefs.current[i] = el} className="pointer-events-none absolute inset-0 z-30 rounded-none opacity-0 border-2 border-white shadow-[0_0_0_2px_rgba(255,255,255,1)] transition-opacity duration-1000 ease-in" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTest;