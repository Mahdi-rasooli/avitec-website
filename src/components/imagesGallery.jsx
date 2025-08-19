'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CorporateCarousel = () => {
  const gridItems = [
    {
      title: "Innovations in Construction",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      width: "w-80",
      height: "h-64"
    },
    {
      title: "Strategic Procurement",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
      width: "w-60",
      height: "h-80"
    },
    {
      title: "Engineering Excellence",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1581091012184-5c814c52b8d4?auto=format&fit=crop&w=1000&q=80",
      width: "w-96",
      height: "h-64"
    },
    {
      title: "Corporate Collaboration",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80",
      width: "w-64",
      height: "h-80"
    },
    {
      title: "Modern Infrastructure",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=720&q=80",
      width: "w-72",
      height: "h-56"
    },
    {
      title: "Company Vision",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      width: "w-80",
      height: "h-64"
    }
  ];

  return (
    <div className="relative text-gray-100" style={{ zIndex: 10 }}>
      <div className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 md:mb-24 mt-12 md:mt-20 text-center md:text-left">
            <p className="text-gray-100 text-xs font-medium tracking-wider uppercase mb-6">
              WHAT WE BELIEVE
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-gray-50 max-w-3xl mx-auto md:mx-0 leading-tight">
              We believe in the power of energy to transform lives,
              enhance communities, and advance human progress.
            </h1>
          </div>

          <div className="relative">
            <div
              className="flex items-end gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {gridItems.map((item, index) => (
                <div
                  key={index}
                  className={`group relative cursor-pointer flex-shrink-0 ${item.width} ${item.height} rounded-lg overflow-hidden`}
                >
                  <div className="relative w-full h-full bg-gray-800 rounded-lg border border-white/10 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col">
                    <div className="flex-1 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-base font-medium text-white mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
                        <span className="text-sm font-medium">{item.description}</span>
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default CorporateCarousel;
