import { questions, reassuranceMessage } from '../config.js';
import { goTo, SCREENS } from '../state.js';

export function initSecrets() {
  const questionList = document.getElementById('questionList');
  const secretTitle = document.getElementById('secretTitle');
  const secretContent = document.getElementById('secretContent');
  const passwordArea = document.getElementById('passwordArea');
  const passwordInput = document.getElementById('secretPassword');
  const passwordWrong = document.getElementById('passwordWrong');

  let currentQuestionIndex = null;

  function openQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];

    secretTitle.textContent = question.title;
    secretContent.hidden = true;
    passwordArea.hidden = true;
    passwordWrong.hidden = true;
    passwordInput.value = '';

    if (question.password) {
      passwordArea.hidden = false;
    } else {
      secretContent.textContent = question.answer;
      secretContent.hidden = false;
    }

    goTo(SCREENS.SECRET_ANSWER);
  }

  function unlockQuestion() {
    const question = questions[currentQuestionIndex];
    const enteredPassword = passwordInput.value.trim().toLowerCase();

    if (enteredPassword === question.password.toLowerCase()) {
      passwordArea.hidden = true;
      secretContent.textContent = question.answer;
      secretContent.hidden = false;
    } else {
      passwordWrong.hidden = false;
      passwordInput.classList.remove('shake');
      void passwordInput.offsetWidth; // restart animation
      passwordInput.classList.add('shake');
      passwordInput.select();
    }
  }

  function buildQuestionList() {
    const reassuranceButton = document.createElement('button');
    reassuranceButton.className = 'question-button';
    reassuranceButton.innerHTML = `
      <span class="question-number">💗</span>
      <span>A little reassurance for you</span>
    `;
    reassuranceButton.addEventListener('click', () => goTo(SCREENS.REASSURANCE));
    questionList.appendChild(reassuranceButton);

    questions.forEach((question, index) => {
      const button = document.createElement('button');
      button.className = 'question-button';
      button.innerHTML = `
        <span class="question-number">${index + 1}.</span>
        <span>${question.title}</span>
      `;
      button.addEventListener('click', () => openQuestion(index));
      questionList.appendChild(button);
    });
  }

  document.getElementById('reassuranceText').textContent = reassuranceMessage;
  document.getElementById('secretsHome').addEventListener('click', () => goTo(SCREENS.HOME));
  document.getElementById('answerBack').addEventListener('click', () => goTo(SCREENS.SECRETS));
  document.getElementById('reassuranceBack').addEventListener('click', () => goTo(SCREENS.SECRETS));
  document.getElementById('unlockSecret').addEventListener('click', unlockQuestion);
  passwordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') unlockQuestion(); });

  buildQuestionList();
}
