import {logger} from '../../config.js';
import {getTotalCount} from '../../counter.js';
import {nanoServer} from '../../lib/nano-server.js';

import type {AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/vow', totalCount);

async function totalCount(): Promise<AlwatrServiceResponse> {
  logger.logMethod('totalCount');

  const totalSalavatCount = getTotalCount();

  return {
    ok: true,
    data: {
      totalSalavatCount,
    },
  };
}
