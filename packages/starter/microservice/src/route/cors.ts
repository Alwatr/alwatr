import {app} from '../app.js';

import type {AlwatrConnection} from '@alwatr/micro-server';

app.route('all', '/cors', async (connection: AlwatrConnection) => {
  connection.reply(
      {
        ok: true,
        statusCode: 200,
        data: {
          app: 'Alwatr Microservice Starter Kit',
          message: 'CORS work!',
        },
      },
      {
        corsHelper: {
          allowOrigin: '*',
          allowMethods: '*',
          maxAge: 5 * 60, // 5 min
        },
      },
  );
});
