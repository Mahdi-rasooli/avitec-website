"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image12 from '../../public/img12.jpg'
import image14 from '../../public/img14.jpg'
import image15 from '../../public/img15.jpg'
import Image from 'next/image'


gsap.registerPlugin(ScrollTrigger);

// STEP 1: Removed `bgGradient` from the data. This is no longer needed.
const sectionsData = [
  {
    id: 1,
    title: "Driving Innovation",
    subtitle: "Ideas • Technology • Impact",
    content: "We transform bold ideas into groundbreaking realities. Our culture of curiosity and focus on emerging tech allows us to redefine what's possible for our clients.",
    features: ["Advanced R&D", "Agile Prototyping", "Future-Focused Tech", "Data-Driven Insights"],
    img: image12,
    stats: { value: "500+", label: "Projects" },
    accentColor: "#3B82F6", // Blue
  },
  {
    id: 2,
    title: "Strategic Approach",
    subtitle: "Clarity • Collaboration • Results",
    content: "Our approach is built on deep collaboration. We create agile and bespoke solutions that deliver measurable results and lasting value for every client.",
    features: ["Client-Centric Process", "Agile Management", "Transparent Communication", "Risk Mitigation"],
    img: image14,
    stats: { value: "98%", label: "Client Satisfaction" },
    accentColor: "#10B981", // Green
  },
  {
    id: 3,
    title: "Creative Solutions",
    subtitle: "Design • Vision • Excellence",
    content: "Creativity is at the heart of our work. We blend artistic vision with technical excellence to build solutions that are both functional and inspiring.",
    features: ["Human-Centered Design", "Architectural Vision", "Brand Storytelling", "Visual Excellence"],
    img: image15,
    stats: { value: "30+", label: "Design Awards" },
    accentColor: "#EF4444", // Red
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
  
      const nonFirstTitles = titles.slice(1);
      const nonFirstCards = cards.slice(1);
  
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
  
      // Reveal first card
      if (cards.length) {
        gsap.set(cards[0], { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
      }
  
      // Hide the remaining cards
      if (nonFirstCards.length) {
        gsap.set(nonFirstCards, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
      }
  
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
  
      // STEP 2: The animation logic no longer changes the background color.
      cards.forEach((card, i) => {
        const title = titles[i];
        const prevTitle = titles[i - 1];
  
        if (i === 0) {
          return;
        }
  
        tl.to(card, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.inOut",
        });
  
        if (prevTitle) {
          tl.to(prevTitle.querySelectorAll('.text-element'), {
            autoAlpha: 0,
            y: -30,
            duration: 0.3,
            ease: "power2.in"
          }, "<");
        }
        
        tl.to(title, { 
          autoAlpha: 1,
          duration: 0.3,
          ease: "power2.out"
        }, ">");
        
        tl.to(title.querySelectorAll('.text-element'), {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out"
        }, "<");
      });
  
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
      {/* STEP 3: Changed this wrapper's background to plain 'bg-white'.
          This makes the background of the entire component, including the left side, white. */}
      <div className="wrapper w-full flex flex-col lg:flex-row overflow-hidden bg-white">
        
        {/* This left column is transparent, so it will now correctly show the white background from its parent. */}
        <div className="column left relative flex-1 hidden lg:flex justify-start items-center h-screen px-12 xl:px-20">
          {sectionsData.map((section, i) => (
            <div key={section.id} className="left-content absolute opacity-0 invisible w-full max-w-xl">
              <div className="space-y-8">
                <div className="text-element flex items-center gap-4">
                  <div className="w-1 h-12 rounded-full" style={{ backgroundColor: section.accentColor }}/>
                  <span className="text-sm font-medium tracking-widest text-gray-500 uppercase">0{i + 1}</span>
                </div>
                <div className="text-element space-y-4">
                  <h1 className="text-5xl max-sm:text-3xl xl:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight">{section.title}</h1>
                  <p className="text-lg max-sm:hidden xl:text-2xl font-medium tracking-wide" style={{ color: section.accentColor }}>{section.subtitle}</p>
                </div>
                <p className="text-element text-2xl max-sm:hidden xl:text-3xl text-gray-600 leading-relaxed font-medium max-w-lg">{section.content}</p>
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

        {/* STEP 4: Added the white background with the dotty pattern ONLY to the right column. */}
        <div className="column right relative flex-1 flex justify-center items-center h-screen p-12 bg-white">
          <div
              className="absolute inset-0 z-0 opacity-10 h-full"
              style={{
                  backgroundImage: 'radial-gradient(#9ca3af 2px, transparent 2px)',
                  backgroundSize: '20px 20px',
              }}
          />
          {sectionsData.map((section) => (
            <div
              key={section.id}
              className="card absolute w-full h-full md:w-[600px] md:h-[670px] xl:w-[800px] xl:h-[850px] rounded-xl overflow-hidden shadow-2xl group [clip-path:polygon(0%_100%,100%_100%,100%_100%,0_100%)]"
            >
              <div className="relative w-full h-full  overflow-hidden"> 
                <Image src={section.img} alt={section.title} fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute top-8 left-8">
                <div className="bg-white/20 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20">
                  <div className="text-white font-bold text-2xl">{section.stats.value}</div>
                  <div className="text-white/80 text-sm">{section.stats.label}</div>
                </div>
              </div>
              <div className="absolute lg:hidden bottom-8 left-8 right-8">
                <div className="space-y-3 text-center">
                  <h3 className="text-white text-2xl font-light">{section.title}</h3>
                  <div className="text-element space-y-3 pt-4">
                    {section.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-4 text-white">
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: section.accentColor }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}