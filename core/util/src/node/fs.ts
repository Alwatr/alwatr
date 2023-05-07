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

