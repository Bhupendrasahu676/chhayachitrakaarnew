/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Landmark, Camera, Video, Sparkles, Inbox } from 'lucide-react';

interface NavbarProps {
  onInquireClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onInquireClick, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setIsOpen(false);
    onNavigate(sectionId);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 flex justify-between items-center px-6 md:px-16 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-brand-primary/10 shadow-sm shadow-brand-secondary/5' 
          : 'bg-white/40 backdrop-blur-xl border-b border-brand-primary/5'
      }`}
    >
      {/* Brand logo */}
      <a 
        onClick={() => handleLinkClick('hero')} 
        className="font-serif text-2xl md:text-3xl tracking-tight text-brand-primary cursor-pointer select-none transition-opacity hover:opacity-80 active:scale-95"
      >
        Chhaayachitrakaar
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        <a 
          onClick={() => handleLinkClick('portfolios')} 
          className="font-label text-sm tracking-widest text-[#4b463a] font-medium hover:text-brand-primary transition-colors duration-350 cursor-pointer"
        >
          Portfolios
        </a>
        <a 
          onClick={() => handleLinkClick('journal')} 
          className="font-label text-sm tracking-widest text-[#4b463a] font-medium hover:text-brand-primary transition-colors duration-350 cursor-pointer"
        >
          The Journal
        </a>
        <a 
          onClick={() => handleLinkClick('cinemas')} 
          className="font-label text-sm tracking-widest text-[#4b463a] font-medium hover:text-brand-primary transition-colors duration-350 cursor-pointer"
        >
          Cinemas
        </a>
        <a 
          onClick={() => handleLinkClick('about')} 
          className="font-label text-sm tracking-widest text-[#4b463a] font-medium hover:text-brand-primary transition-colors duration-350 cursor-pointer"
        >
          About & FAQ
        </a>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <button 
          onClick={onInquireClick}
          className="font-label text-sm tracking-widest bg-brand-primary-container text-[#695926] px-7 py-3 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-brand-primary/10 active:scale-95"
        >
          Inquire
        </button>
      </div>

      {/* Mobile Actions container */}
      <div className="md:hidden flex items-center gap-3">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-brand-primary p-2 transition-transform duration-300 active:scale-90"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-brand-primary/10 flex flex-col p-8 gap-6 shadow-xl animate-fade-in z-50">
          <a 
            onClick={() => handleLinkClick('portfolios')} 
            className="font-label text-base tracking-widest text-[#4b463a] font-medium hover:text-brand-primary py-2 border-b border-brand-primary/5 cursor-pointer"
          >
            Portfolios
          </a>
          <a 
            onClick={() => handleLinkClick('journal')} 
            className="font-label text-base tracking-widest text-[#4b463a] font-medium hover:text-brand-primary py-2 border-b border-brand-primary/5 cursor-pointer"
          >
            The Journal
          </a>
          <a 
            onClick={() => handleLinkClick('cinemas')} 
            className="font-label text-base tracking-widest text-[#4b463a] font-medium hover:text-brand-primary py-2 border-b border-brand-primary/5 cursor-pointer"
          >
            Cinemas
          </a>
          <a 
            onClick={() => handleLinkClick('about')} 
            className="font-label text-base tracking-widest text-[#4b463a] font-medium hover:text-brand-primary py-2 border-b border-brand-primary/5 cursor-pointer"
          >
            About & FAQ
          </a>
          
          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={() => { setIsOpen(false); onInquireClick(); }}
              className="font-label text-sm tracking-widest bg-brand-primary text-white w-full py-4 text-center rounded-full hover:bg-brand-secondary transition-all shadow-md"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
