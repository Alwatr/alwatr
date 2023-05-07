import {simpleHashNumber} from '@alwatr/math';
import {User, UserAuth} from '@alwatr/type';

import {config, logger} from '../lib/config.js';
import {userFactory} from '../lib/crypto.js';
import {nanoServer} from '../lib/server.js';
import {storageClient, userStorage} from '../lib/storage.js';

import type {ComUser, UserPermission} from '@alwatr/type/customer-order-management.js';

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


const validateUserAuth = async (userAuth: UserAuth | null, permission?: UserPermission): Promise<User> => {
  if (userAuth == null) {
    throw {
      ok: false,
      statusCode: 401,
      errorCode: 'authorization_required',
    };
  }

  const error403 = {
    ok: false,
    statusCode: 403,
    errorCode: 'access_denied',
  } as const;

  const user = await userStorage.get(userAuth.id);

  if (user == null) throw error403;

  if (!userFactory.verifyToken([user.id, user.lpe], userAuth.token)) throw error403;

  if (permission && user.permissions?.includes(permission) !== true) throw error403;

  return user;
};
