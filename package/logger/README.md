# @alwatr/logger

Fancy colorful console debugger with custom scope written in tiny TypeScript, ES module.

## Example usage

```ts
import { createLogger } from 'https://esm.run/@alwatr/logger';

const logger = createLogger('demo');

function sayHello (name: string) {
  logger.logMethodArgs('sayHello', {name});
}
```

### Debug Mode

Many of the methods in the logger are no-ops when the debug mode is off.  
Please remember to **reload** the window after changing the debug mode.

- Debugging all scopes

  ```ts
  window.localStorage?.setItem('ALWATR_LOG', '*');
  ```

- Debugging specific scope

  ```ts
  window.localStorage?.setItem('ALWATR_LOG', 'scope_name');
  ```

- Debugging some scopes with pattern

  ```ts
  window.localStorage?.setItem('ALWATR_LOG', '*alwatr*');
  ```

### API

### `createLogger(scope: string, color: string, force = boolean)`

Create a logger function for fancy console debug with custom scope.

- **color** is optional and automatically select from internal fancy color list.
- **force** is optional and default to false.

Example:

```ts
import {createLogger} from 'https://esm.run/@alwatr/logger';
const logger = createLogger('logger/demo');
```

### `logger.debug: boolean`

Debug state for current scope base on localStorage `ALWATR_LOG` pattern.

### `logger.color: string`

Debug state for current scope base on localStorage `ALWATR_LOG` pattern.

### `logger.scope: string`

Debug state for current scope base on localStorage `ALWATR_LOG` pattern.

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
function myMethod () {
  logger.logMethod('myMethod');
}
```

### `logger.logMethodArgs(method, args)`

`console.debug` function or method calls with arguments.

Example:

```ts
function myMethod (a: number, b: number) {
  logger.logMethodArgs('myMethod', {a, b});
}
```

### `logger.logMethodFull(method, args, result)`

`console.debug` function or method calls with arguments.

Example:

```ts
function add (a: number, b: number): number {
  const result = a + b;
  logger.logMethodFull('add', {a, b}, result);
  return result;
}
```

### `logger.incident(method, code, description, ...args)`

`console.trace` an event or expected accident. (not warn or error)

Example:

```ts
logger.incident('fetch', 'abort_signal', 'aborted signal received', {url: '/test.json'});
```

### `logger.accident(method, code, description, ...args)`

`console.warn` an unexpected accident or error that you handled.

Example:

```ts
logger.accident('fetch', 'file_not_found', 'url requested return 404 not found', {url: '/test.json'});
```

### `logger.error(method, code, errorStack, ...args)`

`console.error` an unexpected error.

Example:

```ts
try {
  ...
}
catch (err) {
  logger.error('myMethod', 'error_code', (err as Error).stack || err, {a: 1, b: 2});
}
```

### `logger.logOther(...args)`

Simple `console.debug` with styled scope.

Example:

```ts
logger.logOther('foo:', 'bar', {a: 1});
```
