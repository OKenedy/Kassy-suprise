import { noMessages } from '../config.js';
import { goTo, SCREENS } from '../state.js';

export function initFinalQuestion() {
  const finalNo = document.getElementById('finalNo');
  let noCount = 0;

  function dodgeFinalNo() {
    noCount++;
    finalNo.textContent = noMessages[Math.min(noCount, noMessages.length - 1)];
    finalNo.classList.add('runaway');

    const padding = 20;
    const maxX = window.innerWidth - finalNo.offsetWidth - padding;
    const maxY = window.innerHeight - finalNo.offsetHeight - padding;
    const x = Math.random() * Math.max(0, maxX - padding) + padding;
    const y = Math.random() * Math.max(0, maxY - padding) + padding;
    finalNo.style.left = x + 'px';
    finalNo.style.top = y + 'px';
  }

  finalNo.addEventListener('mouseenter', dodgeFinalNo);
  finalNo.addEventListener('touchstart', (e) => { e.preventDefault(); dodgeFinalNo(); }, { passive: false });
  finalNo.addEventListener('click', dodgeFinalNo);

  document.getElementById('hearQuestion').addEventListener('click', () => goTo(SCREENS.QUESTION_REVEAL));
}
