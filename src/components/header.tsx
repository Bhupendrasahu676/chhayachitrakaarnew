"use client";

import { Camera, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { siteContent } from "@/data/site-content";

export function Header() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = siteContent.nav.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.6] },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-white/45 bg-[rgba(251,247,239,0.72)] px-4 py-3 shadow-[0_20px_70px_rgba(68,50,35,0.10)] backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]">
          <span className="grid size-9 place-items-center rounded-full bg-[var(--color-charcoal)] text-[var(--color-ivory)]">
            <Camera size={16} strokeWidth={1.6} />
          </span>
          <span className="font-serif text-lg text-[var(--color-charcoal)] sm:text-xl">
            {siteContent.brand.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {siteContent.nav.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] transition hover:text-[var(--color-charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
              >
                {item.label}
                <span
                  className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-gold)] transition ${active === id ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                />
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full border border-[rgba(55,45,36,0.22)] px-5 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-charcoal)] transition hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] sm:inline-flex"
        >
          Book a Session
        </a>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-[rgba(55,45,36,0.18)] text-[var(--color-charcoal)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu size={18} />
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 grid max-w-[1440px] gap-1 rounded-3xl border border-white/50 bg-[rgba(251,247,239,0.94)] p-3 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          {siteContent.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--color-charcoal)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
