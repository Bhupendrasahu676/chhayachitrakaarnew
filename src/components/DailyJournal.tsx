/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Component as ImageAutoSlider } from './ui/image-auto-slider';

interface DailyJournalProps {
  onImageClick: (url: string, description: string, meta?: any) => void;
}

export default function DailyJournal({ onImageClick }: DailyJournalProps) {
  return (
    <section id="journal" className="py-24 bg-[#f4f3f1] px-6 md:px-16 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[50px]">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl text-brand-primary mb-4"
            >
              The Daily Journal
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-sm md:text-base text-[#4b463a]/90 leading-relaxed"
            >
              Glimpses into our current projects, inspirations, and the quiet moments behind the lens.
            </motion.p>
          </div>
        </div>

        {/* Dynamic Infinite Scroll Slider replacement of the grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full mt-4"
        >
          <ImageAutoSlider onImageClick={onImageClick} />
        </motion.div>

      </div>
    </section>
  );
}

