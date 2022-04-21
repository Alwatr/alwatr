import {app} from '../app.js';

app.route('all', '/', async (connection) => {
  connection.reply({
    ok: true,
    statusCode: 200,
    data: {
      app: 'Alwatr Microservice Starter Kit',
      message: 'Hello ;)',
    },
  });
});
