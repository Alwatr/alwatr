import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

nanoServer.route<string[]>('GET', '/keys', (connection) => {
  logger.logMethod?.('getStorageKeys');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});

  const storageEngine = storageProvider.get({name: params.storage});

  return {
    ok: true,
    data: storageEngine.keys,
  };
});
