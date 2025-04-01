import {hashString} from '@alwatr/hash-string';

describe('hashString', () => {
  it('should generate hash for string inputs', () => {
    const result = hashString('test', 'prefix-');
    expect(typeof result).toBe('string');
    expect(result.startsWith('prefix-')).toBe(true);
    expect(result).not.toBe('prefix-test');
  });

  it('should generate hash for numeric inputs', () => {
    const result = hashString(12345, 'num-');
    expect(typeof result).toBe('string');
    expect(result.startsWith('num-')).toBe(true);
  });

  it('should return different hashes for different inputs', () => {
    const hash1 = hashString('test1', 'p-');
    const hash2 = hashString('test2', 'p-');
    expect(hash1).not.toBe(hash2);
  });

  it('should use the provided prefix', () => {
    const prefixes = ['a-', 'test-', 'hash_', '123-'];

    prefixes.forEach((prefix) => {
      const result = hashString('sameInput', prefix);
      expect(result.startsWith(prefix)).toBe(true);
    });
  });

  it('should generate different hashes with different repeat values', () => {
    const input = 'repeatTest';
    const prefix = 'r-';

    const hash1 = hashString(input, prefix, 1);
    const hash2 = hashString(input, prefix, 2);
    const hash3 = hashString(input, prefix, 3);

    expect(hash1).not.toBe(hash2);
    expect(hash2).not.toBe(hash3);
    expect(hash1).not.toBe(hash3);
  });

  it('should handle empty strings', () => {
    const result = hashString('', 'empty-');
    expect(typeof result).toBe('string');
    expect(result.startsWith('empty-')).toBe(true);
    expect(result.length).toBeGreaterThan('empty-'.length);
  });

  it('should handle special characters', () => {
    const result = hashString('!@#$%^&*()', 'special-');
    expect(typeof result).toBe('string');
    expect(result.startsWith('special-')).toBe(true);
  });

  it('should generate consistent hashes for the same input', () => {
    const input = 'consistencyTest';
    const prefix = 'c-';

    const hash1 = hashString(input, prefix);
    const hash2 = hashString(input, prefix);

    expect(hash1).toBe(hash2);
  });

  it('should handle long strings', () => {
    const longString = 'a'.repeat(1000);
    const result = hashString(longString, 'long-');

    expect(typeof result).toBe('string');
    expect(result.startsWith('long-')).toBe(true);
  });

  it('should handle Unicode characters', () => {
    const unicodeString = '😀🌍🚀';
    const result = hashString(unicodeString, 'unicode-');

    expect(typeof result).toBe('string');
    expect(result.startsWith('unicode-')).toBe(true);
  });

  it('should default to repeat value of 3 when not specified', () => {
    const input = 'defaultRepeat';
    const prefix = 'd-';

    const defaultResult = hashString(input, prefix);
    const explicitResult = hashString(input, prefix, 3);

    expect(defaultResult).toBe(explicitResult);
  });

  it('should algorithm be deterministic', () => {
    const input = 'Ali@MD_65';
    const prefix = 'p-';
    const expectedHash = 'p-dm3wzfp6jiud';
    const hash = hashString(input, prefix, 3);
    expect(hash).toBe(expectedHash);
  });
});
