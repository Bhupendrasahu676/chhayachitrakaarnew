import React from 'react';
import { JOURNAL_ENTRIES } from '../../data';
import { SLIDER_FALLBACK_IMAGES as defaultImages } from '../../assets';

interface ImageAutoSliderProps {
  onImageClick?: (url: string, description: string, meta?: any) => void;
}

export const Component = ({ onImageClick }: ImageAutoSliderProps) => {
  // Extract all the beautiful curated images from our journal entries to display in the slider
  // If there are none, we fallback to high-quality Unsplash photography provided in the template

  // Try to use our actual journal items list to create an authentic interactive showcase, falling back to defaults
  const sliderItems = JOURNAL_ENTRIES && JOURNAL_ENTRIES.length > 0
    ? JOURNAL_ENTRIES.flatMap(feed => feed.images.map(img => ({
        url: img.url,
        description: img.description,
        meta: img.meta
      })))
    : defaultImages.map((url, i) => ({
        url,
        description: `Curated Fine Art capture ${i + 1}`,
        meta: null
      }));

  // Duplicate items to ensure seamless, infinite horizontal scrolling loop
  const duplicatedItems = [...sliderItems, ...sliderItems];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 32s linear infinite;
        }

        /* Support pausing slide on hover to let users appreciate individual shots closely */
        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .image-item:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
          z-index: 10;
        }
        
        .image-item:active {
          transform: scale(0.98);
        }
      `}} />
      
      <div className="w-full relative overflow-hidden flex flex-col items-center justify-center bg-transparent mt-1 ml-0.5">
        
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-4">
          <div className="scroll-container w-full max-w-full">
            <div className="infinite-scroll flex gap-5 w-max">
              {duplicatedItems.map((item, index) => (
                <div
                  key={`${item.url}-${index}`}
                  onClick={() => onImageClick?.(item.url, item.description, item.meta)}
                  className="image-item flex-shrink-0 w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-md shadow-[#715b3e]/5 cursor-pointer relative"
                  id={`slider-item-${index}`}
                >
                  <img
                    src={item.url}
                    alt={item.description}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                  {/* Subtle info pill on hover */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] font-sans text-white/95 truncate w-full">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Component;
