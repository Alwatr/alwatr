import {CorsHelperHeader} from '../type';

import type {ServerResponse} from 'http';

/**
 * Set CORS helper header.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
export function corsHelper(response: ServerResponse, header: CorsHelperHeader): void {
  if (header.allowOrigin !== undefined) {
    response.setHeader('Access-Control-Allow-Origin', header.allowOrigin);
  }

  if (header.allowMethods !== undefined) {
    response.setHeader('Access-Control-Allow-Methods', header.allowMethods);
  }

  if (header.allowHeaders !== undefined) {
    response.setHeader('Access-Control-Allow-Headers', header.allowHeaders);
  }

  if (header.exposeHeaders !== undefined) {
    response.setHeader('Access-Control-Expose-Headers', header.exposeHeaders);
  }

  if (header.allowCredentials !== undefined) {
    response.setHeader('Access-Control-Allow-Credentials', String(header.allowCredentials));
  }

  if (header.maxAge !== undefined) {
    response.setHeader('Access-Control-Max-Age', header.maxAge);
  }
}
