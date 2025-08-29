'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowRight, MoveRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import image7 from '../../public/img7.jpg'
import image8 from '../../public/img8.jpg'
import image16 from '../../public/img16.jpg'
import Lenis from '@studio-freight/lenis';

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

// Easing function for smooth scrolling
const easeInOutQuad = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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
  
  // Using ref arrays for dynamic slide handling
  const imageRefs = useRef([]);
  const overlayRefs = useRef([]);
  const textRefs = useRef([]);
  const baseThumbRefs = useRef([]);
  const glassThumbRefs = useRef([]);
  const baseBorderRefs = useRef([]);
  const glassBorderRefs = useRef([]);

  const navVisible = useRef(false);
  const stRef = useRef(null);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const navTlRef = useRef(null);
  const activeThumbIndexRef = useRef(-1);

  const galleryRef = useRef(null);
  const mobileLenisRef = useRef(null);
  const mobileRafIdRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Shared progress breakpoints for the animation
  const HERO_END = 0.25;
  const IMAGE_END = 0.86;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scrolling with Lenis for desktop
  // useEffect(() => {
  //   if (isMobile) return;
  //   const lenis = new Lenis({
  //     lerp: 0.09,
  //     smoothWheel: true,
  //     smoothTouch: false,
  //     wheelMultiplier: 1,
  //     touchMultiplier: 1,
  //     normalizeWheel: true,
  //     syncTouch: true,
  //   });
  //   lenisRef.current = lenis;

  //   const onScroll = () => ScrollTrigger.update();
  //   lenis.on('scroll', onScroll);

  //   const raf = (time) => {
  //     lenis.raf(time);
  //     rafIdRef.current = requestAnimationFrame(raf);
  //   };
  //   rafIdRef.current = requestAnimationFrame(raf);

  //   return () => {
  //     lenis.off('scroll', onScroll);
  //     if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
  //     lenis.stop();
  //     lenis.destroy();
  //     lenisRef.current = null;
  //   };
  // }, [isMobile]);

  // Horizontal scrolling for mobile gallery
  useEffect(() => {
    if (!isMobile || !galleryRef.current) return;

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
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      normalizeWheel: true,
    });
    mobileLenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      mobileRafIdRef.current = requestAnimationFrame(raf);
    };
    mobileRafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (mobileRafIdRef.current) cancelAnimationFrame(mobileRafIdRef.current);
      lenis.stop();
      lenis.destroy();
      mobileLenisRef.current = null;
    };
  }, [isMobile]);

  // Unified function to scroll to a specific slide
  const scrollToSlide = (slideIndex) => {
    if (isMobile) return;

    const st = stRef.current;
    if (!st) return;

    const total = slides.length - 1;
    const normalized = slideIndex / total;
    const targetProgress = HERO_END + normalized * (IMAGE_END - HERO_END);
    const targetScrollY = st.start + targetProgress * (st.end - st.start);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY, { duration: 1.2, easing: easeInOutQuad });
    } else {
      gsap.to(window, { scrollTo: { y: targetScrollY }, duration: 1.2, ease: 'power2.inOut' });
    }

    requestAnimationFrame(() => {
      const thumbs = baseThumbRefs.current;
      if (!progressBarRef.current || !spotlightRef.current || !thumbs[0]) return;
      const thumbWidth = thumbs[0].offsetWidth || 270;
      const lastIndex = thumbs.length - 1;
      const gap = thumbs[1] ? (thumbs[1].offsetLeft - thumbs[0].offsetLeft - thumbWidth) : 24;
      const leftInset = slideIndex * (thumbWidth + gap);
      const trackWidth = (thumbs[lastIndex].offsetLeft || 0) + thumbWidth;
      const rightInset = Math.max(0, trackWidth - (leftInset + thumbWidth));
      // Refined: Accumulate progress bar width instead of moving it
      gsap.set(progressBarRef.current, { width: leftInset + thumbWidth });
      gsap.set(spotlightRef.current, { clipPath: `inset(0px ${rightInset}px 0px ${leftInset}px)` });
    });
  };

  const handleTagClick = (slideId) => {
    const slideIndex = slides.findIndex(slide => slide.id === slideId);
    if (slideIndex !== -1) {
      scrollToSlide(slideIndex);
    }
  };

  const handleThumbnailClick = (slideIndex) => {
    scrollToSlide(slideIndex);
  };

  const handleSkipSection = () => {
    const st = stRef.current;
    if (!st) return;

    const targetScrollY = st.end + 100;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY, { duration: 1.0, easing: (t) => t });
    } else {
      gsap.to(window, { scrollTo: { y: targetScrollY }, duration: 1.0, ease: 'none' });
    }
  };

  useLayoutEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
        const { 
          heroSection, heroBackground, navigatorSection, imageContainer, 
          navigation, heroContent, skipButton 
        } = {
          heroSection: heroSectionRef.current,
          heroBackground: heroBackgroundRef.current,
          navigatorSection: navigatorSectionRef.current,
          imageContainer: imageContainerRef.current,
          navigation: navigationRef.current,
          heroContent: heroContentRef.current,
          skipButton: skipButtonRef.current,
        };
        
        const titles = textRefs.current.map(ref => ref?.querySelector('h2'));
        const paragraphs = textRefs.current.map(ref => ref?.querySelector('p'));

        const setHeroContentX = gsap.quickSetter(heroContent, 'xPercent');
        const setHeroContentOpacity = gsap.quickSetter(heroContent, 'opacity');
        const setHeroSectionX = gsap.quickSetter(heroSection, 'xPercent');
        const setImageContainerX = gsap.quickSetter(imageContainer, 'x', 'vw');
        const setNavigatorX = gsap.quickSetter(navigatorSection, 'x', 'vw');

        const applyThumbBorder = (index) => {
            if (activeThumbIndexRef.current === index) return;
            const prev = activeThumbIndexRef.current;
            if (prev >= 0) {
                gsap.set([baseBorderRefs.current[prev], glassBorderRefs.current[prev]], { autoAlpha: 0 });
            }
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
        gsap.set(navigatorSection, { position: 'absolute', left: '50vw', top: 0, width: '20vw', height: '100%', zIndex: 4, background: '#262836f2' });

        gsap.set(imageRefs.current, { x: '0%' });
        gsap.set(imageRefs.current.slice(1), { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });

        gsap.set(imageRefs.current.map(ref => ref.querySelector('.slide-image')), { filter: 'none', scale: 1, willChange: 'transform, opacity, filter' });
        gsap.set(overlayRefs.current, { opacity: (i) => i === 0 ? 0.25 : 0.35 });
        gsap.set(textRefs.current, { opacity: 0, y: 50 });
        gsap.set([navigation, skipButton], { autoAlpha: 0, visibility: 'hidden', pointerEvents: 'none', willChange: 'transform, opacity, filter' });
        gsap.set([imageContainer, heroSection, navigatorSection], { willChange: 'transform, z-index', backfaceVisibility: 'hidden' });
        gsap.set(imageRefs.current, { willChange: 'transform' });
        gsap.set(textRefs.current, { willChange: 'transform, opacity' });
        gsap.set(overlayRefs.current, { willChange: 'opacity' });
        gsap.set(progressBarRef.current, { width: 270 });
        navVisible.current = false;

        const navTl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power3.out' } })
            .to(navigation, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)' }, 0)
            .to(skipButton, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)' }, 0.05);
        gsap.set([navigation, skipButton], { y: 16, scale: 0.98, filter: 'blur(6px)' });
        navTl.eventCallback('onStart', () => gsap.set([navigation, skipButton], { visibility: 'visible', pointerEvents: 'auto' }));
        navTl.eventCallback('onComplete', () => gsap.set([navigation, skipButton], { pointerEvents: 'auto' }));
        navTl.eventCallback('onReverseComplete', () => gsap.set([navigation, skipButton], { pointerEvents: 'none', visibility: 'hidden' }));
        navTlRef.current = navTl;

        const masterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: componentRef.current,
              pin: true,
              scrub: 0.8,
              start: 'top top',
              end: `+=${slides.length * 100 + 120}%`,
              anticipatePin: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: true,

                onUpdate: (self) => {
                    const { progress } = self;

                    if (progress <= HERO_END) {
                        // --- Phase 1: Hero Animation (0 -> HERO_END) ---
                        const sectionProgress = progress / HERO_END;
                        // Refined ease for smoother feel
                        const easedSectionProgress = gsap.parseEase('power4.inOut')(sectionProgress);

                        setHeroSectionX(-100 * easedSectionProgress);
                        setImageContainerX(-50 * easedSectionProgress);
                        setHeroContentOpacity(1 - easedSectionProgress);
                        gsap.set(heroBackground, { opacity: 1 });
                        gsap.set(heroContent, { xPercent: 0 });

                        // Retraction logic for the navigator
                        const retractStart = 0.6;
                        let navX = (easedSectionProgress <= retractStart) 
                            ? -50 * easedSectionProgress 
                            : -50 * retractStart - 40 * ((easedSectionProgress - retractStart) / (1 - retractStart));
                        setNavigatorX(navX);

                        // Scroll indicator animation
                        if (scrollIndicatorRef.current) {
                            const startFade = 0.95;
                            const opacity = easedSectionProgress <= startFade ? 1 : Math.max(0, 1 - ((easedSectionProgress - startFade) / (1 - startFade)));
                            gsap.set(scrollIndicatorRef.current, { autoAlpha: opacity, x: `${-70 * easedSectionProgress}vw` });
                            const line = scrollIndicatorRef.current.querySelector('.arrow-line');
                            const icon = scrollIndicatorRef.current.querySelector('svg');
                            if (line && icon) {
                                line.style.width = `${Math.min(192, 32 + (easedSectionProgress * 280))}px`;
                                icon.style.opacity = Math.min(1, easedSectionProgress * 6);
                            }
                        }

                        // Reset things for the next phase
                        gsap.set(textRefs.current, { opacity: 0, y: 50 });
                        gsap.set(imageRefs.current.slice(1), { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });
                        if (navVisible.current) { navTlRef.current?.reverse(); navVisible.current = false; }

                    } else {
                        // --- Static state after Hero Animation ---
                        gsap.set(heroContent, { opacity: 0 });
                        gsap.set(heroBackground, { opacity: 0 });
                        setHeroSectionX(-100);
                        setImageContainerX(-50);
                        setNavigatorX(-70); // Final retracted position
                        if (scrollIndicatorRef.current) gsap.set(scrollIndicatorRef.current, { autoAlpha: 0 });
                        if (!navVisible.current) { navTlRef.current?.play(0); navVisible.current = true; }

                        // --- Phase 2 & 3: Image Sequence ---
                        const imageSectionProgress = (progress - HERO_END) / (IMAGE_END - HERO_END);

                        if (progress <= IMAGE_END) {
                            // --- Phase 2: Image Slideshow (HERO_END -> IMAGE_END) ---
                            const totalSlides = slides.length - 1;
                            const currentSlideFloat = imageSectionProgress * totalSlides;
                            const currentSlide = Math.floor(currentSlideFloat);
                            const slideTransitionProgress = currentSlideFloat - currentSlide;
                            // Refined ease for smoother wipes
                            const easedSlide = gsap.parseEase('power3.inOut')(slideTransitionProgress);
                            
                            const nearestIndex = Math.round(currentSlideFloat);
                            if (Math.abs(currentSlideFloat - nearestIndex) <= 0.03) {
                                applyThumbBorder(nearestIndex);
                            } else {
                                clearThumbBorder();
                            }

                            // Animate images (wipe transition)
                            imageRefs.current.forEach((imgRef, index) => {
                                if (index > currentSlide) {
                                    const isNext = index === currentSlide + 1;
                                    const reveal = isNext ? 100 - (100 * easedSlide) : 100;
                                    const blur = isNext ? 16 * (1 - easedSlide) : 16;
                                    gsap.set(imgRef.querySelector('.slide-image'), { filter: `blur(${blur}px)` });
                                    gsap.set(imgRef, { clipPath: `polygon(${reveal}% 0%, 100% 0%, 100% 100%, ${reveal}% 100%)` });
                                } else {
                                    gsap.set(imgRef.querySelector('.slide-image'), { filter: 'blur(0px)' });
                                    gsap.set(imgRef, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
                                }
                            });

                            // Animate overlays
                            overlayRefs.current.forEach((overlayRef, index) => {
                                if (index === currentSlide) {
                                    gsap.set(overlayRef, { opacity: 0.25 + (0.10 * easedSlide) });
                                } else if (index === currentSlide + 1) {
                                    const isLast = index === slides.length - 1;
                                    const opacity = isLast ? 0.35 * (1 - easedSlide) : 0.35 - (0.10 * easedSlide);
                                    gsap.set(overlayRef, { opacity });
                                }
                            });

                            // Animate text content
                            textRefs.current.forEach((textRef, index) => {
                                let opacity = 0, y = 60, scale = 0.95;
                                if (index === currentSlide) {
                                    const fadeOutProgress = slideTransitionProgress > 0.5 ? Math.min(1, (slideTransitionProgress - 0.5) / 0.5) : 0;
                                    opacity = 1 - gsap.parseEase("power2.out")(fadeOutProgress);
                                    y = 60 * gsap.parseEase("power2.in")(fadeOutProgress);
                                    scale = 1 - (0.05 * gsap.parseEase("power1.out")(fadeOutProgress));
                                    if (currentSlide === 0 && slideTransitionProgress < 0.1) {
                                        const fadeInProgress = slideTransitionProgress / 0.1;
                                        opacity = gsap.parseEase("power2.out")(fadeInProgress);
                                        y = 60 * (1 - gsap.parseEase("power2.out")(fadeInProgress));
                                        scale = 0.95 + (0.05 * gsap.parseEase("back.out(1.2)")(fadeInProgress));
                                    }
                                }
                                if (index === currentSlide + 1 && slideTransitionProgress > 0.6) {
                                    const fadeInProgress = Math.min(1, (slideTransitionProgress - 0.6) / 0.4);
                                    opacity = gsap.parseEase("power2.out")(fadeInProgress);
                                    y = 60 * (1 - gsap.parseEase("power2.out")(fadeInProgress));
                                    scale = 0.95 + (0.05 * gsap.parseEase("back.out(1.2)")(fadeInProgress));
                                }
                                opacity = gsap.utils.clamp(0, 1, opacity); y = gsap.utils.clamp(0, 60, y); scale = gsap.utils.clamp(0.95, 1, scale);
                                gsap.set(textRef, { opacity, y, scale, rotationX: y * 0.3, transformOrigin: "center bottom" });
                                if (titles[index]) gsap.set(titles[index], { opacity, y: y * 0.8, scale, filter: `blur(${(1 - opacity) * 3}px)` });
                                if (paragraphs[index]) gsap.set(paragraphs[index], { opacity: opacity * 0.9, y: y * 1.2, scale: scale * 0.98, filter: `blur(${(1 - opacity) * 2}px)` });
                            });
                            
                            // Animate progress bar
                            if (progressBarRef.current && spotlightRef.current) {
                                const thumbWidth = 270, thumbGap = 24;
                                const maxTravel = (slides.length - 1) * (thumbWidth + thumbGap);
                                const currentX = imageSectionProgress * maxTravel;
                                // CORRECTED: Accumulate progress bar width instead of moving it
                                gsap.set(progressBarRef.current, { width: currentX + thumbWidth });
                                const trackWidth = (slides.length * thumbWidth) + ((slides.length - 1) * thumbGap);
                                const rightInset = trackWidth - (currentX + thumbWidth);
                                gsap.set(spotlightRef.current, { clipPath: `inset(0px ${rightInset}px 0px ${currentX}px)` });
                            }
                        } else {
                            // --- Phase 3: Final State (IMAGE_END -> end) ---
                            gsap.set(imageRefs.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
                            imageRefs.current.forEach(ref => gsap.set(ref.querySelector('.slide-image'), { filter: 'blur(0px)' }));
                            if(overlayRefs.current[slides.length - 1]) gsap.set(overlayRefs.current[slides.length - 1], { opacity: 0 });

                            textRefs.current.forEach((textRef, index) => {
                                const isLast = index === slides.length - 1;
                                const opacity = isLast ? 1 : 0;
                                const y = isLast ? 0 : 60;
                                const scale = isLast ? 1 : 0.95;
                                gsap.set(textRef, { opacity, y, scale, rotationX: isLast ? 0 : (60 * 0.3) });
                                if (titles[index]) gsap.set(titles[index], { opacity, y: y * (isLast ? 1 : 0.8), scale, filter: `blur(${isLast ? 0 : 3}px)` });
                                if (paragraphs[index]) gsap.set(paragraphs[index], { opacity: opacity * 0.9, y: y * (isLast ? 1 : 1.2), scale: scale * (isLast ? 1 : 0.98), filter: `blur(${isLast ? 0 : 2}px)` });
                            });

                            if (progressBarRef.current && spotlightRef.current) {
                                const thumbWidth = 270, thumbGap = 24;
                                const maxTravel = (slides.length - 1) * (thumbWidth + thumbGap);
                                const trackWidth = (slides.length * thumbWidth) + ((slides.length - 1) * thumbGap);
                                // CORRECTED: Set progress bar to full width at the end
                                gsap.set(progressBarRef.current, { width: trackWidth });
                                const rightInset = trackWidth - (maxTravel + thumbWidth);
                                gsap.set(spotlightRef.current, { clipPath: `inset(0px ${Math.max(0, rightInset)}px 0px ${maxTravel}px)` });
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

  // Mobile Layout
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
                <Image
                  src={slide.image}
                  alt={slide.text}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute left-6 top-1/4 z-10 text-white max-w-[80%]">
                  <h2 className="text-3xl font-bold mb-4 leading-tight">
                    {slide.mobileTitle}
                  </h2>
                  <p className="text-lg opacity-90 leading-relaxed">
                    {slide.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const thumbnailWidth = 270;
  const thumbnailGap = 24;
  const trackWidthStyle = {
    width: `${(slides.length * thumbnailWidth) + ((slides.length - 1) * thumbnailGap)}px`
  };

  // Desktop Layout
  return (
    <div ref={componentRef} className={`relative bg-[#262836]`}>
      <div className="h-screen w-screen relative">
        <section ref={heroSectionRef} className="flex text-white">
          <div ref={heroBackgroundRef} className="absolute inset-0 bg-[#262836]"></div>
          <div ref={heroContentRef} className="relative flex-1 flex justify-between items-center px-8 md:px-12 py-8 md:py-25 z-10">
            <div className="flex flex-col justify-center flex-1">
              <h1 className="text-5xl md:text-4xl lg:text-8xl mb-6 md:mb-8 leading-none tracking-wide font-extrabold">
                <span className='text-8xl'>AVITEC</span>
                <br />
                <span>Is in the</span>
                <br />
                <span>Bussines of </span>
                <br />
                <span>The Future</span>
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
              <Image
                src={slide.image}
                alt={slide.text}
                fill
                style={{ objectFit: 'cover' }}
                className="slide-image"
                priority={index === 0}
              />
              <div ref={el => overlayRefs.current[index] = el} className="absolute inset-0 bg-black"></div>
              <div ref={el => textRefs.current[index] = el} className="absolute left-4 md:left-16 top-1/4 z-10 text-white">
                <h2 className="text-3xl md:text-7xl font-extrabold mb-6 leading-tight">
                  {slide.text}
                </h2>
                <p className="text-lg md:text-2xl font-bold opacity-90 max-w-lg leading-relaxed mb-8">
                  {slide.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div ref={skipButtonRef} className="fixed max-sm:hidden bottom-4 md:bottom-8 right-4 md:right-8 z-50 opacity-0">
          <button
            onClick={handleSkipSection}
            className="group cursor-pointer relative overflow-hidden top-8 left-8 bg-white/90 border border-white/20 text-black px-10 py-7 rounded-none font-medium inline-flex items-center gap-2  transition-all duration-300 hover:scale-105 hover:text-white"
          >
            <span className="absolute inset-0 bg-black/90 transform -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0 rounded-none"></span>
            <span className="relative text-lg font-bold">Skip Section</span>
            <ChevronDown className="w-4 h-4 relative transform group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        <div ref={scrollIndicatorRef} className="absolute top-1/2 right-0 -translate-y-1/2 z-20 text-white flex items-center space-x-2 md:space-x-4 pointer-events-none">
          <div className="flex items-center">
            <span className="text-sm md:text-base opacity-75 mr-4">Scroll</span>
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
            <div ref={progressBarRef} className="absolute rounded-lg top-0 left-0 h-0.5 bg-red-500 shadow-lg shadow-blue-500/50"></div>
          </div>
          <div className="flex gap-4 md:gap-6 relative overflow-hidden">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-none transition-all duration-500 relative z-10 cursor-pointer flex-shrink-0 border-gray-400/30 opacity-100`}
                style={{ width: '270px', height: '150px' }}
                ref={el => baseThumbRefs.current[i] = el}
                onClick={() => handleThumbnailClick(i)}>
                <Image src={slide.image} alt={`thumbnail-${i}`} fill style={{ objectFit: 'cover' }} />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 right-1 md:right-2">
                  <p className="text-white text-sm md:text-base font-bold truncate">{slide.text}</p>
                </div>
                <div
                  ref={el => baseBorderRefs.current[i] = el}
                  className="pointer-events-none absolute inset-0 z-30 rounded-none opacity-0 border-2 border-white shadow-[0_0_0_2px_rgba(255,255,255,1)] transition-opacity duration-150"
                />
              </div>
            ))}
            <div
              ref={spotlightRef}
              className="absolute top-0 left-0 h-full pointer-events-none z-20 overflow-hidden"
            >
              <div className="h-full flex gap-4 md:gap-6" style={trackWidthStyle}>
                {slides.map((slide, i) => (
                  <div
                    key={`spotlight-${i}`}
                    className="rounded-none shadow-2xl bg-white/[.20] backdrop-blur-sm backdrop-saturate-150 flex-shrink-0 relative"
                    style={{ width: '270px', height: '150px' }}
                    ref={el => glassThumbRefs.current[i] = el}
                  >
                     <Image src={slide.image} alt={`thumbnail-${i}`} fill style={{ objectFit: 'cover' }} />
                     <div className="absolute inset-0 bg-transparent"></div>
                     <div
                       ref={el => glassBorderRefs.current[i] = el}
                       className="pointer-events-none absolute inset-0 z-30 rounded-none opacity-0 border-2 border-white shadow-[0_0_0_2px_rgba(255,255,255,1)] transition-opacity duration-150"
                     />
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
