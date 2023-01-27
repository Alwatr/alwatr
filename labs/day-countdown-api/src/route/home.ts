import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Alwatr Day Countdown Application API ::..',
    message: 'Hello ;)',
  },
}));
