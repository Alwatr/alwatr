import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';
import {requireToken} from '../lib/token.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {DocumentObject} from '@alwatr/storage';

nanoServer.route('PATCH', 'all', updateDocument);
nanoServer.route('DELETE', 'all', updateDocument);

async function updateDocument(connection: AlwatrConnection): Promise<void> {
  const storageName = connection.url.pathname.substring(1); // remove the first `/`
  logger.logMethodArgs('updateDocument', {method: connection.method, storageName});

  const token = requireToken(connection);
  const document = await connection.requireJsonBody<DocumentObject>();

  if (document == null || token == null) {
    return;
  }

  if (storageName.length < 2) {
    return connection.reply({
      ok: false,
      statusCode: 404,
      errorCode: 'storage_name_required',
    });
  }

  if (typeof document._id != 'string') {
    return connection.reply({
      ok: false,
      statusCode: 406,
      errorCode: 'doc_id_required',
    });
  }

  document._updatedBy ??= 'admin';

  const storage = storageProvider.get({name: storageName});

  if (connection.method === 'DELETE') {
    connection.reply(
      storage.remove(document._id)
        ? {
          ok: true,
          data: {},
        }
        : {
          ok: false,
          statusCode: 404,
          errorCode: 'document_not_found',
        },
    );
  }
  else {
    connection.reply({
      ok: true,
      data: storage.set(document, true),
    });
  }
}
