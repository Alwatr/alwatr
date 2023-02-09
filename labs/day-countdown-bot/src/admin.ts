import {sendMessage} from './lib/send-message.js';
import {configStorageEngine} from './lib/storage.js';

export async function notifyToAdminList(message: string): Promise<void> {
  const adminList = configStorageEngine.get('admin_list')?.adminChatIdList;
  if (adminList == null) return;
  for (let i = 0; adminList.length > i; i++) {
    await sendMessage(adminList[i], message);
  }
}

export function isAdmin(chatId: string): boolean {
  return configStorageEngine.get('admin_list')?.adminChatIdList.includes(chatId) ?? false;
}
