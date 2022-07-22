import {app} from '../app.js';

app.route('get', '/', async (connection) => {
  connection.reply({
    ok: true,
    data: {
      app: 'Alwatr Microservice Starter Kit',
      message: 'Hello ;)',
    },
  });
});
