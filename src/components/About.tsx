import { useEffect, useMemo, useRef, useState } from 'react';
import { site } from '../content';
import { clamp } from '../lib/motion';
import { useInView } from '../hooks/useInView';
import { Fade } from './Reveal';
import './About.css';

function Counter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.6, '0px');
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now(), dur = 1800;
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <Fade className="stat" delay={delay}>
      <div className="stat__num" ref={ref}>
        {n}
        <sup>{suffix}</sup>
      </div>
      <p>{label}</p>
    </Fade>
  );
}

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  const words = useMemo(
    () => site.about.split(' ').map((w) => ({ word: w.replace(/\*/g, ''), hl: w.startsWith('*') })),
    [],
  );

  // Words light up one by one as the paragraph scrolls through the viewport.
  useEffect(() => {
    const onScroll = () => {
      const r = textRef.current!.getBoundingClientRect();
      const k = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3), 0, 1);
      setLit(Math.floor(k * words.length));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [words.length]);

  return (
    <section id="about" className="wrap">
      <div className="label mono">01 — About</div>
      <div className="about__grid">
        <Fade className="portrait">
          <div className="portrait__blob" />
          <div className="portrait__inner">
            <span className="mono">Hello, I'm</span>
            <div className="portrait__initial">
              {site.name[0]}
              <em>.</em>
            </div>
            <span className="mono">Dev / Designer</span>
          </div>
        </Fade>

        <div>
          <p className="about__text" ref={textRef}>
            {words.map(({ word, hl }, i) => (
              <span key={i} className={`w ${hl ? 'hl' : ''} ${i < lit ? 'lit' : ''}`}>
                {word}{' '}
              </span>
            ))}
          </p>

          <div className="stats">
            {site.stats.map((s, i) => (
              <Counter key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
