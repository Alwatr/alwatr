import {app} from '../app.js';

app.route('all', '/', async (connection) => {
  const jsonBody = await connection.requireJsonBody();
  if (jsonBody == null) return;

  connection.reply({
    ok: true,
    statusCode: 200,
    data: {
      app: 'Alwatr Microservice Starter Kit',
      message: 'Hello ;)',
      jsonBody,
    },
  });
});
