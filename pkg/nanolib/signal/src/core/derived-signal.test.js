import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {DerivedSignal, StateSignal, createDerivedSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('DerivedSignal', () => {
  /** @type {StateSignal<number>} */
  let source;
  /** @type {DerivedSignal<number, string>} */
  let derived;
  const name = 'test-derived-signal';

  beforeEach(() => {
    source = new StateSignal({name: 'source', initialValue: 10});
    derived = new DerivedSignal({
      name,
      source,
      projector: (val) => `value-${val}`,
    });
  });

  afterEach(() => {
    derived.destroy();
    source.destroy();
  });

  it('should be defined and have correct name and initial value', () => {
    expect(DerivedSignal).toBeDefined();
    expect(derived).toBeInstanceOf(DerivedSignal);
    expect(derived.name).toBe(name);
    // Since there are no subscribers, it should dynamically compute from source.get()
    expect(derived.get()).toBe('value-10');
  });

  it('should dynamically compute from source on get() when cold (no active subscribers)', () => {
    expect(derived.get()).toBe('value-10');

    // Set new value on source. Since derived has no subscribers, it won't subscribe to source,
    // but get() should dynamically evaluate it.
    source.set(20);
    expect(derived.get()).toBe('value-20');
  });

  it('should notify subscriber when source changes and derived is awake', async () => {
    const callback = jest.fn();
    derived.subscribe(callback, {receivePrevious: false});

    source.set(30);
    await derived.untilNext();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('value-30');
  });

  it('should hibernate when all subscribers unsubscribe', async () => {
    const callback = jest.fn();
    const sub = derived.subscribe(callback, {receivePrevious: false});

    // Awake state
    source.set(40);
    await derived.untilNext();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('value-40');

    // Hibernate state
    sub.unsubscribe();

    // Change source value while hibernated
    source.set(50);
    await delay.by(10);
    expect(callback).toHaveBeenCalledTimes(1); // Should not have been called again

    // Dynamic get should still return the fresh value
    expect(derived.get()).toBe('value-50');
  });

  it('should resolve untilNext() correctly', async () => {
    const untilNextPromise = derived.untilNext();
    source.set(60);
    await expect(untilNextPromise).resolves.toBe('value-60');
  });

  it('should support destroying derived signal and throwing on get()', () => {
    derived.destroy();
    expect(derived.isDestroyed).toBe(true);
    expect(() => derived.get()).toThrow();
  });
});

describe('createDerivedSignal creator', () => {
  it('should instantiate DerivedSignal correctly via factory creator', () => {
    const source = new StateSignal({name: 'source-creator', initialValue: 5});
    const derived = createDerivedSignal({
      name: 'derived-creator',
      source,
      projector: (v) => v * 2,
    });

    expect(derived).toBeInstanceOf(DerivedSignal);
    expect(derived.name).toBe('derived-creator');
    expect(derived.get()).toBe(10);

    derived.destroy();
    source.destroy();
  });
});
