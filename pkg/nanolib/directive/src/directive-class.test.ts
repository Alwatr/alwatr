/**
 * Unit tests for DirectiveBase lifecycle hooks: lazyInit_ and onVisible_
 *
 * NOTE: GlobalRegistrator.register() is called in util-decorators.test.ts.
 * Since bun runs test files sequentially in the same process, DOM globals are
 * already available here — do NOT call GlobalRegistrator.register() again.
 */

import {describe, it, expect, mock, beforeEach, afterEach} from 'bun:test';
import {DirectiveBase} from './directive-class.js';

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

    constructor(cb: IOCallback) {
      this.cb = cb;
      const self = this;
      const inst: MockObserverInstance = {
        callback: cb,
        observe: mock(() => {}),
        disconnect: mock(() => {}),
        triggerIntersect() {
          self.cb([{isIntersecting: true} as IntersectionObserverEntry]);
        },
        triggerLeave() {
          self.cb([{isIntersecting: false} as IntersectionObserverEntry]);
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
