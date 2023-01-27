import {bot} from './bot.js';
import {logger} from '../config.js';

export async function sendMessage(chatId: string, message: string): Promise<void> {
  logger.logMethodArgs('sendMessage', {chatId, message});

  await bot.telegram.sendMessage(chatId, message);
}
