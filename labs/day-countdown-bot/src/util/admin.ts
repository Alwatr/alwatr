import {logger} from '../config.js';
import {configStorageClient} from '../lib/storage.js';

import type {AdminChatInfo} from '../type.js';

export let adminInfoList: Array<AdminChatInfo> = [];

try {
  adminInfoList = (await configStorageClient.get('admin_list'))?.adminInfoList ?? [];
}
catch (err) {
  adminInfoList = [];
}

export function isAdmin(chatId: number | string): boolean {
  const isAdmin = adminInfoList.some((info) => info.chatId === +chatId);
  logger.logMethodArgs?.('isAdmin', {chatId, isAdmin});
  return isAdmin;
}

export async function addAdmin(chatId: number | string, messageThreadId?: number): Promise<void> {
  logger.logMethodArgs?.('addAdmin', {chatId});

  // remove if exists yet
  adminInfoList = adminInfoList.filter((info) => info.chatId !== +chatId);

  adminInfoList.push({chatId: +chatId, messageThreadId});
  await configStorageClient.set({
    id: 'admin_list',
    adminInfoList: adminInfoList,
  });
}

// TODO: use storage client
