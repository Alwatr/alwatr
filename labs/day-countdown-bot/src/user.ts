import {logger} from './config.js';
import {chatStorageEngine} from './lib/storage.js';

/**
 * Make disabled property in User true!
 */
export function deleteUser(chatId: string): void {
  logger.logMethodArgs('deleteUser', {chatId});
  chatStorageEngine.delete(chatId);
}
