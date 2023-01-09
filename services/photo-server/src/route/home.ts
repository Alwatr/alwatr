import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: 'Alwatr Photo Server Microservice',
    message: 'Hello ;)',
  },
}));
