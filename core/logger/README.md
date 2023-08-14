# Alwatr Logger - `@alwatr/logger`

An attractive and colorful console debugger with a customizable scope, designed as a small TypeScript module and using the ES module system.
## Example usage

```ts
import {createLogger} from 'https://esm.run/@alwatr/logger';

const logger = createLogger('demo');

function sayHello(name: string) {
  logger.logMethodArgs?.('sayHello', {name});
}
```

### Debug/Developer Mode (DEV_MODE)

Many of the methods in the logger are no-ops when the debug mode is off in the browser.
Please remember to **reload** the window after changing the debug mode.

```ts
window.localStorage?.setItem('ALWATR_DEBUG', '1');
```

> Make sure the [log level](https://developer.chrome.com/docs/devtools/console/log/#browser) in set correctly.
