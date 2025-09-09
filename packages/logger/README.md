## Logger

A lightweight, flexible, and colorful console logging library for TypeScript and ES modules.

### Features

- **Customizable Scopes:** Organize log messages using scopes for easy filtering and debugging.
- **Colorful Output:** Visually distinguish different log levels and scopes with vibrant colors.
- **Debug/Development Mode:** Control log verbosity to optimize performance in production environments.
- **Tiny Footprint:** Minimal overhead, keeping your project lean and efficient.

### Installation

```bash
npm install @alwatr/logger
```

### Usage

```typescript
import {createLogger} from '@alwatr/logger';

const logger = createLogger('my-module'); // Create a logger with a specific scope

function greet(name: string) {
  logger.logMethodArgs?.('greet', {name}); // Log the method call with its arguments
  console.log(`Hello, ${name}!`);
}

greet('Ali');
```

### Log Levels and Methods

- **`logProperty(propertyName, value)`:** Logs a property change (useful for tracking state).
- **`logFileModule(fileName)`:** Logs the module's file name for easy identification.
- **`logMethod(methodName)`:** Logs the entry into a function or method.
- **`logMethodArgs(methodName, args)`:** Logs a method call with its arguments.
- **`logStep(methodName, stepName, props?)`:** Logs specific steps within a method.
- **`logMethodFull(methodName, args, result)`:** Logs a method call with arguments and result.
- **`incident(methodName, code, ...args)`:** Logs an event or expected incident (informational).
- **`accident(methodName, code, ...args)`:** Logs an unexpected incident or handled error (warning).
- **`error(methodName, code, ...args)`:** Logs an unexpected error (critical).
- **`logOther(...args)`:** General-purpose logging with styled scope.
- **`time(label)`:** Starts a timer.
- **`timeEnd(label)`:** Ends a timer and logs the elapsed time.
- **`banner(message)`:** Logs a large, prominent banner message.

### Enabling Debug Mode

#### Browser

1. Open your browser's developer tools.
2. Go to the "Application" or "Storage" tab.
3. Find "Local Storage" and locate your application's domain.
4. Add a new key-value pair: `ALWATR_DEBUG` with the value `1`.
5. Reload the page.

Or use the following code snippet in the browser console:

```javascript
window.localStorage?.setItem('ALWATR_DEBUG', '1');
```

> **Note:** Ensure the browser console's log level is set to include "Verbose" or "All" to see debug messages.

#### Node.js

```bash
DEBUG=1 node index.js
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
