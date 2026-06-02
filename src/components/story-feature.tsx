import { siteContent } from "@/data/site-content";
import { ResponsiveContainer } from "./responsive-container";
import { SectionReveal } from "./section-reveal";
import { StoryImageCluster } from "./story-image-cluster";

export function StoryFeature() {
  return (
    <section id="stories" className="relative py-24 sm:py-32 lg:py-40">
      <ResponsiveContainer>
        <SectionReveal className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[var(--color-gold-dark)]">
            {siteContent.featuredStory.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(2.8rem,7vw,7.4rem)] leading-[0.92] text-[var(--color-charcoal)] text-balance">
            {siteContent.featuredStory.title}
          </h2>
          <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] sm:flex-row sm:justify-center">
            <span>{siteContent.featuredStory.location}</span>
            <span className="hidden h-px w-10 bg-[rgba(55,45,36,0.22)] sm:block" />
            <span>{siteContent.featuredStory.date}</span>
          </div>
        </SectionReveal>
        <StoryImageCluster />
        <SectionReveal className="mx-auto mt-10 max-w-2xl text-center" delay={0.1}>
          <p className="text-lg leading-9 text-[var(--color-muted)]">
            {siteContent.featuredStory.body}
          </p>
        </SectionReveal>
      </ResponsiveContainer>
    </section>
  );
}
