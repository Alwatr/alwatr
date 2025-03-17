import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

/**
 * Returns a float random number between 0 and 1 (1 not included).
 *
 * Example:
 *
 * ```js
 * console.log(randNumber()); // 0.7124123
 * ```
 */
export function randNumber(): number {
  return Math.random();
}

/**
 * Generate a random float number between min and max (max not included).
 *
 * Example:
 *
 * ```js
 * console.log(randFloat(1, 10)); // somewhere between 1 and 10 (as float)
 * ```
 */
export function randFloat(min: number, max: number): number {
  return randNumber() * (max - min) + min;
}
