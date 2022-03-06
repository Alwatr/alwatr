declare global {
  interface VatrSignals {
    'local-change': Local;
    'l10n-resource-change': L10Resource;
  }
  interface VatrRequestSignals {
    'l10n-resource-change': Local;
  }
}

export type L10Resource = Record<string, string>;

export interface Local{
  /**
   * fa-IR, en-US, ...
   */
  code: `${string}-${string}`;

  /**
   * fa, en, ...
   */
  language: string;

  /**
   * ltr, rtl
   */
  direction: 'rtl' | 'ltr';
}

export interface I18nOptions {
  /**
   * Automatically fetch the localization resource from `resourcePath/localCode.json`.
   *
   * @default true
   */
  autoFetchResources: boolean;

  /**
   * Localization resource storage path (json files directory).
   * @default '/l10n'
   */
  resourcePath: string;

  /**
   * Default language code.
   *
   * @default
   * {code: 'en-US', language: 'en', direction: 'ltr'}
   */
  defaultLocal: Local;
}
