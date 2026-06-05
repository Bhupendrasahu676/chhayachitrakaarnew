/**
 * General Background and UI Fallback Assets Configuration
 * 
 * Includes backgrounds for:
 * - Footer Sections
 * - Infinite Image Auto-Slider Fallbacks
 * - Circular Gallery Modal Fallbacks
 */

export const GENERAL_BACKGROUNDS = {
  // Footer Elegant Backdrop
  // Recommended size: 1600x900px or higher, compressed mix-blend compatible
  footerBackground: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1600&auto=format&fit=crop',

  // Hero default fallback backdrop when slides are loading or inactive
  // Recommended size: 1600x900px
  heroBackdropFallback: 'https://images.unsplash.com/photo-1533223251525-5325df382abe?q=80&w=1600',

  // Circular Gallery default portfolio backdrop
  // Recommended size: 1200x800px
  circularGalleryDefault: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
};

// Infinite Image Slider fallbacks
// Recommended size: 800x800px (1:1 Ratio)
export const SLIDER_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop"
];

// Circular Gallery fallback images
// Recommended size: 1000x1000px or similar
export const CIRCULAR_GALLERY_FALLBACKS = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    title: "The Dreamy Altar",
    desc: "An atmospheric golden hour study of high floral pillars"
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
    title: "Chandelier Glow",
    desc: "A warm and inviting capture of glowing light under grand columns"
  },
  {
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200",
    title: "Ethereal Drapery",
    desc: "Soft champagne silk fabrics catching light gracefully"
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
    title: "The Candlelight Dance",
    desc: "Joyful silhouettes moving softly against flickering candlelight"
  },
  {
    url: "https://images.unsplash.com/photo-1507504038482-76210f6ec33c?q=80&w=1200",
    title: "Windswept Garden",
    desc: "A timeless, elegant candid moment on an Italian terrace"
  }
];

export const CIRCULAR_GALLERY_DEFAULT_IMAGES = [
  {
    title: "The Golden Pavilion",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
  },
  {
    title: "Heirloom Chantilly Details",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLEb7BM0Qk-2ezLWbkfKO7NnVgEiuFKhe3IhqJKbFTSwpETTBwacPvVom_jYhVG9K7fe3mc7NxR1fKFPmhUGDoGqFBIrlcl4-45zyRA4_VU7nQtBA21VdidbYMCzp1fHv6sj84RwLHEn3I5-DFi07awN-SZsChcAqzKWUXcP_jvOpsUMOmdQpI7sD1cssKFhzIX0v2Qf7wmtQ0f60pxI11pkbFQXUl_hz0Mg_yI4Xmrvf6PmsaVBCRObdJw0VA2Z0AgWlW4_5jCY3d",
  },
  {
    title: "Skyline Champagne Toast",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
  },
  {
    title: "Warm Candle Embers",
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200",
  },
  {
    title: "Echoes on Lake Como",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
  },
  {
    title: "Lake Como Villa",
    url: "https://images.unsplash.com/photo-1507504038482-76210f6ec33c?q=80&w=1200",
  },
];

