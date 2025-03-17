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

/**
 * Check if the value is a number or can be converted to a number.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a number or can be converted to a number, otherwise `false`.
 *
 * @example
 * ```ts
 * isNumber(123);        // true
 * isNumber('123');      // true
 * isNumber(' 123 ');    // true
 * isNumber('0xff');     // true
 * isNumber('-1.1');     // true
 * isNumber('');         // false
 * isNumber('  ');       // false
 * isNumber(' 123a ');   // false
 * isNumber(NaN);        // false
 * isNumber(Infinity);   // false
 * isNumber({});         // false
 * isNumber([]);         // false
 * isNumber(null);       // false
 * isNumber(undefined);  // false
 * ```
 */
export function isNumber(value: unknown): boolean {
  // Handle number type
  if (typeof value === 'number') {
    return value - value === 0;
  }

  // Handle string type
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return false;

    // Use unary plus for fastest string-to-number conversion
    const num = +trimmed;
    return isFiniteNumber(num);
  }

  return false;
}
