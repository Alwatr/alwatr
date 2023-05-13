import {config} from './config.js';
import {userFactory} from './crypto.js';
import {storageClient, userStorage} from './storage.js';

import type {ComUser} from '@alwatr/type/src/customer-order-management.js';

export const patchUser = async (user: ComUser): Promise<ComUser> => {
  if (user.id === 'new') {
    user.id = userFactory.generateId();
  }

  delete user.token;

  user = await userStorage.set(user);

  user.token = userFactory.generateToken([user.id, user.lpe]);

  const privateUserOrderListStorageName = config.privateStorage.userOrderList.replace('${userId}', user.id);
  await storageClient.touch(privateUserOrderListStorageName);

  await storageClient.cacheApiResponse(config.publicStorage.userProfile.replace('${token}', user.token), user);

  await storageClient.link(
      privateUserOrderListStorageName,
      config.publicStorage.userOrderList.replace('${token}', user.token),
  );

  return user;
};
