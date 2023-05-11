import {AlwatrDocumentObject, AlwatrStorageMeta} from '@alwatr/type';

import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

nanoServer.route<Record<string, AlwatrDocumentObject>, AlwatrStorageMeta>('GET', '/storage', (connection) => {
  logger.logMethod?.('getStorage');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{name: string}>({name: 'string'});

  const storageEngine = storageProvider.get({name: params.name});

  return {...storageEngine._storage}; // prevent to modify storage by reply
});
