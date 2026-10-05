"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap } from "lucide-react";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

/** Newsletter CTA with magnetic submit and a success state. */
export default function Newsletter() {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".nl-line", {
        yPercent: 110,
        duration: 1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.from(".nl-form", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 60%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  return (
    <section ref={root} id="dispatch" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-44">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(204,255,0,0.6), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-8 font-mono text-[11px] tracking-[0.3em] text-volt">
          THE DISPATCH
        </p>
        <h2 className="font-display uppercase leading-[0.9]">
          {["NEVER MISS", "A SIGNAL."].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.05em]">
              <span className="nl-line block text-[clamp(3rem,10vw,8.5rem)]">
                {line}
              </span>
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-smoke">
          One dispatch. Every morning. Zero noise — just the signals that matter.
        </p>

        {!done ? (
          <form onSubmit={submit} className="nl-form mx-auto mt-10 max-w-xl" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@frequency.com"
                aria-label="Email address"
                className={`w-full flex-1 rounded-full border bg-coal/60 px-6 py-4 font-mono text-sm text-bone placeholder:text-smoke/60 outline-none transition-colors focus:border-volt ${
                  error ? "border-red-500" : "border-bone/20"
                }`}
              />
              <Magnetic strength={0.3}>
                <button
                  type="submit"
                  data-cursor="JOIN"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-volt px-8 py-4 font-mono text-sm font-medium tracking-[0.2em] text-ink transition-transform duration-300 hover:scale-[1.03] sm:w-auto"
                >
                  <Zap className="h-4 w-4" />
                  PLUG IN
                </button>
              </Magnetic>
            </div>
            {error && (
              <p className="mt-3 font-mono text-xs tracking-widest text-red-400">
                THAT FREQUENCY DOESN&apos;T SCAN — TRY AGAIN.
              </p>
            )}
          </form>
        ) : (
          <div className="nl-form mx-auto mt-10 max-w-xl rounded-2xl border border-volt/40 bg-volt/10 px-8 py-6">
            <p className="font-display text-2xl uppercase text-volt">
              Demo complete.
            </p>
            <p className="mt-2 font-mono text-xs tracking-[0.25em] text-bone/70">
              SIGNUP IS NOT CONNECTED YET. YOUR EMAIL HAS NOT BEEN SUBSCRIBED.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
