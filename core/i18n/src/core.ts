import {createLogger, globalAlwatr} from '@alwatr/logger';
import {contextProvider, contextConsumer} from '@alwatr/signal';

import type {L10nResource, Locale, MaybePromise} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/i18n',
  version: _ALWATR_VERSION_,
});

const loadingStr = '…' as const;

export const logger = createLogger('alwatr/i18n');

/**
 * Locale context provider.
 */
export const localeProvider = contextProvider.bind<Locale>('locale');

/**
 * Locale context consumer.
 */
export const localeConsumer = contextConsumer.bind<Locale>('locale');

/**
 * L10n resource context provider.
 */
export const l10nResourceProvider = contextProvider.bind<L10nResource>('l10n-resource');

/**
 * L10n resource context consumer.
 */
export const l10nResourceConsumer = contextConsumer.bind<L10nResource>('l10n-resource');

export const commonLocale = {
  en: {
    code: 'en-US',
    language: 'en',
    direction: 'ltr',
  },
  fa: {
    code: 'fa-IR',
    language: 'en',
    direction: 'rtl',
  },
  ar: {
    code: 'ar-IQ',
    language: 'ar',
    direction: 'rtl',
  },
} as const;

let activeLocale: Locale | null = null;
let activeNumberFormatter: Intl.NumberFormat | null = null;
let activeL10nResource: L10nResource | null = null;

localeConsumer.subscribe(
    (locale) => {
      activeLocale = locale;
      activeNumberFormatter = new Intl.NumberFormat(locale.code);

      // Update root meta in browser
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', locale.code);
        document.documentElement.setAttribute('dir', locale.direction);
      }
    },
    {priority: true, receivePrevious: 'NextCycle'},
);

l10nResourceConsumer.subscribe(
    (l10nResource) => {
      activeL10nResource = l10nResource;
    },
    {priority: true, receivePrevious: 'NextCycle'},
);

export const setLocale = (locale: keyof typeof commonLocale | Locale): void => {
  const _locale = typeof locale === 'string' ? commonLocale[locale] : locale;
  logger.logMethodArgs('setLocale', _locale);
  if (activeLocale?.code !== _locale.code) {
    localeProvider.setValue(_locale);
  }
};

export const setL10nResourceLoader = (l10nResourceLoader: (locale: Locale) => MaybePromise<L10nResource>): void => {
  logger.logMethod('setL10nResourceLoader');

  localeConsumer.subscribe(async (locale) => {
    logger.logMethodArgs('l10nResourceLoader', locale);

    if (activeL10nResource?.meta.code === locale.code) {
      logger.incident('l10nResourceLoader', 'load_skipped', 'Request resource is same as active resource', {
        request: locale.code,
        active: activeL10nResource.meta.code,
      });
      return;
    }

    activeL10nResource = null;
    l10nResourceProvider.expire();

    l10nResourceProvider.setValue(await l10nResourceLoader(locale));
    // const url =
  });
};

/**
 *
 * Get message by key from the localization resource context.
 *
 * return `i18nOptions.loadingStr` if the translation resource is not yet loaded.
 *
 * return "{key}" if the key not defined in the translation resource.
 *
 * return null if the key is null or undefined (for optional input).
 *
 * Example:
 *
 * ```ts
 * message('hello_world'); // Hello world!
 * ```
 */
export function message(key: Lowercase<string>): string;
export function message(key?: null): null;
export function message(key?: Lowercase<string> | null): string | null {
  if (key == null) return null;

  key = <Lowercase<string>>key.trim();
  if (key === '') return '';

  if (activeL10nResource == null) return loadingStr;

  const msg = activeL10nResource.data[key];
  if (msg == null) {
    logger.accident('message', 'l10n_key_not_found', 'Key not defined in the localization resource', {
      key,
      local: activeL10nResource?.meta.code,
    });
    return `{${key}}`;
  }

  return msg;
}

/**
 * Format number to active local string characters and digital group.
 */
export const number = (number: number): string => {
  if (activeNumberFormatter === null) return String(number);
  return activeNumberFormatter.format(number);
};
