import {config} from './config.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

export function requireToken(connection: AlwatrConnection): string | null {
  const token = connection.token;

  if (token == null) {
    connection.reply({
      ok: false,
      statusCode: 401,
      errorCode: 'authorization_required',
    });
    return null;
  }

  if (token !== config.token) {
    connection.reply({
      ok: false,
      statusCode: 403,
      errorCode: 'access_denied',
    });
    return null;
  }

  return token;
}
