import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {onPageReady, subscribePageReady, dispatchPageReady} from '@alwatr/page-ready';

// Register DOM globals for testing (page-ready requires document.querySelector).
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

/**
 * Helper to wait for microtask/macrotask queue to flush.
 * @returns {Promise<void>}
 */
function nextMacrotask() {
  return new Promise((resolve) => setTimeout(resolve, 5));
}

describe('page-ready', () => {
  /** @type {HTMLElement | null} */
  let pageElement;

  /**
   * Helper to set the page-id attribute on a DOM element.
   * @param {string} pageId
   */
  function setPageId(pageId) {
    if (!pageElement) {
      pageElement = document.createElement('div');
      document.body.appendChild(pageElement);
    }
    pageElement.setAttribute('page-id', pageId);
  }

  /**
   * Helper to remove the page-id element from the DOM.
   */
  function clearPageId() {
    if (pageElement) {
      pageElement.remove();
      pageElement = null;
    }
  }

  afterEach(() => {
    clearPageId();
  });

  describe('onPageReady', () => {
    it('should notify the handler when the matching page-id is dispatched', async () => {
      const callback = jest.fn();
      const sub = onPageReady('home', callback);

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);

      sub.unsubscribe();
    });

    it('should not notify the handler for a different page-id', async () => {
      const callback = jest.fn();
      const sub = onPageReady('about', callback);

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();

      sub.unsubscribe();
    });

    it('should not notify after unsubscribe', async () => {
      const callback = jest.fn();
      const sub = onPageReady('home', callback);
      sub.unsubscribe();

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple subscribers for the same page', async () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const sub1 = onPageReady('home', callback1);
      const sub2 = onPageReady('home', callback2);

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);

      sub1.unsubscribe();
      sub2.unsubscribe();
    });

    it('should handle subscribers for different pages independently', async () => {
      const homeCallback = jest.fn();
      const aboutCallback = jest.fn();
      const subHome = onPageReady('home', homeCallback);
      const subAbout = onPageReady('about', aboutCallback);

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(homeCallback).toHaveBeenCalledTimes(1);
      expect(aboutCallback).not.toHaveBeenCalled();

      subHome.unsubscribe();
      subAbout.unsubscribe();
    });
  });

  describe('subscribePageReady', () => {
    it('should notify the handler with the page-id for every dispatch', async () => {
      const callback = jest.fn();
      const sub = subscribePageReady(callback);

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('home');

      sub.unsubscribe();
    });

    it('should notify for different page-ids', async () => {
      const callback = jest.fn();
      const sub = subscribePageReady(callback);

      setPageId('home');
      dispatchPageReady();
      await nextMacrotask();

      setPageId('about');
      dispatchPageReady();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(1, 'home');
      expect(callback).toHaveBeenNthCalledWith(2, 'about');

      sub.unsubscribe();
    });

    it('should not notify after unsubscribe', async () => {
      const callback = jest.fn();
      const sub = subscribePageReady(callback);
      sub.unsubscribe();

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('dispatchPageReady', () => {
    it('should not throw when no page-id element exists', () => {
      clearPageId();
      // Should log an accident internally but not throw.
      expect(() => dispatchPageReady()).not.toThrow();
    });

    it('should not throw in SSR/non-DOM environment', () => {
      const origDocument = globalThis.document;
      Object.defineProperty(globalThis, 'document', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      try {
        expect(() => dispatchPageReady()).not.toThrow();
      } finally {
        Object.defineProperty(globalThis, 'document', {
          value: origDocument,
          writable: true,
          configurable: true,
        });
      }
    });

    it('should handle empty page-id attribute', async () => {
      const callback = jest.fn();
      const sub = subscribePageReady(callback);

      setPageId('');
      dispatchPageReady();

      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('');

      sub.unsubscribe();
    });

    it('should fire both onPageReady and subscribePageReady handlers', async () => {
      const specificCallback = jest.fn();
      const globalCallback = jest.fn();
      const sub1 = onPageReady('home', specificCallback);
      const sub2 = subscribePageReady(globalCallback);

      setPageId('home');
      dispatchPageReady();

      await nextMacrotask();
      expect(specificCallback).toHaveBeenCalledTimes(1);
      expect(globalCallback).toHaveBeenCalledTimes(1);
      expect(globalCallback).toHaveBeenCalledWith('home');

      sub1.unsubscribe();
      sub2.unsubscribe();
    });
  });
});

describe('page-ready — extra coverage', () => {
  /** @type {HTMLElement | null} */
  let pageElement;

  function setPageId(pageId) {
    if (!pageElement) {
      pageElement = document.createElement('div');
      document.body.appendChild(pageElement);
    }
    pageElement.setAttribute('page-id', pageId);
  }

  function clearPageId() {
    if (pageElement) {
      pageElement.remove();
      pageElement = null;
    }
  }

  afterEach(() => {
    clearPageId();
  });

  describe('multiple dispatches', () => {
    it('should notify onPageReady handler on each matching dispatch', async () => {
      const callback = jest.fn();
      const sub = onPageReady('dashboard', callback);

      setPageId('dashboard');
      dispatchPageReady();
      await nextMacrotask();

      dispatchPageReady();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(2);
      sub.unsubscribe();
    });
  });

  describe('querySelector behavior', () => {
    it('should find the first element with page-id attribute', async () => {
      const callback = jest.fn();
      const sub = subscribePageReady(callback);

      // Add two elements with page-id — querySelector returns the first.
      const el1 = document.createElement('div');
      el1.setAttribute('page-id', 'first');
      document.body.appendChild(el1);

      const el2 = document.createElement('div');
      el2.setAttribute('page-id', 'second');
      document.body.appendChild(el2);

      dispatchPageReady();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('first');

      el1.remove();
      el2.remove();
      sub.unsubscribe();
    });
  });

  describe('special characters in page-id', () => {
    it('should handle page-id with hyphens', async () => {
      const callback = jest.fn();
      const sub = onPageReady('product-detail', callback);

      setPageId('product-detail');
      dispatchPageReady();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });

    it('should handle page-id with underscores', async () => {
      const callback = jest.fn();
      const sub = onPageReady('user_profile', callback);

      setPageId('user_profile');
      dispatchPageReady();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });
  });

  describe('no notification for non-matching pages', () => {
    it('should not notify any onPageReady handler when no page-id element exists', async () => {
      const callback = jest.fn();
      const sub = onPageReady('home', callback);

      clearPageId();
      dispatchPageReady();
      await nextMacrotask();

      expect(callback).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  });

  describe('async handlers', () => {
    it('should handle async onPageReady handlers', async () => {
      let resolved = false;
      const sub = onPageReady('home', async () => {
        await new Promise((r) => setTimeout(r, 1));
        resolved = true;
      });

      setPageId('home');
      dispatchPageReady();
      await nextMacrotask();
      await new Promise((r) => setTimeout(r, 10));

      expect(resolved).toBe(true);
      sub.unsubscribe();
    });
  });
});
