"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";

// --- MOCK DATA ---
const mockData = [
  {
    category: "Oil & Gas Processing",
    backgroundUrl: "/img16.jpg",
    projects: [
      {
        year: 2018,
        country: "Algeria",
        title: "TIMIMOUN Gas Field Development",
        imageUrl: "/img2.jpg",
      },
      {
        year: 2019,
        country: "Thailand",
        title: "PTT Wangnoi Compressor Station",
        imageUrl: "/img3.jpg",
      },
      {
        year: 2017,
        country: "Iraq",
        title: "Eni Zubair Oil Field Development",
        imageUrl: "/img4.jpg",
      },
      {
        year: 2017,
        country: "Malaysia",
        title: "Petronas Carigali Terengganu Gas",
        imageUrl: "/img5.jpg",
      },
      {
        year: 2017,
        country: "Iraq",
        title: "Gazprom Badra OSP Project",
        imageUrl: "/img6.jpg",
      },
      {
        year: 2016,
        country: "Indonesia",
        title: "MCU Banyu Urip GOSP Project",
        imageUrl: "/img7.jpg",
      },
    ],
  },
  {
    category: "Refinery",
    backgroundUrl: "/img17.jpg",
    projects: [
      {
        year: 2023,
        country: "UAE",
        title: "ADNOC Refining Crude Flexibility",
        imageUrl: "/img9.jpg",
      },
      {
        year: 2018,
        country: "Kuwait",
        title: "KNPC Clean Fuel Project",
        imageUrl: "/img10.jpg",
      },
      {
        year: 2020,
        country: "Oman",
        title: "DRPIC Duqm Refinery Package #2",
        imageUrl: "/img11.jpg",
      },
      {
        year: 2020,
        country: "China",
        title: "Samsung E&C Utility Project",
        imageUrl: "/img12.jpg",
      },
    ],
  },
  {
    category: "Petrochemicals",
    backgroundUrl: "/img21.jpg",
    projects: [
      {
        year: 2022,
        country: "USA",
        title: "Gulf Coast Growth Ventures",
        imageUrl: "/img14.jpg",
      },
      {
        year: 2021,
        country: "South Korea",
        title: "Ulsan PP Plant Expansion",
        imageUrl: "/img15.jpg",
      },
      {
        year: 2019,
        country: "Saudi Arabia",
        title: "Sadara Chemical Complex",
        imageUrl: "/img16.jpg",
      },
    ],
  },
  {
    category: "Environmental",
    backgroundUrl: "/img18.jpg",
    projects: [
      {
        year: 2020,
        country: "China",
        title: "Samsung Electronics Xian X2 Utility",
        imageUrl: "/img18.jpg",
      },
      {
        year: 2020,
        country: "Korea",
        title: "Samsung Electronics Pyeongtaek P2",
        imageUrl: "/img19.jpg",
      },
      {
        year: 2021,
        country: "Vietnam",
        title: "Samsung Display V3 Project",
        imageUrl: "/img20.jpg",
      },
    ],
  },
];

// --- SUB-COMPONENTS ---

const AnimatedBackground = ({ imageUrl }) => {
  const [currentUrl, setCurrentUrl] = useState(imageUrl);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    if (imageUrl !== currentUrl) {
      setPrevUrl(currentUrl);
      setCurrentUrl(imageUrl);
    }
  }, [imageUrl, currentUrl]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {prevUrl && (
        <div
          key={prevUrl}
          className="absolute inset-0 bg-cover bg-center animate-ken-burns-out"
          style={{ backgroundImage: `url(${prevUrl})` }}
        />
      )}
      <div
        key={currentUrl}
        className="absolute inset-0 bg-cover bg-center animate-ken-burns-in"
        style={{ backgroundImage: `url(${currentUrl})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

const Sidebar = ({ categories, selectedIndex, onSelect }) => (
  <nav className="absolute top-25 left-0 h-full w-80 p-4">
    <div className="w-full h-full p-6 flex flex-col">
      <div className="text-white text-3xl font-bold mb-12 tracking-wider">
        Our Business
      </div>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={category}>
            <button
              onClick={() => onSelect(index)}
              className={`w-5/6 text-left cursor-pointer border backdrop-blur-4xl border-white/40 px-4 py-3 rounded-full transition-all duration-300 text-lg font-semibold relative overflow-hidden group ${
                selectedIndex === index
                  ? "bg-white/99 text-red-500 shadow-lg border-red-500"
                  : "text-white hover:text-red-500 hover:border hover:border-red-500"
              }`}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
              <span className="relative z-10">{category}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const ProjectCard = ({ project }) => (
  <div
    className="group relative flex-shrink-0 mr-8 backdrop-blur-xl cursor-pointer bg-white/10 rounded-2xl shadow-lg border border-white/10 p-6 flex flex-col transition-all duration-300 ease-in-out hover:bg-white hover:border-white/30 "
    style={{ width: "480px", height: "480px" }}
  >
    <div className="relative flex-shrink-0">
      <p className="text-sm text-gray-300 font-medium transition-colors duration-300 group-hover:text-red-500">
        {project.year} | {project.country}
      </p>
      <h3 className="text-xl font-bold text-white mt-2 h-16 leading-tight transition-colors duration-300 group-hover:text-black">
        {project.title}
      </h3>
    </div>
    <div className="relative flex-grow mt-4 rounded-lg overflow-hidden">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const categories = useMemo(() => mockData.map((d) => d.category), []);
  const selectedData = mockData[selectedCategoryIndex];

  const handleSelectCategory = (index) => {
    if (index !== selectedCategoryIndex) {
      setSelectedCategoryIndex(index);
      setAnimationKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <div className="font-satoshi text-white h-full flex items-center justify-center overflow-hidden relative">
      <div className="w-1/2">
        <AnimatedBackground imageUrl={selectedData.backgroundUrl} />

        <Sidebar
          categories={categories}
          selectedIndex={selectedCategoryIndex}
          onSelect={handleSelectCategory}
        />
      </div>

      <main className="flex-1 flex flex-col w-1/3 relative right-40 bottom-10 justify-center p-16 overflow-y-visible">
        <div
          key={animationKey}
          className="animate-fade-slide-in rounded-2xl p-0 self-start"
          style={{ "--animation-delay": "150ms" }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-white mb-5">
            {selectedData.category}
          </h1>
          <button className="group relative cursor-pointer flex items-center text-left gap-2 backdrop-blur-xl border-2 border-white/50 text-white px-8 py-3 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:border-white hover:scale-105">
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Learn More</span>
            <ArrowRight
              size={22}
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        <div
          key={animationKey + 0.5}
          className="mt-16 animate-fade-slide-in"
          style={{ "--animation-delay": "300ms" }}
        >
          <div className="flex overflow-x-visible pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 scrollbar-thumb-rounded-full">
            {selectedData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
            <div className="flex-shrink-0 w-4"></div> {/* Spacer at the end */}
          </div>
        </div>
      </main>
    </div>
  );
}
