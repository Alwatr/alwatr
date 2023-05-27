import {StringifyableRecord} from '@alwatr/type';

import {nanoServer} from '../lib/server.js';

nanoServer.route<StringifyableRecord>('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Alwatr Customer Order Management API ::..',
    message: 'Hello ;)',
  },
}));
