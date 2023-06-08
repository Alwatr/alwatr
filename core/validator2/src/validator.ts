import {UnicodeDigits, isNumber} from '@alwatr/math';

import type {JsonSchema, ValidatorConfig} from './type.js';
import type {StringifyableRecord} from '@alwatr/type';

export type {JsonSchema};


export class Validator<T extends StringifyableRecord> {
  constructor(protected _config: ValidatorConfig) {

  }
}

/**
 * Validate a phone number and return it in a standard format with country code.
 */
export const sanitizePhoneNumber = (input?: string | number | null, countryCode = '98'): number | null => {
  if (input == null) return null;

  const unicodeDigits = new UnicodeDigits('en');
  input = unicodeDigits.translate(input + '');

  input =
    countryCode +
    input.replace(/[ )(-]+/g, '').replace(new RegExp(`^(\\+${countryCode}|${countryCode}|\\+|0)`), '');

  if (input.length !== countryCode.length + 10 || !isNumber(input)) return null;

  return +input;
};
