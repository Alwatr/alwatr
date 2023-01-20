import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Alwatr Customer Order Management API ::..',
    message: 'Hello ;)',
  },
}));
