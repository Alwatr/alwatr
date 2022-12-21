import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => {
  return {
    ok: true,
    data: {
      app: 'Alwatr Nanoservice Starter Kit',
      message: 'Hello ;)',
    },
  };
});
