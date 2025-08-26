"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image12 from '../../public/img12.jpg'
import image14 from '../../public/img14.jpg'
import image15 from '../../public/img15.jpg'
import Image from 'next/image'


gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
  {
    id: 1,
    title: "Engineering Excellence",
    subtitle: "Innovation • Precision • Sustainability",
    content: "Our engineering services provide innovative solutions for complex challenges. We focus on delivering sustainable and efficient designs that stand the test of time.",
    features: ["Advanced CAD Design", "Structural Analysis", "Environmental Impact", "Quality Assurance"],
    img: image12,
    stats: { value: "500+", label: "Projects" },
    accentColor: "#3B82F6", // Blue
    bgGradient: "from-blue-50 to-indigo-50"
  },
  {
    id: 2,
    title: "Strategic Procurement",
    subtitle: "Efficiency • Quality • Cost Optimization",
    content: "We streamline the procurement process, ensuring timely delivery of high-quality materials and services. Our strategic sourcing minimizes costs and risks.",
    features: ["Global Supplier Network", "Cost Optimization", "Risk Management", "Quality Assurance"],
    img: image14,
    stats: { value: "98%", label: "On Time" },
    accentColor: "#10B981", // Green
    bgGradient: "from-emerald-50 to-teal-50"
  },
  {
    id: 3,
    title: "Premium Construction",
    subtitle: "Safety • Craftsmanship • Reliability",
    content: "Our construction teams are committed to safety, quality, and efficiency. We deliver projects on time with exceptional craftsmanship and attention to detail.",
    features: ["Safety First Protocol", "Premium Materials", "Expert Craftsmanship", "Timely Delivery"],
    img: image15,
    stats: { value: "100%", label: "Safety Record" },
    accentColor: "#F59E0B", // Amber
    bgGradient: "from-amber-50 to-orange-50"
  },
];

export default function WorkSection() {
  const main = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const titles = gsap.utils.toArray(".left-content");
      const cards = gsap.utils.toArray(".right .card");
      const wrapperEl = main.current.querySelector('.wrapper');
  
      if (!titles.length || !cards.length || !wrapperEl) return;
  
      // Set initial states - explicitly reveal the FIRST title and FIRST card
      // (overriding their Tailwind classes) and hide all subsequent items.
      const nonFirstTitles = titles.slice(1);
      const nonFirstCards = cards.slice(1);
  
      // Ensure the wrapper starts with the first section's gradient so the
      // background doesn't jump when the timeline runs.
      if (sectionsData[0] && sectionsData[0].bgGradient) {
        wrapperEl.className = `wrapper w-full flex overflow-hidden bg-gradient-to-br ${sectionsData[0].bgGradient}`;
      }
  
      // Show first title and its text-elements
      if (titles.length) {
        gsap.set(titles[0], { autoAlpha: 1 });
        gsap.set(titles[0].querySelectorAll('.text-element'), { autoAlpha: 1, y: 0 });
      }
  
      // Hide all other titles and their text-elements
      if (nonFirstTitles.length) {
        gsap.set(nonFirstTitles, { autoAlpha: 0 });
        nonFirstTitles.forEach(t => gsap.set(t.querySelectorAll('.text-element'), { autoAlpha: 0, y: 30 }));
      }
  
      // Reveal first card (override the Tailwind clip-path that hides cards)
      if (cards.length) {
        gsap.set(cards[0], { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
      }
  
      // Hide the remaining cards
      if (nonFirstCards.length) {
        gsap.set(nonFirstCards, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
      }
  
      // We skip animating the first card because it's already revealed on load,
      // so reduce the overall scroll length by one card to avoid extra scroll
      // before the second image appears.
      const steps = Math.max(0, cards.length - 1);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: "+=" + (steps) * 100 + "%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
  
      // Animate through each section. Skip the first card reveal because it
      // is already visible; start transitions from the second card (i=1).
      cards.forEach((card, i) => {
        const title = titles[i];
        const prevTitle = titles[i - 1];
        const section = sectionsData[i];
  
        // Skip animating the first card (it's visible by default). For i=0
        // still ensure any background or title is already present.
        if (i === 0) {
          return;
        }
  
        // 1. Reveal the current card
        tl.to(card, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.inOut",
        });
  
        // 2. Fade out the PREVIOUS section's text (if it exists)
        if (prevTitle) {
          tl.to(prevTitle.querySelectorAll('.text-element'), {
            autoAlpha: 0,
            y: -30,
            duration: 0.3,
            ease: "power2.in"
          }, "<");
        }
        
        // 3. Fade in the CURRENT section's text immediately after prev fade-out completes
        tl.to(title, { 
          autoAlpha: 1,
          duration: 0.3,
          ease: "power2.out"
        }, ">"); // ">" places it right after the prev text fade-out ends
        
        tl.to(title.querySelectorAll('.text-element'), {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out"
        }, "<"); // Start at the same time as the title fade-in (no extra delay)
  
        // 4. Change background color to match current section
        if (section.bgGradient) {
          // Set the wrapper gradient after the card reveal starts but aligned with text changes
          tl.set(wrapperEl, {
            className: `wrapper w-full flex overflow-hidden bg-gradient-to-br ${section.bgGradient}`,
          }, "<");
        }
  
      });
  
      // Add a final exit animation for the last piece of text
      const lastTitle = titles[titles.length - 1];
      tl.to(lastTitle.querySelectorAll('.text-element'), {
        autoAlpha: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in"
      });
  
    }, main);
  
    return () => ctx.revert();
  }, []);

  return (
    <div ref={main} className="w-full">
      <div className="wrapper w-full flex overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="column left relative flex-1 flex justify-center items-center h-screen px-12 lg:px-20">
          {sectionsData.map((section, i) => (
            <div key={section.id} className="left-content absolute opacity-0 invisible w-full max-w-xl">
              <div className="space-y-8">
                <div className="text-element flex items-center gap-4">
                  <div className="w-1 h-12 rounded-full" style={{ backgroundColor: section.accentColor }}/>
                  <span className="text-sm font-medium tracking-widest text-gray-500 uppercase">0{i + 1}</span>
                </div>
                <div className="text-element space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">{section.title}</h1>
                  <p className="text-lg font-medium tracking-wide" style={{ color: section.accentColor }}>{section.subtitle}</p>
                </div>
                <p className="text-element text-xl text-gray-600 leading-relaxed font-light max-w-lg">{section.content}</p>
                <div className="text-element space-y-3 pt-4">
                  {section.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: section.accentColor }}/>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="text-element pt-8">
                  <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: section.accentColor }}>
                    <span>Learn More</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="column right relative flex-1 flex justify-center items-center h-screen p-12">
          {sectionsData.map((section) => (
            <div
              key={section.id}
              className="card absolute w-[500px] h-[600px] rounded-3xl overflow-hidden shadow-2xl group [clip-path:polygon(0%_100%,100%_100%,100%_100%,0_100%)]"
            >
              <div className="relative w-full h-full"> 
                <Image src={section.img} alt={section.title} fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute top-8 left-8">
                <div className="bg-white/20 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20">
                  <div className="text-white font-bold text-2xl">{section.stats.value}</div>
                  <div className="text-white/80 text-sm">{section.stats.label}</div>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="space-y-3">
                  <div className="w-12 h-1 rounded-full" style={{ backgroundColor: section.accentColor }}/>
                  <h3 className="text-white text-2xl font-light">{section.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: section.accentColor }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}