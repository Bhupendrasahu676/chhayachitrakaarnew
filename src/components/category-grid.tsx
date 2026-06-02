import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { MotionImage } from "./motion-image";
import { ResponsiveContainer } from "./responsive-container";
import { SectionReveal } from "./section-reveal";

export function CategoryGrid() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <ResponsiveContainer>
        <SectionReveal className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[var(--color-gold-dark)]">
              Portfolio chapters
            </p>
            <h2 className="font-serif text-[clamp(2.6rem,5.5vw,6.4rem)] leading-none text-[var(--color-charcoal)]">
              Choose the story you want to enter.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-9 text-[var(--color-muted)] lg:justify-self-end">
            Each collection is built like a chapter: a shift in pace, texture, intimacy, and light.
          </p>
        </SectionReveal>

        <div className="grid auto-rows-[280px] gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[330px]">
          {siteContent.categories.map((category, index) => (
            <SectionReveal
              key={category.title}
              className={`${index === 0 || index === 3 ? "lg:row-span-2" : ""}`}
              delay={index * 0.04}
            >
              <a
                href={category.title === "Contact" ? "#contact" : "#stories"}
                className="group relative block h-full overflow-hidden rounded-[1.25rem] bg-stone-200 shadow-[0_24px_80px_rgba(66,48,33,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
              >
                <MotionImage
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full rounded-[1.25rem]"
                  drift="none"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,16,12,0.72),rgba(20,16,12,0.08)_64%)] transition group-hover:bg-[linear-gradient(0deg,rgba(20,16,12,0.78),rgba(20,16,12,0.16)_64%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="font-serif text-4xl leading-none">{category.title}</h3>
                    <span className="grid size-10 place-items-center rounded-full border border-white/35 bg-white/10 backdrop-blur transition group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-white/76">{category.caption}</p>
                </div>
              </a>
            </SectionReveal>
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
