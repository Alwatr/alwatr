import {app} from '../app.js';

app.route('all', '/cors', async (connection) => {
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
          allowMethod: '*',
          allowOrigin: '*',
          maxAge: 5 * 60, // 5 min
        },
      },
  );
});
