import {dispatchSignal, hasSignalDispatchedBefore} from '@vatr/signal';
import {log, _localize, configuration} from './core';
import type {I18nOptions} from './type';

/**
 * Initial and config the internationalization.
 */
export function initialI18n(options?: I18nOptions): void {
  log('initialI18n: %o', options);
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      configuration[key] = options[key];
    }
  }

  if (!hasSignalDispatchedBefore('local-change')) {
    // set default local
    dispatchSignal('local-change', configuration.defaultLocal);
  }
}

/**
 * Localize a String_Key from the translation resource.
 *
 * @param key The String_Key of the translation resource to localize.
 * @returns The localized string.
 *  return `…` if the translation resource is not yet loaded.
 *  return `(key)` if the key not defined in the translation resource.
 *  return null if the key is null or undefined (for optional input).
 *
 * @example
 * localize('Hello_World'); // Hello world!
 */
export function localize(key?: null): null;
/**
 * Localize a String_Key from the translation resource.
 *
 * @param key The String_Key of the translation resource to localize.
 * @returns The localized string.
 *  return `…` if the translation resource is not yet loaded.
 *  return `(key)` if the key not defined in the translation resource.
 *  return null if the key is null or undefined (for optional input).
 *
 * @example
 * localize('Hello_World'); // Hello world!
 */
export function localize(key: string): string;
/**
 * Localize a String_Key from the translation resource.
 *
 * @param key The String_Key of the translation resource to localize.
 * @returns The localized string.
 *  return `…` if the translation resource is not yet loaded.
 *  return `(key)` if the key not defined in the translation resource.
 *  return null if the key is null or undefined (for optional input).
 *
 * @example
 * localize('Hello_World'); // Hello world!
 */
export function localize(key?: string | null): string | null;

export function localize(key?: string | null): string | null {
  if (key == null) return null;
  if (key === '') return '';
  if (translationResource == null) return loadingStr;
  const localized = translationResource[key];
  if (localized == null) {
    error('%s not found!', key);
    return `(${key})`;
  }
  return localized;
}
