import {type TelegramError} from 'telegraf';
import {Message} from 'telegraf/types';

import {logger} from './config.js';
import {message} from './director/l18e-loader.js';
import {bot} from './lib/bot.js';
import {dateDistance, nime} from './lib/calender.js';
import {sendMessage} from './lib/send-message.js';
import {chatStorageEngine} from './lib/storage.js';
import {deleteUser} from './user.js';

export async function sendDayCountdownToAllChat(): Promise<void> {
  logger.logMethod('sendDayCountdownToAllChat');
  const dayToLeft = dateDistance(nime.valueOf());
  for (const chat of chatStorageEngine.allObject()) {
    if (chat.lastDayCountdownSent !== dayToLeft) {
      try {
        await sendDayCountDown(+chat.id, dayToLeft);
      }
      catch (err) {
        const _err = err as TelegramError;
        if (_err.code === 403) {
          deleteUser(+chat.id);
          logger.error('sendDayCountdownToAllChat', _err.message, {_err});
        }
      }
    }
  }
}

export async function sendDayCountDown(chatId: number, dayToLeft?: number): Promise<void> {
  logger.logMethod('sendDayCountDown');

  // cache-able dateDistance!
  if (dayToLeft == null) {
    dayToLeft = dateDistance(nime.valueOf());
  }

  // 1. send message
  const response = await sendDayCountdownMessage(chatId, dayToLeft);

  const user = chatStorageEngine.get(chatId.toString());
  chatStorageEngine.set({
    id: chatId.toString(),
    lastBotMessageId: response.message_id,
    lastDayCountdownSent: dayToLeft,
  });

  // 2. unpin last pinned message
  if (user?.lastBotMessageId != null) {
    try {
      await bot.unpinChatMessage(chatId, user.lastBotMessageId);
    }
    catch (err) {
      const _err = err as TelegramError;
      if (_err.code !== 400) {
        logger.error('sendDayCountDown', _err.message, {_err});
      }
    }
  }

  // 3. pin new message
  try {
    await bot.pinChatMessage(chatId, response.message_id);
  }
  catch (err) {
    const _err = err as TelegramError;
    if (_err.code !== 400) {
      logger.error('notify', _err.message, {_err});
    }
  }
}

export function sendDayCountdownMessage(chatId: number, dayToLeft: number): Promise<Message> {
  logger.logMethod('sendDayCountdownMessage');
  return sendMessage(chatId, message('day_countdown').replace('__day_to_left__', dayToLeft.toString()), {
    parse_mode: 'MarkdownV2',

    reply_markup: {inline_keyboard: [[{
      text: message('button_day_countdown').replace('__day_to_left__', dayToLeft.toString()),
      callback_data: 'dayCountdown',
    }]]},
  });
}
