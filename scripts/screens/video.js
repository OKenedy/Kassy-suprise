import { VIDEO_FILE } from '../config.js';
import { goTo, SCREENS } from '../state.js';

export function initVideo() {
  const video = document.getElementById('myVideo');
  const videoPlaceholder = document.getElementById('videoPlaceholder');
  const markRead = document.getElementById('markRead');
  const skipVideo = document.getElementById('skipVideo');
  const skipPasswordForm = document.getElementById('skipPasswordForm');
  const skipPassword = document.getElementById('skipPassword');
  const skipPasswordWrong = document.getElementById('skipPasswordWrong');
  const videoStatus = document.getElementById('videoStatus');

  let videoFinished = false;

  if (VIDEO_FILE !== '') {
    video.src = VIDEO_FILE;
    video.style.display = 'block';
    videoPlaceholder.style.display = 'none';
  }

  video.addEventListener('ended', () => {
    videoFinished = true;
    markRead.disabled = false;
    videoStatus.textContent = "You've finished watching! Click below when you're ready. 💗";
  });

  markRead.addEventListener('click', () => {
    if (!videoFinished) return;
    goTo(SCREENS.QUESTION_INTRO);
  });

  skipVideo.addEventListener('click', () => {
    skipPasswordForm.hidden = false;
    skipPassword.focus();
  });

  skipPasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (skipPassword.value.trim().toLowerCase() !== 'done') {
      skipPasswordWrong.hidden = false;
      skipPassword.classList.remove('shake');
      void skipPassword.offsetWidth;
      skipPassword.classList.add('shake');
      skipPassword.select();
      return;
    }

    goTo(SCREENS.QUESTION_INTRO);
  });

  document.getElementById('videoBack').addEventListener('click', () => goTo(SCREENS.HOME));
}
