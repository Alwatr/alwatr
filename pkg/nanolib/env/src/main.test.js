import {getEnv, getNumberEnv} from '@alwatr/env';
import {platformInfo} from '@alwatr/platform-info';

describe('@alwatr/env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {...originalEnv};
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getEnv', () => {
    it('should return value from process.env', () => {
      process.env.TEST_ENV_VAR = 'hello';
      expect(getEnv({name: 'TEST_ENV_VAR'})).toBe('hello');
    });

    it('should return defaultValue when env var is not set', () => {
      delete process.env.TEST_ENV_VAR;
      expect(getEnv({name: 'TEST_ENV_VAR', defaultValue: 'default'})).toBe('default');
    });

    it('should treat empty string as undefined and use defaultValue', () => {
      process.env.TEST_ENV_VAR = '';
      expect(getEnv({name: 'TEST_ENV_VAR', defaultValue: 'fallback'})).toBe('fallback');
    });

    it('should throw error when env var is missing and no default provided', () => {
      delete process.env.MISSING_VAR;
      expect(() => getEnv({name: 'MISSING_VAR'})).toThrow('Environment variable "MISSING_VAR" is required.');
    });

    it('should return developmentValue in development mode', () => {
      delete process.env.TEST_ENV_VAR;
      const isDev = platformInfo.development;
      try {
        platformInfo.development = true;
        expect(getEnv({name: 'TEST_ENV_VAR', defaultValue: 'prod', developmentValue: 'dev'})).toBe('dev');
      } finally {
        platformInfo.development = isDev;
      }
    });
  });

  describe('getNumberEnv', () => {
    it('should return parsed number from process.env', () => {
      process.env.TEST_NUM = '1234';
      expect(getNumberEnv({name: 'TEST_NUM'})).toBe(1234);
    });

    it('should parse negative and float numbers', () => {
      process.env.TEST_FLOAT = '-12.34';
      expect(getNumberEnv({name: 'TEST_FLOAT'})).toBe(-12.34);
    });

    it('should return 0 correctly from process.env', () => {
      process.env.TEST_ZERO = '0';
      expect(getNumberEnv({name: 'TEST_ZERO'})).toBe(0);
    });

    it('should return numeric defaultValue when unset', () => {
      delete process.env.TEST_NUM;
      expect(getNumberEnv({name: 'TEST_NUM', defaultValue: 8080})).toBe(8080);
    });

    it('should return string defaultValue converted to number', () => {
      delete process.env.TEST_NUM;
      expect(getNumberEnv({name: 'TEST_NUM', defaultValue: '3000'})).toBe(3000);
    });

    it('should handle 0 as defaultValue', () => {
      delete process.env.TEST_NUM;
      expect(getNumberEnv({name: 'TEST_NUM', defaultValue: 0})).toBe(0);
    });

    it('should treat empty string as undefined and use defaultValue', () => {
      process.env.TEST_NUM = '';
      expect(getNumberEnv({name: 'TEST_NUM', defaultValue: 5000})).toBe(5000);
    });

    it('should return developmentValue in development mode', () => {
      delete process.env.TEST_NUM;
      const isDev = platformInfo.development;
      try {
        platformInfo.development = true;
        expect(getNumberEnv({name: 'TEST_NUM', defaultValue: 80, developmentValue: 8080})).toBe(8080);
        expect(getNumberEnv({name: 'TEST_NUM', defaultValue: 80, developmentValue: '9000'})).toBe(9000);
      } finally {
        platformInfo.development = isDev;
      }
    });

    it('should throw error when env var is missing and no default provided', () => {
      delete process.env.MISSING_NUM;
      expect(() => getNumberEnv({name: 'MISSING_NUM'})).toThrow('Environment variable "MISSING_NUM" is required.');
    });

    it('should throw error when env var is not a valid number', () => {
      process.env.INVALID_NUM = 'not-a-number';
      expect(() => getNumberEnv({name: 'INVALID_NUM'})).toThrow(
        'Environment variable "INVALID_NUM" must be a valid number, received: "not-a-number".',
      );
    });

    it('should throw error for NaN or Infinity in env var', () => {
      process.env.NAN_NUM = 'NaN';
      expect(() => getNumberEnv({name: 'NAN_NUM'})).toThrow(
        'Environment variable "NAN_NUM" must be a valid number, received: "NaN".',
      );

      process.env.INF_NUM = 'Infinity';
      expect(() => getNumberEnv({name: 'INF_NUM'})).toThrow(
        'Environment variable "INF_NUM" must be a valid number, received: "Infinity".',
      );
    });

    it('should throw error when defaultValue is not a valid number', () => {
      delete process.env.TEST_INVALID_DEFAULT;
      expect(() => getNumberEnv({name: 'TEST_INVALID_DEFAULT', defaultValue: 'abc'})).toThrow(
        'Environment variable "TEST_INVALID_DEFAULT" must be a valid number, received: "abc".',
      );
    });
  });
});
