import {nanoServer} from '../lib/server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Gecut Hami API ::..',
    message: 'Hello ;)',
  },
}));
