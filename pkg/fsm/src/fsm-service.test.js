import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {createFsmService} from '@alwatr/fsm';

/**
 * Helper to wait for microtask/macrotask queue to flush.
 * @param {number} [ms=5]
 * @returns {Promise<void>}
 */
function nextMacrotask(ms = 5) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @typedef {'idle' | 'loading' | 'success' | 'error'} FetchState
 * @typedef {{type: 'FETCH'} | {type: 'RESOLVE'; data: string} | {type: 'REJECT'; error: string}} FetchEvent
 * @typedef {{data: string | null; error: string | null; attempts: number}} FetchContext
 */

/**
 * Creates a standard fetch-like FSM config for testing.
 * @param {object} [overrides]
 * @returns {import('@alwatr/fsm').StateMachineConfig<FetchState, FetchEvent, FetchContext>}
 */
function createFetchConfig(overrides = {}) {
  return {
    name: 'fetch-test',
    initial: 'idle',
    context: {data: null, error: null, attempts: 0},
    states: {
      idle: {
        on: {
          FETCH: {
            target: 'loading',
            assigner: (_, context) => ({...context, attempts: context.attempts + 1}),
          },
        },
      },
      loading: {
        on: {
          RESOLVE: {
            target: 'success',
            assigner: (event, context) => ({...context, data: event.data, error: null}),
          },
          REJECT: {
            target: 'error',
            assigner: (event, context) => ({...context, error: event.error, data: null}),
          },
        },
      },
      success: {
        on: {
          FETCH: {
            target: 'loading',
            assigner: (_, context) => ({...context, attempts: context.attempts + 1}),
          },
        },
      },
      error: {
        on: {
          FETCH: {
            target: 'loading',
            assigner: (_, context) => ({...context, attempts: context.attempts + 1}),
          },
        },
      },
    },
    ...overrides,
  };
}

describe('FsmService', () => {
  /** @type {import('@alwatr/fsm').FsmService<FetchState, FetchEvent, FetchContext>} */
  let fsm;

  beforeEach(() => {
    fsm = createFsmService(createFetchConfig());
  });

  afterEach(() => {
    fsm.destroy();
  });

  // ── Initialization ────────────────────────────────────────────────────────

  describe('initialization', () => {
    it('should create an FSM service with the correct initial state', () => {
      const state = fsm.stateSignal.get();
      expect(state.name).toBe('idle');
      expect(state.context).toEqual({data: null, error: null, attempts: 0});
    });

    it('should expose a read-only stateSignal', () => {
      expect(fsm.stateSignal).toBeDefined();
      expect(typeof fsm.stateSignal.get).toBe('function');
      expect(typeof fsm.stateSignal.subscribe).toBe('function');
    });

    it('should expose a dispatch method for sending events', () => {
      expect(fsm.dispatch).toBeDefined();
      expect(typeof fsm.dispatch).toBe('function');
    });
  });

  // ── Basic Transitions ─────────────────────────────────────────────────────

  describe('basic transitions', () => {
    it('should transition from idle to loading on FETCH event', async () => {
      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('loading');
      expect(state.context.attempts).toBe(1);
    });

    it('should transition from loading to success on RESOLVE event', async () => {
      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      fsm.dispatch({type: 'RESOLVE', data: 'result'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('success');
      expect(state.context.data).toBe('result');
      expect(state.context.error).toBeNull();
    });

    it('should transition from loading to error on REJECT event', async () => {
      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      fsm.dispatch({type: 'REJECT', error: 'network error'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('error');
      expect(state.context.error).toBe('network error');
      expect(state.context.data).toBeNull();
    });

    it('should allow re-fetching from success state', async () => {
      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();
      fsm.dispatch({type: 'RESOLVE', data: 'first'});
      await nextMacrotask();

      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('loading');
      expect(state.context.attempts).toBe(2);
    });

    it('should allow re-fetching from error state', async () => {
      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();
      fsm.dispatch({type: 'REJECT', error: 'fail'});
      await nextMacrotask();

      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('loading');
      expect(state.context.attempts).toBe(2);
    });
  });

  // ── Ignored Events ────────────────────────────────────────────────────────

  describe('ignored events', () => {
    it('should ignore RESOLVE event in idle state', async () => {
      fsm.dispatch({type: 'RESOLVE', data: 'unexpected'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('idle');
      expect(state.context.data).toBeNull();
    });

    it('should ignore REJECT event in idle state', async () => {
      fsm.dispatch({type: 'REJECT', error: 'unexpected'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('idle');
    });

    it('should ignore FETCH event in loading state', async () => {
      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      const state = fsm.stateSignal.get();
      expect(state.name).toBe('loading');
      expect(state.context.attempts).toBe(1); // Only the first FETCH counted.
    });
  });

  // ── Subscribers ───────────────────────────────────────────────────────────

  describe('state signal subscribers', () => {
    it('should notify subscribers on state change', async () => {
      const callback = jest.fn();
      fsm.stateSignal.subscribe(callback, {receivePrevious: false});

      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({name: 'loading', context: expect.objectContaining({attempts: 1})}),
      );
    });

    it('should notify subscribers with receivePrevious', async () => {
      const callback = jest.fn();
      fsm.stateSignal.subscribe(callback);

      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.objectContaining({name: 'idle'}));
    });

    it('should not notify unsubscribed listeners', async () => {
      const callback = jest.fn();
      const sub = fsm.stateSignal.subscribe(callback, {receivePrevious: false});
      sub.unsubscribe();

      fsm.dispatch({type: 'FETCH'});
      await nextMacrotask();

      expect(callback).not.toHaveBeenCalled();
    });
  });

  // ── Conditional Transitions ───────────────────────────────────────────────

  describe('guarded transitions', () => {
    it('should take the transition when guard returns true', async () => {
      const condFsm = createFsmService({
        name: 'cond-test',
        initial: 'idle',
        context: {count: 0},
        states: {
          idle: {
            on: {
              GO: [{target: 'special', guard: (_, context) => context.count > 2}, {target: 'normal'}],
            },
          },
          normal: {},
          special: {},
        },
      });

      condFsm.dispatch({type: 'GO'});
      await nextMacrotask();
      expect(condFsm.stateSignal.get().name).toBe('normal');

      condFsm.destroy();
    });

    it('should skip transition when guard returns false and take the next', async () => {
      const condFsm = createFsmService({
        name: 'cond-test-2',
        initial: 'idle',
        context: {count: 5},
        states: {
          idle: {
            on: {
              GO: [{target: 'special', guard: (_, context) => context.count > 2}, {target: 'normal'}],
            },
          },
          normal: {},
          special: {},
        },
      });

      condFsm.dispatch({type: 'GO'});
      await nextMacrotask();
      expect(condFsm.stateSignal.get().name).toBe('special');

      condFsm.destroy();
    });

    it('should handle guard that throws — treat as not met', async () => {
      const condFsm = createFsmService({
        name: 'cond-error-test',
        initial: 'idle',
        context: {count: 0},
        states: {
          idle: {
            on: {
              GO: [
                {
                  target: 'bad',
                  guard: () => {
                    throw new Error('guard error');
                  },
                },
                {target: 'fallback'},
              ],
            },
          },
          bad: {},
          fallback: {},
        },
      });

      condFsm.dispatch({type: 'GO'});
      await nextMacrotask();
      expect(condFsm.stateSignal.get().name).toBe('fallback');

      condFsm.destroy();
    });
  });

  // ── Internal Transitions (no target) ──────────────────────────────────────

  describe('internal transitions', () => {
    it('should update context without changing state when target is undefined', async () => {
      const internalFsm = createFsmService({
        name: 'internal-test',
        initial: 'active',
        context: {count: 0},
        states: {
          active: {
            on: {
              INCREMENT: {
                // No target — internal transition.
                assigner: (_, context) => ({...context, count: context.count + 1}),
              },
            },
          },
        },
      });

      internalFsm.dispatch({type: 'INCREMENT'});
      await nextMacrotask();

      const state = internalFsm.stateSignal.get();
      expect(state.name).toBe('active');
      expect(state.context.count).toBe(1);

      internalFsm.dispatch({type: 'INCREMENT'});
      await nextMacrotask();

      expect(internalFsm.stateSignal.get().context.count).toBe(2);

      internalFsm.destroy();
    });
  });

  // ── Multiple Assigners ────────────────────────────────────────────────────

  describe('multiple assigners', () => {
    it('should apply multiple assigners sequentially', async () => {
      const multiFsm = createFsmService({
        name: 'multi-assigner-test',
        initial: 'idle',
        context: {a: 0, b: 0},
        states: {
          idle: {
            on: {
              GO: {
                target: 'done',
                assigner: [(_, context) => ({...context, a: 10}), (_, context) => ({...context, b: context.a + 5})],
              },
            },
          },
          done: {},
        },
      });

      multiFsm.dispatch({type: 'GO'});
      await nextMacrotask();

      const state = multiFsm.stateSignal.get();
      expect(state.name).toBe('done');
      expect(state.context.a).toBe(10);
      // Second assigner receives the accumulated context from the first.
      expect(state.context.b).toBe(15);

      multiFsm.destroy();
    });

    it('should revert all assigners atomically if one throws', async () => {
      const atomicFsm = createFsmService({
        name: 'atomic-test',
        initial: 'idle',
        context: {a: 0, b: 0},
        states: {
          idle: {
            on: {
              GO: {
                target: 'done',
                assigner: [
                  (_, context) => ({...context, a: 99}),
                  () => {
                    throw new Error('assigner error');
                  },
                ],
              },
            },
          },
          done: {},
        },
      });

      atomicFsm.dispatch({type: 'GO'});
      await nextMacrotask();

      const state = atomicFsm.stateSignal.get();
      // State transitions even if assigners fail — but context reverts to original.
      expect(state.name).toBe('done');
      expect(state.context.a).toBe(0); // Reverted.
      expect(state.context.b).toBe(0); // Reverted.

      atomicFsm.destroy();
    });
  });

  // ── Entry / Exit Effects ──────────────────────────────────────────────────

  describe('entry and exit effects', () => {
    it('should execute entry effects when entering a new state', async () => {
      const entryEffect = jest.fn();
      const effectFsm = createFsmService({
        name: 'entry-effect-test',
        initial: 'idle',
        context: {},
        states: {
          idle: {
            on: {
              GO: {target: 'active'},
            },
          },
          active: {
            entry: entryEffect,
          },
        },
      });

      effectFsm.dispatch({type: 'GO'});
      await nextMacrotask();
      // Allow async effects to run.
      await nextMacrotask(5);

      expect(entryEffect).toHaveBeenCalledTimes(1);

      effectFsm.destroy();
    });

    it('should execute exit effects when leaving a state', async () => {
      const exitEffect = jest.fn();
      const effectFsm = createFsmService({
        name: 'exit-effect-test',
        initial: 'idle',
        context: {},
        states: {
          idle: {
            exit: exitEffect,
            on: {
              GO: {target: 'active'},
            },
          },
          active: {},
        },
      });

      effectFsm.dispatch({type: 'GO'});
      await nextMacrotask();
      await nextMacrotask(5);

      expect(exitEffect).toHaveBeenCalledTimes(1);

      effectFsm.destroy();
    });

    it('should not execute entry/exit effects on internal transitions', async () => {
      const entryEffect = jest.fn();
      const exitEffect = jest.fn();
      const effectFsm = createFsmService({
        name: 'no-effect-internal-test',
        initial: 'active',
        context: {count: 0},
        states: {
          active: {
            entry: entryEffect,
            exit: exitEffect,
            on: {
              INCREMENT: {
                assigner: (_, context) => ({...context, count: context.count + 1}),
              },
            },
          },
        },
      });

      // Wait for startup microtask to execute, which runs the entry effect of the initial state ('active')
      await nextMacrotask();
      expect(entryEffect).toHaveBeenCalledTimes(1);
      expect(exitEffect).not.toHaveBeenCalled();

      // Dispatch internal transition event
      effectFsm.dispatch({type: 'INCREMENT'});
      await nextMacrotask();
      await nextMacrotask(5);

      // Entry effect should still be called 1 time (no new calls from the internal transition)
      expect(entryEffect).toHaveBeenCalledTimes(1);
      expect(exitEffect).not.toHaveBeenCalled();

      effectFsm.destroy();
    });

    it('should handle effects that throw without crashing the FSM', async () => {
      const effectFsm = createFsmService({
        name: 'effect-error-test',
        initial: 'idle',
        context: {},
        states: {
          idle: {
            on: {
              GO: {target: 'active'},
            },
          },
          active: {
            entry: () => {
              throw new Error('entry effect error');
            },
            on: {
              BACK: {target: 'idle'},
            },
          },
        },
      });

      effectFsm.dispatch({type: 'GO'});
      await nextMacrotask();
      await nextMacrotask(5);

      // FSM should still be in the target state despite the effect error.
      expect(effectFsm.stateSignal.get().name).toBe('active');

      // Should still be able to transition.
      effectFsm.dispatch({type: 'BACK'});
      await nextMacrotask();
      expect(effectFsm.stateSignal.get().name).toBe('idle');

      effectFsm.destroy();
    });

    it('should execute entry/exit effects on self-transitions with explicit target', async () => {
      const entryEffect = jest.fn();
      const exitEffect = jest.fn();
      const effectFsm = createFsmService({
        name: 'effect-self-transition-test',
        initial: 'active',
        context: {},
        states: {
          active: {
            entry: entryEffect,
            exit: exitEffect,
            on: {
              SELF: {
                target: 'active',
              },
            },
          },
        },
      });

      // Wait for startup microtask to execute, which runs the entry effect of the initial state ('active')
      await nextMacrotask();
      expect(entryEffect).toHaveBeenCalledTimes(1);
      expect(exitEffect).not.toHaveBeenCalled();

      // Dispatch self transition event (with explicit target equal to current state)
      effectFsm.dispatch({type: 'SELF'});
      await nextMacrotask();
      await nextMacrotask(5);

      // Both entry and exit effects should have been called again (entry=2, exit=1)
      expect(entryEffect).toHaveBeenCalledTimes(2);
      expect(exitEffect).toHaveBeenCalledTimes(1);

      effectFsm.destroy();
    });
  });
});
