import { Aperture } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { MotionImage } from "./motion-image";
import { ResponsiveContainer } from "./responsive-container";
import { SectionReveal } from "./section-reveal";

export function GalleryStrip() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <ResponsiveContainer>
        <SectionReveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[var(--color-gold-dark)]">
              Living portfolio
            </p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,5.4rem)] leading-none text-[var(--color-charcoal)]">
              Frames from recent chapters.
            </h2>
          </div>
          <p className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <Aperture size={16} />
            @chhaayachitrakaar
          </p>
        </SectionReveal>
      </ResponsiveContainer>
      <div className="gallery-drift flex w-max gap-5 px-5 sm:px-8 lg:px-12">
        {[...siteContent.gallery, ...siteContent.gallery].map((image, index) => (
          <MotionImage
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            width={520}
            height={700}
            sizes="(min-width: 1024px) 24vw, 70vw"
            className="h-[360px] w-[260px] shrink-0 rounded-[1.25rem] shadow-[0_22px_70px_rgba(66,48,33,0.13)] sm:h-[470px] sm:w-[340px]"
            drift="none"
          />
        ))}
      </div>
    </section>
  );
}
