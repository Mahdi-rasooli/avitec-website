'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowRight, MoveRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import image7 from '../../public/img7.jpg'
import image8 from '../../public/img8.jpg'
import image9 from '../../public/img9.jpg'
import image10 from '../../public/img10.jpg'
import Lenis from '@studio-freight/lenis';

// Mock images for demo
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
    image: image8,
  },
];

// Easing function for smooth scrolling (used in click handlers)
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const Scroll = () => {
  const componentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroBackgroundRef = useRef(null);
  const heroContentRef = useRef(null);
  const imageContainerRef = useRef(null);
  const navigationRef = useRef(null);
  const progressBarRef = useRef(null);
  const spotlightRef = useRef(null);
  const skipButtonRef = useRef(null);
  const navVisible = useRef(false);
  const stRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const navTlRef = useRef(null);
  const baseThumbRefs = useRef([]);
  const glassThumbRefs = useRef([]);
  const activeThumbIndexRef = useRef(-1);
  const baseBorderRefs = useRef([]);
  const glassBorderRefs = useRef([]);

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const overlay1Ref = useRef(null);
  const overlay2Ref = useRef(null);
  const overlay3Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  const galleryRef = useRef(null);
  const mobileLenisRef = useRef(null);
  const mobileRafIdRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Shared progress breakpoints (keep consistent across handlers & animation)
  const HERO_END = 0.34;
  const IMAGE_END = 0.86;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scrolling with Lenis (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 0.9,
      normalizeWheel: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenis.stop();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile]);

  // Mobile horizontal Lenis for gallery
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

  const handleTagClick = (slideId) => {
    if (isMobile) return;

    const st = stRef.current;
    if (!st) return;

    const slideIndex = slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) return;
    const total = slides.length - 1;
    const normalized = slideIndex / total;
    const targetProgress = HERO_END + normalized * (IMAGE_END - HERO_END);
    const targetScrollY = st.start + targetProgress * (st.end - st.start);

    // Smooth scroll to the computed y-position
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY, { duration: 1.2, easing: easeInOutQuad });
    } else {
      gsap.to(window, { scrollTo: { y: targetScrollY }, duration: 1.2, ease: 'power2.inOut' });
    }

    // Update thumbnail progress/spotlight to match clicked index using actual DOM measurements
    requestAnimationFrame(() => {
      const thumbs = baseThumbRefs.current;
      if (!progressBarRef.current || !spotlightRef.current || !thumbs || !thumbs[0]) return;
      const thumbWidth = thumbs[0].offsetWidth || 270;
      const lastIndex = thumbs.length - 1;
      const trackStart = thumbs[0].offsetLeft || 0;
      const gap = thumbs[1] ? (thumbs[1].offsetLeft - thumbs[0].offsetLeft - thumbWidth) : 24;
      const leftInset = slideIndex * (thumbWidth + gap);
      const trackWidth = (thumbs[lastIndex].offsetLeft || 0) + thumbWidth;
      const rightInset = Math.max(0, trackWidth - (leftInset + thumbWidth));
      gsap.set(progressBarRef.current, { x: leftInset });
      gsap.set(spotlightRef.current, { clipPath: `inset(0px ${rightInset}px 0px ${leftInset}px)` });
    });
  };

  const handleThumbnailClick = (slideIndex) => {
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

    // Update progress bar / spotlight to match selected thumbnail
    requestAnimationFrame(() => {
      const thumbs = baseThumbRefs.current;
      if (!progressBarRef.current || !spotlightRef.current || !thumbs || !thumbs[0]) return;
      const thumbWidth = thumbs[0].offsetWidth || 270;
      const lastIndex = thumbs.length - 1;
      const gap = thumbs[1] ? (thumbs[1].offsetLeft - thumbs[0].offsetLeft - thumbWidth) : 24;
      const leftInset = slideIndex * (thumbWidth + gap);
      const trackWidth = (thumbs[lastIndex].offsetLeft || 0) + thumbWidth;
      const rightInset = Math.max(0, trackWidth - (leftInset + thumbWidth));
      gsap.set(progressBarRef.current, { x: leftInset });
      gsap.set(spotlightRef.current, { clipPath: `inset(0px ${rightInset}px 0px ${leftInset}px)` });
    });
  };

  const handleSkipSection = () => {
    const st = stRef.current;
    if (!st) return;

    const targetScrollY = st.end;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY + 100, { duration: 1.0, easing: (t) => t });
    } else {
      gsap.to(window, { scrollTo: { y: targetScrollY + 100 }, duration: 1.0, ease: 'none' });
    }
  };

  useLayoutEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      const heroSection = heroSectionRef.current;
      const heroBackground = heroBackgroundRef.current;
      const imageContainer = imageContainerRef.current;
      const navigation = navigationRef.current;
      const heroContent = heroContentRef.current;
      const skipButton = skipButtonRef.current;
      const titles = [text1Ref.current, text2Ref.current, text3Ref.current].map(ref => ref?.querySelector('h2'));
      const paragraphs = [text1Ref.current, text2Ref.current, text3Ref.current].map(ref => ref?.querySelector('p'));

      const setHeroContentX = gsap.quickSetter(heroContent, 'xPercent');
      const setHeroContentOpacity = gsap.quickSetter(heroContent, 'opacity');
      const setHeroSectionX = gsap.quickSetter(heroSection, 'xPercent');
      const setImageLeft = gsap.quickSetter(imageContainer, 'left', '%');
      const setImageWidth = gsap.quickSetter(imageContainer, 'width', '%');
      const applyThumbBorder = (index) => {
        if (activeThumbIndexRef.current === index) return;
        const prev = activeThumbIndexRef.current;
        if (prev >= 0) {
          const pb = baseBorderRefs.current[prev];
          const pg = glassBorderRefs.current[prev];
          if (pb) gsap.set(pb, { autoAlpha: 0 });
          if (pg) gsap.set(pg, { autoAlpha: 0 });
        }
        const bb = baseBorderRefs.current[index];
        const gb = glassBorderRefs.current[index];
        if (bb) gsap.set(bb, { autoAlpha: 1 });
        if (gb) gsap.set(gb, { autoAlpha: 1 });
        activeThumbIndexRef.current = index;
      };
      const clearThumbBorder = () => {
        const prev = activeThumbIndexRef.current;
        if (prev >= 0) {
          const pb = baseBorderRefs.current[prev];
          const pg = glassBorderRefs.current[prev];
          if (pb) gsap.set(pb, { autoAlpha: 0 });
          if (pg) gsap.set(pg, { autoAlpha: 0 });
          activeThumbIndexRef.current = -1;
        }
      };

      gsap.from(heroContent.children, { autoAlpha: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.5 });
      gsap.set(componentRef.current, { height: '100vh' });
      gsap.set(heroSection, { position: 'absolute', left: 0, top: 0, width: '70%', height: '100%', zIndex: 1, overflow: 'hidden' });
      gsap.set(imageContainer, { position: 'absolute', left: '70%', top: 0, width: '30%', height: '100%', zIndex: 2 });

      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current], { x: (i) => i === 0 ? '0%' : '100%' });
      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current].map(ref => ref.querySelector('.slide-image')), { filter: 'none', scale: 1, willChange: 'transform, opacity, filter' });
      gsap.set([overlay1Ref.current, overlay2Ref.current, overlay3Ref.current], { opacity: (i) => i === 0 ? 0.25 : 0.35 });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });
      gsap.set([navigation, skipButton], { autoAlpha: 0, visibility: 'hidden', pointerEvents: 'none', willChange: 'transform, opacity, filter' });
      gsap.set([imageContainer], { willChange: 'left, width', contain: 'layout paint size' });
      gsap.set([heroSection], { willChange: 'transform', backfaceVisibility: 'hidden' });
      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current], { willChange: 'transform' });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { willChange: 'transform, opacity' });
      gsap.set([overlay1Ref.current, overlay2Ref.current, overlay3Ref.current], { willChange: 'opacity' });
      navVisible.current = false;

      const navTl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power3.out' } });
      navTl
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
          scrub: 0.2,
          start: 'top top',
          end: '+=420%',
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;
            const heroEnd = 0.34;
            const imageEnd = 0.86;

            if (progress > heroEnd) {
              if (!navVisible.current) {
                navTlRef.current?.play(0);
                navVisible.current = true;
              }
            } else {
              if (navVisible.current) {
                navTlRef.current?.reverse();
                navVisible.current = false;
              }
            }

            if (progress <= heroEnd) {
              const rawHero = gsap.utils.clamp(0, 1, progress / heroEnd);
              const heroProgress = gsap.parseEase('power2.out')(rawHero);
              setHeroSectionX(-100 * heroProgress);
              setHeroContentX(0);
              setHeroContentOpacity(1 - heroProgress);
              setImageLeft(70 - 70 * heroProgress);
              setImageWidth(30 + 70 * heroProgress);
              gsap.set(image1Ref.current.querySelector('.slide-image'), { filter: `blur(${8 - 8 * heroProgress}px)` });
              gsap.set(image2Ref.current, { x: '100%' });
              gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });

              if (scrollIndicatorRef.current) {
                // Increased visibility duration. Fades out in the last 20% of the hero phase.
                const startFadeProgress = 0.80;
                const fadeDuration = 0.20;
                const scrollIndicatorOpacity = heroProgress <= startFadeProgress ? 1 : Math.max(0, 1 - ((heroProgress - startFadeProgress) / fadeDuration));
                const xMovement = -70 * heroProgress;
                // Update the arrow reveal effect
                const arrowLine = scrollIndicatorRef.current.querySelector('.arrow-line');
                const arrowIcon = scrollIndicatorRef.current.querySelector('svg');
                if (arrowLine && arrowIcon) {
                  const lineWidth = Math.min(192, 32 + (heroProgress * 280)); // Based on hero progress for continuity
                  arrowLine.style.width = `${lineWidth}px`;
                  const iconOpacity = Math.min(1, heroProgress * 6);
                  arrowIcon.style.opacity = iconOpacity;
                }
                gsap.set(scrollIndicatorRef.current, { autoAlpha: scrollIndicatorOpacity, x: `${xMovement}vw` });
              }

            }
            else if (progress <= imageEnd) {
              const imageProgress = (progress - heroEnd) / (imageEnd - heroEnd);
              // if (scrollIndicatorRef.current) {
              //   const fadeOutDuration = 0.07;
              //   const newOpacity = imageProgress < fadeOutDuration
              //     ? 1 - (imageProgress / fadeOutDuration)
              //     : 0;
              //   gsap.set(scrollIndicatorRef.current, { autoAlpha: newOpacity });
              // }

              gsap.set(heroContent, { opacity: 0 });
              gsap.set(heroBackground, { opacity: 0 });
              setHeroSectionX(-100);
              setImageLeft(0);
              setImageWidth(100);

              const totalSlides = slides.length - 1;
              const currentSlideFloat = imageProgress * totalSlides;
              const currentSlide = Math.floor(currentSlideFloat);
              const slideTransitionProgress = currentSlideFloat - currentSlide;
              const easedSlide = gsap.parseEase('power2.inOut')(slideTransitionProgress);
              const nearestIndex = Math.round(currentSlideFloat);
              const dist = Math.abs(currentSlideFloat - nearestIndex);
              const imageIsFullWidth = progress >= (heroEnd + 0.01);
              if (imageIsFullWidth && dist <= 0.03) {
                applyThumbBorder(nearestIndex);
              } else {
                clearThumbBorder();
              }

              const textRefs = [text1Ref, text2Ref, text3Ref];
              textRefs.forEach((textRef, index) => {
                let opacity = 0;
                let y = 60;
                let scale = 0.95;

                if (index === currentSlide) {
                    const fadeOutProgress = slideTransitionProgress > 0.5 ? Math.min(1, (slideTransitionProgress - 0.5) / 0.5) : 0;
                    opacity = 1 - gsap.parseEase("power2.out")(fadeOutProgress);
                    y = 60 * gsap.parseEase("power2.in")(fadeOutProgress);
                    scale = 1 - (0.05 * gsap.parseEase("power1.out")(fadeOutProgress));
                }

                if (index === currentSlide + 1 && slideTransitionProgress > 0.6) {
                    const fadeInProgress = Math.min(1, (slideTransitionProgress - 0.6) / 0.4);
                    opacity = gsap.parseEase("power2.out")(fadeInProgress);
                    y = 60 * (1 - gsap.parseEase("power2.out")(fadeInProgress));
                    scale = 0.95 + (0.05 * gsap.parseEase("back.out(1.2)")(fadeInProgress));
                }

                if (index === 0 && currentSlide === 0 && slideTransitionProgress < 0.5) {
                    const fadeInProgress = slideTransitionProgress / 0.5;
                    opacity = gsap.parseEase("power2.out")(fadeInProgress);
                    y = 60 * (1 - gsap.parseEase("power2.out")(fadeInProgress));
                    scale = 0.95 + (0.05 * gsap.parseEase("back.out(1.2)")(fadeInProgress));
                }

                opacity = gsap.utils.clamp(0, 1, opacity);
                y = gsap.utils.clamp(0, 60, y);
                scale = gsap.utils.clamp(0.95, 1, scale);

                gsap.set(textRef.current, {
                  opacity: opacity,
                  y: y,
                  scale: scale,
                  rotationX: y * 0.3,
                  transformOrigin: "center bottom"
                });

                if (textRef.current) {
                  const title = titles[index];
                  const paragraph = paragraphs[index];
                  if (title) {
                    gsap.set(title, { opacity: opacity, y: y * 0.8, scale: scale, filter: `blur(${(1 - opacity) * 3}px)` });
                  }
                  if (paragraph) {
                    gsap.set(paragraph, { opacity: opacity * 0.9, y: y * 1.2, scale: scale * 0.98, filter: `blur(${(1 - opacity) * 2}px)`, delay: opacity > 0 ? 0.1 : 0 });
                  }
                }
              });

              if (currentSlide === 0) {
                  gsap.set(image2Ref.current, { x: `${100 - 100 * easedSlide}%` });
                  gsap.set(image3Ref.current, { x: '100%' });
                  gsap.set(image1Ref.current.querySelector('.slide-image'), { filter: `blur(${8 * easedSlide}px)` });
                  gsap.set(image2Ref.current.querySelector('.slide-image'), { filter: `blur(${8 * (1 - easedSlide)}px)` });
                  gsap.set(overlay1Ref.current, { opacity: 0.25 + (0.10 * easedSlide) });
                  gsap.set(overlay2Ref.current, { opacity: 0.35 - (0.10 * easedSlide) });
              } else if (currentSlide === 1) {
                  gsap.set(image1Ref.current, { x: '0%' });
                  gsap.set(image2Ref.current, { x: '0%' });
                  gsap.set(image3Ref.current, { x: `${100 - 100 * easedSlide}%` });
                  gsap.set(image2Ref.current.querySelector('.slide-image'), { filter: `blur(${8 * easedSlide}px)` });
                  gsap.set(image3Ref.current.querySelector('.slide-image'), { filter: `blur(${8 * (1 - easedSlide)}px)` });
                  gsap.set(overlay2Ref.current, { opacity: 0.25 + (0.10 * easedSlide) });
                  gsap.set(overlay3Ref.current, { opacity: 0.35 * (1 - easedSlide) });
              } else {
                gsap.set(image3Ref.current, { x: '0%' });
                gsap.set(image3Ref.current.querySelector('.slide-image'), { filter: 'blur(0px)' });
                gsap.set(overlay3Ref.current, { opacity: 0 });
                gsap.set([overlay1Ref.current, overlay2Ref.current], { opacity: 0.35 });
              }

              if (progressBarRef.current && spotlightRef.current) {
                const thumbnailWidth = 270;
                const thumbnailGap = 24; // Corresponds to md:gap-6
                const maxTravelDistance = (slides.length - 1) * (thumbnailWidth + thumbnailGap);
                const currentX = imageProgress * maxTravelDistance;

                gsap.set(progressBarRef.current, { x: currentX });

                const trackWidth = (slides.length * thumbnailWidth) + ((slides.length - 1) * thumbnailGap);
                const leftInset = currentX;
                const rightInset = trackWidth - (currentX + thumbnailWidth);

                gsap.set(spotlightRef.current, { clipPath: `inset(0px ${rightInset}px 0px ${leftInset}px)` });
              }
            }
            else if (progress > imageEnd) {
              gsap.set(heroContent, { opacity: 0 });
              gsap.set(heroBackground, { opacity: 0 });
              setHeroSectionX(-100);
              setImageLeft(0);
              setImageWidth(100);
              if (scrollIndicatorRef.current) {
                  gsap.set(scrollIndicatorRef.current, { autoAlpha: 0 });
              }

              gsap.set(image1Ref.current, { x: '0%' });
              gsap.set(image2Ref.current, { x: '0%' });
              gsap.set(image3Ref.current, { x: '0%' });
              gsap.set(image3Ref.current.querySelector('.slide-image'), { filter: 'blur(0px)' });
              gsap.set(overlay3Ref.current, { opacity: 0 });

              gsap.set(text1Ref.current, { opacity: 0, y: 60, scale: 0.95 });
              gsap.set(text2Ref.current, { opacity: 0, y: 60, scale: 0.95 });
              gsap.set(text3Ref.current, { opacity: 1, y: 0, scale: 1, rotationX: 0, filter: 'blur(0px)' });

              if (text3Ref.current) {
                const title = titles[2];
                const paragraph = paragraphs[2];
                if (title) { gsap.set(title, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }); }
                if (paragraph) { gsap.set(paragraph, { opacity: 0.9, y: 0, scale: 1, filter: 'blur(0px)' }); }
              }

              if (progressBarRef.current && spotlightRef.current) {
                const thumbnailWidth = 270;
                const thumbnailGap = 24; // Corresponds to md:gap-6
                const maxTravelDistance = (slides.length - 1) * (thumbnailWidth + thumbnailGap);
                gsap.set(progressBarRef.current, { x: maxTravelDistance });

                const trackWidth = (slides.length * thumbnailWidth) + ((slides.length - 1) * thumbnailGap);
                const leftInset = maxTravelDistance;
                const rightInset = trackWidth - (maxTravelDistance + thumbnailWidth);
                gsap.set(spotlightRef.current, { clipPath: `inset(0px ${Math.max(0, rightInset)}px 0px ${leftInset}px)` });
              }
              applyThumbBorder(slides.length - 1);
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
        {/* Mobile Hero Section */}
        <div className="px-6 py-12 text-white">
          <h1 className="text-4xl font-bold mb-8 leading-tight">
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

        {/* Mobile Gallery */}
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
                    {index === 0 ? "Precision Engineering" : index === 1 ? "Strategic Procurement" : "Excellence in Construction"}
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

  // ---- FIX #1: Calculate total width of thumbnails for correct sizing ----
  const thumbnailWidth = 270;
  const thumbnailGap = 24; // Corresponds to md:gap-6 (1.5rem = 24px)
  const trackWidthStyle = {
    width: `${(slides.length * thumbnailWidth) + ((slides.length - 1) * thumbnailGap)}px`
  };


  // Desktop Layout
  return (
    <div ref={componentRef} className={`relative overflow-hidden bg-[#262836]`}>
      <div className="h-screen w-screen overflow-hidden relative">
        {/* Hero Section */}
        <section ref={heroSectionRef} className="flex flex-col md:flex-row text-white">
          <div ref={heroBackgroundRef} className="absolute inset-0 bg-[#262836]"></div>

          <div ref={heroContentRef} className="relative flex-1 flex justify-between items-center px-8 md:px-12 py-8 md:py-25 z-10">
            <div className="flex flex-col justify-center flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-8 md:mb-12 leading-tight tracking-wide">
                AVITEC is the
                <br />
                <span className="font-normal">Engineering</span>
                <br />
                <span className="font-normal">Procurement</span>
                <br />
                <span className="font-normal">Construction</span>
              </h1>
              <button className="group relative overflow-hidden cursor-pointer bg-red-600 text-white px-8 py-3 text-lg font-medium inline-flex items-center gap-2 w-fit">
                <span className="absolute inset-0 border border-red-600 bg-[#262836] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
                <span className="relative">Learn More</span>
                <ArrowRight className="w-5 h-5 relative" />
              </button>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 text-lg justify-center px-17 py-12 bg-[#46535e33] min-h-screen w-80 absolute right-0 top-0">
              {['Navigate', 'Engineering', 'Procurement', 'Construction'].map((item, index) => (
                <div key={item} className="group cursor-pointer" onClick={() => index > 0 && handleTagClick(item.toLowerCase())}>
                  <div className="inline-flex items-center relative">
                    <span className={`text-gray-300 group-hover:text-white transition-colors duration-300 ${item === 'Navigate' ? '' : 'underline hover:no-underline transition-all duration-300'}`}>{item}</span>
                    {index > 0 && <MoveRight size={20} className=" ml-1 text-gray-400 group-hover:text-white transition-colors duration-300" />}
                    <div className={`${item === 'Navigate' ? "" : "absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Container */}
        <div ref={imageContainerRef} className="relative h-full overflow-hidden bg-black">
          {[text1Ref, text2Ref, text3Ref].map((textRef, index) => (
            <div key={slides[index].id} ref={index === 0 ? image1Ref : index === 1 ? image2Ref : image3Ref} className="absolute inset-0 w-full h-full">
              <Image
                src={slides[index].image}
                alt={`${slides[index].text}`}
                fill
                style={{ objectFit: 'cover' }}
                className="slide-image"
                priority={index === 0}
              />
              <div ref={index === 0 ? overlay1Ref : index === 1 ? overlay2Ref : overlay3Ref} className="absolute inset-0 bg-black"></div>
              <div ref={textRef} className="absolute left-4 md:left-16 top-1/4 z-10 text-white">
                <h2 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
                  {index === 0 ? "Precision Engineering" : index === 1 ? "Strategic Procurement" : "Excellence in Construction"}
                </h2>
                <p className="text-lg md:text-xl opacity-90 max-w-lg leading-relaxed mb-8">
                  {slides[index].subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Skip Section Button */}
        <div
          ref={skipButtonRef}
          className="fixed max-sm:hidden bottom-4 md:bottom-8 right-4 md:right-8 z-50 opacity-0"
        >
          <button
            onClick={handleSkipSection}
            className="group cursor-pointer relative overflow-hidden top-8 left-8 bg-white/90 border border-white/20 text-black px-10 py-7 rounded-none font-medium inline-flex items-center gap-2  transition-all duration-300 hover:scale-105 hover:text-white"
          >
            <span className="absolute inset-0 bg-black/90 transform -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0 rounded-none"></span>
            <span className="relative text-lg font-bold">Skip Section</span>
            <ChevronDown className="w-4 h-4 relative transform group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Horizontal Scroll Right Indicator */}
        <div ref={scrollIndicatorRef} className="absolute top-1/2 right-4 md:right-16 -translate-y-1/2 z-20 text-white flex items-center space-x-2 md:space-x-4 pointer-events-none">
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

        {/* Navigation Bar */}
        <div ref={navigationRef} className="fixed bottom-8 md:bottom-12 left-4 md:left-12 z-50 opacity-0 px-4 md:px-0">
          <div className="relative mb-4 md:mb-6">
            <div className="w-full h-1 bg-gradient-to-r from-black/20 via-black/40 to-black/20 shadow-2xl"></div>
            <div ref={progressBarRef} className="absolute top-0 left-0 h-1 bg-purple-500 shadow-lg shadow-blue-500/50" style={{ width: '270px' }}></div>
          </div>
          <div className="flex gap-4 md:gap-6 relative overflow-hidden">
            {/* The base thumbnails */}
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-none transition-all duration-500 relative z-10 cursor-pointer flex-shrink-0 border-gray-400/30 opacity-100`}
                style={{
                  width: '270px',
                  height: '150px'
                }}
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
            {/* The spotlight/glassy overlay */}
            <div
              ref={spotlightRef}
              className="absolute top-0 left-0 h-full pointer-events-none z-20 overflow-hidden"
            >
              {/* ---- FIX #1: Applied explicit width to inner container ---- */}
              <div className="h-full flex gap-4 md:gap-6" style={trackWidthStyle}>
                {slides.map((slide, i) => (
                  <div
                    key={`spotlight-${i}`}
                    className="rounded-none shadow-2xl bg-white/[.20] backdrop-blur-sm backdrop-saturate-150 flex-shrink-0 relative"
                    style={{
                      width: '270px',
                      height: '150px'
                    }}
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

export default Scroll;