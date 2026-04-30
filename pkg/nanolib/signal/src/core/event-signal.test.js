import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {EventSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('EventSignal', () => {
  /** @type {EventSignal<unknown>} */
  let signal;
  const name = 'test-event-signal';

  beforeEach(() => {
    signal = new EventSignal({name});
  });

  afterEach(() => {
    signal.destroy();
  });

  it('should be defined and have the correct name', () => {
    expect(EventSignal).toBeDefined();
    expect(signal).toBeInstanceOf(EventSignal);
    expect(signal.name).toBe(name);
  });

  it('should dispatch an event and notify a subscriber with the correct payload', async () => {
    const callback = jest.fn();
    const payload = {data: 'test'};

    signal.subscribe(callback);
    signal.dispatch(payload);

    expect(callback).not.toHaveBeenCalled(); // Should be async
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(payload);
  });

  it('should notify multiple subscribers', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const payload = 'event-data';

    signal.subscribe(callback1);
    signal.subscribe(callback2);
    signal.dispatch(payload);

    await delay.nextMacrotask();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(payload);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(payload);
  });

  it('should not notify unsubscribed listeners', async () => {
    const callback = jest.fn();
    const subscription = signal.subscribe(callback);

    subscription.unsubscribe();
    signal.dispatch('some-data');

    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {once: true});

    signal.dispatch('first-dispatch');
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('first-dispatch');

    signal.dispatch('second-dispatch');
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should resolve untilNext() with the next dispatched payload', async () => {
    const payload = {value: 42};
    const untilNextPromise = signal.untilNext();

    signal.dispatch(payload);

    await expect(untilNextPromise).resolves.toBe(payload);
  });

  it('should handle dispatching without a payload (void)', async () => {
    const voidSignal = new EventSignal({name: 'void-signal'});
    const callback = jest.fn();
    voidSignal.subscribe(callback);

    voidSignal.dispatch();

    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
    voidSignal.destroy();
  });

  it('should handle dispatching with undefined payload explicitly', async () => {
    const callback = jest.fn();
    signal.subscribe(callback);

    signal.dispatch(undefined);

    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('should notify high-priority subscribers first', async () => {
    /**
     * @type {string[]}
     */
    const callOrder = [];
    const callback1 = jest.fn(() => callOrder.push('normal'));
    const callback2 = jest.fn(() => callOrder.push('priority'));

    signal.subscribe(callback1); // Normal priority
    signal.subscribe(callback2, {priority: true}); // High priority
    signal.dispatch('test');

    await delay.nextMacrotask();
    expect(callOrder).toEqual(['priority', 'normal']);
  });

  it('should handle async callbacks correctly', async () => {
    const callback = jest.fn(async () => {
      await delay.nextMacrotask();
      return 'done';
    });

    signal.subscribe(callback);
    signal.dispatch('test');

    // Dispatch should not be awaited, but we need to wait for the microtask queue to be processed.
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should continue notifying other subscribers if one callback throws an error', async () => {
    const errorCallback = jest.fn(() => {
      throw new Error('Test error');
    });
    const normalCallback = jest.fn();

    signal.subscribe(errorCallback);
    signal.subscribe(normalCallback);
    signal.dispatch('test');

    await delay.nextMacrotask();
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(normalCallback).toHaveBeenCalledTimes(1);
  });

  it('should resolve multiple untilNext() calls with the same dispatched payload', async () => {
    const firstPromise = signal.untilNext();
    const secondPromise = signal.untilNext();

    const payload = 'test-payload';
    signal.dispatch(payload);

    // Both promises should resolve with the same payload
    await expect(firstPromise).resolves.toBe(payload);
    await expect(secondPromise).resolves.toBe(payload);
  });

  it('should multiple dispatch calls notify subscribers each time', async () => {
    const callback = jest.fn();
    signal.subscribe(callback);

    signal.dispatch(1);
    signal.dispatch(2);
    signal.dispatch(3);

    await delay.nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1);
    expect(callback).toHaveBeenNthCalledWith(2, 2);
    expect(callback).toHaveBeenNthCalledWith(3, 3);
  });

  describe('destroyed signal', () => {
    beforeEach(() => {
      signal.destroy();
    });

    it('should throw an error when dispatch is called on a destroyed signal', () => {
      expect(() => signal.dispatch('test')).toThrow(`Cannot interact with a destroyed signal (id: ${name})`);
    });

    it('should throw an error when subscribe is called on a destroyed signal', () => {
      expect(() => signal.subscribe(jest.fn())).toThrow(`Cannot interact with a destroyed signal (id: ${name})`);
    });

    it('should throw an error when untilNext is called on a destroyed signal', () => {
      expect(() => signal.untilNext()).toThrow(`Cannot interact with a destroyed signal (id: ${name})`);
    });

    it('should not notify any listeners after being destroyed', async () => {
      const localSignal = new EventSignal({name: 'local'});
      const callback = jest.fn();
      localSignal.subscribe(callback);

      localSignal.destroy();
      expect(() => localSignal.dispatch()).toThrow();

      await delay.nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});

describe('EventSignal — extra coverage', () => {
  it('should have isDestroyed = false initially', () => {
    const s = new EventSignal({name: 'is-destroyed-test'});
    expect(s.isDestroyed).toBe(false);
    s.destroy();
  });

  it('should have isDestroyed = true after destroy', () => {
    const s = new EventSignal({name: 'is-destroyed-test-2'});
    s.destroy();
    expect(s.isDestroyed).toBe(true);
  });

  it('should call onDestroy callback when destroyed', () => {
    const onDestroy = jest.fn();
    const s = new EventSignal({name: 'on-destroy-test', onDestroy});
    s.destroy();
    expect(onDestroy).toHaveBeenCalledTimes(1);
  });

  it('should ignore receivePrevious option (EventSignal has no state)', async () => {
    const s = new EventSignal({name: 'no-receive-prev'});
    const callback = jest.fn();
    // Even with receivePrevious: true, EventSignal should NOT call the callback immediately.
    s.subscribe(callback, {receivePrevious: true});
    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();

    // Only dispatched events should trigger the callback.
    s.dispatch('data');
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    s.destroy();
  });

  it('should handle rapid dispatches correctly', async () => {
    const s = new EventSignal({name: 'rapid-dispatch'});
    const callback = jest.fn();
    s.subscribe(callback);

    for (let i = 0; i < 10; i++) {
      s.dispatch(i);
    }

    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(10);
    for (let i = 0; i < 10; i++) {
      expect(callback).toHaveBeenNthCalledWith(i + 1, i);
    }
    s.destroy();
  });

  it('should support subscribing with once + priority together', async () => {
    const s = new EventSignal({name: 'once-priority'});
    /** @type {string[]} */
    const order = [];
    const normalCb = jest.fn(() => order.push('normal'));
    const priorityOnceCb = jest.fn(() => order.push('priority-once'));

    s.subscribe(normalCb);
    s.subscribe(priorityOnceCb, {once: true, priority: true});

    s.dispatch('test');
    await delay.nextMacrotask();

    expect(order).toEqual(['priority-once', 'normal']);
    expect(priorityOnceCb).toHaveBeenCalledTimes(1);

    // Second dispatch — priority-once should not fire again.
    s.dispatch('test2');
    await delay.nextMacrotask();
    expect(priorityOnceCb).toHaveBeenCalledTimes(1);
    expect(normalCb).toHaveBeenCalledTimes(2);

    s.destroy();
  });
});
