/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, PenTool, Hash, Info, Volume2, Sparkles, Sliders } from 'lucide-react';
import { JOURNAL_ENTRIES } from '../data';
import { JournalEntry } from '../types';

interface FullJournalModalProps {
  onClose: () => void;
  onImageClick: (url: string, description: string, meta?: any) => void;
}

export default function FullJournalModal({ onClose, onImageClick }: FullJournalModalProps) {
  const [activeTab, setActiveTab] = useState<string>(JOURNAL_ENTRIES[0]?.id || '');
  const selectedEntry = JOURNAL_ENTRIES.find(entry => entry.id === activeTab) || JOURNAL_ENTRIES[0];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-background flex flex-col min-h-screen text-on-background"
    >
      {/* Top Header */}
      <div className="sticky top-0 z-10 w-full flex justify-between items-center px-6 md:px-16 py-6 border-b border-brand-primary/10 bg-white/80 backdrop-blur-md">
        <div>
          <span className="font-label text-[10px] tracking-widest text-[#715b3e] uppercase font-bold">
            The Intimate Library
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-primary">
            The Daily Journal Archives
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-3 text-brand-primary/70 hover:text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 rounded-full transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-grow w-full max-w-[1200px] mx-auto px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Side: Navigation Tabs List (4 Columns) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="p-1 rounded-xl bg-brand-surface-container flex flex-col gap-2.5">
            {JOURNAL_ENTRIES.map((entry) => {
              const isActive = entry.id === activeTab;
              return (
                <div 
                  key={entry.id}
                  onClick={() => setActiveTab(entry.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-white shadow-sm border-l-2 border-brand-primary' 
                      : 'hover:bg-white/50 opacity-80'
                  }`}
                >
                  <span className="font-label text-[9px] text-[#715b3e] uppercase font-bold block mb-1">
                    {entry.authorRole} • Creative Notebook
                  </span>
                  <h4 className="font-serif text-base text-brand-primary font-medium line-clamp-1">
                    {entry.authorHandle} Notes
                  </h4>
                  <div className="flex items-center gap-2 mt-2 select-none">
                    <Calendar className="w-3.5 h-3.5 text-[#7d7669]" />
                    <span className="font-sans text-[10px] text-[#7d7669]">{entry.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-[#efeeeb]/55 border border-brand-primary/10 flex flex-col gap-4 text-xs text-[#4b463a] leading-relaxed select-none">
            <div className="flex items-center gap-2 text-brand-primary">
              <Info className="w-4 h-4" />
              <span className="font-label uppercase font-bold tracking-wider">Atelier Philosophy</span>
            </div>
            <p>
              Every entry inside Chhaayachitrakaar's notebook is handwritten by the lead photographer or cinematography coordinator on set. We detail physical lens reactions, lighting parameters, and mood outlines.
            </p>
          </div>
        </div>

        {/* Right Side: Full Article Reading Panel (8 Columns) */}
        <div className="md:col-span-8 flex flex-col gap-10">
          
          {/* Main Title & Metadata */}
          <div className="border-b border-brand-primary/10 pb-6">
            <span className="font-label text-xs text-brand-secondary uppercase tracking-[0.2em] block mb-2 font-bold select-none">
              In-Depth Creative Notes
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-brand-primary font-medium">
              {selectedEntry.authorRole} Entry: {selectedEntry.authorHandle}
            </h3>
            <div className="flex items-center gap-6 mt-4 font-sans text-xs text-[#7d7669]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Captured: {selectedEntry.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PenTool className="w-4 h-4" />
                <span>Author: {selectedEntry.author}</span>
              </div>
            </div>
          </div>

          {/* Narrative Paragraph */}
          <div className="prose max-w-none text-[#4b463a] font-serif text-lg leading-relaxed italic border-l-2 border-[#e7d192] pl-6 py-1 bg-[#efeeeb]/20 rounded-r-xl">
            "{selectedEntry.summary}"
          </div>

          {/* Expanded Photographic Records & Story Block */}
          <div className="flex flex-col gap-8">
            <span className="font-label text-xs tracking-widest text-[#715b3e] uppercase font-bold flex items-center gap-2 select-none">
              <Sliders className="w-4 h-4" />
              <span>Series captures & EXIF Metadata</span>
            </span>

            <div className="flex flex-col gap-10">
              {selectedEntry.images.map((img, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl bg-[#efeeeb]/30 border border-brand-primary/5 shadow-sm"
                >
                  {/* Photo Frame (5 Columns) */}
                  <div 
                    onClick={() => onImageClick(img.url, img.description, img.meta)}
                    className="md:col-span-5 aspect-square rounded-xl overflow-hidden cursor-pointer refraction-border bg-[#efeeeb] hover:shadow-md transition-shadow group"
                  >
                    <img 
                      alt={img.description} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" 
                      src={img.url}
                    />
                  </div>

                  {/* Narrative details of the capture (7 Columns) */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <div className="inline-flex items-center gap-1.5 text-brand-primary select-none">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-label text-[10px] uppercase tracking-wider font-bold">Plate {idx + 1} Capture</span>
                    </div>
                    
                    <p className="font-sans text-sm text-[#4b463a] leading-relaxed font-light">
                      {img.description}
                    </p>

                    {/* Exif summary info bar */}
                    {img.meta && (
                      <div className="p-4 rounded-xl bg-white/70 border border-brand-primary/10 flex flex-col gap-1 text-[11px] font-mono text-[#715b3e]">
                        <div className="flex justify-between border-b border-brand-primary/5 pb-1">
                          <span className="font-label text-[9px] uppercase font-semibold text-[#7d7669]">Camera Body</span>
                          <span>{img.meta.camera}</span>
                        </div>
                        <div className="flex justify-between border-b border-brand-primary/5 py-1">
                          <span className="font-label text-[9px] uppercase font-semibold text-[#7d7669]">Optics configuration</span>
                          <span>{img.meta.lens}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="font-label text-[9px] uppercase font-semibold text-[#7d7669]">Technical specs</span>
                          <span>{img.meta.settings}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
