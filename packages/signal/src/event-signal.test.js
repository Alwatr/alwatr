import {EventSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('EventSignal', () => {
  /** @type {EventSignal<unknown>} */
  let signal;
  const signalId = 'test-event-signal';

  beforeEach(() => {
    signal = new EventSignal({signalId});
  });

  afterEach(() => {
    signal.destroy();
  });

  it('should be defined and have the correct signalId', () => {
    expect(EventSignal).toBeDefined();
    expect(signal).toBeInstanceOf(EventSignal);
    expect(signal.signalId).toBe(signalId);
  });

  it('should dispatch an event and notify a subscriber with the correct payload', async () => {
    const callback = jest.fn();
    const payload = {data: 'test'};

    signal.subscribe(callback);
    signal.dispatch(payload);

    expect(callback).not.toHaveBeenCalled(); // Should be async
    await delay.nextMicrotask();
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

    await delay.nextMicrotask();
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

    await delay.nextMicrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {once: true});

    signal.dispatch('first-dispatch');
    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('first-dispatch');

    signal.dispatch('second-dispatch');
    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should resolve untilNext() with the next dispatched payload', async () => {
    const payload = {value: 42};
    const untilNextPromise = signal.untilNext();

    signal.dispatch(payload);

    await expect(untilNextPromise).resolves.toBe(payload);
  });

  it('should handle dispatching without a payload (void)', async () => {
    const voidSignal = new EventSignal({signalId: 'void-signal'});
    const callback = jest.fn();
    voidSignal.subscribe(callback);

    voidSignal.dispatch();

    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
    voidSignal.destroy();
  });

  it('should handle dispatching with undefined payload explicitly', async () => {
    const callback = jest.fn();
    signal.subscribe(callback);

    signal.dispatch(undefined);

    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('should notify high-priority subscribers first', async () => {
    const callOrder = [];
    const callback1 = jest.fn(() => callOrder.push('normal'));
    const callback2 = jest.fn(() => callOrder.push('priority'));

    signal.subscribe(callback1); // Normal priority
    signal.subscribe(callback2, {priority: true}); // High priority
    signal.dispatch('test');

    await delay.nextMicrotask();
    expect(callOrder).toEqual(['priority', 'normal']);
  });

  it('should not notify disabled subscribers', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    signal.subscribe(callback1);
    signal.subscribe(callback2, {disabled: true});
    signal.dispatch('test');

    await delay.nextMicrotask();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();
  });

  it('should handle async callbacks correctly', async () => {
    const callback = jest.fn(async () => {
      await delay.nextMicrotask();
      return 'done';
    });

    signal.subscribe(callback);
    const dispatchPromise = signal.dispatch('test');

    // Dispatch should wait for the async callback
    await dispatchPromise;
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

    await delay.nextMicrotask();
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

  describe('destroyed signal', () => {
    beforeEach(() => {
      signal.destroy();
    });

    it('should throw an error when dispatch is called on a destroyed signal', () => {
      expect(() => signal.dispatch('test')).toThrow(`Cannot interact with a destroyed signal (id: ${signalId})`);
    });

    it('should throw an error when subscribe is called on a destroyed signal', () => {
      expect(() => signal.subscribe(jest.fn())).toThrow(`Cannot interact with a destroyed signal (id: ${signalId})`);
    });

    it('should throw an error when untilNext is called on a destroyed signal', () => {
      expect(() => signal.untilNext()).toThrow(`Cannot interact with a destroyed signal (id: ${signalId})`);
    });

    it('should not notify any listeners after being destroyed', async () => {
      const localSignal = new EventSignal({signalId: 'local'});
      const callback = jest.fn();
      localSignal.subscribe(callback);

      localSignal.destroy();
      localSignal.dispatch();

      await delay.nextMicrotask();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
