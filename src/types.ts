/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PortfolioCategory = 'wedding' | 'party' | 'pre-wedding' | 'editorial' | 'products' | 'travel' | 'drones' | 'weddings' | 'cinematography';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  imageUrl: string;
  description: string;
  camera: string;
  lens: string;
  settings: {
    shutter: string;
    aperture: string;
    iso: string;
  };
  location: string;
  videoUrl?: string;
}

export interface JournalEntry {
  id: string;
  author: string;
  authorRole: 'Photography' | 'Cinematography';
  authorHandle: string;
  avatarIcon: 'camera' | 'movie';
  summary: string;
  date: string;
  images: Array<{
    url: string;
    description: string;
    meta?: {
      camera?: string;
      lens?: string;
      settings?: string;
    }
  }>;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: PortfolioCategory | 'custom';
  eventDate: string;
  location: string;
  aestheticNotes: string;
  lightingPreference: 'dawn' | 'golden_hour' | 'liquid_glass' | 'cinematic_dark' | 'any';
  status: 'pending' | 'reviewed';
  submittedAt: string;
}
