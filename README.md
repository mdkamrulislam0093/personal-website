# Personal Profile

Animated one-page portfolio built with **Vite + React + TypeScript** and **Lenis** smooth scrolling.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Edit your content

Everything personal (name, tagline, stats, services, projects, skills, social links) lives in
[`src/content.ts`](src/content.ts). Change it there; no component edits needed.

## Structure

```
src/
  content.ts            ← your text & links
  App.tsx               ← page layout + Lenis smooth scroll
  lib/motion.ts         ← shared pointer, easing helpers, reduced-motion flag
  hooks/useInView.ts    ← scroll-reveal trigger
  components/
    Loader              ← 0→100 preloader that wipes away
    Overlays            ← grain, progress bar, blend-mode cursor
    Nav                 ← scramble-on-hover links
    Hero/ParticleName   ← particle name that scatters from the cursor
    Marquee, About, Services, Work (horizontal scroll), Process, Contact (magnetic CTA), Footer
  styles/global.css     ← design tokens & shared primitives
```

Deploy the `dist/` folder to Netlify, Vercel, Cloudflare Pages or any static host.
