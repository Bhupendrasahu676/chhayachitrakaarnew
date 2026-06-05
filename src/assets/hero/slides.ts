/**
 * Hero Section Slides Configuration
 * 
 * Recommended Image Resolution: 1600x900px or higher
 * Aspect Ratio: 16:9 or similar (Landscape)
 * Max File Size: < 2MB (with compression)
 */

export interface HeroSlide {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    category: 'FINE ART WEDDING STORIES / BIRTHDAYS',
    title: 'Joyful milestones and fleeting laughter, preserved in light.',
    description: 'A graceful record of celebration, childhood wonder, candlelight, and the people gathered close.',
    // Suggested size: 1600x900px
    imageUrl: 'https://images.unsplash.com/photo-1533223251525-5325df382abe?q=80&w=1600'
  },
  {
    category: 'FINE ART WEDDING STORIES / RAJASTHAN SANCTUARY',
    title: 'Ethereal silhouettes of handcrafted silk, captured under temple domes.',
    description: 'Bridal drapes floating beneath hand-sculpted arches, bathed in golden champagne beams to preserve raw, quiet luxury.',
    // Suggested size: 1600x900px
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk-YUTXUUkp-Zam4wG-nOEr96k6WW7N9BRyIVwfaZugXRngfkUCmjdT8oUPXDJzPEBxwNJAg5AFzBx5UJupJWzvA0Xyehzuuw6YLxofnFSvIEWrZwQMQDbP716FE0-J8ktXLM8VhFM3gl3OqPLUq0KTZ_LaokZgS7RinDrsTUUZ33-DAjGsBTat8Y_z7niC66XjFBDxHSA8RGoVIJmdtTz1LnoPM2ErBcP_A1LeBZ_amSHVx3kKZub0_9ndx9aU9WuOQmUw-MvZOi6'
  },
  {
    category: 'STUDIO REFRACTIONS / BOMBAY ATELIER',
    title: 'The poetry of liquid refraction and sharp mineral symmetry.',
    description: 'A delicate study of crystal glass bottles, metallic gold caps, and liquid refraction fields under clinical, soft champagne-tinted illumination.',
    // Suggested size: 1600x900px
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcv53vZbzBnpQGKHifKxAhOlZ50rzQfLD8srZs-3mZ-8mX_a7e_qZ3GUxno2L7N9gT8ytzPJoPhPuIH07jsjm_BWmvV1qiYDty6xjPMNcVJlrrqTCSJLlPuxolrGJwY-OYue5ZFq8YOj-nVFniL5oJst7hKkIW-hhNiygZNyZB9BjJYR7Cq35PErFo2k_gIGFTOKm3B5SplwMy_E-XqpaKohFzJAa2q-ES6oWGIXfwnIHXSuxbuBvcs9LMnmVgK3vuTFZF35p4Gq91'
  },
  {
    category: 'CELLULOID CHRONICLES / MONO ACADEMY',
    title: 'Immersive chiaroscuro shadows whispering stories of nostalgia.',
    description: 'A vintage 35mm film chamber silhouetted against classical French windows during the final moments of a warm summer twilight.',
    // Suggested size: 1600x900px
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxi_UuMlpH3DL4XTzxicu4wE6_GAHNXp9n3BU8rLODuw3BuXSBT04v3CBUyX4uygLSTd1cVoe3gsUCwrSd6KK5iAx2dUJ4h2nlSfk3pycZWi0sVvf2enoOkDTFWb2V5nEtaiYV0FrmoVPCC8p1dBuux6bO4fWEmzjTq3bH1DABIakOieLSDio2qS1TteyMhM85Pbu2jbg-mh0du1mR9cx-c1vxUV0PnH6bv4qGGINRz2YLHJyH_kAKj8a0pk7M4cEbeTsiEcpApZmB'
  }
];
