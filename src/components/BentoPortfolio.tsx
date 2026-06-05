/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Sliders, Calendar, Play, Move, Eye } from 'lucide-react';
import { PortfolioCategory } from '../types';

// MediaItemType defines the structure of a media item
interface MediaItemType {
  id: number;
  type: 'image' | 'video';
  category: PortfolioCategory;
  title: string;
  desc: string;
  url: string;
  span: string;
}

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ 
  item, 
  className, 
  onClick 
}: { 
  item: MediaItemType; 
  className?: string; 
  onClick?: () => void; 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
  const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
  const [isBuffering, setIsBuffering] = useState(true); // To track if video is buffering

  // Intersection Observer to detect if video is in view and play/pause accordingly
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current); // Start observing the video element
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current); // Clean up observer when component unmounts
      }
    };
  }, []);

  // Handle video play/pause based on whether the video is in view or not
  useEffect(() => {
    let mounted = true;

    const handleVideoPlay = async () => {
      if (!videoRef.current || !isInView || !mounted) return;

      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.oncanplay = resolve;
            }
          });
          if (mounted) {
            setIsBuffering(false);
            await videoRef.current.play();
          }
        }
      } catch (error) {
        console.warn("Video playback failed:", error);
      }
    };

    if (isInView) {
      handleVideoPlay();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }

    return () => {
      mounted = false;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [isInView]);

  if (item.type === 'video') {
    return (
      <div className={`${className} relative overflow-hidden bg-brand-surface-container select-none`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.75 : 0.95,
            transition: 'opacity 0.3s',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        
        {/* Continuous looping watermark indicator */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-[#dac587] border border-[#dac587]/20 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
          <span>CINEMATIC</span>
        </div>

        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-5 h-5 border-2 border-[#dac587]/30 border-t-[#dac587] rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className} object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-700 select-none`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
};

// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType | null) => void;
  mediaItems: MediaItemType[];
  onCommission: (cat: PortfolioCategory) => void;
}

const GalleryModal = ({ 
  selectedItem, 
  isOpen, 
  onClose, 
  setSelectedItem, 
  mediaItems,
  onCommission
}: GalleryModalProps) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-brand-background/95 backdrop-blur-lg z-50 flex items-center justify-center transition-all p-4 md:p-8"
      >
        {/* Main Modal Card container */}
        <motion.div
          initial={{ scale: 0.96, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 15, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-4xl h-auto aspect-[16/10] max-h-[82vh] rounded-2xl overflow-hidden shadow-2xl border border-brand-primary/10 bg-[#faf9f6] flex flex-col p-1"
        >
          {/* Main Media Player block */}
          <div className="relative flex-1 w-full h-full bg-[#efeeeb] rounded-xl overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="w-full h-full"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
              >
                <MediaItem 
                  item={selectedItem} 
                  className="w-full h-full object-cover bg-brand-surface-container" 
                  onClick={onClose} 
                />
              </motion.div>
            </AnimatePresence>

            {/* Title description bar on bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-left pointer-events-none text-white select-none">
              <span className="font-label text-[10px] text-[#dac587] uppercase tracking-[0.25em] font-bold block mb-1">
                {selectedItem.category} • Series Frame
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-light text-white tracking-wide">
                {selectedItem.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-white/80 max-w-xl font-light mt-1 md:mt-2 leading-relaxed">
                {selectedItem.desc}
              </p>
            </div>
            
            {/* Top Close button inside player */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#faf9f6]/95 hover:bg-brand-primary text-brand-primary hover:text-white border border-brand-primary/10 transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer active:scale-95 z-50 pointer-events-auto"
              aria-label="Close modal view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Inline Action Inquire trigger on top of modal */}
          <div className="absolute top-4 left-4 bg-brand-background/90 text-brand-primary border border-brand-primary/15 rounded-full px-4 py-2 flex items-center gap-2 shadow-md hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300 cursor-pointer pointer-events-auto active:scale-95"
               onClick={() => onCommission(selectedItem.category)}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-label text-[9px] font-bold uppercase tracking-widest">Commission Series</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Draggable Dock on bottom */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition(prev => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y
          }));
        }}
        className="fixed z-50 left-1/2 bottom-5 -translate-x-1/2 touch-none select-none"
      >
        <motion.div
          className="relative rounded-2xl bg-[#faf9f6]/95 backdrop-blur-xl border border-brand-primary/15 p-2 px-3 shadow-2xl shadow-[#715b3e]/20 cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.02 }}
        >
          {/* Subtle drag indicator handle */}
          <div className="w-8 h-1 bg-brand-primary/15 rounded-full mx-auto mb-1.5" />
          
          <div className="flex items-center -space-x-1 px-1">
            {mediaItems.map((item, index) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  style={{
                    zIndex: isSelected ? 30 : mediaItems.length - index,
                  }}
                  className={`relative group w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer hover:z-20 transition-all ${
                    isSelected
                      ? 'ring-2 ring-brand-primary shadow-lg border border-[#dac587]'
                      : 'hover:ring-2 hover:ring-brand-primary/45'
                  }`}
                  initial={{ rotate: index % 2 === 0 ? -12 : 12 }}
                  animate={{
                    scale: isSelected ? 1.25 : 1,
                    rotate: isSelected ? 0 : index % 2 === 0 ? -10 : 10,
                    y: isSelected ? -10 : 0,
                  }}
                  whileHover={{
                    scale: 1.35,
                    rotate: 0,
                    y: -12,
                    transition: { type: "spring", stiffness: 450, damping: 20 }
                  }}
                >
                  <MediaItem item={item} className="w-full h-full object-cover" onClick={() => setSelectedItem(item)} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#faf9f6]/5 to-[#faf9f6]/20" />
                  
                  {isSelected && (
                    <motion.div
                      layoutId="activeDockGlow"
                      className="absolute -inset-2 bg-brand-primary-container/20 blur-md pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Main Bento Grid Gallery component
interface BentoPortfolioProps {
  onSelectCategory: (category: PortfolioCategory) => void;
}

import { PORTFOLIO_BENTO_ITEMS as MEDIA_ITEMS_SEED } from '../assets';

export default function BentoPortfolio({ onSelectCategory }: BentoPortfolioProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items, setItems] = useState<MediaItemType[]>(MEDIA_ITEMS_SEED);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section 
      id="portfolios" 
      className="relative w-full bg-brand-background border-t border-brand-primary/10 py-24 md:py-32 px-6 md:px-16 scroll-mt-20 overflow-hidden"
    >
      {/* Delicate Champagne Paper Backdrop pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#6d5d2a_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        
        {/* Aesthetic Title Header Section */}
        <div className="text-center mb-16 select-none">
          <span className="font-label text-[10px] tracking-[0.25em] text-[#715b3e] uppercase font-bold flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
            <span>INTERACTIVE COLLECTION EXPOSURE</span>
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-brand-primary font-light">
            Curated Portfolios
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-secondary/80 font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Drag to rearrange frames, tap to discover high-fidelity motion reels, and click the calendar details to acquire a specific series book.
          </p>
          <div className="h-[1px] w-24 bg-brand-primary/20 mx-auto mt-6" />
        </div>

        {/* Dynamic Bento & Portal Block */}
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <GalleryModal
              selectedItem={selectedItem}
              isOpen={true}
              onClose={() => setSelectedItem(null)}
              setSelectedItem={setSelectedItem}
              mediaItems={items}
              onCommission={(cat) => {
                setSelectedItem(null);
                onSelectCategory(cat);
              }}
            />
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 grid-flow-row-dense gap-4 auto-rows-[140px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`media-${item.id}`}
                  className={`group relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing border border-brand-primary/10 hover:border-brand-primary/40 bg-brand-surface-container select-none shadow hover:shadow-lg hover:shadow-[#715b3e]/5 transition-colors duration-300 ${item.span}`}
                  onClick={() => !isDragging && onSelectCategory(item.category)}
                  variants={{
                    hidden: { y: 35, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }
                    }
                  }}
                  whileHover={{ scale: 1.015 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.06}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, info) => {
                    setIsDragging(false);
                    const moveDistance = info.offset.x + info.offset.y;
                    if (Math.abs(moveDistance) > 60) {
                      const newItems = [...items];
                      const draggedItem = newItems[index];
                      const targetIndex = moveDistance > 0 ?
                        Math.min(index + 1, items.length - 1) :
                        Math.max(index - 1, 0);
                      newItems.splice(index, 1);
                      newItems.splice(targetIndex, 0, draggedItem);
                      setItems(newItems);
                    }
                  }}
                >
                  {/* Media item image or video controller */}
                  <MediaItem
                    item={item}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  />
                  
                  {/* Dark elegant gold gradient hover frame overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400 pointer-events-none" />

                  {/* Move/arrange helper handle overlay shown briefly on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#dac587]/90 pointer-events-none">
                    <Move className="w-3 h-3" />
                  </div>

                  {/* Bottom Text Meta details */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 select-none pointer-events-none">
                    <span className="font-label text-[8px] sm:text-[9px] text-[#dac587] tracking-[0.2em] uppercase font-bold block mb-1">
                      {item.category} • Portfolio
                    </span>
                    <h3 className="font-serif text-sm sm:text-base md:text-lg text-white font-medium tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[10px] sm:text-[11px] text-white/70 font-light mt-0.5 line-clamp-2 md:line-clamp-1 leading-normal max-w-sm">
                      {item.desc}
                    </p>
                    
                    {/* View overlay CTA line */}
                    <div className="flex items-center gap-1 mt-2 text-[#dac587] text-[9px] font-label font-bold tracking-widest uppercase transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
                      <span>Explore Series</span>
                      <Eye className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
