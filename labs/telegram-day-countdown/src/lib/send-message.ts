import {bot} from './bot.js';
import {logger} from '../config.js';

import type {Message} from 'telegraf/types';

export async function sendMessage(chatId: string, message: string): Promise<Message> {
  logger.logMethodArgs('sendMessage', {chatId, message});

  return bot.telegram.sendMessage(chatId, message);
}
