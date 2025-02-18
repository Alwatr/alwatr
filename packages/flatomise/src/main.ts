/* eslint-disable @typescript-eslint/no-explicit-any */
import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

/**
 * Flat promise that can be resolved or rejected from outside.
 */
export interface Flatomise<T> {
  /**
   * The promise.
   */
  promise: Promise<T>;

  /**
   * Resolve the promise.
   */
  resolve: (value: T | PromiseLike<T>) => void;

  /**
   * Reject the promise.
   */
  reject: (reason?: any) => void;

  /**
   * Whether the promise is settled (resolved or rejected).
   */
  settled: boolean;
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
  const flatomise: Partial<Flatomise<T>> = {settled: false};
  flatomise.promise = new Promise<T>((resolve, reject) => {
    flatomise.resolve = resolve;
    flatomise.reject = reject;
  });
  flatomise.promise.finally(() => {
    flatomise.settled = true;
  });
  return flatomise as Flatomise<T>;
}
