# PULSE — The World, In Motion

A motion-driven digital news/magazine concept site. Dark, typography-led,
and built around movement: kinetic headlines, a live particle flow-field,
velocity-reactive tickers, and scroll-choreographed sections throughout.

The active reading edition now uses seven published GatorBait stories from the official RSS feed, captured October 4, 2026 ET. Original titles, dates and writer credits are preserved. Story cards open the original Wix articles, including their existing subscriber access. The source photograph is decorative beside its associated headline; confirmed photo credits are displayed where available. No author portraits or fabricated writer profiles.

This is a private, non-indexable review edition. Content is a fixed snapshot, not an automatic feed or CMS connection. The main GatorBait site is unchanged. Placeholder components remain in source for reference but are not mounted. The demo newsletter form is not used; subscription links go to the existing GatorBait plan page.

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
npm start        # serve the exported production build
```

## Hosting

`npm run build` exports the site to `out/`. It can be hosted as static files; no site credentials or environment variables are required. The separate private review uses Sites, with its identity in `.openai/hosting.json`. Keep noindex until editorial and device review approve publication.

## Checks

October 4, 2026: lint, TypeScript and static production build pass. Browser preview is not verified in this environment because its supervised preview requires Vite flags that Next.js does not accept. Responsive CSS is implemented, not a substitute for a phone render. The underlying GatorBait articles are linked rather than copied. No analytics or automated refresh is connected.

## Editorial evidence

- `content/stories.json`: exact article URLs, original bylines and published dates, source feed and capture timestamp.
- https://www.gatorbaitmedia.com/blog-feed.xml
- Photo credits checked against Loren’s Week 5 preview, Buddy’s “Hey Missouri” column and Franz’s “The Soothsayer.” Other source images have no confirmed photographer credit in the retrieved page text; none invented.
- Full show links use the existing GatorBait show page and verified Buddy Martin Show playlist.

Original import: `c3b61d27274179a340b4fb069e5ff0ff40744b06`. Code-check cleanup: `00486dc72215580e85d65b0ae9b98927717c387c`.

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
implementations; published GatorBait editorial text and photographs retain their existing rights and are not relicensed by the code license.
