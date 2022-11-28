import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('OPTIONS', 'all', (connection) => {
  connection.serverResponse.setHeader('Access-Control-Allow-Origin', '*');
  connection.serverResponse.setHeader('Access-Control-Allow-Methods', '*');
  connection.serverResponse.setHeader('Access-Control-Allow-Headers', '*');
  connection.reply({
    ok: true,
    statusCode: 204,
    data: {},
  });
});
