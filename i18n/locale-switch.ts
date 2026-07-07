export const LOCALE_SWITCH_EVENT = 'pointers:locale-switch';

let localeSwitchInProgress = false;

export function markLocaleSwitchStart() {
  localeSwitchInProgress = true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LOCALE_SWITCH_EVENT, { detail: { active: true } }));
  }
}

export function markLocaleSwitchEnd() {
  localeSwitchInProgress = false;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LOCALE_SWITCH_EVENT, { detail: { active: false } }));
  }
}

export function isLocaleSwitchInProgress() {
  return localeSwitchInProgress;
}

export function lockPageScroll(scrollY: number) {
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}

export function unlockPageScroll(scrollY: number) {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
}
