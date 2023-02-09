import {type TelegramError} from 'telegraf';
import {Message} from 'telegraf/types';

import {logger} from './config.js';
import {message} from './director/l18e-loader.js';
import {bot} from './lib/bot.js';
import {dateDistance, nime} from './lib/calender.js';
import {sendMessage} from './lib/send-message.js';
import {storageEngine} from './lib/storage.js';

export async function notify(): Promise<void> {
  const dayToLeft = dateDistance(nime.valueOf());
  for (const chat of storageEngine.allObject()) {
    // 1. send message
    let response;
    try {
      response = await sendDayCountDown(chat.id, dayToLeft);
    }
    catch (err) {
      const _err = err as TelegramError;
      if (_err.code === 403) {
        storageEngine.delete(chat.id);
      }
      else {
        logger.error('notify', _err.message, {_err});
      }
      continue;
    }

    const lastBotMessageId = storageEngine.get(chat.id)?.lastBotMessageId;
    storageEngine.set({
      id: chat.id,
      lastBotMessageId: response.message_id,
    });

    // 2. unpin last pinned message
    if (lastBotMessageId != null) {
      try {
        await bot.telegram.unpinChatMessage(chat.id, lastBotMessageId);
      }
      catch (err) {
        const _err = err as TelegramError;
        if (_err.code !== 400) {
          logger.error('notify', _err.message, {_err});
        }
      }
    }

    // 3. pin new message
    try {
      await bot.telegram.pinChatMessage(chat.id, response.message_id);
    }
    catch (err) {
      const _err = err as TelegramError;
      if (_err.code !== 400) {
        logger.error('notify', _err.message, {_err});
      }
    }
  }
}

export function sendDayCountDown(chatId: string, dayToLeft: number): Promise<Message> {
  return sendMessage(chatId, message('day_countdown').replace('__day_to_left__', dayToLeft.toString()), {
    parse_mode: 'MarkdownV2',
    reply_markup: {inline_keyboard: [[{
      text: message('button_day_countdown').replace('__day_to_left__', dayToLeft.toString()),
      callback_data: 'dayCountdown',
    }]]},
  });
}
