import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';
import type {AlwatrDocumentObject} from '@alwatr/type';

nanoServer.route('POST', '/', setForm);

async function setForm(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('setForm');
  connection.requireToken(config.nanoServer.accessToken);

  const {storage} = connection.requireQueryParams<{storage: string}>({storage: 'string'});

  const bodyJson = await connection.requireJsonBody<AlwatrDocumentObject>();
  bodyJson.id ??= 'auto_increment';
  return {
    ok: true,
    data: await storageClient.set(bodyJson, storage),
  };
}
