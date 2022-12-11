import {sendMessage} from '../bot/send-message.js';
import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

// Send message to admin
nanoServer.route('POST', '/', notify);

async function notify(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('notify');

  if (connection.requireToken(config.nanoServer.token) == null) return;

  const bodyJson = await connection.requireJsonBody<{to: string; message: string}>();
  if (bodyJson == null) return;

  await sendMessage(bodyJson.to, bodyJson.message);

  connection.reply({
    ok: true,
    data: {},
  });
}
