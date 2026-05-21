import {describe, expect, test} from 'bun:test';
import {Lazy, lazy} from '@alwatr/lazy';

describe('Lazy', () => {
  test('initializer is not called on construction', () => {
    let called = false;
    const lazy = new Lazy(() => {
      called = true;
      return 42;
    });
    expect(called).toBe(false);
    expect(lazy.isInitialized()).toBe(false);
  });

  test('initializer is called on first .instance access', () => {
    let callCount = 0;
    const lazy = new Lazy(() => {
      callCount++;
      return 'hello';
    });
    expect(lazy.instance).toBe('hello');
    expect(callCount).toBe(1);
  });

  test('initializer is called only once across multiple .instance accesses', () => {
    let callCount = 0;
    const lazy = new Lazy(() => {
      callCount++;
      return {id: 1};
    });
    const a = lazy.instance;
    const b = lazy.instance;
    const c = lazy.instance;
    expect(callCount).toBe(1);
    // All accesses return the exact same cached reference
    expect(a).toBe(b);
    expect(b).toBe(c);
  });

  test('isInitialized() returns true after first .instance access', () => {
    const lazy = new Lazy(() => 99);
    expect(lazy.isInitialized()).toBe(false);
    void lazy.instance;
    expect(lazy.isInitialized()).toBe(true);
  });

  test('works with null as a valid value', () => {
    const lazy = new Lazy(() => null);
    expect(lazy.instance).toBeNull();
    expect(lazy.isInitialized()).toBe(true);
  });

  test('works with undefined as a valid value', () => {
    const lazy = new Lazy(() => undefined);
    expect(lazy.instance).toBeUndefined();
    expect(lazy.isInitialized()).toBe(true);
  });

  test('works with complex object values', () => {
    const data = {name: 'alwatr', version: 9};
    const lazy = new Lazy(() => data);
    expect(lazy.instance).toEqual({name: 'alwatr', version: 9});
    expect(lazy.instance).toBe(data); // same reference
  });

  test('handles re-entrant access during initialization gracefully', () => {
    // Edge case: initializer itself accesses .instance
    // Should return undefined on re-entry (not infinite loop)
    let reentrantValue;
    const lazy = new Lazy(() => {
      // During initialization, try to read .instance again
      reentrantValue = lazy.instance;
      return 42;
    });
    const result = lazy.instance;
    expect(result).toBe(42);
    expect(reentrantValue).toBeUndefined(); // re-entry saw undefined
    expect(lazy.isInitialized()).toBe(true);
  });
});

describe('lazy() factory function', () => {
  test('returns a Lazy instance', () => {
    const lazyVal = lazy(() => 'test');
    expect(lazyVal).toBeInstanceOf(Lazy);
  });

  test('defers execution like the class constructor', () => {
    let called = false;
    const lazyVal = lazy(() => {
      called = true;
      return true;
    });
    expect(called).toBe(false);
    expect(lazyVal.instance).toBe(true);
    expect(called).toBe(true);
  });
});
