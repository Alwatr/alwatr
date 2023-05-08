import {existsSync} from 'node:fs';
import {symlink, rm} from 'node:fs/promises';
import {resolve} from 'node:path';

import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/link', async (connection) => {
  logger.logMethod?.('link');

  connection.requireToken(config.nanoServer.accessToken);

  let {src, dest} = connection.requireQueryParams<{src: string; dest: string}>({
    src: 'string',
    dest: 'string',
  });

  const base = resolve(config.storage.path);
  src = resolve(config.storage.path, src + '.json');
  dest = resolve(config.storage.path, dest + '.json');

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
    return {
      ok: false,
      statusCode: 404,
      errorCode: 'src_not_found',
      meta: {base, src, dest},
    };
  }

  makeLinkForce(src, dest);

  return {
    ok: true,
    data: {},
  };
});

/**
 * Make a symbolic link
 *
 * **CAUTION: the destination path will be removed if exists**
 */
const makeLinkForce = async (src: string, dest: string): Promise<void> => {
  logger.logMethodArgs?.('makeLink', {src, dest});

  try {
    if (existsSync(dest)) {
      await rm(dest, {recursive: false, force: true});
    }

    await symlink(src, dest);
  }
  catch (error) {
    logger.error('makeLink', 'symlink_failed', error);
  }
};
