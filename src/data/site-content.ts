import { siteImages } from "@/data/site-images";

export const siteContent = {
  brand: {
    name: "Chhaayachitrakaar",
    mark: "C",
    location: "Wedding photography studio / India and beyond",
    email: "hello@chhaayachitrakaar.studio",
    phone: "+91 98765 43210",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Stories", href: "#stories" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Fine art wedding stories",
    title: "Images that hold the quiet poetry of your wedding day.",
    subtitle:
      "A cinematic, intimate approach to celebrations shaped by light, gesture, family, and the feeling between frames.",
    cta: "Book a Session",
    formLink: "YOUR_GOOGLE_FORM_LINK_HERE",
    image: siteImages.hero.background,
    alt: siteImages.hero.slides[0].alt,
    slides: siteImages.hero.slides,
      {
        theme: "Pre-Wedding",
        headline: "The tender anticipation and quiet moments before forever begins.",
        subheadline:
          "Romantic portraits in soft light, composed with intimacy, patience, and cinematic restraint.",
        image:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2200&q=85",
        alt: "Couple standing together for a warm pre-wedding portrait",
      },
      {
        theme: "Birthdays",
        headline: "Joyful milestones and fleeting laughter, preserved in light.",
        subheadline:
          "A graceful record of celebration, childhood wonder, candlelight, and the people gathered close.",
        image:
          "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=2200&q=85",
        alt: "Birthday celebration with cake, candles, and warm lights",
      },
      {
        theme: "Parties",
        headline: "The vibrant rhythm and unfiltered energy of your celebrations.",
        subheadline:
          "Editorial party coverage for music, movement, atmosphere, and the spark of a room alive.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=85",
        alt: "Celebration party with lights, crowd, and energetic atmosphere",
      },
      {
        theme: "Product Shoot",
        headline: "Craft, texture, and detail illuminated with cinematic elegance.",
        subheadline:
          "Fine-art product imagery for makers, brands, and objects that deserve careful light.",
        image:
          "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=2200&q=85",
        alt: "Luxury product styling with warm cinematic light and detailed texture",
      },
    ],
  },
  featuredStory: {
    eyebrow: "Featured story",
    title: "An ivory morning in Udaipur",
    location: "Lake Pichola / Winter wedding",
    date: "Chapter 01 / December",
    body: "A celebration built from still water, heirloom textiles, jasmine, and the tender hush before the vows. We photographed it as a memory unfolding slowly.",
    images: siteImages.featuredStory,
  },
  cta: {
    title: "Let us create memories you can relive forever.",
    body: "For couples who want photographs that feel composed, emotional, and deeply personal.",
    label: "Book Your Wedding",
  },
  categories: siteImages.categories,
  about: {
    eyebrow: "Behind the lens",
    title: "A calm presence for luminous, unrepeatable days.",
    body: [
      "Chhaayachitrakaar is guided by patience, attention, and the belief that wedding photographs should feel honest before they feel impressive.",
      "We work quietly inside the rhythm of your celebration, shaping editorial compositions without losing the tenderness of what is actually happening.",
    ],
    label: "Learn more about me",
    image: siteImages.about.image,
    alt: siteImages.about.alt,
  },
  gallery: siteImages.gallery,
  footer: {
    serviceArea: "Available for weddings across India, Europe, and intimate destination celebrations.",
    links: ["Stories", "Portfolio", "Albums", "Privacy"],
  },
};
