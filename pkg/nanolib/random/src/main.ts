// Use the native crypto module when available for better randomness
const hasCrypto = typeof crypto !== 'undefined';

/**
 * Converts a Uint8Array or number array into a hexadecimal string representation.
 * Each byte is converted to a two-character hex string (padded with a leading zero if necessary)
 * and concatenated together to form a single string.
 *
 * @param bytes - The array of bytes to convert to hexadecimal
 * @returns A hexadecimal string representation of the input bytes
 *
 * @example
 * ```ts
 * // Using with Uint8Array
 * const bytes = new Uint8Array([10, 255, 0, 16]);
 * bytesToHex(bytes); // Returns "0aff0010"
 *
 * // Using with number array
 * const array = [171, 205, 3];
 * bytesToHex(array); // Returns "abcd03"
 * ```
 */
export function bytesToHex(bytes: number[] | Uint8Array): string {
  let result = '';
  for (const byte of bytes) {
    const hex = byte.toString(16);
    result += hex.length === 1 ? '0' + hex : hex;
  }
  return result;
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
  return Math.random() * (max - min) + min;
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
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  }
  // else
  // For longer strings, use array join for better performance
  const resultArray = new Array(length);
  for (let i = 0; i < length; i++) {
    resultArray[i] = chars.charAt(Math.floor(Math.random() * charsLength));
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
 * Shuffle an array in place using Fisher-Yates shuffle algorithm and return it.
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
  for (let i = array.length - 1; i > 0; i--) {
    const j = randInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
 * Fills a typed array with random integer values within the specified range.
 * The array is modified in place and also returned for chaining.
 *
 * @param array - The array to fill with random values (modified in place)
 * @param min - Minimum value (inclusive), defaults to 0
 * @param max - Maximum value (inclusive), defaults to 255
 * @returns The same array that was passed in (for chaining)
 *
 * @example
 * ```ts
 * // Fill a Uint8Array with random values (0-255)
 * randArray(new Uint8Array(10));
 *
 * // Fill with custom range
 * randArray(new Uint16Array(5), 1000, 2000); // Values between 1000-2000
 *
 * // Also works with number arrays
 * randArray(new Array<number>(8), -100, 100); // Values between -100 and 100
 * ```
 */
export function randArray<T extends number[] | Uint8Array | Uint16Array | Uint32Array>(
  array: T,
  min = 0,
  max = 255,
): T {
  for (let i = array.length - 1; i >= 0; i--) {
    array[i] = randInteger(min, max);
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
  if (hasCrypto && crypto?.randomUUID) {
    return crypto.randomUUID() as UUID;
  }

  // Fallback implementation
  const bytes = randArray(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0xbf) | 0x80; // variant RFC4122

  // prettier-ignore
  return `${
    bytesToHex(bytes.subarray(0, 4))
  }-${
    bytesToHex(bytes.subarray(4, 6))
  }-${
    bytesToHex(bytes.subarray(6, 8))
  }-${
    bytesToHex(bytes.subarray(8, 10))
  }-${
    bytesToHex(bytes.subarray(10, 16))
  }` as UUID;
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
  return Math.random() < probability;
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
  const bytes = randArray(new Array<number>(3));
  return `#${bytesToHex(bytes)}`;
}
