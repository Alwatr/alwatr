import type {Stringifyable} from '@alwatr/type';

export const parseJson = <T extends Stringifyable>(str: string): T | null => {
  try {
    return JSON.parse(str) as T;
  }
  catch (err) {
    console.error(err);
    return null;
  }
};
