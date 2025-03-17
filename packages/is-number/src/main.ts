import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

/**
 * Polyfill for Number.isFinite - properly checks if a value is a finite number
 * without type coercion.
 *
 * @param value - The value to check
 * @returns true if the value is a finite number, false otherwise
 */
export function isFiniteNumber(value: unknown): boolean {
  // Use native implementation if available
  if (typeof Number.isFinite === 'function') {
    return Number.isFinite(value);
  }
  // Fallback implementation
  return typeof value === 'number' && isFinite(value);
}
 *
 * @param value - the value must check numeric.
 *
 * @return true if the value is number or can convert to a number, otherwise false.
 *
 * @example
 * ```ts
 * isNumber(123); // true
 * isNumber('123'); // true
 * isNumber(' 123 '); // true
 * isNumber(''); // false
 * isNumber('  '); // false
 * isNumber(' 123a '); // false
 * isNumber(' 123 a '); // false
 * ```
 */
export function isNumber(value: unknown): boolean {
  if (typeof value === 'number') {
    return value - value === 0;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+value) : isFinite(+value);
  }
  return false;
}
