import {createLogger, vatrRegisteredList} from '@vatr/logger';

const log = createLogger('vatr/signal');
// export const error = createLogger('vatr/signal', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/fetch',
  version: '{{VATR_VERSION}}',
});

export interface FetchOptions extends RequestInit
{
  timeout?: number;
  jsonify?: boolean;
  bodyObject?: Record<string | number, unknown>;
  queryParamList?: Record<string, string | number | boolean>;
}

/**
 * Enhanced fetch function.
 */
export function fetch <ResponseType>(url: string, options?: FetchOptions): Promise<ResponseType> {
  log('fetch', url, options);
}
