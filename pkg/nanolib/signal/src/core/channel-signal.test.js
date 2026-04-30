import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {ChannelSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

/**
 * @typedef {{ 'open-drawer': {panel: string}; 'close-drawer': void; 'show-toast': {message: string} }} TestMap
 */

describe('ChannelSignal', () => {
  /** @type {ChannelSignal<TestMap>} */
  let channel;
  const name = 'test-channel-signal';

  beforeEach(() => {
    channel = new ChannelSignal({name});
  });

  afterEach(() => {
    channel.destroy();
  });

  it('should be defined and have the correct name', () => {
    expect(ChannelSignal).toBeDefined();
    expect(channel).toBeInstanceOf(ChannelSignal);
    expect(channel.name).toBe(name);
  });

  // ── on() — named routing ────────────────────────────────────────────────────

  it('on(): should dispatch a named message and invoke the handler with payload directly', async () => {
    const callback = jest.fn();

    channel.on('open-drawer', callback);
    channel.dispatch('open-drawer', {panel: 'settings'});

    expect(callback).not.toHaveBeenCalled(); // async
    await delay.nextMacrotask();
    // handler receives payload directly, not {name, payload}
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({panel: 'settings'});
  });

  it('on(): should NOT invoke handler when a different message name is dispatched', async () => {
    const callback = jest.fn();

    channel.on('open-drawer', callback);
    channel.dispatch('close-drawer');

    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('on(): should notify multiple handlers registered for the same name', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    channel.on('open-drawer', callback1);
    channel.on('open-drawer', callback2);
    channel.dispatch('open-drawer', {panel: 'cart'});

    await delay.nextMacrotask();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('on(): should not invoke unsubscribed handlers', async () => {
    const callback = jest.fn();
    const sub = channel.on('open-drawer', callback);

    sub.unsubscribe();
    channel.dispatch('open-drawer', {panel: 'settings'});

    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('on(): should handle the "once" option — fires once then auto-removes', async () => {
    const callback = jest.fn();

    channel.on('show-toast', callback, {once: true});
    channel.dispatch('show-toast', {message: 'first'});
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);

    channel.dispatch('show-toast', {message: 'second'});
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1); // not called again
  });

  it('on(): should dispatch a message without payload and pass undefined to handler', async () => {
    const callback = jest.fn();

    channel.on('close-drawer', callback);
    channel.dispatch('close-drawer');

    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('on(): should continue notifying other handlers if one throws', async () => {
    const errorHandler = jest.fn(() => {
      throw new Error('boom');
    });
    const normalHandler = jest.fn();

    channel.on('open-drawer', errorHandler);
    channel.on('open-drawer', normalHandler);
    channel.dispatch('open-drawer', {panel: 'x'});

    await delay.nextMacrotask();
    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(normalHandler).toHaveBeenCalledTimes(1);
  });

  // ── O(1) routing guarantee ──────────────────────────────────────────────────

  it('on(): dispatching name A should never invoke handlers registered for name B (O(1) routing)', async () => {
    const callbackA = jest.fn();
    const callbackB = jest.fn();

    channel.on('open-drawer', callbackA);
    channel.on('show-toast', callbackB);

    // Dispatch 'open-drawer' many times — callbackB must never fire
    for (let i = 0; i < 10; i++) channel.dispatch('open-drawer', {panel: 'x'});

    await delay.nextMacrotask();
    expect(callbackA).toHaveBeenCalledTimes(10);
    expect(callbackB).not.toHaveBeenCalled();
  });

  // ── subscribe() — raw stream ────────────────────────────────────────────────

  it('subscribe(): should receive every dispatched message regardless of name', async () => {
    const callback = jest.fn();

    channel.subscribe(callback);
    channel.dispatch('open-drawer', {panel: 'settings'});
    channel.dispatch('close-drawer');

    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, {name: 'open-drawer', payload: {panel: 'settings'}});
    expect(callback).toHaveBeenNthCalledWith(2, {name: 'close-drawer', payload: undefined});
  });

  it('subscribe(): should fire alongside on() handlers for the same dispatch', async () => {
    const namedCallback = jest.fn();
    const rawCallback = jest.fn();

    channel.on('open-drawer', namedCallback);
    channel.subscribe(rawCallback);
    channel.dispatch('open-drawer', {panel: 'profile'});

    await delay.nextMacrotask();
    expect(namedCallback).toHaveBeenCalledWith({panel: 'profile'});
    expect(rawCallback).toHaveBeenCalledWith({name: 'open-drawer', payload: {panel: 'profile'}});
  });

  // ── untilNext ───────────────────────────────────────────────────────────────

  it('untilNext(): should resolve with the next dispatched raw message', async () => {
    const promise = channel.untilNext();

    channel.dispatch('open-drawer', {panel: 'profile'});

    const msg = await promise;
    expect(msg.name).toBe('open-drawer');
    expect(msg.payload).toEqual({panel: 'profile'});
  });

  // ── destroy ─────────────────────────────────────────────────────────────────

  describe('destroyed signal', () => {
    beforeEach(() => {
      channel.destroy();
    });

    it('should throw when dispatch is called on a destroyed channel', () => {
      expect(() => channel.dispatch('close-drawer')).toThrow(`Cannot interact with a destroyed signal (id: ${name})`);
    });

    it('should throw when on() is called on a destroyed channel', () => {
      expect(() => channel.on('open-drawer', jest.fn())).toThrow(
        `Cannot interact with a destroyed signal (id: ${name})`,
      );
    });
  });
});

describe('ChannelSignal — extra coverage', () => {
  it('should support priority option on subscribe (raw stream)', async () => {
    const channel = new ChannelSignal({name: 'priority-test'});
    /** @type {string[]} */
    const order = [];
    const normalCb = jest.fn(() => order.push('normal'));
    const priorityCb = jest.fn(() => order.push('priority'));

    channel.subscribe(normalCb);
    channel.subscribe(priorityCb, {priority: true});

    channel.dispatch('open-drawer', {panel: 'test'});
    await delay.nextMacrotask();

    expect(order).toEqual(['priority', 'normal']);
    channel.destroy();
  });

  it('should support once option on subscribe (raw stream)', async () => {
    const channel = new ChannelSignal({name: 'once-raw-test'});
    const callback = jest.fn();

    channel.subscribe(callback, {once: true});

    channel.dispatch('open-drawer', {panel: 'first'});
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);

    channel.dispatch('open-drawer', {panel: 'second'});
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1); // Not called again.

    channel.destroy();
  });

  it('should have isDestroyed = false initially', () => {
    const channel = new ChannelSignal({name: 'is-destroyed-ch'});
    expect(channel.isDestroyed).toBe(false);
    channel.destroy();
  });

  it('should have isDestroyed = true after destroy', () => {
    const channel = new ChannelSignal({name: 'is-destroyed-ch-2'});
    channel.destroy();
    expect(channel.isDestroyed).toBe(true);
  });

  it('should clean up named handlers on destroy', async () => {
    const channel = new ChannelSignal({name: 'cleanup-ch'});
    const callback = jest.fn();
    channel.on('open-drawer', callback);
    channel.destroy();

    // After destroy, dispatch should throw.
    expect(() => channel.dispatch('open-drawer', {panel: 'x'})).toThrow();
  });

  it('should handle multiple different message names', async () => {
    const channel = new ChannelSignal({name: 'multi-name'});
    const openCb = jest.fn();
    const closeCb = jest.fn();
    const toastCb = jest.fn();

    channel.on('open-drawer', openCb);
    channel.on('close-drawer', closeCb);
    channel.on('show-toast', toastCb);

    channel.dispatch('open-drawer', {panel: 'settings'});
    channel.dispatch('show-toast', {message: 'hello'});
    await delay.nextMacrotask();

    expect(openCb).toHaveBeenCalledTimes(1);
    expect(openCb).toHaveBeenCalledWith({panel: 'settings'});
    expect(closeCb).not.toHaveBeenCalled();
    expect(toastCb).toHaveBeenCalledTimes(1);
    expect(toastCb).toHaveBeenCalledWith({message: 'hello'});

    channel.destroy();
  });

  it('should handle rapid dispatches of the same name', async () => {
    const channel = new ChannelSignal({name: 'rapid-ch'});
    const callback = jest.fn();
    channel.on('open-drawer', callback);

    for (let i = 0; i < 5; i++) {
      channel.dispatch('open-drawer', {panel: `p${i}`});
    }
    await delay.nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(5);
    expect(callback).toHaveBeenNthCalledWith(1, {panel: 'p0'});
    expect(callback).toHaveBeenNthCalledWith(5, {panel: 'p4'});

    channel.destroy();
  });
});
