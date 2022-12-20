import {AlwatrServiceResponse} from '@alwatr/nano-server';

import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', home);

function home(): AlwatrServiceResponse {
  return {
    ok: true,
    data: {
      app: 'Alwatr Flight Finder API Microservice',
      message: 'Hello ;)',
    },
  };
}
