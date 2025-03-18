import {
  randNumber,
  randInteger,
  randFloat,
  randString,
  randStep,
  randShuffle,
  randPick,
  randBoolean,
  randColor,
  randUuid,
  randArray,
  bytesToHex,
} from '@alwatr/random';

describe('@alwatr/random', () => {
  describe('number generation', () => {
    test('randNumber() returns a number between 0 and 1', () => {
      const value = randNumber();
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    });
  });

  describe('integer generation', () => {
    test('randInteger() returns an integer within the specified range', () => {
      const min = 5;
      const max = 10;
      for (let i = 0; i < 100; i++) {
        const value = randInteger(min, max);
        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
      }
    });

    test('randInteger() with min equal to max', () => {
      const value = randInteger(5, 5);
      expect(value).toBe(5);
    });

    test('randInteger() with negative numbers', () => {
      const min = -10;
      const max = -5;
      for (let i = 0; i < 100; i++) {
        const value = randInteger(min, max);
        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
      }
    });
  });

  describe('float generation', () => {
    test('randFloat() returns a float within the specified range', () => {
      const min = 5;
      const max = 10;
      for (let i = 0; i < 100; i++) {
        const value = randFloat(min, max);
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThan(max);
      }
    });

    test('randFloat() with min equal to max', () => {
      const value = randFloat(5, 5);
      expect(value).toBe(5);
    });

    test('randFloat() with negative numbers', () => {
      const min = -10;
      const max = -5;
      for (let i = 0; i < 100; i++) {
        const value = randFloat(min, max);
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThan(max);
      }
    });
  });

  describe('string generation', () => {
    test('randString() with fixed length', () => {
      const length = 8;
      const str = randString(length);
      expect(str.length).toBe(length);
      expect(typeof str).toBe('string');
    });

    test('randString() with variable length', () => {
      const min = 5;
      const max = 10;
      const str = randString(min, max);
      expect(str.length).toBeGreaterThanOrEqual(min);
      expect(str.length).toBeLessThanOrEqual(max);
    });

    test('randString() with min equal to max', () => {
      const length = 5;
      const str = randString(length, length);
      expect(str.length).toBe(length);
    });

    test('randString() returns empty string when min is 0', () => {
      const str = randString(0);
      expect(str.length).toBe(0);
    });

    test('randString() with custom character set', () => {
      const length = 10;
      const chars = '01';  // Binary characters
      const str = randString(length, undefined, chars);

      expect(str.length).toBe(length);
      // Verify that only characters from the custom set are used
      expect(str.split('').every(char => chars.includes(char))).toBe(true);
    });

    test('randString() with custom character set and variable length', () => {
      const min = 5;
      const max = 10;
      const chars = 'ABC123';
      const str = randString(min, max, chars);

      expect(str.length).toBeGreaterThanOrEqual(min);
      expect(str.length).toBeLessThanOrEqual(max);
      // Verify that only characters from the custom set are used
      expect(str.split('').every(char => chars.includes(char))).toBe(true);
    });
  });

  describe('step generation', () => {
    test('randStep() returns a value with the correct step', () => {
      const min = 0;
      const max = 10;
      const step = 2;
      const validValues = [0, 2, 4, 6, 8, 10];

      for (let i = 0; i < 100; i++) {
        const value = randStep(min, max, step);
        expect(validValues).toContain(value);
      }
    });

    test('randStep() with min equal to max', () => {
      const value = randStep(5, 5, 2);
      expect(value).toBe(5);
    });

    test('randStep() with step 0', () => {
      const value = randStep(5, 10, 0);
      expect(value).toBe(5);
    });

    test('randStep() with negative numbers', () => {
      const min = -10;
      const max = -2;
      const step = 2;
      const validValues = [-10, -8, -6, -4, -2];

      for (let i = 0; i < 100; i++) {
        const value = randStep(min, max, step);
        expect(validValues).toContain(value);
      }
    });
  });

  describe('array manipulation', () => {
    test('randShuffle() shuffles an array', () => {
      const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const shuffled = [...original];
      randShuffle(shuffled);

      // Test the arrays are not identical (with very high probability)
      // Note: there's a tiny chance this could fail even if randShuffle works correctly
      let isDifferent = false;
      for (let i = 0; i < original.length; i++) {
        if (original[i] !== shuffled[i]) {
          isDifferent = true;
          break;
        }
      }
      expect(isDifferent).toBe(true);

      // Make sure it contains all the same elements
      expect(original.sort()).toEqual(shuffled.sort());
    });

    test('randShuffle() does not modify an empty array', () => {
      const original = [];
      const shuffled = [...original];
      randShuffle(shuffled);
      expect(shuffled).toEqual(original);
    });

    test('randPick() selects a valid array element', () => {
      const array = [1, 2, 3, 4, 5];
      for (let i = 0; i < 100; i++) {
        expect(array).toContain(randPick(array));
      }
    });

    test('randPick() throws on empty array', () => {
      expect(() => randPick([])).toThrow();
    });
  });

  describe('uuid generation', () => {
    test('randUuid() returns a valid UUID string', () => {
      const uuid = randUuid();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuidRegex.test(uuid)).toBe(true);
    });
  });

  describe('boolean generation', () => {
    test('randBoolean() returns a boolean', () => {
      expect(typeof randBoolean()).toBe('boolean');
    });

    test('randBoolean() with probability 0', () => {
      let trueCount = 0;
      const samples = 20;

      for (let i = 0; i < samples; i++) {
        if (randBoolean(0)) trueCount++;
      }

      expect(trueCount).toBe(0);
    });

    test('randBoolean() with probability 1', () => {
      let trueCount = 0;
      const samples = 20;

      for (let i = 0; i < samples; i++) {
        if (randBoolean(1)) trueCount++;
      }

      expect(trueCount).toBe(samples);
    });
  });

  describe('color generation', () => {
    test('randColor() returns a valid hex color', () => {
      const color = randColor();
      const colorRegex = /^#[0-9a-f]{6}$/i;
      expect(colorRegex.test(color)).toBe(true);
    });
  });

  describe('random array filling', () => {
    test('randArray() fills typed array with random values', () => {
      const array = new Uint8Array(10);
      const emptyArray = new Uint8Array(10);

      randArray(array);

      // Extremely unlikely that a randomly filled array would equal an empty one
      expect(array).not.toEqual(emptyArray);
    });

    test('randArray() fills different typed arrays', () => {
      const array8 = new Uint8Array(10);
      const array16 = new Uint16Array(5);
      const array32 = new Uint32Array(2);

      randArray(array8);
      randArray(array16);
      randArray(array32);

      expect(array8.every(Number.isInteger)).toBe(true);
      expect(array16.every(Number.isInteger)).toBe(true);
      expect(array32.every(Number.isInteger)).toBe(true);
    });

    test('randArray() respects min and max parameters', () => {
      const array = new Uint8Array(100);
      const min = 10;
      const max = 20;

      randArray(array, min, max);

      // Check that all values are in range
      for (const value of array) {
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
      }
    });
  });

  describe('bytesToHex', () => {
    test('converts Uint8Array to hex string', () => {
      const bytes = new Uint8Array([10, 255, 0, 16]);
      expect(bytesToHex(bytes)).toBe('0aff0010');
    });

    test('converts number array to hex string', () => {
      const array = [171, 205, 3];
      expect(bytesToHex(array)).toBe('abcd03');
    });

    test('handles empty array', () => {
      expect(bytesToHex([])).toBe('');
      expect(bytesToHex(new Uint8Array(0))).toBe('');
    });

    test('pads single-digit hex values with leading zero', () => {
      const bytes = new Uint8Array([0, 1, 2, 3, 10, 15]);
      expect(bytesToHex(bytes)).toBe('000102030a0f');
    });
  });
});
