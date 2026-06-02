import { AboutSection } from "@/components/about-section";
import { CategoryGrid } from "@/components/category-grid";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { GalleryStrip } from "@/components/gallery-strip";
import { Header } from "@/components/header";
import { HeroScene } from "@/components/hero-scene";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { ShaderOverlay } from "@/components/shader-overlay";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { StoryFeature } from "@/components/story-feature";

export default function Home() {
  return (
    <div className="relative flex flex-col bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
      <SmoothScrollProvider />
      <ShaderOverlay />
      <ScrollProgressIndicator />
      <Header />
      <main className="relative z-10">
        <HeroScene />
        <StoryFeature />
        <CTASection />
        <CategoryGrid />
        <AboutSection />
        <GalleryStrip />
      </main>
      <Footer />
    </div>
  );
}
