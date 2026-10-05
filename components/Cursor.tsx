"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a volt dot that tracks the pointer exactly, plus a lerped
 * ring that morphs into a labeled badge over [data-cursor] elements.
 * Disabled on coarse pointers and when reduced motion is preferred.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("no-native-cursor");
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (t) {
        if (label.current)
          label.current.textContent = t.getAttribute("data-cursor") ?? "";
        ringEl.classList.add("cursor-active");
      } else {
        ringEl.classList.remove("cursor-active");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dotEl.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("no-native-cursor");
      ringEl.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
        aria-hidden="true"
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt" />
      </div>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
        aria-hidden="true"
      >
        <div
          id="cursor-ring"
          className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40"
        >
          <span className="cursor-label-text font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink opacity-0 transition-opacity duration-200" ref={label} />
        </div>
      </div>
    </>
  );
}
