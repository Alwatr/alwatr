import {logger} from '../../config.js';
import {getTotalCount} from '../../counter.js';
import {nanoServer} from '../../lib/nano-server.js';

import type {AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/vow', totalCount);

async function totalCount(): Promise<AlwatrServiceResponse> {
  logger.logMethod('globalCount');

  const globalCount = getTotalCount();

  return {
    ok: true,
    data: {
      globalCount,
    },
  };
}
