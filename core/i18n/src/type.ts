import type {L10Resource, Locale} from '@alwatr/type';

export type {L10Resource, Locale};

export type I18nConfig = {
  /**
   * Automatically fetch the localization resource from `resourcePath/localCode.json`.
   *
   * @default true
   */
  autoFetchResources: boolean;

  /**
   * Localization resource storage path (json files directory).
   *
   * @default '/l10n'
   */
  resourcePath: string;

  /**
   * Default language code.
   *
   * @default
   * {code: 'en-US', language: 'en', direction: 'ltr'}
   */
  defaultLocale: Locale;

  /**
   * Use this loadingStr before l10nResource loaded.
   *
   * @default '…'
   */
  loadingStr: string;
};
