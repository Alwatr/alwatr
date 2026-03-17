import {cyrb53} from '@alwatr/cyrb53';
import {describe, it, expect} from 'bun:test';

describe('cyrb53', () => {
  it('should generate a numeric hash for a string input', () => {
    const hash = cyrb53('test');
    expect(typeof hash).toBe('number');
  });

  it('should generate a consistent hash for the same input', () => {
    const input = 'alwatr_org';
    const hash1 = cyrb53(input);
    const hash2 = cyrb53(input);
    expect(hash1).toBe(hash2);
  });

  it('should generate different hashes for different inputs', () => {
    const hash1 = cyrb53('hello');
    const hash2 = cyrb53('world');
    expect(hash1).not.toBe(hash2);
  });

  it('should handle empty strings', () => {
    const hash = cyrb53('');
    // The hash for an empty string with seed 0 is a known value
    expect(hash).toBe(3338908027751811);
  });

  it('should handle long strings', () => {
    const longString = 'a'.repeat(1000);
    const hash = cyrb53(longString);
    expect(typeof hash).toBe('number');
    expect(cyrb53(longString)).toBe(hash); // consistency check
  });

  it('should handle special characters and unicode', () => {
    const specialString = '!@#$%^&*()_+-=~`[]{}|;:",./<>? \t\n\r';
    const unicodeString = '😀🌍🚀';
    const hash1 = cyrb53(specialString);
    const hash2 = cyrb53(unicodeString);
    expect(typeof hash1).toBe('number');
    expect(typeof hash2).toBe('number');
    expect(hash1).not.toBe(hash2);
  });

  it('should produce different hashes for the same input with different seeds', () => {
    const input = 'alwatr_org';
    const hash1 = cyrb53(input, 0);
    const hash2 = cyrb53(input, 12345);
    expect(hash1).not.toBe(hash2);
  });

  it('should produce a consistent hash for the same input and seed', () => {
    const input = 'alwatr_org';
    const seed = 9876;
    const hash1 = cyrb53(input, seed);
    const hash2 = cyrb53(input, seed);
    expect(hash1).toBe(hash2);
  });

  it('should produce a known value for a known input and seed', () => {
    // This acts as a regression test to ensure the algorithm doesn't change.
    expect(cyrb53('Alwatr')).toBe(3747986774435305);
    expect(cyrb53('Alwatr', 123)).toBe(3798651724839550);
  });
});
