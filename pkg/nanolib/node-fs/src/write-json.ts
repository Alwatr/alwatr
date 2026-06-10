import type {Awaitable, JsonValue} from '@alwatr/type-helper';
import {flatString} from '@alwatr/flat-string';

import {logger} from './common.js';
import {jsonStringify} from './json.js';
import {writeFile, writeFileSync} from './write-file.js';

/**
 * Enhanced write json file (Asynchronous).
 *
 * @param path - file path
 * @param data - json object
 * @example
 * ```typescript
 * await writeJsonFile('./file.json', { a:1, b:2, c:3 });
 * ```
 */
export function writeJson<T extends JsonValue>(path: string, data: T, sync?: false): Promise<void>;
/**
 * Enhanced write json file (Synchronous).
 *
 * @param path - file path
 * @param data - json object
 * @param sync - sync mode
 * @example
 * ```typescript
 * writeJsonFile('./file.json', { a:1, b:2, c:3 }, true);
 * ```
 */
export function writeJson<T extends JsonValue>(path: string, data: T, sync: true): void;
/**
 * Enhanced write json file.
 *
 * @param path - file path
 * @param data - json object
 * @param sync - sync mode
 * @example
 * ```typescript
 * await writeJsonFile('./file.json', { a:1, b:2, c:3 }, sync);
 * ```
 */
export function writeJson<T extends JsonValue>(path: string, data: T, sync: boolean): Awaitable<void>;
/**
 * Enhanced write json file.
 *
 * @param path - file path
 * @param data - json object
 * @param sync - sync mode
 * @example
 * ```typescript
 * await writeJsonFile('./file.json', { a:1, b:2, c:3 });
 * ```
 */
export function writeJson<T extends JsonValue>(path: string, data: T, sync = false): Awaitable<void> {
  DEV_MODE && logger.logMethodArgs?.('writeJson', '...' + path.slice(-32));
  const content = flatString(jsonStringify(data));
  return sync === true ? writeFileSync(path, content) : writeFile(path, content);
}
