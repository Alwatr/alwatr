import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Alwatr Telegram Notify Nanoservice ::..',
    message: 'Hello ;)',
  },
}));
