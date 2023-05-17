import {logger} from '../config.js';
import {configStorageClient} from '../lib/storage.js';

export async function isAdmin(chatId: number | string): Promise<boolean> {
  logger.logMethodArgs?.('isAdmin', {chatId});

  let adminChatIdList: Array<number> = [];
  try {
    adminChatIdList = (await configStorageClient.get('admin_list')).adminChatIdList;
  }
  catch {
    return false;
  }
  return adminChatIdList?.includes(+chatId) === true;
}

export async function addAdmin(chatId: number | string): Promise<void> {
  logger.logMethodArgs?.('addAdmin', {chatId});

  let adminChatIdList: Array<number> = [];
  try {
    adminChatIdList = (await configStorageClient.get('admin_list')).adminChatIdList;
  }
  catch {
    //
  }

  adminChatIdList.push(+chatId);
  configStorageClient.set({
    id: 'admin_list',
    adminChatIdList: adminChatIdList,
  });
}
