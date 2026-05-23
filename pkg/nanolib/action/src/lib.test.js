import {describe, it, expect, jest} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';

// Ensure DOM globals are available.
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

import {actionService} from './action-service.js';

const {internalChannel_, logger_} = actionService;

// ─── Internal Channel ─────────────────────────────────────────────────────────

describe('Lib — internalChannel_', () => {
  it('should be defined and have on/dispatch methods', () => {
    expect(internalChannel_).toBeDefined();
    expect(typeof internalChannel_.on).toBe('function');
    expect(typeof internalChannel_.dispatch).toBe('function');
  });

  it('should route messages by key (O(1) routing)', async () => {
    const cbA = jest.fn();
    const cbB = jest.fn();

    const subA = internalChannel_.on('channel_test_a', cbA);
    const subB = internalChannel_.on('channel_test_b', cbB);

    internalChannel_.dispatch('channel_test_a', {type: 'channel_test_a', payload: 'a'});

    // Wait for async dispatch.
    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(cbA).toHaveBeenCalledTimes(1);
    expect(cbA).toHaveBeenCalledWith({type: 'channel_test_a', payload: 'a'});
    expect(cbB).not.toHaveBeenCalled();

    subA.unsubscribe();
    subB.unsubscribe();
  });

  it('should support multiple subscribers on the same key', async () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const sub1 = internalChannel_.on('channel_multi', cb1);
    const sub2 = internalChannel_.on('channel_multi', cb2);

    internalChannel_.dispatch('channel_multi', {type: 'channel_multi', payload: 'data'});

    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);

    sub1.unsubscribe();
    sub2.unsubscribe();
  });

  it('should not notify unsubscribed handlers', async () => {
    const cb = jest.fn();
    const sub = internalChannel_.on('channel_unsub', cb);
    sub.unsubscribe();

    internalChannel_.dispatch('channel_unsub', {type: 'channel_unsub', payload: 'data'});

    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(cb).not.toHaveBeenCalled();
  });
});

// ─── Logger ───────────────────────────────────────────────────────────────────

describe('Lib — logger_', () => {
  it('should be defined', () => {
    expect(logger_).toBeDefined();
  });

  it('should have standard logger methods', () => {
    // In production (ALWATR_DEBUG=0), debug methods may be undefined.
    // But accident and error should always be defined.
    expect(typeof logger_.accident).toBe('function');
    expect(typeof logger_.error).toBe('function');
  });
});
