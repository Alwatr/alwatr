import {addAdmin, isAdmin} from '../admin.js';
import {config, logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';

bot.command('setAdmin', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  const token = ctx.message.text.split(' ')[1];
  logger.logMethodArgs('command/setAdmin', {chatId, token});

  if (token == config.telegramBot.adminToken) {
    if (isAdmin(chatId)) {
      try {
        await sendMessage(chatId, message('command_set_admin_added_before'));
      }
      catch (err) {
        logger.error('command/setAdmin', 'send_message_failed', {err});
        return;
      }
    }
    else {
      addAdmin(chatId);
      try {
        await sendMessage(chatId, message('command_set_admin_success'));
      }
      catch (err) {
        logger.error('command/setAdmin', 'send_message_failed', {err});
        return;
      }
    }
  }
});
