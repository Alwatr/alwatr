import {existsSync, readFileSync, writeFileSync, renameSync, mkdirSync} from 'node:fs';
import {rename, mkdir, writeFile, readFile} from 'node:fs/promises';
import {dirname} from 'node:path';

import {logger} from './_logger.js';

/**
 * Enhanced read json file.
 * @example
 * const fileContent = readJsonFileSync('./file.json');
 */
export const readJsonFileSync = <T>(path: string): T | null => {
  logger.logMethodArgs?.('readJsonFileSync', path);

  if (!existsSync(path)) {
    return null;
  }

  const timeKey = path.substring(path.lastIndexOf('/') + 1);
  logger.time?.(`readJsonFileSync(${timeKey})`);

  let fileContent: string;
  try {
    fileContent = readFileSync(path, {encoding: 'utf-8', flag: 'r'});
  }
  catch (err) {
    logger.error('readJsonFileSync', 'read_file_failed', err);
    throw new Error('read_file_failed');
  }

  let data;
  try {
    data = JSON.parse(fileContent) as T;
  }
  catch (err) {
    logger.error('readJsonFileSync', 'invalid_json', err);
    throw new Error('invalid_json');
  }

  console.timeEnd(`readJsonFileSync(${timeKey})`);
  return data;
};

/**
 * Enhanced read json file.
 * @example
 * const fileContent = await readJsonFile('./file.json');
 */
export const readJsonFile = async <T>(path: string): Promise<T | null> => {
  logger.logMethodArgs?.('readJsonFileSync', path);

  if (!existsSync(path)) {
    // existsSync is much faster than access.
    return null;
  }

  const timeKey = path.substring(path.lastIndexOf('/') + 1);
  logger.time?.(`readJsonFile(${timeKey})`);

  let fileContent: string;
  try {
    fileContent = await readFile(path, {encoding: 'utf-8', flag: 'r'});
  }
  catch (err) {
    logger.error('readJsonFile', 'read_file_failed', err);
    throw new Error('read_file_failed');
  }

  let data;
  try {
    data = JSON.parse(fileContent) as T;
  }
  catch (err) {
    logger.error('readJsonFile', 'invalid_json', err);
    throw new Error('invalid_json');
  }

  console.timeEnd(`readJsonFile(${timeKey})`);
  return data;
};

/**
 * Enhanced write json file.
 * @example
 * writeJsonFileSync('./file.json', { a:1, b:2, c:3 });
 */
export const writeJsonFileSync = (path: string, data: unknown, space?: string | number): void => {
  logger.logMethodArgs?.('writeJsonFileSync', path);

  const timeKey = path.substring(path.lastIndexOf('/') + 1);
  logger.time?.(`writeJsonFileSync(${timeKey})`);

  let jsonContent;
  try {
    jsonContent = JSON.stringify(data, null, space);
  }
  catch (err) {
    logger.error('writeJsonFileSync', 'stringify_failed', err);
    throw new Error('stringify_failed');
  }

  if (existsSync(path)) {
    try {
      renameSync(path, path + '.bk');
    }
    catch (err) {
      logger.error('writeJsonFileSync', 'rename_failed', err);
    }
  }
  else {
    try {
      mkdirSync(dirname(path), {recursive: true});
    }
    catch (err) {
      logger.error('writeJsonFileSync', 'make_dir_failed', err);
      throw new Error('make_dir_failed');
    }
  }

  try {
    writeFileSync(path, jsonContent, {encoding: 'utf-8', flag: 'w'});
  }
  catch (err) {
    logger.error('writeJsonFileSync', 'write_file_failed', err);
    throw new Error('write_file_failed');
  }

  logger.timeEnd?.(`writeJsonFileSync(${timeKey})`);
};

