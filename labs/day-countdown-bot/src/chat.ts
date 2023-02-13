import {logger} from './config.js';
import {chatStorageEngine} from './lib/storage.js';

import type {Chat, ChatDetail} from './type.js';

/**
 * Make disabled property in User true!
 */
export function unsubscribeChat(chatId: number): void {
  logger.logMethodArgs('deleteUser', {chatId});
  if (!isChatExists(chatId)) return;
  const chat = chatStorageEngine.get(chatId.toString()) as Chat;
  chat.isSubscribe = false;
  chatStorageEngine.set(chat);
}

export function isSubscribed(chatId: number): boolean {
  const isSubscribe = chatStorageEngine.get(chatId.toString())?.isSubscribe === true;
  logger.logMethodArgs('isSubscribed', {chatId, isSubscribe});
  return isSubscribe;
}

export function subscribeChat(chatId: number): void {
  logger.logMethodArgs('subscribe', {chatId});
  const chat = chatStorageEngine.get(chatId.toString()) as Chat;
  chat.isSubscribe = true;
  chatStorageEngine.set(chat);
}

export function addChat(chat: ChatDetail): void {
  logger.logMethodArgs('addChat', {chat});
  chatStorageEngine.set({
    id: chat.chatId.toString(),
    chatDetail: chat,
  });
}

export function isChatExists(chatId: number): boolean {
  const chatExists = chatStorageEngine.has(chatId.toString());
  logger.logMethodArgs('isChatExists', {chatId, isChatExists: chatExists});
  return chatExists;
}

export function setLastNotifyMessageId(chatId: number, messageId: number): void {
  logger.logMethodArgs('setLastNotifyMessageId', {chatId, messageId});
  const user = chatStorageEngine.get(chatId.toString()) as Chat;
  user.lastNotifyMessageId = messageId;
  chatStorageEngine.set(user);
}
