/* eslint-disable @typescript-eslint/no-explicit-any */

import type {Mutable} from '@alwatr/type-helper';

/**
 * Flat promise that can be resolved or rejected from outside.
 */
export interface Flatomise<T> {
  /**
   * The promise.
   */
  readonly promise: Promise<T>;

  /**
   * Resolve the promise.
   */
  readonly resolve: (value: T | PromiseLike<T>) => void;

  /**
   * Reject the promise.
   */
  readonly reject: (reason?: any) => void;

  /**
   * Whether the promise is settled (resolved or rejected).
   */
  readonly settled: boolean;
}

/**
 * Create a new Flatomise is a promise that can be resolved or rejected from outside.
 *
 * @returns A new Flatomise.
 *
 * @example
 * ```typescript
 * const flatomise = newFlatomise();
 * flatomise.promise.then(() => {
 *   console.log('flatomise resolved');
 * });
 * flatomise.resolve();
 * ```
 */
export function newFlatomise<T>(): Flatomise<T> {
  const flatomise: Partial<Mutable<Flatomise<T>>> = {settled: false};
  flatomise.promise = new Promise<T>((resolve, reject) => {
    flatomise.resolve = resolve;
    flatomise.reject = reject;
  });
  flatomise.promise
    .finally(() => {
      flatomise.settled = true;
    })
    .catch(() => {
      // ignore, the rejection is the caller's responsibility via `flatomise.promise` itself
    });
  return flatomise as Flatomise<T>;
}
