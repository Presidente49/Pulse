"use client";

import { Rss, AtSign, Podcast } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const SECTIONS = ["Latest", "Features", "Topics", "Dispatch"];
const SOCIALS = [
  { icon: Rss, label: "RSS" },
  { icon: AtSign, label: "Social" },
  { icon: Podcast, label: "Podcast" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 px-5 pb-8 pt-16 md:px-10 md:pt-24">
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-3xl tracking-wide">PULSE</span>
            <span className="h-3 w-3 rounded-full bg-volt" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-smoke">
            A motion-driven news concept. Technology, culture, and science —
            reported at the speed of change.
          </p>
        </div>

        <div className="flex gap-16 md:gap-24">
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-smoke">
              SECTIONS
            </p>
            <ul className="space-y-3">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <Magnetic strength={0.3}>
                    <a
                      href={`#${s.toLowerCase()}`}
                      data-cursor="GO"
                      className="text-bone/80 transition-colors hover:text-volt"
                    >
                      {s}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-smoke">
              FOLLOW
            </p>
            <ul className="space-y-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Magnetic strength={0.3}>
                    <a
                      href="#top"
                      onClick={(e) => e.preventDefault()}
                      data-cursor="GO"
                      className="flex items-center gap-2 text-bone/80 transition-colors hover:text-volt"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="mt-16 select-none overflow-hidden md:mt-24" aria-hidden="true">
        <div className="text-outline whitespace-nowrap font-display text-[24vw] uppercase leading-[0.85] md:text-[21vw]">
          PULSE<span className="text-volt" style={{ WebkitTextStroke: "0" }}>.</span>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-bone/10 pt-6 font-mono text-[11px] tracking-[0.25em] text-smoke md:flex-row md:items-center md:justify-between">
        <span>© 2026 PULSE — A CONCEPT EDITION</span>
        <span>
          ALL STORIES ARE ORIGINAL PLACEHOLDERS ·{" "}
          <span className="text-volt">DESIGNED IN MOTION</span>
        </span>
      </div>
    </footer>
  );
}
