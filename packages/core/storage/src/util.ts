import {existsSync, promises as fs} from 'fs';
import {resolve, dirname} from 'path';

import type {JSON} from './type.js';

// @TODO: add debug log

/**
 * Enhanced read json file.
 * @example
 * const fileContent = await readJsonFile('./file.json');
 */
export async function readJsonFile<T extends JSON>(path: string): Promise<T> {
  // Check the path is exist
  path = resolve(path);

  if (!existsSync(path)) {
    throw new Error('path_not_found');
  }

  let fileContent;
  try {
    fileContent = await fs.readFile(path, {encoding: 'utf-8'});
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
 * await writeJsonFile('./file.json', { a:1, b:2, c:3 });
 */
export async function writeJsonFile<T extends JSON>(path: string, dataObject: T): Promise<void> {
  // Check the path is exist
  try {
    path = resolve(path);
    if (!existsSync(path)) {
      await fs.mkdir(dirname(path), {recursive: true});
    }
  } catch (err) {
    throw new Error('make_dir_failed');
  }

  let jsonContent;
  try {
    jsonContent = JSON.stringify(dataObject);
  } catch (err) {
    throw new Error('stringify_failed');
  }

  try {
    await fs.writeFile(path, jsonContent, {encoding: 'utf-8', flag: 'w'});
  } catch (err) {
    throw new Error('write_file_failed');
  }
}
