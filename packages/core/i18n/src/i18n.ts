import {logger, _localize, configuration} from './core';
import {localChangeSignal, l10nResourceChangeSignal} from './signal';

import type {I18nOptions, Local} from './type';

export {localChangeSignal, l10nResourceChangeSignal};

export type {Local};

/**
 * Initial and config the internationalization.
 */
export function initialI18n(options?: Partial<I18nOptions>): void {
  logger.logMethodArgs('initialI18n', {options});
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      // configuration[key] = options[key];
      // WTF, mastmalize type.
      (configuration[key as keyof I18nOptions] as unknown) = options[
        key as keyof I18nOptions
      ] as unknown;
    }
  }

  if (!localChangeSignal.dispatched) {
    // set default local
    localChangeSignal.dispatch(configuration.defaultLocal);
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
 * localize('hello_world'); // Hello world!
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
 * localize('hello_world'); // Hello world!
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
 * localize('hello_world'); // Hello world!
 */
export function localize(key?: string | null): string | null;

export function localize(key?: string | null): string | null {
  if (key == null) return null;
  return _localize(key);
}
