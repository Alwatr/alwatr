import {type TelegramError} from 'telegraf';
import {Message} from 'telegraf/types';

import {unsubscribeChat} from './chat.js';
import {logger} from './config.js';
import {message} from './director/l18e-loader.js';
import {bot, handleSendMessageError} from './lib/bot.js';
import {dateDistance, nime} from './lib/calender.js';
import {chatStorageEngine} from './lib/storage.js';
import {Chat} from './type.js';

export async function sendDayCountdownToAllChat(): Promise<void> {
  logger.logMethod('sendDayCountdownToAllChat');
  const dayToLeft = dateDistance(nime.valueOf());
  for (const chat of chatStorageEngine.allObject()) {
    if (chat.isSubscribe && chat.lastDayCountdownSent !== dayToLeft) {
      try {
        await sendDayCountDown(+chat.id, dayToLeft);
      }
      catch (err) {
        const _err = err as TelegramError;
        if (_err.code === 403) {
          unsubscribeChat(+chat.id);
        }
        logger.error('sendDayCountdownToAllChat', _err.message);
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
  if (response == null) return;

  const chat = chatStorageEngine.get(chatId.toString()) as Chat;
  const lastBotMessageId = chat.lastBotMessageId;

  chat.lastBotMessageId = response.message_id;
  chat.lastDayCountdownSent = dayToLeft;
  chatStorageEngine.set(chat);

  // 2. unpin last pinned message
  if (lastBotMessageId != null) {
    try {
      await bot.unpinChatMessage(chatId, lastBotMessageId);
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
      logger.error('sendDayCountDown', _err.message, {_err});
    }
  }
}

export async function sendDayCountdownMessage(chatId: number, dayToLeft: number): Promise<Message | null> {
  logger.logMethod('sendDayCountdownMessage');
  return await bot.sendMessage(chatId, message('day_countdown').replace('${dayToLeft}', dayToLeft.toString()), {
    reply_markup: {inline_keyboard: [[{
      text: message('button_day_countdown').replace('${dayToLeft}', dayToLeft.toString()),
      callback_data: 'dayCountdown',
    }]]},
  }, handleSendMessageError);
}
