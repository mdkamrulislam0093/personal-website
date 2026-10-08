import { useEffect, useRef, useState } from 'react';
import { reduceMotion } from '../lib/motion';
import { site } from '../content';
import './Loader.css';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let n = 0;
    let timer: number;
    const tick = () => {
      // Eases toward 100: fast at first, savouring the last few percent.
      n = Math.min(100, n + Math.max(1, Math.round((100 - n) * 0.08)));
      setCount(n);
      if (n < 100) timer = window.setTimeout(tick, reduceMotion ? 0 : 28);
      else
        timer = window.setTimeout(() => {
          setDone(true);
          onDoneRef.current();
        }, 250);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${done ? 'done' : ''}`} aria-hidden="true">
      <div className="mono">{site.name} / Portfolio ©{new Date().getFullYear()}</div>
      <div>
        <div className="loader__count">{count}</div>
        <div className="loader__bar">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
}
