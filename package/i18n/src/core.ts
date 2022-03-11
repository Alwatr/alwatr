import {createLogger, alwatrRegisteredList} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';
import {getJson} from '@alwatr/fetch';
import type {I18nOptions, L10Resource} from './type';

alwatrRegisteredList.push({
  name: '@alwatr/i18n',
  version: '{{ALWATR_VERSION}}',
});

export const logger = createLogger('alwatr/i18n');

export const configuration: I18nOptions = {
  autoFetchResources: true,
  resourcePath: '/l10n',
  defaultLocal: {code: 'en-US', language: 'en', direction: 'ltr'},
};

export const l10nResourceChangeSignal = new SignalInterface('l10n-resource-change');
export const localChangeSignal = new SignalInterface('local-change');

const loadingStr = '…';

let l10nResource: L10Resource;
l10nResourceChangeSignal.addListener((resource) => {
  logger.logMethodArgs('l10nResourceChanged', {resource});
  l10nResource = resource;
});

localChangeSignal.addListener((local) => {
  logger.logMethodArgs('localChanged', {local});
  if (configuration.autoFetchResources) {
    l10nResourceChangeSignal.request(local);
  }
  document.documentElement.setAttribute('lang', local.code);
  document.documentElement.setAttribute('dir', local.direction);
});

l10nResourceChangeSignal.setProvider(async (local): Promise<L10Resource | void> => {
  logger.logMethodArgs('l10nResourceProvider', {local});
  const current = await localChangeSignal.getSignalValue();
  if (current.code !== local.code) {
    return await getJson<L10Resource>(`${configuration.resourcePath}/${local.code}.json`);
    // TODO: catch errors and fallback
    // TODO: cache requests
  }
});

/**
 * Localize a String_Key from the localization resource.
 */
export function _localize(key: string): string {
  key = key.trim();
  if (key === '') return '';
  if (l10nResource == null) return loadingStr;
  const localized = l10nResource[key];
  if (localized == null) {
    logger.accident('localize', 'l10n_key_not_found', 'Key not defined in the localization resource', {key});
    return `(${key})`;
  }
  return localized;
}
