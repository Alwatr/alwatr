import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {createDebouncer} from '@alwatr/debounce';

describe('Debouncer', () => {
  const fakeTimePassage = async (ms = 0) => {
    jest.advanceTimersByTime(ms);
    await Promise.resolve();
  };

  /** @type {import('bun:test').Mock<(...args: unknown[]) => void>} */
  let mockFunc;
  /**
   * @type {import("@alwatr/debounce").Debouncer<typeof mockFunc>}
   */
  let debouncer;

  beforeEach(() => {
    mockFunc = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Basic Trailing Debounce (default)', () => {
    beforeEach(() => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
    });

    it('should execute after delay on single trigger', async () => {
      debouncer.trigger('test');
      expect(mockFunc).not.toHaveBeenCalled();
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledWith('test');
    });

    it('should reset delay on multiple triggers', async () => {
      debouncer.trigger('first');
      await fakeTimePassage(200);
      debouncer.trigger('second');
      await fakeTimePassage(200);
      expect(mockFunc).not.toHaveBeenCalled();
      await fakeTimePassage(100);
      expect(mockFunc).toHaveBeenCalledWith('second');
    });

    it('should not execute if cancelled before delay', async () => {
      debouncer.trigger('test');
      debouncer.cancel();
      await fakeTimePassage(300);
      expect(mockFunc).not.toHaveBeenCalled();
    });

    it('should keep the this context for trigger', async () => {
      setTimeout(debouncer.trigger, 10, 'test');
      await fakeTimePassage(310);
      expect(mockFunc).toHaveBeenCalled();
      expect(mockFunc).toHaveBeenCalledWith('test');
    });

    it('should keep the this context for cancel', async () => {
      debouncer.trigger('test');
      setTimeout(debouncer.cancel, 10);
      await fakeTimePassage(310);
      expect(mockFunc).not.toHaveBeenCalled();
    });
  });

  describe('Leading Debounce', () => {
    beforeEach(() => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: false,
      });
    });

    it('should execute immediately on first trigger', () => {
      debouncer.trigger('test');
      expect(mockFunc).toHaveBeenCalledWith('test');
    });

    it('should not execute again within delay', async () => {
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1);
      debouncer.trigger('second');
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should execute again after delay', async () => {
      debouncer.trigger('first');
      await fakeTimePassage(300);
      debouncer.trigger('second');
      expect(mockFunc).toHaveBeenCalledTimes(2);
    });
  });

  describe('Both Leading and Trailing', () => {
    beforeEach(() => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: true,
      });
    });

    it('should execute immediately but not after delay on single trigger', async () => {
      debouncer.trigger('test');
      expect(mockFunc).toHaveBeenCalledWith('test');
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should execute immediately, then trailing on last trigger', async () => {
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(mockFunc).toHaveBeenCalledWith('first');
      await fakeTimePassage(200);
      debouncer.trigger('second');
      await fakeTimePassage(100);
      debouncer.trigger('third');
      await fakeTimePassage(100);
      expect(mockFunc).toHaveBeenCalledTimes(1);
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledTimes(2);
      expect(mockFunc).toHaveBeenLastCalledWith('third');
    });
  });

  describe('Cancel Functionality', () => {
    beforeEach(() => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
    });

    it('should cancel pending execution', async () => {
      debouncer.trigger('test');
      expect(debouncer.isPending).toBe(true);
      debouncer.cancel();
      expect(debouncer.isPending).toBe(false);
      await fakeTimePassage(300);
      expect(mockFunc).not.toHaveBeenCalled();
    });

    it('should handle cancel on leading debounce', async () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
      });
      debouncer.trigger('test');
      expect(mockFunc).toHaveBeenCalledTimes(1);
      debouncer.cancel();
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledTimes(1); // No trailing call
    });
  });

  describe('Flush Functionality', () => {
    beforeEach(() => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
    });

    it('should execute immediately and cancel pending', async () => {
      debouncer.trigger('test');
      expect(mockFunc).not.toHaveBeenCalled();
      debouncer.flush();
      expect(mockFunc).toHaveBeenCalledWith('test');
      expect(debouncer.isPending).toBe(false);
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should do nothing if no pending call', () => {
      debouncer.flush();
      expect(mockFunc).not.toHaveBeenCalled();
    });
  });

  describe('MaxWait Functionality', () => {
    beforeEach(() => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        maxWait: 1000,
      });
    });

    it('should execute after maxWait even with continuous triggers', async () => {
      debouncer.trigger('first');
      await fakeTimePassage(500);
      debouncer.trigger('second');
      await fakeTimePassage(500);
      expect(mockFunc).toHaveBeenCalledWith('first'); // After maxWait
      debouncer.trigger('third');
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledWith('third');
    });
  });

  describe('ThisContext Binding', () => {
    /**
     * @type {{ value: string; }}
     */
    let context;

    beforeEach(() => {
      context = {value: 'test'};
      mockFunc = jest.fn(function () {
        this.value = 'changed';
      });
      debouncer = createDebouncer({
        func: mockFunc,
        thisContext: context,
        delay: 300,
      });
    });

    it('should bind thisContext correctly', async () => {
      debouncer.trigger();
      await fakeTimePassage(300);
      expect(context.value).toBe('changed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero delay', async () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 0,
      });
      debouncer.trigger('test');
      await fakeTimePassage(0);
      expect(mockFunc).toHaveBeenCalledWith('test');
    });

    it('should handle no arguments', async () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
      debouncer.trigger();
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledWith();
    });

    it('should handle multiple arguments', async () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
      debouncer.trigger('arg1', 'arg2', 123);
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    it('should double-invocation with leading: true, trailing: false, and maxWait on multiple trigger', async () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: false,
        maxWait: 500,
      });
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1); // Leading call
      await fakeTimePassage(200);
      debouncer.trigger('second');
      await fakeTimePassage(200);
      expect(mockFunc).toHaveBeenCalledTimes(1); // Should not call again yet
      await fakeTimePassage(200); // Trigger maxWait, which may call flush
      expect(mockFunc).toHaveBeenCalledTimes(2); // Should be called a second time due to maxWait
    });

    it('should prevent double-invocation with leading: true, trailing: false, and maxWait on single trigger', async () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: false,
        maxWait: 200,
      });
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1); // Leading call
      await fakeTimePassage(300);
      expect(mockFunc).toHaveBeenCalledTimes(1); // Should not call again
    });

    it('should prevent double-invocation with leading: true, trailing: false, and flush', async () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: false,
      });
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1); // Leading call
      await fakeTimePassage(100);
      debouncer.flush();
      debouncer.flush();
      expect(mockFunc).toHaveBeenCalledTimes(1); // Should not call again
    });
  });

  it('should execute after delay for trailing debounce', async () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: false,
      trailing: true,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(0); // No call yet
    await fakeTimePassage(300);
    expect(mockFunc).toHaveBeenCalledTimes(1); // Trailing call
  });
  it('should execute leading but skip trailing on single trigger', async () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: true,
      trailing: true,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(1); // leading call
    await fakeTimePassage(300);
    expect(mockFunc).toHaveBeenCalledTimes(1); // no trailing call on same argument
  });

  it('should execute leading and skip trailing after flush', async () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: true,
      trailing: true,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(1); // leading call
    await fakeTimePassage(100);
    debouncer.flush();
    await fakeTimePassage(100);
    expect(mockFunc).toHaveBeenCalledTimes(1); // no trailing call on same argument
  });

  it('should execute leading and trailing on multiple triggers', async () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: true,
      trailing: true,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(1); // leading call
    debouncer.trigger('second');
    expect(mockFunc).toHaveBeenCalledTimes(1); // No call again yet
    await fakeTimePassage(300);
    expect(mockFunc).toHaveBeenCalledTimes(2); // Trailing call
    expect(mockFunc).toHaveBeenLastCalledWith('second');
  });

  it('should execute leading and flush, skip trailing', async () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: true,
      trailing: false,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(1); // leading call
    debouncer.trigger('second');
    expect(mockFunc).toHaveBeenCalledTimes(1); // No call again yet
    debouncer.flush();
    debouncer.flush();
    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(mockFunc).toHaveBeenLastCalledWith('second');
    await fakeTimePassage(300);
    debouncer.flush();
    expect(mockFunc).toHaveBeenCalledTimes(2); // no trailing call
  });
});
