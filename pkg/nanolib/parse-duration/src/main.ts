import {toNumber} from '@alwatr/is-number';

/**
 * Unit conversion table (milliseconds)
 */
const unitConversion = Object.freeze({
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
  w: 604_800_000,
  M: 2_592_000_000,
  y: 31_536_000_000,
} as const);

/**
 * Duration unit: `s` for seconds, `m` for minutes, `h` for hours, `d` for days, `w` for weeks, `M` for months, `y` for years.
 */
export type DurationUnit = keyof typeof unitConversion;

/**
 * Duration string format: `number + unit`, for example `10m` means 10 minutes.
 */
export type Duration = `${number}${DurationUnit}` | number;

/**
 * Error types that can be thrown by parseDuration
 */
export type DurationError = 'not_a_number' | 'invalid_unit' | 'invalid_format';

/**
 * Parse duration string to milliseconds number.
 *
 * @param duration - Duration string or number, for example `10m` means 10 minutes.
 * @param toUnit - Convert to unit, default is `ms` for milliseconds.
 * @throws {Error} With message 'not_a_number' if duration string doesn't contain a valid number.
 * @throws {Error} With message 'invalid_unit' if the unit is not recognized.
 * @throws {Error} With message 'invalid_format' if the duration format is invalid.
 * @returns Duration in specified unit (or milliseconds by default).
 *
 * @example
 * ```ts
 * parseDuration('10m'); // 600000
 * parseDuration('10m', 's'); // 600
 * parseDuration(120_000, 'm'); // 2
 * ```
 */
export const parseDuration = (duration: Duration, toUnit?: DurationUnit): number => {
  let ms: number;

  // Convert input to milliseconds
  if (typeof duration === 'number') {
    ms = duration;
  } else {
    if (duration.length < 2) {
      throw new Error('invalid_format', {cause: {duration}});
    }

    const durationUnit = duration.slice(-1) as DurationUnit;
    const unitConversionFactor = unitConversion[durationUnit];

    if (unitConversionFactor === undefined) {
      throw new Error('invalid_unit', {cause: {durationUnit}});
    }

    const durationNumber = toNumber(duration.slice(0, -1));
    if (durationNumber === null) {
      throw new Error('not_a_number', {cause: {duration}});
    }

    ms = durationNumber * unitConversionFactor;
  }

  // Return as is if no conversion needed
  if (toUnit === undefined) {
    return ms;
  }

  // Convert to target unit
  const toFactor = unitConversion[toUnit];
  if (toFactor === undefined) {
    throw new Error('invalid_unit', {cause: {toUnit}});
  }

  return ms / toFactor;
};
