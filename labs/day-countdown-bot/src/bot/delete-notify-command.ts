import {isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {chatStorageEngine} from '../lib/storage.js';

bot.command('deleteNotify', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/deleteNotify', {chatId});

  if (!isAdmin(chatId)) return;

  for (const chat of chatStorageEngine.allObject()) {
    const lastNotifyMessageId = chat.lastNotifyMessageId;
    if (lastNotifyMessageId == null) continue;
    try {
      await bot.telegram.deleteMessage(chat.id, lastNotifyMessageId);
      delete chat.lastNotifyMessageId;
    }
    catch {
      // no matter now!
      continue;
    }
  }

  try {
    await sendMessage(chatId, message('command_delete_notify_success'));
  }
  catch (err) {
    logger.error('command/deleteNotify', 'send_message_failed', {err});
    return;
  }
});
