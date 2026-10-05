"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Animated preloader: brand letters rise in, a 000→100 counter runs,
 * then ink + volt panels sweep away to reveal the page.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  useLayoutEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doneRef.current();
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const num = el.querySelector(".pl-num");
      const tl = gsap.timeline({ onComplete: () => doneRef.current() });

      tl.from(".pl-letter", {
        yPercent: 120,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
      })
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (num)
                num.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          "-=0.35"
        )
        .to(".pl-letter", {
          yPercent: -120,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.in",
        })
        .to(
          ".pl-panel",
          { yPercent: -100, duration: 0.9, ease: "power4.inOut", stagger: 0.09 },
          "-=0.15"
        )
        .set(el, { display: "none" });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-hidden="true">
      {/* volt flash panel (behind) */}
      <div className="pl-panel absolute inset-0 bg-volt" />
      {/* ink panel (front) */}
      <div className="pl-panel absolute inset-0 flex flex-col items-center justify-center gap-8 bg-ink">
        <div className="overflow-hidden px-4">
          <div className="flex items-start">
            {"PULSE".split("").map((c, i) => (
              <span
                key={i}
                className="pl-letter inline-block font-display text-[22vw] leading-none text-bone md:text-[11rem]"
              >
                {c}
              </span>
            ))}
            <span className="pl-letter mt-[3vw] ml-3 inline-block h-[4.5vw] w-[4.5vw] rounded-full bg-volt md:mt-6 md:h-10 md:w-10" />
          </div>
        </div>
        <div className="flex items-center gap-5 font-mono text-xs tracking-[0.3em] text-smoke">
          <span>TUNING SIGNAL</span>
          <span className="pl-num text-2xl tracking-normal text-volt">000</span>
        </div>
      </div>
    </div>
  );
}
