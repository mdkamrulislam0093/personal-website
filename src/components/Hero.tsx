import { useEffect, useRef, useState } from 'react';
import { site } from '../content';
import { reduceMotion } from '../lib/motion';
import ParticleName from './ParticleName';
import './Hero.css';

function useClock() {
  const fmt = () =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timeZone });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero({ ready }: { ready: boolean }) {
  const time = useClock();
  const tagRef = useRef<HTMLHeadingElement>(null);

  // Tagline drifts slower than the page for a touch of parallax.
  useEffect(() => {
    if (reduceMotion) return;
    const onScroll = () => {
      if (scrollY < innerHeight * 1.2) tagRef.current!.style.transform = `translateY(${scrollY * 0.35}px)`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const [t1, t2, t3] = site.tagline;

  return (
    <header className={`hero ${ready ? 'ready' : ''}`}>
      <div className="hero__glow" />
      <ParticleName text={site.heroWord} assembled={ready} />
      <h1 className="hero__tag" ref={tagRef}>
        <span className="sr-only">{site.name} — </span>
        <span>{t1}</span>
        <span>
          &nbsp;{t2}
          <em>{t3}</em>
        </span>
      </h1>
      <div className="hero__bottom">
        <div className="hero__status mono">
          <b />
          {site.available}
        </div>
        <div className="hero__scroll mono">
          Scroll
          <i />
        </div>
        <div className="mono muted">
          Based in {site.location} · {time} {site.timeZoneLabel}
        </div>
      </div>
    </header>
  );
}
