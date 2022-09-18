import {existsSync, mkdirSync, readFileSync, writeFileSync, renameSync} from 'fs';
import {resolve, dirname} from 'node:path';

import type {JSON} from './type.js';

// @TODO: add debug log

/**
 * Enhanced read json file.
 * @example
 * const fileContent = readJsonFile('./file.json');
 */
export async function readJsonFile<T extends JSON>(path: string): Promise<T | null> {
  // Check the path is exist

  if (!existsSync(path)) {
    return null;
  }

  let fileContent;
  try {
    fileContent = readFileSync(path, {encoding: 'utf-8'});
  } catch (err) {
    throw new Error('read_file_failed');
  }

  try {
    return JSON.parse(fileContent) as T;
  } catch (err) {
    throw new Error('invalid_json');
  }
}

/**
 * Enhanced write json file.
 * @example
 * writeJsonFile('./file.json', { a:1, b:2, c:3 });
 */
export async function writeJsonFile<T extends JSON>(
    path: string,
    dataObject: T,
    space?: string | number | undefined,
): Promise<void> {
  // Check the path is exist
  try {
    path = resolve(path);
    if (!existsSync(path)) {
      mkdirSync(dirname(path), {recursive: true});
    }
  } catch (err) {
    throw new Error('make_dir_failed');
  }

  try {
    if (existsSync(path)) {
      renameSync(path, path + '.bk');
    }
  } catch (err) {
    // @TODO: handle in forceSave and log with logger
    console.error('cannot rename file!');
  }

  let jsonContent;
  try {
    jsonContent = JSON.stringify(dataObject, null, space);
  } catch (err) {
    throw new Error('stringify_failed');
  }

  try {
    writeFileSync(path, jsonContent, {encoding: 'utf-8', flag: 'w'});
  } catch (err) {
    throw new Error('write_file_failed');
  }
}
