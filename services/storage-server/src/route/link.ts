import {existsSync} from 'node:fs';
import {symlink, rm} from 'node:fs/promises';

import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/link', async (connection) => {
  logger.logMethod?.('link');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{src: string; dest: string}>({
    src: 'string',
    dest: 'string',
  });

  makeLink(params.src, params.dest);

  return {
    ok: true,
    data: {},
  };
});

const makeLink = async (src: string, dest: string): Promise<void> => {
  logger.logMethodArgs?.('makeLink', {src, dest});

  try {
    if (existsSync(dest)) {
      await rm(dest);
    }

    await symlink(src, dest);
  }
  catch (error) {
    logger.error('makeLink', 'makeLink_error', error);
  }
};
