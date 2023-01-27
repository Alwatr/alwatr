import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {sendMessage} from '../lib/send-message.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('POST', '/', notify);

async function notify(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('notify');

  connection.requireToken(config.nanoServer.accessToken);

  const bodyJson = await connection.requireJsonBody<{chatId: string; message: string}>();

  await sendMessage(bodyJson.chatId, bodyJson.message);

  return {
    ok: true,
    data: {
      to: bodyJson.chatId,
      message: bodyJson.message,
    },
  };
}
