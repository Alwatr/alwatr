import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider, getDataModel} from '../lib/storage-provider.js';
import {requireToken} from '../lib/token.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', 'all', getDocument);

async function getDocument(connection: AlwatrConnection): Promise<void> {
  const splittedPath = connection
      .url
      .pathname
      .substring(1) // remove the first `/`
      .split('/');

  if (splittedPath.length < 2) {
    return connection.reply({
      ok: false,
      statusCode: 400,
      errorCode: 'invalid_path_format',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const documentId = splittedPath.pop()!;
  const storageName = splittedPath.join('/');

  logger.logMethodArgs('getDocument', {storageName, documentId});

  const token = requireToken(connection);
  if (token === null) return;

  const storageModel = getDataModel(storageName);

  if (storageModel === null) {
    return connection.reply({
      ok: false,
      statusCode: 404,
      errorCode: 'storage_not_defined',
    });
  }

  const storage = await storageProvider.get({
    name: storageName,
    path: `${config.storagePath}/${storageModel.subFolder}`,
  });

  const document = storage.get(documentId, true);

  if (document === null) {
    return connection.reply({
      ok: false,
      statusCode: 404,
      errorCode: 'document_not_found',
    });
  }

  connection.reply({
    ok: true,
    data: document,
  });
}
