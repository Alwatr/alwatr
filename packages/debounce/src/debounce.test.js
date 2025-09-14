import {describe, beforeEach, afterEach, it, expect, jest} from '@jest/globals';
import {createDebouncer} from '@alwatr/debounce';

describe('Debouncer', () => {
  /**
   * @type {import("jest-mock").Mock<import("jest-mock").UnknownFunction>}
   */
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

    it('should execute after delay on single trigger', () => {
      debouncer.trigger('test');
      expect(mockFunc).not.toHaveBeenCalled();
      jest.advanceTimersByTime(300);
      expect(mockFunc).toHaveBeenCalledWith('test');
    });

    it('should reset delay on multiple triggers', () => {
      debouncer.trigger('first');
      jest.advanceTimersByTime(200);
      debouncer.trigger('second');
      jest.advanceTimersByTime(200);
      expect(mockFunc).not.toHaveBeenCalled();
      jest.advanceTimersByTime(100);
      expect(mockFunc).toHaveBeenCalledWith('second');
    });

    it('should not execute if cancelled before delay', () => {
      debouncer.trigger('test');
      debouncer.cancel();
      jest.advanceTimersByTime(300);
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

    it('should not execute again within delay', () => {
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1);
      debouncer.trigger('second');
      jest.advanceTimersByTime(300);
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should execute again after delay', () => {
      debouncer.trigger('first');
      jest.advanceTimersByTime(300);
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

    it('should execute immediately but not after delay on single trigger', () => {
      debouncer.trigger('test');
      expect(mockFunc).toHaveBeenCalledWith('test');
      jest.advanceTimersByTime(300);
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should execute immediately, then trailing on last trigger', () => {
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(mockFunc).toHaveBeenCalledWith('first');
      jest.advanceTimersByTime(200);
      debouncer.trigger('second');
      jest.advanceTimersByTime(100);
      debouncer.trigger('third');
      jest.advanceTimersByTime(100);
      expect(mockFunc).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(300);
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

    it('should cancel pending execution', () => {
      debouncer.trigger('test');
      expect(debouncer.isPending).toBe(true);
      debouncer.cancel();
      expect(debouncer.isPending).toBe(false);
      jest.advanceTimersByTime(300);
      expect(mockFunc).not.toHaveBeenCalled();
    });

    it('should handle cancel on leading debounce', () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
      });
      debouncer.trigger('test');
      expect(mockFunc).toHaveBeenCalledTimes(1);
      debouncer.cancel();
      jest.advanceTimersByTime(300);
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

    it('should execute immediately and cancel pending', () => {
      debouncer.trigger('test');
      expect(mockFunc).not.toHaveBeenCalled();
      debouncer.flush();
      expect(mockFunc).toHaveBeenCalledWith('test');
      expect(debouncer.isPending).toBe(false);
      jest.advanceTimersByTime(300);
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

    it('should execute after maxWait even with continuous triggers', () => {
      debouncer.trigger('first');
      jest.advanceTimersByTime(500);
      debouncer.trigger('second');
      jest.advanceTimersByTime(500);
      expect(mockFunc).toHaveBeenCalledWith('first'); // After maxWait
      debouncer.trigger('third');
      jest.advanceTimersByTime(300);
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

    it('should bind thisContext correctly', () => {
      debouncer.trigger();
      jest.advanceTimersByTime(300);
      expect(context.value).toBe('changed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero delay', () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 0,
      });
      debouncer.trigger('test');
      jest.advanceTimersByTime(0);
      expect(mockFunc).toHaveBeenCalledWith('test');
    });

    it('should handle no arguments', () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
      debouncer.trigger();
      jest.advanceTimersByTime(300);
      expect(mockFunc).toHaveBeenCalledWith();
    });

    it('should handle multiple arguments', () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
      debouncer.trigger('arg1', 'arg2', 123);
      jest.advanceTimersByTime(300);
      expect(mockFunc).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    it('should not execute if func throws', () => {
      mockFunc = jest.fn(() => {
        throw new Error('test');
      });
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
      });
      debouncer.trigger();
      expect(() => jest.advanceTimersByTime(300)).toThrow('test');
    });

    it('should double-invocation with leading: true, trailing: false, and maxWait on multiple trigger', () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: false,
        maxWait: 500,
      });
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1); // Leading call
      jest.advanceTimersByTime(200);
      debouncer.trigger('second');
      jest.advanceTimersByTime(200);
      expect(mockFunc).toHaveBeenCalledTimes(1); // Should not call again yet
      jest.advanceTimersByTime(200); // Trigger maxWait, which may call flush
      expect(mockFunc).toHaveBeenCalledTimes(2); // Should not call again
    });

    it('should prevent double-invocation with leading: true, trailing: false, and maxWait on single trigger', () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: false,
        maxWait: 200,
      });
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1); // Leading call
      jest.advanceTimersByTime(300);
      expect(mockFunc).toHaveBeenCalledTimes(1); // Should not call again
    });

    it('should prevent double-invocation with leading: true, trailing: false, and flush', () => {
      debouncer = createDebouncer({
        func: mockFunc,
        delay: 300,
        leading: true,
        trailing: false,
      });
      debouncer.trigger('first');
      expect(mockFunc).toHaveBeenCalledTimes(1); // Leading call
      jest.advanceTimersByTime(100);
      debouncer.flush();
      debouncer.flush();
      expect(mockFunc).toHaveBeenCalledTimes(1); // Should not call again
    });
  });
  
  it('should execute after delay for trailing debounce', () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: false,
      trailing: true,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(0); // No call yet
    jest.advanceTimersByTime(300);
    expect(mockFunc).toHaveBeenCalledTimes(1); // Trailing call
  });

  it('should execute immediately for leading debounce but not for trailing on single trigger', () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: true,
      trailing: true,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(1); // leading call
    jest.advanceTimersByTime(300);
    expect(mockFunc).toHaveBeenCalledTimes(1); // no trailing call on same argument
  });

  it('should execute immediately for leading debounce but not for trailing on single trigger or extra flush', () => {
    debouncer = createDebouncer({
      func: mockFunc,
      delay: 300,
      leading: true,
      trailing: true,
    });
    debouncer.trigger('first');
    expect(mockFunc).toHaveBeenCalledTimes(1); // leading call
    jest.advanceTimersByTime(100);
    debouncer.flush();
    jest.advanceTimersByTime(100);
    expect(mockFunc).toHaveBeenCalledTimes(1); // no trailing call on same argument
  });

  it('should execute immediately for leading debounce but not for trailing on single trigger', () => {
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
    jest.advanceTimersByTime(300);
    expect(mockFunc).toHaveBeenCalledTimes(2); // Trailing call
    expect(mockFunc).toHaveBeenLastCalledWith('second');
  });

  it('should execute immediately for leading debounce but not for trailing on single trigger', () => {
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
    jest.advanceTimersByTime(300);
    debouncer.flush();
    expect(mockFunc).toHaveBeenCalledTimes(2); // no trailing call
  });
});
