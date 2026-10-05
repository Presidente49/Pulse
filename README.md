# PULSE — The World, In Motion

A motion-driven digital news/magazine concept site. Dark, typography-led,
and built around movement: kinetic headlines, a live particle flow-field,
velocity-reactive tickers, and scroll-choreographed sections throughout.

All editorial content is original placeholder copy (tech / culture / science —
no sports). Every visual is generated in code (canvas, WebGL-style CSS, SVG);
there are zero image dependencies.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **GSAP 3 + ScrollTrigger** — 100% free for all use (incl. commercial) since
  Webflow's 2024 license change
- **Lenis** (MIT) — buttery smooth scrolling, wired into GSAP's ticker
- **Lucide** icons (ISC)

## Quickstart

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — the defaults are correct (Next.js preset).
3. Done. No environment variables required.

## Motion systems

| System | Where | Notes |
|---|---|---|
| Preloader | `components/Preloader.tsx` | 000→100 counter, ink + volt curtain lift |
| Flow-field canvas | `components/Hero.tsx` | ~430 particles on a noise vector field, pointer repulsion, DPR-aware, pauses off-screen |
| Kinetic type | `components/Hero.tsx` | character-by-character headline reveal |
| Velocity ticker | `components/Ticker.tsx` | infinite marquee; scroll velocity feeds playback rate |
| Horizontal features | `components/Features.tsx` | pinned ScrollTrigger scrub gallery |
| Scrub manifesto | `components/Topics.tsx` | word-by-word opacity scrub |
| Custom cursor | `components/Cursor.tsx` | lerped ring, morphs into labeled badge on `[data-cursor]` |
| Magnetic UI | `components/Magnetic.tsx` | pointer-gravity buttons/links with elastic release |
| Generative card art | `components/CardArt.tsx` | mesh / rings / wave / grid — pure CSS motion |

Accessibility: every system checks `prefers-reduced-motion` and renders a
static, fully readable fallback. The custom cursor only activates on fine
pointers.

## Project structure

```
app/
  layout.tsx      # fonts (Anton / Space Grotesk / JetBrains Mono), metadata
  page.tsx        # composition + preloader gating
  globals.css     # Tailwind v4 theme tokens, cursor states, keyframes
components/       # one file per motion system / section
lib/
  scrollState.ts  # shared mutable scroll velocity
  useReducedMotion.ts
```

## License

Original code in this repo is MIT. Motion techniques are original
implementations; headlines and copy are original placeholder text.
