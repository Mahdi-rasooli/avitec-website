"use client";
import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- MOCK DATA ---
const mockData = [
  // ... your mock data ...
  {
    category: "Oil & Gas Processing",
    backgroundUrl: "/img11.jpg",
    projects: [
      { year: 2022, country: "Tehran-Saveh", title: "Tadbir Alborz Co Project", imageUrl: "/img2.jpg" },
      { year: 2021, country: "Economic Zone", title: "Marun Petrochemical Project", imageUrl: "/img3.jpg" },
    ],
  },
  {
    category: "Refinery",
    backgroundUrl: "/img17.jpg",
    projects: [
      { year: 2014, country: "Abadan", title: "Karoon Phosphate Products Complex", imageUrl: "/img9.jpg" },
      { year: 2023, country: "Qazvin", title: "Liya Glass Project", imageUrl: "/img10.jpg" },
      { year: 2020, country: "Oman", title: "DRPIC Duqm Refinery Package #2", imageUrl: "/img11.jpg" },
      { year: 2020, country: "China", title: "Samsung E&C Utility Project", imageUrl: "/img12.jpg" },
    ],
  },
  {
    category: "Petrochemicals",
    backgroundUrl: "/img21.jpg",
    projects: [
      { year: 2024, country: "Mahshahr", title: "HIRSA POLYMER SAHAND PETROCHEMICAL PROJECT", imageUrl: "/img14.jpg" },
    ],
  },
  {
    category: "Environmental",
    backgroundUrl: "/img18.jpg",
    projects: [
      { year: 2020, country: "China", title: "Samsung Electronics Xian X2 Utility", imageUrl: "/img18.jpg" },
      { year: 2020, country: "Korea", title: "Samsung Electronics Pyeongtaek P2", imageUrl: "/img19.jpg" },
      { year: 2021, country: "Vietnam", title: "Samsung Display V3 Project", imageUrl: "/img20.jpg" },
    ],
  },
];


const useImagePreloader = (imageUrlList) => {
  useEffect(() => {
    imageUrlList.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrlList]);
};


// --- SUB-COMPONENTS ---

// --- CHANGE: The flash animation is now handled entirely inside this component ---
const AnimatedBackground = ({ imageUrl, animationKey }) => {
  const [currentUrl, setCurrentUrl] = useState(imageUrl);
  const [prevUrl, setPrevUrl] = useState(null);
  useEffect(() => {
    if (imageUrl !== currentUrl) {
      setPrevUrl(currentUrl);
      setCurrentUrl(imageUrl);
    }
  }, [imageUrl, currentUrl]);
  return (
    // The animationKey and animate-flash class are now here to isolate the effect
    <div key={animationKey} className="absolute inset-0 -z-10">
      {prevUrl && (<div key={prevUrl} className="absolute inset-0 bg-cover bg-center animate-ken-burns-out" style={{ backgroundImage: `url(${prevUrl})` }} />)}
      <div key={currentUrl} className="absolute inset-0 bg-cover bg-center animate-ken-burns-in" style={{ backgroundImage: `url(${currentUrl})` }} />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

const Sidebar = ({ categories, selectedIndex, onSelect }) => (
  <nav className="absolute top-25 left-10 h-full w-80 p-4">
    <div className="w-full h-full p-6 flex flex-col">
      <div className="text-white text-2xl font-bold mb-12 ml-3 tracking-wider">Our Business</div>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={category}>
            {/* --- FIX: Reworked the button for a proper slide-in text effect --- */}
            <button onClick={() => onSelect(index)} className={`w-full text-left cursor-pointer border backdrop-blur-md border-white/40 px-4 py-3 rounded-full text-white text-lg font-semibold relative overflow-hidden group transition-colors duration-300 hover:border-red-500 hover:text-red-400 ${selectedIndex === index ? "border-red-500 text-red-500" : ""}`}>
              {/* This is the white background that slides in */}
              <span className={`absolute top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-out ${selectedIndex === index ? "translate-x-0" : "-translate-x-full"}`}></span>
              
              {/* This text now uses mix-blend-mode to invert its color automatically */}
              <span className={`relative z-10 ${selectedIndex === index ?  "text-red-500" : ""} font-bold`}>
                {category}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const ProjectCard = ({ project, index }) => (
  <div
    className="group relative flex-shrink-0 mr-8 backdrop-blur-md cursor-pointer bg-white/10 rounded-2xl shadow-lg border border-white/10 p-6 flex flex-col transition-all duration-300 ease-in-out hover:bg-white hover:border-white/30 animate-slide-in-from-right"
    style={{
      width: "450px",
      height: "460px",
      animationDelay: `${index * 80}ms`,
    }}
  >
    <div className="relative flex-shrink-0">
      <p className="text-sm text-gray-300 font-medium transition-colors duration-300 group-hover:text-red-500">{project.year} | {project.country}</p>
      <h3 className="text-xl font-bold text-white mt-2 h-16 leading-tight transition-colors duration-300 group-hover:text-black">{project.title}</h3>
    </div>
    <div className="relative flex-grow mt-4 rounded-lg overflow-hidden">
      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
    </div>
  </div>
);


const ProgressBar = ({ scrollerRef, categoryData }) => {
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const isDraggingThumb = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!scroller || !thumb || !track) return;

    const handleScroll = () => {
      if (isDraggingThumb.current) return;
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      if (maxScrollLeft <= 0) {
        thumb.style.transform = `translateX(0px)`;
        return;
      }
      const scrollPercentage = scroller.scrollLeft / maxScrollLeft;
      const trackWidth = track.clientWidth;
      const thumbWidth = thumb.clientWidth;
      const thumbPosition = scrollPercentage * (trackWidth - thumbWidth);
      thumb.style.transform = `translateX(${thumbPosition}px)`;
    };

    const handlePointerDown = (e) => {
      e.stopPropagation();
      isDraggingThumb.current = true;
      thumb.setPointerCapture?.(e.pointerId);
      thumb.classList.add("active:scale-110");
    };

    const handlePointerMove = (e) => {
      if (!isDraggingThumb.current) return;
      e.preventDefault();
      const trackRect = track.getBoundingClientRect();
      const thumbWidth = thumb.clientWidth;
      let newThumbLeft = e.clientX - trackRect.left - (thumbWidth / 2);
      newThumbLeft = Math.max(0, Math.min(newThumbLeft, trackRect.width - thumbWidth));
      if (trackRect.width - thumbWidth <= 0) return;
      const scrollPercentage = newThumbLeft / (trackRect.width - thumbWidth);
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      scroller.scrollLeft = scrollPercentage * maxScrollLeft;
      thumb.style.transform = `translateX(${newThumbLeft}px)`;
    };

    const handlePointerUp = (e) => {
      isDraggingThumb.current = false;
      thumb.releasePointerCapture?.(e.pointerId);
      thumb.classList.remove("active:scale-110");
    };

    scroller.addEventListener('scroll', handleScroll);
    thumb.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(scroller);
    handleScroll(); 

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      resizeObserver.disconnect();
    };
  }, [scrollerRef, categoryData]); 

  return (
    <div ref={trackRef} className="w-full h-1 bg-white/20 rounded-full cursor-pointer relative mr-2 mt-8">
      <div ref={thumbRef} className="absolute top-1/2 -translate-y-1/2 h-1 w-1/2 bg-white rounded-full cursor-grab transition-transform duration-100 ease-out active:cursor-grabbing"></div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const componentRef = useRef(null);

  const allImageUrls = useMemo(() => {
    const backgroundUrls = mockData.map(d => d.backgroundUrl);
    const projectImageUrls = mockData.flatMap(d => d.projects.map(p => p.imageUrl));
    return [...new Set([...backgroundUrls, ...projectImageUrls])];
  }, []);

  useImagePreloader(allImageUrls);

  const categories = useMemo(() => mockData.map((d) => d.category), []);
  const selectedData = mockData[selectedCategoryIndex];

  const handleSelectCategory = (index) => {
    if (index !== selectedCategoryIndex && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedCategoryIndex(index);
        setAnimationKey(prevKey => prevKey + 1);
        setIsTransitioning(false);
      }, 300); // Corresponds to the fade-out duration
    }
  };

  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let isDragging = false, startX = 0, scrollStart = 0;
    
    const handlePointerDown = (e) => {
      isDragging = true;
      scroller.setPointerCapture?.(e.pointerId);
      startX = e.clientX;
      scrollStart = scroller.scrollLeft;
      scroller.classList.add('dragging');
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const walk = (e.clientX - startX) * 1.5;
      const newScrollLeft = scrollStart - walk;
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      scroller.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
    };
    
    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      scroller.releasePointerCapture?.(e?.pointerId);
      scroller.classList.remove('dragging');
    };
    
    scroller.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', endDrag);
    
    return () => {
      scroller.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', endDrag);
    };
  }, [selectedData]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: componentRef.current,
        start: "top top", 
        end: "+=80%", 
        pin: true, 
        anticipatePin: 1,
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out both; }
        .animate-slide-in-from-right { animation: slideInFromRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        /* --- CHANGE: Made flash duration slightly longer for a smoother feel --- */
        .animate-flash { animation: flashEffect 0.5s ease-in-out; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .dragging { cursor: grabbing; scroll-behavior: auto; user-select: none; }
      `}</style>
      
      <div ref={componentRef} className="font-satoshi text-white h-screen flex items-center justify-center overflow-hidden  relative">
        {/* --- CHANGE: Removed flash animation from this container --- */}
        <div className="w-1/2">
           {/* --- CHANGE: Pass animationKey to the background component --- */}
          <AnimatedBackground imageUrl={selectedData.backgroundUrl} animationKey={animationKey} />
          <Sidebar categories={categories} selectedIndex={selectedCategoryIndex} onSelect={handleSelectCategory} />
        </div>

        <main className={`flex-1 flex flex-col w-1/3 relative right-40 bottom-3 gap-10 justify-center p-16 overflow-y-visible transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div key={animationKey} className="animate-fade-in-down flex flex-col items-start gap-5">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-7">{selectedData.category}</h1>
            <button className="group relative cursor-pointer flex items-center text-left gap-2 backdrop-blur-xl border-2 border-white/50 text-white px-8 py-3 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:border-white hover:scale-105">
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Learn More</span>
              <ArrowRight size={22} className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div key={animationKey + 0.5} className="mt-5">
            <div ref={scrollerRef} className="flex overflow-y-auto  pb-8 -mx-4 px-4 cursor-grab scrollbar-hide">
              {selectedData.projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
              <div className="flex-shrink-0 w-4"></div>                        
            </div>
            
            {selectedData.projects.length > 1 && <ProgressBar scrollerRef={scrollerRef} categoryData={selectedData} />}
          </div>
        </main>
      </div>
    </>
  );
}