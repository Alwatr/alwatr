import {bot} from '../lib/bot.js';
import {logger} from '../lib/config.js';
import {storage} from '../lib/storage.js';

export async function sendMessage(to: string, message: string): Promise<void> {
  logger.logMethodArgs('sendMessage', {
    to: to,
    message: message,
  });

  const target = storage.get(to);
  if (target === null) {
    logger.error('sendMessage', 'null_target', 'Target is null');
    return;
  }

  for (const chatId of target.memberList) {
    bot.telegram.sendMessage(chatId, message);
  }
}
