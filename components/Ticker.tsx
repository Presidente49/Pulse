"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { scrollState } from "@/lib/scrollState";

const ITEMS = [
  "PHOTONIC CHIPS LEAVE ELECTRONS BEHIND",
  "CITIES ARE LEARNING TO EXHALE",
  "THE OCEAN GOT A NERVOUS SYSTEM",
  "SLOW SOFTWARE'S QUIET REBELLION",
  "WEATHER, COMPOSED FOR ORCHESTRA",
  "BATTERIES THAT DRINK THE NIGHT",
  "THE MUSEUM OF OBSOLETE FUTURES",
  "MYCELIUM NETWORKS UNDER NEGOTIATION",
  "CODE AS CALLIGRAPHY",
  "THE ARCHIVISTS SAVING THE INTERNET",
  "CONCRETE THAT HEALS ITS OWN CRACKS",
  "A SATELLITE LEARNED TO WHISPER",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-6 font-mono text-sm tracking-[0.18em] text-bone/85">
            {item}
          </span>
          <span className="h-2 w-2 rotate-45 bg-volt" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite news ticker. Scroll velocity feeds the playback rate —
 * scroll hard and the headlines fly.
 */
export default function Ticker() {
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 26,
      repeat: -1,
    });

    const tick = () => {
      const v = Math.abs(scrollState.velocity);
      tween.timeScale(1 + Math.min(v * 0.22, 5));
      scrollState.velocity *= 0.92; // decay between scroll events
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      tween.kill();
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-ink py-4">
      <div className="mask-fade-x overflow-hidden">
        <div ref={track} className="flex w-max will-change-transform">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}
