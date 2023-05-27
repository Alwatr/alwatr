import {config} from './config.js';
import {storageClient} from './storage.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUserIncOrder, Order} from '@alwatr/type/customer-order-management.js';

export const touchUserOrder = (userId: string): Promise<void> => {
  return storageClient.touch(config.secureStorage.userOrderList.replace('${userId}', userId));
};

export const getUserOrder = (userId: string): Promise<AlwatrDocumentStorage<Order>> => {
  return storageClient.getStorage<Order>(config.secureStorage.userOrderList.replace('${userId}', userId));
};

export const patchUserOrder = (userId: string, order: Order): Promise<Order> => {
  return storageClient.set<Order>(order, config.secureStorage.userOrderList.replace('${userId}', userId));
};

export const getUserListIncOrder = async (): Promise<Record<string, ComUserIncOrder>> => {
  const userList = (await storageClient.getStorage<ComUserIncOrder>(config.secureStorage.userList)).data;

  for (const user of Object.values(userList)) {
    if (!Object.prototype.hasOwnProperty.call(userList, user.id)) continue;
    user.orderList = (await getUserOrder(user.id)).data;
  }

  return userList;
};
