import {getLocalStorageItem} from '@alwatr/util';

import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: StringifyableRecord;
}

// TODO: config-context with dynamic import like l18e

/**
 * Debug app config.
 *
 * Example:
 *
 * ```ts
 * localStorage.setItem('DEBUG_CONFIG', JSON.stringify(globalThis.appConfig))
 * ```
 */
const debugConfig = getLocalStorageItem('DEBUG_CONFIG', null);
if (debugConfig != null) {
  globalThis.appConfig = debugConfig;
}

export function getConfKey<T extends Stringifyable>(key: string): T {
  const val = globalThis.appConfig?.[key];
  if (val == null) throw new Error('invalid_app_config', {cause: {key, val}});
  return val as T;
}
