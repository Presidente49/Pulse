"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO =
  "PULSE is a field recording of the future as it happens. We report technology, culture, and science at the speed of change — designed for the way you actually read: fast, curious, and unwilling to look away.";

const TOPICS = [
  { name: "TECHNOLOGY", count: "128" },
  { name: "CULTURE", count: "096" },
  { name: "SCIENCE", count: "074" },
  { name: "DESIGN", count: "058" },
];

/** Scroll-scrubbed manifesto + full-bleed topic index rows. */
export default function Topics() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mani-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".mani",
            start: "top 78%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".topic-row").forEach((row) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="topics" className="relative px-5 py-24 md:px-10 md:py-36">
      <p className="mb-10 font-mono text-[11px] tracking-[0.3em] text-smoke">
        WHAT WE COVER
      </p>

      <p className="mani max-w-5xl font-display text-[clamp(1.8rem,4.6vw,4rem)] uppercase leading-[1.02]">
        {MANIFESTO.split(" ").map((w, i) => (
          <span key={i} className="mani-word inline-block">
            {w}
            {"\u00A0"}
          </span>
        ))}
      </p>

      <div className="mt-20 border-t border-bone/10 md:mt-28">
        {TOPICS.map((t) => (
          <a
            key={t.name}
            href="#topics"
            onClick={(e) => e.preventDefault()}
            data-cursor="OPEN"
            className="topic-row group flex items-center justify-between border-b border-bone/10 py-6 transition-colors duration-300 hover:bg-volt md:py-8"
          >
            <span className="flex items-baseline gap-5 pl-1 md:gap-8 md:pl-4">
              <span className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-none transition-all duration-300 group-hover:translate-x-2 group-hover:text-ink md:group-hover:translate-x-4">
                {t.name}
              </span>
            </span>
            <span className="flex items-center gap-5 pr-1 md:gap-8 md:pr-4">
              <span className="font-mono text-sm text-smoke transition-colors duration-300 group-hover:text-ink/60">
                {t.count} STORIES
              </span>
              <ArrowRight className="h-6 w-6 text-volt transition-all duration-300 group-hover:translate-x-2 group-hover:text-ink" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
