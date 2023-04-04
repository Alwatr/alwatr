import {logger} from '../config.js';
import {configStorageEngine} from '../lib/storage.js';

export function isAdmin(chatId: number | string): boolean {
  logger.logMethodArgs('isAdmin', {chatId});
  const adminChatIdList = configStorageEngine.get('admin_list')?.adminChatIdList;
  return adminChatIdList?.includes(+chatId) === true;
}

export function addAdmin(chatId: number | string): void {
  logger.logMethodArgs('addAdmin', {chatId});
  const adminChatIdList = configStorageEngine.get('admin_list')?.adminChatIdList ?? [];
  adminChatIdList.push(+chatId);
  configStorageEngine.set({
    id: 'admin_list',
    adminChatIdList: adminChatIdList,
  });
}
