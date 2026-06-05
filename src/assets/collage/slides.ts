/**
 * Interactive Collage Section Slides Configuration
 * 
 * Recommended Image Resolution:
 * - Center Highlight Image: 1200x800px
 * - Side Accent Images: 800x800px (or 800x1200px)
 */

export interface CollageSlide {
  category: string;
  title: string;
  subtitle: string;
  actionText: string;
  imageCenter: string;
  imageLeft: string;
  imageRight: string;
}

export const INTERACTIVE_COLLAGE_SLIDES: CollageSlide[] = [
  {
    category: 'FINE ART WEDDING CHRONICLE',
    title: 'Jadon & Pearl',
    subtitle: 'Simi Valley, California',
    actionText: 'Watch Film',
    // Suggested size: 1200x800px
    imageCenter: 'photo_2026-06-05_16-21-06.jpg',
    // Suggested size: 800x800px
    imageLeft: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
    // Suggested size: 800x800px
    imageRight: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800'
  },
  {
    category: 'RAJASTHAN ARCHITECTURE SERIES',
    title: 'Vikram & Devika',
    subtitle: 'Umaid Bhawan Palace, Jodhpur',
    actionText: 'Explore Collection',
    // Suggested size: 1200x800px
    imageCenter: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200',
    // Suggested size: 800x800px
    imageLeft: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?q=80&w=800',
    // Suggested size: 800x800px
    imageRight: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800'
  },
  {
    category: 'ITALIAN ROMANCE STORY',
    title: 'Kabir & Natasha',
    subtitle: 'Villa d\'Este, Lake Como',
    actionText: 'Watch Cinematic Reel',
    // Suggested size: 1200x800px
    imageCenter: 'https://images.unsplash.com/photo-1507504038482-76210f6ec33c?q=80&w=1200',
    // Suggested size: 800x800px
    imageLeft: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800',
    // Suggested size: 800x800px
    imageRight: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800'
  },
  {
    category: 'METROPOLITAN CELEBRATION',
    title: 'Adrian & Celine',
    subtitle: 'Rooftop Penthouse, Manhattan',
    actionText: 'Play Story Reel',
    // Suggested size: 1200x800px
    imageCenter: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200',
    // Suggested size: 800x800px
    imageLeft: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800',
    // Suggested size: 800x800px
    imageRight: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800'
  }
];
