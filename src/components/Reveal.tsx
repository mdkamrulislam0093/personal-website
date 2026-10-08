import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

/** Fades and lifts its children in when scrolled into view. */
export function Fade({ children, className = '', delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`fade ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/** Heading whose lines slide up from behind a mask, one after another. */
export function RevealHeading({ lines, className = '' }: { lines: ReactNode[]; className?: string }) {
  const [ref, inView] = useInView<HTMLHeadingElement>();
  return (
    <h2 ref={ref} className={`${className} ${inView ? 'in' : ''}`}>
      {lines.map((line, i) => (
        <span className="reveal" key={i}>
          <span style={{ transitionDelay: `${i * 0.12}s` }}>{line}</span>
        </span>
      ))}
    </h2>
  );
}
