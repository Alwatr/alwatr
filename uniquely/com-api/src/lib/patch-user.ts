import {config} from './config.js';
import {userFactory} from './crypto.js';
import {storageClient, userStorage} from './storage.js';
import {touchUserOrder} from './user-order.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const patchUser = async (user: ComUser): Promise<ComUser> => {
  if (user.id === 'new') {
    user.id = userFactory.generateId();
  }

  delete user.token;

  user = await userStorage.set(user);

  user.token = userFactory.generateToken([user.id, user.lpe]);

  await storageClient.cacheApiResponse(config.secureStorage.userProfile.replace('${userId}', user.id), user);

  await touchUserOrder(user.id);

  await storageClient.link(
      config.secureStorage.userDir.replace('${userId}', user.id) + '/', // append '/' to detect as folder
      config.publicStorage.userDir.replace('${userToken}', user.token),
  );

  return user;
};
