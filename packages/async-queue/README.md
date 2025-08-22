# Async Queue

A queue that executes async tasks in order like mutex and semaphore methodology for javascript and typescript.

## Installation

```bash
yarn add @alwatr/async-queue
```

## Usage

```typescript
import {AsyncQueue} from '@alwatr/async-queue';
import {waitForTimeout} from '@alwatr/delay';

const queue = new AsyncQueue();

async function longTask(n) {
  console.log('longTask(%s)', n);
  await queue.push('longTaskId', async () => {
    console.log('longTask %s start', n);
    // Simulate a long task
    await waitForTimeout(1000);
  });
  console.log('longTask %s end', n);
}

// run the tasks parallel
longTask(1);
longTask(2);
longTask(3).then(() => console.log('longTask 3 resolved'));
longTask(4);

/*
Output:

  longTask(1)
  longTask(2)
  longTask(3)
  longTask(4)
  longTask 1 start
  longTask 1 end
  longTask 2 start
  longTask 2 end
  longTask 3 start
  longTask 3 end
  longTask 3 resolved
  longTask 4 start
  longTask 4 end

*/
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.


