import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

nanoServer.route('GET', '/user-list/', async (connection) => {
  logger.logMethod?.('get-user-list');
  connection.requireToken(config.nanoServer.adminToken);

  const userList = await storageClient.getStorage(config.userStorageName);

  return {
    ok: true,
    statusCode: 200,
    data: userList,
  };
});
