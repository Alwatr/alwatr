import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', () => {
  return {
    ok: true,
    data: {
      app: 'Alwatr Telegram Notify Microservice',
      message: 'Hello ;)',
    },
  };
});
