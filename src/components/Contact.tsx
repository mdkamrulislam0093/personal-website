import { useEffect, useRef } from 'react';
import { site } from '../content';
import { finePointer, mouse, reduceMotion } from '../lib/motion';
import { Fade, RevealHeading } from './Reveal';
import './Contact.css';

/** Big round CTA that leans toward the cursor when it gets close. */
function MagneticButton({ href, children }: { href: string; children: string }) {
  const btn = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer || reduceMotion) return;
    const ZONE = 140;
    const onMove = () => {
      const b = btn.current!.getBoundingClientRect();
      const dx = mouse.x - (b.left + b.width / 2);
      const dy = mouse.y - (b.top + b.height / 2);
      const near = Math.hypot(dx, dy) < b.width / 2 + ZONE;
      btn.current!.style.transform = near ? `translate(${dx * 0.35}px,${dy * 0.35}px)` : '';
      label.current!.style.transform = near ? `translate(${dx * 0.15}px,${dy * 0.15}px)` : '';
    };
    addEventListener('pointermove', onMove);
    return () => removeEventListener('pointermove', onMove);
  }, []);

  return (
    <a href={href} className="magnet" ref={btn}>
      <span ref={label}>{children}</span>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="wrap contact">
      <div className="contact__orb" />
      <div className="label mono contact__label">05 — Contact</div>
      <RevealHeading className="display contact__title" lines={["Let's build", <>something <em>wild.</em></>]} />
      <Fade>
        <p className="contact__sub">
          Have a project in mind? I'm currently taking on new work — let's talk about how to make your website stand out.
        </p>
      </Fade>
      <MagneticButton href={`mailto:${site.email}`}>Say hello ✦</MagneticButton>
      <div className="contact__links mono">
        {site.socials.map((s) => (
          <a key={s.label} href={s.url} {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
            <span>{s.label}</span>
            <span aria-hidden="true">{s.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
