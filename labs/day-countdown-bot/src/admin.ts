import {TelegramError} from 'telegraf';

import {logger} from './config.js';
import {bot} from './lib/bot.js';
import {configStorageEngine} from './lib/storage.js';

export async function notifyToAdminList(message: string): Promise<void> {
  const adminChatIdList = getAdminChatIdList();

  for (let i = 0; adminChatIdList.length > i; i++) {
    try {
      await bot.sendMessage(adminChatIdList[i], message, undefined, deleteAdmin as (chatId: string | number) => void);
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

export function isAdmin(chatId: number): boolean {
  return configStorageEngine.get('admin_list')?.adminChatIdList.includes(chatId) ?? false;
}

export function addAdmin(chatId: number): void {
  const adminList = configStorageEngine.get('admin_list') ?? {
    id: 'admin_list',
    adminChatIdList: [],
  };

  adminList.adminChatIdList.push(chatId);
  configStorageEngine.set(adminList);
}

export function deleteAdmin(chatId: number): void {
  logger.logMethodArgs('deleteAdmin', {chatId});
  const adminList = configStorageEngine.get('admin_list');

  if (adminList == null) return;
  const adminChatIdIndex = adminList.adminChatIdList.findIndex((adminChatId) => adminChatId === chatId);
  if (adminChatIdIndex === -1) return;

  adminList.adminChatIdList.splice(adminChatIdIndex, 1);
  configStorageEngine.set(adminList);
}

export function getAdminChatIdList(): Array<number> {
  return configStorageEngine.get('admin_list')?.adminChatIdList ?? [];
}
