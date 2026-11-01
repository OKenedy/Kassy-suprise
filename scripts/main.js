import { initGate } from './screens/gate.js';
import { initHome } from './screens/home.js';
import { initSecrets } from './screens/secrets.js';
import { initVideo } from './screens/video.js';
import { initFinalQuestion } from './screens/finalQuestion.js';
import { startThreadDrift } from './effects.js';
import { restoreSavedScreen } from './state.js';

initGate();
initHome();
initSecrets();
initVideo();
initFinalQuestion();
startThreadDrift();
restoreSavedScreen();
