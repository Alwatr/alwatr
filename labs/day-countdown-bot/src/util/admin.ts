import {logger} from '../config.js';
import {configStorageClient} from '../lib/storage.js';

import type {AdminChatInfo} from '../type.js';

export const adminInfoList: Array<AdminChatInfo> = (await configStorageClient.get('admin_list'))?.adminInfoList ?? [];

export function isAdmin(chatId: number | string): boolean {
  const isAdmin = adminInfoList.some((info) => info.chatId === +chatId);
  logger.logMethodArgs?.('isAdmin', {chatId, isAdmin});
  return isAdmin;
}

export async function addAdmin(chatId: number | string, messageThreadId?: number): Promise<void> {
  logger.logMethodArgs?.('addAdmin', {chatId});
  if (isAdmin(chatId)) return;

  await configStorageClient.set({
    id: 'admin_list',
    adminInfoList: adminInfoList,
  });
  adminInfoList.push({chatId: +chatId, messageThreadId});
}

// TODO: use storage client
