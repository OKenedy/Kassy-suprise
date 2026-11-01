import { goTo, SCREENS } from '../state.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const STAGGER_MS = 90;
const LETTER_DRAW_MS = 400;
const LETTER_FILL_MS = 350;

// Builds one <tspan> per character so each letter can be stroke-drawn and
// filled in on its own, in sequence — like a hook laying down one stitch at
// a time instead of the whole name appearing at once. Returns the total time
// the sequence takes, in ms.
function buildStitchName(svgText, name) {
  [...name].forEach((char, i) => {
    const tspan = document.createElementNS(SVG_NS, 'tspan');
    tspan.textContent = char === ' ' ? ' ' : char;
    tspan.classList.add('stitch-letter');
    tspan.style.setProperty('--draw-delay', `${i * STAGGER_MS}ms`);
    svgText.appendChild(tspan);
  });
  return (name.length - 1) * STAGGER_MS + LETTER_DRAW_MS + LETTER_FILL_MS;
}

function playStitchIntro() {
  const heading = document.getElementById('welcomeHeading');
  const nameText = document.querySelector('#welcomeName text');
  const thread = document.getElementById('welcomeThread');
  if (!heading || !nameText || heading.dataset.stitched) return;

  heading.dataset.stitched = 'true';
  const totalMs = buildStitchName(nameText, heading.textContent);

  if (thread) {
    thread.style.setProperty('--duration', `${totalMs}ms`);
    thread.classList.add('drawn');
  }
}

export function initHome() {
  document.getElementById('homeBack').addEventListener('click', () => goTo(SCREENS.GATE));
  document.getElementById('openVideo').addEventListener('click', () => goTo(SCREENS.VIDEO));
  document.getElementById('openSecrets').addEventListener('click', () => goTo(SCREENS.SECRETS));

  document.addEventListener('screenchange', (e) => {
    if (e.detail.screenId === SCREENS.HOME) playStitchIntro();
  });
}
