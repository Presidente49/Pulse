"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    kicker: "COMPUTING",
    title: "The Chip That Dreams in Light",
    excerpt:
      "Photonic processors just did in a second what took a supercomputer a week. The electron's century is ending.",
    time: "8 MIN",
  },
  {
    kicker: "URBANISM",
    title: "Cities Are Learning to Exhale",
    excerpt:
      "From reflective streets to breathing facades, the hottest cities on Earth are redesigning the air itself.",
    time: "6 MIN",
  },
  {
    kicker: "CULTURE",
    title: "The Last Lighthouse Keepers of the Internet",
    excerpt:
      "A loose collective of archivists is racing link rot to save the web's memory — one snapshot at a time.",
    time: "11 MIN",
  },
  {
    kicker: "BIOLOGY",
    title: "Mushrooms Are Negotiating With the Forest",
    excerpt:
      "New research shows mycelial networks trade nutrients like markets. The forest has an economy now.",
    time: "7 MIN",
  },
  {
    kicker: "ART",
    title: "A Symphony Written by Weather",
    excerpt:
      "A composer fed forty years of storm data into an orchestra. The climate finally has a soundtrack.",
    time: "5 MIN",
  },
];

export default function LatestList() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".latest-head", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.utils.toArray<HTMLElement>(".latest-row").forEach((row, i) => {
        gsap.from(row, {
          y: 70,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 5) * 0.05,
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="latest" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="latest-head mb-14 flex items-end justify-between md:mb-20">
        <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-none">
          Latest <span className="text-volt">Signals</span>
        </h2>
        <span className="hidden font-mono text-[11px] tracking-[0.3em] text-smoke md:block">
          UPDATED HOURLY
        </span>
      </div>

      <div className="border-t border-bone/10">
        {STORIES.map((s, i) => (
          <a
            key={s.title}
            href="#latest"
            data-cursor="READ"
            onClick={(e) => e.preventDefault()}
            className="latest-row group relative block border-b border-bone/10 py-8 transition-colors duration-300 md:py-10"
          >
            <div className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-volt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
            <div className="relative grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:grid-cols-[80px_1fr_auto] md:gap-8">
              <span className="font-mono text-sm text-smoke transition-colors duration-300 group-hover:text-ink/60">
                {String(i + 1).padStart(3, "0")}
              </span>
              <div>
                <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-volt transition-colors duration-300 group-hover:text-ink/70">
                  {s.kicker}
                </p>
                <h3 className="font-display text-[clamp(1.7rem,4.5vw,3.6rem)] uppercase leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:text-ink md:group-hover:translate-x-5">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xl text-smoke transition-colors duration-300 group-hover:text-ink/70 md:text-base">
                  {s.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-[11px] tracking-[0.25em] text-smoke transition-colors duration-300 group-hover:text-ink/60 md:block">
                  {s.time}
                </span>
                <Magnetic strength={0.45}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/25 transition-all duration-300 group-hover:border-ink/40 group-hover:bg-ink group-hover:text-volt">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Magnetic>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
