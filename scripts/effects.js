// Ambient background motion — a few slow drifting thread-curls, deliberately
// sparse and slow so the page stays calm rather than busy.

const THREAD_SVG = `
  <svg viewBox="0 0 40 40" width="100%" height="100%">
    <path d="M4,20 C4,8 16,4 20,12 C24,20 12,24 16,32 C19,38 28,36 30,28"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
`;

export function startThreadDrift() {
  const layer = document.getElementById('hearts');

  function spawnThread() {
    const el = document.createElement('span');
    el.className = 'thread-drift';
    el.innerHTML = THREAD_SVG;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.width = el.style.height = (28 + Math.random() * 20) + 'px';
    const roll = Math.random();
    el.style.color = roll > .85 ? 'var(--rose)' : roll > .45 ? 'var(--thread)' : 'var(--lilac)';
    el.style.animationDuration = (22 + Math.random() * 14) + 's';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 38000);
  }

  spawnThread();
  setInterval(spawnThread, 9000);
}
