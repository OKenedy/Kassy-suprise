import { correctAnswers } from '../config.js';
import { goTo, SCREENS } from '../state.js';

export function initGate() {
  const answerInput = document.getElementById('answer');
  const wrongMsg = document.getElementById('wrong');
  const hintMsg = document.getElementById('hint');
  const submit = document.getElementById('submit');

  function checkAnswer() {
    const value = answerInput.value.trim().toLowerCase();
    if (correctAnswers.includes(value)) {
      goTo(SCREENS.HOME);
    } else {
      wrongMsg.hidden = false;
      hintMsg.hidden = false;
      answerInput.classList.remove('shake');
      void answerInput.offsetWidth; // restart animation
      answerInput.classList.add('shake');
      answerInput.select();
    }
  }

  submit.addEventListener('click', checkAnswer);
  answerInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkAnswer(); });
}
