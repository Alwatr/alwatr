import {isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {userStorageEngine} from '../lib/storage.js';

import type {User} from '../type.js';

bot.command('notify', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/notify', {chatId});

  if (!isAdmin(chatId)) return;

  const messageText = ctx.message.text.replace('/notify', '');
  if (messageText === '') {
    await sendMessage(chatId, message('command_notify_empty_message'));
    return;
  }

  for (const chat of userStorageEngine.allObject()) {
    const message = await sendMessage(chat.id, messageText);

    const user = userStorageEngine.get(chat.id) as User;
    user.lastNotifyMessageId = message.message_id;
    userStorageEngine.set(user);
  }


  await sendMessage(chatId, message('command_notify_success'));
});
