// Single source of truth for which screen is active. goTo() is the only place
// allowed to mutate .active classes — every screen module asks state to
// transition instead of touching the DOM directly.

export const SCREENS = Object.freeze({
  GATE: 'gate',
  HOME: 'home',
  SECRETS: 'secrets',
  SECRET_ANSWER: 'secretAnswer',
  REASSURANCE: 'reassurance',
  VIDEO: 'videoPage',
  QUESTION_INTRO: 'questionIntro',
  QUESTION_REVEAL: 'questionReveal'
});

const SCREEN_PROGRESS = {
  [SCREENS.GATE]: 6,
  [SCREENS.HOME]: 20,
  [SCREENS.SECRETS]: 35,
  [SCREENS.SECRET_ANSWER]: 45,
  [SCREENS.REASSURANCE]: 45,
  [SCREENS.VIDEO]: 60,
  [SCREENS.QUESTION_INTRO]: 85,
  [SCREENS.QUESTION_REVEAL]: 100
};

let current = SCREENS.GATE;
let currentContext = null;

export function getCurrent() {
  return current;
}

export function getCurrentContext() {
  return currentContext;
}

export function updateCurrentContext(context) {
  currentContext = context;
  const state = { screenId: current, context };
  history.replaceState(state, '', window.location.href);
}

function updateProgress(screenId) {
  const thread = document.getElementById('progressThread');
  if (!thread) return;
  thread.style.width = `${SCREEN_PROGRESS[screenId] ?? 0}%`;
}

function showScreen(screenId, context = null) {
  const target = document.getElementById(screenId);
  if (!target) throw new Error(`Unknown screen: ${screenId}`);

  document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
  target.classList.add('active');
  current = screenId;
  currentContext = context;
  updateProgress(screenId);

  document.dispatchEvent(new CustomEvent('screenchange', { detail: { screenId, context } }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function goTo(screenId, context = null) {
  if (!document.getElementById(screenId)) throw new Error(`Unknown screen: ${screenId}`);
  history.pushState({ screenId, context }, '', window.location.href);
  showScreen(screenId, context);
}

export function initializeNavigation() {
  history.replaceState({ screenId: SCREENS.GATE, context: null }, '', window.location.href);
  showScreen(SCREENS.GATE);
}

window.addEventListener('popstate', (event) => {
  const screenId = Object.values(SCREENS).includes(event.state?.screenId)
    ? event.state.screenId
    : SCREENS.GATE;
  const context = event.state?.context ?? null;
  showScreen(screenId, context);
});
