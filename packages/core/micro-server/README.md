# @alwatr/micro-server

Elegant powerful nodejs server for microservice use cases, written in tiny TypeScript module.

## Usage

### Middleware

#### [CORS Helper](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

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
