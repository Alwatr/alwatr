import {globalAlwatr} from '@alwatr/logger';
import {UnicodeDigits, UnicodeLangKeys} from '@alwatr/math';
import {ListenerCallback, SubscribeOptions, SubscribeResult} from '@alwatr/signal2';
import {AlwatrBaseSignal} from '@alwatr/signal2/base.js';

import {localeList} from './locale-list.js';

import type {L10nResource, L10nResourceLoader, Locale} from './type.js';
import type {LocaleCode} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/i18n',
  version: _ALWATR_VERSION_,
});

export class AlwatrL10n extends AlwatrBaseSignal<LocaleCode> {
  protected _locale?: Locale;
  protected _resource?: L10nResource;
  protected _numberFormatter?: Intl.NumberFormat;
  protected _unicodeDigits?: UnicodeDigits;
  protected _loadingStr = '…' as const;
  protected _resourceLoader?: L10nResourceLoader;
  // Define time units and their corresponding seconds
  protected _timeUnits = [
    {label: 'year', seconds: 31536000},
    {label: 'month', seconds: 2592000},
    {label: 'week', seconds: 604800},
    {label: 'day', seconds: 86400},
    {label: 'hour', seconds: 3600},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 1},
  ] as const;

  constructor() {
    super({
      name: 'alwatr_localization',
    });
  }

  get locale(): Locale | undefined {
    return this._locale;
  }

  get isResourceReady(): boolean {
    return this._resource !== undefined;
  }

  protected async _localeChanged(): Promise<void> {
    const locale = this._locale!;
    this._logger.logMethodArgs?.('_localeChanged', locale.code);

    this._numberFormatter = new Intl.NumberFormat(locale.code);
    this._unicodeDigits = new UnicodeDigits(locale.language as UnicodeLangKeys);

    await this._loadResource();

    this._dispatch(locale.code);

    // Update root meta in browser
    globalThis.document?.documentElement.setAttribute('lang', locale.code);
    globalThis.document?.documentElement.setAttribute('dir', locale.direction);
  }

  protected async _loadResource(): Promise<void> {
    const locale = this._locale!;
    this._logger.logMethodArgs?.('_loadResource', locale.code);

    if (this._resourceLoader === undefined) {
      this._logger.error('_loadResource', 'resource_loader_not_defined');
      return;
    }

    if (this._resource?.meta.code === locale.code) {
      this._logger.incident?.(
          '_loadResource',
          'load_skipped',
          'Request l18e (LocalizationResource) is same as active l18n',
          {
            request: locale.code,
            active: this._resource.meta.code,
          },
      );
      return;
    }

    try {
      const resource = await this._resourceLoader(locale);
      if (resource.meta?.code !== locale.code) {
        this._logger.error(
            '_loadResource',
            'invalid_localization',
            {
              request: locale.code,
              active: resource.meta.code,
            },
        );
      }
      else {
        this._resource = resource;
      }
    }
    catch (err) {
      this._logger.error('_loadResource', 'loader_function_error', err);
    }
  }

  /**
   *
   * Get message by key from the l18e (LocalizationResource) Context.
   *
   * return `i18nOptions.loadingStr` if the l18e is not yet loaded.
   *
   * return "{key}" if the key not defined in the l18e.
   *
   * return '' if the key is null or undefined (for optional input).
   *
   * Example:
   *
   * ```ts
   * message('hello_world'); // Hello world!
   * ```
   */
  message(key?: string | null): string {
    this._logger.logMethodArgs?.('message', key);
    if (!key) return '';
    if (this._resource === undefined) return this._loadingStr;

    const msg = this._resource.data[key];
    if (msg === undefined) {
      this._logger.accident('message', 'l10n_key_not_found', 'Key not defined in the localization resource', {
        key,
        locale: this._resource.meta.code,
      });
      return `{${key}}`;
    }
    // else
    return msg;
  }

  /**
   * Format number to active locale string unicode and digital group.
   */
  number(number?: number | null, decimal = 2): string {
    if (number == null) return '';
    if (this._numberFormatter === undefined) return number + '';
    decimal = Math.pow(10, decimal);
    number = Math.round(number * decimal) / decimal;
    return this._numberFormatter.format(number);
  }

  /**
   * Replace all number in string to active locale number unicode.
   */
  replaceNumber(str: string): string {
    this._logger.logMethodArgs?.('replaceNumber', str);
    if (this._unicodeDigits === undefined) return str;
    return this._unicodeDigits.translate(str);
  }

  /**
   * Format date to active locale string.
   */
  time(date: number | Date, options?: Intl.DateTimeFormatOptions): string {
    this._logger.logMethodArgs?.('time', {date, options});
    if (this._locale === undefined) return this._loadingStr;
    if (typeof date === 'number') date = new Date(date);
    return date.toLocaleDateString(this._locale.code, options);
  }

  relativeTime(
      date: number | Date,
      from: number | Date = Date.now(),
      options: Intl.RelativeTimeFormatOptions = {numeric: 'auto', style: 'narrow'},
  ): string {
    this._logger.logMethodArgs?.('relativeTime', {date, from, options});

    if (this._locale === undefined) return this._loadingStr;

    const rtf = new Intl.RelativeTimeFormat(this._locale.code, options);

    if (typeof date !== 'number') date = date.getTime();
    if (typeof from !== 'number') from = from.getTime();
    const diffSec = (from - date) / 1000;

    // Find the appropriate unit for the time difference
    for (const unit of this._timeUnits) {
      const interval = Math.floor(Math.abs(diffSec / unit.seconds));
      if (interval >= 1) {
        return rtf.format(diffSec > 0 ? interval : -interval, unit.label);
      }
    }

    return rtf.format(0, 'second');
  }

  /**
   * Set global locale in the application.
   *
   * alias for localeProvider.setValue(localeObject)
   *
   * Example:
   *
   * ```ts
   * setLocale();
   * ```
   */
  setLocale(locale?: Locale | keyof typeof localeList): void {
    this._logger.logMethodArgs?.('setLocale', locale);
    if (typeof locale === 'string') {
      locale = localeList[locale];
    }

    if (locale == null) {
      const lang = globalThis.document?.documentElement.lang;
      locale = Object.values(localeList).find((l) => l.code === lang);

      if (locale == null) {
        this._logger.error('setLocale', 'document_lang_not_supported', {lang});
        locale = localeList.fa;
      }
    }

    if (this._locale?.code !== locale.code) {
      this._locale = locale;
      this._localeChanged();
    }
  }

  setResourceLoader(resourceLoader: L10nResourceLoader): void {
    this._logger.logMethod?.('setResourceLoader');

    if (this._resourceLoader !== undefined) {
      this._logger.accident(
          'setResourceLoader',
          'resource_loader_exist',
          'Multi l10n resource loader register, the previous one was removed to avoid errors.',
      );
    }

    this._resourceLoader = resourceLoader;
  }

  subscribe(listenerCallback: ListenerCallback<this, LocaleCode>, options?: SubscribeOptions): SubscribeResult {
    return this._subscribe(listenerCallback, options);
  }

  unsubscribe(listenerCallback: ListenerCallback<this, LocaleCode>): void {
    this._unsubscribe(listenerCallback);
  }

  untilChange(): Promise<LocaleCode> {
    return this._untilChange();
  }
}
