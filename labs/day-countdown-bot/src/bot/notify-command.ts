import {deleteAdmin, isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';
import {setLastNotifyMessageId} from '../user.js';

bot.command('notify', async (ctx) => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('command/notify', {chatId: ctx.chatId});

  ctx.isAdminCallback = isAdmin;
  ctx.onSendMessageForbidden = deleteAdmin;
  if (!ctx.isAdmin) return;

  const messageText = ctx.commandArgs;
  if (messageText == null) {
    await ctx.replyToChat(message('command_notify_empty_message'));
    return;
  }

  for (const chat of chatStorageEngine.allObject()) {
    const response = await ctx.sendMessageToChat(messageText);
    if (response == null) return;
    setLastNotifyMessageId(+chat.id, response.message_id);
  }

  ctx.replyToChat(message('command_notify_success'));
});
