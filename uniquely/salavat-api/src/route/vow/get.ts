import {logger} from '../../config.js';
import {globalCount} from '../../global-vow.js';
import {nanoServer} from '../../lib/nano-server.js';

import type {AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/vow', getGlobalCount);

async function getGlobalCount(): Promise<AlwatrServiceResponse> {
  logger.logMethod('getGlobalCount');

  return {
    ok: true,
    data: {
      globalCount,
    },
  };
}
