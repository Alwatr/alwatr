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
    depSignal.destroy();
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
