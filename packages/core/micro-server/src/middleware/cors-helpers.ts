import {CorsHelperHeader} from '../type';

import type {ServerResponse} from 'http';

export function corsHelper(response: ServerResponse, header: CorsHelperHeader): void {
  if (header.allowOrigin !== undefined) {
    response.setHeader('Access-Control-Allow-Origin', header.allowOrigin);
  }

  if (header.allowMethod !== undefined) {
    response.setHeader('Access-Control-Allow-Method', header.allowMethod);
  }

  if (header.maxAge !== undefined) {
    response.setHeader('Access-Control-Max-Age', header.maxAge);
  }
}
