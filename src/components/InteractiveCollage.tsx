/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from 'lucide-react';

interface Slide {
  category: string;
  title: string;
  subtitle: string;
  actionText: string;
  imageCenter: string;
  imageLeft: string;
  imageRight: string;
}

import { INTERACTIVE_COLLAGE_SLIDES as COLLAGE_SLIDES } from '../assets';

interface InteractiveCollageProps {
  onInquireClick: () => void;
}

export default function InteractiveCollage({ onInquireClick }: InteractiveCollageProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [focusedImage, setFocusedImage] = useState<'left' | 'center' | 'right'>('center');

  // Auto-rotate slides when not interacted with or swapped
  useEffect(() => {
    if (isPaused || focusedImage !== 'center') return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev === COLLAGE_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, focusedImage]);

  // Reset focused image to center when slide changes
  useEffect(() => {
    setFocusedImage('center');
  }, [currentSlideIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handlePrevSlide = () => {
    setFocusedImage('center');
    setCurrentSlideIndex((prev) => (prev === 0 ? COLLAGE_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setFocusedImage('center');
    setCurrentSlideIndex((prev) => (prev === COLLAGE_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const getRole = (cardType: 'left' | 'center' | 'right'): 'left' | 'center' | 'right' => {
    if (focusedImage === 'center') return cardType;
    if (focusedImage === 'left') {
      if (cardType === 'left') return 'center';
      if (cardType === 'center') return 'left';
      return 'right';
    }
    if (focusedImage === 'right') {
      if (cardType === 'right') return 'center';
      if (cardType === 'center') return 'right';
      return 'left';
    }
    return cardType;
  };

  const getCardProps = (cardType: 'left' | 'center' | 'right') => {
    const role = getRole(cardType);
    let className = "absolute rounded-2xl overflow-hidden border pointer-events-auto group shadow-md";
    let style: React.CSSProperties = {
      transition: 'all 0.8s cubic-bezier(0.4, 2, 0.3, 1)',
    };
    let onClick: () => void = () => {};
    let title = "";
    let label = "";

    if (role === 'left') {
      className += " left-[3%] sm:left-[6%] top-[55%] md:top-[50%] w-[90px] sm:w-[150px] md:w-[220px] lg:w-[260px] border-white/50 bg-zinc-100 z-10 saturate-[65%] hover:saturate-[100%] cursor-pointer hover:scale-[1.03] hover:shadow-lg active:scale-95";
      style.transform = `translate(${mouseOffset.x * -28}px, ${mouseOffset.y * -20}px) translateY(-50%)`;
      onClick = () => setFocusedImage(cardType);
      title = "Click to bring forward";
      label = "Focus Frame";
    } else if (role === 'center') {
      if (cardType === 'center') {
        className += " left-1/2 top-1/2 w-[78%] sm:w-[65%] max-w-[420px] md:max-w-[530px] lg:max-w-[650px] shadow-2xl border-white/70 bg-zinc-200 z-20 saturate-[100%]";
      } else {
        className += " left-1/2 top-1/2 w-[55%] sm:w-[45%] max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px] shadow-2xl border-white/70 bg-zinc-200 z-30 saturate-[100%]";
      }
      style.transform = `translate(-50%, -50%) translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 8}px)`;
      
      if (focusedImage !== 'center') {
        className += " cursor-pointer hover:scale-[1.01]";
        onClick = () => setFocusedImage('center');
        title = "Click to reset view";
        label = "Reset View";
      } else {
        className += " cursor-default";
      }
    } else {
      className += " right-[3%] sm:right-[6%] top-[20%] md:top-[12%] w-[80px] sm:w-[130px] md:w-[190px] lg:w-[230px] border-white/50 bg-zinc-100 z-10 saturate-[65%] hover:saturate-[100%] cursor-pointer hover:scale-[1.03] hover:shadow-lg active:scale-95";
      style.transform = `translate(${mouseOffset.x * -45}px, ${mouseOffset.y * -32}px)`;
      onClick = () => setFocusedImage(cardType);
      title = "Click to bring forward";
      label = "Focus Frame";
    }

    return { className, style, onClick, title, label, role };
  };

  const renderInteractiveCard = (cardType: 'left' | 'center' | 'right', alt: string) => {
    const { className, style, onClick, title, label, role } = getCardProps(cardType);
    const imgSrc = cardType === 'left' 
      ? COLLAGE_SLIDES[currentSlideIndex].imageLeft 
      : cardType === 'center' 
      ? COLLAGE_SLIDES[currentSlideIndex].imageCenter 
      : COLLAGE_SLIDES[currentSlideIndex].imageRight;

    // Aspect ratio mappings kept intact natively so images are never cut off or stretched
    const aspectClass = cardType === 'left' ? 'aspect-[4/5]' : cardType === 'center' ? 'aspect-[16/10]' : 'aspect-[3/4]';

    return (
      <div 
        onClick={onClick}
        className={`${className} ${aspectClass}`}
        style={style}
        title={title}
      >
        <img 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
          src={imgSrc}
        />
        <div className="absolute inset-0 bg-[#faf9f6]/3 mix-blend-overlay"></div>
        
        {role !== 'center' && (
          <div className="absolute inset-0 bg-black/15 hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-[#1a1309]/80 text-[#dac587] font-semibold font-label text-[9px] tracking-wider uppercase px-2.5 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
              {label}
            </span>
          </div>
        )}

        {role === 'center' && focusedImage !== 'center' && (
          <div className="absolute inset-0 bg-black/15 hover:bg-black/5 flex items-center justify-center group-hover:opacity-100 transition-opacity">
            <span className="bg-[#1a1309]/85 text-[#dac587] font-medium font-label text-[9px] tracking-widest uppercase px-3 py-2 rounded-full backdrop-blur-sm shadow-md text-white">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section 
      id="staggered-showcase"
      className="relative w-full bg-brand-background border-t border-brand-primary/10 py-20 px-6 md:px-16 md:py-24 scroll-mt-20 overflow-hidden flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Subtle Paper Texture Background Overlays - pristine luxury layout */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#dac587_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="relative z-10 w-full max-w-[1240px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-8 select-none">
          <span className="font-label text-[10px] tracking-widest text-brand-secondary uppercase font-bold flex items-center justify-center gap-1.5 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dac587]" />
            <span>EXHIBITION CAROUSEL</span>
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-brand-primary font-light">
            Interactive Staggered Series
          </h3>
        </div>

        {/* Top active details with wait animation */}
        <div className="relative w-full text-center select-none min-h-[140px] md:min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center max-w-2xl px-4"
            >
              <span className="font-label text-[10px] text-brand-secondary uppercase tracking-[0.25em] font-medium opacity-85 mb-1.5">
                {COLLAGE_SLIDES[currentSlideIndex].category}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-brand-primary tracking-wide font-light leading-snug">
                {COLLAGE_SLIDES[currentSlideIndex].title}
              </h2>
              <p className="font-sans text-xs md:text-sm text-brand-secondary tracking-widest font-light mt-2">
                {COLLAGE_SLIDES[currentSlideIndex].subtitle}
              </p>
              
              <div className="mt-3">
                <span className="group relative inline-flex items-center font-label text-[10px] md:text-xs tracking-widest uppercase font-semibold text-brand-primary/80">
                  <span>{COLLAGE_SLIDES[currentSlideIndex].actionText}</span>
                  <ArrowUpRight className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Staggered Collage Area & Buttons overlay */}
        <div className="relative w-full max-w-5xl my-4 flex items-center justify-center">
          
          {/* Chevron Navigation Arrows attached to the sides */}
          <div className="absolute left-0 lg:-left-6 z-30 pointer-events-auto">
            <button
              onClick={handlePrevSlide}
              className="p-3 bg-[#faf9f6]/95 hover:bg-white border border-brand-primary/10 hover:border-brand-primary/30 text-brand-primary rounded-full transition-all duration-300 active:scale-90 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl"
              aria-label="Previous portfolio story"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="absolute right-0 lg:-right-6 z-30 pointer-events-auto">
            <button
              onClick={handleNextSlide}
              className="p-3 bg-[#faf9f6]/95 hover:bg-white border border-brand-primary/10 hover:border-brand-primary/30 text-brand-primary rounded-full transition-all duration-300 active:scale-90 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl"
              aria-label="Next portfolio story"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Core Collage Frames */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] flex items-center justify-center pointer-events-none"
              >
                {renderInteractiveCard('left', "Legacy left side captured highlight")}
                {renderInteractiveCard('center', "Fine art wedding cinematic central highlight")}
                {renderInteractiveCard('right', "Legacy right side captured highlight")}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Footer/Meta controller of this section */}
        <div className="relative z-20 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-brand-primary/10 pt-5 mt-4">
          
          <div className="flex items-center gap-2 pointer-events-auto">
            <button 
              onClick={onInquireClick}
              className="font-label text-[10px] sm:text-xs tracking-wider bg-brand-primary border border-brand-primary text-white hover:bg-brand-secondary hover:text-white active:scale-95 px-5 py-3 rounded-full uppercase font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow hover:shadow-brand-secondary/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Commission a Series</span>
            </button>
            <span className="font-sans text-[11px] text-brand-secondary italic pl-2 hidden md:inline">
              Limited legacy bookings for the calendar season
            </span>
          </div>

          {/* Slider indicators */}
          <div className="flex items-center gap-1.5 select-none pointer-events-auto">
            {COLLAGE_SLIDES.map((_, idx) => {
              const isSelected = idx === currentSlideIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className="py-2 px-1 focus:outline-none cursor-pointer group pointer-events-auto"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div 
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      isSelected 
                        ? 'w-7 sm:w-10 bg-brand-primary' 
                        : 'w-2.5 bg-brand-primary/25 group-hover:bg-brand-primary/50'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
