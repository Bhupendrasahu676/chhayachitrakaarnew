/**
 * Bento Grid Gallery & Portfolio Media Assets Configuration
 * 
 * Recommended Image Resolution:
 * - Large/Featured spans: 1200x800px (or higher, e.g. 1920x1080px for widescreen)
 * - Standard grid spans: 800x800px (or 1000x1000px square)
 * 
 * Recommended Video Specs:
 * - Format: H.264/MP4
 * - Resolution: 720p or 1080p (highly compressed, muted loop)
 */

import { PortfolioCategory } from '../../types';

export interface PortfolioMediaItem {
  id: number;
  type: 'image' | 'video';
  category: PortfolioCategory;
  title: string;
  desc: string;
  url: string;
  span: string;
}

export const PORTFOLIO_BENTO_ITEMS: PortfolioMediaItem[] = [
  {
    id: 1,
    type: 'image',
    category: 'wedding',
    title: 'The Golden Pavilion',
    desc: 'Intimate narratives woven through light and shadow, capturing elegant couture and profound emotional pauses.',
    // Suggested size: 1000x1500px (Portrait format)
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2'
  },
  {
    id: 2,
    type: 'video',
    category: 'party',
    title: 'Celebration Soirées',
    desc: 'The laughter, warm candle embers, and unhurried candid frames of elite gatherings and luxury dinners.',
    // Suggested specs: 1080p MP4, compressed < 3MB
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02cba4d78d22d05740b40e340a6b579&profile_id=164&oauth2_token_id=57447761',
    span: 'md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2'
  },
  {
    id: 3,
    type: 'image',
    category: 'pre-wedding',
    title: 'Pre-Wedding Romance',
    desc: 'Graceful editorial moments along historical stone corridors and windswept Italian garden cliffs.',
    // Suggested size: 1000x1500px (Portrait format)
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2'
  },
  {
    id: 4,
    type: 'image',
    category: 'editorial',
    title: 'High-Fashion Editorial',
    desc: 'Atmospheric chiaroscuro draping studies exploring heavy silk motion, contrast, and silent geometry.',
    // Suggested size: 1200x800px (Landscape format)
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2'
  },
  {
    id: 5,
    type: 'video',
    category: 'products',
    title: 'Liquid Luxury Products',
    desc: 'Capturing clear glass outlines, gold contours, and liquid refraction fields under clinical, soft lighting.',
    // Suggested specs: 1080p MP4, compressed < 3MB
    url: 'https://player.vimeo.com/external/494191336.sd.mp4?s=b6c31bf0707c2a780ad5ef4b07119ff9bb64ac72&profile_id=165&oauth2_token_id=57447761',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2'
  },
  {
    id: 6,
    type: 'image',
    category: 'travel',
    title: 'Heritage Travel Diaries',
    desc: 'Sun-drenched water paths and classical structures capturing timeless editorial moments in global landscapes.',
    // Suggested size: 1200x800px (Landscape format)
    url: 'https://images.unsplash.com/photo-1507504038482-76210f6ec33c?q=80&w=1200',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2'
  },
  {
    id: 7,
    type: 'video',
    category: 'drones',
    title: 'Aerial Dronescapes',
    desc: 'Cinematic wide sweeps of coastline topologies and ancient historical castle ramparts captured via drone.',
    // Suggested specs: 1080p MP4, compressed < 3MB
    url: 'https://player.vimeo.com/external/391583152.sd.mp4?s=e84dbcd11546995641775ba734bf51a2cf6da9f8&profile_id=165&oauth2_token_id=57447761',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2'
  }
];
