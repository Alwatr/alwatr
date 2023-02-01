declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | number | boolean | undefined> | undefined;
}

const debugConfig = localStorage.getItem('DEBUG_CONFIG');
if (debugConfig != null) {
  globalThis.appConfig = JSON.parse(debugConfig);
}

export function getConfKey<T extends string | number | boolean>(key: string): T {
  const val = globalThis.appConfig?.[key];
  if (val == null) throw new Error('invalid_app_config', {cause: {key, val}});
  return val as T;
}
