import {createLogger, vatrRegisteredList} from '@vatr/logger';
import {addSignalListener, requestSignal, setSignalProvider, waitForSignal} from '@vatr/signal';
import {getJson} from '@vatr/fetch';
import type {I18nOptions, L10Resource} from './type';

export const logger = createLogger('vatr/i18n');

vatrRegisteredList.push({
  name: '@vatr/i18n',
  version: '{{VATR_VERSION}}',
});

export const configuration: I18nOptions = {
  autoFetchResources: true,
  resourcePath: '/l10n',
  defaultLocal: {code: 'en-US', language: 'en', direction: 'ltr'},
};

const loadingStr = '…';

let l10nResource: L10Resource;
addSignalListener('l10n-resource-change', (resource) => {
  logger.logMethodArgs('l10nResourceChanged', {resource});
  l10nResource = resource;
});

addSignalListener('local-change', (local) => {
  logger.logMethodArgs('localChanged', {local});
  if (configuration.autoFetchResources) requestSignal('l10n-resource-change', local);
  document.documentElement.setAttribute('lang', local.code);
  document.documentElement.setAttribute('dir', local.direction);
});

setSignalProvider('l10n-resource-change', async (local): Promise<L10Resource | void> => {
  logger.logMethodArgs('l10nResourceProvider', {local});
  const current = await waitForSignal('local-change', true);
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
