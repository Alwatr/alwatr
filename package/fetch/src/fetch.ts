import {createLogger, vatrRegisteredList} from '@vatr/logger';

const log = createLogger('vatr/signal');
// export const error = createLogger('vatr/signal', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/signal',
  version: '{{VATR_VERSION}}',
});

/**
 * Enhanced fetch function.
 */
export function fetch <T>(url: string, options?: unknown): Promise<T> {
  log('fetch', url, options);
}
