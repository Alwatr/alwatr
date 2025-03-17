import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

// Use the native crypto module when available for better randomness
const hasCrypto = typeof globalThis.crypto !== 'undefined';

/**
 * Convert a Uint8Array to a hexadecimal string.
 */
function hex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

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
 * console.log(randString(5, undefined, '01')); // binary string like '10101'
 * ```
 */
export function randString(
  minLength: number,
  maxLength: number = minLength,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
  const length = maxLength === minLength ? minLength : randInteger(minLength, maxLength);
  if (length <= 0) return '';

  const charsLength = chars.length;

  let result = '';

  // Small optimization for short strings
  if (length <= 10) {
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(randNumber() * charsLength));
    }
    return result;
  }
  // else
  // For longer strings, use array join for better performance
  const resultArray = new Array(length);
  for (let i = 0; i < length; i++) {
    resultArray[i] = chars.charAt(Math.floor(randNumber() * charsLength));
  }
  return resultArray.join('');
}

/**
 * Generate a random integer between min and max with a step.
 *
 * Example:
 *
 * ```js
 * console.log(randStep(6, 10, 2)); // 6 or 8 or 10
 * ```
 */
export function randStep(min: number, max: number, step: number): number {
  if (step === 0) {
    return min; // Return min when step is 0 to avoid division by zero
  }
  const steps = Math.floor((max - min) / step);
  return min + randInteger(0, steps) * step;
}

/**
 * Shuffle an array in place and return it.
 *
 * Example:
 *
 * ```js
 * const array = [1, 2, 3, 4, 5];
 * randShuffle(array);
 * console.log(array); // [2, 4, 3, 1, 5] (randomized)
 * ```
 */
export function randShuffle<T>(array: T[]): T[] {
  // Using sort with random comparator for potentially better performance on large arrays
  // Note: This approach may not provide perfectly uniform distribution
  return array.sort(() => randNumber() - 0.5);
}

/**
 * Choose a random item from an array.
 * Throws an error if the array is empty.
 *
 * Example:
 *
 * ```js
 * const array = [1, 2, 3, 4, 5];
 * console.log(randPick(array)); // one random element
 * ```
 */
export function randPick<T>(array: T[]): T {
  if (array.length === 0) throw new Error('Cannot pick from empty array');
  return array[randInteger(0, array.length - 1)];
}

/**
 * Fills a typed array with cryptographically strong random values.
 * Falls back to Math.random if crypto is not available.
 *
 * Example:
 *
 * ```js
 * const array = new Uint8Array(10);
 * randValues(array);
 * ```
 */
export function randValues<T extends ArrayBufferView | null>(array: T): T {
  if (hasCrypto && globalThis.crypto?.getRandomValues) {
    return globalThis.crypto.getRandomValues(array);
  }

  // Fallback for environments without crypto
  if (array instanceof Uint8Array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(randNumber() * 256);
    }
  }
  return array;
}

/**
 * Type alias for a UUID string.
 */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * Generate a random UUID (v4).
 *
 * Example:
 *
 * ```js
 * console.log(randUuid()); // "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6"
 * ```
 */
export function randUuid(): UUID {
  if (hasCrypto && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID() as UUID;
  }

  // Fallback implementation
  const bytes = randValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0xbf) | 0x80; // variant RFC4122

  return `${hex(bytes.subarray(0, 4))}-${hex(bytes.subarray(4, 6))}-${hex(bytes.subarray(6, 8))}-${hex(bytes.subarray(8, 10))}-${hex(
    bytes.subarray(10, 16),
  )}` as UUID;
}

/**
 * Generate a random boolean with specified probability of being true.
 *
 * Example:
 *
 * ```js
 * console.log(randBoolean()); // 50% chance of true
 * console.log(randBoolean(0.8)); // 80% chance of true
 * ```
 */
export function randBoolean(probability = 0.5): boolean {
  return randNumber() < probability;
}

/**
 * Generate a random hex color string.
 *
 * Example:
 *
 * ```js
 * console.log(randColor()); // "#a1b2c3"
 * ```
 */
export function randColor(): string {
  const bytes = randValues(new Uint8Array(3));
  return `#${hex(bytes)}`;
}
