import {TransformRangeOptions} from './type';

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

/**
 * Transform a number from one range to another.
 *
 * Example:
 *
 * ```js
 * transformToRange(5, {in: [0, 10], out: [0, 100]}); // => 50
 * ```
 *
 * Make percentage of any value
 *
 * ```js
 * transformToRange(2000, {in: [0, 5000], out: [0, 100]}); // => 40
 * ```
 *
 * Calculate progress-bar with
 *
 * ```js
 * const progressOuterWith = 400; //px
 * const gap = 5; //px (the visual gap between progressBar and component outer).
 * const currentProgress = 30; //%
 *
 * const progressBarWith = transformToRange(currentProgress, {
 *   in: [0, 100],
 *   out: [componentPadding, progressOuterWith - componentPadding],
 *   bound: true,
 * });
 *
 * this.progressBar.style.width = `${progressBarWith}px`;
 * ```
 */
export const transformToRange = (x: number, options: TransformRangeOptions): number => {
  let y = (options.out[1] - options.out[0]) * (x - options.in[0]) / (options.in[1] - options.in[0]) + options.out[0];

  if (options.bound) {
    if (y < options.out[0]) {
      y = options.out[0];
    }
    if (y > options.out[1]) {
      y = options.out[1];
    }
  }

  return y;
};

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
