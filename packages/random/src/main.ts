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
