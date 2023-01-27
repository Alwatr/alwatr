import {logger} from '../config.js';
import {dateDistance, nime} from '../lib/calender.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrServiceResponse} from '@alwatr/type';

nanoServer.route('GET', '/daycountdown/', dayCountDown);

async function dayCountDown(): Promise<AlwatrServiceResponse> {
  logger.logMethod('dayCountDown');

  return {
    ok: true,
    data: {
      timeToLeft: dateDistance(nime.valueOf()),
    },
  };
}
