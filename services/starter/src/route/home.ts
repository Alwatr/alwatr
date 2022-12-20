import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/', home);

function home(): AlwatrServiceResponse {
  return {
    ok: true,
    data: {
      app: 'Alwatr Nanoservice Starter Kit',
      message: 'Hello ;)',
    },
  };
}
