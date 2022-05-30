import {app} from '../app.js';

import type {AlwatrConnection} from '@alwatr/micro-server';

app.route('all', '/', async (connection: AlwatrConnection) => {
  connection.reply({
    ok: true,
    data: {
      app: 'Alwatr Microservice Starter Kit',
      message: 'Hello ;)',
    },
  });
});
