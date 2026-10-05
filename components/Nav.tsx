"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Magnetic from "@/components/Magnetic";

const LINKS = ["Latest", "Features", "Topics", "Dispatch"];

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
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Magnetic key={l} strength={0.3}>
              <a
                href={`#${l.toLowerCase()}`}
                data-cursor="GO"
                className="font-mono text-[11px] tracking-[0.3em] text-white/70 transition-colors hover:text-white"
              >
                {l.toUpperCase()}
              </a>
            </Magnetic>
          ))}
        </div>
        <div className="font-mono text-[11px] tracking-[0.3em] text-white/70">
          ED.042
        </div>
      </nav>
    </header>
  );
}
