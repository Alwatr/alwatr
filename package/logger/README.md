# @vatr/logger

Fancy colorful console debugger with custom scope written in tiny TypeScript, ES module.

## Example usage

```ts
import { createLogger } from 'https://esm.run/@vatr/logger';

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
  window.localStorage?.setItem('VATR_LOG', '*');
  ```

- Debugging specific scope

  ```ts
  window.localStorage?.setItem('VATR_LOG', 'scope_name');
  ```

- Debugging some scopes with pattern

  ```ts
  window.localStorage?.setItem('VATR_LOG', '*vatr*');
  ```

### API

### Prepare the logger

```ts
import {createLogger} from 'https://esm.run/@vatr/logger';
const logger = createLogger('logger/demo', 'green');
```

### `logProperty(property, value)`

`console.debug` property change.

Example:

```ts
logger.logProperty('name', 'ali');
```

### `logMethod(method)`

`console.debug` function or method calls.

Example:

```ts
function myMethod () {
  logger.logMethod('myMethod');
}
```

### `logMethodArgs(method, args)`

`console.debug` function or method calls with arguments.

Example:

```ts
function myMethod (a: number, b: number) {
  logger.logMethodArgs('myMethod', {a, b});
}
```

### `logMethodFull(method, args, result)`

`console.debug` function or method calls with arguments.

Example:

```ts
function add (a: number, b: number): number {
  const result = a + b;
  logger.logMethodFull('add', {a, b}, result);
  return result;
}
```

### `incident(method, code, description, ...args)`

`console.trace` an event or expected accident. (not warn or error)

Example:

```ts
logger.incident('fetch', 'abort_signal', 'aborted signal received', {url: '/test.json'});
```

### `accident(method, code, description, ...args)`

`console.warn` an unexpected accident or error that you handled.

Example:

```ts
logger.accident('fetch', 'file_not_found', 'url requested return 404 not found', {url: '/test.json'});
```

### `error(method, code, errorStack, ...args)`

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

### `logOther(...args)`

Simple `console.debug` with styled scope.

Example:

```ts
logger.logOther('foo:', 'bar', {a: 1});
```
