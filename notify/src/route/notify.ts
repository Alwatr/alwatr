import {bot} from '../lib/bot.js';
import {adminChatId} from '../lib/command/start.js';
import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

// Send message to admin
nanoServer.route('POST', '/', notify);

async function notify(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('notify');

  const bodyJson = await connection.requireJsonBody<{message: string}>();
  if (bodyJson == null) return;

  await bot.telegram.sendMessage(adminChatId!, bodyJson.message);

  connection.reply({
    ok: true,
    data: {},
  });
}
