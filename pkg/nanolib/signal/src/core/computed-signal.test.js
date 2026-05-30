import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {ComputedSignal, StateSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('ComputedSignal', () => {
  /** @type {StateSignal<number>} */
  let dep1;
  /** @type {StateSignal<number>} */
  let dep2;
  /** @type {ComputedSignal<number>} */
  let signal;
  const name = 'test-computed-signal';

  beforeEach(() => {
    dep1 = new StateSignal({name: 'dep1', initialValue: 1});
    dep2 = new StateSignal({name: 'dep2', initialValue: 2});
    signal = new ComputedSignal({
      name,
      deps: [dep1, dep2],
      get: () => dep1.get() + dep2.get(),
    });
  });

  afterEach(() => {
    signal.destroy();
    dep1.destroy();
    dep2.destroy();
  });

  it('should be defined and have the correct name and initial value', () => {
    expect(ComputedSignal).toBeDefined();
    expect(signal).toBeInstanceOf(ComputedSignal);
    expect(signal.name).toBe(name);
    expect(signal.get()).toBe(3); // 1 + 2
  });

  it('should compute value from dependencies', async () => {
    expect(signal.get()).toBe(3);
    dep1.set(5);
    await signal.untilNext();
    expect(signal.get()).toBe(7); // 5 + 2
  });

  it('should notify subscriber with receivePrevious', async () => {
    const callback = jest.fn();

    signal.subscribe(callback);
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it('should notify subscribers when computed value changes', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {receivePrevious: false});
    dep1.set(10);
    await signal.untilNext();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(12); // 10 + 2
  });

  it('should not notify if computed value does not change', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {receivePrevious: false});
    dep1.set(1); // Same as initial
    await delay.by(5);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should compute once if multiple dependencies change', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {receivePrevious: false});
    dep1.set(3);
    await delay.nextMacrotask();
    dep2.set(4);
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(7); // 3 + 4
  });

  it('should notify multiple subscribers', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    signal.subscribe(callback1, {receivePrevious: false});
    signal.subscribe(callback2, {receivePrevious: false});
    dep2.set(5);
    await signal.untilNext();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(6); // 1 + 5
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(6);
  });

  it('should not notify unsubscribed listeners', async () => {
    const callback = jest.fn();
    const subscription = signal.subscribe(callback, {receivePrevious: false});
    subscription.unsubscribe();
    dep1.set(10);
    await signal.untilNext();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {once: true, receivePrevious: false});
    dep1.set(10);
    await signal.untilNext();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(12);
    dep2.set(20);
    await signal.untilNext();
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should resolve untilNext() with the next computed value', async () => {
    const untilNextPromise = signal.untilNext();
    dep1.set(5);
    await expect(untilNextPromise).resolves.toBe(7);
  });

  it('should handle no dependencies', () => {
    const noDepSignal = new ComputedSignal({
      name: 'no-dep',
      deps: [],
      get: () => 42,
    });
    expect(noDepSignal.get()).toBe(42);
    noDepSignal.destroy();
  });

  it('should continue notifying other subscribers if one callback throws an error', async () => {
    const callback1 = jest.fn(() => {
      throw new Error('Test error');
    });
    const callback2 = jest.fn();
    signal.subscribe(callback1, {receivePrevious: false});
    signal.subscribe(callback2, {receivePrevious: false});
    dep1.set(10);
    await signal.untilNext();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should update without any subscribers', async () => {
    expect(signal.get()).toBe(3);
    dep1.set(7);
    await signal.untilNext();
    expect(signal.get()).toBe(9); // 7 + 2
  });

  describe('destroyed signal', () => {
    it('should throw error when accessing value after destroy', () => {
      signal.destroy();
      expect(() => signal.get()).toThrow();
    });

    it('should not notify after destroy', async () => {
      const callback = jest.fn();
      signal.subscribe(callback, {receivePrevious: false});
      signal.destroy();
      dep1.set(10);
      await delay.by(5);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});

describe('ComputedSignal — extra coverage', () => {
  it('should have isDestroyed = false initially', () => {
    const dep = new StateSignal({name: 'dep-extra', initialValue: 1});
    const computed = new ComputedSignal({name: 'extra-computed', deps: [dep], get: () => dep.get()});
    expect(computed.isDestroyed).toBe(false);
    computed.destroy();
    dep.destroy();
  });

  it('should have isDestroyed = true after destroy', () => {
    const dep = new StateSignal({name: 'dep-extra-2', initialValue: 1});
    const computed = new ComputedSignal({name: 'extra-computed-2', deps: [dep], get: () => dep.get()});
    computed.destroy();
    expect(computed.isDestroyed).toBe(true);
    dep.destroy();
  });

  it('should clean up dependency subscriptions on destroy', async () => {
    const dep = new StateSignal({name: 'dep-cleanup', initialValue: 0});
    const getFn = jest.fn(() => dep.get());
    const computed = new ComputedSignal({name: 'cleanup-computed', deps: [dep], get: getFn});

    // Initial computation.
    expect(getFn).toHaveBeenCalledTimes(1);

    computed.destroy();

    // After destroy, changing the dependency should NOT trigger recomputation.
    const callCountBefore = getFn.mock.calls.length;
    dep.set(10);
    await delay.by(10);
    expect(getFn.mock.calls.length).toBe(callCountBefore);

    dep.destroy();
  });

  it('should call onDestroy callback when destroyed', () => {
    const dep = new StateSignal({name: 'dep-ondestroy', initialValue: 0});
    const onDestroy = jest.fn();
    const computed = new ComputedSignal({name: 'ondestroy-computed', deps: [dep], get: () => dep.get(), onDestroy});
    computed.destroy();
    expect(onDestroy).toHaveBeenCalledTimes(1);
    dep.destroy();
  });

  it('should handle complex computed values (objects)', async () => {
    const firstName = new StateSignal({name: 'first', initialValue: 'John'});
    const lastName = new StateSignal({name: 'last', initialValue: 'Doe'});
    const fullName = new ComputedSignal({
      name: 'full-name',
      deps: [firstName, lastName],
      get: () => ({first: firstName.get(), last: lastName.get()}),
    });

    expect(fullName.get()).toEqual({first: 'John', last: 'Doe'});

    firstName.set('Jane');
    await fullName.untilNext();
    expect(fullName.get()).toEqual({first: 'Jane', last: 'Doe'});

    fullName.destroy();
    firstName.destroy();
    lastName.destroy();
  });

  it('should support chained computed signals', async () => {
    const base = new StateSignal({name: 'base', initialValue: 2});
    const doubled = new ComputedSignal({name: 'doubled', deps: [base], get: () => base.get() * 2});
    const quadrupled = new ComputedSignal({name: 'quadrupled', deps: [doubled], get: () => doubled.get() * 2});

    expect(quadrupled.get()).toBe(8);

    base.set(5);
    await quadrupled.untilNext();
    expect(quadrupled.get()).toBe(20);

    quadrupled.destroy();
    doubled.destroy();
    base.destroy();
  });
});
