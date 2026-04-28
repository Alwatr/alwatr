import {describe, expect, test} from 'bun:test';
import {Lazy, lazy} from '@alwatr/lazy';

describe('Lazy', () => {
  test('initializer is not called on construction', () => {
    let called = false;
    const instance = new Lazy(() => {
      called = true;
      return 42;
    });
    expect(called).toBe(false);
    expect(instance.isInitialized()).toBe(false);
  });

  test('initializer is called on first .value access', () => {
    let callCount = 0;
    const instance = new Lazy(() => {
      callCount++;
      return 'hello';
    });
    expect(instance.value).toBe('hello');
    expect(callCount).toBe(1);
  });

  test('initializer is called only once across multiple .value accesses', () => {
    let callCount = 0;
    const instance = new Lazy(() => {
      callCount++;
      return {id: 1};
    });
    const a = instance.value;
    const b = instance.value;
    const c = instance.value;
    expect(callCount).toBe(1);
    // All accesses return the exact same cached reference
    expect(a).toBe(b);
    expect(b).toBe(c);
  });

  test('isInitialized() returns true after first .value access', () => {
    const instance = new Lazy(() => 99);
    expect(instance.isInitialized()).toBe(false);
    void instance.value;
    expect(instance.isInitialized()).toBe(true);
  });

  test('works with null as a valid value', () => {
    const instance = new Lazy(() => null);
    expect(instance.value).toBeNull();
    expect(instance.isInitialized()).toBe(true);
  });

  test('works with undefined as a valid value', () => {
    const instance = new Lazy(() => undefined);
    expect(instance.value).toBeUndefined();
    expect(instance.isInitialized()).toBe(true);
  });

  test('works with complex object values', () => {
    const data = {name: 'alwatr', version: 9};
    const instance = new Lazy(() => data);
    expect(instance.value).toEqual({name: 'alwatr', version: 9});
    expect(instance.value).toBe(data); // same reference
  });

  test('handles re-entrant access during initialization gracefully', () => {
    // Edge case: initializer itself accesses .value
    // Should return undefined on re-entry (not infinite loop)
    let reentrantValue;
    const instance = new Lazy(() => {
      // During initialization, try to read .value again
      reentrantValue = instance.value;
      return 42;
    });
    const result = instance.value;
    expect(result).toBe(42);
    expect(reentrantValue).toBeUndefined(); // re-entry saw undefined
    expect(instance.isInitialized()).toBe(true);
  });
});

describe('lazy() factory function', () => {
  test('returns a Lazy instance', () => {
    const instance = lazy(() => 'test');
    expect(instance).toBeInstanceOf(Lazy);
  });

  test('defers execution like the class constructor', () => {
    let called = false;
    const instance = lazy(() => {
      called = true;
      return true;
    });
    expect(called).toBe(false);
    expect(instance.value).toBe(true);
    expect(called).toBe(true);
  });
});
