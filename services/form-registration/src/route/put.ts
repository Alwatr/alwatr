import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';
import type {AlwatrDocumentObject, StringifyableRecord} from '@alwatr/type';

nanoServer.route('PUT', '/form/', async (
    connection: AlwatrConnection,
): Promise<AlwatrServiceResponse<Record<string, never>, StringifyableRecord>> => {
  logger.logMethod('put');

  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{formId: string}>({formId: 'string'});
  const remoteAddress = connection.incomingMessage.socket.remoteAddress ?? 'unknown';
  const clientId = connection.incomingMessage.headers['client-id'];

  if (!clientId) {
    return {
      ok: false,
      statusCode: 401,
      errorCode: 'client_id_header_required',
    };
  }

  if (config.formList.indexOf(params.formId) === -1) {
    return {
      ok: false,
      statusCode: 404,
      errorCode: 'form_not_found',
    };
  }

  const bodyJson = await connection.requireJsonBody<AlwatrDocumentObject>();

  await storageClient.set(
      {
        ...bodyJson,
        id: 'auto_increment',
        remoteAddress: remoteAddress,
        clientId: clientId,
      },
      'form-' + params.formId,
  );

  return {
    ok: true,
    data: {},
  };
});
