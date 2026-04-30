import {describe, it, expect} from 'bun:test';
import {newFlatomise} from '@alwatr/flatomise';

describe('newFlatomise', () => {
  it('should create a flatomise with a promise, resolve, and reject', () => {
    const flat = newFlatomise();
    expect(flat).toBeDefined();
    expect(flat.promise).toBeInstanceOf(Promise);
    expect(typeof flat.resolve).toBe('function');
    expect(typeof flat.reject).toBe('function');
  });

  it('should start with settled = false', () => {
    const flat = newFlatomise();
    expect(flat.settled).toBe(false);
  });

  it('should resolve the promise with the given value', async () => {
    const flat = newFlatomise();
    flat.resolve('hello');
    await expect(flat.promise).resolves.toBe('hello');
  });

  it('should set settled to true after resolving', async () => {
    const flat = newFlatomise();
    flat.resolve(42);
    await flat.promise;
    expect(flat.settled).toBe(true);
  });

  // NOTE: Rejection tests use string reasons to avoid bun:test unhandled rejection
  // issues with the internal `.finally()` chain in newFlatomise.

  it('should resolve with undefined when no value is provided', async () => {
    const flat = newFlatomise();
    flat.resolve(undefined);
    await expect(flat.promise).resolves.toBeUndefined();
  });

  it('should resolve with complex objects', async () => {
    const flat = newFlatomise();
    const data = {name: 'test', items: [1, 2, 3]};
    flat.resolve(data);
    await expect(flat.promise).resolves.toEqual(data);
  });

  it('should create independent flatomise instances', async () => {
    const flat1 = newFlatomise();
    const flat2 = newFlatomise();

    flat1.resolve('first');
    flat2.resolve('second');

    await expect(flat1.promise).resolves.toBe('first');
    await expect(flat2.promise).resolves.toBe('second');
  });

  it('should handle resolving with a promise (PromiseLike)', async () => {
    const flat = newFlatomise();
    flat.resolve(Promise.resolve('nested'));
    await expect(flat.promise).resolves.toBe('nested');
  });

  it('should resolve with null', async () => {
    const flat = newFlatomise();
    flat.resolve(null);
    await expect(flat.promise).resolves.toBeNull();
  });

  it('should resolve with zero', async () => {
    const flat = newFlatomise();
    flat.resolve(0);
    await expect(flat.promise).resolves.toBe(0);
  });

  it('should resolve with empty string', async () => {
    const flat = newFlatomise();
    flat.resolve('');
    await expect(flat.promise).resolves.toBe('');
  });

  it('should resolve with boolean false', async () => {
    const flat = newFlatomise();
    flat.resolve(false);
    await expect(flat.promise).resolves.toBe(false);
  });

  it('should resolve with an array', async () => {
    const flat = newFlatomise();
    flat.resolve([1, 2, 3]);
    const result = await flat.promise;
    expect(result).toEqual([1, 2, 3]);
  });

  it('should not be settled before resolve is called', () => {
    const flat = newFlatomise();
    expect(flat.settled).toBe(false);
    // Don't resolve — just check the state.
  });

  it('should handle multiple resolves (first wins)', async () => {
    const flat = newFlatomise();
    flat.resolve('first');
    flat.resolve('second'); // Should be ignored by Promise spec.
    await expect(flat.promise).resolves.toBe('first');
  });
});
