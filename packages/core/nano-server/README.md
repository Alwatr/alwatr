# @alwatr/nano-server

Elegant powerful nodejs server for nanoservice use cases, written in tiny TypeScript module.

## Example usage

```ts
import {AlwatrNanoServer} from 'https://esm.run/@alwatr/nano-server';
import type {AlwatrConnection} from 'https://esm.run/@alwatr/nano-server';

const nanoServer = new AlwatrNanoServer();

nanoServer.route('GET', '/', async (connection: AlwatrConnection) => {
  connection.reply({
    ok: true,
    data: {
      app: 'Alwatr Nanoservice Starter Kit',
      message: 'Hello ;)',
    },
  });
});
```

## API

### `AlwatrNanoServer(config?: Partial<Config>)`

Create a server for nanoservice use cases.

Example:

```ts
import {AlwatrNanoServer} from 'https://esm.run/@alwatr/nano-server';
const nanoServer = new AlwatrNanoServer();
```

### `nanoserver.listen()`

Starts the HTTP server listening for connections.

### `nanoserver.close()`

Stops the HTTP server from accepting new connections.

### `route(method: Methods, route: 'all' |`/${string}`,middleware: (connection: AlwatrConnection) => void)`

Refers to how an application’s endpoints (URIs) respond to client requests.

Example:

```ts
nanoServer.route('GET', '/', middleware);
```

### `AlwatrConnection(incomingMessage: IncomingMessage, serverResponse: ServerResponse)`

????

```ts
async function middleware(connection: AlwatrConnection) => {
connection.reply({
  ok: true,
  data: {
   app: 'Alwatr Nanoservice Starter Kit',
   message: 'Hello ;)',
  },
 });
});
```

### `connection.url: URL`

Request URL.

### `connection.method: "*" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "TRACE" | "OPTIONS" | "PATCH"

`

Request method.

### `connection.token: string | null`

The token placed in the request header.

### `connection.bodyPromise: string | null`

Request body for **POST** & **PUT** method.

### `connection.reply(content: ReplyContent)`

Example:

```ts
nanoServer.route('GET', '/', async (connection) => {
  connection.reply({
    ok: true,
    data: {
    app: 'Alwatr Nanoservice Starter Kit',
    message: 'Hello ;)',
    },
  });
});
```

### `connection.requireJsonBody()`

Parse request body.

Example:

```ts
const bodyData = await connection.requireJsonBody();
```
