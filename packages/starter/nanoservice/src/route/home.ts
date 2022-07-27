import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('get', '/', async (connection) => {
  connection.reply({
    ok: true,
    data: {
      app: 'Alwatr Nanoservice Starter Kit',
      message: 'Hello ;)',
    },
  });
});
