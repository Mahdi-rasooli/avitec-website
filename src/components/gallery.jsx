'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Grid, Maximize2 } from 'lucide-react';

const ModernGalleryCarousel = () => {
  // Gallery-only component: no carousel state needed

  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop&crop=entropy&auto=format",
      title: "Urban Aesthetics",
      subtitle: "Where concrete meets creativity",
      description: "Discover the beauty in architectural chaos",
      size: "tall"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&h=600&fit=crop&crop=entropy&auto=format",
      title: "Digital Dreams",
      subtitle: "Beyond the pixel horizon", 
      description: "Immerse yourself in virtual landscapes",
      size: "square"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop&crop=entropy&auto=format",
      title: "Natural Chaos",
      subtitle: "Organic irregularity",
      description: "Nature's own messy perfection",
      size: "wide"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=800&fit=crop&crop=entropy&auto=format",
      title: "Color Rebellion",
      subtitle: "Breaking the monotone",
      description: "Vibrant stories in every hue",
      size: "portrait"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-157101961344-1cb2f99b2d8b?w=800&h=500&fit=crop&crop=entropy&auto=format",
      title: "Future Fragments",
      subtitle: "Tomorrow's aesthetic today",
      description: "Glimpses of what's to come",
      size: "landscape"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=900&fit=crop&crop=entropy&auto=format",
      title: "Neon Nights",
      subtitle: "Electric atmosphere",
      description: "When darkness becomes light",
      size: "tall"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=700&h=700&fit=crop&crop=entropy&auto=format",
      title: "Code Poetry",
      subtitle: "Digital artistry",
      description: "Beauty in binary",
      size: "square"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=850&h=550&fit=crop&crop=entropy&auto=format",
      title: "Cosmic Flow",
      subtitle: "Universal patterns",
      description: "Infinite possibilities",
      size: "wide"
    }
  ];

  // No carousel interactions — gallery only

  const getSizeClasses = (size) => {
    const sizes = {
      tall: "col-span-1 row-span-2 h-80",
      square: "col-span-1 row-span-1 h-40", 
      wide: "col-span-2 row-span-1 h-40",
      portrait: "col-span-1 row-span-2 h-80",
      landscape: "col-span-2 row-span-1 h-40"
    };
    return sizes[size] || sizes.square;
  };

  return (
    <div className="relative w-full h-screen min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      
      {/* Header */}
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
        </div>
      </div>

        {/* Gallery Mode */}
        <div className="pt-24 pb-12 px-6 h-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-4 gap-4 auto-rows-min">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`group cursor-pointer relative overflow-hidden rounded-2xl bg-gray-800 ${getSizeClasses(image.size)} transition-all duration-500 hover:scale-105 hover:z-10`}
                  onClick={() => {}}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg leading-tight mb-1">
                      {image.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {image.subtitle}
                    </p>
                  </div>
                  
                  {/* Hover border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-2xl transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernGalleryCarousel;