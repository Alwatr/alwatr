import {deleteAdmin} from '../admin.js';
import {message} from '../director/l18e-loader.js';
import {adminComposer, bot} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';
import {setLastNotifyMessageId} from '../user.js';

adminComposer.command('notify', async (ctx) => {
  const messageText = ctx.commandArgs;
  if (messageText == null) {
    await ctx.replyToChat(message('command_notify_empty_message'));
    return;
  }

  for (const chat of chatStorageEngine.allObject()) {
    const response = await bot.sendMessage(
        chat.id,
        messageText,
        undefined,
        deleteAdmin as (chatId: string | number) => void,
    );
    if (response == null) return;
    setLastNotifyMessageId(+chat.id, response.message_id);
  }

  ctx.replyToChat(message('command_notify_success'));
});
