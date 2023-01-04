import {sendMessage} from '../bot/send-message.js';
import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

// Send message to admin
nanoServer.route('POST', '/', notify);

async function notify(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('notify');

  connection.requireToken(config.nanoServer.accessToken);

  const bodyJson = await connection.requireJsonBody<{to: string; message: string}>();

  await sendMessage(bodyJson.to, bodyJson.message);

  return {
    ok: true,
    data: {},
  };
}
