import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { reduceMotion } from './lib/motion';
import Loader from './components/Loader';
import Overlays from './components/Overlays';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);
  const lenis = useRef<Lenis | null>(null);

  // Buttery smooth scrolling; anchor links (#about etc.) glide too.
  useEffect(() => {
    if (reduceMotion) return;
    const l = new Lenis({ lerp: 0.09, anchors: true });
    l.stop();
    lenis.current = l;
    let raf = requestAnimationFrame(function loop(t) {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
    };
  }, []);

  const onLoaded = useCallback(() => {
    document.body.classList.remove('loading');
    lenis.current?.start();
    setTimeout(() => setReady(true), 300);
  }, []);

  return (
    <>
      <Loader onDone={onLoaded} />
      <Overlays />
      <Nav />
      <main id="top">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
