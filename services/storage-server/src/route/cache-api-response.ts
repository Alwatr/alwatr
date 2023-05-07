import {writeJsonFileSync} from '@alwatr/util/node';

import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrServiceResponseSuccess, StringifyableRecord} from '@alwatr/type';

nanoServer.route('PUT', '/cache-api-response', async (connection) => {
  logger.logMethod?.('cache-api-response');

  connection.requireToken(config.nanoServer.accessToken);

  const bodyJson = await connection.requireJsonBody<{ path: string; data: StringifyableRecord }>();

  writeJsonFileSync<AlwatrServiceResponseSuccess>(bodyJson.path + '.json', {
    ok: true,
    data: bodyJson.data,
  });

  return {
    ok: true,
    data: {},
  };
});
