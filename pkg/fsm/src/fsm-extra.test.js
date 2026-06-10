import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {createFsmService} from '@alwatr/fsm';

/**
 * @param {number} [ms=5]
 * @returns {Promise<void>}
 */
function nextMacrotask(ms = 5) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('FsmService — extra coverage', () => {
  // ── Multiple transitions (array) ─────────────────────────────────────────

  describe('multiple transitions array', () => {
    it('should evaluate guards in order and take the first matching', async () => {
      const fsm = createFsmService({
        name: 'multi-trans-test',
        initial: 'idle',
        context: {value: 10},
        states: {
          idle: {
            on: {
              CHECK: [
                {target: 'high', guard: (_, context) => context.value > 100},
                {target: 'medium', guard: (_, context) => context.value > 5},
                {target: 'low'},
              ],
            },
          },
          high: {},
          medium: {},
          low: {},
        },
      });

      fsm.dispatch({type: 'CHECK'});
      await nextMacrotask();
      expect(fsm.stateSignal.get().name).toBe('medium');

      fsm.destroy();
    });

    it('should fall through to unconditional transition if all guards fail', async () => {
      const fsm = createFsmService({
        name: 'fallthrough-test',
        initial: 'idle',
        context: {value: 1},
        states: {
          idle: {
            on: {
              CHECK: [
                {target: 'high', guard: (_, context) => context.value > 100},
                {target: 'medium', guard: (_, context) => context.value > 50},
                {target: 'low'}, // unconditional fallback
              ],
            },
          },
          high: {},
          medium: {},
          low: {},
        },
      });

      fsm.dispatch({type: 'CHECK'});
      await nextMacrotask();
      expect(fsm.stateSignal.get().name).toBe('low');

      fsm.destroy();
    });
  });

  // ── Multiple entry/exit effects ───────────────────────────────────────────

  describe('multiple entry/exit effects', () => {
    it('should execute multiple entry effects in order', async () => {
      /** @type {string[]} */
      const log = [];
      const fsm = createFsmService({
        name: 'multi-entry-test',
        initial: 'idle',
        context: {},
        states: {
          idle: {
            on: {GO: {target: 'active'}},
          },
          active: {
            entry: [() => log.push('entry1'), () => log.push('entry2'), () => log.push('entry3')],
          },
        },
      });

      fsm.dispatch({type: 'GO'});
      await nextMacrotask(20);

      expect(log).toEqual(['entry1', 'entry2', 'entry3']);
      fsm.destroy();
    });

    it('should execute multiple exit effects in order', async () => {
      /** @type {string[]} */
      const log = [];
      const fsm = createFsmService({
        name: 'multi-exit-test',
        initial: 'active',
        context: {},
        states: {
          active: {
            exit: [() => log.push('exit1'), () => log.push('exit2')],
            on: {LEAVE: {target: 'idle'}},
          },
          idle: {},
        },
      });

      fsm.dispatch({type: 'LEAVE'});
      await nextMacrotask(20);

      expect(log).toEqual(['exit1', 'exit2']);
      fsm.destroy();
    });
  });

  // ── Assigner returning void ───────────────────────────────────────────────

  describe('assigner returning void', () => {
    it('should keep context unchanged when assigner returns void', async () => {
      const fsm = createFsmService({
        name: 'void-assigner-test',
        initial: 'idle',
        context: {count: 5},
        states: {
          idle: {
            on: {
              NOOP: {
                target: 'done',
                assigner: () => {
                  // intentionally returns void
                },
              },
            },
          },
          done: {},
        },
      });

      fsm.dispatch({type: 'NOOP'});
      await nextMacrotask();

      expect(fsm.stateSignal.get().name).toBe('done');
      expect(fsm.stateSignal.get().context.count).toBe(5);
      fsm.destroy();
    });
  });

  // ── Event payload in assigners ────────────────────────────────────────────

  describe('event payload in assigners', () => {
    it('should pass event data to assigners', async () => {
      const fsm = createFsmService({
        name: 'event-payload-test',
        initial: 'idle',
        context: {amount: 0},
        states: {
          idle: {
            on: {
              ADD: {
                assigner: (event, context) => ({...context, amount: event.value}),
              },
            },
          },
        },
      });

      fsm.dispatch({type: 'ADD', value: 42});
      await nextMacrotask();

      expect(fsm.stateSignal.get().context.amount).toBe(42);
      fsm.destroy();
    });
  });

  // ── FSM Actors (Invoked Actors) ───────────────────────────────────────────

  describe('FSM Actors', () => {
    it('should spawn actors on startup and support dispatch', async () => {
      const actorCleanup = jest.fn();
      const actorMock = jest.fn((_, dispatch) => {
        // Asynchronously dispatch back
        setTimeout(() => dispatch({type: 'RESOLVE'}), 10);
        return actorCleanup;
      });

      const fsm = createFsmService({
        name: 'actor-startup-test',
        initial: 'idle',
        context: {},
        states: {
          idle: {
            actor: actorMock,
            on: {
              RESOLVE: {target: 'success'},
            },
          },
          success: {},
        },
      });

      // Wait for constructor microtask to start FSM (which spawns the actor)
      await nextMacrotask(5);
      expect(actorMock).toHaveBeenCalledTimes(1);

      // Wait for the actor async timeout
      await nextMacrotask(20);
      expect(fsm.stateSignal.get().name).toBe('success');

      // Since we transitioned to success, the idle state actor should be cleaned up
      expect(actorCleanup).toHaveBeenCalledTimes(1);

      fsm.destroy();
    });

    it('should cleanup active actors when FSM is destroyed', async () => {
      const actorCleanup = jest.fn();
      const fsm = createFsmService({
        name: 'actor-destroy-test',
        initial: 'idle',
        context: {},
        states: {
          idle: {
            actor: () => actorCleanup,
          },
        },
      });

      await nextMacrotask(5);
      expect(actorCleanup).not.toHaveBeenCalled();

      fsm.destroy();
      expect(actorCleanup).toHaveBeenCalledTimes(1);
    });

    it('should spawn new actors and cleanup previous state actors on transition', async () => {
      const idleCleanup = jest.fn();
      const activeCleanup = jest.fn();
      const activeActor = jest.fn(() => activeCleanup);

      const fsm = createFsmService({
        name: 'actor-transition-test',
        initial: 'idle',
        context: {},
        states: {
          idle: {
            actor: () => idleCleanup,
            on: {
              GO: {target: 'active'},
            },
          },
          active: {
            actor: activeActor,
          },
        },
      });

      await nextMacrotask(5);
      expect(idleCleanup).not.toHaveBeenCalled();

      fsm.dispatch({type: 'GO'});
      await nextMacrotask(5);

      // Transition happened: idle actor is cleaned up, active actor is spawned
      expect(idleCleanup).toHaveBeenCalledTimes(1);
      expect(activeActor).toHaveBeenCalledTimes(1);
      expect(activeCleanup).not.toHaveBeenCalled();

      fsm.destroy();
      expect(activeCleanup).toHaveBeenCalledTimes(1);
    });

    it('should cleanup and spawn actor again on self-transition', async () => {
      const activeCleanup = jest.fn();
      const activeActor = jest.fn(() => activeCleanup);

      const fsm = createFsmService({
        name: 'actor-self-transition-test',
        initial: 'active',
        context: {},
        states: {
          active: {
            actor: activeActor,
            on: {
              SELF: {target: 'active'},
            },
          },
        },
      });

      await nextMacrotask(5);
      expect(activeActor).toHaveBeenCalledTimes(1);
      expect(activeCleanup).not.toHaveBeenCalled();

      fsm.dispatch({type: 'SELF'});
      await nextMacrotask(5);

      // Self-transition happened: active actor is cleaned up, then active actor is spawned again
      expect(activeCleanup).toHaveBeenCalledTimes(1);
      expect(activeActor).toHaveBeenCalledTimes(2);

      fsm.destroy();
      expect(activeCleanup).toHaveBeenCalledTimes(2); // cleaned up once more on destroy
    });
  });
});
