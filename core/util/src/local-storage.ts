import {parseJson} from './json.js';

import type {Stringifyable} from '@alwatr/type';

export const getLocalStorageItem = <T extends Stringifyable>(name: string, defaultValue: T): T => {
  const item = localStorage.getItem(name);
  return item == null ? defaultValue : parseJson(item) ?? defaultValue;
};
