import { site } from '../content';
import { Fade } from './Reveal';
import './Process.css';

const NUMERALS = ['i.', 'ii.', 'iii.', 'iv.', 'v.', 'vi.'];

export default function Process() {
  return (
    <section className="wrap">
      <div className="label mono">04 — Process</div>
      <div className="steps">
        {site.process.map((s, i) => (
          <Fade key={s.title} className="step" delay={i * 0.08}>
            <div className="step__n">{NUMERALS[i]}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Fade>
        ))}
      </div>
      <Fade className="chips">
        {site.skills.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </Fade>
    </section>
  );
}
