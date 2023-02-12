import {message} from '../director/l18e-loader.js';
import {botAdminComposer, bot} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';

botAdminComposer.command('deleteNotify', async (ctx) => {
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
