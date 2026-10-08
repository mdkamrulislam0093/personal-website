import { useEffect, useRef } from 'react';
import { mouse, reduceMotion } from '../lib/motion';

type Particle = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; hot: boolean; r: number };

const COLORS = { base: '#f1ede4', fast: '#d4ff3a', hot: '#ff5b2e' };

/**
 * Renders `text` as a field of particles. They drift until `assembled`,
 * then spring into the letters and scatter away from the pointer.
 */
export default function ParticleName({ text, assembled }: { text: string; assembled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const assembledRef = useRef(assembled);
  assembledRef.current = assembled;

  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    let W = 0, H = 0, raf = 0, resizeTimer = 0;
    let pts: Particle[] = [];

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw the word offscreen and sample its opaque pixels as targets.
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const o = off.getContext('2d', { willReadFrequently: true })!;
      let size = Math.min(W * 0.2, 260);
      o.font = `800 ${size}px Syne, sans-serif`;
      const tw = o.measureText(text).width;
      if (tw > W * 0.9) {
        size *= (W * 0.9) / tw;
        o.font = `800 ${size}px Syne, sans-serif`;
      }
      o.fillStyle = '#fff';
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillText(text, W / 2, H * 0.44);

      const data = o.getImageData(0, 0, W, H).data;
      const gap = W < 600 ? 3 : 5;
      const targets: [number, number][] = [];
      for (let y = 0; y < H; y += gap)
        for (let x = 0; x < W; x += gap) if (data[(y * W + x) * 4 + 3] > 128) targets.push([x, y]);

      const old = pts;
      pts = targets.map(([tx, ty], i) => {
        const p = old[i] ?? { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0 };
        return { ...p, tx, ty, hot: Math.random() < 0.12, r: Math.random() * 1.2 + 0.9 };
      });
      if (reduceMotion) pts.forEach((p) => { p.x = p.tx; p.y = p.ty; });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const rect = cv.getBoundingClientRect();
      const mx = mouse.x - rect.left, my = mouse.y - rect.top;
      const R = Math.max(90, W * 0.08);
      const settled = assembledRef.current;

      for (const p of pts) {
        if (settled) {
          const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1, f = ((R - d) / R) * 6;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
          p.vx += (p.tx - p.x) * 0.06;
          p.vy += (p.ty - p.y) * 0.06;
        } else {
          p.vx += (Math.random() - 0.5) * 0.3;
          p.vy += (Math.random() - 0.5) * 0.3;
        }
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        const speed = Math.abs(p.vx) + Math.abs(p.vy);
        ctx.fillStyle = p.hot ? COLORS.hot : speed > 0.4 ? COLORS.fast : COLORS.base;
        ctx.fillRect(p.x, p.y, p.r, p.r);
      }
      // Skip work while the hero is scrolled out of view.
      raf = requestAnimationFrame(rect.bottom > 0 ? draw : idle);
    };
    const idle = () => {
      raf = requestAnimationFrame(cv.getBoundingClientRect().bottom > 0 ? draw : idle);
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 200);
    };

    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      build();
      draw();
    });
    addEventListener('resize', onResize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      removeEventListener('resize', onResize);
    };
  }, [text]);

  return <canvas ref={canvasRef} className="hero__canvas" role="img" aria-label={text} />;
}
