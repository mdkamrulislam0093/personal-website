import { site } from '../content';
import { useInView } from '../hooks/useInView';
import { RevealHeading } from './Reveal';
import './Services.css';

function ServiceRow({ n, title, desc }: { n: number; title: string; desc: string }) {
  const [ref, inView] = useInView<HTMLAnchorElement>();
  return (
    <a href="#contact" ref={ref} className={`svc__item fade ${inView ? 'in' : ''}`} style={{ transitionDelay: `${n * 0.06}s` }}>
      <span className="svc__n">/{String(n + 1).padStart(2, '0')}</span>
      <span className="svc__title">
        {title}
        <span className="svc__arrow">→</span>
      </span>
      <span className="svc__desc">{desc}</span>
    </a>
  );
}

export default function Services() {
  return (
    <section id="services" className="wrap">
      <div className="label mono">02 — Services</div>
      <RevealHeading className="display" lines={['What I', <em>do best</em>]} />
      <div className="svc">
        {site.services.map((s, i) => (
          <ServiceRow key={s.title} n={i} {...s} />
        ))}
      </div>
    </section>
  );
}
