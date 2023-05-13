import {config} from './config.js';
import {userFactory} from './crypto.js';
import {storageClient, userStorage} from './storage.js';

import type {ComUser} from '@alwatr/type/src/customer-order-management.js';

export const patchUser = async (user: ComUser): Promise<ComUser> => {
  if (user.id === 'new') {
    user.id = userFactory.generateId();
  }

  user = await userStorage.set(user);

  const privateUserOrderListStorageName = config.privateStorage.userOrderList.replace('${userId}', user.id);
  await storageClient.touch(privateUserOrderListStorageName);

  const userToken = userFactory.generateToken([user.id, user.lpe]);

  await storageClient.cacheApiResponse(config.publicStorage.userProfile.replace('${token}', userToken), user);

  await storageClient.link(
      privateUserOrderListStorageName,
      config.publicStorage.userOrderList.replace('${token}', userToken),
  );

  return user;
};
