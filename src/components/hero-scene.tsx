"use client";

import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { siteContent } from "@/data/site-content";

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], reduceMotion ? [0, 0] : [0, 120]);
  const scale = useTransform(scrollY, [0, 900], reduceMotion ? [1, 1] : [1.04, 1]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden text-[var(--color-ivory)]">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={siteContent.hero.image}
          alt={siteContent.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,12,0.70),rgba(18,15,12,0.28)_45%,rgba(18,15,12,0.08)),linear-gradient(0deg,rgba(18,15,12,0.62),transparent_42%)]" />
      <div className="relative z-10 flex min-h-screen items-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20">
        <div className="max-w-[900px]">
          <motion.p
            className="mb-6 text-xs uppercase tracking-[0.34em] text-white/72"
            initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteContent.hero.eyebrow}
          </motion.p>
          <motion.h1
            className="font-serif text-[clamp(3.1rem,8vw,8.6rem)] leading-[0.9] tracking-normal text-balance"
            initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteContent.hero.title}
          </motion.h1>
          <motion.div
            className="mt-8 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-xl text-base leading-8 text-white/78 sm:text-lg">
              {siteContent.hero.subtitle}
            </p>
            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-ivory)] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[var(--color-charcoal)] shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {siteContent.hero.cta}
              <ArrowDownRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
