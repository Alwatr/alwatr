import {deleteAdmin, isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';

bot.command('deleteAdmin', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/deleteAdmin', {chatId});

  if (isAdmin(chatId)) {
    deleteAdmin(chatId);
    try {
      await sendMessage(chatId, message('command_delete_admin_success'));
    }
    catch (err) {
      logger.error('command/deleteAdmin', 'send_message_failed', {err});
    }
  }
});
