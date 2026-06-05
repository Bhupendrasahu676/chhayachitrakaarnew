/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, Sparkles, Sliders, Play, Plus, ChevronRight, MessageSquare, Info, Star, HelpCircle, X, ExternalLink, Volume2, VolumeX } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveCollage from './components/InteractiveCollage';
import BentoPortfolio from './components/BentoPortfolio';
import DailyJournal from './components/DailyJournal';
import Footer from './components/Footer';

import PortfolioModal from './components/PortfolioModal';
import FullJournalModal from './components/FullJournalModal';
import InquiryModal from './components/InquiryModal';

import { PortfolioCategory, Inquiry } from './types';
import { FAQ_ITEMS } from './data';

// Initialize pristine sample inquiries if empty inside localStorage
const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 'inq_1',
    name: 'Amelia de Luca',
    email: 'amelia.deluca@milano-atelier.it',
    phone: '+39 02 8945 1200',
    serviceType: 'weddings',
    eventDate: '2026-09-12',
    location: 'Villa d’Este, Lake Como',
    aestheticNotes: 'Desiring dawn light refractions bouncing off the water ripples. Delicate focused captures of heirlooms and unhurried editorial walks under morning shades.',
    lightingPreference: 'dawn',
    status: 'pending',
    submittedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq_2',
    name: 'LUMIÈRE Luxury House',
    email: 'production@lumiere-paris.com',
    phone: '',
    serviceType: 'products',
    eventDate: '2026-08-04',
    location: 'Aura Atelier Studio, Mumbai',
    aestheticNotes: 'High refraction shots of our signature crystal perfume bottle and metallic caps. Emphasizing sharp glass cuts, symmetry, and pristine white horizons.',
    lightingPreference: 'liquid_glass',
    status: 'reviewed',
    submittedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq_3',
    name: 'Isabella & Dev',
    email: 'isabella.dev@vowstory.com',
    phone: '+91 98200 45678',
    serviceType: 'weddings',
    eventDate: '2026-11-20',
    location: 'Udaipur Lake Palace, Rajasthan',
    aestheticNotes: 'Tonal golden hour frames capturing the couple reflected over the white marble terraces. Warm bronze shadow levels and unhurried cinematic tracking.',
    lightingPreference: 'golden_hour',
    status: 'pending',
    submittedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  }
];

export default function App() {
  // Navigation states
  const [activeCategoryModal, setActiveCategoryModal] = useState<PortfolioCategory | null>(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedInquiryCategory, setSelectedInquiryCategory] = useState<PortfolioCategory | 'custom'>('custom');

  // Interactive 15-second trailer video state
  const [trailerMuted, setTrailerMuted] = useState(true);
  const [trailerPlaying, setTrailerPlaying] = useState(true);
  const [trailerSeconds, setTrailerSeconds] = useState(0);
  const trailerVideoRef = useRef<HTMLVideoElement>(null);

  // Raw Image Lightbox parameters
  const [lightboxInfo, setLightboxInfo] = useState<{
    url: string;
    description: string;
    meta?: any;
  } | null>(null);

  // Client inquiries persist list
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Smooth custom cursor tracking coordinates
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState(false);
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize data on mount
  useEffect(() => {
    // Check local storage for existing entries
    const saved = localStorage.getItem('chhaaya_inquiries_db');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (err) {
        setInquiries(MOCK_INQUIRIES);
      }
    } else {
      setInquiries(MOCK_INQUIRIES);
      localStorage.setItem('chhaaya_inquiries_db', JSON.stringify(MOCK_INQUIRIES));
    }

    // Lagged mouse follow animation loop for desktop
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      // Linear interpolation to smooth the tracking feel
      currentX += (cursorRef.current.x - currentX) * 0.15;
      currentY += (cursorRef.current.y - currentY) * 0.15;
      setCursorPos({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    // Document mouse listeners to hover buttons and links
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.getAttribute('role') === 'button' ||
        target.tagName === 'IMG' ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorHovering(true);
      } else {
        setCursorHovering(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const saveInquiries = (updatedList: Inquiry[]) => {
    setInquiries(updatedList);
    localStorage.setItem('chhaaya_inquiries_db', JSON.stringify(updatedList));
  };

  // Inquiry actions
  const handleAddInquiry = (newInq: Omit<Inquiry, 'id' | 'status' | 'submittedAt'>) => {
    const fresh: Inquiry = {
      ...newInq,
      id: `inq_${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    const updated = [fresh, ...inquiries];
    saveInquiries(updated);
  };

  const handleUpdateInquiryStatus = (id: string, status: 'pending' | 'reviewed') => {
    const updated = inquiries.map(item => item.id === id ? { ...item, status } : item);
    saveInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(item => item.id !== id);
    saveInquiries(updated);
  };

  const handleResetInquiries = () => {
    if (confirm("Reset internal registry to original luxury demo requests?")) {
      saveInquiries(MOCK_INQUIRIES);
    }
  };

  // Nav scroll layout mapping
  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'about') {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-background text-on-background antialiased min-h-screen flex flex-col overflow-x-hidden custom-cursor-active selection:bg-[#e7d192] selection:text-[#695926]">
      
      {/* Lagged Follow Custom Cursor */}
      <div 
        id="custom-cursor" 
        className={`hidden md:block fixed ${cursorHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
          left: 0,
          top: 0
        }}
      />

      {/* Main Bar Navigation */}
      <Navbar 
        onInquireClick={() => { setSelectedInquiryCategory('custom'); setInquiryOpen(true); }}
        onNavigate={handleNavigation}
      />

      {/* Primary Landing Content */}
      <main className="flex-grow">
        
        {/* Hero Banner Section */}
        <Hero 
          onExploreClick={() => {
            document.getElementById('portfolios')?.scrollIntoView({ behavior: 'smooth' });
          }} 
          onInquireClick={() => { 
            setSelectedInquiryCategory('custom'); 
            setInquiryOpen(true); 
          }}
        />

        {/* Staggered Interactive Collage Presentation Series */}
        <InteractiveCollage 
          onInquireClick={() => {
            setSelectedInquiryCategory('custom');
            setInquiryOpen(true);
          }}
        />

        {/* Bento Grid Portfolio Highlight Section */}
        <BentoPortfolio 
          onSelectCategory={(category) => {
            setActiveCategoryModal(category);
          }} 
        />

        {/* Photography Live Instagram-style feed Journal */}
        <DailyJournal 
          onImageClick={(url, description, meta) => {
            setLightboxInfo({ url, description, meta });
          }}
        />

        {/* Creative Cinematography Live Player Block */}
        <section id="cinemas" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-t border-brand-primary/15 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Play Screen (7 Columns) - Interactive 15s Trailer Video */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <span className="font-label text-[10px] tracking-widest text-[#715b3e] uppercase font-bold flex items-center gap-1.5 select-none">
                <span className="h-2 w-2 rounded-full bg-[#dac587]" style={{ animation: 'pulse 1.5s infinite' }} />
                <span>Featured Motion Picture Trailer</span>
              </span>
              
              <div 
                className="group relative aspect-[16/9] rounded-2xl overflow-hidden refraction-border bg-black shadow-lg shadow-brand-secondary/5"
              >
                {/* HTML5 Video Element */}
                <video
                  ref={trailerVideoRef}
                  src="https://video.wixstatic.com/video/11062b_cb7c8b03043f4a01900a68d06ee29f31/720p/mp4/file.mp4"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  autoPlay={trailerPlaying}
                  loop={false}
                  muted={trailerMuted}
                  playsInline
                  onTimeUpdate={(e) => {
                    const videoObj = e.currentTarget;
                    if (videoObj.currentTime >= 15) {
                      videoObj.currentTime = 0;
                      videoObj.play().catch(() => {});
                    }
                    setTrailerSeconds(videoObj.currentTime);
                  }}
                />

                {/* Overlay layer for custom hover and clicks */}
                <div 
                  className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-colors duration-300 cursor-pointer"
                  onClick={() => setActiveCategoryModal('cinematography')}
                />

                {/* Live 15s Tag */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white font-mono text-[9px] tracking-tighter select-none pointer-events-none">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span>15S TRAILER LOOP PREVIEW</span>
                </div>

                {/* Progress bar line indicators */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 pointer-events-none">
                  <div 
                    className="h-full bg-[#dac587] transition-all duration-100 ease-linear"
                    style={{ width: `${(trailerSeconds / 15) * 100}%` }}
                  />
                </div>

                {/* Play controls and SPEC button triggers */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  {/* Mute speaker button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (trailerVideoRef.current) {
                        const nextMuted = !trailerMuted;
                        trailerVideoRef.current.muted = nextMuted;
                        setTrailerMuted(nextMuted);
                      }
                    }}
                    className="p-2 rounded-full bg-[#faf6ee]/90 hover:bg-[#faf6ee] text-[#4a3a24] shadow-md border border-[#dac587]/30 transition-transform active:scale-90 hover:scale-105 cursor-pointer flex items-center justify-center"
                    title={trailerMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {trailerMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  {/* Play & Spec toggle buttons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (trailerVideoRef.current) {
                        if (trailerPlaying) {
                          trailerVideoRef.current.pause();
                          setTrailerPlaying(false);
                        } else {
                          trailerVideoRef.current.play().catch(() => {});
                          setTrailerPlaying(true);
                        }
                      }
                    }}
                    className="p-2 px-3 rounded-full bg-[#faf6ee]/90 hover:bg-[#faf6ee] text-[#4a3a24] shadow-md border border-[#dac587]/30 transition-transform active:scale-90 hover:scale-105 cursor-pointer font-sans text-[10px] font-bold uppercase tracking-wider flex items-center justify-center"
                    title={trailerPlaying ? "Pause preview" : "Play preview"}
                  >
                    {trailerPlaying ? "Pause" : "Play"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategoryModal('cinematography');
                    }}
                    className="p-2 px-3.5 rounded-full bg-[#dac587] text-brand-primary hover:bg-[#ebd59a] font-bold shadow-md transition-transform active:scale-90 hover:scale-105 cursor-pointer font-sans text-[10px] uppercase tracking-wider flex items-center gap-1.5"
                    title="View Cinema Details & Reels"
                  >
                    <span>Specs & Reels</span>
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Progress counter text */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white font-mono text-[9px] tracking-wider px-2.5 py-1 rounded select-none pointer-events-none">
                  <span>00:{String(Math.floor(trailerSeconds)).padStart(2, '0')}</span>
                  <span className="opacity-60"> / 00:15</span>
                </div>
              </div>
            </div>

            {/* Notes Screen (5 Columns) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div>
                <span className="font-label text-xs text-brand-secondary uppercase tracking-[0.2em] block mb-2 font-bold select-none">
                  Cinema Division
                </span>
                <h3 className="font-serif text-3xl text-brand-primary font-medium leading-tight">
                  Timeless Celluloid & Steady Frames
                </h3>
                <p className="font-sans text-sm md:text-base text-[#4b463a]/90 leading-relaxed mt-4 font-light">
                  Our cinematography doesn't rush to chase momentary digital trends. We compose scenes using legacy 35mm formats, premium anamorphic lenses, and stable panning rigs to deliver cinematic masterpieces.
                </p>
              </div>

              {/* List of features */}
              <div className="flex flex-col gap-3 font-sans text-xs text-[#4b463a]">
                <div className="flex items-start gap-2.5">
                  <span className="h-4 w-4 rounded-full bg-brand-primary-container/30 border border-brand-primary/10 text-brand-primary text-[10px] flex items-center justify-center font-bold font-mono">1</span>
                  <span>Premium ALEXA LF and RED V-Raptor dual-system cameras config.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="h-4 w-4 rounded-full bg-brand-primary-container/30 border border-brand-primary/10 text-brand-primary text-[10px] flex items-center justify-center font-bold font-mono">2</span>
                  <span>Exclusive Cooke anamorphic lens coatings providing natural halos.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="h-4 w-4 rounded-full bg-brand-primary-container/30 border border-brand-primary/10 text-brand-primary text-[10px] flex items-center justify-center font-bold font-mono">3</span>
                  <span>Expert colourists tuning hand-drawn chiaroscuro shadow templates.</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveCategoryModal('cinematography')}
                className="font-label text-xs tracking-wider uppercase font-bold border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white py-3.5 px-6 rounded-full self-start transition-all"
              >
                Explore Reels & Specs
              </button>
            </div>

          </div>
        </section>

        {/* FAQs & About Context Section */}
        <section id="faq" className="py-24 bg-white px-6 md:px-16 border-t border-[#efeeeb] scroll-mt-20">
          <div className="max-w-[800px] mx-auto">
            
            {/* Header */}
            <div className="text-center mb-[50px] select-none">
              <span className="font-label text-xs text-brand-secondary uppercase tracking-[0.2em] block mb-2 font-bold">
                Atelier Notes & Q&A
              </span>
              <h3 className="font-serif text-3xl text-brand-primary">Frequently Explored Questions</h3>
              <p className="font-sans text-sm text-[#7d7669] mt-2">Transparent insights mapping our capture paradigms and client agreements.</p>
            </div>

            {/* Q&A Items */}
            <div className="flex flex-col gap-6 text-[#4b463a]">
              {FAQ_ITEMS.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#faf9f6] border border-brand-primary/5 flex flex-col gap-2 shadow-sm"
                >
                  <h4 className="font-serif text-lg text-brand-primary font-medium flex items-start gap-2">
                    <span className="text-[#dac587] font-semibold text-xl">Q.</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-[#4b463a] leading-relaxed pl-5 font-light">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact Callout */}
            <div className="mt-12 text-center p-8 rounded-2xl bg-[#efeeeb]/30 border border-[#dac587]/20 flex flex-col items-center gap-4">
              <div>
                <h5 className="font-serif text-lg text-brand-primary">Confidential Custom Commissioning</h5>
                <p className="font-sans text-xs text-[#7d7669] mt-1 max-w-md mx-auto leading-relaxed">
                  Have an aesthetic idea outside our curated grid? Tell our director your visual ideas, venue outlines, and targets.
                </p>
              </div>
              <button 
                onClick={() => { setSelectedInquiryCategory('custom'); setInquiryOpen(true); }}
                className="font-label text-xs tracking-wider bg-brand-primary text-white hover:bg-brand-secondary px-8 py-3.5 rounded-full font-bold uppercase transition-all"
              >
                Inquire With Director
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Footer block */}
      <Footer 
        onNavigate={handleNavigation} 
        onInquireClick={() => { setSelectedInquiryCategory('custom'); setInquiryOpen(true); }}
      />

      {/* Dynamic Overlay Panels - Portal Portals */}
      <AnimatePresence>
        
        {/* Core Portfolio Category Detail Modal */}
        {activeCategoryModal && (
          <PortfolioModal 
            category={activeCategoryModal}
            onClose={() => setActiveCategoryModal(null)}
            onInquireCategory={(cat) => {
              setActiveCategoryModal(null);
              setSelectedInquiryCategory(cat);
              setInquiryOpen(true);
            }}
          />
        )}

        {/* Detailed Journal Browse Library */}
        {journalOpen && (
          <FullJournalModal 
            onClose={() => setJournalOpen(false)}
            onImageClick={(url, description, meta) => {
              setLightboxInfo({ url, description, meta });
            }}
          />
        )}

        {/* Custom Slide-over Inquiries Reservation Form */}
        {inquiryOpen && (
          <InquiryModal 
            initialCategory={selectedInquiryCategory}
            onClose={() => setInquiryOpen(false)}
            onSubmitInquiry={handleAddInquiry}
          />
        )}

        {/* Lightbox / Media Viewer Frame */}
        {lightboxInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxInfo(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="absolute top-5 right-5 text-white/75 hover:text-white p-3 cursor-pointer">
              <X className="w-6 h-6" />
            </div>

            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              src={lightboxInfo.url} 
              alt={lightboxInfo.description}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
