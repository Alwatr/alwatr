import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';
import type {StringifyableRecord} from '@alwatr/type';

nanoServer.route('GET', '/has', has);

function has(connection: AlwatrConnection): AlwatrServiceResponse<StringifyableRecord, StringifyableRecord> {
  logger.logMethod('has');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{storage: string; id: string}>({storage: 'string', id: 'string'});

  const storageEngine = storageProvider.get({name: params.storage});

  return {
    ok: true,
    data: {has: storageEngine.has(params.id)},
  };
}
