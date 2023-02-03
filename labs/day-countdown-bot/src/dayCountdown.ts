import {logger} from './config.js';
import {dateDistance, nime} from './lib/calender.js';
import {sendMessage} from './lib/send-message.js';
import {storageEngine} from './lib/storage.js';

import type {TelegramError} from 'telegraf';

export async function notify(): Promise<void> {
  const dayToLeft = dateDistance(nime.valueOf());
  for (const user of storageEngine.allObject()) {
    try {
      await sendMessage(user.id, `**${dayToLeft} روز مانده تا ولادت مهربان ترین پدر ♥️**`, {
        parse_mode: 'MarkdownV2',
        reply_markup: {inline_keyboard: [[{text: `${dayToLeft} روز تا نیمه‌شعبان`, callback_data: 'dayCountdown'}]]},
      });
    }
    catch (err) {
      const _err = err as TelegramError;
      if (_err.code === 403) {
        storageEngine.delete(user.id);
      }
      else {
        logger.error('notify', _err.message, {_err});
      }
    }
  }
}
