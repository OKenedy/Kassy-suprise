import { noMessages } from '../config.js';
import { goTo, SCREENS } from '../state.js';

export function initFinalQuestion() {
  const finalNo = document.getElementById('finalNo');
  const celebration = document.getElementById('revealCelebration');
  let noCount = 0;

  document.getElementById('questionIntroBack').addEventListener('click', () => goTo(SCREENS.VIDEO));
  document.getElementById('questionRevealBack').addEventListener('click', () => goTo(SCREENS.QUESTION_INTRO));

  function showCelebration() {
    celebration.replaceChildren();

    const yarnBall = `
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <path d="M9 12c8 2 14 14 22 16M12 30c2-9 12-15 17-21M7 20c9 2 18-3 25-8M17 35c1-8 7-16 15-19"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    for (let index = 0; index < 6; index++) {
      const particle = document.createElement('span');
      const isYarn = index % 2 === 1;
      particle.className = `celebration-particle${isYarn ? ' celebration-yarn' : ''}`;
      particle.style.left = `${12 + Math.random() * 76}%`;
      particle.style.setProperty('--sway', `${Math.random() * 28 - 14}px`);
      particle.style.animationDelay = `${index * 0.35}s`;
      particle.innerHTML = isYarn ? yarnBall : '😊';
      particle.addEventListener('animationend', () => particle.remove(), { once: true });
      celebration.appendChild(particle);
    }
  }

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

  document.getElementById('hearQuestion').addEventListener('click', () => {
    goTo(SCREENS.QUESTION_REVEAL);
    showCelebration();
  });
}
