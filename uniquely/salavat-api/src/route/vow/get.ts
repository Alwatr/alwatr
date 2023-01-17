import {logger} from '../../config.js';
import {getGlobalCount} from '../../counter.js';
import {nanoServer} from '../../lib/nano-server.js';

import type {AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/vow', globalCount);

async function globalCount(): Promise<AlwatrServiceResponse> {
  logger.logMethod('globalCount');

  const globalCount = getGlobalCount();

  return {
    ok: true,
    data: {
      globalCount,
    },
  };
}
