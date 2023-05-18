import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

import {delay} from '@alwatr/util';
import {makeLinkForce} from '@alwatr/util/node.js';

import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/link', async (connection) => {
  logger.logMethod?.('link');

  connection.requireToken(config.nanoServer.accessToken);

  let {src, dest} = connection.requireQueryParams<{src: string; dest: string}>({
    src: 'string',
    dest: 'string',
  });

  const base = config.storage.path;
  src = resolve(base, src + '.json');
  dest = resolve(base, dest + '.json');

  if (!src.startsWith(base) || !dest.startsWith(base)) {
    // Prevent to access outside storage path by '../' in address.
    return {
      ok: false,
      statusCode: 403,
      errorCode: 'path_outside_base',
      meta: {base, src, dest},
    };
  }

  if (!existsSync(src)) {
    await delay(config.storage.saveDebounce + 100); // ensure storage saved
    if (!existsSync(src)) {
      return {
        ok: false,
        statusCode: 400,
        errorCode: 'src_not_found',
        meta: {base, src, dest},
      };
    }
  }

  await makeLinkForce(src, dest);

  return {
    ok: true,
    data: {},
  };
});
