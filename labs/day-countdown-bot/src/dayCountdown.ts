import {type TelegramError} from 'telegraf';
import {Message} from 'telegraf/types';

import {logger} from './config.js';
import {message} from './director/l18e-loader.js';
import {bot} from './lib/bot.js';
import {dateDistance, nime} from './lib/calender.js';
import {sendMessage} from './lib/send-message.js';
import {storageEngine} from './lib/storage.js';

export async function sendDayCountDownToAllChat(): Promise<void> {
  logger.logMethod('sendDayCountDownToAllChat');
  const dayToLeft = dateDistance(nime.valueOf());
  for (const chat of storageEngine.allObject()) {
    if (chat.lastDayCountdownSent !== dayToLeft) {
      await sendDayCountDown(chat.id, dayToLeft);
    }
  }
}

export async function sendDayCountDown(chatId: string, dayToLeft?: number): Promise<void> {
  logger.logMethod('sendDayCountDown');

  // cache able dateDistance!
  if (dayToLeft == null) {
    dayToLeft = dateDistance(nime.valueOf());
  }

  // 1. send message
  let response;
  try {
    response = await sendDayCountDownMessage(chatId, dayToLeft);
  }
  catch (err) {
    const _err = err as TelegramError;
    if (_err.code === 403) {
      storageEngine.delete(chatId);
    }
    else {
      logger.error('sendDayCountDown', _err.message, {_err});
    }
    return;
  }

  const user = storageEngine.get(chatId);
  storageEngine.set({
    id: chatId,
    lastBotMessageId: response.message_id,
    lastDayCountdownSent: dayToLeft,
  });

  // 2. unpin last pinned message
  if (user != null) {
    try {
      await bot.telegram.unpinChatMessage(chatId, user.lastBotMessageId);
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
    await bot.telegram.pinChatMessage(chatId, response.message_id);
  }
  catch (err) {
    const _err = err as TelegramError;
    if (_err.code !== 400) {
      logger.error('notify', _err.message, {_err});
    }
  }
}

export function sendDayCountDownMessage(chatId: string, dayToLeft: number): Promise<Message> {
  logger.logMethod('sendDayCountDownMessage');
  return sendMessage(chatId, message('day_countdown').replace('__day_to_left__', dayToLeft.toString()), {
    parse_mode: 'MarkdownV2',
    reply_markup: {inline_keyboard: [[{
      text: message('button_day_countdown').replace('__day_to_left__', dayToLeft.toString()),
      callback_data: 'dayCountdown',
    }]]},
  });
}
