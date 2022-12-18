# Alwatr Logger - `@alwatr/logger`

Fancy colorful console debugger with custom scope written in tiny TypeScript, ES module.

## Example usage

```ts
import {createLogger} from 'https://esm.run/@alwatr/logger';

const logger = createLogger('demo');

function sayHello(name: string) {
  logger.logMethodArgs('sayHello', {name});
}
```

### Debug Mode

Many of the methods in the logger are no-ops when the debug mode is off in the browser.
Please remember to **reload** the window after changing the debug mode.

- Debugging all scopes

  ```ts
  window.localStorage?.setItem('ALWATR_DEBUG', '*');
  ```

- Debugging specific scope

  ```ts
  window.localStorage?.setItem('ALWATR_DEBUG', 'scope_name');
  ```

- Debugging some scopes with pattern

  ```ts
  window.localStorage?.setItem('ALWATR_DEBUG', '*alwatr*');
  ```

> Make sure the [log level](https://developer.chrome.com/docs/devtools/console/log/#browser) in set correctly.

## API

### `createLogger(scope: string, color: string, force = boolean)`

Create a logger function for fancy console debug with custom scope.

- **color** is optional and automatically select from internal fancy color list.
- **debug** is optional and automatically detect from localStorage `ALWATR_DEBUG` item or `process.env.ALWATR_DEBUG`

Example:

```ts
import {createLogger} from 'https://esm.run/@alwatr/logger';
const logger = createLogger('logger/demo');
```

### `logger.debug: boolean`

Debug state for current scope base on localStorage `ALWATR_DEBUG` pattern.

### `logger.color: string`

Debug state for current scope base on localStorage `ALWATR_DEBUG` pattern.

### `logger.scope: string`

Debug state for current scope base on localStorage `ALWATR_DEBUG` pattern.

### `logger.logProperty(property, value)`

`console.debug` property change.

Example:

```ts
logger.logProperty('name', 'ali');
```

### `logger.logMethod(method)`

`console.debug` function or method calls.

Example:

```ts
function myMethod() {
  logger.logMethod('myMethod');
}
```

### `logger.logMethodArgs(method, args)`

`console.debug` function or method calls with arguments.

Example:

```ts
function myMethod(a: number, b: number) {
  logger.logMethodArgs('myMethod', {a, b});
}
```

### `logger.logMethodFull(method, args, result)`

`console.debug` function or method calls with arguments.

Example:

```ts
function add(a: number, b: number): number {
  const result = a + b;
  logger.logMethodFull('add', {a, b}, result);
  return result;
}
```

### `logger.incident(method, code, description, ...args)`

`console.log` an event or expected accident. (not warn or error)

Example:

```ts
logger.incident('fetch', 'abort_signal', 'aborted signal received', {url: '/test.json'});
```

### `logger.accident(method, code, description, ...args)`

`console.warn` an unexpected accident or error that you handled.

Example:

```ts
logger.accident('fetch', 'file_not_found', 'url requested return 404 not found', {
  url: '/test.json',
});
```

### `logger.error(method, code, errorStack, ...args)`

`console.error` an unexpected error.

Example:

```ts
try {
  ...
}
catch (err) {
  logger.error('myMethod', 'error_code', err, {a: 1, b: 2});
}
```

### `logger.logOther(...args)`

Simple `console.debug` with styled scope.

Example:

```ts
logger.logOther('foo:', 'bar', {a: 1});
```

### How to handle promises?

For example with a promise function with error:

```ts
const failPromiseTest = (): Promise<never> => new Promise((_, reject) => reject(new Error('my_error_code')));
```

Best practices to catch the error and log it:

```ts
// Unhandled promise rejection (just log it)
failPromiseTest().catch((err) =>
  logger.error('myMethod', (err as Error).message || 'error_code', err)
);

// Handled promise rejection
try {
  await failPromiseTest();
} catch (err) {
  logger.accident(
    'myMethod',
    'error_code',
    'failPromiseTest failed!, ' + (err as Error).message,
    err
  );
  // do something to handle the error...
}
```
