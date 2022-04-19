import {existsSync, promises as fs} from 'fs';
import {resolve, dirname} from 'path';

/**
 * Enhanced read json file.
 * @example
 * const fileContent = await readJsonFile('./file.json');
 */
export async function readJsonFile<T extends Record<string | number, unknown>>(
    path: string,
): Promise<T> {
  // Check the path is exist
  path = resolve(path);
  if (!existsSync(path)) {
    throw new Error('File_not_exist');
  }

  // Read file
  const fileContent = await fs.readFile(path, {encoding: 'utf-8'});
  try {
    return JSON.parse(fileContent);
  } catch (err) {
    throw new Error('invalid_json');
  }
}

/**
 * Enhanced write json file.
 * @example
 * await writeJsonFile('./file.json', { test: 'Every thing is ok' });
 */
export async function writeJsonFile(
    path: string,
    data: unknown,
): Promise<void> {
  // Check the path is exist
  path = resolve(path);
  if (!existsSync(path)) {
    await fs.mkdir(dirname(path), {recursive: true});
  }

  // Convert json to string
  const json = JSON.stringify(data, undefined, 2);

  // Write string to file
  // `flag` can be like bellow:
  // 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
  // 'wx' - Like 'w' but fails if path exists.
  await fs.writeFile( path, json, {encoding: 'utf-8'} );
}
