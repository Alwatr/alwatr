import {fetch} from '@alwatr/fetch';
import {contextConsumer} from '@alwatr/signal';

const urlPrefixContext = contextConsumer.bind<string>('icon-url-prefix');

export async function preloadIcon(name: string): Promise<string> {
  const urlPrefix = urlPrefixContext.getValue() ?? 'https://cdn.jsdelivr.net/npm/@alwatr/icon@0/svg/';
  const url = urlPrefix + name + '.svg';

  const response = await fetch({
    url,
    removeDuplicate: 'auto',
    cacheStrategy: 'cache_first',
  });

  if (response.ok !== true) {
    throw new Error('fetch_failed');
  }

  return await response.text();
}
