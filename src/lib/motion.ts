export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(hover: hover)').matches;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Live pointer position shared by every animated component (off-screen until first move). */
export const mouse = { x: -9999, y: -9999 };

window.addEventListener('pointermove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('pointerup', (e) => {
  // Touch has no hover: release the "cursor" so particles reassemble.
  if (e.pointerType !== 'mouse') mouse.x = mouse.y = -9999;
});
