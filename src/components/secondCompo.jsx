"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
  {
    id: 1,
    title: "Engineering",
    content:
      "Our engineering services provide innovative solutions for complex challenges. We focus on delivering sustainable and efficient designs that stand the test of time, ensuring your project's success from concept to completion.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Procurement",
    content:
      "We streamline the procurement process, ensuring timely delivery of high-quality materials and services. Our strategic sourcing and supplier management expertise minimizes costs and risks for your project.",
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Construction",
    content:
      "Our construction teams are committed to safety, quality, and efficiency. We manage every aspect of the construction process to deliver projects on time and within budget, with a focus on craftsmanship and attention to detail.",
    img: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function WorkSection() {
  useEffect(() => {
    const titles = gsap.utils.toArray(".left-content");
    const cards = gsap.utils.toArray(".right .card");

    // wrapper element to animate subtle background color when cards change
    const wrapperEl = document.querySelector('.wrapper');
    const bgColors = ['#f8fafc', '#eef2ff', '#f0fff4'];

    gsap.set(titles, { y: 100 });

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

      tl.to(card, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "none",
      }).call(
        () => {
          const direction = tl.scrollTrigger.direction > 0;
          gsap.to(title, {
            autoAlpha: direction ? 1 : 0,
            y: 0,
            duration: direction ? 0.5 : 0.2,
            onComplete: () =>
              !direction && gsap.set(title, { autoAlpha: 0, y: 100 }),
          });
        },
        [],
        i + 0.5
      );

      // change wrapper background color to match the current card (subtle)
      tl.call(() => {
        const color = bgColors[i] || '#ffffff';
        if (wrapperEl) gsap.to(wrapperEl, { backgroundColor: color, duration: 0.6, ease: 'power1.out' });
      }, [], i + 0.6);

      if (prevTitle) {
        tl.call(
          () => {
            const direction = tl.scrollTrigger.direction > 0;
            gsap.to(prevTitle, {
              autoAlpha: direction ? 0 : 1,
              duration: direction ? 0.2 : 0.5,
              y: 0,
              onComplete: () =>
                direction && gsap.set(prevTitle, { autoAlpha: 0, y: 100 }),
            });
          },
          [],
          "<"
        );
      }
    });
  }, []);

  return (
    <div className="w-full">
      <div className="wrapper w-full flex  overflow-hidden">
        {/* Left Titles */}
        <div className="column left relative flex-1 flex justify-center items-center h-screen overflow-hidden px-6 md:px-16">
          {sectionsData.map((section, i) => (
            <div
              key={section.id}
              className="left-content absolute opacity-0 invisible text-gray-900 text-4xl flex items-center justify-center"
            >
              <div className="content w-[90%] max-w-[600px] text-center text-lg bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">{section.title}</h1>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Cards (with images instead of gradients) */}
        <div className="column right relative flex-1 flex justify-center items-center h-screen">
          {sectionsData.map((section) => (
            <div
              key={section.id}
              className="card absolute w-[90%] h-[90%] max-w-[420px] max-h-[420px] rounded-xl flex justify-center items-center text-3xl text-white font-bold overflow-hidden [clip-path:polygon(0%_100%,100%_100%,100%_100%,0_100%)] shadow-2xl ring-1 ring-black/10 transform transition-transform duration-300 hover:scale-105"
              style={{
                backgroundImage: `url(${section.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <h1 className="drop-shadow-lg text-2xl md:text-3xl z-10">{section.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
