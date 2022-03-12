if (typeof Number.isFinite !== 'function') {
  Number.isFinite = isFinite;
}

export function isNumber(value: unknown): boolean {
  if (typeof value === 'number') {
    return value - value === 0;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return Number.isFinite(+value);
  }
  return false;
}

export const random = {

  /**
   * Returns a float random number between 0 and 1 (1 Not included).
   *
   * Example:
   *
   * ```js
   * console.log(random.value); // 0.7124123
   * ```
   */
  get value(): number {
    return Math.random();
  },

  /**
   * Generate a random integer between min and max.
   *
   * Example:
   *
   * ```js
   * console.log(random.integer(1, 10)); // somewhere between 1 and 10
   * ```
   */
  integer: (min: number, max: number): number =>
    Math.floor(random.float(min, max + 1)),

  /**
   *
   * Example:
   *
   * ```js
   * console.log(random.float(1, 10)); // somewhere between 1 and 10
   * ```
   */
  float: (min: number, max: number): number =>
    random.value * (max - min) + min,

  /**
   * Generate a random integer between min and max with a step.
   *
   * Example:
   *
   * ```js
   * console.log(random.step(6, 10, 2)); // 6 or 8 or 10
   * ```
   */
  step: (min: number, max: number, step: number): number =>
    min + (random.integer(0, (max - min) / step)) * step,

  /**
   * Shuffle an array.
   *
   * Example:
   *
   * ```js
   * const array = [1, 2, 3, 4, 5];
   * random.shuffle(array);
   * console.log(array); // [2, 4, 3, 1, 5]
   * ```
   */
  shuffle: <T>(array: T[]): T[] =>
    array.sort(() => random.value - 0.5),
} as const;
