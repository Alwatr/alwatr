import {Chat} from '@grammyjs/types';

import {logger} from '../config.js';
import {chatStorageClient} from '../lib/storage.js';

import type {ChatDetail, DayCountdownChat} from '../type.js';
import type {MaybePromise} from '@alwatr/type';

export async function isSubscribed(chatId: string | number): Promise<boolean> {
  const chat = await chatStorageClient.get<DayCountdownChat>(chatId + '');
  return chat != null && chat.isSubscribed === true;
}

export async function toggleSubscribe(chatId: number, messageThreadId?: number): Promise<boolean | null> {
  const chat = await chatStorageClient.get<DayCountdownChat>(chatId + '');
  logger.logMethodArgs?.('toggleSubscribe', {chat});
  if (chat == null) return null;

  chat.isSubscribed = !chat.isSubscribed;
  chat.chatDetail.messageThreadId = messageThreadId;
  chatStorageClient.set<DayCountdownChat>(chat);
  return chat.isSubscribed;
}

export function addChat(chat: Chat, messageThreadId?: number): ChatDetail | null {
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
      messageThreadId,
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

  chatStorageClient.set<DayCountdownChat>({
    chatDetail: chatDetail as ChatDetail,
    id: chat.id + '',
    conversationRecord: {},
  });

  return chatDetail;
}

export async function actionAllChat(action: (chat: DayCountdownChat) => MaybePromise<void>): Promise<void> {
  const chatList = (await chatStorageClient.getStorage()).data;
  for (const chat in chatList) {
    if (!Object.prototype.hasOwnProperty.call(chatList, chat)) continue;
    await action(chatList[chat]);
  }
}
