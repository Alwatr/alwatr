import {logger} from './config.js';
import {bot, handleAdminSendMessageError} from './lib/bot.js';
import {configStorageEngine} from './lib/storage.js';

import type {TelegramError} from 'telegraf';

export async function notifyToAdminList(message: string): Promise<void> {
  const adminChatIdList = getAdminChatIdList();

  for (let i = 0; adminChatIdList.length > i; i++) {
    try {
      await bot.sendMessage(adminChatIdList[i], message, undefined, handleAdminSendMessageError);
    }
    catch (err) {
      const _err = err as TelegramError;
      if (_err.code === 403) {
        deleteAdmin(adminChatIdList[i]);
        return;
      }
      logger.error('notifyToAdminList', _err.message, {_err});
    }
  }
}

export function isAdmin(userId: number): boolean {
  return configStorageEngine.get('admin_list')?.adminChatIdList.includes(userId) ?? false;
}

export function addAdmin(userId: number): void {
  const adminList = configStorageEngine.get('admin_list') ?? {
    id: 'admin_list',
    adminChatIdList: [],
  };

  adminList.adminChatIdList.push(userId);
  configStorageEngine.set(adminList);
}

export function deleteAdmin(userId: number): void {
  logger.logMethodArgs('deleteAdmin', {chatId: userId});
  const adminList = configStorageEngine.get('admin_list');

  if (adminList == null) return;
  const adminChatIdIndex = adminList.adminChatIdList.findIndex((adminChatId) => adminChatId === userId);
  if (adminChatIdIndex === -1) return;

  adminList.adminChatIdList.splice(adminChatIdIndex, 1);
  configStorageEngine.set(adminList);
}

export function getAdminChatIdList(): Array<number> {
  return configStorageEngine.get('admin_list')?.adminChatIdList ?? [];
}
