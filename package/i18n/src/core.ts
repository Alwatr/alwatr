import {createLogger, vatrRegisteredList} from '@vatr/logger';
import {addSignalListener, requestSignal, setSignalProvider, waitForSignal} from '@vatr/signal';
import {getJson} from '@vatr/fetch';
import type {I18nOptions, L10Resource} from './type';

export const log = createLogger('vatr/i18n');
export const error = createLogger('vatr/i18n', 'error', true);

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
  l10nResource = resource;
});

addSignalListener('local-change', (local) => {
  if (configuration.autoFetchResources) requestSignal('l10n-resource-change', local);
  document.documentElement.setAttribute('lang', local.code);
  document.documentElement.setAttribute('dir', local.direction);
});

setSignalProvider('l10n-resource-change', async (local): Promise<L10Resource | void> => {
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
  if (l10nResource == null) return loadingStr;
  const localized = l10nResource[key];
  if (localized == null) {
    error('%s not found!', key);
    return `(${key})`;
  }
  return localized;
}
