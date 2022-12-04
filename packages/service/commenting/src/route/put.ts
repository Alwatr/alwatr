import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storage} from '../lib/storage.js';
import {Comment} from '../lib/type.js';


import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('PUT', '/', addComment);

async function addComment(connection: AlwatrConnection): Promise<void> {
  const token = connection.requireToken(config.nanoServer.token);

  if (token == null) return;

  const params = await connection.requireQueryParams<{path: string}>({path: 'string'});
  if (params == null) return;

  const bodyJson = await connection.requireJsonBody<Comment>();
  if (bodyJson == null) return;

  storage.config.name = params.path;

  try {
    connection.reply({
      ok: true,
      data: await storage.set({...bodyJson, id: 'auto_increment'}),
    });
  }
  catch (err) {
    logger.error('newJob', (err as Error).message ?? 'storage_error', (err as Error).stack ?? err);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
    });
  }
}
