/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, MapPin, Eye, Sparkles, Sliders, ArrowUpRight } from 'lucide-react';
import { PortfolioCategory, PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data';
import { ImageGallery } from './ui/carousel-circular-image-gallery';

interface PortfolioModalProps {
  category: PortfolioCategory;
  onClose: () => void;
  onInquireCategory: (cat: PortfolioCategory) => void;
}

// Add a few more thematic items to enrich the portfolio so it looks extremely rich
const CATEGORY_DETAILS: Record<PortfolioCategory, {
  subtitle: string;
  narrative: string;
  items: PortfolioItem[];
}> = {
  wedding: {
    subtitle: 'Quiet luxury & Editorial Intimacy',
    narrative: 'Our wedding photography approaches celebrations as immersive, unhurried narratives. We bypass staged structures to document rare emotional depth, warm champagne textures, and grand atmospheric scales.',
    items: [
      {
        id: 'w1_b',
        title: 'The Golden Pavilion',
        category: 'wedding',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
        description: 'An ethereal, high-fashion wedding composition capturing the elegant drapery of a custom silk gown beneath hand-sculpted temple arches.',
        camera: 'Hasselblad H6D-100c',
        lens: 'HCD 24mm f/4.8',
        settings: { shutter: '1/160s', aperture: 'f/4.5', iso: '100' },
        location: 'Rajasthan Sanctuary Palace'
      },
      {
        id: 'w2_b',
        title: 'Heirloom Chantilly Details',
        category: 'wedding',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLEb7BM0Qk-2ezLWbkfKO7NnVgEiuFKhe3IhqJKbFTSwpETTBwacPvVom_jYhVG9K7fe3mc7NxR1fKFPmhUGDoGqFBIrlcl4-45zyRA4_VU7nQtBA21VdidbYMCzp1fHv6sj84RwLHEn3I5-DFi07awN-SZsChcAqzKWUXcP_jvOpsUMOmdQpI7sD1cssKFhzIX0v2Qf7wmtQ0f60pxI11pkbFQXUl_hz0Mg_yI4Xmrvf6PmsaVBCRObdJw0VA2Z0AgWlW4_5jCY3d',
        description: 'Detail of heirloom French Chantilly lace reflecting low-angle morning sun, capturing the intricate weave and warmth.',
        camera: 'Sony A1',
        lens: 'FE 90mm f/2.8 Macro G OSS',
        settings: { shutter: '1/200s', aperture: 'f/2.8', iso: '100' },
        location: 'Villa d’Este, Lake Como'
      }
    ]
  },
  weddings: {
    subtitle: 'Quiet luxury & Editorial Intimacy',
    narrative: 'Our wedding photography approaches celebrations as immersive, unhurried narratives. We bypass staged structures to document rare emotional depth, warm champagne textures, and grand atmospheric scales.',
    items: [
      {
        id: 'w1',
        title: 'The Golden Pavilion',
        category: 'weddings',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk-YUTXUUkp-Zam4wG-nOEr96k6WW7N9BRyIVwfaZugXRngfkUCmjdT8oUPXDJzPEBxwNJAg5AFzBx5UJupJWzvA0Xyehzuuw6YLxofnFSvIEWrZwQMQDbP716FE0-J8ktXLM8VhFM3gl3OqPLUq0KTZ_LaokZgS7RinDrsTUUZ33-DAjGsBTat8Y_z7niC66XjFBDxHSA8RGoVIJmdtTz1LnoPM2ErBcP_A1LeBZ_amSHVx3kKZub0_9ndx9aU9WuOQmUw-MvZOi6',
        description: 'An ethereal, high-fashion wedding composition capturing the elegant drapery of a custom silk gown beneath hand-sculpted temple arches. Bathed in champagne light.',
        camera: 'Hasselblad H6D-100c',
        lens: 'HCD 24mm f/4.8',
        settings: { shutter: '1/160s', aperture: 'f/4.5', iso: '100' },
        location: 'Rajasthan Sanctuary Palace'
      },
      {
        id: 'w2',
        title: 'Heirloom Chantilly Details',
        category: 'weddings',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLEb7BM0Qk-2ezLWbkfKO7NnVgEiuFKhe3IhqJKbFTSwpETTBwacPvVom_jYhVG9K7fe3mc7NxR1fKFPmhUGDoGqFBIrlcl4-45zyRA4_VU7nQtBA21VdidbYMCzp1fHv6sj84RwLHEn3I5-DFi07awN-SZsChcAqzKWUXcP_jvOpsUMOmdQpI7sD1cssKFhzIX0v2Qf7wmtQ0f60pxI11pkbFQXUl_hz0Mg_yI4Xmrvf6PmsaVBCRObdJw0VA2Z0AgWlW4_5jCY3d',
        description: 'Detail of heirloom French Chantilly lace reflecting low-angle morning sun, capturing the intricate weave and warmth.',
        camera: 'Sony A1',
        lens: 'FE 90mm f/2.8 Macro G OSS',
        settings: { shutter: '1/200s', aperture: 'f/2.8', iso: '100' },
        location: 'Villa d’Este, Lake Como'
      }
    ]
  },
  party: {
    subtitle: 'Vibrant Light & Unhurried Candids',
    narrative: 'We capture the high-spirited elegance of exclusive parties and soirees under custom lighting, preserving real celebration dynamics, glowing glass contours, and genuine laughter as raw luxury.',
    items: [
      {
        id: 'pt1',
        title: 'The Skyline Champagne Toast',
        category: 'party',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200',
        description: 'Champagne crystal glasses raised against dynamic city lights, featuring beautiful light leaks and warm color textures.',
        camera: 'Sony A1',
        lens: 'FE 50mm f/1.2 GM',
        settings: { shutter: '1/160s', aperture: 'f/1.8', iso: '400' },
        location: 'Starlight Lounge'
      },
      {
        id: 'pt2',
        title: 'Warm Candle Embers',
        category: 'party',
        imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200',
        description: 'Guests sharing interactive conversations beneath glowing ceiling fixtures and floating warm candle flames.',
        camera: 'Hasselblad X2D 100C',
        lens: 'XCD 55mm f/2.5 VO',
        settings: { shutter: '1/125s', aperture: 'f/2.8', iso: '800' },
        location: 'Milano Atelier Hall'
      }
    ]
  },
  'pre-wedding': {
    subtitle: 'Romantic Anticipation & Ancient Terraces',
    narrative: 'Honoring natural landscapes and classical architectural lines, we document intimate pre-wedding journeys. These sessions highlight the peaceful suspense and elegant proximity before core vows.',
    items: [
      {
        id: 'pw1',
        title: 'Echoes on Lake Como',
        category: 'pre-wedding',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200',
        description: 'An elegant couple walking along sun-drenched marble corridors next to glowing, liquid ripples.',
        camera: 'Sony A1',
        lens: 'FE 85mm f/1.4 GM Duo',
        settings: { shutter: '1/200s', aperture: 'f/1.4', iso: '100' },
        location: 'Villa Balbiano Residence'
      },
      {
        id: 'pw2',
        title: 'Terrazzo Handholds',
        category: 'pre-wedding',
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200',
        description: 'Close-up of interlocked hands framed by ancient stone carvings and elegant drapery shadows.',
        camera: 'Leica SL3',
        lens: 'Summilux-M 50mm f/1.4 ASPH',
        settings: { shutter: '1/180s', aperture: 'f/2.0', iso: '160' },
        location: 'Amalfi Sanctuary Terrace'
      }
    ]
  },
  editorial: {
    subtitle: 'Chiaroscuro & Couture Sculptures',
    narrative: 'High-fashion editorial captures that isolate shape, drape, and texture. Our studio relies heavily on single light origins to shape pristine silhouettes and bold fabric structures.',
    items: [
      {
        id: 'ed1',
        title: 'The Linen Veil',
        category: 'editorial',
        imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
        description: 'Soft linen structures gracefully floating in a high-contrast shadow studio, emphasizing rich textures and movement.',
        camera: 'Phase One XF 150MP',
        lens: 'Schneider 120mm Macro f/4.0',
        settings: { shutter: '1/250s', aperture: 'f/8.0', iso: '50' },
        location: 'Aura Atelier Studio, Mumbai'
      },
      {
        id: 'ed2',
        title: 'Geometries of Silk',
        category: 'editorial',
        imageUrl: 'https://images.unsplash.com/photo-1534790510191-25b2a949b307?q=80&w=1200',
        description: 'A striking monochrome silhouette of layered couture framing deep bronze shadow lines.',
        camera: 'Hasselblad H6D-100c',
        lens: 'HCD 80mm f/2.8',
        settings: { shutter: '1/160s', aperture: 'f/4.0', iso: '100' },
        location: 'Chamber Studio One'
      }
    ]
  },
  products: {
    subtitle: 'Prismatic Refractions & Object Character',
    narrative: 'We photograph luxury goods through high-definition glass refraction setups. Our products layouts isolate light trails inside liquid contents, revealing precision typography, metallic outlines, and extreme geometric symmetry.',
    items: [
      {
        id: 'p1',
        title: 'L’eau de Verre Crystal' ,
        category: 'products',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcv53vZbzBnpQGKHifKxAhOlZ50rzQfLD8srZs-3mZ-8mX_a7e_qZ3GUxno2L7N9gT8ytzPJoPhPuIH07jsjm_BWmvV1qiYDty6xjPMNcVJlrrqTCSJLlPuxolrGJwY-OYue5ZFq8YOj-nVFniL5oJst7hKkIW-hhNiygZNyZB9BjJYR7Cq35PErFo2k_gIGFTOKm3B5SplwMy_E-XqpaKohFzJAa2q-ES6oWGIXfwnIHXSuxbuBvcs9LMnmVgK3vuTFZF35p4Gq91',
        description: 'A sophisticated macro shot of a luxury perfume bottle resting on a reflective, liquid-glass surface. The scene is illuminated by warm, champagne-toned studio lighting.',
        camera: 'Phase One XF IQ4 150MP',
        lens: 'Schneider 120mm LS Macro f/4.0',
        settings: { shutter: '1/250s', aperture: 'f/11', iso: '50' },
        location: 'Aura Atelier Studio, Mumbai'
      }
    ]
  },
  travel: {
    subtitle: 'Historical Shorelines & Sunlit Memories',
    narrative: 'Preserving the nostalgic aura of majestic landscapes and global design sanctuaries. Using natural sun halos and organic grains to record timeless, unhurried narratives.',
    items: [
      {
        id: 'tr1',
        title: 'Emerald Cliffs',
        category: 'travel',
        imageUrl: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200',
        description: 'A morning perspective of historical villas overlooking pristine, shimmering coastlines.',
        camera: 'Leica M11',
        lens: 'Summilux-M 35mm f/1.4 ASPH',
        settings: { shutter: '1/500s', aperture: 'f/5.6', iso: '64' },
        location: 'Amalfi coastline, Italy'
      },
      {
        id: 'tr2',
        title: 'The Lake Como Villa',
        category: 'travel',
        imageUrl: 'https://images.unsplash.com/photo-1507504038482-76210f6ec33c?q=80&w=1200',
        description: 'Sun-drenched marble columns frame clear blue waters and distant mountain horizons.',
        camera: 'Hasselblad X2D 100C',
        lens: 'XCD 38mm f/2.5 V',
        settings: { shutter: '1/250s', aperture: 'f/4.0', iso: '100' },
        location: 'Villa d’Este Gardens'
      }
    ]
  },
  drones: {
    subtitle: 'Aerial Symmetries & Wide Topography',
    narrative: 'Taking camera systems high above to explore structural symmetries, shoreline patterns, and the majestic contours of the earth in high stability.',
    items: [
      {
        id: 'dr1',
        title: 'Serpentine Coastal Paths',
        category: 'drones',
        imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200',
        description: 'Symmetrical shoreline patterns framing blue oceanic depths and sandy high-contrast edges.',
        camera: 'DJI Inspire 3 Cinema',
        lens: 'DL 24mm F2.8 LS ASPH',
        settings: { shutter: '1/320s', aperture: 'f/4.0', iso: '100' },
        location: 'Farallon Coastline'
      }
    ]
  },
  cinematography: {
    subtitle: 'Timeless Celluloid & Anamorphic Halos',
    narrative: 'Our motion-picture division captures unhurried scenes reminiscent of legacy cinema. Bathed in dynamic ranges and deep shadow fields, we prioritize visual weight, camera tracking, and natural lens flare gradients.',
    items: [
      {
        id: 'c1',
        title: 'Chronicles of Nostalgia',
        category: 'cinematography',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxi_UuMlpH3DL4XTzxicu4wE6_GAHNXp9n3BU8rLODuw3BuXSBT04v3CBUyX4uygLSTd1cVoe3gsUCwrSd6KK5iAx2dUJ4h2nlSfk3pycZWi0sVvf2enoOkDTFWb2V5nEtaiYV0FrmoVPCC8p1dBuux6bO4fWEmzjTq3bH1DABIakOieLSDio2qS1TteyMhM85Pbu2jbg-mh0du1mR9cx-c1vxUV0PnH6bv4qGGINRz2YLHJyH_kAKj8a0pk7M4cEbeTsiEcpApZmB',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-young-couple-walking-at-sunset-41753-large.mp4',
        description: 'A cinematic golden hour romance, captured with legacy dual-system 35mm film lenses. Moving panoramas and slow pacing convey unhurried observational beauty.',
        camera: 'ARRI ALEXA 35',
        lens: 'Cooke S8/i Full Frame Prime 50mm T1.4',
        settings: { shutter: '1/48s (180°)', aperture: 'T2.0', iso: '800' },
        location: 'Sovereign Library Corridor'
      },
      {
        id: 'c2',
        title: 'The Great Ballroom Suite',
        category: 'cinematography',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdNmWJTn0abPqghPx3YAHjRlANW6oPGmXErOc0c569oGrOtsFNV5atnUkS2TmuITaZZqZTakc2_iD7Dc5PcdyNmewJ5Abwsr9suxqgrtKJEswecZPejAzSS_KrEiH9lwZaDm_QeYLURsDO_ZncFVyiS2azAZp1wh5IORaZn4LYuRoxHjH4QOBbkm1hf9HRGPU7y5yTTymw1h3YNu5wFYJa2mIVAmsgVmd6eWaRajEd3hqHivR0r70G-Sql06QqljSyiLN6QlroPC17',
        videoUrl: 'https://video.wixstatic.com/video/c82321_1af0bbf356ee43cca4c47bdf2f913e8e/1080p/mp4/file.mp4',
        description: 'A wide, steady cinematic panning of an empty, elegant ballroom prior to an upscale event, with warm chandeliers reflecting off hand-polished floorboards.',
        camera: 'RED V-Raptor XL 8K',
        lens: 'Zeiss Supreme Prime Radiance 35mm',
        settings: { shutter: '1/48s', aperture: 'T1.8', iso: '800' },
        location: 'Heritage Palace Sanctuary'
      },
      {
        id: 'c3',
        title: 'Cinematographer in Reflection',
        category: 'cinematography',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5NlzSBHRAiIfN28TR0x80d2KfOsemSpm5bEFxayOm4gQF0jtIepB3YwXp9Uc5WmGiVemlMglerU9h9OJYaE2sJhHoN0xZ5MAYRuryk3WRyjQXpxV2q0ZhnuDwhKKorkiOOZ--UW8S4nTOBpQYv21qR6RqE4wTUP8aJG-t67lE7MW6QkPFl_MjpftZ--3UoYU2Iwgxqb2i5tFuCGmv8HtBQiw0-13-MtzSQOLnafhu8yezRzF6MNEfI0PWZtv0KQgCR6YVbITORf5_',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-cinematographer-adjusting-a-camera-42289-large.mp4',
        description: 'A close behind-the-scenes study showing a director adjusting a precision anamorphic setup on a shoot bathed in soft, golden hour back-lighting.',
        camera: 'ARRI ALEXA Mini LF',
        lens: 'Angénieux Optimo Ultra Compact 37-102mm Gold',
        settings: { shutter: '1/48s', aperture: 'T3.0', iso: '800' },
        location: 'Aura Atelier Cinema Set'
      },
      {
        id: 'c4',
        title: 'Verdant Lakeside Vows',
        category: 'cinematography',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-sitting-on-a-dock-by-the-lake-34351-large.mp4',
        description: 'A slow-motion tracking shot of a romantic couple sitting peacefully on a wooden deck next to calm, turquoise waters.',
        camera: 'Sony VENICE 2',
        lens: 'Panavision Primo Anamorphic 40mm T2.0',
        settings: { shutter: '1/48s', aperture: 'T2.8', iso: '640' },
        location: 'Lake Como Villa Docks'
      },
      {
        id: 'c5',
        title: 'Ascending Coastal Ridges',
        category: 'cinematography',
        imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800',
        videoUrl: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27c2cd9ad98cf1725b844bf6aa4e3ff3791a212&profile_id=165&oauth2_token_id=57447761',
        description: 'A spectacular steady aerial pan capturing ancient cliffs meeting emerald oceanic depths in sweeping vertical symmetry.',
        camera: 'DJI Inspire 3 Cinema',
        lens: 'DL 24mm F2.8 LS ASPH',
        settings: { shutter: '1/120s', aperture: 'F4.0', iso: '200' },
        location: 'Amalfi Maritime Ridges'
      },
      {
        id: 'c6',
        title: 'Whispering Silk & Sunbeams',
        category: 'cinematography',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-walking-41712-large.mp4',
        description: 'Intimate soft focus footage of a bride walking through glowing floral paths while sunset sunbeams play over flowing veil detailing.',
        camera: 'ARRI ALEXA 35',
        lens: 'Cooke S8/i Prime 75mm',
        settings: { shutter: '1/48s', aperture: 'T1.6', iso: '400' },
        location: 'Walled Rose Garden Residence'
      }
    ]
  }
};

export default function PortfolioModal({ category, onClose, onInquireCategory }: PortfolioModalProps) {
  const details = CATEGORY_DETAILS[category];
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(details.items[0] || null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#faf6ee] flex flex-col min-h-screen text-[#4a3a24] select-none"
    >
      {/* Header Bar */}
      <div className="sticky top-0 z-10 w-full flex justify-between items-center px-6 md:px-16 py-6 border-b border-[#4a3a24]/10 bg-[#faf6ee]/95 backdrop-blur-md">
        <div>
          <span className="font-label text-[10px] tracking-widest text-[#8c7144] uppercase font-bold">
            Curated Portfolio Archives
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#4a3a24] capitalize">
            {category}
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-3 text-[#4a3a24]/70 hover:text-[#4a3a24] bg-[#4a3a24]/5 hover:bg-[#4a3a24]/10 rounded-full transition-colors active:scale-90 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-grow w-full max-w-[1240px] mx-auto px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Side: Highlighted Main Image (7 Columns) */}
        {activeItem && (
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="relative w-full flex items-center justify-center">
              {activeItem.videoUrl ? (
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-black border border-[#dac587]/30 relative group">
                  <video 
                    key={activeItem.videoUrl}
                    src={activeItem.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-[#dac587] font-mono text-[9px] tracking-widest uppercase pointer-events-none select-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>Cinematic Premiere Reel</span>
                  </div>
                </div>
              ) : (
                <ImageGallery 
                  items={details.items.map(item => ({
                    title: item.title,
                    url: item.imageUrl
                  }))}
                  currentIndex={details.items.findIndex(item => item.id === activeItem.id)}
                  onChangeIndex={(idx) => {
                    if (details.items[idx]) {
                      setActiveItem(details.items[idx]);
                    }
                  }}
                  embedMode={true}
                />
              )}
            </div>

            {/* EXIF metadata and story block */}
            <div className="p-6 rounded-2xl bg-[#f4ebd9] border border-[#dac587]/30 flex flex-col gap-5 text-[#4a3a24]">
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-[#5c4a30] mb-2">{activeItem.title}</h3>
                <p className="font-sans text-xs md:text-sm text-[#5c4d37] leading-relaxed italic">
                  "{activeItem.description}"
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-3 gap-4 border-t border-[#4a3a24]/10 pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-label text-[9px] text-[#8c7144] uppercase font-bold">Atelier Camera</span>
                  <span className="font-sans text-[11px] font-medium leading-tight truncate text-[#4a3a24]" title={activeItem.camera}>
                    {activeItem.camera}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-label text-[9px] text-[#8c7144] uppercase font-bold">Lens configuration</span>
                  <span className="font-sans text-[11px] font-medium leading-tight truncate text-[#4a3a24]" title={activeItem.lens}>
                    {activeItem.lens}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-label text-[9px] text-[#8c7144] uppercase font-bold">Exif Settings</span>
                  <span className="font-sans text-[11px] font-medium leading-tight truncate text-[#4a3a24]">
                    {activeItem.settings.aperture} • {activeItem.settings.shutter}
                  </span>
                </div>
              </div>

              {/* Location Tag */}
              <div className="flex items-center justify-between border-t border-[#4a3a24]/10 pt-4">
                <div className="flex items-center gap-2 text-[#5c4d37]">
                  <MapPin className="w-3.5 h-3.5 text-[#8c7144]" />
                  <span className="font-label text-[10px] tracking-wider uppercase">{activeItem.location}</span>
                </div>
                <button 
                  onClick={() => onInquireCategory(category)}
                  className="font-label text-[10px] text-[#8c7144] font-bold hover:text-[#5c4a30] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                >
                  <span>Book a similar session</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: List & Narrative (5 Columns) */}
        <div className="md:col-span-5 flex flex-col gap-8 text-[#4a3a24]">
          <div className="flex flex-col gap-3">
            <span className="font-label text-[11px] tracking-widest text-[#8c7144] uppercase font-bold">
              Archival Narrative
            </span>
            <p className="font-serif text-lg leading-relaxed text-[#5c4a30] italic font-light">
              "{details.narrative}"
            </p>
          </div>

          {/* Grid Selection */}
          <div className="flex flex-col gap-4">
            <span className="font-label text-[10px] tracking-widest text-[#4a3a24]/60 uppercase font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Series Selected ({details.items.length})</span>
            </span>
            
            <div className="flex flex-col gap-3.5">
              {details.items.map((item) => {
                const isActive = activeItem?.id === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`p-3.5 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-[#f4ebd9] border-[#8c7144] shadow-md' 
                        : 'bg-white/40 border-[#4a3a24]/10 hover:bg-[#f4ebd9]/40 hover:border-[#8c7144]/40'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                      <img className="w-full h-full object-cover" src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className={`font-serif text-sm truncate ${isActive ? 'text-[#8c7144]' : 'text-[#4a3a24]'}`}>
                        {item.title}
                      </h4>
                      <p className="font-label text-[9px] text-[#8c7144] tracking-wider uppercase mt-0.5 truncate">
                        {item.location}
                      </p>
                    </div>
                    {isActive && (
                      <span className="text-[10px] uppercase font-bold font-label text-[#8c7144] tracking-widest bg-[#8c7144]/10 px-2 py-1 rounded">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="mt-auto p-5 rounded-2xl bg-[#f4ebd9] border border-[#dac587]/30 text-center flex flex-col gap-4 shadow-sm">
            <div>
              <h5 className="font-serif text-base text-[#5c4a30]">Contemplating a Custom Shoot?</h5>
              <p className="font-sans text-xs text-[#5c4d37] mt-1 leading-relaxed">
                Connect with our photography director to map light settings, themes, and visual outlines.
              </p>
            </div>
            <button 
              onClick={() => onInquireCategory(category)}
              className="font-label text-xs tracking-wider bg-[#5c4a30] text-[#faf6ee] hover:bg-[#4a3a24] py-3.5 rounded-full uppercase font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Request Custom Inquiry
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
