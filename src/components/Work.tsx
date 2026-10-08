import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { site } from '../content';
import { clamp, finePointer, lerp, reduceMotion } from '../lib/motion';
import { RevealHeading } from './Reveal';
import './Work.css';

const MOBILE = 800;

type Project = (typeof site.projects)[number];

function Card({ project, index, cardRef }: { project: Project; index: number; cardRef: (el: HTMLAnchorElement | null) => void }) {
  const tilt = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!finePointer || reduceMotion) return;
    const el = e.currentTarget, b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };

  return (
    <a href={project.url} className="card" ref={cardRef} onMouseMove={tilt} onMouseLeave={(e) => (e.currentTarget.style.transform = '')}>
      <div className={`card__art art-${project.art}`} />
      <span className="card__idx">{String(index + 1).padStart(2, '0')}</span>
      <div className="card__meta">
        <div>
          <p className="mono">
            {project.tag} · {project.year}
          </p>
          <h3>{project.title}</h3>
        </div>
        <span className="card__go">↗</span>
      </div>
    </a>
  );
}

/** Vertical scroll drives a horizontal track; cards lean into the motion. */
export default function Work() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(1);
  const total = site.projects.length;

  useEffect(() => {
    let target = 0, current = 0, raf = 0;

    const size = () => {
      pin.current!.style.height = innerWidth <= MOBILE ? '' : `${track.current!.scrollWidth - innerWidth + innerHeight}px`;
    };

    const onScroll = () => {
      if (innerWidth <= MOBILE) return;
      const r = pin.current!.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight), 0, 1);
      target = -p * (track.current!.scrollWidth - innerWidth);
      setActive(Math.min(total, Math.floor(p * total) + 1));
    };

    const loop = () => {
      current = reduceMotion ? target : lerp(current, target, 0.1);
      if (innerWidth > MOBILE) {
        track.current!.style.transform = `translate3d(${current}px,0,0)`;
        const skew = clamp((target - current) * 0.02, -6, 6);
        for (const c of cards.current) if (c && !c.matches(':hover')) c.style.transform = `skewX(${skew}deg)`;
      } else {
        track.current!.style.transform = '';
      }
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => { size(); onScroll(); };
    size();
    onScroll();
    loop();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
    };
  }, [total]);

  return (
    <section id="work">
      <div className="work__pin" ref={pin}>
        <div className="work__sticky">
          <div className="work__head">
            <div>
              <div className="label mono">03 — Selected work</div>
              <RevealHeading className="display work__title" lines={[<>Featured <em>work</em></>]} />
            </div>
            <div className="mono muted">
              {String(active).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>
          <div className="work__track" ref={track}>
            {site.projects.map((p, i) => (
              <Card key={p.title} project={p} index={i} cardRef={(el) => (cards.current[i] = el)} />
            ))}
            <div className="work__end">
              Your project
              <br />
              could be next →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
