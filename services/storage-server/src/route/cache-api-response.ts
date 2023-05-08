import {resolve} from 'node:path';

import {writeJsonFile} from '@alwatr/util/node';

import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrServiceResponseSuccess, StringifyableRecord} from '@alwatr/type';

nanoServer.route('PUT', '/cache-api-response', async (connection) => {
  logger.logMethod?.('cache-api-response');

  connection.requireToken(config.nanoServer.accessToken);

  const bodyJson = await connection.requireJsonBody<{ path: string; data: StringifyableRecord }>();

  const base = config.storage.path;
  const path = resolve(base, bodyJson.path + '.json');

  if (!path.startsWith(base)) {
    return {
      ok: false,
      statusCode: 403,
      errorCode: 'path_outside_base',
      meta: {base, path},
    };
  }

  writeJsonFile<AlwatrServiceResponseSuccess>(path, {
    ok: true,
    data: bodyJson.data,
  });

  return {
    ok: true,
    data: {},
  };
});
