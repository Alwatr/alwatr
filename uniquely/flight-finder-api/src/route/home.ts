import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: 'Alwatr Flight Finder API Microservice',
    message: 'Hello ;)',
  },
}));
