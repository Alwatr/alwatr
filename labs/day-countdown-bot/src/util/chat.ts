import {Chat} from '@grammyjs/types';

import {logger} from '../config.js';
import {chatStorageClient} from '../lib/storage.js';

import type {ChatDetail, DayCountdownChat} from '../type.js';
import type {MaybePromise} from '@alwatr/type';

export async function isSubscribed(chatId: string | number): Promise<boolean> {
  const chat = await chatStorageClient.get<DayCountdownChat>(chatId + '');

  const subscribed = chat != null && chat.isSubscribed === true && chat.isDeleted !== true;
  logger.logMethodArgs?.('isSubscribed', {chatId, subscribed});
  return subscribed;
}

export async function toggleSubscribe(chatId: number): Promise<boolean | null> {
  logger.logMethodArgs?.('toggleSubscribe', {chatId});
  const chat = await chatStorageClient.get<DayCountdownChat>(chatId + '');
  logger.logMethodArgs?.('toggleSubscribe', {chat});
  if (chat == null || chat.chatDetail == null) return null;

  chat.isSubscribed = !chat.isSubscribed;
  chatStorageClient.set<DayCountdownChat>(chat);
  return chat.isSubscribed;
}

export async function addChat(chat: Chat, messageThreadId?: number): Promise<ChatDetail | null> {
  logger.logMethodArgs?.('addChat', {chat, messageThreadId});
  let chatDetail: ChatDetail | null = null;

  if (chat.type === 'group') {
    chatDetail = {
      type: chat.type,
      chatId: chat.id,
      title: chat.title,
    };
  }
  else if (chat.type === 'supergroup') {
    chatDetail = {
      type: chat.type,
      chatId: chat.id,
      title: chat.title,
      messageThreadId: chat.is_forum ? messageThreadId : undefined,
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

  const chatPedarsag = await chatStorageClient.get<DayCountdownChat>(chat.id + '');
  await chatStorageClient.set<DayCountdownChat>({
    ...chatPedarsag,
    chatDetail: chatDetail as ChatDetail,
    id: chat.id + '',
    conversationRecord: {},
  });

  return chatDetail;
}

export async function deleteChat(chatId: string | number): Promise<void> {
  logger.logMethodArgs?.('deleteChat', {chatId});
  const chat = await chatStorageClient.get(chatId + '');
  if (chat == null) return;

  chat.isDeleted = true;
  await chatStorageClient.set(chat);
}

export async function actionAllChat(action: (chat: DayCountdownChat) => MaybePromise<void>): Promise<void> {
  logger.logMethod?.('actionAllChat');
  const chatList = (await chatStorageClient.getStorage()).data;
  for (const chatIndex in chatList) {
    if (!Object.prototype.hasOwnProperty.call(chatList, chatIndex) || chatList[chatIndex].isDeleted === true) continue;
    await action(chatList[chatIndex]);
  }
}

export async function checkDayCountdownSent(day: number, chatId: string | number): Promise<boolean> {
  const chat = await chatStorageClient.get(chatId + '');
  return chat?.lastDayCountdownSent?.includes(day) ?? false;
}

export async function setDayCountdownSent(day: number, chatId: string | number): Promise<void> {
  const chat = await chatStorageClient.get(chatId + '');
  if (chat == null) return;
  chat.lastDayCountdownSent ??= [];
  chat.lastDayCountdownSent.push(day);
  await chatStorageClient.set(chat);
}
