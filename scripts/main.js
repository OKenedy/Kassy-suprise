import { initGate } from './screens/gate.js';
import { initHome } from './screens/home.js';
import { initSecrets } from './screens/secrets.js';
import { initVideo } from './screens/video.js';
import { initFinalQuestion } from './screens/finalQuestion.js';
import { startThreadDrift } from './effects.js';
import { initializeNavigation } from './state.js';

initGate();
initHome();
initSecrets();
initVideo();
initFinalQuestion();
startThreadDrift();
initializeNavigation();

window.addEventListener('pageshow', (event) => {
  if (event.persisted) initializeNavigation();
});
