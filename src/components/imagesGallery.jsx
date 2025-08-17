'use client'
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const CorporateCarousel = () => {
  const gridItems = [
    {
      title: "Why we invest in our people",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&crop=face",
      width: "w-72", // Different width
      height: "h-76" // Different height
    },
    {
      title: "Aramco and Aston Martin Racing take on F1", 
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop",
      width: "w-64", // Narrower
      height: "h-80" // Much taller
    },
    {
      title: "The Manifa Story",
      description: "Learn more", 
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&h=350&fit=crop",
      width: "w-80", // Wider
      height: "h-48" // Shorter
    },
    {
      title: "Our perspective",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1581094613018-e2c30cfb9efd?w=500&h=550&fit=crop", 
      width: "w-68", // Medium
      height: "h-72" // Tall
    },
    {
      title: "Managing our footprint",
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=450&fit=crop",
      width: "w-76", // Wide
      height: "h-56" // Medium height
    },
    {
      title: "Resources for journalists", 
      description: "Learn more",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=550&h=500&fit=crop",
      width: "w-70", // Different width
      height: "h-68" // Different height
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-gray-500 text-xs font-medium tracking-wider uppercase mb-6">
            WHAT WE BELIEVE
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-gray-800 max-w-2xl leading-tight mb-30">
            We believe in the power of energy to help transform lives,
            enhance communities, and advance human progress.
          </h1>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scrollable Container - BOTTOM ALIGNED */}
          <div 
            className="flex items-end gap-4 overflow-x-auto scrollbar-hide pb-2 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {gridItems.map((item, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer flex-shrink-0 ${item.width} ${item.height}`}
              >
                <div className="relative w-full h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Image - Takes remaining space */}
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content Section - Fixed height at bottom */}
                  <div className="bg-white p-4 h-20 flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-gray-800 mb-2 leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
                      <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="text-sm font-medium">{item.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hide scrollbar CSS */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CorporateCarousel;