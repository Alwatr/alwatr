import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => {
  return {
    ok: true,
    data: {
      app: 'Alwatr Comment API Microservice',
      message: 'Hello ;)',
    },
  };
});
