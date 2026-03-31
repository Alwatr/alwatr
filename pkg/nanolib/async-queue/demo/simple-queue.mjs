import {AsyncQueue} from '@alwatr/async-queue';

const queue = new AsyncQueue();

async function longTask(n) {
  console.log('longTask(%s)', n);
  await queue.push('longTaskId', () => {
    return new Promise((resolve) => {
      console.log('longTask %s start', n);
      // Simulate a long task
      setTimeout(resolve, 1_000);
    });
  });
  console.log('longTask %s end', n);
}

// run the tasks parallel
longTask(1);
longTask(2);
longTask(3).then(() => console.log('longTask 3 resolved'));
longTask(4);
