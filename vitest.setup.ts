import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

// jsdom n'implémente pas IntersectionObserver — requis par les apparitions
// au défilement (Framer Motion `whileInView`).
if (!('IntersectionObserver' in window)) {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: IO });
  Object.defineProperty(globalThis, 'IntersectionObserver', { writable: true, value: IO });
}

// jsdom n'implémente pas matchMedia — polyfill minimal (thème auto, confettis…).
// Fonction ordinaire, pas vi.fn() : une remise à zéro des mocks entre tests
// effacerait l'implémentation et casserait les rendus suivants.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}
