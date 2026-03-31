import {writeFileSync as writeFileSync_, existsSync, mkdirSync, renameSync} from 'node:fs';
import {mkdir, rename, writeFile as writeFile_} from 'node:fs/promises';
import {dirname} from 'node:path';

import {asyncQueue, logger} from './common.js';

/**
 * Enhanced write file (Synchronous).
 *
 * - If directory not exists, create it recursively.
 * - Write file to `path.tmp` before write success.
 * - If file exists, renamed (keep) to `path.bak`.
 * - If write failed, original file will not be changed.
 *
 * @param path - file path
 * @param content - file content
 * @example
 * ```typescript
 * writeFileSync('./file.txt', 'Hello World!');
 * ```
 */
export function writeFileSync(path: string, content: Buffer | string): void {
  logger.logMethodArgs?.('writeFileSync', '...' + path.slice(-32));
  try {
    const pathExists = existsSync(path);
    if (!pathExists) {
      const dir = dirname(path);
      if (!existsSync(dir)) {
        mkdirSync(dir, {recursive: true});
      }
    }
    writeFileSync_(path + '.tmp', content, {encoding: 'utf-8', flag: 'w'});
    if (pathExists) {
      renameSync(path, path + '.bak');
    }
    renameSync(path + '.tmp', path);
    logger.logOther?.('writeFileSync success', '...' + path.slice(-32));
  }
  catch (err) {
    logger.error('writeFileSync', 'write_file_failed', {path}, err);
    throw new Error('write_file_failed', {cause: (err as Error).cause});
  }
}

/**
 * Enhanced write file (Asynchronous).
 *
 * - If directory not exists, create it recursively.
 * - Write file to `path.tmp` before write success.
 * - If file exists, renamed (keep) to `path.bak`.
 * - If write failed, original file will not be changed.
 *
 * @param path - file path
 * @param content - file content
 * @example
 * ```typescript
 * await writeFile('./file.txt', 'Hello World!');
 * ```
 */
export function writeFile(path: string, content: Buffer | string): Promise<void> {
  logger.logMethodArgs?.('writeFile', '...' + path.slice(-32));
  return asyncQueue.push(path, async () => {
    try {
      logger.logOther?.('writeFile start', '...' + path.slice(-32));
      const pathExists = existsSync(path);
      if (!pathExists) {
        const dir = dirname(path);
        if (!existsSync(dir)) {
          await mkdir(dir, {recursive: true});
        }
      }
      await writeFile_(path + '.tmp', content, {encoding: 'utf-8', flag: 'w'});
      if (pathExists) {
        await rename(path, path + '.bak');
      }
      await rename(path + '.tmp', path);
      logger.logOther?.('writeFile success', '...' + path.slice(-32));
    }
    catch (err) {
      logger.error('writeFile', 'write_file_failed', {path}, err);
      throw new Error('write_file_failed', {cause: (err as Error).cause});
    }
  });
}
