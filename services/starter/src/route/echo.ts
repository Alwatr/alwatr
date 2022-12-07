import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('POST', '/echo', echo);

async function echo(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('echo');

  const bodyData = await connection.requireJsonBody();
  if (bodyData == null) return;

  connection.reply({
    ok: true,
    data: {
      ...bodyData,
    },
  });
}
