import {djb2Hash} from '@alwatr/djb2-hash';

describe('djb2Hash', () => {
  it('should generate numeric hash values for string inputs', () => {
    const result = djb2Hash('test');
    expect(typeof result).toBe('number');
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should return different hashes for different inputs', () => {
    const hash1 = djb2Hash('test1');
    const hash2 = djb2Hash('test2');
    expect(hash1).not.toBe(hash2);
  });

  it('should generate consistent hashes for the same input', () => {
    const input = 'consistencyTest';
    const hash1 = djb2Hash(input);
    const hash2 = djb2Hash(input);
    expect(hash1).toBe(hash2);
  });

  it('should handle empty strings', () => {
    const result = djb2Hash('');
    expect(typeof result).toBe('number');
    // The hash for an empty string should be the initial value right-shifted by 0
    expect(result).toBe(5381 >>> 0);
  });

  it('should handle special characters', () => {
    const result = djb2Hash('!@#$%^&*()');
    expect(typeof result).toBe('number');
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should handle long strings', () => {
    const longString = 'a'.repeat(1000);
    const result = djb2Hash(longString);
    expect(typeof result).toBe('number');
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should handle Unicode characters', () => {
    const unicodeString = '😀🌍🚀';
    const result = djb2Hash(unicodeString);
    expect(typeof result).toBe('number');
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should produce 32-bit unsigned integer outputs', () => {
    const inputs = ['test', 'hello world', 'unicode 😀', 'a'.repeat(1000)];

    for (const input of inputs) {
      const result = djb2Hash(input);
      expect(result).toBeLessThanOrEqual(0xffffffff); // Max 32-bit unsigned int
      expect(result).toBeGreaterThanOrEqual(0);
    }
  });

  it('should produce deterministic results', () => {
    // Test with known hash values
    expect(djb2Hash('hello')).toBe(181380007);
    expect(djb2Hash('world')).toBe(164394279);
    expect(djb2Hash('hello world')).toBe(2616892229);
    expect(djb2Hash('')).toBe(5381);
  });

  it('should handle case sensitivity', () => {
    expect(djb2Hash('Hello')).not.toBe(djb2Hash('hello'));
    expect(djb2Hash('WORLD')).not.toBe(djb2Hash('world'));
  });
});
