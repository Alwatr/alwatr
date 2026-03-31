import {fetch} from '@alwatr/fetch';

export async function preloadIcon(name: string): Promise<string> {
  const urlPrefix = 'https://cdn.jsdelivr.net/npm/@alwatr/icon@1/svg/';
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
