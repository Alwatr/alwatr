import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

nanoServer.route('GET', '/user-list/', async (connection) => {
  logger.logMethod?.('get-user-list');

  await validateUserAuth(connection.getUserAuth(), '*');

  const userList = await storageClient.getStorage(config.privateStorage.userList);

  return {
    ok: true,
    statusCode: 200,
    data: userList,
  };
});
