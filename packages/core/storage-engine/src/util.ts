import {existsSync, mkdirSync, writeFileSync, renameSync, readFileSync} from 'node:fs';
import {dirname} from 'node:path';

// TODO: add debug log

/**
 * Enhanced read json file.
 * @example
 * const fileContent = readJsonFile('./file.json');
 */
export function readJsonFile<T>(path: string): T | null {
  if (!existsSync(path)) {
    return null;
  }

  const timeKey = path.substring(path.lastIndexOf('/') + 1);

  let fileContent: string;
  try {
    console.time('AlwatrStorageEngine Read ' + timeKey);
    fileContent = readFileSync(path, {encoding: 'utf-8'});
    console.timeEnd('AlwatrStorageEngine Read ' + timeKey);
  }
  catch (err) {
    throw new Error('read_file_failed');
  }

  try {
    console.time('AlwatrStorageEngine Parse ' + timeKey);
    const data = JSON.parse(fileContent) as T;
    console.timeEnd('AlwatrStorageEngine Parse ' + timeKey);
    return data;
  }
  catch (err) {
    throw new Error('invalid_json');
  }
}

/**
 * Enhanced write json file.
 * @example
 * writeJsonFile('./file.json', { a:1, b:2, c:3 });
 */
export function writeJsonFile(path: string, data: unknown, space?: string | number | undefined): void {
  const timeKey = path.substring(path.lastIndexOf('/') + 1);

  let jsonContent;
  try {
    console.time('AlwatrStorageEngine Stringify ' + timeKey);
    jsonContent = JSON.stringify(data, null, space);
    console.timeEnd('AlwatrStorageEngine Stringify ' + timeKey);
  }
  catch (err) {
    throw new Error('stringify_failed');
  }

  if (existsSync(path)) {
    try {
      renameSync(path, path + '.bk');
    }
    catch (err) {
      // @TODO: handle in forceSave and log with logger
      console.error('cannot rename file!');
    }
  }
  else {
    try {
      mkdirSync(dirname(path), {recursive: true});
    }
    catch (err) {
      throw new Error('make_dir_failed');
    }
  }

  try {
    console.time('AlwatrStorageEngine Write ' + timeKey);
    writeFileSync(path, jsonContent, {encoding: 'utf-8', flag: 'w'});
    console.timeEnd('AlwatrStorageEngine Write ' + timeKey);
  }
  catch (err) {
    throw new Error('write_file_failed');
  }
}
