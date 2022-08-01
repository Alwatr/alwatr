import {nanoServer} from '../lib/nano-server.js';

nanoServer.route('POST', '/echo', async (connection) => {
  const bodyData = await connection.requireJsonBody();
  if (bodyData == null) return;

  connection.reply({
    ok: true,
    data: {
      ...bodyData,
    },
  });
});
