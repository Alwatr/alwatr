import {deleteAdmin, isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';

bot.command('deleteNotify', async (ctx) => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('command/deleteNotify', {chatId: ctx.chatId});

  ctx.isAdminCallback = isAdmin;
  ctx.onSendMessageForbidden = deleteAdmin;
  if (!ctx.isAdmin) return;

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

  await ctx.replyToChat(message('command_delete_notify_success'));
});
