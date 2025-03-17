import {isNumber, toNumber, isFiniteNumber} from '@alwatr/is-number';

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-123)).toBe(true);
    expect(isNumber(1.23)).toBe(true);
  });

  it('should return true for numeric strings', () => {
    expect(isNumber('123')).toBe(true);
    expect(isNumber('0')).toBe(true);
    expect(isNumber('-123')).toBe(true);
    expect(isNumber('1.23')).toBe(true);
    expect(isNumber(' 123 ')).toBe(true); // With spaces
    expect(isNumber('0xff')).toBe(true); // Hex
    expect(isNumber('5e3')).toBe(true); // Scientific notation
  });

  it('should return false for non-numeric strings', () => {
    expect(isNumber('abc')).toBe(false);
    expect(isNumber('123abc')).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber(' ')).toBe(false);
  });

  it('should return false for boolean values', () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
  });

  it('should return false for null and undefined', () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });

  it('should return false for objects and arrays', () => {
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
  });

  it('should return false for NaN and Infinity', () => {
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber(-Infinity)).toBe(false);
  });
});

describe('toNumber', () => {
  it('should convert numbers correctly', () => {
    expect(toNumber(123)).toBe(123);
    expect(toNumber(0)).toBe(0);
    expect(toNumber(-123)).toBe(-123);
    expect(toNumber(1.23)).toBe(1.23);
  });

  it('should convert numeric strings correctly', () => {
    expect(toNumber('123')).toBe(123);
    expect(toNumber('0')).toBe(0);
    expect(toNumber('-123')).toBe(-123);
    expect(toNumber('1.23')).toBe(1.23);
    expect(toNumber(' 123 ')).toBe(123); // With spaces
    expect(toNumber('0xff')).toBe(255); // Hex
    expect(toNumber('5e3')).toBe(5000); // Scientific notation
  });

  it('should return null for non-numeric strings', () => {
    expect(toNumber('abc')).toBeNull();
    expect(toNumber('123abc')).toBeNull();
    expect(toNumber('')).toBeNull();
    expect(toNumber(' ')).toBeNull();
  });

  it('should return null for boolean values', () => {
    expect(toNumber(true)).toBeNull();
    expect(toNumber(false)).toBeNull();
  });

  it('should return null for null and undefined', () => {
    expect(toNumber(null)).toBeNull();
    expect(toNumber(undefined)).toBeNull();
  });

  it('should return null for objects and arrays', () => {
    expect(toNumber({})).toBeNull();
    expect(toNumber([])).toBeNull();
  });

  it('should return null for NaN and Infinity', () => {
    expect(toNumber(NaN)).toBeNull();
    expect(toNumber(Infinity)).toBeNull();
    expect(toNumber(-Infinity)).toBeNull();
  });
});

describe('isFiniteNumber', () => {
  it('should return true for finite numbers', () => {
    expect(isFiniteNumber(123)).toBe(true);
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-123)).toBe(true);
    expect(isFiniteNumber(1.23)).toBe(true);
  });

  it('should return false for NaN and Infinity', () => {
    expect(isFiniteNumber(NaN)).toBe(false);
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber(-Infinity)).toBe(false);
  });

  it('should return false for non-number values without type coercion', () => {
    expect(isFiniteNumber('123')).toBe(false);
    expect(isFiniteNumber(true)).toBe(false);
    expect(isFiniteNumber(null)).toBe(false);
    expect(isFiniteNumber(undefined)).toBe(false);
    expect(isFiniteNumber({})).toBe(false);
    expect(isFiniteNumber([])).toBe(false);
  });
});
