"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import CardArt, { type ArtVariant } from "@/components/CardArt";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const FEATURES: { kicker: string; title: string; excerpt: string; art: ArtVariant }[] = [
  {
    kicker: "ENERGY",
    title: "Batteries That Drink the Night",
    excerpt:
      "A new class of cells charges on ambient heat after dark — and it could unplug the grid's worst hours.",
    art: "mesh",
  },
  {
    kicker: "DESIGN",
    title: "The Museum of Obsolete Futures",
    excerpt:
      "Flying cars, video phones, the paperless office: an exhibition of everything tomorrow got wrong.",
    art: "rings",
  },
  {
    kicker: "CRAFT",
    title: "Code as Calligraphy",
    excerpt:
      "A generation of engineers is treating software like letterforms — and the results are beautiful.",
    art: "wave",
  },
  {
    kicker: "SCIENCE",
    title: "The Ocean Got a Nervous System",
    excerpt:
      "Forty thousand drifting sensors now feel the sea breathe. Here's what they're telling us.",
    art: "grid",
  },
];

/**
 * Pinned horizontal-scroll gallery of featured long-form stories.
 * Falls back to a vertical stack when reduced motion is preferred.
 */
export default function Features() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const getDistance = () => Math.max(0, tr.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(tr, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="features" className="relative overflow-hidden bg-coal/40">
      <div className="flex min-h-svh flex-col justify-center py-20 md:py-0">
        <div className="mb-10 flex items-end justify-between px-5 md:mb-14 md:px-10">
          <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] uppercase leading-none">
            Deep <span className="text-outline">Dives</span>
          </h2>
          <span className="hidden font-mono text-[11px] tracking-[0.3em] text-smoke md:block">
            KEEP SCROLLING →
          </span>
        </div>

        <div
          ref={track}
          className="flex w-max flex-col gap-10 px-5 md:flex-row md:items-stretch md:gap-8 md:px-[6vw]"
        >
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              data-cursor="READ"
              className="group w-[86vw] shrink-0 md:w-[46vw] lg:w-[40vw]"
            >
              <div className="relative h-[34vh] overflow-hidden rounded-2xl md:h-[40vh]">
                <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                  <CardArt variant={f.art} />
                </div>
                <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.3em] text-ink">
                  <span className="rounded-full bg-volt px-3 py-1.5">{f.kicker}</span>
                </span>
                <span className="absolute bottom-5 right-5 font-display text-6xl text-bone/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] uppercase leading-[0.95] transition-colors duration-300 group-hover:text-volt">
                {f.title}
              </h3>
              <p className="mt-3 max-w-md text-smoke">{f.excerpt}</p>
              <Magnetic strength={0.4} className="mt-5">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-bone/80">
                  READ THE STORY
                  <ArrowUpRight className="h-4 w-4 text-volt transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Magnetic>
            </article>
          ))}

          <div className="flex w-[70vw] shrink-0 items-center justify-center md:w-[30vw]">
            <p className="max-w-[16rem] text-center font-mono text-[11px] leading-relaxed tracking-[0.3em] text-smoke">
              MORE SIGNALS
              <br />
              INCOMING —
              <br />
              <span className="text-volt">STAY TUNED</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
