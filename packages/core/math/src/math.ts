import {TransformRangeOptions} from './type';

/**
 * Number.isFinite simple polyfill
 */
if (typeof Number.isFinite !== 'function') {
  Number.isFinite = isFinite;
}

/**
 * Check the value is number or can convert to a number, for example string ' 123 ' can be converted to 123
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

export const unicodeDigits = {
  'en': 0x0030,
  'ar': 0x0660,
  'fa': 0x06f0,
  'nko': 0x07c0,
  'hi': 0x0966, // devanagari
  'bn': 0x09e6, // bengali
  'pa': 0x0a66, // gurmukhi, punjabi
  'gu': 0x0ae6, // gujarati
  'or': 0x0b66, // oriya
  'ta': 0x0be6, // tamil
  'te': 0x0c66, // telugu
  'kn': 0x0ce6, // kannada

  'mal': 0x0d66, // malayalam
  'sinhala_lith': 0x0de6,
  'thai': 0x0e50,
  'lao': 0x0ed0,
  'tibetan': 0x0f20,
  'myanmar': 0x1040,
  'myanmar_shan': 0x1090,
  'khmer': 0x17e0,
  'mongolian': 0x1810,
  'limbu': 0x1946,
  'new_tai_lue': 0x19d0,
  'tai_tham_hora': 0x1a80,
  'tai_tham_tham': 0x1a90,
  'balinese': 0x1b50,
  'sundanese': 0x1bb0,
  'lepcha': 0x1c40,
  'ol_chiki': 0x1c50,
  'vai': 0xa620,
  'saurashtra': 0xa8d0,
  'kayah_li': 0xa900,
  'javanese': 0xa9d0,
  'myanmar_tai_laing': 0xa9f0,
  'cham': 0xaa50,
  'meetei_mayek': 0xabf0,
  'fullwidth': 0xff10,
  'osmanya': 0x104a0,
  'brahmi': 0x11066,
  'sora_sompeng': 0x110f0,
  'chakma': 0x11136,
  'sharada': 0x111d0,
  'khudawadi': 0x112f0,
  'newa': 0x11450,
  'tirhuta': 0x114d0,
  'modi': 0x11650,
  'takri': 0x116c0,
  'ahom': 0x11730,
  'warang_citi': 0x118e0,
  'bhaiksuki': 0x11c50,
  'mro': 0x16a60,
  'pahawh_hmong': 0x16b50,
  'mathematical_bold': 0x1d7ce,
  'mathematical_double-struck': 0x1d7d8,
  'mathematical_sans-serif': 0x1d7e2,
  'mathematical_sans-serif_bold': 0x1d7ec,
  'mathematical_monospace': 0x1d7f6,
  'fula': 0x1e950, // adlam script in fula lang
} as const;

export type LangKeys = keyof typeof unicodeDigits;
const allLangKeys: Array<LangKeys> = Object.keys(unicodeDigits) as Array<LangKeys>;

/**
 * Replace all digital number in all languages to requested language.
 *
 * Example:
 *
 * ```js
 * translateUnicodeDigits('123 ߁߂߃ ੧੨੩ ٣٤٦', 'fa'); // ۱۲۳ ۱۲۳ ۱۲۳ ۳۴۶
 * ```
 */
export function translateUnicodeDigits(
    string: string,
    toLanguage: LangKeys = 'en',
    fromLanguages: Array<LangKeys> = allLangKeys,
): string {
  const toLangZeroCode = unicodeDigits[toLanguage];
  for (const langKey of fromLanguages) {
    const fromLangZeroCode = unicodeDigits[langKey];
    for (let n = 0; n < 10; n++) {
      string = string.replaceAll(String.fromCharCode(fromLangZeroCode + n), String.fromCharCode(toLangZeroCode + n));
    }
  }
  return string;
}
