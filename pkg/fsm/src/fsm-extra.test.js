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
                {target: 'high', guard: ({context}) => context.value > 100},
                {target: 'medium', guard: ({context}) => context.value > 5},
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
                {target: 'high', guard: ({context}) => context.value > 100},
                {target: 'medium', guard: ({context}) => context.value > 50},
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
                assigners: () => {
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
                assigners: ({event}) => ({amount: event.value}),
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

  // ── Primitive context support ─────────────────────────────────────────────

  describe('primitive context support', () => {
    it('should support primitive types for context (e.g. number)', async () => {
      const fsm = createFsmService({
        name: 'primitive-context-test',
        initial: 'idle',
        context: 0,
        states: {
          idle: {
            on: {
              INCREMENT: {
                assigners: ({context}) => context + 1,
              },
            },
          },
        },
      });

      fsm.dispatch({type: 'INCREMENT'});
      await nextMacrotask();

      expect(fsm.stateSignal.get().context).toBe(1);
      fsm.destroy();
    });
  });
});
