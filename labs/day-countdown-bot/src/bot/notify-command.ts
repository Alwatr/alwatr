import {message} from '../director/l18e-loader.js';
import {botAdminComposer, bot} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';
import {deleteUser, setLastNotifyMessageId} from '../user.js';

botAdminComposer.command('notify', async (ctx) => {
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
        deleteUser,
    );
    if (response == null) continue;
    setLastNotifyMessageId(+chat.id, response.message_id);
  }

  ctx.replyToChat(message('command_notify_success'));
});
