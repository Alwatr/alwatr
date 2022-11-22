import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('GET', '/', async (connection) => {
  connection.reply({
    ok: true,
    data: {
      app: 'Alwatr Notify Microservice',
      message: 'Hello ;)',
    },
  });
});
