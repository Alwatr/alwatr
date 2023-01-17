import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Alwatr Salavat Application API ::..',
    message: 'Hello ;)',
  },
}));
