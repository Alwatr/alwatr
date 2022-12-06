import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storage} from '../lib/storage.js';
import {Message} from '../lib/type.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('PUT', '/', addComment);

async function addComment(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('addComment');
  const token = connection.requireToken(config.nanoServer.token);

  if (token == null) return;

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  if (params == null) return;

  const bodyJson = await connection.requireJsonBody<Message>();
  if (bodyJson == null) return;

  storage.config.name = params.storage;

  // check reply id exists
  if (bodyJson.replyId !== undefined && !(await storage.has(bodyJson.replyId))) {
    delete(bodyJson.replyId);
  }

  try {
    connection.reply({
      ok: true,
      data: await storage.set({...bodyJson, id: 'auto_increment'}),
    });
  }
  catch (err) {
    logger.error('addComment', (err as Error).message ?? 'storage_error', (err as Error).stack ?? err);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
    });
  }
}
