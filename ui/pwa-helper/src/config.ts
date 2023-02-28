import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: StringifyableRecord;
}

// TODO: config-context with dynamic import like l18e

const debugConfig = localStorage.getItem('DEBUG_CONFIG');
if (debugConfig != null) {
  globalThis.appConfig = JSON.parse(debugConfig);
}

export function getConfKey<T extends Stringifyable>(key: string): T {
  const val = globalThis.appConfig?.[key];
  if (val == null) throw new Error('invalid_app_config', {cause: {key, val}});
  return val as T;
}
