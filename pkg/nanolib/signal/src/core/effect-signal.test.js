import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {EffectSignal, StateSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('EffectSignal', () => {
  /** @type {StateSignal<number>} */
  let depSignal;
  /** @type {EffectSignal} */
  let effectSignal;

  beforeEach(() => {
    depSignal = new StateSignal({name: 'dep', initialValue: 0});
  });

  afterEach(() => {
    if (effectSignal && !effectSignal.isDestroyed) {
      effectSignal.destroy();
    }
    if (!depSignal.isDestroyed) depSignal.destroy();
  });

  it('should be defined', () => {
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
    });
    expect(EffectSignal).toBeDefined();
    expect(effectSignal).toBeInstanceOf(EffectSignal);
  });

  it('should run the effect immediately if runImmediately is true', async () => {
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
      runImmediately: true,
    });
    await delay.by(5);
    expect(runFn).toHaveBeenCalledTimes(1);
  });

  it('should not run the effect immediately if runImmediately is false or undefined', async () => {
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
    });
    await delay.by(5);
    expect(runFn).not.toHaveBeenCalled();
  });

  it('should run the effect when a dependency changes', async () => {
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
    });
    await delay.by(5);
    expect(runFn).not.toHaveBeenCalled();
    depSignal.set(1);
    await delay.by(5);
    expect(runFn).toHaveBeenCalledTimes(1);
  });

  it('should run the effect for each dependency change', async () => {
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
    });
    depSignal.set(1);
    await delay.by(5);

    depSignal.set(2);
    await delay.by(5);

    expect(runFn).toHaveBeenCalledTimes(2);
  });

  it('should handle multiple dependencies', async () => {
    const depSignal2 = new StateSignal({name: 'dep2', initialValue: 'a'});
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal, depSignal2],
      run: runFn,
    });
    depSignal.set(1);
    await delay.by(5);

    expect(runFn).toHaveBeenCalledTimes(1);
    depSignal2.set('b');
    await delay.by(5);

    expect(runFn).toHaveBeenCalledTimes(2);
    depSignal2.destroy();
  });

  it('should not run the effect after destroy', async () => {
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
    });
    effectSignal.destroy();
    depSignal.set(1);
    await delay.by(5);

    expect(runFn).not.toHaveBeenCalled();
  });

  it('should handle async run functions', async () => {
    const runFn = jest.fn().mockResolvedValue(undefined);
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
    });
    depSignal.set(1);
    await delay.by(5);

    expect(runFn).toHaveBeenCalledTimes(1);
  });

  it('should not run if dependencies do not change', async () => {
    const runFn = jest.fn();
    effectSignal = new EffectSignal({
      deps: [depSignal],
      run: runFn,
    });
    depSignal.set(0); // Same value
    await delay.by(5);

    expect(runFn).not.toHaveBeenCalled();
  });

  // ── Extra coverage ──────────────────────────────────────────────────────

  describe('isDestroyed', () => {
    it('should be false initially', () => {
      effectSignal = new EffectSignal({deps: [depSignal], run: () => {}});
      expect(effectSignal.isDestroyed).toBe(false);
    });

    it('should be true after destroy', () => {
      effectSignal = new EffectSignal({deps: [depSignal], run: () => {}});
      effectSignal.destroy();
      expect(effectSignal.isDestroyed).toBe(true);
    });
  });

  describe('name', () => {
    it('should use provided name', () => {
      effectSignal = new EffectSignal({name: 'my-effect', deps: [depSignal], run: () => {}});
      expect(effectSignal.name).toBe('my-effect');
    });

    it('should auto-generate name from dependencies when not provided', () => {
      effectSignal = new EffectSignal({deps: [depSignal], run: () => {}});
      expect(effectSignal.name).toBe('[dep]');
    });

    it('should auto-generate name from multiple dependencies', () => {
      const dep2 = new StateSignal({name: 'dep2', initialValue: 'x'});
      effectSignal = new EffectSignal({deps: [depSignal, dep2], run: () => {}});
      expect(effectSignal.name).toBe('[dep, dep2]');
      dep2.destroy();
    });
  });

  describe('onDestroy callback', () => {
    it('should call onDestroy callback when destroyed', () => {
      const onDestroy = jest.fn();
      effectSignal = new EffectSignal({deps: [depSignal], run: () => {}, onDestroy});
      effectSignal.destroy();
      expect(onDestroy).toHaveBeenCalledTimes(1);
    });

    it('should not call onDestroy if not provided', () => {
      effectSignal = new EffectSignal({deps: [depSignal], run: () => {}});
      expect(() => effectSignal.destroy()).not.toThrow();
    });
  });

  describe('error handling in run function', () => {
    it('should not crash when run function throws', async () => {
      effectSignal = new EffectSignal({
        deps: [depSignal],
        run: () => {
          throw new Error('effect error');
        },
      });
      depSignal.set(1);
      await delay.by(5);

      // Effect should have been called but error caught internally.
      // Signal should still be functional.
      expect(effectSignal.isDestroyed).toBe(false);
    });

    it('should continue running on subsequent changes after an error', async () => {
      let callCount = 0;
      effectSignal = new EffectSignal({
        deps: [depSignal],
        run: () => {
          callCount++;
          if (callCount === 1) throw new Error('first call error');
        },
      });

      depSignal.set(1);
      await delay.by(5);
      expect(callCount).toBe(1);

      depSignal.set(2);
      await delay.by(5);
      expect(callCount).toBe(2);
    });
  });

  describe('batching', () => {
    it('should batch rapid dependency changes into a single execution', async () => {
      const runFn = jest.fn();
      effectSignal = new EffectSignal({
        deps: [depSignal],
        run: runFn,
      });

      // Rapid changes within the same microtask.
      depSignal.set(1);
      depSignal.set(2);
      depSignal.set(3);

      await delay.by(10);

      // Due to batching (isRunning__ flag), should run once or twice, not three times.
      expect(runFn.mock.calls.length).toBeLessThanOrEqual(2);
      expect(runFn.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('double destroy', () => {
    it('should handle double destroy gracefully', () => {
      effectSignal = new EffectSignal({deps: [depSignal], run: () => {}});
      effectSignal.destroy();
      expect(() => effectSignal.destroy()).not.toThrow();
    });
  });

  describe('destroyed signal', () => {
    it('should not run effect after destroy', async () => {
      const runFn = jest.fn();
      effectSignal = new EffectSignal({
        deps: [depSignal],
        run: runFn,
      });
      effectSignal.destroy();
      depSignal.set(1);
      await delay.by(5);

      expect(runFn).not.toHaveBeenCalled();
    });
  });
});
