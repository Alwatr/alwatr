# @alwatr/micro-server

Elegant powerful nodejs server for microservice use cases, written in tiny TypeScript module.

## Usage

### Create server

```typescript
import {AlwatrMicroServer} from '@alwatr/micro-server';

import type {AlwatrConnection} from '@alwatr/micro-server';

const app = new AlwatrMicroServer(8000);

app.route('all', '/', async (connection: AlwatrConnection) => {
  connection.reply({
    ok: true,
    statusCode: 200,
    data: {
      app: 'Alwatr Microservice',
      message: 'Hello ;)',
    },
  });
});
```

### Middleware

#### CORS Helper

Read about [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

```typescript
app.route('all', '/', async (connection) => {
  connection.reply(
    {
      ok: true,
      statusCode: 200,
      data: {
        app: 'Alwatr Microservice',
        message: 'Hello World',
      },
    },
    {
      corsHelper: {
        allowOrigin: 'https://developer.mozilla.org', // That should not end with "/"
        allowMethod: '*',
        maxAge: 5 * 60, // 5 Minute
      },
    }
  );
});
```
