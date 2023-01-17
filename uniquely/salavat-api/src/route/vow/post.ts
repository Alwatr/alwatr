import {GlobalSalavatCount} from '@alwatr/type/src/salavat.js';

import {config, logger} from '../../config.js';
import {getGlobalCount} from '../../counter.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageEngine} from '../../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('POST', '/vow', newVow);

async function newVow(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newVow');

  connection.requireToken(config.nanoServer.accessToken);

  // FIXME: validate with @alwatr/validator
  const {count} = await connection.requireJsonBody<GlobalSalavatCount>();

  let globalCount = getGlobalCount();
  globalCount += count;
  storageEngine.set({id: 'salavat_count', count: globalCount});

  return {
    ok: true,
    data: {
      globalCount,
    },
  };
}
