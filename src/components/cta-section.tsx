import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { ResponsiveContainer } from "./responsive-container";
import { SectionReveal } from "./section-reveal";

export function CTASection() {
  return (
    <section className="relative py-20 sm:py-28">
      <ResponsiveContainer>
        <SectionReveal className="mx-auto max-w-5xl border-y border-[rgba(55,45,36,0.16)] py-16 text-center">
          <h2 className="mx-auto max-w-4xl font-serif text-[clamp(2.4rem,5vw,5.4rem)] leading-none text-[var(--color-charcoal)] text-balance">
            {siteContent.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)]">
            {siteContent.cta.body}
          </p>
          <a
            href="#contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[var(--color-charcoal)] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[var(--color-ivory)] shadow-[0_22px_70px_rgba(55,45,36,0.24)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(169,131,76,0.30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
          >
            {siteContent.cta.label}
            <ArrowUpRight size={16} />
          </a>
        </SectionReveal>
      </ResponsiveContainer>
    </section>
  );
}
