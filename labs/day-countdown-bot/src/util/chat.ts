import {Chat} from '@grammyjs/types';

import {logger} from '../config.js';
import {chatStorageEngine} from '../lib/storage.js';

import type {ChatDetail} from '../type.js';

export function isSubscribed(chatId: string | number): boolean {
  const chat = chatStorageEngine.get(chatId + '');
  return chat != null && chat.isSubscribe === true;
}

export function toggleSubscribe(chatId: string | number): boolean | null {
  const chat = chatStorageEngine.get(chatId + '');
  logger.logMethodArgs('toggleSubscribe', {chat});
  if (chat == null) return null;

  chat.isSubscribe = !chat.isSubscribe;
  // TODO: check saved
  chatStorageEngine.set(chat);
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

  chatStorageEngine.set({
    chatDetail: chatDetail as ChatDetail,
    id: chat.id + '',
  });

  return chatDetail;
}
