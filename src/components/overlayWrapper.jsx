'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Scroll from './refinedHeroScroll'
import BeliefSection from './imagesGallery'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ParallaxSection
 * Smooth, GSAP-powered background drift for a full-viewport section.
 * - You control the background via bgClass (solid color, gradient, etc.)
 * - Foreground children render on top.
 */
const ParallaxSection = ({ children, bgClass = 'bg-white', className = '' }) => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg) return

    const ctx = gsap.context(() => {
      // start slightly lower, drift up as the section scrolls through
      gsap.set(bg, { yPercent: 20, willChange: 'transform' })
      gsap.to(bg, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',  // when section enters viewport
          end: 'bottom top',    // when section leaves viewport
          scrub: true,
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`relative isolate min-h-screen overflow-hidden ${className}`}>
      {/* parallax bg layer */}
      <div ref={bgRef} className={`absolute inset-0 -z-10 ${bgClass}`} />
      {/* foreground */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

const OverlayWrapper = () => {
  return (
    <div className="relative">
      {/* 1) HERO — owns its own pin logic. Nothing else is stacked on it. */}
      <section className="relative">
        <Scroll />
      </section>

      {/* 2) GALLERY — wrapped in a parallax section. */}
      <ParallaxSection bgClass="bg-[#ebeeec]">
        {/* Keep the exact gallery styling/markup from your component */}
        <BeliefSection />
      </ParallaxSection>
    </div>
  )
}

export default OverlayWrapper
