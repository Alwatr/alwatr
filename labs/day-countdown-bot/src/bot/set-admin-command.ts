import {isAdmin} from '../admin.js';
import {config, logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {configStorageEngine} from '../lib/storage.js';

bot.command('setAdmin', (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  const token = ctx.message.text.split(' ')[1];
  logger.logMethodArgs('command/setAdmin', {chatId, token});

  if (token == config.telegramBot.adminToken) {
    const adminList = configStorageEngine.get('admin_list') ?? {
      id: 'admin_list',
      adminChatIdList: [],
    };

    if (isAdmin(chatId)) {
      sendMessage(chatId, message('command_set_admin_added_before'));
    }
    else {
      adminList.adminChatIdList.push(chatId);
      configStorageEngine.set(adminList);
      sendMessage(chatId, message('command_set_admin_success'));
    }
  }
});
