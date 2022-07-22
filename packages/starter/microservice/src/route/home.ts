import {app} from '../app.js';

app.route('all', '/', async (connection) => {
  connection.reply({
    ok: true,
    data: {
      app: 'Alwatr Microservice Starter Kit',
      message: 'Hello ;)',
    },
  });
});
