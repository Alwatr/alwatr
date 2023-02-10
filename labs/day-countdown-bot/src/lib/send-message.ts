import {bot} from './bot.js';
import {logger} from '../config.js';

import type {Message, Convenience} from 'telegraf/types';

export async function sendMessage(
    chatId: number,
    message: string,
    options?: Convenience.ExtraReplyMessage,
): Promise<Message> {
  logger.logMethodArgs('sendMessage', {chatId, message});
  return bot.telegram.sendMessage(chatId, message, options);
}
