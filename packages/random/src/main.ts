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

/**
 * Generate a random integer number between min and max (max included).
 *
 * Example:
 *
 * ```js
 * console.log(randInteger(1, 10)); // somewhere between 1 and 10
 * ```
 */
export function randInteger(min: number, max: number): number {
  // Use Math.floor and add 1 to max for better distribution
  return Math.floor(randFloat(min, max + 1));
}

/**
 * Generate a random string with specified length.
 * The string will contain only characters from the characters list.
 * The length of the string will be between min and max (max included).
 * If max not specified, the length will be set to min.
 *
 * Example:
 *
 *```js
 * console.log(randString(6)); // something like 'Aab1V2'
 * console.log(randString(3, 6)); // random length between 3 and 6
 * ```
 */
export function randString(min: number, max?: number): string {
  const length = max != null ? randInteger(min, max) : min;
  let result = '';

  // Small optimization for short strings
  if (length <= 10) {
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(randNumber() * charactersLength));
    }
    return result;
  }

  // For longer strings, use array join for better performance
  const resultArray = new Array(length);
  for (let i = 0; i < length; i++) {
    resultArray[i] = characters.charAt(Math.floor(randNumber() * charactersLength));
  }
  return resultArray.join('');
}

