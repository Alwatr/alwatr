import {createHash} from 'node:crypto';

import type {CryptoAlgorithm, CryptoEncoding} from '@alwatr/type';

export const generateHash = (
    data: string,
    options: {algorithm: CryptoAlgorithm; encoding: CryptoEncoding; outputLength: number},
): string => {
  return createHash(options.algorithm, {outputLength: options.outputLength})
      .update(data, 'utf8')
      .digest(options.encoding);
};
