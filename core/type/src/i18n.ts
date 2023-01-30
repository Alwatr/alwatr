import {AlwatrServiceResponseSuccessWithMeta} from './service-response.js';

export type LocaleCode = `${Lowercase<string>}-${Uppercase<string>}`;

export type L18eContext = AlwatrServiceResponseSuccessWithMeta<Record<Lowercase<string>, string>, {
  code: LocaleCode;
  rev: number;
}>;

export type LocaleContext = {
  /**
   * fa-IR, en-US, ...
   */
  code: LocaleCode;

  /**
   * fa, en, ...
   */
  language: Lowercase<string>;

  /**
   * ltr, rtl
   */
  direction: 'rtl' | 'ltr';
};

/**
 * Multi language string
 *
 * {fa: 'سلام', en: 'hello'}
 */
export type MultiLangStringObj = Record<Lowercase<string>, string>;
