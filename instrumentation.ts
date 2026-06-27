// Node 22+ exposes a broken global localStorage stub during SSR unless disabled.
// Remove it so libraries don't call getItem on a non-functional object.
export async function register() {
  if (typeof window === 'undefined' && typeof globalThis.localStorage !== 'undefined') {
    const storage = globalThis.localStorage as Storage;
    if (typeof storage.getItem !== 'function') {
      Reflect.deleteProperty(globalThis, 'localStorage');
    }
  }
}
