"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["GATORBAIT,", "IN MOTION"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  a: number;
  volt: boolean;
};

/**
 * Full-bleed canvas: a flow-field particle system. Particles ride a
 * pseudo-noise vector field, scatter away from the pointer, and respawn.
 * Pauses off-screen / when the tab hides. One static frame when reduced
 * motion is preferred.
 */
function useFlowField(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let parts: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const spawn = (anywhere = false): Particle => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 12,
      vx: 0,
      vy: 0,
      s: Math.random() * 1.9 + 0.6,
      a: Math.random() * 0.5 + 0.15,
      volt: Math.random() < 0.78,
    });

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(430, Math.floor((w * h) / 3200));
      parts = Array.from({ length: n }, () => spawn(true));
    };

    const field = (x: number, y: number, t: number) => {
      const s = 0.0016;
      return (
        Math.sin(x * s * 3 + t * 0.55) +
        Math.cos(y * s * 2.4 - t * 0.4) +
        Math.sin((x + y) * s * 1.2 + t * 0.22)
      );
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        const ang = field(p.x, p.y, t) * Math.PI;
        p.vx += Math.cos(ang) * 0.055;
        p.vy += Math.sin(ang) * 0.055;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 19600 && d2 > 1) {
          const d = Math.sqrt(d2);
          p.vx += (dx / d) * 1.1;
          p.vy += (dy / d) * 1.1;
        }

        p.vx *= 0.955;
        p.vy *= 0.955;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -24 || p.x > w + 24 || p.y < -24 || p.y > h + 24) {
          Object.assign(p, spawn());
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = p.volt
          ? `rgba(204, 255, 0, ${(p.a * 0.5).toFixed(3)})`
          : `rgba(244, 244, 238, ${(p.a * 0.28).toFixed(3)})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (ms: number) => {
      if (!running) return;
      draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        const vis = entry.isIntersecting && !document.hidden;
        if (vis && !running && !reduced) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!vis) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVis);
    io.observe(canvas);

    if (reduced) {
      draw(4.2); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [canvasRef]);
}

export default function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introPlayed = useRef(false);

  useFlowField(canvasRef);

  // Kinetic headline intro, fired once the preloader lifts.
  useLayoutEffect(() => {
    if (!started || introPlayed.current) return;
    introPlayed.current = true;
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-char", { yPercent: 118, duration: 1.1, stagger: 0.022 }, 0.1)
        .from(".hero-meta", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.5)
        .from(".hero-foot", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.9)
        .from(".hero-canvas", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0);
    }, el);
    return () => ctx.revert();
  }, [started]);

  // Gentle parallax on scroll.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-inner", {
        yPercent: 14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[65svh] overflow-hidden">
      {/* animated background */}
      <div className="hero-canvas absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
        {/* drifting gradient blobs behind the particles */}
        <div
          className="pointer-events-none absolute -left-[10%] top-[-15%] h-[60vmax] w-[60vmax] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(204,255,0,0.5), transparent 65%)",
            animation: "drift-a 16s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[55vmax] w-[55vmax] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(110,80,255,0.55), transparent 65%)",
            animation: "drift-b 19s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
      </div>

      <div className="hero-inner relative z-10 flex min-h-[65svh] flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-10">
        <div className="mb-6 flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-smoke md:mb-8">
          <span className="hero-meta">GATORBAIT MEDIA</span>
          <span className="hero-meta h-1 w-1 rounded-full bg-volt" />
          <span className="hero-meta">OCT 2026</span>
          <span className="hero-meta h-1 w-1 rounded-full bg-volt" />
          <span className="hero-meta text-volt">READ THE STORIES</span>
        </div>

        <h1 className="font-display uppercase leading-[0.88] tracking-tight">
          {LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.06em]">
              <span className="block">
                {line.split("").map((c, ci) => (
                  <span
                    key={ci}
                    className="hero-char inline-block text-[clamp(2.8rem,12vw,10rem)]"
                  >
                    {c === " " ? "\u00A0" : c}
                    {li === 1 && ci === line.length - 1 && (
                      <span className="text-volt">.</span>
                    )}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="hero-foot max-w-md text-base leading-relaxed text-bone/70 md:text-lg">
            Florida Gators reporting, independent voices and the conversations that matter.
          </p>
          <div className="hero-foot flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-smoke">
            <span>SCROLL</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25">
              <ArrowDown className="h-4 w-4 animate-bounce text-volt" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
