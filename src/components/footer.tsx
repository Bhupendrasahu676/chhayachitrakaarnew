import { Mail, Phone } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { ResponsiveContainer } from "./responsive-container";
import { SectionReveal } from "./section-reveal";

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[var(--color-charcoal)] py-20 text-[var(--color-ivory)] sm:py-28">
      <ResponsiveContainer>
        <SectionReveal className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[rgba(242,229,205,0.62)]">
              Begin your chapter
            </p>
            <h2 className="max-w-4xl font-serif text-[clamp(3rem,7vw,8rem)] leading-[0.9] text-balance">
              Tell us where the story starts.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-[rgba(242,229,205,0.70)]">
              {siteContent.footer.serviceArea}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <div className="grid gap-4">
              <a
                href={`mailto:${siteContent.brand.email}`}
                className="inline-flex items-center gap-3 text-lg transition hover:text-[var(--color-gold)]"
              >
                <Mail size={18} />
                {siteContent.brand.email}
              </a>
              <a
                href={`tel:${siteContent.brand.phone.replaceAll(" ", "")}`}
                className="inline-flex items-center gap-3 text-lg transition hover:text-[var(--color-gold)]"
              >
                <Phone size={18} />
                {siteContent.brand.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteContent.footer.links.map((link) => (
                <a
                  key={link}
                  href={link === "Stories" ? "#stories" : link === "Portfolio" ? "#portfolio" : "#home"}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70 transition hover:border-[var(--color-gold)] hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </SectionReveal>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-8 text-xs uppercase tracking-[0.18em] text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {siteContent.brand.name}. All rights reserved.</p>
          <p>{siteContent.brand.location}</p>
        </div>
      </ResponsiveContainer>
    </footer>
  );
}
