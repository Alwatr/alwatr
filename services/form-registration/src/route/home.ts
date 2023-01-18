import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Alwatr Form Registration API Nanoservice ::..',
    message: 'Hello ;)',
  },
}));
