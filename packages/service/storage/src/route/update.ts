import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider, getDataModel} from '../lib/storage-provider.js';
import {requireToken, subToken} from '../lib/token.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {DocumentObject} from '@alwatr/storage';

nanoServer.route('POST', 'all', updateDocument);

async function updateDocument(connection: AlwatrConnection): Promise<void> {
  const storageName = connection.url.pathname.substring(1).trim(); // remove the first `/`
  logger.logMethodArgs('updateDocument', {storageName});

  const bodyData = await connection.requireJsonBody();
  const token = requireToken(connection);
  if (bodyData === null || token === null) return;

  if (typeof bodyData._id != 'string') {
    return connection.reply({
      ok: false,
      statusCode: 406,
      errorCode: '_id required',
    });
  }

  const storageModel = getDataModel(storageName);

  if (storageModel === null) {
    return connection.reply({
      ok: false,
      statusCode: 404,
      errorCode: 'storage_not_defined',
      data: {
        storageName,
        documentId: bodyData._id,
      },
    });
  }

  const storage = await storageProvider.get({
    name: storageName,
    path: `${config.storagePath}/${storageModel.subFolder}`,
  });

  const document: DocumentObject = {
    ...bodyData, // TODO: validate keys
    _id: bodyData._id,
    _updatedBy: subToken(token),
  };

  storage.set(document, true);

  connection.reply({
    ok: true,
    data: document,
  });
}
