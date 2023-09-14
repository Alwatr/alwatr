import type {AlwatrServiceResponseSuccessWithMeta, MaybePromise} from '@alwatr/type';

export type LocaleCode = `${Lowercase<string>}-${Uppercase<string>}`;

export type L10nResource = AlwatrServiceResponseSuccessWithMeta<Record<string, string>, {
  code: LocaleCode;
  rev: number;
}>;

export interface Locale {
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
}

export type L10nResourceLoader = (locale: Locale) => MaybePromise<L10nResource>
