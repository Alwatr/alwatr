import {message} from '../director/l18e-loader.js';
import {adminComposer, bot} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';

adminComposer.command('deleteNotify', async (ctx) => {
  if (ctx.chatId == null) return;

  for (const chat of chatStorageEngine.allObject()) {
    const lastNotifyMessageId = chat.lastNotifyMessageId;
    if (lastNotifyMessageId == null) continue;

    try {
      await bot.deleteMessage(chat.id, lastNotifyMessageId);
      delete chat.lastNotifyMessageId;
    }
    catch {
      // no matter now!
      continue;
    }
  }

  await ctx.replyToChat(message('command_delete_notify_success'));
});
