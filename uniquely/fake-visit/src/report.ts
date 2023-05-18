import {serviceRequest} from '@alwatr/fetch';

import {config} from './config.js';
import {storageClient} from './lib/storage.js';

import type {Count} from './type.js';

export async function notify(): Promise<void> {
  const count = await incrementCount();
  if (count % config.crawl.notifyCount === 0) {
    const message = makeMessage(count);
    await serviceRequest({
      url: config.notifier.url,
      token: config.notifier.token,
      queryParameters: {
        to: config.notifier.to,
        message,
      },
    });
  }
}

export async function incrementCount(): Promise<number> {
  let count;
  try {
    count = await storageClient.get('count');
  }
  catch {
    count = <Count>{id: 'count', value: 0};
  }
  count.value++;
  await storageClient.set(count);
  return count.value;
}

function makeMessage(count: number): string {
  return `تعداد بازدیدها از سایت ${config.crawl.home} به تعداد ${count} رسید. 🎉😎`;
}
