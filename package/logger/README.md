# @vatr/logger

Create a logger function for fancy console debug with custom scope.

## Example usage

```js
import { createLogger } from '@vatr/logger';

const log = createLogger('my-scope', 'debug', true);
log('foo');
```
