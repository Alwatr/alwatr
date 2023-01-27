import {logger, config} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

nanoServer.route('PATCH', '/subscribe/', dayCountSubscribe);

async function dayCountSubscribe(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('dayCountSubscribe');
  connection.requireToken(config.nanoServer.accessToken);

  // TODO: validator
  const {chatId} = await connection.requireJsonBody<{chatId: number}>();

  if (await storageClient.has(chatId.toString()) === true) {
    return {
      ok: false,
      statusCode: 409,
      errorCode: 'day_countdown_set_before',
      data: {
        message: 'Day countdown set before!',
      } as never,
    };
  }

  return {
    ok: true,
    data: await storageClient.set({id: chatId.toString()}),
  };
}
