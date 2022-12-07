import {TransformRangeOptions} from './type.js';
export * from './unicode-digits.js';

/**
 * Number.isFinite simple polyfill
 */
if (typeof Number.isFinite !== 'function') {
  Number.isFinite = isFinite;
}

/**
 * Check the value is number or can convert to a number, for example string ' 123 ' can be converted to 123
 *
 *  @param {unknown} value - the value must check numberic.
 *  @return {boolean} - is number status.
 */
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
 * ```ts
 * transformToRange(5, {in: [0, 10], out: [0, 100]}); // => 50
 * ```
 *
 * Make percentage of any value
 *
 * ```ts
 * transformToRange(2000, {in: [0, 5000], out: [0, 100]}); // => 40
 * ```
 *
 * Calculate progress-bar with
 *
 * ```ts
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
export function transformToRange(x: number, options: TransformRangeOptions): number {
  // prettier-ignore
  let y = ((options.out[1] - options.out[0]) * (x - options.in[0])) / (options.in[1] - options.in[0]) + options.out[0];
  if (options.bound) {
    if (y < options.out[0]) {
      y = options.out[0];
    }
    if (y > options.out[1]) {
      y = options.out[1];
    }
  }

  return y;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

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
   * Generate a random integer number between min and max (max included).
   *
   * Example:
   *
   * ```js
   * console.log(random.integer(1, 10)); // somewhere between 1 and 10
   * ```
   */
  integer: (min: number, max: number): number => Math.floor(random.float(min, max + 1)),

  /**
   * Generate a random float number between min and max (max not included).
   *
   * Example:
   *
   * ```js
   * console.log(random.float(1, 10)); // somewhere between 1 and 10
   * ```
   */
  float: (min: number, max: number): number => random.value * (max - min) + min,

  /**
   * Generate a random string with random length.
   * The string will contain only characters from the characters list.
   * The length of the string will be between min and max (max included).
   * If max not specified, the length will be set to min.
   *
   * Example:
   *
   *```js
   * console.log(random.string(6)); // something like 'Aab1V2'
   * ```
   */
  string: (min: number, max?: number): string => {
    let result = '';
    for (let i = max != null ? random.integer(min, max) : min; i > 0; i--) {
      result += characters.charAt(Math.floor(random.value * charactersLength));
    }
    return result;
  },

  /**
   * Generate a random integer between min and max with a step.
   *
   * Example:
   *
   * ```js
   * console.log(random.step(6, 10, 2)); // 6 or 8 or 10
   * ```
   */
  step: (min: number, max: number, step: number): number => min + random.integer(0, (max - min) / step) * step,

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
  shuffle: <T>(array: T[]): T[] => array.sort(() => random.value - 0.5),
} as const;

export type DurationUnit = 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y';
export type DurationString = `${number}${DurationUnit}`;
const unitConversion = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
  w: 604_800_000,
  M: 2_592_000_000,
  y: 31_536_000_000,
};

/**
 * Parse duration string to target unit.
 *
 * Example:
 *
 * ```js
 * parseDuration('10s'); // 10,000
 * parseDuration('10m'); // 600,000
 * parseDuration('10h'); // 36,000,000
 * parseDuration('10d'); // 864,000,000
 * parseDuration('10w'); // 6,048,000,000
 * parseDuration('10M'); // 25,920,000,000
 * parseDuration('10y'); // 315,360,000,000
 * parseDuration('10d', 'h'); // 240
 * ```
 */
export function parseDuration(duration: DurationString, toUnit: DurationUnit | 'ms' = 'ms'): number {
  duration = duration.trim() as DurationString;
  const durationNumberStr = duration.substring(0, duration.length - 1).trimEnd(); // trimEnd for `10 m`
  if (!isNumber(durationNumberStr)) {
    throw new Error(`not_a_number`);
  }
  const durationNumber = +durationNumberStr;
  const durationUnit = duration.substring(duration.length - 1) as DurationUnit;
  if (unitConversion[durationUnit] == null) {
    throw new Error(`invalid_init`);
  }
  return (durationNumber * unitConversion[durationUnit]) / (toUnit === 'ms' ? 1 : unitConversion[toUnit]);
}
