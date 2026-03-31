import {readFileSync as readFileSync_} from 'node:fs';
import {readFile as readFile_} from 'node:fs/promises';

import {flatString} from '@alwatr/flat-string';

import {asyncQueue, logger} from './common.js';

/**
 * Enhanced read File (Synchronous).
 *
 * @param path - file path
 * @returns file content
 * @example
 * ```typescript
 * const fileContent = readFileSync('./file.txt', sync);
 * ```
 */
export function readFileSync(path: string): string {
  logger.logMethodArgs?.('readFileSync', '...' + path.slice(-32));
  // if (!existsSync(path)) throw new Error('file_not_found');
  try {
    return flatString(readFileSync_(path, {encoding: 'utf-8', flag: 'r'}));
  }
  catch (err) {
    logger.error('readFileSync', 'read_file_failed', {path}, err);
    throw new Error('read_file_failed', {cause: (err as Error).cause});
  }
}

/**
 * Enhanced read File (Asynchronous).
 *
 * - If writing queue is running for target path, it will wait for it to finish.
 *
 * @param path - file path
 * @returns file content
 * @example
 * ```typescript
 * const fileContent = await readFile('./file.txt', sync);
 * ```
 */
export function readFile(path: string): Promise<string> {
  logger.logMethodArgs?.('readFile', '...' + path.slice(-32));
  // if (!existsSync(path)) throw new Error('file_not_found');
  return asyncQueue.push(path, async () => {
    try {
      return flatString(await readFile_(path, {encoding: 'utf-8', flag: 'r'}));
    }
    catch (err) {
      logger.error('readFile', 'read_file_failed', {path}, err);
      throw new Error('read_file_failed', {cause: (err as Error).cause});
    }
  });
}
