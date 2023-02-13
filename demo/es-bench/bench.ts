import {delay} from '@alwatr/util';

import type {MaybePromise} from '@alwatr/type';

export async function bench(name: string, func: () => MaybePromise<void>): Promise<void> {
  await delay(1_000);
  console.time(name);
  for (let i = 100_000; i; i--) {
    await func();
  }
  console.timeEnd(name);
}
