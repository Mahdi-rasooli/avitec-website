"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
  {
    id: 1,
    title: "Engineering Excellence",
    subtitle: "Innovation • Precision • Sustainability",
    content: "Our engineering services provide innovative solutions for complex challenges. We focus on delivering sustainable and efficient designs that stand the test of time.",
    features: ["Advanced CAD Design", "Structural Analysis", "Environmental Impact", "Quality Assurance"],
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
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
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
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
    img: "https://images.unsplash.com/photo-15033889152951-9f343605f61e?auto=format&fit=crop&w=1600&q=80",
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

      // Set initial states - ALL text and cards start hidden
      gsap.set(".text-element", { autoAlpha: 0, y: 30 });
      gsap.set(titles, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: "+=" + (cards.length) * 100 + "%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate through each section
      cards.forEach((card, i) => {
        const title = titles[i];
        const prevTitle = titles[i - 1];
        const section = sectionsData[i];

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
        
        // 3. Change background color (if it's not the first section)
        if (section.bgGradient) {
           tl.to(wrapperEl, {
              className: `wrapper w-full flex overflow-hidden bg-gradient-to-br ${section.bgGradient} transition-colors duration-1000`,
              duration: 0.5,
           }, "<");
        }

        // 4. Fade in the CURRENT section's text
        // FIX 2: Delay the text fade-in to sync better with the image reveal
        tl.to(title, { autoAlpha: 1 }, "<+0.5") // Delay fade-in
          .to(title.querySelectorAll('.text-element'), {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out"
          }, "<");
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
      <div className="wrapper w-full flex overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 transition-colors duration-1000">
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
            // FIX 1: ALL cards now start with the hidden clip-path
            <div
              key={section.id}
              className="card absolute w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl group [clip-path:polygon(0%_100%,100%_100%,100%_100%,0_100%)]"
              style={{ backgroundImage: `url(${section.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
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