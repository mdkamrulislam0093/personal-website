import { useEffect, useRef } from 'react';
import { finePointer, lerp, mouse } from '../lib/motion';
import './Overlays.css';

const HOVERABLE = 'a, button, .chip, .step';

/** Film grain, scroll progress bar and the blend-mode cursor. */
export default function Overlays() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current!.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    let rx = -9999, ry = -9999, raf = 0;
    const loop = () => {
      if (rx < -5000) { rx = mouse.x; ry = mouse.y; }
      rx = lerp(rx, mouse.x, 0.15);
      ry = lerp(ry, mouse.y, 0.15);
      ring.current!.style.transform = `translate(${rx}px,${ry}px)`;
      dot.current!.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element).closest?.(HOVERABLE);
      ring.current!.classList.toggle('hover', !!hit);
    };
    document.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="progress" ref={bar} aria-hidden="true" />
      <div className="cursor" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
