import {isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {configStorageEngine} from '../lib/storage.js';

bot.command('deleteAdmin', (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/deleteAdmin', {chatId});

  const adminList = configStorageEngine.get('admin_list') ?? {
    id: 'admin_list',
    adminChatIdList: [],
  };

  if (isAdmin(chatId)) {
    const adminChatIdIndex = adminList.adminChatIdList.findIndex((adminChatId) => adminChatId === chatId);
    adminList.adminChatIdList.splice(adminChatIdIndex, 1);
    configStorageEngine.set(adminList);
    sendMessage(chatId, message('command_delete_admin_success'));
  }
});
