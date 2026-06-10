import type {Awaitable, JsonValue} from '@alwatr/type-helper';
import {logger} from './common.js';
import {parseJson} from './json.js';
import {readFile, readFileSync} from './read-file.js';

/**
 * Enhanced read json file (async).
 *
 * @param path - file path
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = await readJson('./file.json');
 * ```
 */
export function readJson<T extends JsonValue>(path: string): Promise<T>;
/**
 * Enhanced read json file (sync).
 *
 * @param path - file path
 * @param sync - sync mode
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = readJson('./file.json', true);
 * ```
 */
export function readJson<T extends JsonValue>(path: string, sync: true): T;
/**
 * Enhanced read json file.
 *
 * @param path - file path
 * @param sync - sync mode
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = await readJson('./file.json', sync);
 * ```
 */
export function readJson<T extends JsonValue>(path: string, sync: boolean): Awaitable<T>;
/**
 * Enhanced read json file.
 *
 * @param path - file path
 * @param sync - sync mode
 * @returns json object
 * @example
 * ```typescript
 * const fileContent = await readJson('./file.json');
 * ```
 */
export function readJson<T extends JsonValue>(path: string, sync = false): Awaitable<T> {
  DEV_MODE && logger.logMethodArgs?.('readJson', {path: path.slice(-32), sync});
  if (sync === true) {
    return parseJson<T>(readFileSync(path));
  } else {
    return readFile(path).then((content) => parseJson<T>(content));
  }
}
