/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

import { HERO_SLIDES as SLIDES } from '../assets';

interface HeroProps {
  onExploreClick: () => void;
  onInquireClick?: () => void;
}

export default function Hero({ onExploreClick, onInquireClick }: HeroProps) {
  const [sliderActive, setSliderActive] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-trigger slideshow transition after 1.5 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => setSliderActive(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Slide rotation interval (rotates images every 5 seconds)
  useEffect(() => {
    if (!sliderActive) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderActive]);

  const triggerScrollDown = () => {
    const target = document.getElementById('staggered-showcase') || document.getElementById('portfolios');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-background"
    >
      {/* 1. Static Initial Background when slides are not yet active */}
      {!sliderActive && (
        <div className="absolute inset-0 z-0 bg-brand-background">
          <img 
            alt="Ethereal high-fashion wedding backdrop" 
            className="w-full h-full object-cover opacity-90 filter blur-[4px] saturate-[75%]"
            src={SLIDES[0].imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/15 via-transparent to-brand-background z-10" />
        </div>
      )}

      {/* 2. Immersive Sharp Slideshow Presentation Background with desaturating buttery transition */}
      {sliderActive && (
        <div className="absolute inset-0 z-0 bg-brand-background">
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={currentSlideIndex}
              initial={{ opacity: 0, scale: 1.06, filter: 'blur(20px) saturate(100%)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px) saturate(65%)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(15px) saturate(65%)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img 
                alt={SLIDES[currentSlideIndex].title} 
                className="w-full h-full object-cover opacity-85"
                src={SLIDES[currentSlideIndex].imageUrl}
              />
              {/* Soft white/champagne shadow shield to maintain readability & light mode contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/55 to-transparent z-10" />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* 3. Layered Interactive Content States */}
      <AnimatePresence mode="wait">
        {!sliderActive ? (
          <div className="relative z-10 w-full max-w-[1240px] px-6 md:px-16 text-center mt-20">
            <motion.div 
              key="intro-blur-box"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px) saturate(45%)', scale: 0.96 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel inline-block p-10 md:p-14 rounded-2xl mx-auto max-w-3xl shadow-lg border border-white/50"
            >
              {/* Launcher/Aesthetic Icon on top */}
              <div className="flex justify-center mb-6">
                <div className="h-11 w-11 rounded-full bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center text-brand-primary animate-pulse shadow-inner">
                  <Sparkles className="w-5 h-5 text-brand-secondary" />
                </div>
              </div>

              {/* Sub-label banner */}
              <span className="font-label text-[10px] tracking-widest text-[#715b3e] uppercase font-bold flex items-center justify-center gap-1.5 mb-4">
                <span className="h-1 w-1 rounded-full bg-[#dac587]" />
                <span>CINEMATOGRAPHY & FINE ART</span>
                <span className="h-1 w-1 rounded-full bg-[#dac587]" />
              </span>

              {/* Main title */}
              <h1 className="font-serif text-[2.75rem] md:text-[3.5rem] leading-[1.1] md:leading-[1.05] text-brand-primary font-light mb-5 tracking-tight max-w-2xl text-balance">
                The Art of Capturing <span className="italic font-normal">Liquid Light.</span>
              </h1>

              {/* Paragraph detail */}
              <p className="font-sans text-xs sm:text-sm text-[#4b463a] font-light max-w-xl mx-auto leading-relaxed mb-9">
                A sanctuary where moments are preserved with profound stillness, hand-crafted detail, and honest illumination.
              </p>

              {/* Enter Presentation slide button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={() => setSliderActive(true)}
                  className="w-full sm:w-auto font-label text-[10px] sm:text-xs tracking-wider bg-brand-primary border border-brand-primary text-white hover:bg-brand-secondary hover:text-white active:scale-95 px-6 py-3.5 rounded-full uppercase font-bold transition-all duration-300 shadow hover:shadow-brand-secondary/25"
                >
                  Enter Exhibition Gallery
                </button>
                <button 
                  onClick={triggerScrollDown}
                  className="w-full sm:w-auto font-label text-[10px] sm:text-xs tracking-wider hover:bg-brand-primary/5 px-6 py-3.5 rounded-full uppercase transition-all duration-300 text-brand-primary"
                >
                  Scroll to Portfolios
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* 4. Slideshow Immersive Overlay & Content info in lower left with High Contrast colors */
          <motion.div 
            key="slideshow-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end p-6 md:p-16"
          >
            <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 pointer-events-auto">
              
              {/* Image metadata quote matching presentation style */}
              <div className="flex flex-col gap-3 max-w-3xl text-left select-none">
                
                {/* Category label */}
                <motion.span 
                  key={`category-${currentSlideIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-label text-xs text-brand-secondary uppercase tracking-[0.25em] font-bold"
                >
                  {SLIDES[currentSlideIndex].category}
                </motion.span>

                {/* Big typography quote using dark brand-primary for maximum legibility */}
                <motion.h2 
                  key={`quote-${currentSlideIndex}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] leading-[1.1] text-brand-primary font-medium tracking-tight text-balance"
                >
                  {SLIDES[currentSlideIndex].title}
                </motion.h2>

                {/* Paragraph brief explanation */}
                <motion.p 
                  key={`desc-${currentSlideIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-sans text-xs sm:text-sm md:text-base text-[#4b463a] font-light max-w-xl leading-relaxed mt-1"
                >
                  {SLIDES[currentSlideIndex].description}
                </motion.p>

              </div>

              {/* Booking CTA Button & Switch Return to Intro, dashed indicator dots in lower-right */}
              <div className="flex flex-wrap items-center justify-between gap-6 border-t border-brand-primary/10 pt-6 mt-2">
                
                {/* CTA actions */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={onInquireClick}
                    className="font-label text-[10px] sm:text-xs tracking-wider bg-brand-primary border border-brand-primary text-white hover:bg-brand-secondary hover:text-white active:scale-95 px-5 py-3 rounded-full uppercase font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer group shadow hover:shadow-brand-secondary/25"
                  >
                    <span>Book a Session</span>
                    <span className="font-sans text-sm transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↘</span>
                  </button>

                  <button 
                    onClick={() => setSliderActive(false)}
                    className="font-label text-[10px] sm:text-xs tracking-wider bg-brand-primary/5 hover:bg-brand-primary/15 border border-brand-primary/20 hover:border-brand-primary text-brand-primary px-5 py-3 rounded-full uppercase transition-all duration-300 cursor-pointer"
                  >
                    Intro Panel
                  </button>
                </div>

                {/* Dashes slide indicator mimicking reference */}
                <div className="flex items-center gap-1.5 select-none">
                  {SLIDES.map((_, idx) => {
                    const isSelected = idx === currentSlideIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className="py-2.5 px-1 focus:outline-none cursor-pointer group pointer-events-auto"
                        aria-label={`Show slide ${idx + 1}`}
                      >
                        <div 
                          className={`h-[3px] rounded-full transition-all duration-400 ${
                            isSelected 
                              ? 'w-8 sm:w-12 bg-brand-primary' 
                              : 'w-3 bg-brand-primary/25 group-hover:bg-brand-primary/50'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discrete Scroll Invitation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={triggerScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60 cursor-pointer hover:opacity-100 transition-opacity"
      >
        <span className="font-label text-[10px] tracking-widest text-[#715b3e] uppercase">
          Discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[#715b3e]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
