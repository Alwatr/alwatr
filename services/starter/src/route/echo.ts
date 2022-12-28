import {logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

nanoServer.route('POST', '/echo', echo);

async function echo(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('echo');

  const bodyData = await connection.requireJsonBody<Record<string, unknown>>();

  return {
    ok: true,
    data: {
      ...bodyData,
    },
  };
}
