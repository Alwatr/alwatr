import {parseDuration} from '@alwatr/parse-duration';

describe('@alwatr/parse-duration', () => {
  // Basic functionality tests
  it('should parse duration strings to milliseconds', () => {
    // Basic time units
    expect(parseDuration('5s')).toBe(5 * 1_000); // seconds
    expect(parseDuration('3m')).toBe(3 * 60_000); // minutes
    expect(parseDuration('2h')).toBe(2 * 3_600_000); // hours
    expect(parseDuration('1d')).toBe(1 * 86_400_000); // days
    expect(parseDuration('2w')).toBe(2 * 604_800_000); // weeks

    // Longer time units
    expect(parseDuration('3M')).toBe(3 * 2_592_000_000); // months
    expect(parseDuration('1y')).toBe(1 * 31_536_000_000); // years
  });

  it('should accept numeric input as milliseconds', () => {
    expect(parseDuration(5000)).toBe(5000);
    expect(parseDuration(0)).toBe(0);
  });

  it('should convert duration to specified unit', () => {
    expect(parseDuration('2h', 'm')).toBe(2 * 60);
    expect(parseDuration('120s', 'm')).toBe(2);
    expect(parseDuration('1d', 'h')).toBe(24);
    expect(parseDuration('1w', 'd')).toBe(7);
    expect(parseDuration('1M', 'd')).toBe(30);
    expect(parseDuration('1y', 'd')).toBe(365);
    expect(parseDuration(60000, 's')).toBe(60);
  });

  it('should handle decimal values correctly', () => {
    expect(parseDuration('0.5h')).toBe(0.5 * 60 * 60 * 1000);
    expect(parseDuration('1.5d', 'h')).toBe(36);
  });

  // Error handling tests
  it('should throw error for invalid duration format', () => {
    expect(() => parseDuration('m')).toThrow('invalid_format');
  });

  it('should throw error for invalid unit', () => {
    // @ts-expect-error testing invalid input
    expect(() => parseDuration('1x')).toThrow('invalid_unit');
  });

  it('should throw error for invalid conversion unit', () => {
    // @ts-expect-error testing invalid input
    expect(() => parseDuration('1h', 'x')).toThrow('invalid_unit');
  });

  it('should throw error for non-numeric duration', () => {
    // @ts-expect-error testing invalid input
    expect(() => parseDuration('xh')).toThrow('not_a_number');
  });

  // Edge cases
  it('should handle zero values', () => {
    expect(parseDuration('0s')).toBe(0);
    expect(parseDuration('0m', 's')).toBe(0);
  });

  it('should handle large values', () => {
    expect(parseDuration('999999h')).toBe(999999 * 3600000);
  });
});
