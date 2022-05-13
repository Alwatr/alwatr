import {CoreHelperHeader} from '../type';

import type {ServerResponse} from 'http';

export function coreHelper(response: ServerResponse, header: CoreHelperHeader): void {
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
