export function areTwoElementsIntersecting(
  el1: HTMLElement,
  el2: HTMLElement,
  padding = 0
) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.right + padding < rect2.left ||
    rect1.left - padding > rect2.right ||
    rect1.bottom + padding < rect2.top ||
    rect1.top - padding > rect2.bottom
  );
}

export function superellipsePathGenerator(n = 2.5, s = 0.85) {
  let d = '';
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * 2 * Math.PI;
    const c = Math.cos(t), si = Math.sin(t);
    const x = 0.5 + s * 0.5 * Math.pow(Math.abs(c), 2 / n) * Math.sign(c);
    const y = 0.5 + s * 0.5 * Math.pow(Math.abs(si), 2 / n) * Math.sign(si);
    d += `${i ? 'L' : 'M'} ${x.toFixed(3)} ${y.toFixed(3)} `;
  }
  return d + 'Z';
}