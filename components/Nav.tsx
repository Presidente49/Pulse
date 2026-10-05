"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Magnetic from "@/components/Magnetic";

const LINKS = ["Latest", "Features", "Show"];

/** Fixed nav with difference blending so it reads over any background. */
export default function Nav({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);
  const shown = useRef(false);

  useLayoutEffect(() => {
    if (!started || shown.current) return;
    shown.current = true;
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(el, { yPercent: -110, duration: 0.9, ease: "power3.out", delay: 0.2 });
    }, el);
    return () => ctx.revert();
  }, [started]);

  return (
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-[80] mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-5 py-5 text-white md:px-10">
        <Magnetic strength={0.4}>
          <a href="#top" className="flex items-center gap-2" data-cursor="TOP">
            <span className="font-display text-2xl tracking-wide">PULSE</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ccff00]" />
          </a>
        </Magnetic>
        <div className="flex items-center gap-3 md:gap-8">
          {LINKS.map((l) => (
            <Magnetic key={l} strength={0.3}>
              <a
                href={`#${l.toLowerCase()}`}
                data-cursor="GO"
                className="font-mono text-xs tracking-wide text-white/70 transition-colors hover:text-white"
              >
                {l.toUpperCase()}
              </a>
            </Magnetic>
          ))}
        </div>
        <div className="hidden md:block font-mono text-xs tracking-wide text-white/70">
          GATORBAIT
        </div>
      </nav>
    </header>
  );
}
