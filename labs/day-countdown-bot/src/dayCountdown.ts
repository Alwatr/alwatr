import {type TelegramError} from 'telegraf';

import {logger} from './config.js';
import {bot} from './lib/bot.js';
import {dateDistance, nime} from './lib/calender.js';
import {sendMessage} from './lib/send-message.js';
import {storageEngine} from './lib/storage.js';


export async function notify(): Promise<void> {
  const dayToLeft = dateDistance(nime.valueOf());
  for (const chat of storageEngine.allObject()) {
    try {
      const response = await sendMessage(chat.id, `**${dayToLeft} روز مانده تا ولادت مهربان ترین پدر ♥️**`, {
        parse_mode: 'MarkdownV2',
        reply_markup: {inline_keyboard: [[{text: `${dayToLeft} روز تا نیمه‌شعبان`, callback_data: 'dayCountdown'}]]},
      });

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
