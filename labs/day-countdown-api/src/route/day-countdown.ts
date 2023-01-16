import {logger, config} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

nanoServer.route('PATCH', '/', newDayCountdownUser);

async function newDayCountdownUser(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newDayCountdownUser');

  connection.requireToken(config.nanoServer.accessToken);

  const {chatId} = await connection.requireJsonBody<{chatId: number}>();

  if (await storageClient.has(chatId.toString()) === true) {
    return {
      ok: false,
      statusCode: 409,
      errorCode: 'day_countdown_set_before',
    };
  }

  await storageClient.set({id: chatId.toString()});

  return {
    ok: true,
    data: {
      message: 'You have become a daily member!',
    },
  };
}
