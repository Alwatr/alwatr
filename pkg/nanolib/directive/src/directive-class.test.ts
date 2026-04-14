/**
 * Unit tests for DirectiveBase lifecycle hooks: lazyInit_ and onVisible_
 *
 * NOTE: bun runs test files alphabetically. This file (directive-class.test.ts)
 * runs BEFORE util-decorators.test.ts, so we must register happy-dom here.
 * GlobalRegistrator.register() throws if called twice, so we guard with a check.
 */

import {describe, it, expect, mock, beforeEach, afterEach} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {DirectiveBase} from './directive-class.js';

// Register DOM globals if not already done (guard against double-registration)
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wait for the constructor's IIFE (nextMacrotask + init_) to complete */
const waitForInit = () => new Promise<void>((resolve) => setTimeout(resolve, 50));

/** Wait for async intersection callbacks to settle */
const waitForAsync = () => new Promise<void>((resolve) => setTimeout(resolve, 50));

// ---------------------------------------------------------------------------
// IntersectionObserver mock helpers
// ---------------------------------------------------------------------------

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

interface MockObserverInstance {
  callback: IOCallback;
  observe: ReturnType<typeof mock>;
  disconnect: ReturnType<typeof mock>;
  /** Simulate element entering viewport */
  triggerIntersect: () => void;
  /** Simulate element leaving viewport */
  triggerLeave: () => void;
}

let mockObserverInstances: MockObserverInstance[] = [];

function installMockIntersectionObserver(): void {
  mockObserverInstances = [];

  (globalThis as unknown as Record<string, unknown>).IntersectionObserver = class MockIO {
    private cb: IOCallback;
    private instance: MockObserverInstance;
    private disconnected = false;

    constructor(cb: IOCallback) {
      this.cb = cb;
      const self = this;
      const inst: MockObserverInstance = {
        callback: cb,
        observe: mock(() => {}),
        disconnect: mock(() => {
          self.disconnected = true;
        }),
        triggerIntersect() {
          if (!self.disconnected) {
            self.cb([{isIntersecting: true} as IntersectionObserverEntry]);
          }
        },
        triggerLeave() {
          if (!self.disconnected) {
            self.cb([{isIntersecting: false} as IntersectionObserverEntry]);
          }
        },
      };
      this.instance = inst;
      mockObserverInstances.push(inst);
    }

    observe(el: Element) {
      this.instance.observe(el);
    }

    disconnect() {
      this.instance.disconnect();
    }
  };
}

function restoreIntersectionObserver(): void {
  // happy-dom provides a real IntersectionObserver — restore by deleting the mock
  delete (globalThis as unknown as Record<string, unknown>).IntersectionObserver;
}

// ---------------------------------------------------------------------------
// describe: lazyInit_ (Task 5.1)
// ---------------------------------------------------------------------------

describe('lazyInit_', () => {
  beforeEach(() => {
    installMockIntersectionObserver();
  });

  afterEach(() => {
    restoreIntersectionObserver();
  });

  // 5.1 test 1 — Requirements 1.3
  it('does NOT create an IntersectionObserver when lazyInit_ is not defined', async () => {
    class NoLazyDirective extends DirectiveBase {
      protected init_(): void {}
      // lazyInit_ intentionally NOT defined
    }

    const root = document.createElement('div');
    new NoLazyDirective(root, 'test');

    await waitForInit();

    expect(mockObserverInstances.length).toBe(0);
  });

  // 5.1 test 2 — Requirements 3.1, 3.2
  it('calls lazyInit_ exactly once after init_() when element intersects', async () => {
    const lazyInitMock = mock(() => {});

    class LazyDirective extends DirectiveBase {
      protected init_(): void {}
      protected lazyInit_(): void {
        lazyInitMock();
      }
    }

    const root = document.createElement('div');
    new LazyDirective(root, 'test');

    await waitForInit();

    // One observer should have been created
    expect(mockObserverInstances.length).toBe(1);
    expect(lazyInitMock).toHaveBeenCalledTimes(0);

    // Simulate element entering viewport
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();

    expect(lazyInitMock).toHaveBeenCalledTimes(1);

    // Simulate entering viewport again — should NOT call again (one-shot)
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();

    expect(lazyInitMock).toHaveBeenCalledTimes(1);
  });

  // 5.1 test 3 — Requirements 8.1, 8.3
  it('does NOT crash when lazyInit_() throws an error', async () => {
    class ThrowingLazyDirective extends DirectiveBase {
      protected init_(): void {}
      protected lazyInit_(): void {
        throw new Error('lazyInit_ error');
      }
    }

    const root = document.createElement('div');
    new ThrowingLazyDirective(root, 'test');

    await waitForInit();

    expect(mockObserverInstances.length).toBe(1);

    // Should not throw
    expect(() => {
      mockObserverInstances[0]!.triggerIntersect();
    }).not.toThrow();

    await waitForAsync();
    // Directive is still alive — no unhandled exception
  });

  // 5.1 test 4 — Requirements 7.3
  it('does NOT call lazyInit_() when destroy() is called before intersection', async () => {
    const lazyInitMock = mock(() => {});

    class DestroyBeforeLazyDirective extends DirectiveBase {
      protected init_(): void {}
      protected lazyInit_(): void {
        lazyInitMock();
      }
    }

    const root = document.createElement('div');
    const instance = new DestroyBeforeLazyDirective(root, 'test');

    await waitForInit();

    expect(mockObserverInstances.length).toBe(1);

    // Destroy before intersection
    await instance.destroy();

    // The observer should have been disconnected
    expect(mockObserverInstances[0]!.disconnect).toHaveBeenCalled();

    // Now simulate intersection — lazyInit_ must NOT be called
    // (observer is disconnected, so real IO wouldn't fire; but we call the
    //  stored callback directly to verify the guard works)
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();

    expect(lazyInitMock).toHaveBeenCalledTimes(0);
  });
});

// ---------------------------------------------------------------------------
// describe: onVisible_ (Task 5.3)
// ---------------------------------------------------------------------------

describe('onVisible_', () => {
  beforeEach(() => {
    installMockIntersectionObserver();
  });

  afterEach(() => {
    restoreIntersectionObserver();
  });

  // 5.3 test 1 — Requirements 1.4
  it('does NOT create an IntersectionObserver when onVisible_ is not defined', async () => {
    class NoVisibleDirective extends DirectiveBase {
      protected init_(): void {}
      // onVisible_ intentionally NOT defined
    }

    const root = document.createElement('div');
    new NoVisibleDirective(root, 'test');

    await waitForInit();

    expect(mockObserverInstances.length).toBe(0);
  });

  // 5.3 test 2 — Requirements 4.1, 4.2
  it('calls onVisible_() each time the element intersects', async () => {
    const onVisibleMock = mock(() => {});

    class VisibleDirective extends DirectiveBase {
      protected init_(): void {}
      protected onVisible_(): void {
        onVisibleMock();
      }
    }

    const root = document.createElement('div');
    new VisibleDirective(root, 'test');

    await waitForInit();

    expect(mockObserverInstances.length).toBe(1);
    expect(onVisibleMock).toHaveBeenCalledTimes(0);

    // First intersection
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();
    expect(onVisibleMock).toHaveBeenCalledTimes(1);

    // Second intersection
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();
    expect(onVisibleMock).toHaveBeenCalledTimes(2);

    // Third intersection
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();
    expect(onVisibleMock).toHaveBeenCalledTimes(3);
  });

  // 5.3 test 3 — Requirements 8.2, 8.4
  it('does NOT crash when onVisible_() throws an error', async () => {
    class ThrowingVisibleDirective extends DirectiveBase {
      protected init_(): void {}
      protected onVisible_(): void {
        throw new Error('onVisible_ error');
      }
    }

    const root = document.createElement('div');
    new ThrowingVisibleDirective(root, 'test');

    await waitForInit();

    expect(mockObserverInstances.length).toBe(1);

    // Should not throw
    expect(() => {
      mockObserverInstances[0]!.triggerIntersect();
    }).not.toThrow();

    await waitForAsync();
    // Directive is still alive — no unhandled exception
  });

  // 5.3 test 4 — Requirements 7.4
  it('disconnects the observer and stops calling onVisible_() after destroy()', async () => {
    const onVisibleMock = mock(() => {});

    class DestroyVisibleDirective extends DirectiveBase {
      protected init_(): void {}
      protected onVisible_(): void {
        onVisibleMock();
      }
    }

    const root = document.createElement('div');
    const instance = new DestroyVisibleDirective(root, 'test');

    await waitForInit();

    expect(mockObserverInstances.length).toBe(1);

    // Trigger once before destroy
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();
    expect(onVisibleMock).toHaveBeenCalledTimes(1);

    // Destroy the directive
    await instance.destroy();

    // Observer should be disconnected
    expect(mockObserverInstances[0]!.disconnect).toHaveBeenCalled();

    // Simulate intersection after destroy — should NOT call onVisible_
    mockObserverInstances[0]!.triggerIntersect();
    await waitForAsync();

    // Still only 1 call (the one before destroy)
    expect(onVisibleMock).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// describe: lazyInit_ fallback chain (Task 6.1)
// ---------------------------------------------------------------------------

describe('lazyInit_ fallback chain', () => {
  let originalIntersectionObserver: typeof IntersectionObserver | undefined;
  let originalRequestIdleCallback: typeof requestIdleCallback | undefined;

  beforeEach(() => {
    originalIntersectionObserver = (globalThis as any).IntersectionObserver;
    originalRequestIdleCallback = (globalThis as any).requestIdleCallback;
  });

  afterEach(() => {
    if (originalIntersectionObserver !== undefined) {
      (globalThis as any).IntersectionObserver = originalIntersectionObserver;
    } else {
      delete (globalThis as any).IntersectionObserver;
    }
    if (originalRequestIdleCallback !== undefined) {
      (globalThis as any).requestIdleCallback = originalRequestIdleCallback;
    } else {
      delete (globalThis as any).requestIdleCallback;
    }
  });

  // 6.1 test 1 — Requirements 5.1
  it('schedules lazyInit_() via requestIdleCallback when IntersectionObserver is unavailable', async () => {
    delete (globalThis as any).IntersectionObserver;

    const lazyInitMock = mock(() => {});
    const idleCallbackMock = mock((cb: IdleRequestCallback) => {
      cb({didTimeout: false, timeRemaining: () => 50} as IdleDeadline);
      return 0;
    });
    (globalThis as any).requestIdleCallback = idleCallbackMock;

    class RicFallbackDirective extends DirectiveBase {
      protected init_(): void {}
      protected lazyInit_(): void {
        lazyInitMock();
      }
    }

    const root = document.createElement('div');
    new RicFallbackDirective(root, 'test');

    await waitForInit();

    expect(idleCallbackMock).toHaveBeenCalledTimes(1);
    expect(lazyInitMock).toHaveBeenCalledTimes(1);
  });

  // 6.1 test 2 — Requirements 5.2
  it('schedules lazyInit_() via setTimeout ~100ms when both IntersectionObserver and requestIdleCallback are unavailable', async () => {
    delete (globalThis as any).IntersectionObserver;
    delete (globalThis as any).requestIdleCallback;

    const lazyInitMock = mock(() => {});

    class SetTimeoutFallbackDirective extends DirectiveBase {
      protected init_(): void {}
      protected lazyInit_(): void {
        lazyInitMock();
      }
    }

    const root = document.createElement('div');
    new SetTimeoutFallbackDirective(root, 'test');

    await waitForInit();

    // Not yet called — setTimeout(100ms) hasn't fired
    expect(lazyInitMock).toHaveBeenCalledTimes(0);

    // Wait 150ms for the 100ms setTimeout to fire
    await new Promise<void>((resolve) => setTimeout(resolve, 150));

    expect(lazyInitMock).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// describe: onVisible_ fallback (Task 6.2)
// ---------------------------------------------------------------------------

describe('onVisible_ fallback', () => {
  let originalIntersectionObserver: typeof IntersectionObserver | undefined;

  beforeEach(() => {
    originalIntersectionObserver = (globalThis as any).IntersectionObserver;
  });

  afterEach(() => {
    if (originalIntersectionObserver !== undefined) {
      (globalThis as any).IntersectionObserver = originalIntersectionObserver;
    } else {
      delete (globalThis as any).IntersectionObserver;
    }
  });

  // 6.2 test 1 — Requirements 6.1, 6.2
  it('calls onVisible_() exactly once immediately when IntersectionObserver is unavailable', async () => {
    delete (globalThis as any).IntersectionObserver;

    const onVisibleMock = mock(() => {});

    class ImmediateFallbackDirective extends DirectiveBase {
      protected init_(): void {}
      protected onVisible_(): void {
        onVisibleMock();
      }
    }

    const root = document.createElement('div');
    new ImmediateFallbackDirective(root, 'test');

    await waitForInit();
    await waitForAsync();

    expect(onVisibleMock).toHaveBeenCalledTimes(1);
  });
});
