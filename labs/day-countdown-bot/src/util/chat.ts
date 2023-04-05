import {Chat} from '@grammyjs/types';

import {logger} from '../config.js';
import {botStorage} from '../lib/bot.js';

import type {ChatDetail, DayCountdownChat} from '../type.js';

export async function isSubscribed(chatId: string | number): Promise<boolean> {
  const chat = await botStorage.get<DayCountdownChat>(chatId);
  return chat != null && chat.isSubscribe === true;
}

export async function toggleSubscribe(chatId: string | number): Promise<boolean | null> {
  const chat = await botStorage.get<DayCountdownChat>(chatId);
  logger.logMethodArgs('toggleSubscribe', {chat});
  if (chat == null) return null;

  chat.isSubscribe = !chat.isSubscribe;
  botStorage.set<DayCountdownChat>(chat);
  return chat.isSubscribe;
}

export function addChat(chat: Chat): ChatDetail | null {
  let chatDetail: ChatDetail | null = null;

  if (chat.type === 'group' || chat.type === 'supergroup') {
    chatDetail = {
      type: chat.type,
      chatId: chat.id,
      title: chat.title,
    };
  }
  else if (chat.type === 'private') {
    chatDetail = {
      type: chat.type,
      chatId: chat.id,
      username: chat.username,
    };
  }
  else {
    return null;
  }

  botStorage.set<DayCountdownChat>({
    chatDetail: chatDetail as ChatDetail,
    id: chat.id + '',
    conversationRecord: {},
  });

  return chatDetail;
}

export async function actionAllChat(action: (chatId: string) => void): Promise<void> {
  for await (const chat of botStorage.forEach()) {
    action(chat.id);
  }
}
