"use client";

import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteContent } from "@/data/site-content";

const SLIDE_INTERVAL = 3000;

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<number | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], reduceMotion ? [0, 0] : [0, 120]);
  const scale = useTransform(scrollY, [0, 900], reduceMotion ? [1, 1] : [1.04, 1]);
  const slides = siteContent.hero.slides;
  const currentSlide = slides[activeSlide];

  const clearSlideTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startSlideTimer = useCallback(() => {
    if (reduceMotion) {
      return;
    }

    clearSlideTimer();
    timerRef.current = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % slides.length);
    }, SLIDE_INTERVAL);
  }, [clearSlideTimer, reduceMotion, slides.length]);

  const goToSlide = useCallback(
    (nextSlide: number) => {
      setActiveSlide((nextSlide + slides.length) % slides.length);
      startSlideTimer();
    },
    [slides.length, startSlideTimer],
  );

  useEffect(() => {
    startSlideTimer();

    return clearSlideTimer;
  }, [clearSlideTimer, startSlideTimer]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden text-[var(--color-ivory)]">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {slides.map((slide, index) => (
          <Image
            key={slide.theme}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,12,0.70),rgba(18,15,12,0.28)_45%,rgba(18,15,12,0.08)),linear-gradient(0deg,rgba(18,15,12,0.62),transparent_42%)]" />
      <button
        type="button"
        aria-label="Previous hero slide"
        onClick={() => goToSlide(activeSlide - 1)}
        className="hero-arrow left-4 sm:left-7"
      >
        &lt;
      </button>
      <button
        type="button"
        aria-label="Next hero slide"
        onClick={() => goToSlide(activeSlide + 1)}
        className="hero-arrow right-4 sm:right-7"
      >
        &gt;
      </button>
      <div className="relative z-10 flex min-h-screen items-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20">
        <div className="hero-copy-container">
          <motion.p
            className="mb-6 text-xs uppercase tracking-[0.34em] text-white/72"
            initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteContent.hero.eyebrow} / {currentSlide.theme}
          </motion.p>
          <div className="relative min-h-[180px] sm:min-h-[210px] lg:min-h-[240px]">
            {slides.map((slide, index) => (
              <motion.h1
                key={slide.headline}
                className={`absolute inset-0 font-serif text-[clamp(2.05rem,4.5vw,5rem)] leading-[0.98] tracking-normal text-balance transition-opacity duration-700 ${
                  activeSlide === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
                animate={
                  activeSlide === index
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: -12, filter: "blur(8px)" }
                }
                transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.headline}
              </motion.h1>
            ))}
          </div>
          <motion.div
            className="mt-8 flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative min-h-[96px] flex-1">
              {slides.map((slide, index) => (
                <motion.p
                  key={slide.subheadline}
                  className={`absolute inset-0 max-w-xl text-base leading-8 text-white/78 sm:text-lg ${
                    activeSlide === index ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  animate={
                    activeSlide === index
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 10, filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {slide.subheadline}
                </motion.p>
              ))}
            </div>
            <a
              href={siteContent.hero.formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="book-session-button inline-flex w-fit items-center gap-3 rounded-full px-6 py-4 text-sm uppercase tracking-[0.2em] text-[var(--color-ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Book a Session
              <ArrowDownRight size={16} />
            </a>
          </motion.div>
          <div className="mt-10 flex gap-3" aria-label="Hero slides">
            {slides.map((slide, index) => (
              <button
                key={slide.theme}
              type="button"
              aria-label={`Show ${slide.theme} slide`}
              aria-pressed={activeSlide === index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeSlide === index ? "w-10 bg-[var(--color-gold)]" : "w-4 bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
