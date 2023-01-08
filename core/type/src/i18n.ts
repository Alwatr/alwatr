export type LocalCode = `${Lowercase<string>}-${Uppercase<string>}`;

export type L10Resource = Record<string, string> & {
  _code: LocalCode;
};

export type Locale = {
  /**
   * fa-IR, en-US, ...
   */
  code: LocalCode;

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
export type i18nString = Record<Lowercase<string>, string>;
