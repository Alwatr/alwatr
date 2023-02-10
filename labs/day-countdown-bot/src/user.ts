import {logger} from './config.js';
import {chatStorageEngine} from './lib/storage.js';

import type {User} from './type.js';

/**
 * Make disabled property in User true!
 */
export function deleteUser(chatId: string): void {
  logger.logMethodArgs('deleteUser', {chatId});
  chatStorageEngine.delete(chatId);
}

export function isSubscribed(chatId: string): boolean {
  logger.logMethodArgs('isSubscribed', {chatId});
  return chatStorageEngine.has(chatId);
}

export function setLastNotifyMessageId(chatId: string, messageId: number): void {
  logger.logMethodArgs('setLastNotifyMessageId', {chatId, messageId});
  const user = chatStorageEngine.get(chatId) as User;
  user.lastNotifyMessageId = messageId;
  chatStorageEngine.set(user);
}
