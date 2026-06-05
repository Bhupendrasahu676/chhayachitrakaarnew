/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, JournalEntry } from './types';

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRynymPccK7q1uPIY-SG3oR8X6CqAGcE1Ocy1KEZph9RkIVXEXIlqS2-Brdh6eMz8NYfIOba9LrMwQbrmCwPsWy4PLc6OHl_LM0jj7VT0zkEcet9hDjafWX6s_SNeOR0S820_MznhGa6W_D6rEL-fywtNO7vH0gbmR_dnzCkNXlL6tIEQ1qoi6WdwVKm94Fu7cHouP1VHxYSYrpajnq5DH-tD_3OnuMu0ZfIrCfP_7oWC721lD3AvEmBEsu2FKaB4EJiK2QrH-f0yG';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'w1',
    title: 'The Golden Pavilion',
    category: 'weddings',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk-YUTXUUkp-Zam4wG-nOEr96k6WW7N9BRyIVwfaZugXRngfkUCmjdT8oUPXDJzPEBxwNJAg5AFzBx5UJupJWzvA0Xyehzuuw6YLxofnFSvIEWrZwQMQDbP716FE0-J8ktXLM8VhFM3gl3OqPLUq0KTZ_LaokZgS7RinDrsTUUZ33-DAjGsBTat8Y_z7niC66XjFBDxHSA8RGoVIJmdtTz1LnoPM2ErBcP_A1LeBZ_amSHVx3kKZub0_9ndx9aU9WuOQmUw-MvZOi6',
    description: 'An ethereal, high-fashion wedding composition capturing the elegant drapery of a custom silk gown beneath hand-sculpted temple arches. Bathed in champagne light to isolate the raw, quiet luxury of the celebration.',
    camera: 'Hasselblad H6D-100c',
    lens: 'HCD 80mm f/2.8',
    settings: {
      shutter: '1/160s',
      aperture: 'f/4.0',
      iso: '100'
    },
    location: 'Rajasthan Sanctuary, India'
  },
  {
    id: 'p1',
    title: 'L’eau de Verre Crystal Eau de Parfum',
    category: 'products',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcv53vZbzBnpQGKHifKxAhOlZ50rzQfLD8srZs-3mZ-8mX_a7e_qZ3GUxno2L7N9gT8ytzPJoPhPuIH07jsjm_BWmvV1qiYDty6xjPMNcVJlrrqTCSJLlPuxolrGJwY-OYue5ZFq8YOj-nVFniL5oJst7hKkIW-hhNiygZNyZB9BjJYR7Cq35PErFo2k_gIGFTOKm3B5SplwMy_E-XqpaKohFzJAa2q-ES6oWGIXfwnIHXSuxbuBvcs9LMnmVgK3vuTFZF35p4Gq91',
    description: 'A luxurious product study capturing liquid refraction framing premium custom typography. Emphasizes sharp details, reflective surfaces under soft champagne-toned studio light, and exquisite minimalist symmetry.',
    camera: 'Phase One XF IQ4 150MP',
    lens: 'Schneider Kreuznach 120mm LS Macro f/4.0',
    settings: {
      shutter: '1/250s',
      aperture: 'f/11',
      iso: '50'
    },
    location: 'Aura Atelier Studio, Mumbai'
  },
  {
    id: 'c1',
    title: 'Chronicles of Nostalgia',
    category: 'cinematography',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxi_UuMlpH3DL4XTzxicu4wE6_GAHNXp9n3BU8rLODuw3BuXSBT04v3CBUyX4uygLSTd1cVoe3gsUCwrSd6KK5iAx2dUJ4h2nlSfk3pycZWi0sVvf2enoOkDTFWb2V5nEtaiYV0FrmoVPCC8p1dBuux6bO4fWEmzjTq3bH1DABIakOieLSDio2qS1TteyMhM85Pbu2jbg-mh0du1mR9cx-c1vxUV0PnH6bv4qGGINRz2YLHJyH_kAKj8a0pk7M4cEbeTsiEcpApZmB',
    description: 'A cinematic golden hour still silhouettes a legacy dual-system 35mm film camera against classical window frames. Captured as a metaphor for timeless cinematic storytelling and unhurried observation.',
    camera: 'ARRI ALEXA 35',
    lens: 'Cooke S8/i Full Frame Prime 50mm T1.4',
    settings: {
      shutter: '1/48s (180°)',
      aperture: 'T2.0',
      iso: '800'
    },
    location: 'Sovereign Library Corridor'
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j1',
    author: 'Chhaayachitrakaar Team',
    authorRole: 'Photography',
    authorHandle: '@chhaayachitrakaar',
    avatarIcon: 'camera',
    summary: 'A quiet morning spent discovering patterns inside the heirloom bridal suite. Finding poetry in the raw textures of handcrafted details.',
    date: 'June 2, 2026',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLEb7BM0Qk-2ezLWbkfKO7NnVgEiuFKhe3IhqJKbFTSwpETTBwacPvVom_jYhVG9K7fe3mc7NxR1fKFPmhUGDoGqFBIrlcl4-45zyRA4_VU7nQtBA21VdidbYMCzp1fHv6sj84RwLHEn3I5-DFi07awN-SZsChcAqzKWUXcP_jvOpsUMOmdQpI7sD1cssKFhzIX0v2Qf7wmtQ0f60pxI11pkbFQXUl_hz0Mg_yI4Xmrvf6PmsaVBCRObdJw0VA2Z0AgWlW4_5jCY3d',
        description: 'Detail of heirloom French Chantilly lace reflecting low-angle morning sun, emphasizing complex craft lines and warmth.',
        meta: {
          camera: 'Sony A1',
          lens: 'FE 90mm f/2.8 Macro G OSS',
          settings: 'f/4.0 | 1/200s | ISO 100'
        }
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGnc9YK7jLZ6LJCwmcSG4OJZ4ez5qbs_-TdPu9LMD8gchHZCqc6YBSmNxNeN6OTdb4smOYnwujSngUkXDSFqB54AfiQ4MbqKZN13_nw6czgwhkx4HEvGsGAkUEXBenmiqANTq9p3ZfkiwDqWhhAIpCZzmpkwk_uP6ZvRROhSOB6QbxivQuxZ45Bsm6ZroGAGMZQrui2b1blr6L4vBnp_6PAxf6oIAqzfJL9LO0o-r-rc0OHUhoz24-qyUZDbepcxTwLMaP4_ThQAgy',
        description: 'Minimalist editorial composition of hand-crafted platinum wedding rings on handmade textured cotton paper beside dry wheat branches.',
        meta: {
          camera: 'Sony A1',
          lens: 'FE 50mm f/1.2 GM',
          settings: 'f/2.2 | 1/160s | ISO 125'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
        description: 'Fine art candle-lit gold wedding table setting with luxury glass refraction and delicate pastel flower decor.',
        meta: {
          camera: 'Hasselblad X2D',
          lens: 'XCD 38mm f/2.5',
          settings: 'f/2.8 | 1/125s | ISO 64'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=1000&auto=format&fit=crop',
        description: 'Atmospheric macro study of botanical details and sheer fabric folds reflecting soft midday glass glare.',
        meta: {
          camera: 'Sony A1',
          lens: 'FE 90mm f/2.8 Macro G OSS',
          settings: 'f/3.2 | 1/250s | ISO 100'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
        description: 'An ethereal candid capture of a vintage grand reception bathed in warm candle halos and delicate golden trails.',
        meta: {
          camera: 'Leica SL2',
          lens: 'Summilux-SL 50mm f/1.4 ASPH',
          settings: 'f/1.4 | 1/125s | ISO 200'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop',
        description: 'Tactile close-up study in autumn sunset shades, capturing natural dry leaf refractions.',
        meta: {
          camera: 'Sony A1',
          lens: 'FE 90mm f/2.8 Macro G',
          settings: 'f/5.6 | 1/180s | ISO 100'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
        description: 'A study in reflective patterns - soft, fine-crafted natural pearls catching low key side illumination.',
        meta: {
          camera: 'Phase One XF',
          lens: '120mm Macro LS f/4.0',
          settings: 'f/11 | 1/250s | ISO 50'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1000&auto=format&fit=crop',
        description: 'Soft sunlight illuminating a silk bridal veil draping a rustic mahogany chair, focusing on weave texture.',
        meta: {
          camera: 'Leica M11',
          lens: 'Noctilux-M 50mm f/0.95',
          settings: 'f/0.95 | 1/1000s | ISO 64'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
        description: 'Artisanal handwritten calligraphic vows on textured handmade paper, framed by soft shadow gradients.',
        meta: {
          camera: 'Hasselblad X2D',
          lens: 'XCD 90mm f/2.5',
          settings: 'f/3.2 | 1/180s | ISO 100'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1502472545825-0c16db74d53a?q=80&w=1000&auto=format&fit=crop',
        description: 'Elegant table candle light flares reflecting off silver antique heirloom cutlery under high contrast.',
        meta: {
          camera: 'Sony A1',
          lens: 'FE 50mm f/1.2 GM',
          settings: 'f/1.2 | 1/90s | ISO 160'
        }
      }
    ]
  },
  {
    id: 'j2',
    author: 'Chhaaya Films',
    authorRole: 'Cinematography',
    authorHandle: '@chhaaya_films',
    avatarIcon: 'movie',
    summary: 'Our pursuit of the golden light—capturing atmospheric reflections across massive heritage halls, and technical setups under twilight.',
    date: 'May 28, 2026',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdNmWJTn0abPqghPx3YAHjRlANW6oPGmXErOc0c569oGrOtsFNV5atnUkS2TmuITaZZqZTakc2_iD7Dc5PcdyNmewJ5Abwsr9suxqgrtKJEswecZPejAzSS_KrEiH9lwZaDm_QeYLURsDO_ZncFVyiS2azAZp1wh5IORaZn4LYuRoxHjH4QOBbkm1hf9HRGPU7y5yTTymw1h3YNu5wFYJa2mIVAmsgVmd6eWaRajEd3hqHivR0r70G-Sql06QqljSyiLN6QlroPC17',
        description: 'An empty ballroom corridor waiting for guests. The polished wood surface mimics a quiet mirror, mirroring glowing crystal chandeliers.',
        meta: {
          camera: 'RED V-Raptor XL 8K',
          lens: 'Zeiss Supreme Prime Radiance 35mm T1.5',
          settings: 'T1.8 | 1/48s | ISO 800'
        }
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5NlzSBHRAiIfN28TR0x80d2KfOsemSpm5bEFxayOm4gQF0jtIepB3YwXp9Uc5WmGiVemlMglerU9h9OJYaE2sJhHoN0xZ5MAYRuryk3WRyjQXpxV2q0ZhnuDwhKKorkiOOZ--UW8S4nTOBpQYv21qR6RqE4wTUP8aJG-t67lE7MW6QkPFl_MjpftZ--3UoYU2Iwgxqb2i5tFuCGmv8HtBQiw0-13-MtzSQOLnafhu8yezRzF6MNEfI0PWZtv0KQgCR6YVbITORf5_',
        description: 'A behind-the-scenes study of our head cinematographer framing the light leaks during dynamic sunset adjustments.',
        meta: {
          camera: 'ARRI ALEXA Mini LF',
          lens: 'Angénieux Optimo Ultra Compact 37-102mm Gold',
          settings: 'T2.9 | 1/48s | ISO 800'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',
        description: 'Vintage 35mm motion picture setup reflecting the rich, nostalgic glass flares of sunset under library windows.',
        meta: {
          camera: 'Panavision Millennium XL2',
          lens: 'Primo Anamorphic 50mm T2.0',
          settings: 'T2.8 | 1/48s | ISO 500'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
        description: 'Moody shadows and atmospheric velvet reflections draping empty luxury cinema theatre seats.',
        meta: {
          camera: 'ARRI ALEXA 35',
          lens: 'Signature Prime 40mm T1.8',
          settings: 'T1.8 | 1/48s | ISO 800'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
        description: 'Chasing the early sunrise mists with an analog film camera rigged on a wooden tripod under towering pine canopies.',
        meta: {
          camera: 'Arriflex 435',
          lens: 'Zeiss Master Prime 50mm',
          settings: 'T2.0 | 1/48s | ISO 400'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1000&auto=format&fit=crop',
        description: 'A structural silhouette study inside architectural halls, isolating soft light leaks projecting onto concrete piers.',
        meta: {
          camera: 'RED Monstro 8K',
          lens: 'Zeiss Supreme 25mm T1.5',
          settings: 'T1.5 | 1/48s | ISO 800'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
        description: 'A study of low-key shadows draping fine instruments, catching soft ambient light over polished varnish.',
        meta: {
          camera: 'ARRI ALEXA Mini LF',
          lens: 'Signature Prime 75mm T1.8',
          settings: 'T2.0 | 1/48s | ISO 800'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
        description: 'A behind-the-scenes golden lighting composition framing vintage film containers and editing desks.',
        meta: {
          camera: 'ARRI ALEXA 35',
          lens: 'Signature Prime 58mm',
          settings: 'T1.8 | 1/48s | ISO 400'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
        description: 'Rich shadows projecting high contrast lines from legacy steel film reels resting in studio sunlight.',
        meta: {
          camera: 'RED V-Raptor',
          lens: 'Zeiss Supreme 50mm',
          settings: 'T2.0 | 1/48s | ISO 800'
        }
      },
      {
        url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop',
        description: 'A macro cinematic capture of warm vintage typewriter keys bathing in a golden room glow.',
        meta: {
          camera: 'Aaton Penelope',
          lens: 'Cooke S4/i 75mm',
          settings: 'f/2.8 | 1/48s | ISO 500'
        }
      }
    ]
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Do you travel globally for shoots?',
    a: 'Yes. Over seventy percent of our weddings and brand features are photographed internationally. We manage all travel planning and logistics internally to keep our process unhurried and pristine.'
  },
  {
    q: 'What is your turnaround process for final works?',
    a: 'Every frame is meticulously refined by hand. Initial select galleries are delivered within three weeks, while complete, bespoke physical books and high-definition cinematic masters require twelve to sixteen weeks.'
  },
  {
    q: 'How do you define the Liquid Light approach?',
    a: 'Our approach focuses on finding the exact moment light acts as a liquid glass medium—whether cascading down architectural panels, refracting inside heavy crystal glassware, or painting gradients across soft silk fabrics. We avoid over-processed digital filters and control lighting organically to render real, quiet luxury.'
  }
];
