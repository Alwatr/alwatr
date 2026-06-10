import {existsSync} from 'node:fs';
import {mkdir, open} from 'node:fs/promises';
import {dirname} from 'node:path';

import {logger} from './common.js';

/**
 * Make empty file.
 *
 * @param path - file path
 *
 * @example
 * ```ts
 * await makeFile('./dir/file.txt');
 * ```
 */
export async function makeEmptyFile(path: string): Promise<void> {
  DEV_MODE && logger.logMethodArgs?.('makeEmptyFile', '...' + path.slice(-32));
  try {
    const pathExists = existsSync(path);
    if (!pathExists) {
      const dir = dirname(path);
      if (!existsSync(dir)) {
        await mkdir(dir, {recursive: true});
      }
    }
    await (await open(path, 'w')).close();
  } catch (err) {
    logger.error('makeEmptyFile', 'make_file_failed', {path}, err);
    throw new Error('make_file_failed', {cause: (err as Error).cause});
  }
}
