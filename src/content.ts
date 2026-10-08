// Everything you'll want to edit lives here.

export type ArtStyle = 'rings' | 'grid' | 'blobs' | 'checker' | 'orb';

export const site = {
  name: 'Kamrul',
  /** Word drawn by the particle field in the hero. Keep it short (≤ 8 chars). */
  heroWord: 'KAMRUL',
  tagline: ['Web developer & digital craftsman — ', 'building websites that ', 'move.'],
  available: 'Available for freelance',
  location: 'Bangladesh',
  timeZone: 'Asia/Dhaka',
  timeZoneLabel: 'GMT+6',
  email: 'devstalldeveloper@gmail.com',

  marquee: ['WordPress', 'Shopify', 'Animation', 'Front-end', 'UI Design'],

  /** Wrap words in *asterisks* to highlight them in the accent colour. */
  about:
    "I'm Kamrul — a developer who believes a website should feel *alive.* I turn ideas into fast, *pixel-perfect* experiences on WordPress, Shopify and modern front-end stacks. Every scroll, hover and transition is designed to make your brand *unforgettable* — and to turn visitors into *customers.*",

  stats: [
    { value: 120, suffix: '+', label: 'Projects shipped' },
    { value: 6, suffix: 'yrs', label: 'Of experience' },
    { value: 98, suffix: '%', label: 'Client satisfaction' },
    { value: 30, suffix: '+', label: 'Countries served' },
  ],

  services: [
    { title: 'WordPress Development', desc: 'Custom themes, Elementor & Gutenberg builds, speed optimisation and rock-solid security.' },
    { title: 'Shopify Stores', desc: 'High-converting storefronts, custom sections, theme tweaks and app integrations.' },
    { title: 'Design to Code', desc: 'Figma, Lovable or AI-built designs turned into clean, editable, production sites.' },
    { title: 'Motion & Interaction', desc: 'Scroll stories, micro-interactions and animation that make brands memorable.' },
  ],

  projects: [
    { title: 'Lumen Skincare', tag: 'Shopify', year: 2026, art: 'rings', url: '#contact' },
    { title: 'Neon Agency', tag: 'WordPress', year: 2026, art: 'grid', url: '#contact' },
    { title: 'Oak & Ember Studio', tag: 'Figma → WP', year: 2025, art: 'blobs', url: '#contact' },
    { title: 'Grid Labs', tag: 'Front-end', year: 2025, art: 'checker', url: '#contact' },
    { title: 'Orbit Launch', tag: 'Motion', year: 2025, art: 'orb', url: '#contact' },
  ] satisfies { title: string; tag: string; year: number; art: ArtStyle; url: string }[],

  process: [
    { title: 'Discover', desc: 'Understand your goals, audience and what success looks like.' },
    { title: 'Design', desc: 'Shape layouts, motion and a visual language unique to you.' },
    { title: 'Develop', desc: 'Build fast, responsive and SEO-ready with clean code.' },
    { title: 'Launch', desc: 'Test, ship and support — your site keeps performing.' },
  ],

  skills: ['WordPress', 'Shopify', 'Elementor', 'WooCommerce', 'Liquid', 'PHP', 'JavaScript', 'GSAP', 'React', 'Tailwind', 'Figma', 'SEO', 'Core Web Vitals'],

  socials: [
    { label: 'Email', url: 'mailto:devstalldeveloper@gmail.com' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Upwork', url: '#' },
    { label: 'GitHub', url: '#' },
  ],
};
