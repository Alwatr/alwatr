import {simpleHashNumber} from '@alwatr/math';

import {config, logger} from '../lib/config.js';
import {userFactory} from '../lib/crypto.js';
import {nanoServer} from '../lib/server.js';
import {storageClient, userStorage} from '../lib/storage.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

nanoServer.route('PATCH', '/user-list/', async (connection) => {
  logger.logMethod?.('patch-user-list');

  await validateUserAuth(connection.getUserAuth(), '*');

  const userData = await connection.requireJsonBody<ComUser>();

  if (userData.id === 'new') {
    userData.id = userFactory.generateId();
  }
  else if (!userData.id || !userFactory.verifyId(userData.id)) {
    // TODO: better validate user data.
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'invalid_user_id',
    };
  }

  const user = await userStorage.set(userData);

  const privateUserOrderListStorageName = config.privateStorage.userOrderList.replace('${userId}', user.id);
  await storageClient.touch(privateUserOrderListStorageName);

  const authHash = `${simpleHashNumber(user.phoneNumber)}-${userFactory.generateToken([user.id, user.lpe])}`;

  await storageClient.cacheApiResponse(config.publicStorage.userProfile.replace('${auth}', authHash), user);

  await storageClient.link(
      privateUserOrderListStorageName,
      config.publicStorage.userOrderList.replace('${auth}', authHash),
  );

  return {
    ok: true,
    data: user,
  };
});
