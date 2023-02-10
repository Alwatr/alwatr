import {isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {chatStorageEngine} from '../lib/storage.js';
import {deleteUser} from '../user.js';

import type {User} from '../type.js';
import type {TelegramError} from 'telegraf';

bot.command('notify', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/notify', {chatId});

  if (!isAdmin(chatId)) return;

  const messageText = ctx.message.text.replace('/notify', '').trim();
  if (messageText === '') {
    try {
      await sendMessage(chatId, message('command_notify_empty_message'));
    }
    catch (err) {
      logger.error('command/notify', 'send_message_failed', {err});
    }
    return;
  }

  for (const chat of chatStorageEngine.allObject()) {
    let message;
    try {
      message = await sendMessage(chat.id, messageText);
    }
    catch (err) {
      const _err = err as TelegramError;
      if (_err.code === 403) {
        deleteUser(chatId);
      }
      logger.error('command/notify', 'send_message_failed', {err});
      return;
    }

    const user = chatStorageEngine.get(chat.id) as User;
    user.lastNotifyMessageId = message.message_id;
    chatStorageEngine.set(user);
  }

  try {
    await sendMessage(chatId, message('command_notify_success'));
  }
  catch (err) {
    logger.error('command/notify', 'send_message_failed', {err});
  }
});
