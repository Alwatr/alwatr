import {createLogger, globalAlwatr} from '@alwatr/logger';
import {contextProvider, contextConsumer} from '@alwatr/signal';

import type {L18eContext, LocaleContext, MaybePromise} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/i18n',
  version: _ALWATR_VERSION_,
});

const loadingStr = '…' as const;

export const logger = createLogger('alwatr/i18n');

/**
 * Locale context provider.
 */
export const localeContextProvider = contextProvider.bind<LocaleContext>('locale_context');

/**
 * Locale context consumer.
 */
export const localeContextConsumer = contextConsumer.bind<LocaleContext>('locale_context');

/**
 * LocalizationResource (L18e) context provider.
 */
export const l18eContextProvider = contextProvider.bind<L18eContext>('localization_resource_context');

/**
 * LocalizationResource (L18e) context consumer.
 */
export const l18eContextConsumer = contextConsumer.bind<L18eContext>('localization_resource_context');

/**
 * Common useful locales.
 */
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

let activeLocaleContext: LocaleContext | null = null;
let activeNumberFormatter: Intl.NumberFormat | null = null;
let activeL18eContext: L18eContext | null = null;

/**
 * Update activeLocaleContext and activeNumberFormatter.
 */
localeContextConsumer.subscribe(
    (locale) => {
      activeLocaleContext = locale;
      activeNumberFormatter = new Intl.NumberFormat(locale.code);

      // Update root meta in browser
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', locale.code);
        document.documentElement.setAttribute('dir', locale.direction);
      }
    },
    {priority: true, receivePrevious: 'NextCycle'},
);

/**
 * Update activeL18eContext.
 */
l18eContextConsumer.subscribe(
    (l18eContext) => {
      activeL18eContext = l18eContext;
    },
    {priority: true, receivePrevious: 'NextCycle'},
);

/**
 * Set global locale in the application.
 *
 * alias for localeProvider.setValue(localeObject)
 *
 * Example:
 *
 * ```ts
 * setLocale('fa');
 * ```
 */
export const setLocale = (locale: keyof typeof commonLocale | LocaleContext): void => {
  const _locale = typeof locale === 'string' ? commonLocale[locale] : locale;
  logger.logMethodArgs('setLocale', _locale);
  if (activeLocaleContext?.code !== _locale.code) {
    localeContextProvider.setValue(_locale);
  }
};

/**
 * Set loader function for provide l18e (LocalizationResource).
 *
 * Example:
 *
 * ```ts
 * setL18eLoader((locale) => {
 *  return import(`/l18r/${locale.code}.js`);
 * })
 * ```
 */
export const setL18eLoader = (l18eLoader: (locale: LocaleContext) => MaybePromise<L18eContext>): void => {
  logger.logMethod('setL18eLoader');

  localeContextConsumer.subscribe(async (locale) => {
    logger.logMethodArgs('l18eLoader', locale);

    if (activeL18eContext?.meta.code === locale.code) {
      logger.incident(
          'l18eLoader',
          'load_skipped',
          'Request l18e (LocalizationResource) is same as active l18n',
          {
            request: locale.code,
            active: activeL18eContext.meta.code,
          },
      );
      return;
    }

    activeL18eContext = null;
    l18eContextProvider.expire();

    try {
      const l18e = await l18eLoader(locale);
      l18eContextProvider.setValue(l18e);
    }
    catch (err) {
      logger.error('l18eLoader', 'loader_function_error', err);
    }
  });
};

/**
 *
 * Get message by key from the l18e (LocalizationResource) Context.
 *
 * return `i18nOptions.loadingStr` if the l18e is not yet loaded.
 *
 * return "{key}" if the key not defined in the l18e.
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

  if (activeL18eContext == null) return loadingStr;

  const msg = activeL18eContext.data[key];
  if (msg == null) {
    logger.accident('message', 'l10n_key_not_found', 'Key not defined in the localization resource', {
      key,
      locale: activeL18eContext?.meta.code,
    });
    return `{${key}}`;
  }

  return msg;
}

/**
 * Format number to active locale string characters and digital group.
 */
export const number = (number: number): string => {
  if (activeNumberFormatter === null) return String(number);
  return activeNumberFormatter.format(number);
};
