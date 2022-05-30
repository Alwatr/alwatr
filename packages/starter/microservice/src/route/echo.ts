import {app} from '../app.js';

import type {AlwatrConnection} from '@alwatr/micro-server';

app.route('post', '/echo', async (connection: AlwatrConnection) => {
  const jsonBody = await connection.requireJsonBody();
  if (jsonBody == null) return;

  connection.reply({
    ok: true,
    data: {
      jsonBody,
    },
  });
});
