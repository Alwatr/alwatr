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

export async function isAdmin(chatId: number | string, chatThreadId?: number): Promise<boolean> {
  console.log('fuckumer', adminInfoList);

  const isAdmin = adminInfoList.some((info) =>
    (info.chatId === +chatId) && (info.chatThreadId ? info.chatThreadId === chatThreadId : true),
  );
  logger.logMethodArgs?.('isAdmin', {chatId, isAdmin});
  return isAdmin;
}

export async function addAdmin(chatId: number | string, chatThreadId?: number): Promise<void> {
  logger.logMethodArgs?.('addAdmin', {chatId});

  adminInfoList.push({chatId: +chatId, chatThreadId});
  configStorageClient.set({
    id: 'admin_list',
    adminInfoList: adminInfoList,
  });
}

// TODO: use storage client
