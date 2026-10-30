import { VIDEO_FILE } from '../config.js';
import { goTo, SCREENS } from '../state.js';

export function initVideo() {
  const video = document.getElementById('myVideo');
  const videoPlaceholder = document.getElementById('videoPlaceholder');
  const markRead = document.getElementById('markRead');
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

  document.getElementById('videoBack').addEventListener('click', () => goTo(SCREENS.HOME));
}
