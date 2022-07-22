import {app} from '../app.js';

app.route('post', '/echo', async (connection) => {
  const bodyData = await connection.requireJsonBody();
  if (bodyData == null) return;

  connection.reply({
    ok: true,
    data: {
      ...bodyData,
    },
  });
});
