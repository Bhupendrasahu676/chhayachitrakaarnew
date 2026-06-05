/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Camera } from 'lucide-react';
import { GENERAL_BACKGROUNDS } from '../assets';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onInquireClick?: () => void;
}

export default function Footer({ onNavigate, onInquireClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="relative bg-[#fbfbfa] w-full pt-20 pb-16 border-t border-brand-primary/10 overflow-hidden px-6 md:px-16 select-none">
      
      {/* Exquisite Sample Image Background Layer (Misty Silk & warm refractions) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22] mix-blend-multiply">
        <img 
          src={GENERAL_BACKGROUNDS.footerBackground} 
          alt="Bespoke luxury photographic background draping" 
          className="w-full h-full object-cover transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbfa] via-transparent to-[#fbfbfa]/80" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col gap-12">
        
        {/* Horizontal Line Splitter with Camera Logo instead of Bird */}
        <div className="relative w-full flex items-center justify-center py-6">
          <div className="absolute inset-x-0 h-[1px] bg-[#4b463a]/15" />
          <div className="relative z-10 bg-[#fbfbfa] px-8 py-2 rounded-full border border-solid border-[#4b463a]/5 shadow-sm shadow-[#4b463a]/2 flex items-center justify-center hover:scale-105 transition-transform duration-350 active:scale-95 cursor-pointer">
            <Camera className="w-5 h-5 text-brand-primary stroke-[1.5]" />
          </div>
        </div>

        {/* Responsive Dual Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start pt-4">
          
          {/* Left Column: Explore Navigation */}
          <div className="flex flex-col items-start text-left">
            <h3 className="font-serif italic text-2xl font-light text-brand-primary mb-6 md:mb-8 tracking-wide">
              Explore
            </h3>
            <div className="flex flex-col gap-3 font-label text-xs tracking-[0.25em] text-[#4b463a]/90 font-medium">
              <button 
                onClick={() => onNavigate('hero')} 
                className="hover:text-brand-primary text-left py-1 transition-colors duration-250 cursor-pointer uppercase active:translate-x-0.5 transform inline-block"
              >
                HOME
              </button>
              <button 
                onClick={() => onNavigate('portfolios')} 
                className="hover:text-brand-primary text-left py-1 transition-colors duration-250 cursor-pointer uppercase active:translate-x-0.5 transform inline-block"
              >
                PORTFOLIO
              </button>
              <button 
                onClick={() => onNavigate('about')} 
                className="hover:text-brand-primary text-left py-1 transition-colors duration-250 cursor-pointer uppercase active:translate-x-0.5 transform inline-block"
              >
                INFO
              </button>
              <button 
                onClick={() => onInquireClick?.()} 
                className="hover:text-brand-primary text-left py-1 transition-colors duration-250 cursor-pointer uppercase active:translate-x-0.5 transform inline-block text-brand-secondary font-bold"
              >
                CONTACT
              </button>
            </div>
          </div>

          {/* Right Column: Studio locations & credentials */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <h3 className="font-serif italic text-2xl font-light text-brand-primary mb-6 md:mb-8 tracking-wide">
              Italy and Worldwide
            </h3>
            <div className="flex flex-col gap-3 text-[#4b463a] font-sans text-xs md:text-sm font-light leading-relaxed max-w-sm">
              <p className="tracking-wide">Via Bovio, 16 – 50051 Castelfiorentino (Fi) Italy</p>
              <p>
                <a href="tel:+39057164066" className="hover:text-brand-primary hover:underline transition-colors">+39 0571 64066</a>
                {' – Mobile '}
                <a href="tel:+393356417401" className="hover:text-brand-primary hover:underline transition-colors">+39 335 6417401</a>
              </p>
              <p className="opacity-75 text-[11px] font-mono tracking-wider">PIVA 06338250480</p>
            </div>
          </div>

        </div>

        {/* Vintage Lower Footer copyright with split left-right alignments */}
        <div className="border-t border-[#4b463a]/10 pt-10 mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] md:text-xs tracking-widest text-[#7d7669]/90 font-label font-medium select-text">
          <div className="text-center sm:text-left">
            COPYRIGHT {currentYear}. CHHAAYACHITRAKAAR. SITE POLICIES / SITE CREDIT
          </div>
          <div className="flex items-center gap-4 text-center sm:text-right uppercase">
            <a href="mailto:info@chhaayachitrakaar.com" className="hover:text-brand-primary transition-colors">
              INFO@CHHAAYACHITRAKAAR.COM
            </a>
            <span className="opacity-40">/</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
              INSTAGRAM
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
