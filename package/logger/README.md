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

@TODO: update me from [type.ts](./src/type.ts)
