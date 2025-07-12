'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const HomePageSlider = () => {
  const images = [
    { id: 1, src: '/images/community_1.png', alt: 'Mountain landscape' },
    { id: 2, src: '/images/community_2.png', alt: 'Forest path' },
    { id: 3, src: '/images/community_3.png', alt: 'Ocean waves' },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(1);

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const slideWidthPercent = useRef(100);

  const totalSlides = images.length;
  const clonedCount = visibleSlides;
  const extendedImages = [
    ...images.slice(-clonedCount),
    ...images,
    ...images.slice(0, clonedCount),
  ];

  // Responsive setup
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const slides = isMobile ? 1 : 3;
      setVisibleSlides(slides);
      slideWidthPercent.current = isMobile ? 100 : 100 / slides;

      const startIndex = slides;
      setCurrentIndex(startIndex);

      requestAnimationFrame(() => {
        updateSlidePosition(startIndex, false);
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateSlidePosition = (index: number, smooth = true) => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
    sliderRef.current.style.transform = `translateX(-${index * slideWidthPercent.current}%)`;
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    updateSlidePosition(index);

    setTimeout(() => {
      let adjustedIndex = index;
      if (index >= totalSlides + clonedCount) {
        adjustedIndex = clonedCount;
        updateSlidePosition(adjustedIndex, false);
      } else if (index < clonedCount) {
        adjustedIndex = totalSlides + clonedCount - 1;
        updateSlidePosition(adjustedIndex, false);
      }
      setCurrentIndex(adjustedIndex);
      setIsTransitioning(false);
    }, 500);
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4000);
  }, [currentIndex]);

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    if (isPlaying) startAutoPlay();
    return stopAutoPlay;
  }, [isPlaying, startAutoPlay]);

  useEffect(() => {
    const startIndex = visibleSlides;
    setCurrentIndex(startIndex);
    updateSlidePosition(startIndex, false);
  }, [visibleSlides]);

  // Touch logic
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const displayIndex = ((currentIndex - clonedCount + totalSlides) % totalSlides) + 1;

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-white/10">
        <h2 className="text-3xl font-semibold text-blue-500">What our Community Say</h2>
      </div>
  
      {/* Slider */}
      <div className="m-10 relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-white text-sm font-medium border border-white/20 bg-black/50">
          {displayIndex} of {totalSlides}
        </div>
  
        <div
          ref={sliderRef}
          className="flex"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {extendedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="flex-shrink-0 px-3 py-4"
              style={{ width: `${slideWidthPercent.current}%` }}
            >
              <div className="relative group overflow-hidden rounded-xl border border-white/10 hover:border-white/20">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Arrows */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-white flex items-center justify-center border border-white/20 bg-black/40 hover:border-white/30 hover:bg-black/60"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-white flex items-center justify-center border border-white/20 bg-black/40 hover:border-white/30 hover:bg-black/60"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
  
};

export default HomePageSlider;
