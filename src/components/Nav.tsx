import { useRef, useState } from 'react';
import { site } from '../content';
import './Nav.css';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** Link whose letters scramble and resolve on hover. */
function ScrambleLink({ href, label }: { href: string; label: string }) {
  const [text, setText] = useState(label);
  const raf = useRef(0);

  const scramble = () => {
    cancelAnimationFrame(raf.current);
    let frame = 0;
    const run = () => {
      setText(label.split('').map((c, i) => (i < frame / 2 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''));
      if (frame++ < label.length * 2) raf.current = requestAnimationFrame(run);
      else setText(label);
    };
    run();
  };

  return (
    <a className="nav__link" href={href} onMouseEnter={scramble} aria-label={label}>
      {text}
    </a>
  );
}

const LINKS = ['About', 'Services', 'Work', 'Contact'];

export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav__logo">
        <i />
        {site.name.toLowerCase()}.
      </a>
      <ul>
        {LINKS.map((l) => (
          <li key={l}>
            <ScrambleLink href={`#${l.toLowerCase()}`} label={l} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
