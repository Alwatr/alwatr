import {TelegramError} from 'telegraf';

import {AlwatrTelegrafComposer, AlwatrTelegrafContext, AlwatrTelegram} from './telegram.js';
import {isAdmin} from '../admin.js';
import {deleteChat} from '../chat.js';
import {config} from '../config.js';

export const bot = new AlwatrTelegram<AlwatrTelegrafContext>(config.telegramBot.token, {
  contextType: AlwatrTelegrafContext,
});

export const botAdminComposer = new AlwatrTelegrafComposer(handleAdminSendMessageError, isAdmin);
export const chatAdminComposer = new AlwatrTelegrafComposer(handleSendMessageError, isGroupAdmin);
export const userComposer = new AlwatrTelegrafComposer(deleteChat);

bot.use(botAdminComposer);
bot.use(chatAdminComposer);
bot.use(userComposer);

async function isGroupAdmin(userId: number, chatId: number): Promise<boolean> {
  if (await bot.isGroup(chatId) && !await bot.isChatAdmin(chatId, userId)) return false;
  return true;
}

export function handleSendMessageError(chatId: number, err: TelegramError): void {
  if (err.code === 403) {
    deleteChat(chatId);
  }
}

export function handleAdminSendMessageError(chatId: number, err: TelegramError): void {
  if (err.code === 403) {
    deleteChat(chatId);
  }
}
