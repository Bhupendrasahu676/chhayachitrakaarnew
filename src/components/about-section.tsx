import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { MotionImage } from "./motion-image";
import { ResponsiveContainer } from "./responsive-container";
import { SectionReveal } from "./section-reveal";

export function AboutSection() {
  return (
    <section id="about" className="relative bg-[rgba(238,229,215,0.42)] py-24 sm:py-32">
      <ResponsiveContainer>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionReveal>
            <MotionImage
              src={siteContent.about.image}
              alt={siteContent.about.alt}
              width={1100}
              height={1400}
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="aspect-[4/5] rounded-t-full rounded-b-[2rem] shadow-[0_36px_110px_rgba(66,48,33,0.18)]"
              drift="right"
            />
          </SectionReveal>
          <SectionReveal delay={0.08} className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[var(--color-gold-dark)]">
              {siteContent.about.eyebrow}
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,5.8rem)] leading-none text-[var(--color-charcoal)] text-balance">
              {siteContent.about.title}
            </h2>
            <div className="mt-8 grid gap-5 text-lg leading-9 text-[var(--color-muted)]">
              {siteContent.about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full border border-[rgba(55,45,36,0.22)] px-6 py-3 text-sm uppercase tracking-[0.18em] text-[var(--color-charcoal)] transition hover:-translate-y-1 hover:border-[var(--color-gold)] hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
            >
              {siteContent.about.label}
              <ArrowUpRight size={16} />
            </a>
          </SectionReveal>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
