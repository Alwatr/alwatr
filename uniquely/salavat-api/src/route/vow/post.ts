import {SalavatVow} from '@alwatr/type/src/salavat.js';

import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('POST', '/vow', newVow);

async function newVow(connection:AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newVow');

  connection.requireToken(config.nanoServer.accessToken);

  const body = await connection.requireJsonBody<SalavatVow>();

  body.id = 'auto_increment';

  return {
    ok: true,
    data: await storageClient.set(body),
  };
}
