import {app} from '../app.js';

app.route('post', '/echo', async (connection) => {
  const jsonBody = await connection.requireJsonBody();
  if (jsonBody == null) return;

  connection.reply({
    ok: true,
    statusCode: 200,
    data: {
      jsonBody,
    },
  });
});
